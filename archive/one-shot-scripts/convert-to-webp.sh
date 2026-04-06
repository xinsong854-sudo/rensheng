#!/bin/bash

# WebP 转换脚本
# 将所有 JPG/PNG 转换为 WebP 格式，保留原文件

WORKSPACE="/home/node/.openclaw/workspace"
REPORT_FILE="$WORKSPACE/webp-conversion-report.md"

# 创建报告文件头
cat > "$REPORT_FILE" << 'EOF'
# WebP 转换报告

## 转换统计

EOF

total_original=0
total_webp=0
converted_count=0
failed_count=0

# 查找所有 JPG 和 PNG 文件（排除 node_modules）
while IFS= read -r file; do
    if [ -f "$file" ]; then
        # 获取原始文件大小
        original_size=$(stat -c%s "$file")
        total_original=$((total_original + original_size))
        
        # 生成 WebP 文件名
        webp_file="${file%.*}.webp"
        
        # 使用 ffmpeg 转换为 WebP（质量 75，平衡质量和大小）
        if ffmpeg -i "$file" -q:v 75 "$webp_file" -y -loglevel error 2>/dev/null; then
            # 获取 WebP 文件大小
            webp_size=$(stat -c%s "$webp_file")
            total_webp=$((total_webp + webp_size))
            converted_count=$((converted_count + 1))
            
            # 计算压缩率（使用 awk）
            if [ $original_size -gt 0 ]; then
                ratio=$(awk "BEGIN {printf \"%.1f\", ($original_size - $webp_size) * 100 / $original_size}")
                savings=$((original_size - webp_size))
            else
                ratio="0.0"
                savings="0"
            fi
            
            # 格式化大小显示
            format_size() {
                local size=$1
                if [ $size -ge 1048576 ]; then
                    awk "BEGIN {printf \"%.2fMB\", $size/1048576}"
                elif [ $size -ge 1024 ]; then
                    awk "BEGIN {printf \"%.2fKB\", $size/1024}"
                else
                    echo "${size}B"
                fi
            }
            
            orig_fmt=$(format_size $original_size)
            webp_fmt=$(format_size $webp_size)
            sav_fmt=$(format_size $savings)
            
            # 添加到报告
            rel_path="${file#$WORKSPACE/}"
            echo "- \`$rel_path\`: $orig_fmt → $webp_fmt (**-${ratio}%**, 节省 $sav_fmt)" >> "$REPORT_FILE"
        else
            failed_count=$((failed_count + 1))
            rel_path="${file#$WORKSPACE/}"
            echo "- \`$rel_path\`: 转换失败" >> "$REPORT_FILE"
        fi
    fi
done < <(find "$WORKSPACE" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) ! -path "*/node_modules/*" 2>/dev/null | sort)

# 计算总体统计
if [ $total_original -gt 0 ]; then
    overall_ratio=$(awk "BEGIN {printf \"%.1f\", ($total_original - $total_webp) * 100 / $total_original}")
    total_savings=$((total_original - $total_webp))
else
    overall_ratio="0.0"
    total_savings="0"
fi

# 格式化总大小
format_size() {
    local size=$1
    if [ $size -ge 1048576 ]; then
        awk "BEGIN {printf \"%.2fMB\", $size/1048576}"
    elif [ $size -ge 1024 ]; then
        awk "BEGIN {printf \"%.2fKB\", $size/1024}"
    else
        echo "${size}B"
    fi
}

total_orig_fmt=$(format_size $total_original)
total_webp_fmt=$(format_size $total_webp)
total_sav_fmt=$(format_size $total_savings)

# 添加总结
cat >> "$REPORT_FILE" << EOF

## 总体统计

- **转换文件数**: $converted_count
- **失败文件数**: $failed_count
- **原始总大小**: $total_orig_fmt
- **WebP 总大小**: $total_webp_fmt
- **总体压缩率**: **-${overall_ratio}%**
- **总节省空间**: $total_sav_fmt

## 说明

- 转换质量：WebP q:v 75（平衡质量和大小）
- 原始文件已保留作为 fallback
- 所有 .webp 文件与原始文件在同一目录
- 可在 HTML 中使用 \`<picture>\` 标签实现 fallback:
  \`\`\`html
  <picture>
    <source srcset="image.webp" type="image/webp">
    <img src="image.jpg" alt="description">
  </picture>
  \`\`\`

EOF

echo "=========================================="
echo "WebP 转换完成！"
echo "=========================================="
echo "转换文件数：$converted_count"
echo "失败文件数：$failed_count"
echo "原始总大小：$total_orig_fmt"
echo "WebP 总大小：$total_webp_fmt"
echo "总体压缩率：-${overall_ratio}%"
echo "总节省空间：$total_sav_fmt"
echo "=========================================="
echo "报告已保存到：$REPORT_FILE"
