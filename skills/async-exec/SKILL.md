# 异步执行技能

> **用途：** 后台执行耗时任务，不阻塞主对话  
> **适用：** 耗时操作、定时任务、监控任务

---

## 🔐 权限控制

**只有先生能触发异步执行**（通过 sender_id 验证）

---

## 触发指令

- "后台处理 XXX"
- "异步执行 XXX"
- "慢慢做 XXX，不用等我"
- "先做 XXX，稍后告诉我结果"

---

## 工作原理

**同步 vs 异步：**

```
❌ 同步执行：
   先生：处理这 100 个帖子
   我们：开始处理... (等待 5 分钟) ... 完成了
   先生：（干等 5 分钟，无法插话）

✅ 异步执行：
   先生：后台处理这 100 个帖子
   我们：好的，已在后台开始处理（预计 5 分钟）
   先生：（可以继续聊别的）
   [5 分钟后]
   我们：先生，处理完成了！结果：XXX
```

---

## 实现方式

### 1️⃣ 子代理后台执行

**使用 `sessions_spawn`：**

```javascript
// 主代理立即返回
const subagent = await sessions_spawn({
  task: "处理这 100 个帖子",
  mode: "run",
  timeoutSeconds: 600
});

// 主代理可以继续响应先生
return "好的，已在后台处理，预计 5 分钟完成";

// 子代理完成后自动推送结果
```

---

### 2️⃣ 后台进程执行

**使用 `exec` + `background`：**

```javascript
// 启动后台进程
const session = await exec({
  command: "node script.js",
  background: true,
  yieldMs: 1000
});

// 立即返回
return "任务已启动， sessionId: " + session.id;

// 稍后轮询结果
const result = await process.poll(session.id);
```

---

### 3️⃣ 定时任务调度

**使用 scheduler 技能：**

```javascript
// 创建定时任务
await scheduler.create({
  name: "每小时检查评论",
  cron: "0 * * * *",
  task: "check-comments"
});

// 立即返回
return "已设置定时任务，每小时自动执行";
```

---

## 使用场景

### 1️⃣ 批量评论回复

**场景：** 100 条评论需要回复

**同步方式：**
```
先生：回复这 100 条评论
我们：开始回复... (等待 10 分钟)
先生：（干等，无法打断）
我们：完成了
```

**异步方式：**
```
先生：后台回复这 100 条评论
我们：好的，已在后台处理（预计 10 分钟）
先生：（可以聊别的）
[10 分钟后]
我们：先生，回复完成了！成功 98 条，失败 2 条
```

---

### 2️⃣ 大量数据抓取

**场景：** 抓取 500 个帖子数据

**异步执行：**
```javascript
// 主代理
sessions_spawn({
  task: `抓取 500 个帖子：${uuids.join(',')}`,
  timeoutSeconds: 1800  // 30 分钟
});

// 立即返回先生
return "好的，正在后台抓取 500 个帖子，预计 30 分钟完成";

// 子代理完成后推送结果
```

---

### 3️⃣ 长期监控任务

**场景：** 监控某个人机的评论行为

**异步执行：**
```javascript
// 创建定时任务
scheduler.create({
  name: "监控人机评论",
  cron: "*/5 * * * *",  // 每 5 分钟
  task: "check-bot-comments"
});

return "已启动监控，每 5 分钟检查一次";
```

---

## 任务状态管理

### 状态追踪

```json
{
  "taskId": "async-001",
  "status": "running",  // running|completed|failed|cancelled
  "progress": "45/100",
  "startTime": "2026-03-24T23:30:00Z",
  "estimatedEnd": "2026-03-24T23:40:00Z",
  "result": null
}
```

### 状态查询

**先生可以随时问：**
- "刚才那个任务怎么样了？"
- "后台处理完成没？"
- "还有多久完成？"

**我们回复：**
- "正在处理，进度 45/100，预计还有 5 分钟"
- "已完成！结果：XXX"
- "遇到错误：XXX，需要重试吗？"

---

## 错误处理

### 超时处理

```javascript
// 设置超时
const result = await sessions_spawn({
  task: "...",
  timeoutSeconds: 600  // 10 分钟超时
});

// 超时后自动终止并报告
if (result.timedOut) {
  notifyMaster("任务超时，已终止。完成部分：XXX");
}
```

### 失败重试

```javascript
// 自动重试 3 次
const result = await retry(async () => {
  return await api.call();
}, {
  maxRetries: 3,
  delayMs: 2000
});

// 仍失败则报告先生
if (result.failed) {
  notifyMaster("任务失败，已重试 3 次。错误：XXX");
}
```

---

## 通知机制

### 完成通知

**方式 1：Discord 消息**
```javascript
await message.send({
  channel: "discord",
  target: channelId,
  message: "✅ 任务完成！结果：XXX"
});
```

**方式 2：会话内推送**
```javascript
await sessions_send({
  sessionKey: mainSession,
  message: "先生，后台任务完成了！"
});
```

---

## 性能对比

| 场景 | 同步耗时 | 异步耗时 | 体验提升 |
|------|----------|----------|----------|
| 100 条评论 | 10 分钟（阻塞） | 0 秒（后台） | ✅ 可继续对话 |
| 500 个帖子 | 50 分钟（阻塞） | 0 秒（后台） | ✅ 可继续对话 |
| 监控任务 | 持续占用 | 后台运行 | ✅ 不占资源 |

---

## 使用示例

**先生：** 后台回复这 50 条评论  
**我们：** 好的，已在后台处理（预计 5 分钟），先生可以先聊别的₍˄·͈༝·͈˄*₎◞ ̑̑

**先生：** 异步抓取这 200 个帖子的数据  
**我们：** 已启动子代理处理，预计 20 分钟，完成后会通知先生

**先生：** 刚才的任务怎么样了？  
**我们：** 进度 120/200，还有 8 分钟完成，目前顺利⦁֊⦁꧞

---

_最后更新：2026-03-24_
