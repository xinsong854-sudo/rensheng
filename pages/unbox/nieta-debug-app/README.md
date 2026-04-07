# 📱 捏 Ta 调试助手 - Android App

**一键获取捏 Ta Token 的 Android 应用**

---

## 📥 下载 APK

### 方法 1：GitHub Actions（推荐）

1. 访问 **Actions** 标签：https://github.com/xinsong854-sudo/rensheng/actions
2. 点击最新的 **Build Android APK** 工作流
3. 在 **Artifacts** 部分下载 `nieta-debug-app.zip`
4. 解压得到 `app-debug.apk`

### 方法 2：Releases

1. 访问 **Releases** 页面：https://github.com/xinsong854-sudo/rensheng/releases
2. 下载最新版本的 APK

---

## 🚀 安装

1. **下载 APK**
2. **允许未知来源**
   - 设置 → 安全 → 未知来源 → 允许
3. **安装 APK**
4. **打开应用**

---

## 🎯 使用流程

### 1️⃣ 打开 App
- 自动加载开盒工具页面

### 2️⃣ 查询角色/元素
- 粘贴链接或 UUID
- 点击"🔍 查询"

### 3️⃣ 需要 Token 时
- 点击"🔑 获取 Token（限流时用）"
- 自动跳转到捏 Ta 登录页
- **自动获取 Token 并复制**
- 点击"返回开盒工具"

### 4️⃣ 使用 Token
- 粘贴到开盒工具的"自定义 Token"输入框
- 继续查询

---

## 🔨 本地编译

### 环境要求
- Android Studio Hedgehog+
- JDK 17
- Android SDK 33

### 编译步骤

```bash
# 1. 进入项目目录
cd pages/unbox/nieta-debug-app

# 2. 编译 Debug 版
./gradlew assembleDebug

# 3. APK 位置
app/build/outputs/apk/debug/app-debug.apk
```

### 使用 Android Studio

1. 打开 Android Studio
2. File → Open → 选择 `nieta-debug-app` 文件夹
3. Build → Build Bundle(s) / APK(s) → Build APK(s)
4. APK 位置：`app/build/outputs/apk/debug/app-debug.apk`

---

## 📂 项目结构

```
nieta-debug-app/
├── app/
│   ├── src/main/
│   │   ├── java/com/nieta/debug/
│   │   │   └── MainActivity.java    # 主程序
│   │   └── AndroidManifest.xml       # 应用配置
│   └── build.gradle                  # 应用构建配置
├── .github/workflows/
│   └── build.yml                     # GitHub Actions 配置
├── build.gradle                      # 项目构建配置
├── settings.gradle                   # 项目设置
├── gradle.properties                 # Gradle 属性
├── gradlew                           # Gradle 包装器
└── README.md                         # 说明文档
```

---

## 🔐 权限说明

| 权限 | 用途 |
|------|------|
| `INTERNET` | 访问捏 Ta 和开盒工具网页 |
| `ACCESS_NETWORK_STATE` | 检查网络状态 |

**应用不会：**
- ❌ 收集任何用户数据
- ❌ 上传任何信息
- ❌ 访问通讯录/短信等隐私

---

## ⚙️ GitHub Actions 自动编译

### 触发条件

- 推送代码到 `pages/unbox/nieta-debug-app/` 目录
- 手动触发（Actions → Build Android APK → Run workflow）
- 创建 Tag（自动发布 Release）

### 获取 APK

1. 访问 https://github.com/xinsong854-sudo/rensheng/actions
2. 点击最新的工作流运行
3. 在页面底部的 **Artifacts** 下载
4. 解压得到 APK

---

## ❓ 常见问题

**Q: 安装时提示"未知来源"？**
A: 在设置中允许安装未知来源应用

**Q: 获取 Token 失败？**
A: 确保已登录捏 Ta，并且网络连接正常

**Q: 应用闪退？**
A: 检查 Android 版本是否 ≥ 5.0

**Q: 如何更新？**
A: 重新下载最新 APK 覆盖安装即可

---

## 📝 更新日志

### v1.0 (2026-04-07)
- ✅ 初始版本
- ✅ 内置开盒工具页面
- ✅ 一键获取 Token
- ✅ 自动复制 Token
- ✅ GitHub Actions 自动编译

---

## 🔗 相关链接

- [GitHub 仓库](https://github.com/xinsong854-sudo/rensheng)
- [Actions 编译](https://github.com/xinsong854-sudo/rensheng/actions)
- [Releases](https://github.com/xinsong854-sudo/rensheng/releases)
- [开盒工具网页版](https://claw-annuonie-pages.talesofai.com/unbox/)

---

**作者：** 安诺涅
**版本：** 1.0.0
**最后更新：** 2026-04-07
**许可证：** MIT
