# 捏 Ta 垫图检查器 🔍

一个纯前端的捏 Ta 帖子垫图检测工具，无需服务器，直接在浏览器中运行。

## ✨ 功能特点

- 🔍 **快速检测** - 输入帖子链接或 UUID，一键检查是否使用垫图
- 🖼️ **垫图预览** - 显示所有垫图的缩略图预览
- 📊 **详细信息** - 展示帖子标题、作者、创建时间、垫图数量
- 💾 **Token 缓存** - 自动保存 Token，下次无需重复输入
- 📱 **响应式设计** - 手机、电脑都能完美使用
- 🚀 **无需服务器** - 纯 HTML + JavaScript，本地即可运行

## 🚀 使用方式

### 方式一：GitHub Pages（推荐）

访问在线版本：[https://xinsong854-sudo.github.io/danbooru/tools/neta-image-checker.html](https://xinsong854-sudo.github.io/danbooru/tools/neta-image-checker.html)

### 方式二：本地运行

1. 克隆或下载本仓库
2. 在浏览器中打开 `tools/neta-image-checker.html`
3. 输入帖子链接或 UUID 即可检查

### 方式三：直接打开文件

```bash
# macOS
open tools/neta-image-checker.html

# Linux
xdg-open tools/neta-image-checker.html

# Windows
start tools/neta-image-checker.html
```

## 📖 使用说明

1. **输入帖子信息**
   - 完整链接：`https://neta.ai/story/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
   - 或直接 UUID：`xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

2. **Token（可选）**
   - 公开帖子：不需要 Token
   - 私密/好友可见帖子：需要 Token
   - 获取方式：捏 Ta App → 设置 → 关于 → 点击版本号 → 复制 Token

3. **查看结果**
   - ✅ 有垫图 → 显示所有垫图预览
   - ❌ 无垫图 → 显示无垫图状态

## 🔧 技术说明

- **技术栈**：纯 HTML + CSS + JavaScript，无依赖
- **API**：直接调用捏 Ta 官方 API `GET /v3/story/story-detail`
- **数据存储**：Token 保存在浏览器 localStorage
- **CORS**：需要浏览器允许跨域请求（现代浏览器通常默认允许）

## 📸 检测原理

工具会检查以下字段来判断是否使用垫图：

1. `mix_meta[].image_url` - 处理后的垫图
2. `mix_meta[].original_image_url` - 原始垫图
3. `ref_images[]` - 参考图数组
4. `appearance_vtokens[].ref_img_uuid` - VToken 垫图引用

## ⚠️ 注意事项

- 部分私密帖子需要有效的 Token 才能查看
- 需要网络连接以调用捏 Ta API
- 图片加载速度取决于捏 Ta CDN

## 📝 更新日志

- **2026-03-30** - 初始版本发布
  - 支持帖子链接/UUID 输入
  - 多字段垫图检测
  - Token 本地缓存
  - 响应式 UI 设计

## 📄 许可证

MIT License

## 🙏 致谢

感谢捏 Ta 团队提供的开放 API！

---

**Made with ❤️ for 捏 Ta community**
