#!/bin/bash

# Neta 关注列表全量点赞脚本 - 直接使用 API
# 给先生关注的所有人的最新帖子点赞

TOKEN="${NETA_TOKEN}"
MEMORY_DIR="/home/node/.openclaw/workspace/memory"
RESULT_FILE="${MEMORY_DIR}/liked-posts.json"
TMP_DIR="/tmp/neta-like-$$"

mkdir -p "${MEMORY_DIR}" "${TMP_DIR}"

echo "========== 开始执行关注列表点赞任务 =========="
echo "时间：$(date -u +%Y-%m-%dT%H:%M:%SZ)"

# 获取所有关注的用户（分页获取）
echo ""
echo "步骤 1: 获取完整关注列表..."

PAGE=0
ALL_USERS_FILE="${TMP_DIR}/all_users.json"
echo "[]" > "${ALL_USERS_FILE}"

while true; do
  echo "  获取第 ${PAGE} 页..."
  curl -s -X GET "https://api.talesofai.cn/v1/user/subscribe-list?page_index=${PAGE}&page_size=100" \
    -H "x-token: ${TOKEN}" \
    -H "x-platform: nieta-app/web" > "${TMP_DIR}/page_${PAGE}.json"
  
  LIST_COUNT=$(jq '.list | length' "${TMP_DIR}/page_${PAGE}.json")
  if [ "${LIST_COUNT}" -eq 0 ]; then
    echo "  第 ${PAGE} 页无数据，停止分页"
    break
  fi
  
  # 合并用户列表
  jq -s '.[0] + .[1].list' "${ALL_USERS_FILE}" "${TMP_DIR}/page_${PAGE}.json" > "${TMP_DIR}/merged.json"
  mv "${TMP_DIR}/merged.json" "${ALL_USERS_FILE}"
  
  echo "  当前累计：$(jq 'length' "${ALL_USERS_FILE}") 人"
  
  HAS_NEXT=$(jq '.has_next // false' "${TMP_DIR}/page_${PAGE}.json")
  if [ "${HAS_NEXT}" != "true" ]; then
    echo "  无更多页面"
    break
  fi
  
  PAGE=$((PAGE + 1))
  sleep 0.3
done

USER_COUNT=$(jq 'length' "${ALL_USERS_FILE}")
echo "关注总人数：${USER_COUNT}"

# 初始化统计
TOTAL_POSTS=0
TOTAL_LIKED=0
SKIPPED_AI=0
SKIPPED_LIKED=0
DETAILS_FILE="${TMP_DIR}/details.json"
echo "[]" > "${DETAILS_FILE}"

# 函数：检查标题是否包含 emoji
has_emoji() {
  local text="$1"
  # 检测常见 emoji 范围
  if echo "${text}" | grep -qP '[\x{1F300}-\x{1F9FF}\x{2600}-\x{26FF}\x{2700}-\x{27BF}\x{1F600}-\x{1F64F}\x{1F680}-\x{1F6FF}]'; then
    return 0
  fi
  return 1
}

# 遍历每个用户
echo ""
echo "步骤 2: 遍历用户并点赞..."
USER_INDEX=0
BIZ_TRACE_ID=""

