#!/bin/bash

# Neta 关注列表全量点赞脚本 - 修复 emoji 过滤逻辑
# 给先生关注的所有人的最新帖子点赞
# 修复：使用正确的 Unicode emoji 检测，不误判中文标点

TOKEN="${NETA_TOKEN}"
MEMORY_DIR="/home/node/.openclaw/workspace/memory"
RESULT_FILE="${MEMORY_DIR}/liked-posts.json"
TMP_DIR="/tmp/neta-like-$$"

mkdir -p "${MEMORY_DIR}" "${TMP_DIR}"

echo "========== 开始执行关注列表点赞任务（修复版） =========="
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

# 函数：检查标题是否包含真正的 emoji（修复版）
# 使用 Unicode 范围检测真正的 emoji，不包括中文标点
# 参考：https://www.unicode.org/Public/UCD/latest/ucd/emoji/emoji-data.txt
has_emoji() {
  local text="$1"
  
  # 使用 Perl 正则表达式检测真正的 emoji Unicode 范围
  # 这些范围覆盖常见的 emoji 表情符号，但不包括中文标点
  if echo "$text" | perl -CSD -ne 'exit(/[\x{1F300}-\x{1F9FF}\x{2600}-\x{26FF}\x{2700}-\x{27BF}\x{1F600}-\x{1F64F}\x{1F680}-\x{1F6FF}\x{1F1E0}-\x{1F1FF}\x{231A}-\x{231B}\x{23E9}-\x{23F3}\x{23F8}-\x{23FA}\x{25AA}-\x{25AB}\x{25B6}\x{25C0}\x{25FB}-\x{25FE}\x{2614}\x{2615}\x{2648}-\x{2653}\x{267F}\x{2693}\x{26A1}\x{26AA}\x{26AB}\x{26BD}\x{26BE}\x{26C4}-\x{26C5}\x{26CE}\x{26D4}\x{26EA}\x{26F2}-\x{26F3}\x{26F5}\x{26FA}\x{26FD}\x{2702}\x{2705}\x{2708}-\x{270D}\x{270F}\x{2712}\x{2714}\x{2716}\x{271D}\x{2721}\x{2728}\x{2733}-\x{2734}\x{2744}\x{2747}\x{274C}\x{274E}\x{2753}-\x{2755}\x{2757}\x{2763}-\x{2764}\x{2795}-\x{2797}\x{27A1}\x{27B0}\x{27BF}\x{2934}-\x{2935}\x{2B05}-\x{2B07}\x{2B1B}-\x{2B1C}\x{2B50}\x{2B55}\x{3030}\x{303D}\x{3297}\x{3299}]/ ? 0 : 1)'; then
    return 0  # 包含 emoji
  fi
  return 1  # 不包含 emoji
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
    
    # 检查标题是否包含真正的 emoji（AI 生成）
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
    
    # 点赞 - 使用 curl 直接调用 API
    echo "  [点赞] ${STORY_TITLE:0:40}..."
    LIKE_RESULT=$(curl -s -X POST "https://api.talesofai.cn/v1/collection/like" \
      -H "x-token: ${TOKEN}" \
      -H "x-platform: nieta-app/web" \
      -H "Content-Type: application/json" \
      -d "{\"collection_uuid\":\"${STORY_UUID}\"}")
    
    LIKE_CODE=$(echo "${LIKE_RESULT}" | jq -r '.code // 0')
    if [ "${LIKE_CODE}" = "0" ] || [ "${LIKE_CODE}" = "200" ]; then
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
      echo "    ✗ 点赞失败：${LIKE_CODE}"
    fi
    
    # 避免请求过快
    sleep 0.2
  done
  
  # 用户之间稍作延迟
  sleep 0.1
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
