import { createClient } from '@supabase/supabase-js';

// Supabase 客戶端配置
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// 向量維度（使用 HuggingFace all-MiniLM-L6-v2 模型）
export const EMBEDDING_DIMENSION = 384;

// 資料庫類型
export interface ContentChunk {
  id?: number;
  page_path: string;
  page_title: string;
  section_title: string;
  content: string;
  embedding?: number[];
  created_at?: string;
  updated_at?: string;
}

// 搜索結果類型
export interface SearchResult {
  page_path: string;
  page_title: string;
  section_title: string;
  content: string;
  similarity: number;
}

/**
 * 插入或更新內容塊
 */
export async function upsertContentChunk(chunk: Omit<ContentChunk, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('content_chunks')
    .upsert(
      {
        page_path: chunk.page_path,
        section_title: chunk.section_title,
        page_title: chunk.page_title,
        content: chunk.content,
        embedding: chunk.embedding,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: 'page_path,section_title',
      }
    );

  if (error) {
    console.error('Error upserting content chunk:', error);
    throw error;
  }

  return data;
}

/**
 * 刪除頁面的所有內容塊
 */
export async function deletePageChunks(pagePath: string) {
  const { error } = await supabase
    .from('content_chunks')
    .delete()
    .eq('page_path', pagePath);

  if (error) {
    console.error('Error deleting page chunks:', error);
    throw error;
  }
}

/**
 * 使用向量相似度搜索相關內容
 */
export async function searchSimilarContent(
  queryEmbedding: number[],
  limit: number = 5,
  similarityThreshold: number = 0.3
): Promise<SearchResult[]> {
  const { data, error } = await supabase.rpc('match_content_chunks', {
    query_embedding: queryEmbedding,
    match_threshold: similarityThreshold,
    match_count: limit,
  });

  if (error) {
    console.error('Error searching content:', error);
    throw error;
  }

  return data || [];
}

/**
 * 獲取所有已索引的頁面路徑
 */
export async function getIndexedPages(): Promise<string[]> {
  const { data, error } = await supabase
    .from('content_chunks')
    .select('page_path')
    .order('page_path');

  if (error) {
    console.error('Error getting indexed pages:', error);
    throw error;
  }

  // 去重
  const uniquePaths = [...new Set(data?.map(d => d.page_path) || [])];
  return uniquePaths;
}

