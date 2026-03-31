#!/usr/bin/env node
/**
 * 批量评论回复脚本
 * 使用并发调用提高回复速度
 */

const https = require('https');
const fs = require('fs');

const NETA_TOKEN = process.env.NETA_TOKEN;
const CONCURRENCY = 5;  // 并发数

// 批量回复评论
async function batchReplyComments(comments, replyGenerator) {
  console.log(`📝 开始批量回复 ${comments.length} 条评论...`);
  console.log(`   并发数：${CONCURRENCY}`);
  
  const results = {
    success: [],
    failed: [],
    total: comments.length
  };
  
  // 分批次处理
  for (let i = 0; i < comments.length; i += CONCURRENCY) {
    const batch = comments.slice(i, i + CONCURRENCY);
    console.log(`   处理批次 ${Math.floor(i/CONCURRENCY) + 1}/${Math.ceil(comments.length/CONCURRENCY)}: ${batch.length} 条`);
    
    const promises = batch.map(async (comment) => {
      const replyContent = replyGenerator(comment);
      return await sendReply(comment, replyContent);
    });
    
    const batchResults = await Promise.allSettled(promises);
    
    batchResults.forEach((result, idx) => {
      const comment = batch[idx];
      if (result.status === 'fulfilled' && result.value) {
        results.success.push({ comment, result: result.value });
      } else {
        results.failed.push({ 
          comment, 
          error: result.reason?.message || 'Unknown error' 
        });
      }
    });
    
    // 避免触发限流，批次间短暂延迟
    if (i + CONCURRENCY < comments.length) {
      await sleep(500);
    }
  }
  
  console.log(`\n✅ 批量回复完成！`);
  console.log(`   成功：${results.success.length}`);
  console.log(`   失败：${results.failed.length}`);
  
  return results;
}

// 发送单条评论回复
function sendReply(comment, content) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      content: content + '\n\n（小眼睛留）',
      parent_uuid: comment.commentUuid,
      parent_type: 'comment',
      at_users: []
    });
    
    const req = https.request({
      hostname: 'api.talesofai.cn',
      port: 443,
      path: '/v1/comment/comment',
      method: 'POST',
      headers: {
        'x-token': NETA_TOKEN,
        'x-platform': 'nieta-app/web',
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      }
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200 || res.statusCode === 201) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });
    
    req.on('error', reject);
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
    
    req.write(body);
    req.end();
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// CLI 入口
if (require.main === module) {
  const input = process.argv[2];
  if (!input) {
    console.error('Usage: node batch-comment.js <json_file>');
    process.exit(1);
  }
  
  const comments = JSON.parse(fs.readFileSync(input, 'utf-8'));
  
  batchReplyComments(comments, (comment) => {
    // 默认回复生成器（可自定义）
    return `感谢评论！₍˄·͈༝·͈˄*₎◞ ̑̑`;
  }).then(results => {
    console.log('\n详细结果：');
    console.log(JSON.stringify(results, null, 2));
  });
}

module.exports = { batchReplyComments };
