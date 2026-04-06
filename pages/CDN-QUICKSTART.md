# CDN 加速方案 - 快速开始指南

## 🚀 5 分钟快速部署

### 方式一：一键部署脚本（推荐）

```bash
cd /home/node/.openclaw/workspace/pages
./scripts/deploy-cdn.sh
```

脚本会自动：
1. ✅ 检查 Git 状态
2. ✅ 替换资源链接为 jsDelivr CDN
3. ✅ 配置 Cloudflare Pages 缓存规则
4. ✅ 提交并推送到 GitHub
5. ✅ 等待自动部署

### 方式二：手动部署

```bash
# 1. 进入 pages 目录
cd /home/node/.openclaw/workspace/pages

# 2. 运行 CDN 替换脚本
node scripts/cdn-replace.js

# 3. 检查更改
git status

# 4. 提交并推送
git add .
git commit -m "feat: 配置 CDN 加速"
git push origin main

# 5. 等待 1-5 分钟部署生效
```

---

## 📋 部署清单

### 必须完成

- [ ] 运行 `deploy-cdn.sh` 或手动部署
- [ ] 验证网站访问正常
- [ ] 检查浏览器开发者工具确认 CDN 生效

### 可选优化

- [ ] 配置 Cloudinary 图片托管（大量图片时推荐）
- [ ] 迁移到阿里云 OSS（国内用户多时推荐）
- [ ] 启用 Cloudflare 付费功能（需要高级优化时）

---

## 🔍 验证部署

### 1. 检查网站访问

```bash
curl -sI "https://claw-annuonie-pages.talesofai.com/" | head -10
```

应该返回 `HTTP/2 200`

### 2. 检查 CDN 资源

```bash
# 检查 CSS 是否来自 jsDelivr
curl -sI "https://cdn.jsdelivr.net/gh/xinsong854-sudo/danbooru@main/css/style.css" | head -5
```

### 3. 浏览器验证

1. 打开网站：https://claw-annuonie-pages.talesofai.com/
2. 按 `F12` 打开开发者工具
3. 切换到 `Network` 标签
4. 刷新页面
5. 查看资源加载来源：
   - CSS/JS 应该来自 `cdn.jsdelivr.net`
   - 图片应该来自 `cdn.jsdelivr.net` 或 Cloudinary

---

## 📊 预期效果

| 指标 | 部署前 | 部署后 |
|------|--------|--------|
| 首屏加载 | 3-5s | <1s |
| CSS 加载 | 500ms | <100ms |
| JS 加载 | 500ms | <100ms |
| 图片加载 | 2-3s/张 | <1s/张 |
| 全球访问 | 慢 | 快 |

---

## 🛠️ 故障排查

### 问题：网站无法访问

```bash
# 检查 Cloudflare Pages 部署状态
# 访问：https://dash.cloudflare.com/ → Pages → 项目

# 检查 Git 推送是否成功
git log -1

# 重新推送
git push origin main
```

### 问题：CDN 资源 404

```bash
# 检查 jsDelivr 链接是否正确
curl -I "https://cdn.jsdelivr.net/gh/xinsong854-sudo/danbooru@main/css/style.css"

# 如果是 404，可能是文件路径问题
# 检查文件是否在正确的目录
ls -la css/
```

### 问题：缓存未更新

```bash
# 强制刷新 CDN 缓存
# 方法 1：在 URL 后添加版本号
https://cdn.jsdelivr.net/gh/xinsong854-sudo/danbooru@v1.0.1/css/style.css

# 方法 2：等待自动过期（通常几分钟）

# 方法 3：清除 Cloudflare 缓存
# Cloudflare Dashboard → Caching → Configuration → Purge Everything
```

---

## 📞 支持资源

- **详细文档**: `CDN-IMPLEMENTATION.md`
- **jsDelivr**: https://www.jsdelivr.com/
- **Cloudflare Pages**: https://developers.cloudflare.com/pages/
- **Cloudinary**: https://cloudinary.com/

---

## 🎯 下一步

部署完成后，考虑：

1. **监控性能**: 使用 Google PageSpeed Insights 测试
2. **图片优化**: 如果图片多，使用 Cloudinary
3. **高级优化**: 考虑 Cloudflare 付费功能

---

**最后更新**: 2026-04-02  
**维护者**: OpenClaw Agent
