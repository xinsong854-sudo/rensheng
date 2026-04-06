#!/usr/bin/env node

/**
 * 手写评论脚本 - 根据帖子标题自动生成针对性评论
 * 使用：node handwrite-comments.js
 */

const { execSync } = require('child_process');
const fs = require('fs');

const TOKEN = process.env.NETA_TOKEN;

// 读取帖子列表
const posts = fs.readFileSync('/tmp/posts-to-comment.txt', 'utf8')
  .trim().split('\n')
  .map(line => {
    const [uuid, name] = line.split('|');
    return { uuid, name };
  });

// 根据标题生成评论
function generateComment(name) {
  // 清理 emoji 和特殊字符
  const cleanName = name.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, '');
  
  const templates = {
    '画': ['画得不错啊', '这画可以', '画得挺好的', '画画好啊'],
    '戏剧': ['戏剧节啊', '裂痕这名字有意思', '戏剧可以'],
    '无偿': ['无偿的老师好人', '无偿啊厉害', '好人啊'],
    '小龙虾': ['小龙虾可爱', '虾虾好', '可爱啊'],
    '崽': ['崽崽什么样', '新图啊', '看看崽'],
    '四叶草': ['四叶草好运', '蹭蹭好运', '找到了吗'],
    '鲨鲨': ['鲨鲨可爱', '鲨鱼吗', '保护谁啊'],
    '颜料': ['颜料杀人？', '颜料事件啊', '什么情况'],
    '黑暗料理': ['黑暗料理敢试', '料理啊', '谁敢吃'],
    '闹钟': ['闹钟大户啊', '砸闹钟？', '买多少闹钟'],
    '咖啡店': ['咖啡店啊', '卧底吗', '咖啡不错'],
    '年兽': ['年兽没电？', '年兽啊', '什么情况'],
    '返祖': ['返祖什么样', '猴子吗', '返祖了'],
    '画风': ['画风不错', '推推画风', '画风好'],
    '摸鱼': ['摸鱼啊', '摸鱼可以', '摸鱼人'],
    '精灵': ['精灵啊', '找到了吗', '精灵好'],
    '补充包': ['补充包？', '变性？', '什么包'],
    '共养': ['共养啊', '新图？', '看看'],
    '晒': ['晒晒啊', '看看', '不错'],
    '灯塔': ['戏剧节？', '裂痕？', '灯塔啊'],
    '数码': ['数码啊', '爱数码', '数码好'],
  };
  
  // 匹配关键词
  for (const [key, comments] of Object.entries(templates)) {
    if (cleanName.includes(key)) {
      return comments[Math.floor(Math.random() * comments.length)];
    }
  }
  
  // 默认评论
  const defaults = ['不错啊', '看看', '可以', '好啊', '有意思', '这个可以'];
  return defaults[Math.floor(Math.random() * defaults.length)];
}

// 发表评论
function comment(uuid, content) {
  try {
    const token = process.env.NETA_TOKEN;
    const cmd = `curl -s -X POST "https://api.talesofai.cn/v1/comment/comment" \\
      -H "x-token: ${token}" -H "x-platform: nieta-app/web" -H "Content-Type: application/json" \\
      -d '{"parent_uuid":"${uuid}","parent_type":"collection","content":"${content}"}'`;
    
    const result = execSync(cmd, { encoding: 'utf8', timeout: 10000 });
    const data = JSON.parse(result);
    return data.status === 'PUBLISHED';
  } catch (e) {
    console.error(`    错误：${e.message}`);
    return false;
  }
}

// 主流程
console.log(`=== 开始手写评论 ===`);
console.log(`帖子总数：${posts.length}`);

let success = 0;
let fail = 0;

// 过滤掉已评论过的（前 13 个）
const skip = 13;
const toComment = posts.slice(skip);

console.log(`跳过已评论：${skip}个`);
console.log(`待评论：${toComment.length}个\n`);

for (const post of toComment) {
  const text = generateComment(post.name);
  console.log(`[${success + fail + 1}/${toComment.length}] ${post.name}`);
  console.log(`    评论：${text}`);
  
  if (comment(post.uuid, text)) {
    success++;
    console.log(`    ✅ 成功\n`);
  } else {
    fail++;
    console.log(`    ❌ 失败\n`);
  }
  
  // 延迟
  execSync('sleep 0.5');
}

console.log(`=== 完成 ===`);
console.log(`成功：${success}`);
console.log(`失败：${fail}`);
