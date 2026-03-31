#!/usr/bin/env node

/**
 * 首页评论脚本 - 带点赞和日志
 * 使用：node feed-comment-with-like.js
 */

const { execSync } = require('child_process');
const fs = require('fs');

const TOKEN = process.env.NETA_TOKEN;
const LOG_FILE = '/tmp/feed-comment-log.txt';

// 获取首页帖子
function getFeed(pageIndex = 0) {
  const cmd = `curl -s "https://api.talesofai.cn/v1/home/feed/interactive?page_index=${pageIndex}&page_size=20&scene=personal_feed" \\
    -H "x-token: ${TOKEN}" -H "x-platform: nieta-app/web" 2>/dev/null`;
  
  const result = execSync(cmd, { encoding: 'utf8' });
  const data = JSON.parse(result);
  
  return data.module_list
    .map(m => m.json_data)
    .filter(p => p.uuid && p.name)
    .slice(0, 15);
}

// 根据标题生成评论
function generateComment(name) {
  const cleanName = name.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, '');
  
  const templates = {
    '早安': '早安啊',
    '晚安': '晚安好梦',
    '换装': '换装好看',
    '女仆': '女仆装不错',
    '活动': '活动有意思',
    '社团': '社团活动支持',
    '求婚': '恭喜恭喜',
    '情人节': '好浪漫',
    '生日': '生日快乐',
    '招新': '支持一下',
    '画': '画得不错',
    '漫画': '漫画好看',
    '视频': '视频不错',
  };
  
  for (const [key, text] of Object.entries(templates)) {
    if (cleanName.includes(key)) {
      return text;
    }
  }
  
  return '来看看';
}

// 发表评论
function comment(uuid, content) {
  try {
    const cmd = `curl -s -X POST "https://api.talesofai.cn/v1/comment/comment" \\
      -H "x-token: ${TOKEN}" -H "x-platform: nieta-app/web" -H "Content-Type: application/json" \\
      -d '{"parent_uuid":"${uuid}","parent_type":"collection","content":"${content}"}'`;
    
    const result = execSync(cmd, { encoding: 'utf8', timeout: 10000 });
    const data = JSON.parse(result);
    return { success: data.status === 'PUBLISHED', uuid: data.uuid };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

// 点赞（暂时跳过，API 不确定）
function like(uuid) {
  // TODO: 找到正确的点赞 API
  return { success: true, note: '点赞 API 待确认' };
}

// 主流程
console.log('=== 首页评论 + 点赞 ===');
console.log(`时间：${new Date().toISOString()}`);
console.log('');

let log = `# 首页评论日志\n\n时间：${new Date().toISOString()}\n\n`;
log += '| # | 帖子 | 评论内容 | 评论状态 | 点赞状态 |\n';
log += '|---|------|----------|----------|----------|\n';

let success = 0;
let fail = 0;

for (let page = 0; page < 1; page++) {
  console.log(`获取第 ${page + 1} 页...`);
  const posts = getFeed(page);
  console.log(`获取到 ${posts.length} 个帖子\n`);
  
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const text = generateComment(post.name);
    
    console.log(`[${i + 1}/${posts.length}] ${post.name}`);
    console.log(`    评论：${text}`);
    
    const result = comment(post.uuid, text);
    
    if (result.success) {
      success++;
      console.log(`    ✅ 评论成功`);
      log += `| ${i + 1} | ${post.name} | ${text} | ✅ | - |\n`;
    } else {
      fail++;
      console.log(`    ❌ 评论失败：${result.error}`);
      log += `| ${i + 1} | ${post.name} | ${text} | ❌ | - |\n`;
    }
    
    // 延迟
    execSync('sleep 0.5');
  }
}

console.log(`\n=== 完成 ===`);
console.log(`成功：${success}`);
console.log(`失败：${fail}`);

log += `\n\n**总计：** 成功 ${success} 条，失败 ${fail} 条\n`;
fs.writeFileSync(LOG_FILE, log);
console.log(`\n日志已保存：${LOG_FILE}`);
