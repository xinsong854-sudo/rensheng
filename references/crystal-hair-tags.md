# 水晶头发细分标签库

> 来源：Danbooru / safebooru.donmai.us  
> 整理时间：2026-03-30  
> 用途：AI 生图提示词（普通生图模式）

---

## 一、水晶/宝石头发核心标签

### 基础水晶类
| 英文标签 | 中文 | 说明 |
|----------|------|------|
| `crystal_hair` | 水晶发 | 通用晶体发质 |
| `gem_hair` | 宝石发 | 通用宝石发质 |
| `diamond_hair` | 钻石发 | 钻石质感 |
| `glass_hair` | 玻璃发 | 玻璃质感 |
| `prism_hair` | 棱镜发 | 棱镜折射效果 |

### 单宝石类
| 英文标签 | 中文 | 颜色特征 |
|----------|------|----------|
| `ruby_hair` | 红宝石发 | 红色系 |
| `sapphire_hair` | 蓝宝石发 | 蓝色系 |
| `emerald_hair` | 祖母绿发 | 绿色系 |
| `topaz_hair` | 黄玉发 | 黄色/金色系 |
| `amethyst_hair` | 紫水晶发 | 紫色系 |
| `jade_hair` | 玉石发 | 青绿色系 |
| `turquoise_hair` | 绿松石发 | 蓝绿色系 |
| `amber_hair` | 琥珀发 | 橙黄色系 |
| `coral_hair` | 珊瑚发 | 粉红色系 |
| `pearl_hair` | 珍珠发 | 白色珠光 |
| `obsidian_hair` | 黑曜石发 | 黑色系 |
| `onyx_hair` | 玛瑙发 | 黑色系 |
| `agate_hair` | 玛瑙发 | 多色纹理 |
| `jasper_hair` | 碧玉发 | 红/绿色系 |
| `opal_hair` | 欧泊发 | 彩虹变彩 |
| `garnet_hair` | 石榴石发 | 深红色系 |
| `peridot_hair` | 橄榄石发 | 黄绿色系 |
| `aquamarine_hair` | 海蓝宝石发 | 浅蓝色系 |
| `citrine_hair` | 黄水晶发 | 金黄色系 |
| `tourmaline_hair` | 碧玺发 | 多色/粉色系 |
| `zircon_hair` | 锆石发 | 透明/彩色 |
| `moissanite_hair` | 莫桑石发 | 高折射率 |

### 特殊效果类
| 英文标签 | 中文 | 说明 |
|----------|------|------|
| `crystal_cluster_hair` | 水晶簇发 | 多晶体簇拥 |
| `mineral_hair` | 矿物发 | 矿石质感 |
| `rock_hair` | 岩石发 | 粗糙岩石 |
| `ice_hair` | 冰发 | 冰晶质感 |
| `frost_hair` | 霜发 | 霜冻效果 |
| `snow_hair` | 雪发 | 雪白蓬松 |
| `glowing_hair` | 发光发 | 自发光 |
| `luminescent_hair` | 发光发 | 冷光效果 |
| `fluorescent_hair` | 荧光发 | 荧光效果 |
| `phosphorescent_hair` | 磷光发 | 磷光效果 |
| `sparkle_hair` | 闪光发 | 闪烁效果 |
| `glitter_hair` | 亮片发 | 亮片装饰 |
| `shiny_hair` | 闪亮发 | 高光泽 |
| `glossy_hair` | 光泽发 | 光泽感 |
| `pearlescent_hair` | 珍珠色发 | 珍珠光泽 |
| `iridescent_hair` | 彩虹光泽发 | 彩虹变彩 |
| `holographic_hair` | 全息发 | 全息效果 |
| `metallic_hair` | 金属色发 | 金属质感 |
| `translucent_hair` | 半透明发 | 半透明 |
| `transparent_hair` | 透明发 | 全透明 |

---

## 二、组合使用示例

### 基础组合
```
crystal_hair, diamond_hair, sparkling, translucent, blue_eyes, white_background
```

### 紫水晶主题
```
amethyst_hair, crystal_hair, purple_gradient, gem_hair, sparkle, fantasy
```

### 彩虹欧泊
```
opal_hair, iridescent_hair, rainbow_hair, holographic_hair, multicolored_hair
```

### 冰晶效果
```
ice_hair, frost_hair, crystal_hair, translucent, pale_blue, winter
```

### 黑曜石暗黑风
```
obsidian_hair, onyx_hair, black_hair, glossy, dark, gothic
```

---

## 三、权重语法

### 强调水晶质感
```
(crystal_hair:1.3), (diamond_hair:1.2), gem_hair
```

### 多宝石混合
```
(ruby_hair:0.8), (sapphire_hair:0.7), (emerald_hair:0.6), multicolored_hair
```

### 降低效果强度
```
crystal_hair, gem_hair, (glitter_hair:0.5)
```

---

## 四、参考图关键词

在 d 站搜索参考图时使用：
```
crystal_hair
gem_hair
diamond_(houseki_no_kuni)
phosphophyllite_(houseki_no_kuni)
lapis_lazuli_(houseki_no_kuni)
houseki_no_kuni  # 宝石之国
```

---

## 五、注意事项

1. **不要堆砌过多宝石标签** - 选 1-2 个主宝石 + 1-2 个效果标签即可
2. **颜色要统一** - 红宝石配红色系，蓝宝石配蓝色系
3. **配合光影标签** - `sparkle`, `glowing`, `lens_flare` 增强晶体效果
4. **参考《宝石之国》** - 这是最经典的晶体头发作品

---

## 六、完整标签列表（纯英文，方便复制）

```
crystal_hair
gem_hair
diamond_hair
ruby_hair
sapphire_hair
emerald_hair
topaz_hair
amethyst_hair
jade_hair
turquoise_hair
amber_hair
coral_hair
pearl_hair
obsidian_hair
onyx_hair
agate_hair
jasper_hair
opal_hair
garnet_hair
peridot_hair
aquamarine_hair
citrine_hair
tourmaline_hair
zircon_hair
moissanite_hair
glass_hair
crystal_cluster_hair
mineral_hair
ice_hair
frost_hair
snow_hair
glowing_hair
luminescent_hair
fluorescent_hair
phosphorescent_hair
sparkle_hair
glitter_hair
shiny_hair
glossy_hair
pearlescent_hair
iridescent_hair
holographic_hair
metallic_hair
translucent_hair
transparent_hair
prism_hair
```

---

**文件位置：** `references/crystal-hair-tags.md`  
**总计：** 47 个水晶/宝石相关头发标签
