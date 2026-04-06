# Danbooru 标签分类体系

> 来源：https://safebooru.donmai.us/help/tags  
> 整理时间：2026-03-30

---

## 五大标签类型

| 类型 | 英文 | 颜色 | 前缀 | 说明 |
|------|------|------|------|------|
| **画师** | Artist | 红色 | `artist:` / `art:` | 创作者，指具体画师而非版权方 |
| **角色** | Character | 绿色 | `character:` / `char:` | 图中出现的人物 |
| **版权** | Copyright | 紫色 | `copyright:` / `copy:` | 作品来源（动画/漫画/游戏/小说） |
| **一般** | General | 蓝色 | `general:` / `gen:` | 默认类型，描述一切其他内容 |
| **元数据** | Meta | 黄色 | `meta:` | 描述图片本身属性，非画面内容 |

---

## 标签命名规则

### 基本格式
- 空格 → 下划线：`maria-sama ga miteru` → `maria-sama_ga_miteru`
- 标签之间用空格分隔

### 命名限制
- 不能为空
- 不能包含 `*` 或 `,`
- 不能以 `~` 或 `-` 开头
- 不能以 `_` 开头或结尾，不能有连续下划线 `__`
- 不能以 metatag + `:` 开头（如 `pool:test`）
- `and` 和 `or` 是保留字
- `*_(cosplay)` 标签必须有对应的角色标签（如 `chen_(cosplay)` 需要先有 `chen`）

---

## 详细分类（Tag Groups）

### 1. 图像构图与风格
| 分类 | 说明 |
|------|------|
| `tag_group:artistic_license` | 艺术加工 |
| `tag_group:image_composition` | 图像构图 |
| `tag_group:backgrounds` | 背景 |
| `tag_group:censorship` | 打码/和谐 |
| `tag_group:colors` | 颜色 |
| `tag_group:focus_tags` | 焦点 |
| `tag_group:lighting` | 光影 |
| `tag_group:prints` | 印花图案 |
| `tag_group:visual_aesthetic` | 视觉风格 |
| `tag_group:patterns` | 图案 |
| `tag_group:symbols` | 符号 |
| `tag_group:text` | 文字 |
| `tag_group:year_tags` | 年份 |

### 2. 身体特征
| 分类 | 说明 |
|------|------|
| `tag_group:body_parts` | 身体部位 |
| `tag_group:ass` | 臀部相关 |
| `tag_group:breasts_tags` | 胸部相关 |
| `tag_group:face_tags` | 面部 |
| `tag_group:ears_tags` | 耳朵 |
| `tag_group:eyes_tags` | 眼睛 |
| `tag_group:hair` | 头发 |
| `tag_group:hair_color` | 发色 |
| `tag_group:hair_styles` | 发型 |
| `tag_group:hands` | 手 |
| `tag_group:gestures` | 手势 |
| `tag_group:feet` | 脚 |
| `tag_group:neck_and_neckwear` | 颈部与颈饰 |
| `tag_group:posture` | 姿势 |
| `tag_group:skin_color` | 肤色 |
| `tag_group:tail` | 尾巴 |
| `tag_group:wings` | 翅膀 |
| `injury` | 受伤 |

### 3. 服装与配饰
| 分类 | 说明 |
|------|------|
| `tag_group:accessories` | 配饰 |
| `tag_group:attire` | 服装 |
| `tag_group:dress` | 连衣裙 |
| `tag_group:handwear` | 手部穿戴 |
| `tag_group:headwear` | 头部穿戴 |
| `tag_group:legwear` | 腿部穿戴 |
| `mask` | 面具 |
| `tag_group:sexual_attire` | 情趣服装 |
| `tag_group:bra` | 胸罩 |
| `tag_group:panties` | 内裤 |
| `tag_group:sleeves` | 袖子 |
| `swimsuit` | 泳装 |
| `tag_group:embellishment` | 装饰 |
| `tag_group:eyewear` | 眼镜 |
| `tag_group:fashion_style` | 时尚风格 |
| `tag_group:makeup` | 妆容 |
| `tag_group:nudity` | 裸露 |

### 4. 场景与物体
| 分类 | 说明 |
|------|------|
| `computer` | 电脑 |
| `list_of_airplanes` | 飞机列表 |
| `list_of_armor` | 盔甲列表 |
| `list_of_ground_vehicles` | 地面交通工具 |
| `tag_group:creatures` | 生物 |
| `tag_group:plants` | 植物 |
| `tag_group:games` | 游戏相关 |
| `tag_group:real_world` | 现实物品 |

### 5. 版权、画师、角色
| 分类 | 说明 |
|------|------|
| `tag_group:genres` | 游戏类型 |
| `tag_group:artists` | 画师列表 |
| `tag_group:characters` | 角色列表 |

---

## 常用质量标签（Meta）

| 标签 | 说明 |
|------|------|
| `highres` | 高分辨率（通常指 1000x1000 以上） |
| `absurdres` | 超高分辨率（通常指 4K 以上） |
| `safe` | 安全内容 |
| `questionable` | 擦边内容 |
| `explicit` | 成人内容 |
| `translated` | 已翻译 |
| `copyright_request` | 版权申请 |
| `duplicate` | 重复图片 |
| `image_sample` | 图片样本 |
| `bad_id` | 错误 ID |

---

## 普通生图推荐格式

```
角色名，服装描述，动作/姿势，场景背景，/元素：权重，quality tags
```

### 示例
```
hatsune_miku, blue_dress, smile, standing, outdoor, /夢空间:0.8, highres, absurdres, best_quality, masterpiece
```

---

## 标签操作

### 修改标签分类
```
artist:sakura  # 将 sakura 标签改为画师类型
character:rem  # 将 rem 标签改为角色类型
```

### 搜索语法
- 空格 = AND（同时包含）
- `OR` = 或
- `-` = 排除
- `~` = 模糊匹配

---

## 参考资料
- [Tag Groups](https://safebooru.donmai.us/wiki_pages/tag_groups) - 标签分组列表
- [How to Tag](https://safebooru.donmai.us/wiki_pages/howto:tag) - 标签指南
- [Help:Tags](https://safebooru.donmai.us/help/tags) - 标签技术说明
- [Help:Cheatsheet](https://safebooru.donmai.us/help/cheatsheet) - 搜索速查表
