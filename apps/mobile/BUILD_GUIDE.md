# 📦 Mobile App 打包指南

## 前置需求

1. 安裝 EAS CLI:
```bash
npm install -g eas-cli
```

2. 登入 Expo 帳號 (免費註冊: https://expo.dev/signup):
```bash
eas login
```

---

## 🤖 Android APK 打包

### 打包命令

```bash
cd apps/mobile

# 打包 APK（約 10-15 分鐘）
eas build --platform android --profile production
```

### 打包完成後

1. EAS 會提供一個下載連結
2. 下載 APK 檔案
3. 將 APK 放到 `apps/web/public/downloads/trading-education.apk`
4. 重新部署網站

---

## 🍎 iOS 打包

### 需要 Apple Developer 帳號（$99/年）

```bash
cd apps/mobile

# 打包 iOS
eas build --platform ios --profile production
```

### 不想付費的替代方案

1. **PWA (Progressive Web App)** - 已配置
   - iOS 用戶可以使用 Safari 添加到主畫面
   - 體驗接近原生 App

2. **TestFlight** - 需要 Apple Developer
   - 可邀請最多 10,000 測試者
   - 不需要 App Store 審核

---

## 📱 PWA 配置

PWA 已配置完成，iOS 用戶可以：

1. 用 Safari 開啟網站
2. 點擊分享按鈕
3. 選擇「加入主畫面」

---

## 🔄 更新應用

1. 修改版本號：
   - `apps/mobile/app.json` 中的 `version`
   - `apps/web/src/app/page.tsx` 中的版本顯示

2. 重新打包：
```bash
eas build --platform android --profile production
```

3. 替換 APK 檔案並部署

---

## 📝 注意事項

- Android APK 約 25-40MB
- 每次打包需要 10-15 分鐘
- EAS 免費帳號每月有 30 次構建限制
- 正式環境建議使用 AAB 格式上架 Play Store

