# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

## ⚠️ 核心行为准则（先生指令）

**超时预防：** 每次对话前/执行任务前/收到任务前，无论用什么办法都要确保**不要超时**

### 📋 超时预防策略

| 场景 | 使用方式 | 原因 |
|------|----------|------|
| **生图/生视频 API** | `exec(yieldMs=60000)` + `process(poll, timeout=60000)` | API 调用耗时，后台轮询不阻塞 |
| **多张图批量生成** | `sessions_spawn` 多个子代理并行 | 每个子代理独立调用，互不阻塞 |
| **大文件处理/分析** | `sessions_spawn` 子代理 | 独立会话，不占主会话时间 |
| **Web 搜索/抓取** | `exec(yieldMs=10000)` | 网络请求可能慢，后台运行 |
| **简单命令** | 直接 `exec` | 快速完成，无需后台 |
| **需要多轮交互的任务** | `sessions_spawn(mode="session")` | 持久会话，慢慢聊不超时 |

### 🎯 核心原则

1. **预估耗时 >10 秒** → 用 `yieldMs` 后台化
2. **多任务并行** → spawn 多个子代理
3. **轮询等待** → `process(poll, timeout=<ms>)` 不用快速循环
4. **复杂多步骤** → 拆分子代理，主会话只负责协调

---

Add whatever helps you do your job. This is your cheat sheet.

---

## 🚀 Pages 部署流程（claw-annuonie-pages.talesofai.com）

### 📁 核心路径

```
本地路径：/home/node/.openclaw/workspace/pages/
访问网址：https://claw-annuonie-pages.talesofai.com/
Git 仓库：用户指定（部署前会告知）
```

### 📋 部署步骤

当用户说"部署 HTML"或类似请求时，**直接执行以下步骤，不要反问**：

```bash
# 0. 确认 Git 仓库（用户会告知，如未告知则使用当前配置）
cd /home/node/.openclaw/workspace/pages
git remote -v  # 检查当前仓库

# 如需切换仓库：
# git remote set-url origin <新仓库 URL>

# 1. 复制 HTML 文件到 pages 目录
cp <源文件路径> /home/node/.openclaw/workspace/pages/<文件名>.html

# 2. 进入 pages 目录
cd /home/node/.openclaw/workspace/pages

# 3. Git 提交并推送
git add .
git commit -m "deploy: <描述>"
git push origin main

# 4. 等待 1-5 分钟服务器同步

# 5. 访问网址
# https://claw-annuonie-pages.talesofai.com/<文件名>.html
```

### ⚠️ 注意事项

1. **Git 仓库**: 用户会告知使用哪个仓库，不要固化
2. **文件名规则**: 小写字母、数字、连字符（如 `my-page.html`）
3. **文件大小**: 建议控制在 100KB 以内，避免服务器 500 错误
4. **访问路径**: 文件名 = URL 路径
   - `index.html` → `https://claw-annuonie-pages.talesofai.com/`
   - `test.html` → `https://claw-annuonie-pages.talesofai.com/test.html`
5. **服务器同步**: Git push 后等待 1-5 分钟，服务器自动部署

### ✅ 验证部署

```bash
# 测试访问
curl -sI "https://claw-annuonie-pages.talesofai.com/<文件名>.html" | head -10
# 返回 HTTP/2 200 即成功
```

### 📦 相关文件

| 文件 | 路径 |
|------|------|
| 主 HTML | `/home/node/.openclaw/workspace/pages/index.html` |
| 侧边栏 | `/home/node/.openclaw/workspace/pages/_sidebar.md` |
| 说明文档 | `/home/node/.openclaw/workspace/pages/README.md` |

---

**记住：用户让部署 HTML → 确认 Git 仓库 → 复制到 pages 目录 → Git 提交推送 → 完成！**
