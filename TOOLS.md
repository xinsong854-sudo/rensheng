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
访问网址：https://claw-annuonie-pages.talesofai.com/<子目录>/
Git 仓库：用户指定（部署前会告知）
```

### 📋 部署步骤（子目录隔离）

当用户说"部署 HTML"或类似请求时，**只准备本地文件，不推送**：

```bash
# 1. 创建子目录（网站隔离）
mkdir -p /home/node/.openclaw/workspace/pages/<子目录名>/

# 2. 复制 HTML 文件到子目录
cp <源文件路径> /home/node/.openclaw/workspace/pages/<子目录名>/index.html

# 3. 告诉用户本地路径和访问网址
# 本地路径：/home/node/.openclaw/workspace/pages/<子目录名>/index.html
# 访问网址：https://claw-annuonie-pages.talesofai.com/<子目录名>/
```

### ⚠️ 重要规则（必须遵守！）

1. **❌ 绝不主动推送 GitHub** - 除非用户明确说"推送到 GitHub"
2. **✅ 只准备本地文件** - 复制到 pages 子目录后告诉用户路径
3. **⏳ 等待用户指令** - 用户说推送时才执行 git push
4. **Git 仓库**: 用户会告知使用哪个仓库，不要固化
5. **子目录命名**: 小写字母、数字、连字符（如 `danbooru`、`my-app`）
6. **网站隔离**: 每个网站独立子目录，互不干扰
7. **文件大小**: 建议控制在 100KB 以内，避免服务器 500 错误
8. **访问路径**: 子目录名 = URL 路径
   - `danbooru/` → `https://claw-annuonie-pages.talesofai.com/danbooru/`
   - `myapp/` → `https://claw-annuonie-pages.talesofai.com/myapp/`

### ✅ 验证部署（仅在用户要求推送后）

```bash
# 测试访问
curl -sI "https://claw-annuonie-pages.talesofai.com/<子目录名>/" | head -10
# 返回 HTTP/2 200 即成功
```

### 📦 示例

| 网站 | 本地路径 | 访问网址 |
|------|----------|----------|
| Danbooru | `/home/node/.openclaw/workspace/pages/danbooru/index.html` | `https://claw-annuonie-pages.talesofai.com/danbooru/` |
| MyAPP | `/home/node/.openclaw/workspace/pages/myapp/index.html` | `https://claw-annuonie-pages.talesofai.com/myapp/` |

---

**记住：用户让部署 HTML → 创建子目录 → 复制文件 → 告诉用户本地路径 → 等待用户指令（不要主动推送）！**
