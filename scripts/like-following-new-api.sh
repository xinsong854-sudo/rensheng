#!/bin/bash

# 使用新的 request_interactive_feed API 执行关注列表点赞任务
# 正确的点赞 API: PUT /v1/story/story-like

NETA_TOKEN="$NETA_TOKEN"
UUID_FILE="/tmp/following-uuids-unique.txt"
LIKED_FILE="/home/node/.openclaw/workspace/memory/liked-posts.json"

# 初始化计数器
total_posts=0
total_liked=0
skipped_ai=0
skipped_already_liked=0

# 读取已点赞的帖子 UUID 列表到数组
declare -A liked_map
if [ -f "$LIKED_FILE" ]; then
    while IFS= read -r uuid; do
        liked_map["$uuid"]=1
    done < <(cat "$LIKED_FILE" | jq -r '.details[].post_uuid' 2>/dev/null)
fi

# 初始化结果文件
echo '{"timestamp":"'$(date -Iseconds)'","total_users":86,"total_posts_checked":0,"total_liked":0,"skipped_ai":0,"skipped_already_liked":0,"details":[]}' > "$LIKED_FILE"

# 遍历每个用户
user_count=0
while IFS= read -r user_uuid; do
    user_count=$((user_count + 1))
    echo "[$user_count/86] Processing user: $user_uuid"
    
    # 获取用户 feed（使用新的 interactive feed API）
    feed_result=$(curl -s "https://api.talesofai.cn/v1/home/feed/interactive?page_index=0&page_size=10&scene=personal_feed&target_user_uuid=$user_uuid" \
      -H "x-token: $NETA_TOKEN" \
      -H "x-platform: nieta-app/web")
    
    # 提取帖子数量
    post_count=$(echo "$feed_result" | jq -r '.module_list | length' 2>/dev/null)
    
    if [ "$post_count" == "0" ] || [ "$post_count" == "null" ]; then
        echo "  No posts found"
        continue
    fi
    
    # 处理每个帖子
    for i in $(seq 0 $((post_count - 1))); do
        post_uuid=$(echo "$feed_result" | jq -r ".module_list[$i].data_id" 2>/dev/null)
        title=$(echo "$feed_result" | jq -r ".module_list[$i].json_data.title // \"\"" 2>/dev/null)
        module_id=$(echo "$feed_result" | jq -r ".module_list[$i].module_id" 2>/dev/null)
        
        # 只处理 normal_unit 类型的帖子
        if [ "$module_id" != "normal_unit" ]; then
            continue
        fi
        
        if [ -z "$post_uuid" ] || [ "$post_uuid" == "null" ]; then
            continue
        fi
        
        total_posts=$((total_posts + 1))
        
        # 检查是否已点赞
        if [ "${liked_map[$post_uuid]}" == "1" ]; then
            echo "  Skip (already liked): $post_uuid"
            skipped_already_liked=$((skipped_already_liked + 1))
            continue
        fi
        
        # 检查是否是 AI 帖（检测标题中的 emoji）
        # 使用 Python 进行正确的 emoji 检测（只过滤真正的 emoji，不过滤中文标点）
        has_emoji=$(echo "$title" | python3 -c "import sys, re; text=sys.stdin.read(); print('1' if re.search(r'[\U0001F300-\U0001F9FF]|[\U00002600-\U000026FF]|[\U00002700-\U000027BF]', text) else '0')" 2>/dev/null)
        
        if [ "$has_emoji" == "1" ]; then
            echo "  Skip (AI post with emoji): $post_uuid - $title"
            skipped_ai=$((skipped_ai + 1))
            continue
        fi
        
        # 点赞（使用正确的 API: PUT /v1/story/story-like）
        echo "  Liking: $post_uuid - $title"
        like_result=$(curl -s -X PUT "https://api.talesofai.cn/v1/story/story-like" \
          -H "x-token: $NETA_TOKEN" \
          -H "x-platform: nieta-app/web" \
          -H "Content-Type: application/json" \
          -d "{\"storyId\":\"$post_uuid\",\"is_cancel\":false}")
        
        # 检查响应
        if echo "$like_result" | grep -q "success\|已经点赞"; then
            total_liked=$((total_liked + 1))
            liked_map["$post_uuid"]=1
            # 添加到已点赞列表
            tmp_file=$(mktemp)
            jq --arg uuid "$post_uuid" --argjson ts "$(date +%s)" '.details += [{"post_uuid": $uuid, "liked_at": $ts}]' "$LIKED_FILE" > "$tmp_file" && mv "$tmp_file" "$LIKED_FILE"
            echo "    ✓ Success"
        else
            echo "    ✗ Failed: $like_result"
        fi
    done
    
done < "$UUID_FILE"

# 更新统计信息
tmp_file=$(mktemp)
jq --argjson total "$total_posts" \
   --argjson liked "$total_liked" \
   --argjson ai "$skipped_ai" \
   --argjson already "$skipped_already_liked" \
   '.total_posts_checked = $total | .total_liked = $liked | .skipped_ai = $ai | .skipped_already_liked = $already' \
   "$LIKED_FILE" > "$tmp_file" && mv "$tmp_file" "$LIKED_FILE"

echo ""
echo "========================================="
echo "Task Complete!"
echo "========================================="
echo "Total posts checked: $total_posts"
echo "Total liked: $total_liked"
echo "Skipped (AI posts): $skipped_ai"
echo "Skipped (already liked): $skipped_already_liked"
echo "========================================="
