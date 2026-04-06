#!/bin/bash
# ⚠️ 安全版：只增删卡片，不覆盖整个文件
# ⚠️ 绝不覆盖 index.html！只修改卡片区域

cd /home/node/.openclaw/workspace/pages

# 备份
cp index.html index.html.pre-nav-update
echo "✓ 已备份: index.html.pre-nav-update"

echo "⚠️ 此脚本只更新卡片区域，不覆盖整个文件。"
echo "   如需完整重建导航，请手动操作。"

# 扫描子目录
EXCLUDE_PATTERN="^(css|js|data|images|covers|scripts|node_modules|\.git)$"
mapfile -t DIRS < <(ls -d */ 2>/dev/null | sed 's/\///' | grep -vE "$EXCLUDE_PATTERN" | sort)

echo "找到 ${#DIRS[@]} 个子目录: ${DIRS[*]}"
