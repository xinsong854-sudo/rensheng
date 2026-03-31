#!/bin/bash

# 批量评论脚本 - 多进程并行版
# 使用：./mass-comment-parallel.sh <target_user_uuid> <comments_per_post>

TARGET_USER=${1:-"239b2c7f8c604deea6b0b911124b22ac"}
COMMENTS_PER_POST=${2:-10}
TOKEN="$NETA_TOKEN"

# 评论模板
COMMENTS=(
  "路过看到，随便留个脚印。"
  "挺有意思的，我们看了。"
  "这个风格我们喜欢。"
  "刷到了，留个言。"
  "有点东西。"
  "我们路过了。"
  "看到了，留个痕迹。"
  "还行，我们看了。"
  "随便逛逛看到的。"
  "路过的，留个言。"
)

# 获取所有帖子
echo "=== 获取帖子列表 ==="
POSTS_FILE="/tmp/posts-${TARGET_USER}.json"
> "$POSTS_FILE"

for page in 0 1 2 3 4 5 6 7 8 9; do
  curl -s "https://api.talesofai.cn/v1/home/feed/interactive?page_index=$page&page_size=20&scene=personal_feed&target_user_uuid=$TARGET_USER" \
    -H "x-token: $TOKEN" -H "x-platform: nieta-app/web" 2>/dev/null | \
    jq -c '.module_list[]? | select(.json_data.uuid) | {uuid: .json_data.uuid, name: .json_data.name}' >> "$POSTS_FILE" 2>/dev/null
done

TOTAL_POSTS=$(wc -l < "$POSTS_FILE")
echo "获取到 $TOTAL_POSTS 个帖子"

# 评论函数
comment() {
  local uuid=$1
  local name=$2
  local index=$3
  
  for i in $(seq 1 $COMMENTS_PER_POST); do
    local comment_idx=$((($i - 1) % ${#COMMENTS[@]}))
    local content="${COMMENTS[$comment_idx]}"
    
    result=$(curl -s -X POST "https://api.talesofai.cn/v1/comment/comment" \
      -H "x-token: $TOKEN" -H "x-platform: nieta-app/web" -H "Content-Type: application/json" \
      -d "{\"parent_uuid\":\"$uuid\",\"parent_type\":\"collection\",\"content\":\"$content\n\n（小眼睛留）\"}" 2>/dev/null)
    
    if echo "$result" | grep -q '"success":true'; then
      echo "✅ [$name] $i/$COMMENTS_PER_POST 成功"
    else
      echo "❌ [$name] $i/$COMMENTS_PER_POST 失败"
    fi
    
    # 限流延迟
    sleep 0.5
  done
}

# 并行执行（最多 5 个并发）
echo "=== 开始并行评论 ==="
export -f comment
export TOKEN COMMENTS COMMENTS_PER_POST

cat "$POSTS_FILE" | while read -r line; do
  uuid=$(echo "$line" | jq -r '.uuid')
  name=$(echo "$line" | jq -r '.name')
  
  # 后台执行，限制并发数
  (
    comment "$uuid" "$name"
  ) &
  
  # 每启动 5 个等待一次
  if [ $(jobs -r | wc -l) -ge 5 ]; then
    wait -n
  fi
done

# 等待所有完成
wait
echo "=== 完成 ==="
