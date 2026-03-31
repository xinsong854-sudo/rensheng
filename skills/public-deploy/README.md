# Public Deploy Skill - 公网部署技能

## 快速开始

### 方法 1：直接对话触发

告诉助手：
- "把这个 HTML 部署到公网"
- "生成公网链接"
- "让网站可访问"

### 方法 2：使用脚本

```bash
# Cloudflare Tunnel（推荐）
./skills/public-deploy/scripts/deploy-cloudflared.sh 8888 /path/to/website

# localtunnel
./skills/public-deploy/scripts/deploy-localtunnel.sh 8888 /path/to/website

# ngrok（需要 authtoken）
./skills/public-deploy/scripts/deploy-ngrok.sh 8888 /path/to/website <AUTHTOKEN>
```

## 服务对比

| 服务 | 账号 | HTTPS | 有效期 | 速度 |
|------|------|-------|--------|------|
| Cloudflare Tunnel | ❌ | ✅ | 临时 | ⭐⭐⭐⭐⭐ |
| localtunnel | ❌ | ✅ | 临时 | ⭐⭐⭐⭐ |
| ngrok | ✅ | ✅ | 临时/永久 | ⭐⭐⭐⭐⭐ |
| GitHub Pages | ✅ | ✅ | 永久 | ⭐⭐⭐⭐⭐ |

## 常见问题

**Q: 502 Bad Gateway 怎么办？**
A: 本地服务器可能未运行，检查端口是否正确。

**Q: 链接多久会失效？**
A: 隧道服务在会话期间有效，GitHub Pages 永久有效。

**Q: 能自定义域名吗？**
A: ngrok 付费版和 GitHub Pages 支持自定义域名。

## 版本

v0.1.0 - 初始版本（2026-03-30）
