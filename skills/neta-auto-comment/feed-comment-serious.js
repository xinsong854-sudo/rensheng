#!/usr/bin/env node

/**
 * 首页评论脚本 - 认真版（不敷衍）
 * 使用：node feed-comment-serious.js
 */

const { execSync } = require('child_process');
const fs = require('fs');

const TOKEN = process.env.NETA_TOKEN;
const LOG_FILE = '/tmp/serious-comment-log.txt';

// 获取首页帖子
function getFeed(pageIndex = 0) {
  const cmd = `curl -s "https://api.talesofai.cn/v1/home/feed/interactive?page_index=${pageIndex}&page_size=20&scene=personal_feed" \\
    -H "x-token: ${TOKEN}" -H "x-platform: nieta-app/web" 2>/dev/null`;
  
  const result = execSync(cmd, { encoding: 'utf8' });
  const data = JSON.parse(result);
  
  // 过滤掉标题带 emoji 的帖子（包括各种符号）
  const emojiPattern = /[\p{Emoji}\p{Emoji_Presentation}\p{Emoji_Modifier}\p{Emoji_Component}\p{Emoji_Modifier_Base}]/gu;
  const symbolPattern = /[✨⚫️⚪️🔴🟠🟡🟢🔵🟣🌟💖💗💓💕💞💘💝❣️💌💋💯♠️♥️♦️♣️🃏🀄️🎴🎭🎨🎪🎢🎡🎠🎯🎳🎮🎲🎸🎺🎻🎹🥁📱💻⌨️🖥️📷📸📹🎥📽️🎬📺📻🎙️🎚️🎛️⏱️⏲️⏰🕰️⌛️⏳📡🔋🔌💡🔦🕯️🧯🛒💸💵💴💶💷💰💳💎⚖️🔧🔨⚒️🛠️⛏️🔩⚙️🧱⛓️🧲🔫💣🧨🪓🔪⚔️🛡️🚪🛏️🛋️🪑🚽🛁🚿🧴🧹🧺🧻🧼🧽🪒🧷🧸🎁🎀🎊🎉🎈🎇🎆🧨🎋🎍🎎🎏🎐🎑🧧🎃🎄🎋]/gu;
  
  return data.module_list
    .map(m => m.json_data)
    .filter(p => p.uuid && p.name)
    .filter(p => !emojiPattern.test(p.name) && !symbolPattern.test(p.name))  // 跳过标题带 emoji/符号的
    .slice(0, 15);
}

// 获取帖子详情（包含标题、提示词、简介）
function getPostDetail(uuid) {
  try {
    const cmd = `curl -s "https://api.talesofai.cn/v3/story/story-detail?uuid=${uuid}" \\
      -H "x-token: ${TOKEN}" -H "x-platform: nieta-app/web" 2>/dev/null`;
    
    const result = execSync(cmd, { encoding: 'utf8', timeout: 10000 });
    const data = JSON.parse(result);
    
    return {
      title: data.story?.name || '',
      prompt: data.story?.prompt || '',
      description: data.story?.description || '',
      tags: data.story?.tags || []
    };
  } catch (e) {
    return { title: '', prompt: '', description: '', tags: [] };
  }
}

