# RAG 系統設置指南

本指南說明如何設置 RAG（檢索增強生成）系統，讓 AI 助教能夠參考教學內容來回答問題。

## 架構說明

```
用戶提問 → 生成向量 → 搜索相似內容 → 傳給 AI → 生成回答
                ↓
          Supabase Vector
          (儲存教學內容向量)
```

## 步驟 1：創建 Supabase 項目

1. 前往 [Supabase](https://supabase.com/) 創建免費帳戶
2. 創建新項目（免費層足夠使用）
3. 記下以下信息：
   - **Project URL**：`https://xxxxx.supabase.co`
   - **Service Role Key**：在 Project Settings → API 中找到

## 步驟 2：設置數據庫

1. 在 Supabase Dashboard 中，進入 **SQL Editor**
2. 複製 `supabase/setup.sql` 的內容並執行
3. 這會創建：
   - `content_chunks` 表（儲存內容）
   - 向量索引（加速搜索）
   - `match_content_chunks` 函數（相似度搜索）

## 步驟 3：獲取 HuggingFace API Key

1. 前往 [HuggingFace](https://huggingface.co/) 創建免費帳戶
2. 進入 Settings → Access Tokens
3. 創建一個 Read 權限的 Token
4. 免費額度：每月約 30,000 次請求

## 步驟 4：配置環境變量

在 Railway 或本地 `.env` 中添加：

```env
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# HuggingFace
HUGGINGFACE_API_KEY=hf_xxxxxxxxxxxxxxxxxxxxx

# Groq (已有)
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxx
```

### Railway 設置

1. 進入 Railway 項目
2. 點擊 Web 服務 → Variables
3. 添加上述環境變量

## 步驟 5：索引內容

### 本地索引

```bash
cd apps/web
pnpm index
```

### 自動索引

部署時會自動運行 `postbuild` 腳本進行索引。

## 驗證設置

### 檢查數據庫

在 Supabase SQL Editor 中運行：

```sql
SELECT COUNT(*) as total_chunks FROM content_chunks;
SELECT page_title, COUNT(*) as sections 
FROM content_chunks 
GROUP BY page_title;
```

### 測試搜索

問 AI 助教一個問題，觀察控制台日誌是否顯示 `[RAG] 找到 X 個相關內容`。

## 新增頁面時

1. 編輯 `src/lib/rag/content.ts`，在 `PAGE_CONTENTS` 中添加新頁面內容
2. 運行 `pnpm index` 或等待下次部署

或者編輯 `scripts/index-content.ts` 中的 `PAGE_CONTENTS`（兩個文件需要同步）。

## 成本估算

| 服務 | 免費額度 | 預估使用 |
|------|----------|----------|
| Supabase | 500MB 數據庫 | ~1MB |
| HuggingFace | 30,000 請求/月 | ~1,000/月 |
| Groq | 免費（有速率限制）| 按需 |

**結論：完全免費！**

## 故障排除

### 1. 索引失敗

- 檢查環境變量是否正確設置
- 確認 Supabase 表已創建
- 查看控制台錯誤日誌

### 2. 搜索無結果

- 確認已運行索引腳本
- 檢查 `content_chunks` 表是否有數據
- 降低 `similarityThreshold`（預設 0.3）

### 3. AI 沒有使用 RAG 內容

- 檢查 `shouldUseRAG` 函數邏輯
- 查看控制台是否有 `[RAG]` 日誌
- 確認 HuggingFace API Key 有效

## 文件結構

```
apps/web/
├── src/lib/rag/
│   ├── content.ts      # 頁面內容定義
│   ├── embeddings.ts   # 向量生成
│   ├── search.ts       # 搜索邏輯
│   ├── supabase.ts     # 數據庫操作
│   └── index.ts        # 導出
├── scripts/
│   └── index-content.ts # 索引腳本
├── supabase/
│   └── setup.sql       # 數據庫設置
└── RAG_SETUP.md        # 本文件
```





