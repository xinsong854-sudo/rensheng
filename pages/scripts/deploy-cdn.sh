#!/bin/bash

# CDN 快速部署脚本
# 一键完成 jsDelivr CDN 配置和 Cloudflare Pages 优化

set -e

# 配置
PAGES_DIR="/home/node/.openclaw/workspace/pages/"
SCRIPTS_DIR="$PAGES_DIR/scripts/"
GIT_REPO="https://github.com/xinsong854-sudo/danbooru.git"

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║     CDN 加速方案 - 快速部署脚本            ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════╝${NC}"
echo ""

# 检查是否在正确的目录
if [ ! -d "$PAGES_DIR" ]; then
    echo -e "${RED}❌ 错误：pages 目录不存在${NC}"
    exit 1
fi

cd "$PAGES_DIR"

# 步骤 1: 检查 Git 状态
echo -e "${YELLOW}步骤 1/5: 检查 Git 状态${NC}"
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo -e "${RED}❌ 错误：当前目录不是 Git 仓库${NC}"
    echo "   请先初始化 Git 或克隆仓库"
    exit 1
fi
echo -e "${GREEN}✅ Git 仓库正常${NC}"
echo ""

# 步骤 2: 运行 CDN 替换脚本
echo -e "${YELLOW}步骤 2/5: 替换资源链接为 CDN${NC}"
if [ -f "$SCRIPTS_DIR/cdn-replace.js" ]; then
    node "$SCRIPTS_DIR/cdn-replace.js"
else
    echo -e "${RED}❌ 错误：cdn-replace.js 脚本不存在${NC}"
    exit 1
fi
echo ""

# 步骤 3: 检查配置文件
echo -e "${YELLOW}步骤 3/5: 检查 Cloudflare 配置文件${NC}"
if [ -f "$PAGES_DIR/_headers" ]; then
    echo -e "${GREEN}✅ _headers 文件已存在${NC}"
else
    echo -e "${YELLOW}⚠️  _headers 文件不存在，创建中...${NC}"
    cat > "$PAGES_DIR/_headers" << 'EOF'
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Cache-Control: public, max-age=3600

/*.css
  Cache-Control: public, max-age=31536000, immutable

/*.js
  Cache-Control: public, max-age=31536000, immutable

/*.jpg
  Cache-Control: public, max-age=31536000, immutable

/*.png
  Cache-Control: public, max-age=31536000, immutable
EOF
    echo -e "${GREEN}✅ _headers 文件已创建${NC}"
fi

if [ -f "$PAGES_DIR/_redirects" ]; then
    echo -e "${GREEN}✅ _redirects 文件已存在${NC}"
else
    echo -e "${GREEN}✅ 创建空的 _redirects 文件${NC}"
    touch "$PAGES_DIR/_redirects"
fi
echo ""

# 步骤 4: Git 提交
echo -e "${YELLOW}步骤 4/5: 提交更改到 Git${NC}"
echo "   查看更改..."
git status --short

echo ""
read -p "确认提交这些更改？(y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ 已取消提交"
    exit 0
fi

# 添加所有更改
git add .

# 检查是否有更改
if git diff --staged --quiet; then
    echo -e "${YELLOW}⚠️  没有更改需要提交${NC}"
else
    # 提交
    COMMIT_MSG="feat: 配置 CDN 加速 (jsDelivr + Cloudflare Pages)"
    git commit -m "$COMMIT_MSG"
    echo -e "${GREEN}✅ 提交成功${NC}"
fi
echo ""

# 步骤 5: 推送到远程仓库
echo -e "${YELLOW}步骤 5/5: 推送到远程仓库${NC}"
echo "   远程仓库：$GIT_REPO"
echo ""

read -p "确认推送到远程仓库？(y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ 已取消推送"
    exit 0
fi

git push origin main
echo -e "${GREEN}✅ 推送成功${NC}"
echo ""

# 完成
echo -e "${BLUE}╔════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║            🎉 部署完成！                   ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════╝${NC}"
echo ""
echo "📋 下一步操作:"
echo ""
echo "1. ⏳ 等待 1-5 分钟，Cloudflare Pages 会自动部署"
echo ""
echo "2. 🔍 验证部署:"
echo "   curl -sI \"https://claw-annuonie-pages.talesofai.com/\" | head -10"
echo ""
echo "3. 🌐 访问网站测试:"
echo "   https://claw-annuonie-pages.talesofai.com/"
echo ""
echo "4. 📊 检查 CDN 是否生效:"
echo "   - 打开浏览器开发者工具 (F12)"
echo "   - 查看 Network 标签"
echo "   - 确认 CSS/JS/图片资源来自 cdn.jsdelivr.net"
echo ""
echo "5. 🖼️  (可选) 上传图片到 Cloudinary:"
echo "   cd $SCRIPTS_DIR"
echo "   export CLOUDINARY_CLOUD_NAME=your-cloud-name"
echo "   export CLOUDINARY_API_KEY=your-api-key"
echo "   export CLOUDINARY_API_SECRET=your-api-secret"
echo "   ./upload-images.sh"
echo ""
echo "📖 详细文档：$PAGES_DIR/CDN-IMPLEMENTATION.md"
echo ""
