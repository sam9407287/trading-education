/**
 * 使用 HuggingFace Inference API 生成文本向量
 * 模型：sentence-transformers/all-MiniLM-L6-v2
 * 維度：384
 * 免費額度：每月 1000 請求
 */

const HF_API_URL = 'https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2';

/**
 * 生成單個文本的向量
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  const apiKey = process.env.HUGGINGFACE_API_KEY;
  
  if (!apiKey) {
    throw new Error('HUGGINGFACE_API_KEY is not set');
  }

  const response = await fetch(HF_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inputs: text,
      options: {
        wait_for_model: true,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`HuggingFace API error: ${error}`);
  }

  const embedding = await response.json();
  
  // API 返回的是嵌套數組，需要展平
  if (Array.isArray(embedding) && Array.isArray(embedding[0])) {
    return embedding[0];
  }
  
  return embedding;
}

/**
 * 批量生成向量（HuggingFace 支持批量請求）
 */
export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  const apiKey = process.env.HUGGINGFACE_API_KEY;
  
  if (!apiKey) {
    throw new Error('HUGGINGFACE_API_KEY is not set');
  }

  // HuggingFace 免費層有請求限制，分批處理
  const batchSize = 10;
  const results: number[][] = [];

  for (let i = 0; i < texts.length; i += batchSize) {
    const batch = texts.slice(i, i + batchSize);
    
    const response = await fetch(HF_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: batch,
        options: {
          wait_for_model: true,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`HuggingFace API error: ${error}`);
    }

    const embeddings = await response.json();
    results.push(...embeddings);

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

