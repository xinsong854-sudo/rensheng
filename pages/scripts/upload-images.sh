#!/bin/bash

# Cloudinary 图片上传脚本
# 使用前需要安装 jq: apt-get install jq 或 brew install jq

set -e

# 配置（请替换为您的 Cloudinary 凭据）
CLOUDINARY_CLOUD_NAME="${CLOUDINARY_CLOUD_NAME:-your-cloud-name}"
CLOUDINARY_API_KEY="${CLOUDINARY_API_KEY:-your-api-key}"
CLOUDINARY_API_SECRET="${CLOUDINARY_API_SECRET:-your-api-secret}"

# 目录配置
IMAGES_DIR="/home/node/.openclaw/workspace/pages/images/"
UPLOAD_FOLDER="pseudo-artifacts"

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "🚀 Cloudinary 图片上传脚本"
echo "=========================="
echo ""

# 检查配置
if [ "$CLOUDINARY_CLOUD_NAME" = "your-cloud-name" ]; then
    echo -e "${RED}❌ 错误：请配置 Cloudinary 凭据${NC}"
    echo ""
    echo "使用方法 1（环境变量）:"
    echo "  export CLOUDINARY_CLOUD_NAME=your-cloud-name"
    echo "  export CLOUDINARY_API_KEY=your-api-key"
    echo "  export CLOUDINARY_API_SECRET=your-api-secret"
    echo "  ./upload-images.sh"
    echo ""
    echo "使用方法 2（直接传入）:"
    echo "  CLOUDINARY_CLOUD_NAME=xxx CLOUDINARY_API_KEY=xxx CLOUDINARY_API_SECRET=xxx ./upload-images.sh"
    exit 1
fi

# 检查图片目录
if [ ! -d "$IMAGES_DIR" ]; then
    echo -e "${RED}❌ 错误：图片目录不存在：$IMAGES_DIR${NC}"
    exit 1
fi

# 统计图片数量
IMAGE_COUNT=$(find "$IMAGES_DIR" -maxdepth 1 -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.gif" -o -name "*.webp" \) | wc -l)

echo "☁️  Cloudinary 配置:"
echo "   Cloud Name: $CLOUDINARY_CLOUD_NAME"
echo "   上传文件夹：$UPLOAD_FOLDER"
echo ""
echo "📊 待上传图片：$IMAGE_COUNT 张"
echo "📁 图片目录：$IMAGES_DIR"
echo ""

# 询问是否继续
if [ "$IMAGE_COUNT" -eq 0 ]; then
    echo -e "${YELLOW}⚠️  没有找到图片文件${NC}"
    exit 0
fi

read -p "确认上传 $IMAGE_COUNT 张图片到 Cloudinary？(y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ 已取消上传"
    exit 0
fi

echo ""
echo "📤 开始上传..."
echo ""

# 创建结果文件
RESULT_FILE="/tmp/cloudinary-upload-$(date +%Y%m%d-%H%M%S).json"
echo "[]" > "$RESULT_FILE"

# 上传计数器
SUCCESS=0
FAILED=0

# 遍历并上传所有图片
for img in "$IMAGES_DIR"*.{jpg,jpeg,png,gif,webp} 2>/dev/null; do
    # 检查文件是否存在（防止 glob 失败）
    [ -e "$img" ] || continue
    
    filename=$(basename "$img")
    public_id="${filename%.*}"  # 去掉扩展名
    
    echo -n "   📤 上传 $filename ... "
    
    # 使用 curl 上传到 Cloudinary
    response=$(curl -s -X POST \
        "https://api.cloudinary.com/v1_1/$CLOUDINARY_CLOUD_NAME/image/upload" \
        -u "$CLOUDINARY_API_KEY:$CLOUDINARY_API_SECRET" \
        -F "file=@$img" \
        -F "folder=$UPLOAD_FOLDER" \
        -F "public_id=$public_id" \
        -F "overwrite=true")
    
    # 检查上传结果
    if echo "$response" | jq -e '.public_id' > /dev/null 2>&1; then
        echo -e "${GREEN}✅${NC}"
        SUCCESS=$((SUCCESS + 1))
        
        # 提取 URL
        secure_url=$(echo "$response" | jq -r '.secure_url')
        echo "      URL: $secure_url"
        
        # 保存结果
        jq --arg url "$secure_url" --arg id "$public_id" \
           '. += [{"original": $id, "url": $url}]' \
           "$RESULT_FILE" > /tmp/temp.json && mv /tmp/temp.json "$RESULT_FILE"
    else
        echo -e "${RED}❌${NC}"
        FAILED=$((FAILED + 1))
        echo "      错误：$response"
    fi
done

echo ""
echo "=========================="
echo "✅ 上传完成！"
echo ""
echo "📊 统计:"
echo "   成功：$SUCCESS 张"
echo "   失败：$FAILED 张"
echo ""
echo "📄 结果文件：$RESULT_FILE"
echo ""

if [ $SUCCESS -gt 0 ]; then
    echo "🔗 使用示例:"
    echo ""
    echo "HTML:"
    echo '  <img src="https://res.cloudinary.com/'"$CLOUDINARY_CLOUD_NAME"'/image/upload/f_auto,q_auto/'"$UPLOAD_FOLDER"'/ca-001.jpg" alt="图片">'
    echo ""
    echo "优化参数:"
    echo "  f_auto  - 自动选择最佳格式（WebP/AVIF）"
    echo "  q_auto  - 自动质量优化"
    echo "  w_800   - 限制宽度为 800px"
    echo "  h_600   - 限制高度为 600px"
    echo "  c_fill  - 裁剪填充"
    echo ""
    echo "完整 URL 示例:"
    echo "  https://res.cloudinary.com/$CLOUDINARY_CLOUD_NAME/image/upload/f_auto,q_auto,w_800/$UPLOAD_FOLDER/ca-001.jpg"
fi

echo ""
