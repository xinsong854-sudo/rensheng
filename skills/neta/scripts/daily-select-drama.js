#!/usr/bin/env node
/**
 * 伪人大本营之灯塔戏剧节 - 每日精选脚本
 * 每天检查新作品，选择合适的进行精选
 */

const https = require('https');

const NETA_TOKEN = process.env.NETA_TOKEN;
const ACTIVITY_ID = '1d757040-41f4-4705-b25e-218d68528bd0';
const HASHTAG = '伪人大本营之灯塔戏剧节';
const REVIEW_UUID = '8d353805-1c35-4455-ab0a-7fb8f7fd9627';

// 检查是否包含 emoji
function hasEmoji(text) {
  const emojiRegex = /[\p{Emoji}]/u;
  return emojiRegex.test(text);
}

function httpGet(url) {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'GET',
      headers: {
        'x-token': NETA_TOKEN,
        'x-platform': 'nieta-app/web'
      }
    };
    
    https.get(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`JSON parse failed: ${e.message}`));
        }
      });
    }).on('error', reject);
  });
}

function httpPost(url, body) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: 443,
      path: urlObj.pathname + urlObj.search,
      method: 'POST',
      headers: {
        'x-token': NETA_TOKEN,
        'x-platform': 'nieta-app/web',
        'Content-Type': 'application/json'
      }
    };
    
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve({ raw: data });
        }
      });
    });
    
    req.on('error', reject);
    req.write(JSON.stringify(body));
    req.end();
  });
}

async function main() {
  if (!NETA_TOKEN) {
    console.error('❌ 错误：NETA_TOKEN 环境变量未设置');
    process.exit(1);
  }
  
  console.log(`🔍 开始检查 #${HASHTAG} 的新作品...\n`);
  
  // 获取作品列表（按热度排序，使用活动 API）
  const listUrl = `https://api.talesofai.cn/v1/activities/${ACTIVITY_ID}/selected-stories/highlights?page_index=0&page_size=20&sort_by=hot`;
  
  let result;
  try {
    result = await httpGet(listUrl);
  } catch (e) {
    console.error(`❌ 获取作品列表失败：${e.message}`);
    process.exit(1);
  }
  
  const stories = result.list || [];
  console.log(`📚 获取到 ${stories.length} 个作品\n`);
  
  // 过滤掉主办方
  const filtered = stories.filter(story => {
    const name = story.user_nick_name || '';
    return !name.includes('海姆姆') && !name.includes('安诺涅');
  });
  
  // 过滤掉标题带 emoji 的
  const candidates = filtered.filter(story => {
    const title = story.name || '';
    const withoutEmoji = !hasEmoji(title);
    
    if (!withoutEmoji) {
      console.log(`⏭️ 跳过 (标题含 emoji): ${title}`);
    }
    
    return withoutEmoji;
  });
  
  console.log(`✅ 符合条件的作品：${candidates.length} 个\n`);
  
  if (candidates.length === 0) {
    console.log('💤 没有合适的作品，退出');
    process.exit(0);
  }
  
  // 选择热度最高的（已经按热度排序，取第一个）
  const selected = candidates[0];
  const storyUuid = selected.storyId;
  
  if (!storyUuid) {
    console.error('❌ 未找到作品 UUID');
    process.exit(1);
  }
  
  console.log(`🎯 选择作品：${selected.name || selected.title}`);
  console.log(`   作者：${selected.user_nick_name}`);
  console.log(`   点赞：${selected.likeCount}`);
  console.log(`   UUID: ${storyUuid}\n`);
  
  // 调用精选 API
  const reviewUrl = `https://api.talesofai.cn/v1/hashtag/${encodeURIComponent(HASHTAG)}/stories/review/${REVIEW_UUID}`;
  const requestBody = {
    story_uuid: storyUuid,
    action: 'review'
  };
  
  console.log(`⭐ 正在提交精选...`);
  
  try {
    const result = await httpPost(reviewUrl, requestBody);
    console.log('✅ 精选成功!', JSON.stringify(result, null, 2));
  } catch (e) {
    console.error(`❌ 精选失败：${e.message}`);
    process.exit(1);
  }
}

main();
