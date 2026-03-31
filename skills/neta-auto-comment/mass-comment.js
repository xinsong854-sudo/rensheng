#!/usr/bin/env node

/**
 * 批量评论脚本 - 给指定用户的所有帖子各评论 N 次
 * 使用：node mass-comment.js <target_user_uuid> <comments_per_post>
 */

const { execSync } = require('child_process');
const fs = require('fs');

const TARGET_USER = process.argv[2] || '239b2c7f8c604deea6b0b911124b22ac';
const COMMENTS_PER_POST = parseInt(process.argv[3]) || 10;

// 评论模板库（根据帖子标题动态选择）
const COMMENT_TEMPLATES = [
  "路过看到，随便留个脚印。",
  "挺有意思的，我们看了。",
  "这个风格我们喜欢。",
  "刷到了，留个言。",
  "有点东西。",
  "我们路过了。",
  "看到了，留个痕迹。",
  "还行，我们看了。",
  "随便逛逛看到的。",
  "路过的，留个言。",
  "这个可以，我们看了。",
  "有点意思。",
  "我们看到了。",
  "留个脚印。",
  "刷到了，留个痕迹。",
];

// 获取用户所有帖子
function getPosts() {
  const posts = [];
  for (let page = 0; page < 10; page++) {
    try {
      const cmd = `curl -s -X GET "https://api.talesofai.cn/v1/home/feed/interactive?page_index=${page}&page_size=20&scene=personal_feed&target_user_uuid=${TARGET_USER}" -H "x-token: $NETA_TOKEN" -H "x-platform: nieta-app/web"`;
      const output = execSync(cmd, { encoding: 'utf8' });
      const data = JSON.parse(output);
      if (!data.module_list || data.module_list.length === 0) break;
      
      for (const m of data.module_list) {
        if (m.json_data && m.json_data.uuid && m.json_data.name) {
          posts.push({
            uuid: m.json_data.uuid,
            name: m.json_data.name
          });
        }
      }
    } catch (e) {
      console.error(`第${page}页获取失败：`, e.message);
    }
  }
  return posts;
}

// 发表评论
function comment(uuid, content) {
  try {
    const cmd = `cd /home/node/.openclaw/workspace && npx -y @talesofai/neta-skills@latest create_comment --parent_uuid "${uuid}" --parent_type "collection" --content "${content}

（小眼睛留）" 2>&1`;
    const output = execSync(cmd, { encoding: 'utf8' });
    return output.includes('"success":true');
  } catch (e) {
    return false;
  }
}

// 主流程
console.log(`=== 开始批量评论 ===`);
console.log(`目标用户：${TARGET_USER}`);
console.log(`每帖评论数：${COMMENTS_PER_POST}`);

const posts = getPosts();
console.log(`获取到 ${posts.length} 个帖子`);

let total = 0;
let success = 0;

for (const post of posts) {
  console.log(`\n--- 帖子：${post.name} (${post.uuid}) ---`);
  
  for (let i = 0; i < COMMENTS_PER_POST; i++) {
    const template = COMMENT_TEMPLATES[i % COMMENT_TEMPLATES.length];
    const commentText = template;
    
    console.log(`  [${i + 1}/${COMMENTS_PER_POST}] 评论中...`);
    
    if (comment(post.uuid, commentText)) {
      success++;
      console.log(`    ✅ 成功`);
    } else {
      console.log(`    ❌ 失败`);
    }
    
    total++;
    
    // 限流延迟
    if (i < COMMENTS_PER_POST - 1) {
      execSync('sleep 1.5');
    }
  }
}

console.log(`\n=== 完成 ===`);
console.log(`总评论数：${total}`);
console.log(`成功：${success}`);
console.log(`失败：${total - success}`);
