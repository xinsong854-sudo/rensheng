#!/bin/bash

# Neta Following Like Script
# Likes posts from all followed users, skipping AI posts and already liked posts

NETA_TOKEN="${NETA_TOKEN}"
BASE_URL="https://api.talesofai.cn"
LIKED_FILE="/home/node/.openclaw/workspace/memory/liked-posts.json"

# Initialize counters
total_posts=0
liked_count=0
skipped_ai=0
skipped_already=0

# Load existing liked posts into an associative array
declare -A liked_posts
if [ -f "$LIKED_FILE" ]; then
    while IFS= read -r uuid; do
        liked_posts["$uuid"]=1
    done < <(jq -r '.details[] | select(.action == "liked") | .story_uuid' "$LIKED_FILE" 2>/dev/null)
fi

# Get all subscribed users
users=$(curl -s -X GET "${BASE_URL}/v1/user/subscribe-list?page_size=100" \
  -H "x-token: ${NETA_TOKEN}" \
  -H "x-platform: nieta-app/web" | jq -c '.list[] | {uuid: .uuid, name: .name}')

# Function to check if title contains emoji (proper Unicode emoji detection)
has_emoji() {
    local text="$1"
    # Match actual Unicode emoji ranges (not Chinese punctuation)
    # This includes: emoticons, symbols, dingbats, etc.
    if echo "$text" | grep -qP '[\x{1F300}-\x{1F9FF}\x{2600}-\x{26FF}\x{2700}-\x{27BF}\x{1F600}-\x{1F64F}\x{1F680}-\x{1F6FF}\x{1F1E0}-\x{1F1FF}\x{231A}-\x{231B}\x{23E9}-\x{23F3}\x{23F8}-\x{23FA}\x{25AA}-\x{25AB}\x{25B6}\x{25C0}\x{25FB}-\x{25FE}\x{2614}\x{2615}\x{2648}-\x{2653}\x{267F}\x{2693}\x{26A1}\x{26AA}-\x{26AB}\x{26BD}-\x{26BE}\x{26C4}-\x{26C5}\x{26CE}\x{26D4}\x{26EA}\x{26F2}-\x{26F3}\x{26F5}\x{26FA}\x{26FD}\x{2702}\x{2705}\x{2708}-\x{270D}\x{270F}\x{2712}\x{2714}\x{2716}\x{271D}\x{2721}\x{2728}\x{2733}-\x{2734}\x{2744}\x{2747}\x{274C}\x{274E}\x{2753}-\x{2755}\x{2757}\x{2763}-\x{2764}\x{2795}-\x{2797}\x{27A1}\x{27B0}\x{27BF}\x{2934}-\x{2935}\x{2B05}-\x{2B07}\x{2B1B}-\x{2B1C}\x{2B50}\x{2B55}\x{3030}\x{303D}\x{3297}\x{3299}]'; then
        return 0
    fi
    return 1
}

# Process each user
echo "$users" | while IFS= read -r user; do
    user_uuid=$(echo "$user" | jq -r '.uuid')
    user_name=$(echo "$user" | jq -r '.name')
    
    echo "Processing user: $user_name ($user_uuid)"
    
    # Get user's stories (posts)
    stories=$(curl -s -X GET "${BASE_URL}/v3/user/${user_uuid}/story?page_size=30" \
      -H "x-token: ${NETA_TOKEN}" \
      -H "x-platform: nieta-app/web")
    
    # Process each story
    echo "$stories" | jq -c '.list[]' 2>/dev/null | while IFS= read -r story; do
        story_uuid=$(echo "$story" | jq -r '.uuid')
        title=$(echo "$story" | jq -r '.title')
        
        ((total_posts++))
        
        # Check if already liked
        if [ "${liked_posts[$story_uuid]}" == "1" ]; then
            echo "  Skip (already liked): $title"
            ((skipped_already++))
            continue
        fi
        
        # Check for emoji in title (AI post indicator)
        if has_emoji "$title"; then
            echo "  Skip (AI post with emoji): $title"
            ((skipped_ai++))
            continue
        fi
        
        # Like the post
        echo "  Liking: $title"
        like_result=$(curl -s -X POST "${BASE_URL}/v3/story/like" \
          -H "x-token: ${NETA_TOKEN}" \
          -H "x-platform: nieta-app/web" \
          -H "Content-Type: application/json" \
          -d "{\"story_uuid\":\"$story_uuid\"}")
        
        if echo "$like_result" | jq -e '.code == 0' >/dev/null 2>&1; then
            echo "    ✓ Liked successfully"
            ((liked_count++))
            # Add to liked posts
            echo "$story_uuid" >> /tmp/new_liked.txt
        else
            echo "    ✗ Failed: $like_result"
        fi
        
        # Small delay to avoid rate limiting
        sleep 0.2
    done
done

echo ""
echo "=== Summary ==="
echo "Total posts checked: $total_posts"
echo "Liked: $liked_count"
echo "Skipped (AI): $skipped_ai"
echo "Skipped (already liked): $skipped_already"
