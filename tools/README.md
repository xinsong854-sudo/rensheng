# 捏 Ta 垫图检查器 🔍

一个纯前端的捏 Ta 作品垫图检测工具，无需服务器，直接在浏览器中运行。

## ✨ 功能特点

- 🔍 **快速检测** - 输入捏宝/作品链接，一键检查是否使用垫图
- 🖼️ **垫图预览** - 显示所有垫图的缩略图预览，点击可放大
- 📊 **详细信息** - 展示作品标题、作者、创建时间、垫图数量
- 💾 **Token 缓存** - 自动保存 Token，下次无需重复输入
- 📱 **响应式设计** - 手机、电脑都能完美使用
- 🚀 **无需服务器** - 纯 HTML + JavaScript，本地即可运行

## 🚀 使用方式

### 方式一：GitHub Pages（推荐）

访问在线版本：[https://xinsong854-sudo.github.io/danbooru/tools/neta-ref-checker.html](https://xinsong854-sudo.github.io/danbooru/tools/neta-ref-checker.html)

### 方式二：本地运行

1. 克隆或下载本仓库
2. 在浏览器中打开 `tools/neta-ref-checker.html`
3. 输入捏宝链接即可检查

## 📖 使用说明

### 1️⃣ 输入捏宝/作品链接

**支持的链接格式：**

| 格式 | 示例 |
|------|------|
| 捏宝短链 | `https://t.nieta.art/9VZHzF6U` |
| neta.app | `https://neta.app/xxx` |
| neta.ai | `https://neta.ai/xxx` |
| neta.mobi | `https://neta.mobi/xxx` |

### 2️⃣ Token（可选）

- **公开作品**：不需要 Token
- **私密/好友可见作品**：需要 Token
- **获取方式**：捏 Ta App → 设置 → 关于 → 点击版本号 → 复制 Token

### 3️⃣ 查看结果

| 状态 | 说明 |
|------|------|
| ✅ 有垫图 | 显示所有垫图预览，点击可放大查看 |
| ❌ 无垫图 | 显示无垫图状态 |

## 🔧 技术说明

- **技术栈**：纯 HTML + CSS + JavaScript，无依赖
- **API**：直接调用捏 Ta 官方 API `GET /v3/story/story-detail`
- **短链解析**：自动解析 `t.nieta.art` 等短链接获取作品 UUID
- **数据存储**：Token 保存在浏览器 localStorage
- **图片预览**：支持点击放大查看垫图

## 📸 检测原理

工具会检查以下字段来判断是否使用垫图：

1. `mix_meta[].image_url` - 处理后的垫图
2. `mix_meta[].original_image_url` - 原始垫图
3. `ref_images[]` - 参考图数组
4. `appearance_vtokens[].ref_img_uuid` - VToken 垫图引用

## ⚠️ 注意事项

- 部分私密作品需要有效的 Token 才能查看
- 需要网络连接以调用捏 Ta API
- 图片加载速度取决于捏 Ta CDN
- 仅支持捏 Ta 官方短链接格式

## 📝 更新日志

- **2026-03-30 v2** - 重构版本
  - ✅ 仅支持捏宝/元素链接格式
  - ✅ 自动解析短链接获取 UUID
  - ✅ 支持 t.nieta.art / neta.app / neta.ai / neta.mobi
  - ✅ 垫图点击放大预览
  - ✅ 优化 UI 设计

## 📄 许可证

MIT License

## 🙏 致谢

感谢捏 Ta 团队提供的开放 API！

---

**Made with ❤️ for 捏 Ta community**
