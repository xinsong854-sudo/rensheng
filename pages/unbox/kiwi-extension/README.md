# 🔧 捏 Ta 调试助手 - Kiwi Browser 扩展

## 📥 安装步骤

### 方法 1：直接安装（推荐）

1. **下载 Kiwi Browser**
   - Google Play: https://play.google.com/store/apps/details?id=com.kiwibrowser.browser
   - 或直接搜索 "Kiwi Browser"

2. **下载扩展文件**
   - 访问：https://claw-annuonie-pages.talesofai.com/unbox/kiwi-extension/
   - 下载 `.zip` 文件

3. **安装扩展**
   - 打开 Kiwi Browser
   - 点击右上角 **⋮** 菜单
   - 选择 **Extensions** (扩展)
   - 点击 **+ (from .zip/.crx)**
   - 选择下载的 zip 文件
   - 点击 **OK** 安装

4. **使用**
   - 打开 https://app.nieta.art/mine
   - 扩展会自动注入 Eruda 调试工具
   - 点击右下角 🐞 按钮打开控制台

---

### 方法 2：从 Chrome Web Store 安装

1. 打开 Kiwi Browser
2. 访问 Chrome Web Store
3. 搜索 **Eruda**
4. 点击 **Add to Chrome**
5. 打开捏 Ta 页面即可使用

---

## 🎯 获取 Token

1. 打开捏 Ta 页面（会自动加载调试工具）
2. 点击右下角 🐞 按钮
3. 点击 **Console** 标签
4. 粘贴并运行：

```javascript
const token = localStorage.getItem('token') || 
              sessionStorage.getItem('token') || 
              document.cookie.match(/token=([^;]+)/)?.[1];

if (token) {
  console.log('✅ Token:', token);
  navigator.clipboard.writeText(token);
  console.log('📋 已复制到剪贴板！');
} else {
  console.log('❌ 未找到 Token，请确认已登录');
}
```

5. Token 会自动复制到剪贴板

---

## 📱 系统要求

| 要求 | 说明 |
|------|------|
| **系统** | Android 6.0+ |
| **浏览器** | Kiwi Browser |
| **网络** | 需要访问 cdn.jsdelivr.net |

---

## ❓ 常见问题

**Q: 扩展不工作？**
A: 确保访问的是 `https://app.nieta.art/*` 域名

**Q: 没有看到 🐞 按钮？**
A: 刷新页面，或检查扩展是否启用

**Q: iOS 能用吗？**
A: 不行，Kiwi 只有 Android 版本。iOS 用户请用 Lemur Browser

---

## 📂 文件结构

```
kiwi-extension/
├── manifest.json      # 扩展配置
├── content.js         # 自动注入脚本
├── popup.html         # 扩展弹窗
└── README.md          # 安装说明
```

---

## 🔗 链接

- [Kiwi Browser 官网](https://kiwibrowser.com/)
- [Eruda 文档](https://github.com/liriliri/eruda)
- [捏 Ta 官网](https://app.nieta.art/)
