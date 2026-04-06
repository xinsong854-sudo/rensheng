# Public Deploy Skill - 公网部署技能

## 描述

将本地静态网站/HTML 文件快速部署到公网，生成可访问的链接。支持多种隧道服务（Cloudflare Tunnel、localtunnel、ngrok），无需服务器配置。

## 触发条件

用户想要：
- "把 HTML 部署到公网"
- "生成公网链接"
- "让网站可访问"
- "部署静态网站"
- "创建分享链接"
- "把本地文件变成网址"

## 能力

### 1. Cloudflare Tunnel（首选）
- 无需账号（Quick Tunnel 模式）
- HTTPS 加密
- 全球 CDN 加速
- 链接格式：`https://xxx.trycloudflare.com`

### 2. localtunnel
- 无需账号
- 快速生成
- 链接格式：`https://xxx.loca.lt`
- 有安全验证页面（需输入 IP）

### 3. ngrok（需认证）
- 需要账号和 authtoken
- 稳定可靠
- 链接格式：`https://xxx.ngrok.io`

### 4. GitHub Pages（永久部署）
- 永久链接
- 需要 GitHub 账号
- 链接格式：`https://username.github.io/repo/`

## 工作流程

### 方案 A：快速隧道部署（推荐）

```
1. 检查本地 HTTP 服务器是否运行
   - 如果未运行：启动 python3 -m http.server <端口>
   
2. 尝试 Cloudflare Tunnel（首选）
   - 命令：./cloudflared tunnel --url http://localhost:<端口>
   - 解析输出中的公网链接
   
3. 如果 Cloudflare 失败，尝试 localtunnel
   - 命令：npx localtunnel --port <端口>
   - 解析输出中的公网链接
   
4. 返回公网链接给用户
```

### 方案 B：GitHub Pages 永久部署

```
1. 检查是否有 GitHub 账号
   - 如果没有：引导用户注册或选择隧道方案
   
2. 创建/更新 GitHub 仓库
   - 命令：git init / git add / git commit / git push
   
3. 启用 GitHub Pages
   - 设置：Settings → Pages → Source: main branch
   
4. 返回永久链接
   - 格式：https://username.github.io/repo/
```

## 输出格式

### 成功响应

```markdown
## ✅ 网站已部署到公网！

**🌐 公网访问链接：**

```
https://xxx.trycloudflare.com
```

**📱 功能：**
- ✅ 手机适配
- ✅ HTTPS 加密
- ✅ 全球可访问
- ✅ 点击复制（如适用）

**⚠️ 说明：**
- 这是临时隧道链接（保持活跃直到服务停止）
- 如果要永久链接，可以使用 GitHub Pages 方案

---

先生现在可以在任何设备上打开这个链接访问了！₍˄·͈༝·͈˄*₎◞ ̑̑
```

### 失败响应

```markdown
## ⚠️ 部署失败

**原因：** <具体错误信息>

**解决方案：**
1. <方案 1>
2. <方案 2>

---

先生想尝试其他方案吗？₍˄·͈༝·͈˄*₎◞ ̑̑
```

## 脚本示例

### 启动 HTTP 服务器

```bash
cd /path/to/website
python3 -m http.server 8888 &
```

### Cloudflare Tunnel

```bash
# 下载 cloudflared
cd /tmp
wget -q https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64
chmod +x cloudflared-linux-amd64

# 启动隧道
./cloudflared-linux-amd64 tunnel --url http://localhost:8888
```

### localtunnel

```bash
npx localtunnel --port 8888
```

### ngrok（需认证）

```bash
# 下载 ngrok
cd /tmp
wget -q https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-amd64.tgz
tar -xzf ngrok-v3-stable-linux-amd64.tgz

# 设置 authtoken（需要先注册）
./ngrok authtoken <YOUR_AUTHTOKEN>

# 启动隧道
./ngrok http 8888
```

## 文件结构

```
skills/public-deploy/
├── SKILL.md                    # 技能说明（本文件）
├── scripts/
│   ├── deploy-cloudflared.sh   # Cloudflare 部署脚本
│   ├── deploy-localtunnel.sh   # localtunnel 部署脚本
│   ├── deploy-ngrok.sh         # ngrok 部署脚本
│   └── deploy-github.sh        # GitHub Pages 部署脚本
└── README.md                   # 使用说明
```

## 注意事项

1. **端口选择：**
   - 避免使用常见端口（80, 443, 3000, 8080）
   - 推荐使用 8888, 9000, 9999 等

2. **链接有效期：**
   - Cloudflare Quick Tunnel：会话期间有效
   - localtunnel：会话期间有效
   - ngrok：会话期间有效（付费可固定）
   - GitHub Pages：永久有效

3. **安全提醒：**
   - 隧道会暴露本地服务到公网
   - 不要部署敏感数据
   - 使用后立即停止服务

4. **性能优化：**
   - 静态文件建议压缩
   - 大文件考虑 CDN
   - HTML 内联 CSS/JS 减少请求

## 错误处理

| 错误 | 原因 | 解决方案 |
|------|------|----------|
| 502 Bad Gateway | 本地服务器未运行 | 启动 HTTP 服务器 |
| Connection refused | 端口被占用 | 更换端口 |
| Authentication failed | ngrok 未认证 | 使用 Cloudflare 或 localtunnel |
| API Error | 服务暂时故障 | 切换其他方案 |

## 示例对话

**用户：** 把这个 HTML 部署到公网

**助手：** 好的！正在部署～

1. 启动本地服务器（端口 8888）
2. 创建 Cloudflare 隧道
3. 生成公网链接

完成啦！访问链接：`https://xxx.trycloudflare.com`

---

**用户：** 这个链接能用多久？

**助手：** 这是临时隧道链接，只要服务运行就会一直有效。如果要永久链接，可以部署到 GitHub Pages～

---

**用户：** 部署到 GitHub Pages

**助手：** 好的！需要先生授权 GitHub 账号。请提供：
1. GitHub 用户名
2. 仓库名（或使用默认名）

或者先生可以手动操作：
1. 创建新仓库
2. 上传 HTML 文件
3. 启用 GitHub Pages

---

## 版本

- v0.1.0 - 初始版本（2026-03-30）
  - 支持 Cloudflare Tunnel
  - 支持 localtunnel
  - 支持 ngrok
  - 支持 GitHub Pages
