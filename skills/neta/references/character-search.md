# Character Search Reference

> **用途：** 搜索和获取角色/元素信息的最佳实践  
> **适用技能：** neta-community, neta-character, neta-elementum

---

## 搜索命令

### 1. 搜索角色或元素
```bash
npx -y @talesofai/neta-skills@latest search_character_or_elementum \
  --keywords "关键词" \
  --type "character"  # 或 "elementum"
```

**返回字段：**
- `uuid`: 角色/元素 UUID
- `name`: 名称
- `creator`: 创作者信息
- `url`: 封面图

### 2. 获取角色/元素详情
```bash
npx -y @talesofai/neta-skills@latest request_character_or_elementum \
  --uuid "<uuid>"
```

---

## 开盒流程（获取完整参数）

### 元素开盒
**API:** `GET /v2/travel/parent/parent-favor/list?parent_type=elementum`

**步骤：**
1. 检查是否已收藏
2. 未收藏则自动收藏
3. 获取完整详情（提取 `oc` 字段）
4. 解析关键参数：
   - `appearance_vtokens[].value` → 风格描述词
   - `mix_meta[0].params.positive_prompt` → 完整提示词
   - `lora` 信息（正则解析）
   - 垫图 UUID
5. 取消收藏（如之前未收藏）

### 角色开盒
**API:** `GET /v2/travel/parent/parent-favor/list`

**步骤：**
1. 检查是否已收藏
2. 未收藏则自动收藏
3. 获取完整详情（提取 `oc` 字段）
4. 解析关键参数：
   - `oc_bio` → 角色设定文字
   - `prompt` → 英文标签
   - `trigger_id` → 触发词
   - `model_series` → 模型系列
   - 垫图信息
5. 取消收藏（如之前未收藏）

---

## 收藏管理

### 查看收藏列表
```bash
# 角色收藏
curl -s "https://api.talesofai.cn/v2/travel/parent/parent-favor/list?page_size=100&parent_type=oc" \
  -H "x-token: $NETA_TOKEN"

# 元素收藏
curl -s "https://api.talesofai.cn/v2/travel/parent/parent-favor/list?page_size=100&parent_type=elementum" \
  -H "x-token: $NETA_TOKEN"
```

### 收藏/取消收藏
```bash
curl -X PUT "https://api.talesofai.cn/v2/travel/parent/parent-favor" \
  -H "x-token: $NETA_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"uuid":"<uuid>","parent_type":"oc","action":"favor"}'
```

---

## 标签（Hashtag）研究

### 获取标签信息
```bash
npx -y @talesofai/neta-skills@latest get_hashtag_info \
  --hashtag "标签名"
```

### 获取标签下的角色
```bash
npx -y @talesofai/neta-skills@latest get_hashtag_characters \
  --hashtag "标签名"
```

### 获取标签下的精选集合
```bash
npx -y @talesofai/neta-skills@latest get_hashtag_collections \
  --hashtag "标签名"
```

---

## 最佳实践

1. **先搜索后开盒** - 先用 search 找到目标，再用开盒获取详情
2. **收藏管理** - 开盒后记得取消临时收藏
3. **标签研究** - 用 hashtag 相关命令探索热门内容
4. **批量操作** - 多个角色/元素时用批量 API 脚本

---

_最后更新：2026-03-30_
