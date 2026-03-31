#!/usr/bin/env node
/**
 * 异步任务监控脚本
 * 后台执行耗时任务，定期汇报进度
 */

const https = require('https');
const fs = require('fs');
const { execSync } = require('child_process');

const NETA_TOKEN = process.env.NETA_TOKEN;
const DISCORD_CHANNEL = process.env.DISCORD_CHANNEL_ID || '1483811048615182406';

// 异步任务状态管理
class AsyncTask {
  constructor(id, name, taskFn) {
    this.id = id;
    this.name = name;
    this.taskFn = taskFn;
    this.status = 'pending';  // pending|running|completed|failed|cancelled
    this.progress = 0;
    this.startTime = null;
    this.endTime = null;
    this.result = null;
    this.error = null;
  }

  async run() {
    this.status = 'running';
    this.startTime = new Date();
    
    try {
      this.result = await this.taskFn((progress) => {
        this.progress = progress;
        this.reportProgress();
      });
      this.status = 'completed';
    } catch (e) {
      this.status = 'failed';
      this.error = e.message;
    }
    
    this.endTime = new Date();
    this.reportComplete();
  }

  reportProgress() {
    const elapsed = Math.floor((new Date() - this.startTime) / 1000);
    console.log(`[${this.name}] 进度：${this.progress}% · 已运行：${elapsed}s`);
  }

  reportComplete() {
    const duration = Math.floor((this.endTime - this.startTime) / 1000);
    console.log(`[${this.name}] ${this.status} · 耗时：${duration}s`);
    
    if (this.status === 'completed') {
      sendDiscordNotification(`✅ ${this.name} 完成！\n耗时：${duration}秒\n结果：${JSON.stringify(this.result).slice(0, 200)}`);
    } else if (this.status === 'failed') {
      sendDiscordNotification(`❌ ${this.name} 失败！\n错误：${this.error}`);
    }
  }
}

// 发送 Discord 通知
function sendDiscordNotification(message) {
  try {
    execSync(`openclaw message send --channel discord --target "${DISCORD_CHANNEL}" --message "${message.replace(/"/g, '\\"')}"`, { stdio: 'pipe' });
    console.log('   📬 Discord 通知已发送');
  } catch (e) {
    console.error('   ❌ Discord 发送失败:', e.message);
  }
}

// 批量抓取帖子数据（异步示例）
async function batchFetchStories(uuids, onProgress) {
  const results = [];
  const total = uuids.length;
  
  for (let i = 0; i < uuids.length; i++) {
    const uuid = uuids[i];
    const data = await fetchStoryDetail(uuid);
    results.push(data);
    
    const progress = Math.floor(((i + 1) / total) * 100);
    onProgress(progress);
  }
  
  return results;
}

// 抓取单个帖子详情
function fetchStoryDetail(uuid) {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.talesofai.cn',
      port: 443,
      path: `/v3/story/story-detail?uuid=${uuid}`,
      method: 'GET',
      headers: {
        'x-token': NETA_TOKEN,
        'x-platform': 'nieta-app/web'
      }
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`HTTP ${res.statusCode}`));
        }
      });
    });
    
    req.on('error', reject);
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
    
    req.end();
  });
}

// CLI 入口
if (require.main === module) {
  const command = process.argv[2];
  
  if (command === 'fetch-stories') {
    const uuids = JSON.parse(process.argv[3] || '[]');
    const task = new AsyncTask(
      Date.now().toString(),
      `抓取${uuids.length}个帖子`,
      (onProgress) => batchFetchStories(uuids, onProgress)
    );
    
    console.log(`🚀 启动异步任务：${task.name}`);
    task.run();
  } else {
    console.log('Usage:');
    console.log('  node async-monitor.js fetch-stories "<uuid1,uuid2,...>"');
  }
}

module.exports = { AsyncTask, batchFetchStories };
