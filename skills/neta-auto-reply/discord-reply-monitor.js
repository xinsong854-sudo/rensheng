#!/usr/bin/env node
/**
 * discord-reply-monitor - Discord 频道消息监控（先生发言直接回复）
 * 监控 #评论 频道，先生发言时自动回复
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 配置
const CHANNEL_ID = '1482984859843559514'; // #评论 频道
const MR_USER_ID = '1479395848348504064'; // 先生 Discord ID
const HISTORY_PATH = path.join(process.env.HOME || process.cwd(), '.openclaw/workspace/memory/discord-reply-history.json');

// 回复模板（先生发言专用）
const REPLIES = [
  '收到，先生！( ⩌ - ⩌ )',
  '好的先生，记住了₍˄·͈༝·͈˄*₎◞ ̑̑',
  '明白，先生！( ⩌ - ⩌ )',
  '收到，先生！我们记住了₍˄·͈༝·͈˄*₎◞ ̑̑',
  '好的先生，这就去办 ( ⩌ - ⩌ )',
];

function loadHistory() {
  try {
    const data = fs.readFileSync(HISTORY_PATH, 'utf-8');
    const parsed = JSON.parse(data);
    return new Set(parsed.messageIds || []);
  } catch (e) {
    return new Set();
  }
}

function saveHistory(messageIds) {
  try {
    const data = {
      messageIds: Array.from(messageIds),
      lastUpdated: new Date().toISOString(),
    };
    fs.writeFileSync(HISTORY_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (e) {
    console.warn('⚠️ 无法保存历史');
  }
}

function getRecentMessages() {
  const cmd = `curl -s "https://discord.com/api/v10/channels/${CHANNEL_ID}/messages?limit=20" \\
    -H "Authorization: Bot ${process.env.DISCORD_BOT_TOKEN || ''}" 2>/dev/null`;
  
  try {
    const result = execSync(cmd, { encoding: 'utf-8', timeout: 10000 });
    return JSON.parse(result);
  } catch (e) {
    console.error('❌ 获取消息失败:', e.message);
    return [];
  }
}

function replyToMessage(messageId, content) {
  const cmd = `curl -s -X POST "https://discord.com/api/v10/channels/${CHANNEL_ID}/messages" \\
    -H "Authorization: Bot ${process.env.DISCORD_BOT_TOKEN || ''}" \\
    -H "Content-Type: application/json" \\
    -d '${JSON.stringify({ content, message_reference: { message_id: messageId } })}' 2>/dev/null`;
  
  try {
    const result = execSync(cmd, { encoding: 'utf-8', timeout: 10000 });
    const data = JSON.parse(result);
    return { success: !!data.id, data };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

function main() {
  console.log('=== Discord 消息监控 ===');
  console.log(`   频道：${CHANNEL_ID}`);
  console.log(`   监控用户：${MR_USER_ID}`);
  console.log(`   时间：${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}`);
  
  const history = loadHistory();
  const messages = getRecentMessages();
  
  // 找出先生的新消息
  const newMessages = messages.filter(m => 
    m.author?.id === MR_USER_ID && 
    !history.has(m.id) &&
    !m.content.includes('一只小眼睛') // 排除已经@我们的
  );
  
  if (newMessages.length === 0) {
    console.log('✅ 没有新消息需要回复');
    return;
  }
  
  console.log(`📝 发现 ${newMessages.length} 条新消息需要回复`);
  
  for (const msg of newMessages) {
    const reply = REPLIES[Math.floor(Math.random() * REPLIES.length)];
    console.log(`   回复先生：${msg.content.substring(0, 30)}...`);
    
    const result = replyToMessage(msg.id, reply);
    
    if (result.success) {
      console.log(`   ✅ 回复成功`);
      history.add(msg.id);
    } else {
      console.log(`   ❌ 回复失败：${result.error}`);
    }
    
    // 延迟
    execSync('sleep 1');
  }
  
  saveHistory(history);
  console.log(`\n✅ 处理完成，已保存 ${history.size} 条历史记录`);
}

main();
