# 學習筆記工作流程指南

## 📂 文件結構

所有學習筆記存放在：
```
trading-education/
└── apps/web/src/content/reading-notes/
    ├── 選擇權賣方完全指南/
    │   ├── part1.md
    │   ├── part2.md
    │   └── part3.md
    └── 技術分析聖經/
        ├── chapter1.md
        └── chapter2.md
```

## ✍️ 每天寫新章節

### 1. 進入專案目錄
```bash
cd ~/Desktop/trading-education
```

### 2. 寫新章節
```bash
# 進入你要編輯的書籍文件夾
cd apps/web/src/content/reading-notes/選擇權賣方完全指南

# 創建新章節（使用你喜歡的編輯器）
vim part2.md
# 或
code part2.md
# 或
open -a "TextEdit" part2.md
```

### 3. Markdown 格式建議

每個章節文件的開頭可以添加元數據（可選）：

```markdown
---
title: "PART 2 選擇權定價"
chapter: 2
date: 2025-12-11
tags: ["選擇權", "定價模型"]
---

## 章節內容開始...

### 核心概念

內容...

### 實戰案例

內容...
```

## 🚀 部署到雲端（安全流程）

### 每天/每週更新

```bash
# 1. 回到專案根目錄
cd ~/Desktop/trading-education

# 2. 查看你新增或修改了什麼文件
git status

# 3. 查看具體改動內容（確保沒問題）
git diff

# 4. 添加所有學習筆記的更新
git add apps/web/src/content/reading-notes/

# 5. 提交變更（寫清楚你做了什麼）
git commit -m "新增：選擇權賣方完全指南 Part 2-5"

# 6. 推送到雲端（自動觸發部署）
git push origin main
```

### 提交訊息建議

- 新增單個章節：`git commit -m "新增：選擇權賣方完全指南 Part 2"`
- 新增多個章節：`git commit -m "新增：選擇權賣方完全指南 Part 2-5"`
- 修改章節：`git commit -m "更新：選擇權賣方完全指南 Part 1 - 修正錯字"`
- 完成整本書：`git commit -m "完成：選擇權賣方完全指南全書筆記"`

## 📚 開始新書

```bash
# 1. 進入筆記目錄
cd ~/Desktop/trading-education/apps/web/src/content/reading-notes

# 2. 創建新書的文件夾
mkdir "技術分析聖經"
cd "技術分析聖經"

# 3. 寫第一章
vim chapter1.md

# 4. 提交到 Git
cd ~/Desktop/trading-education
git add apps/web/src/content/reading-notes/技術分析聖經/
git commit -m "新增：技術分析聖經 - 開始記錄"
git push origin main
```

## 🔍 本地預覽

在推送到雲端之前，可以在本地預覽效果：

```bash
# 1. 進入專案目錄
cd ~/Desktop/trading-education

# 2. 啟動開發伺服器
pnpm dev

# 3. 在瀏覽器打開
# http://localhost:3000
```

查看效果滿意後再執行上面的 Git 推送步驟。

## ⚠️ 安全提醒

### 不會刪除資料的操作

✅ 安全操作：
- `git status` - 只是查看狀態
- `git diff` - 只是查看變更
- `git add` - 暫存文件
- `git commit` - 提交到本地
- `git push` - 推送到雲端

### 檢查清單（每次推送前）

```bash
# 1. 確認改動的文件
git status

# 2. 確認改動的內容
git diff

# 3. 確保只添加筆記文件
git add apps/web/src/content/reading-notes/

# 4. 寫清楚提交訊息
git commit -m "具體描述你做了什麼"

# 5. 推送
git push origin main
```

## 🎯 常見場景

### 場景 1：每天寫一點

```bash
# 寫完後
cd ~/Desktop/trading-education
git add apps/web/src/content/reading-notes/
git commit -m "每日更新：新增筆記內容"
git push origin main
```

### 場景 2：一週累積後統一部署

```bash
# 週一到週五寫筆記，不推送
# 週末檢查並推送

cd ~/Desktop/trading-education
git status  # 查看這週寫了什麼
git diff    # 確認內容
git add apps/web/src/content/reading-notes/
git commit -m "本週學習筆記：Part 2-6"
git push origin main
```

### 場景 3：一本書完成後再部署

```bash
# 花了一個月，終於看完一本書
cd ~/Desktop/trading-education
git add apps/web/src/content/reading-notes/選擇權賣方完全指南/
git commit -m "完成：選擇權賣方完全指南全書筆記"
git push origin main
```

## 📋 文件命名建議

為了控制章節順序，建議使用前綴：

### 方式 1：數字前綴
```
01-基礎理論.md
02-實戰案例.md
03-進階策略.md
```

### 方式 2：Part/Chapter
```
part1.md
part2.md
part3.md
```

### 方式 3：詳細命名
```
chapter1-introduction.md
chapter2-pricing-models.md
chapter3-greeks.md
```

## 🔄 部署時間

- Railway 自動部署時間：約 3-5 分鐘
- 推送後可以到 Railway 網站查看部署狀態
- 部署完成後刷新網頁即可看到新內容

## 💡 小技巧

### 1. 使用 .gitignore 排除草稿

如果某本書還沒寫完，不想部署到線上：

```bash
# 編輯 .gitignore
echo "apps/web/src/content/reading-notes/期貨交易策略/" >> .gitignore
```

### 2. 查看提交歷史

```bash
git log --oneline
```

### 3. 撤銷最後一次提交（尚未推送時）

```bash
git reset --soft HEAD~1
```

### 4. 查看遠端同步狀態

```bash
git status
```

## 🆘 遇到問題？

### 問題 1：推送時出現衝突

```bash
# 先拉取最新代碼
git pull origin main

# 解決衝突後再推送
git push origin main
```

### 問題 2：誤刪文件

```bash
# 恢復單個文件
git checkout -- apps/web/src/content/reading-notes/選擇權賣方完全指南/part1.md

# 恢復所有未提交的變更
git checkout -- .
```

### 問題 3：想取消 git add

```bash
git reset HEAD apps/web/src/content/reading-notes/
```

## 📞 完整工作流程範例

```bash
# === 寫新章節 ===
cd ~/Desktop/trading-education/apps/web/src/content/reading-notes/選擇權賣方完全指南
vim part2.md
# [寫完內容，保存退出]

# === 本地預覽（可選）===
cd ~/Desktop/trading-education
pnpm dev
# 在瀏覽器打開 localhost:3000 查看效果
# 確認無誤後 Ctrl+C 停止伺服器

# === 提交到 Git ===
git status                                           # 查看改動
git diff                                             # 確認內容
git add apps/web/src/content/reading-notes/         # 添加筆記文件
git commit -m "新增：選擇權賣方完全指南 Part 2"      # 提交
git push origin main                                 # 推送到雲端

# === 等待部署 ===
# 3-5分鐘後，訪問你的網站查看更新
```

---

## 🎉 總結

你只需要記住三個命令：

```bash
git add apps/web/src/content/reading-notes/
git commit -m "描述你的更新"
git push origin main
```

每天寫完筆記後執行這三個命令，就能自動部署到雲端！

不需要找任何人幫忙，完全自主管理你的學習筆記。
