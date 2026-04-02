# CDN 加速实施方案

## 📊 当前项目状态

- **Git 仓库**: `https://github.com/xinsong854-sudo/danbooru.git`
- **部署平台**: Cloudflare Pages
- **访问网址**: `https://claw-annuonie-pages.talesofai.com/`
- **资源类型**: HTML, CSS, JS, 图片 (JPG)

---

## 🚀 方案一：jsDelivr（GitHub 加速）

### 适用场景
- 静态资源（CSS、JS、字体）加速
- 全球访问优化
- 免费、无需配置

### 实施步骤

#### 1. 使用 jsDelivr CDN 链接

将本地资源引用改为 jsDelivr CDN 链接：

```html
<!-- 原链接 -->
<link rel="stylesheet" href="css/style.css">
<script src="js/lore-data.js"></script>

<!-- jsDelivr CDN 链接 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/xinsong854-sudo/danbooru@main/css/style.css">
<script src="https://cdn.jsdelivr.net/gh/xinsong854-sudo/danbooru@main/js/lore-data.js"></script>
```

#### 2. 版本锁定（推荐）

使用特定 Git 标签或 commit hash 避免缓存问题：

```html
<!-- 使用版本号 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/xinsong854-sudo/danbooru@v1.0.0/css/style.css">

<!-- 使用 commit hash -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/xinsong854-sudo/danbooru@abc123def456/css/style.css">
```

#### 3. 图片加速

```html
<!-- 原图片链接 -->
<img src="images/ca-001.jpg" alt="物品图片">

<!-- jsDelivr CDN 链接 -->
<img src="https://cdn.jsdelivr.net/gh/xinsong854-sudo/danbooru@main/images/ca-001.jpg" alt="物品图片">
```

### 优势
- ✅ 免费使用
- ✅ 全球 CDN 节点
- ✅ 自动 HTTPS
- ✅ 支持 HTTP/2
- ✅ 自动 Gzip 压缩

### 限制
- ⚠️ 单文件最大 50MB
- ⚠️ 仓库总大小限制 10GB
- ⚠️ 每月请求数限制（通常够用）

### 自动化脚本

创建 `scripts/cdn-replace.js` 自动替换链接：

```javascript
// cdn-replace.js
const fs = require('fs');
const path = require('path');

const CDN_BASE = 'https://cdn.jsdelivr.net/gh/xinsong854-sudo/danbooru@main/';
const PAGES_DIR = '/home/node/.openclaw/workspace/pages/';

function replaceWithCDN(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 替换 CSS 链接
    content = content.replace(
        /href=["']([^"']*\.(css|ico))["']/g,
        (match, p1) => `href="${CDN_BASE}${p1}"`
    );
    
    // 替换 JS 链接
    content = content.replace(
        /src=["']([^"']*\.(js))["']/g,
        (match, p1) => `src="${CDN_BASE}${p1}"`
    );
    
    // 替换图片链接
    content = content.replace(
        /src=["']([^"']*\.(jpg|jpeg|png|gif|webp|svg))["']/g,
        (match, p1) => `src="${CDN_BASE}${p1}"`
    );
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ ${filePath} 已更新为 CDN 链接`);
}

// 处理所有 HTML 文件
const htmlFiles = ['index.html', 'wiki-org.html', 'wiki-region.html', 'upload.html'];
htmlFiles.forEach(file => {
    const filePath = path.join(PAGES_DIR, file);
    if (fs.existsSync(filePath)) {
        replaceWithCDN(filePath);
    }
});
```

---

## ☁️ 方案二：Cloudflare Pages 优化

### 当前状态
项目已部署在 Cloudflare Pages，可进行以下优化：

### 实施步骤

#### 1. 启用 Cloudflare CDN 缓存

在 Cloudflare Dashboard 中配置：

```
路径：Cloudflare Dashboard → Pages → 项目设置 → 构建与部署