for USER_UUID in $(jq -r '.[].uuid' "${ALL_USERS_FILE}"); do
  USER_INDEX=$((USER_INDEX + 1))
  USER_NAME=$(jq -r --arg uuid "${USER_UUID}" '.[] | select(.uuid == $uuid) | .name' "${ALL_USERS_FILE}")
  
  echo ""
  echo "[${USER_INDEX}/${USER_COUNT}] 用户：${USER_NAME} (${USER_UUID})"
  
  # 使用 curl 直接调用 API 获取用户帖子
  # 注意：使用 GET 方法，正确的端点是 /v1/recsys/feed/interactive
  if [ -n "${BIZ_TRACE_ID}" ]; then
    FEED_RESPONSE=$(curl -s -X GET "https://api.talesofai.cn/v1/recsys/feed/interactive?page_index=0&page_size=10&scene=personal_feed&target_user_uuid=${USER_UUID}&biz_trace_id=${BIZ_TRACE_ID}" \
      -H "x-token: ${TOKEN}" \
      -H "x-platform: nieta-app/web")
  else
    FEED_RESPONSE=$(curl -s -X GET "https://api.talesofai.cn/v1/recsys/feed/interactive?page_index=0&page_size=10&scene=personal_feed&target_user_uuid=${USER_UUID}" \
      -H "x-token: ${TOKEN}" \
      -H "x-platform: nieta-app/web")
  fi
  
  # 提取 biz_trace_id 供后续使用
  NEW_BIZ=$(echo "${FEED_RESPONSE}" | jq -r '.page_data.biz_trace_id // empty')
  if [ -n "${NEW_BIZ}" ]; then
    BIZ_TRACE_ID="${NEW_BIZ}"
  fi
  
  # 提取帖子列表
  MODULE_COUNT=$(echo "${FEED_RESPONSE}" | jq '.module_list | length' 2>/dev/null)
  
  if [ -z "${MODULE_COUNT}" ] || [ "${MODULE_COUNT}" -eq 0 ] || [ "${MODULE_COUNT}" = "null" ]; then
    echo "  无帖子"
    continue
  fi
  
  echo "  找到 ${MODULE_COUNT} 个帖子"
  
  # 遍历每个帖子
  for i in $(seq 0 $((MODULE_COUNT - 1))); do
    STORY_UUID=$(echo "${FEED_RESPONSE}" | jq -r ".module_list[${i}].json_data.uuid")
    STORY_TITLE=$(echo "${FEED_RESPONSE}" | jq -r ".module_list[${i}].json_data.name")
    LIKE_STATUS=$(echo "${FEED_RESPONSE}" | jq -r ".module_list[${i}].json_data.likeStatus")
    
    TOTAL_POSTS=$((TOTAL_POSTS + 1))
    
    # 检查标题是否包含 emoji（AI 生成）
    if has_emoji "${STORY_TITLE}"; then
      echo "  [跳过 AI] ${STORY_TITLE:0:40}..."
      SKIPPED_AI=$((SKIPPED_AI + 1))
      continue
    fi
    
    # 检查是否已点赞
    if [ "${LIKE_STATUS}" = "liked" ]; then
      echo "  [已点赞] ${STORY_TITLE:0:40}..."
      SKIPPED_LIKED=$((SKIPPED_LIKED + 1))
      continue
    fi
    
    # 点赞 - 使用 npx like_collection
    echo "  [点赞] ${STORY_TITLE:0:40}..."
    LIKE_RESULT=$(npx -y @talesofai/neta-skills@latest like_collection --uuid "${STORY_UUID}" 2>&1)
    
    if echo "${LIKE_RESULT}" | grep -qi "success\|成功\|liked"; then
      TOTAL_LIKED=$((TOTAL_LIKED + 1))
      echo "    ✓ 点赞成功"
      
      # 记录到详情
      jq --arg uuid "${STORY_UUID}" \
         --arg title "${STORY_TITLE}" \
         --arg user "${USER_UUID}" \
         --arg name "${USER_NAME}" \
         '. += [{"story_uuid": $uuid, "title": $title, "user_uuid": $user, "user_name": $name, "action": "liked"}]' \
         "${DETAILS_FILE}" > "${TMP_DIR}/details_tmp.json" && mv "${TMP_DIR}/details_tmp.json" "${DETAILS_FILE}"
    else
      echo "    ✗ 点赞失败"
    fi
    
    # 避免请求过快
    sleep 0.3
  done
  
  # 用户之间稍作延迟
  sleep 0.2
done

# 生成最终结果
echo ""
echo "步骤 3: 保存结果..."

cat > "${RESULT_FILE}" << EOF
{
  "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "total_users": ${USER_COUNT},
  "total_posts_checked": ${TOTAL_POSTS},
  "total_liked": ${TOTAL_LIKED},
  "skipped_ai": ${SKIPPED_AI},
  "skipped_already_liked": ${SKIPPED_LIKED},
  "details": $(cat "${DETAILS_FILE}")
}
EOF

# 清理临时文件
rm -rf "${TMP_DIR}"

echo ""
echo "========== 任务完成 =========="
echo "实际关注人数：${USER_COUNT}"
echo "检查帖子数：${TOTAL_POSTS}"
echo "实际点赞：${TOTAL_LIKED}"
echo "跳过 AI 帖：${SKIPPED_AI}"
echo "跳过已点赞：${SKIPPED_LIKED}"
echo "结果已保存到：${RESULT_FILE}"