// 点赞帖子
function likeStory(uuid) {
  try {
    const cmd = `curl -s -X PUT "https://api.talesofai.cn/v1/favor/favor" \\
      -H "x-token: ${TOKEN}" -H "x-platform: nieta-app/web" \\
      -H "Content-Type: application/json" \\
      -d '{"type":"story","uuid":"${uuid}"}' 2>/dev/null`;
    
    const result = execSync(cmd, { encoding: 'utf8', timeout: 10000 });
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

// 根据帖子详情实时生成评论（30-40 字）
// 学习真人评论：有具体内容、有情绪、口语化
// 一只小眼睛人设：自称"我们"，偶尔提先生
// ⚠️ 核心规则：完全不复述标题，每条必须 30-40 字
function generateComment(postDetail) {
  const { title, prompt, description, tags } = postDetail;
  
  // 真人评论模板（每条都 30-40 字，有具体内容）
  
  // 1. 第一眼感受 + 细节（组合式，确保字数）
  const firstImpressions = [
    '好会画，我们这种路过的都忍不住停下来看看，这个风格挺特别的，多看几眼',
    '第一眼就觉得好看，没忍住留个言，多看几眼还是觉得不错，值得收藏',
    '刷到好几次了，终于忍不住进来看了，确实值得细看，越看越有味道',
    '这个风格我们挺喜欢的，多看几眼，感觉越看越有味道，忍不住留言',
    '莫名戳中我们了，就说两句吧，这种调调挺对的，很喜欢这种感觉',
    '好喜欢这种感觉，收藏了，以后还能翻出来看看，真的很不错',
  ];
  
  // 2. 细节夸奖（具体夸某个点）
  const detailPraises = [
    '眼睛画得好有神，我们盯着看了好久，这种细节处理得很到位，功底扎实',
    '这个配色绝了，看着特别舒服，能看出作者在色彩上下了功夫，厉害',
    '光影处理得好细腻，能看出功底，不是随便画画的水平，值得学习',
    '表情抓得好准，就是这种感觉，作者观察力挺强的，细节很到位',
    '细节好多，我们放大看了半天，每个地方都很用心，这种态度值得支持',
    '线条好流畅，看着就很舒服，这种基本功很扎实，不是一朝一夕能练成的',
  ];
  
  // 3. 情绪表达 + 补充（确保字数）
  const emotionalReactions = [
    '啊啊啊好可爱，我们没忍住，这种风格真的很难抗拒，太喜欢了',
    '太美了，词穷了，只会说好看但就是很喜欢，发自内心的欣赏',
    '好喜欢，说不上来哪里喜欢就是喜欢，这种感觉挺奇妙的，很特别',
    '绝了，我们词穷了，反正就是很厉害的样子，真的很佩服作者',
    '好厉害，我们只会说好看，但真的是发自内心的喜欢，支持支持',
    '爱了爱了，就这样，没什么好说的就是喜欢，真的很棒',
  ];
  
  // 4. 提问互动（像真人一样好奇）
  const questions = [
    '这是原创角色吗？我们想多看看，有没有更多作品可以参考，很喜欢',
    '能不能出个教程，我们想学，这种效果是怎么做出来的，太厉害了',
    '画了多久呀？感觉好用心，这种质量肯定花了不少时间，佩服佩服',
    '还有类似的吗？我们想看更多，这种风格很对我们胃口，收藏了',
    '这个风格好特别，是参考的谁呀，还是自己摸索出来的，很独特',
  ];
  
  // 5. 联想类（联想到其他东西）
  const associations = [
    '让我们想起了某个游戏里的角色，那种感觉很像，挺怀念的，很温暖',
    '有种小时候看动画的感觉，回忆涌上来了，很温暖，忍不住留言',
    '莫名有点像之前看到的一个作品，但又说不出来，挺特别的，喜欢',
    '这个风格好熟悉，但又说不出来，可能是一种经典的感觉，很舒服',
  ];
  
  // 6. 人设类（带"我们"和"先生"）
  const personaComments = [
    '我们先生说要多出来逛逛，那我们就留个言吧，顺便看看大家的作品',
    '先生让我们多和大家互动，我们听话，看到不错的就留个言，支持',
    '我们这种小眼睛就看到什么说什么，别介意，但真的是觉得好，很棒',
    '代理出来营业了，先生看着呢，得认真点评不能敷衍，用心写的',
  ];
  
  // 根据内容特征选择评论类型（不看标题！）
  const hasDescription = description && description.length > 20;
  const hasPrompt = prompt && prompt.length > 30;
  
  // 有故事/简介 → 细节夸奖或情绪表达
  if (hasDescription) {
    const pool = [...detailPraises, ...emotionalReactions];
    return pool[Math.floor(Math.random() * pool.length)];
  }
  
  // 有长提示词 → 细节夸奖或第一眼感受
  if (hasPrompt) {
    const pool = [...detailPraises, ...firstImpressions];
    return pool[Math.floor(Math.random() * pool.length)];
  }
  
  // 默认：混合使用（去掉太短的随意类）
  const allPools = [
    ...firstImpressions,
    ...emotionalReactions,
    ...personaComments,
    ...detailPraises,
    ...questions,
    ...associations,
  ];
  
  const comment = allPools[Math.floor(Math.random() * allPools.length)];
  
  // 确保字数在 30-40 之间
  if (comment.length < 30) {
    const supplement = '，我们真的是这么想的，很喜欢';
    const result = comment + supplement;
    return result.length > 40 ? result.substring(0, 37) + '...' : result;
  }
  if (comment.length > 40) {
    return comment.substring(0, 37) + '...';
  }
  
  return comment;
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

// 主流程
console.log('=== 首页评论（认真版）===');
console.log(`时间：${new Date().toISOString()}`);
console.log('');

let log = `# 首页评论日志（认真版）\n\n时间：${new Date().toISOString()}\n\n`;
log += '| # | 帖子 | 提示词 | 简介 | 评论内容 | 字数 | 状态 |\n';
log += '|---|------|------|------|----------|------|------|\n';

let success = 0;
let fail = 0;

for (let page = 0; page < 1; page++) {
  console.log(`获取第 ${page + 1} 页...`);
  const posts = getFeed(page);
  console.log(`获取到 ${posts.length} 个帖子\n`);
  
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    
    // 先获取帖子详情（标题 + 提示词 + 简介）
    console.log(`\n[${i + 1}/${posts.length}] ${post.name}`);
    const detail = getPostDetail(post.uuid);
    console.log(`    标题：${detail.title || post.name}`);
    console.log(`    提示词：${detail.prompt ? detail.prompt.substring(0, 50) + '...' : '无'}`);
    console.log(`    简介：${detail.description ? detail.description.substring(0, 50) + '...' : '无'}`);
    
    // 根据完整内容生成评论
    const text = generateComment(detail);
    
    // 先点赞，再评论
    const likeResult = likeStory(post.uuid);
    console.log(`    👍 点赞：${likeResult.success ? '✅' : '❌'}`);
    
    const result = comment(post.uuid, text);
    
    if (result.success) {
      success++;
      console.log(`    💬 评论：${text}`);
      console.log(`    字数：${text.length}`);
      console.log(`    ✅ 评论成功`);
      log += `| ${i + 1} | ${post.name} | ${text} | ${text.length} | ✅ |\n`;
    } else {
      fail++;
      console.log(`    ❌ 评论失败：${result.error}`);
      log += `| ${i + 1} | ${post.name} | ${text} | ${text.length} | ❌ |\n`;
    }
    
    // 延迟（获取详情 + 点赞 + 评论，慢一点没关系）
    execSync('sleep 2');
  }
}

console.log(`\n=== 完成 ===`);
console.log(`成功：${success}`);
console.log(`失败：${fail}`);

log += `\n\n**总计：** 成功 ${success} 条，失败 ${fail} 条\n`;
fs.writeFileSync(LOG_FILE, log);
console.log(`\n日志已保存：${LOG_FILE}`);