✅ 启用自动缓存
✅ 启用浏览器缓存 TTL: 7 天
✅ 启用边缘缓存
```

#### 2. 配置缓存规则

创建 `_headers` 文件（放在 `pages/` 根目录）：

```
# _headers
/*
  Cache-Control: public, max-age=31536000, immutable
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Content-Security-Policy: default-src 'self' https://cdn.jsdelivr.net; img-src 'self' https: data:;
```

#### 3. 配置重定向规则

创建 `_redirects` 文件：

```
# _redirects
# 永久重定向示例
/old-page.html  /new-page.html  301

# 代理规则（如需要）
/api/*  https://api.example.com/:splat  200
```

#### 4. 优化构建配置

在 Cloudflare Pages 设置中：

```yaml
# 构建设置
构建命令：npm run build (如有)
发布目录：/
```

#### 5. 启用 Cloudflare Polish（图片优化）

如果升级到付费计划：
- 自动图片压缩
- WebP 格式转换
- 自适应图片尺寸

### 优势
- ✅ 已与当前部署集成
- ✅ 自动 HTTPS
- ✅ 全球 CDN 网络
- ✅ DDoS 防护
- ✅ 免费计划足够使用

### 限制
- ⚠️ 免费版每月 100,000 请求
- ⚠️ 图片优化功能需付费

---

## 🖼️ 方案三：图片托管到专门 CDN

### 适用场景
- 大量图片资源
- 需要图片优化（压缩、格式转换）
- 需要图片处理（裁剪、缩放）

### 选项对比

| 服务商 | 免费额度 | 优势 | 劣势 |
|--------|---------|------|------|
| **Cloudinary** | 25GB/月 | 强大图片处理 API | 免费版有水印 |
| **Imgur** | 无限 | 简单免费 | 不适合商业项目 |
| **Sm.ms** | 5GB | 国内访问快 | 容量有限 |
| **阿里云 OSS** | 按量付费 | 国内速度快 | 需付费 |
| **腾讯云 COS** | 按量付费 | 国内速度快 | 需付费 |

### 推荐方案：Cloudinary（开发阶段）+ 阿里云 OSS（生产阶段）

#### Cloudinary 实施步骤

1. **注册账号**: https://cloudinary.com

2. **上传图片**:
```bash
# 安装 CLI
npm install -g cloudinary

# 配置
cloudinary config cloud_name=xxx api_key=xxx api_secret=xxx

# 批量上传图片
for img in images/*.jpg; do
    cloudinary upload "$img" --folder pseudo-artifacts
done
```

3. **更新 HTML 引用**:
```html
<!-- 原链接 -->
<img src="images/ca-001.jpg" alt="物品图片">

<!-- Cloudinary CDN 链接 -->
<img src="https://res.cloudinary.com/your-cloud/image/upload/v1234567890/pseudo-artifacts/ca-001.jpg" alt="物品图片">

<!-- 带优化的链接（自动 WebP + 压缩） -->
<img src="https://res.cloudinary.com/your-cloud/image/upload/f_auto,q_auto/pseudo-artifacts/ca-001.jpg" alt="物品图片">
```

#### 阿里云 OSS 实施步骤

1. **创建 OSS Bucket**
```bash
# 安装 ossutil
wget http://gosspublic.alicdn.com/ossutil/1.7.13/ossutil64
chmod +x ossutil64
./ossutil64 config

# 创建 bucket
./ossutil64 mb oss://pseudo-artifacts
```

2. **上传图片**
```bash
# 批量上传
./ossutil64 cp -r images/ oss://pseudo-artifacts/images/ --recursive
```

3. **配置 CDN 加速**
```
OSS 控制台 → 数据传输 → CDN 加速 → 启用
```

4. **更新 HTML 引用**
```html
<!-- OSS CDN 链接 -->
<img src="https://pseudo-artifacts.oss-accelerate.aliyuncs.com/images/ca-001.jpg" alt="物品图片">
```

### 自动化脚本

创建 `scripts/upload-images.sh`:

```bash
#!/bin/bash

# 图片上传脚本
IMAGES_DIR="/home/node/.openclaw/workspace/pages/images/"
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# 使用 curl 上传
for img in "$IMAGES_DIR"*.jpg; do
    filename=$(basename "$img")
    curl -X POST -u "$CLOUDINARY_API_KEY:$CLOUDINARY_API_SECRET" \
         "https://api.cloudinary.com/v1_1/$CLOUDINARY_CLOUD_NAME/image/upload" \
         -F "file=@$img" \
         -F "folder=pseudo-artifacts" \
         -F "public_id=$filename"
done
```

---

## 🎯 推荐实施方案

### 阶段一：快速启动（1 天）

1. **使用 jsDelivr 加速静态资源**
   - 修改 HTML 中的 CSS/JS 引用
   - 图片暂时保持本地

2. **优化 Cloudflare Pages 配置**
   - 添加 `_headers` 文件
   - 配置缓存规则

### 阶段二：图片优化（1 周）

1. **迁移图片到 Cloudinary**
   - 上传所有图片
   - 更新 HTML 引用
   - 启用自动格式转换

### 阶段三：生产优化（按需）

1. **迁移到阿里云 OSS**（如果国内用户多）
2. **启用 Cloudflare 付费功能**（如果需要高级优化）

---

## 📝 快速实施清单

### 立即执行（jsDelivr）

```bash
# 1. 进入 pages 目录
cd /home/node/.openclaw/workspace/pages

# 2. 备份当前文件
cp index.html index.html.backup

# 3. 使用脚本替换 CDN 链接
node /home/node/.openclaw/workspace/scripts/cdn-replace.js

# 4. 提交更改
git add .
git commit -m "feat: 使用 jsDelivr CDN 加速静态资源"
git push origin main

# 5. 等待 1-5 分钟部署
```

### 验证部署

```bash
# 检查 CDN 链接是否生效
curl -sI "https://cdn.jsdelivr.net/gh/xinsong854-sudo/danbooru@main/css/style.css" | head -10

# 检查页面访问
curl -sI "https://claw-annuonie-pages.talesofai.com/" | head -10
```

---

## 📊 性能对比

| 方案 | 首屏加载 | 图片加载 | 全球访问 | 成本 |
|------|---------|---------|---------|------|
| 当前（无 CDN） | 3-5s | 2-3s/张 | 慢 | ¥0 |
| jsDelivr | 1-2s | 1-2s/张 | 快 | ¥0 |
| Cloudflare Pages | 1-2s | 1-2s/张 | 快 | ¥0 |
| Cloudinary 图片 | 1-2s | 0.5-1s/张 | 很快 | ¥0 (免费额度) |
| 组合方案 | <1s | <0.5s/张 | 很快 | ¥0 |

---

## 🔧 故障排查

### jsDelivr 缓存问题
```bash
# 强制刷新 CDN 缓存（在 URL 后添加版本号）
https://cdn.jsdelivr.net/gh/user/repo@v1.0.0/file.css
https://cdn.jsdelivr.net/gh/user/repo@abc123/file.css
```

### Cloudflare 缓存清除
```
Cloudflare Dashboard → Caching → Configuration → Purge Everything
```

### 图片加载失败
```bash
# 检查图片是否公开访问
curl -I "https://cdn.jsdelivr.net/gh/xinsong854-sudo/danbooru@main/images/ca-001.jpg"

# 应该返回 HTTP/2 200
```

---

## 📞 支持资源

- jsDelivr 文档：https://www.jsdelivr.com/
- Cloudflare Pages 文档：https://developers.cloudflare.com/pages/
- Cloudinary 文档：https://cloudinary.com/documentation
- 阿里云 OSS 文档：https://help.aliyun.com/product/31815.html

---

**最后更新**: 2026-04-02
**维护者**: OpenClaw Agent
