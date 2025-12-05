import { generateEmbedding, preprocessText } from './embeddings';
import { searchSimilarContent, SearchResult } from './supabase';

/**
 * RAG 搜索配置
 */
interface RAGSearchOptions {
  limit?: number;
  similarityThreshold?: number;
  currentPage?: string;
}

/**
 * 搜索與查詢相關的內容
 */
export async function searchRelevantContent(
  query: string,
  options: RAGSearchOptions = {}
): Promise<SearchResult[]> {
  const { 
    limit = 5, 
    similarityThreshold = 0.3,
    currentPage 
  } = options;

  try {
    // 預處理查詢
    const processedQuery = preprocessText(query, 200);
    
    // 生成查詢向量
    const queryEmbedding = await generateEmbedding(processedQuery);
    
    // 搜索相似內容
    let results = await searchSimilarContent(queryEmbedding, limit * 2, similarityThreshold);
    
    // 如果有當前頁面，優先排序
    if (currentPage) {
      results = results.sort((a, b) => {
        const aMatch = a.page_path === currentPage ? 1 : 0;
        const bMatch = b.page_path === currentPage ? 1 : 0;
        if (aMatch !== bMatch) return bMatch - aMatch;
        return b.similarity - a.similarity;
      });
    }
    
    // 限制返回數量
    return results.slice(0, limit);
  } catch (error) {
    console.error('RAG search error:', error);
    return [];
  }
}

/**
 * 將搜索結果格式化為 AI 上下文
 */
export function formatContextForAI(results: SearchResult[]): string {
  if (results.length === 0) {
    return '';
  }

  const contextParts = results.map((result, index) => {
    return `【參考資料 ${index + 1}】
頁面：${result.page_title}
章節：${result.section_title}
內容：${result.content}
---`;
  });

  return `以下是與用戶問題相關的教學內容，請參考這些資料來回答：

${contextParts.join('\n\n')}

請基於以上參考資料回答用戶問題。如果參考資料不足以回答，可以結合你的知識補充，但要明確指出哪些是來自教學內容，哪些是額外補充。`;
}

/**
 * 判斷查詢是否需要 RAG 增強
 */
export function shouldUseRAG(query: string): boolean {
  // 簡單問候不需要 RAG
  const greetings = ['你好', '嗨', '哈囉', 'hi', 'hello', '謝謝', '感謝'];
  const lowerQuery = query.toLowerCase();
  
  if (greetings.some(g => lowerQuery === g || lowerQuery.startsWith(g + ' '))) {
    return false;
  }
  
  // 太短的查詢可能不需要 RAG
  if (query.length < 5) {
    return false;
  }
  
  return true;
}



