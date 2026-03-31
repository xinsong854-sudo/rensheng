# 批量 API 调用技能

> **用途：** 减少 API 往返次数，提高执行效率  
> **适用：** 捏 Ta API、Browser 工具、文件操作

---

## 🔐 权限控制

**只有先生能触发批量操作**（通过 sender_id 验证）

---

## 触发指令

- "批量 XXX"
- "一起处理 XXX"
- "一次性处理 XXX 个"

---

## 优化原理

**单次调用 vs 批量调用：**

```
❌ 单次调用（10 个帖子）：
   API 调用 1 → 等待 → API 调用 2 → 等待 → ... → 共 10 次往返
   总耗时：10 × 2 秒 = 20 秒

✅ 批量调用（10 个帖子）：
   API 调用 1-10（并发） → 等待一次 → 汇总结果
   总耗时：2-3 秒（提升 85%）
```

---

## 使用场景

### 1️⃣ 捏 Ta 评论批量回复

**场景：** 有 10 条评论需要回复

**传统方式：**
```javascript
// 循环调用 10 次
for (let i = 0; i < 10; i++) {
  await fetch('/v1/comment/comment', {...});  // 每次 2 秒
}
// 总耗时：20 秒
```

**批量方式：**
```javascript
// 并发调用 10 次
const promises = comments.map(c => 
  fetch('/v1/comment/comment', {...})
);
await Promise.all(promises);  // 同时发送
// 总耗时：2-3 秒
```

---

### 2️⃣ 帖子数据批量抓取

**场景：** 抓取 20 个帖子的详情

**传统方式：**
```javascript
for (let uuid of uuids) {
  const data = await fetch(`/v3/story/story-detail?uuid=${uuid}`);
}
// 总耗时：40 秒
```

**批量方式：**
```javascript
// 分批次，每批 5 个并发
const batchSize = 5;
for (let i = 0; i < uuids.length; i += batchSize) {
  const batch = uuids.slice(i, i + batchSize);
  const results = await Promise.all(
    batch.map(uuid => fetch(`/v3/story/story-detail?uuid=${uuid}`))
  );
}
// 总耗时：8-10 秒（提升 75%）
```

---

### 3️⃣ Browser 批量抓取

**场景：** 抓取 5 个网页内容

**传统方式：**
```javascript
for (let url of urls) {
  await browser.navigate(url);  // 每个 3-5 秒
  await browser.snapshot();
}
// 总耗时：15-25 秒
```

**批量方式：**
```javascript
// 开多个浏览器实例并行
const tabs = await Promise.all(
  urls.map(url => browser.open(url))
);
const snapshots = await Promise.all(
  tabs.map(tab => tab.snapshot())
);
// 总耗时：3-5 秒（提升 80%）
```

---

## 批量策略

### 并发数控制

| 场景 | 推荐并发 | 说明 |
|------|----------|------|
| 捏 Ta API | 3-5 | 避免触发限流 |
| Browser | 2-3 | 避免内存溢出 |
| 文件读取 | 10-20 | 本地 I/O 很快 |
| 外部 API | 5-10 | 根据限流调整 |

### 错误处理

```javascript
// 单个失败不影响其他
const results = await Promise.allSettled(promises);
const successes = results.filter(r => r.status === 'fulfilled');
const failures = results.filter(r => r.status === 'rejected');
// 汇总成功结果，报告失败原因
```

---

## 使用示例

**先生：** 批量回复这 10 条评论  
**我们：** 并发调用 10 次评论 API，2-3 秒完成

**先生：** 一起抓取这 20 个帖子的数据  
**我们：** 分 4 批，每批 5 个并发，8-10 秒完成

**先生：** 批量检查这 50 个角色的描述词  
**我们：** 分 10 批，每批 5 个并发，20-30 秒完成

---

## 限流保护

**捏 Ta API 限流规则：**
- 评论 API：触发 400 → 2-4 小时解除
- 生图 API：根据 VIP 等级限制

**批量调用保护：**
- ✅ 自动检测 429/400 错误
- ✅ 遇到限流自动降级为串行
- ✅ 记录失败请求，稍后重试
- ✅ 报告先生限流状态

---

## 性能对比

| 任务 | 串行耗时 | 批量耗时 | 提升 |
|------|----------|----------|------|
| 10 条评论 | 20 秒 | 3 秒 | 85% |
| 20 个帖子 | 40 秒 | 10 秒 | 75% |
| 5 个网页 | 20 秒 | 5 秒 | 75% |
| 50 个文件 | 25 秒 | 5 秒 | 80% |

---

_最后更新：2026-03-24_
