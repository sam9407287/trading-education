/**
 * 使用 HuggingFace Inference API 生成文本向量
 * 模型：sentence-transformers/all-MiniLM-L6-v2
 * 維度：384
 */

import { HfInference } from '@huggingface/inference';

const EMBEDDING_MODEL = 'sentence-transformers/all-MiniLM-L6-v2';

// 單例 HuggingFace 客戶端
let hfClient: HfInference | null = null;

function getHfClient(): HfInference {
  if (!hfClient) {
    const apiKey = process.env.HUGGINGFACE_API_KEY;
    if (!apiKey) {
      throw new Error('HUGGINGFACE_API_KEY is not set');
    }
    hfClient = new HfInference(apiKey);
  }
  return hfClient;
}

/**
 * 生成單個文本的向量
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  const client = getHfClient();

  const result = await client.featureExtraction({
    model: EMBEDDING_MODEL,
    inputs: text,
  });

  // 結果可能是嵌套數組
  if (Array.isArray(result) && Array.isArray(result[0])) {
    return result[0] as number[];
  }
  
  return result as number[];
}

/**
 * 批量生成向量
 */
export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  const client = getHfClient();
  const results: number[][] = [];

  // HuggingFace 免費層有請求限制，分批處理
  const batchSize = 5;

  for (let i = 0; i < texts.length; i += batchSize) {
    const batch = texts.slice(i, i + batchSize);
    
    for (const text of batch) {
      const result = await client.featureExtraction({
        model: EMBEDDING_MODEL,
        inputs: text,
      });

      if (Array.isArray(result) && Array.isArray(result[0])) {
        results.push(result[0] as number[]);
      } else {
        results.push(result as number[]);
      }
    }

    // 避免超過速率限制
    if (i + batchSize < texts.length) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  return results;
}

/**
 * 預處理文本（清理、截斷）
 */
export function preprocessText(text: string, maxLength: number = 500): string {
  // 移除多餘空白
  let processed = text.replace(/\s+/g, ' ').trim();
  
  // 截斷到最大長度（按句子）
  if (processed.length > maxLength) {
    const sentences = processed.split(/[。！？.!?]/);
    processed = '';
    for (const sentence of sentences) {
      if ((processed + sentence).length > maxLength) break;
      processed += sentence + '。';
    }
  }
  
  return processed || text.slice(0, maxLength);
}
