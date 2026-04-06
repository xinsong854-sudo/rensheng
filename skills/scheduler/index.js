import cron from 'node-cron';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TASKS_FILE = path.join(__dirname, 'tasks.json');
const LOGS_DIR = path.join(__dirname, 'logs');
const WORKSPACE_DIR = path.join(__dirname, '..', '..', '..');

const execAsync = promisify(exec);

// 确保日志目录存在
fs.mkdirSync(LOGS_DIR, { recursive: true });

// 任务存储和调度作业
let tasks = [];
const scheduledJobs = new Map();

// 加载任务
function loadTasks() {
  try {
    if (fs.existsSync(TASKS_FILE)) {
      const data = fs.readFileSync(TASKS_FILE, 'utf-8');
      tasks = JSON.parse(data);
    }
  } catch (e) {
    console.error('加载任务失败:', e);
    tasks = [];
  }
}

// 保存任务
function saveTasks() {
  fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2), 'utf-8');
}

// 颜文字库
const kaomoji = {
  sleep: ['( ⩌ - ⩌ )', 'つ♡⊂', '₍˄·͈༝·͈˄*₎◞ ̑̑'],
  morning: ['✧⁺⸜(●˙▾˙●)⸝⁺✧', '( ⩌ - ⩌ )', '₍˄·͈༝·͈˄*₎◞ ̑̑']
};

// 动态生成晚安寄语
function generateGoodnightMessage() {
  const openings = ['先生，夜深啦', '夜深了先生', '先生，该休息了', '先生，夜深了', '时间不早啦先生'];
  const middles = ['早点休息，别熬太晚', '放下工作去睡觉吧', '今天辛苦了，去休息吧', '明天再继续战斗吧', '今日份的忙碌到此为止'];
  const endings = ['做个好梦，我们明天见', '晚安，明天见', '睡个好觉，明天见', '好好休息，明天见', '去睡觉吧，明天见'];
  const msg = `${pick(openings)}，${pick(middles)}～${pick(endings)}${pick(kaomoji.sleep)}`;
  return msg;
}

// 动态生成早安寄语
function generateGoodmorningMessage() {
  const openings = ['先生，早上好', '先生早安', '早上好先生', '早安先生', '先生，早'];
  const middles = ['新的一天开始啦', '太阳晒屁股啦', '起床啦', '新的一天', '今天也要'];
  const endings = ['加油哦', '元气满满哦', '开心度过哦', '有新的冒险等着你', '继续努力吧'];
  const msg = `${pick(openings)}！${pick(middles)}，${pick(endings)}${pick(kaomoji.morning)}`;
  return msg;
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateMessage(type) {
  if (type === 'goodnight') return generateGoodnightMessage();
  if (type === 'goodmorning') return generateGoodmorningMessage();
  return '定时任务执行了 (つ♡⊂';
}

// 记录执行日志
function logExecution(taskId, success, output = '', error = '') {
  const logFile = path.join(LOGS_DIR, `${taskId}.log`);
  const entry = { timestamp: new Date().toISOString(), success, output: output.slice(0, 10000), error: error.slice(0, 10000) };
  let logs = [];
  if (fs.existsSync(logFile)) {
    logs = JSON.parse(fs.readFileSync(logFile, 'utf-8'));
  }
  logs.push(entry);
  logs = logs.slice(-100);
  fs.writeFileSync(logFile, JSON.stringify(logs, null, 2), 'utf-8');
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    task.lastRunAt = entry.timestamp;
    task.runCount = (task.runCount || 0) + 1;
    saveTasks();
  }
  return entry;
}

// 执行任务
async function executeTask(task) {
  console.log(`\n[${new Date().toISOString()}] 执行任务：${task.name}`);
  try {
    let output = '', error = '';
    if (task.action === 'remind') {
      const type = task.params.type || 'remind';
      const message = generateMessage(type);
      output = message;
      console.log(`  寄语：${message}`);
      if (task.params.channel && task.params.to) {
        try {
          const cmd = `openclaw message send --channel ${task.params.channel} --target '${task.params.to}' --message '${message.replace(/'/g, "'\\''")}'`;
          const result = await execAsync(cmd, { cwd: WORKSPACE_DIR });
          output = result.stdout || message;
        } catch (e) {
          error = e.stderr || e.message;
        }
      }
    } else if (task.action === 'script') {
      const script = task.params.script;
      if (script) {
        const cmd = `node ${script}`;
        const result = await execAsync(cmd, { cwd: WORKSPACE_DIR });
        output = result.stdout;
        error = result.stderr;
      }
    } else if (task.action === 'command') {
      const command = task.params.command;
      if (command) {
        const result = await execAsync(command, { cwd: WORKSPACE_DIR });
        output = result.stdout;
        error = result.stderr;
      }
    }
    logExecution(task.id, !error, output, error);
    console.log(error ? `  ✗ 执行失败：${error.slice(0, 200)}` : `  ✓ 执行成功`);
  } catch (e) {
    console.log(`  ✗ 异常：${e.message}`);
    logExecution(task.id, false, '', e.message);
  }
}

// 调度任务
function scheduleTask(task) {
  if (!task.enabled) return;
  if (scheduledJobs.has(task.id)) {
    scheduledJobs.get(task.id).stop();
    scheduledJobs.delete(task.id);
  }
  const job = cron.schedule(task.cronExpression, async () => {
    await executeTask(task);
  }, { timezone: 'Asia/Shanghai', scheduled: true });
  scheduledJobs.set(task.id, job);
  console.log(`[调度] 任务 "${task.name}" 已调度 (${task.cronExpression})`);
}

// 重新加载所有任务
function reloadAllTasks() {
  loadTasks();
  scheduledJobs.forEach((job) => job.stop());
  scheduledJobs.clear();
  tasks.filter(t => t.enabled).forEach(task => scheduleTask(task));
  console.log(`\n[重载] 已加载 ${tasks.length} 个任务，${scheduledJobs.size} 个已调度\n`);
}

// 初始化
loadTasks();
tasks.filter(t => t.enabled).forEach(task => scheduleTask(task));
console.log(`\n[启动] 调度器已启动，${scheduledJobs.size} 个任务已调度`);
console.log(`时区：Asia/Shanghai (UTC+8)`);
console.log(`任务文件：${TASKS_FILE}`);
console.log(`日志目录：${LOGS_DIR}`);
console.log(`\n按 Ctrl+C 停止\n`);

// 监听文件变化
fs.watch(TASKS_FILE, (eventType) => {
  if (eventType === 'change') {
    console.log('\n[检测] 任务文件变化，重新加载...');
    setTimeout(reloadAllTasks, 500);
  }
});

// 优雅退出
process.on('SIGINT', () => { console.log('\n\n[停止] 正在关闭调度器...'); scheduledJobs.forEach(job => job.stop()); process.exit(0); });
process.on('SIGTERM', () => { console.log('\n\n[停止] 正在关闭调度器...'); scheduledJobs.forEach(job => job.stop()); process.exit(0); });
