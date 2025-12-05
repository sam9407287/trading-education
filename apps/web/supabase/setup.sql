-- ============================================
-- Supabase Vector 設置腳本
-- ============================================
-- 
-- 使用說明：
-- 1. 登入 Supabase Dashboard (https://supabase.com/dashboard)
-- 2. 進入你的項目 → SQL Editor
-- 3. 複製貼上這段 SQL 並執行
--
-- ============================================

-- 1. 啟用 pgvector 擴展
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. 創建內容塊表
CREATE TABLE IF NOT EXISTS content_chunks (
  id BIGSERIAL PRIMARY KEY,
  page_path TEXT NOT NULL,
  page_title TEXT NOT NULL,
  section_title TEXT NOT NULL,
  content TEXT NOT NULL,
  embedding vector(384), -- HuggingFace all-MiniLM-L6-v2 的維度
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- 確保每個頁面的每個章節只有一條記錄
  UNIQUE(page_path, section_title)
);

-- 3. 創建向量索引（加速相似度搜索）
CREATE INDEX IF NOT EXISTS content_chunks_embedding_idx 
ON content_chunks 
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- 4. 創建全文搜索索引
CREATE INDEX IF NOT EXISTS content_chunks_content_idx 
ON content_chunks 
USING gin (to_tsvector('chinese', content));

-- 5. 創建相似度搜索函數
CREATE OR REPLACE FUNCTION match_content_chunks(
  query_embedding vector(384),
  match_threshold float DEFAULT 0.3,
  match_count int DEFAULT 5
)
RETURNS TABLE (
  page_path TEXT,
  page_title TEXT,
  section_title TEXT,
  content TEXT,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    cc.page_path,
    cc.page_title,
    cc.section_title,
    cc.content,
    1 - (cc.embedding <=> query_embedding) AS similarity
  FROM content_chunks cc
  WHERE 1 - (cc.embedding <=> query_embedding) > match_threshold
  ORDER BY cc.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- 6. 啟用 Row Level Security（可選，但推薦）
ALTER TABLE content_chunks ENABLE ROW LEVEL SECURITY;

-- 7. 創建公開讀取策略
CREATE POLICY "Allow public read access" ON content_chunks
  FOR SELECT
  USING (true);

-- 8. 創建服務端寫入策略
CREATE POLICY "Allow service role write access" ON content_chunks
  FOR ALL
  USING (auth.role() = 'service_role');

-- ============================================
-- 驗證設置
-- ============================================

-- 檢查表是否創建成功
SELECT 
  table_name, 
  column_name, 
  data_type 
FROM information_schema.columns 
WHERE table_name = 'content_chunks';

-- 檢查函數是否創建成功
SELECT 
  routine_name, 
  routine_type 
FROM information_schema.routines 
WHERE routine_name = 'match_content_chunks';

