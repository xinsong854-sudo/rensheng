# Image Generation Reference

> **用途：** 捏 Ta 图片生成的最佳实践工作流  
> **适用技能：** neta-creative  
> **API：** `POST /v3/make_image`

---

## 两种生成模式

### 模式 1：Banana 捏捏（推荐用于角色图）
**特点：** 使用角色/元素引用，中文描述

**命令格式：**
```bash
npx -y @talesofai/neta-skills@latest make_image \
  --prompt "@角色名，/元素名，中文描述词" \
  --aspect "3:4" \
  --model_series "8_image_edit"
```

**参数说明：**
- `--prompt`: `@角色，/元素，中文描述` 格式
- `--model_series`: `8_image_edit`（捏捏模式）
- `--aspect`: 比例（3:4, 16:9, 9:16, 1:1）

**示例：**
```bash
npx -y @talesofai/neta-skills@latest make_image \
  --prompt "@涅涅#安诺涅，/安某的 q 版长屏漫画，可爱 Q 版，日常场景" \
  --aspect "3:4"
```

---

### 模式 2：普通生图（推荐用于创意图）
**特点：** Danbooru 英文标签，元素权重

**命令格式：**
```bash
npx -y @talesofai/neta-skills@latest make_image \
  --prompt "@角色名，/元素：权重，英文标签，quality tags" \
  --aspect "3:4" \
  --model_series "3_noobxl"
```

**参数说明：**
- `--prompt`: `@角色，/元素：权重，英文标签` 格式
- `--model_series`: `3_noobxl`（普通生图模式）
- 需要先收藏角色才能使用 `@角色`

**示例：**
```bash
npx -y @talesofai/neta-skills@latest make_image \
  --prompt "@涅涅#安诺涅，/夢空间:0.8，/画师 lack:0.6，young girl, solo, high quality, masterpiece" \
  --aspect "3:4" \
  --model_series "3_noobxl"
```

---

## 元素权重组合（先生专用）

**暗潮梦空间组合：**
```
/夢空间:0.8, /画师 lack:0.6, /一丢丢光影:0.7, /画师 ImamiyaPinoko:0.4, /暗潮蚀梦:0.9, /画师 wengwengchim:0.5
```

**使用方法：**
1. 先开盒角色获取标准描述词
2. 叠加元素权重组合
3. 添加 quality tags（high quality, masterpiece）

---

## 常用元素 UUID

| 元素 | UUID | 场景 |
|------|------|------|
| 安某的 q 版长屏漫画 | `d9ec66a0-e0e6-4421-90db-38e876c1456b` | 多格漫画 |
| 清透质感#捏捏 | `8d95dfbe-ed8e-43e6-9600-0ce88ac98b78` | 清透风格 |
| 安诺涅自用 q 版 | `4548f029-a3e2-4db6-b29f-f87be5630080` | Q 版角色 |

---

## 故障排查

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| `rawPrompt cannot be empty` | 普通生图用了中文 | 改用英文标签或切换到捏捏模式 |
| 角色无法识别 | 未收藏角色 | 先调用 favor_collection 收藏 |
| 生成失败 | API 限流 | 等待 2-4 分钟后重试 |

---

_最后更新：2026-03-30_
