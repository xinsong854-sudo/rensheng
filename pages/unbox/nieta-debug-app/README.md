# 🔧 捏 Ta 调试助手 - Android App

一个用于获取捏 Ta Token 的 Android 应用。

## 📥 下载

**直接下载 APK：**
- 访问：https://claw-annuonie-pages.talesofai.com/unbox/nieta-debug-app/
- 点击 "📥 下载 APK" 按钮

## 🚀 安装

1. **下载 APK 文件**
2. **允许安装未知来源应用**
   - 设置 → 安全 → 未知来源 → 允许
3. **点击 APK 安装**
4. **打开应用**

## 🎯 使用

1. **打开应用**
   - 会自动加载捏 Ta 页面

2. **登录捏 Ta**
   - 如果没登录，先登录

3. **点击 "🔑 获取 Token"**
   - Token 会自动获取并复制

4. **粘贴到开盒工具**
   - 返回开盒工具页面
   - 粘贴 Token 到输入框

## 📱 系统要求

| 要求 | 说明 |
|------|------|
| **Android** | 5.0+ (API 21) |
| **网络** | 需要访问捏 Ta |
| **权限** | 网络访问 |

## 🔨 编译（开发者）

### 环境要求
- Android Studio Arctic Fox+
- JDK 11+
- Android SDK 33

### 编译步骤

```bash
# 1. 进入项目目录
cd nieta-debug-app

# 2. 编译 Debug 版
./gradlew assembleDebug

# 3. 编译 Release 版
./gradlew assembleRelease

# APK 输出位置
# Debug: app/build/outputs/apk/debug/app-debug.apk
# Release: app/build/outputs/apk/release/app-release-unsigned.apk
```

### 签名（Release）

```bash
# 1. 生成签名密钥
keytool -genkey -v -keystore nieta-debug.jks -keyalg RSA -keysize 2048 -validity 10000 -alias nieta-debug

# 2. 在 app/build.gradle 配置签名
# 3. 编译签名版
./gradlew assembleRelease
```

## 📂 项目结构

```
nieta-debug-app/
├── app/
│   ├── src/main/
│   │   ├── java/com/nieta/debug/
│   │   │   └── MainActivity.java    # 主活动
│   │   ├── AndroidManifest.xml       # 应用配置
│   │   └── res/                      # 资源文件
│   └── build.gradle                  # 应用构建配置
├── build.gradle                      # 项目构建配置
├── settings.gradle                   # 项目设置
├── gradle.properties                 # Gradle 属性
└── README.md                         # 说明文档
```

## 🔐 权限说明

| 权限 | 用途 |
|------|------|
| `INTERNET` | 访问捏 Ta API |
| `ACCESS_NETWORK_STATE` | 检查网络状态 |

## ❓ 常见问题

**Q: 安装时提示"未知来源"？**
A: 在设置中允许安装未知来源应用

**Q: 获取 Token 失败？**
A: 确保已登录捏 Ta，并且网络连接正常

**Q: 应用闪退？**
A: 检查 Android 版本是否 ≥ 5.0

## 📝 更新日志

### v1.0 (2026-04-07)
- ✅ 初始版本
- ✅ WebView 加载捏 Ta
- ✅ 自动获取 Token
- ✅ 一键复制

## 📄 许可证

MIT License

---

**作者：** 安诺涅
**版本：** 1.0.0
**最后更新：** 2026-04-07
