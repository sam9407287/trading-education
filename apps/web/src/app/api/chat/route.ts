import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { searchRelevantContent, formatContextForAI, shouldUseRAG } from '@/lib/rag/search';

// System Prompt - 定義 AI 助教的專業身份
const SYSTEM_PROMPT = `你是一位專業的技術分析與期權交易教育導師，擁有豐富的金融市場實戰經驗。

## 你的專長領域

### 技術分析
- **技術指標**：均線（MA、EMA）、KDJ、RSI、MACD、布林帶、ATR、OBV 等
- **K線型態**：反轉型態（頭肩頂/底、雙重頂/底）、持續型態（旗形、三角形）、單根K線訊號
- **圖表分析**：支撐/阻力、趨勢線、斐波那契回撤、通道
- **理論知識**：道氏理論、艾略特波浪理論、威科夫理論、江恩理論
- **行為金融學**：認知偏誤、市場心理、群體行為、損失厭惡

### 期權交易
- **基礎概念**：買權/賣權、內在價值/時間價值、履約價、到期日
- **希臘字母**：Delta、Gamma、Theta、Vega、Rho 的含義與應用
- **期權策略**：Covered Call、Protective Put、Bull/Bear Spread、Straddle、Strangle、Iron Condor、Butterfly 等
- **隱含波動率**：IV 分析、波動率微笑、IV Rank/Percentile

## 回答規則

1. **使用繁體中文**回答
2. **結構清晰**：使用標題、列表、表格讓內容易讀
3. **舉例說明**：用實際市場情境解釋概念
4. **風險提醒**：適時提醒交易風險
5. **循序漸進**：從基礎概念開始，逐步深入
6. **保持專業但親和**：像一位耐心的導師
7. **優先參考教學內容**：如果有提供參考資料，優先基於這些資料回答

## 回答限制

- 不提供具體的買賣建議或投資推薦
- 不預測特定股票或市場走勢
- 僅提供教育性質的知識分享
- 對於不確定的內容，誠實說明

記住：你的目標是幫助學習者建立扎實的交易知識體系，而非提供投資建議。`;

// 初始化 Groq 客戶端
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { message, history, currentPage } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: '請提供有效的訊息' },
        { status: 400 }
      );
    }

    // 檢查 API Key
    if (!process.env.GROQ_API_KEY) {
      console.error('GROQ_API_KEY is not set');
      return NextResponse.json(
        { error: 'AI 服務暫時不可用' },
        { status: 500 }
      );
    }

    // 建立對話歷史
    const messages: { role: 'system' | 'user' | 'assistant'; content: string }[] = [
      { role: 'system', content: SYSTEM_PROMPT },
    ];

    // RAG：搜索相關內容
    let ragContext = '';
    if (shouldUseRAG(message)) {
      try {
        const relevantContent = await searchRelevantContent(message, {
          limit: 5,
          similarityThreshold: 0.3,
          currentPage: currentPage,
        });

        if (relevantContent.length > 0) {
          ragContext = formatContextForAI(relevantContent);
          console.log(`[RAG] 找到 ${relevantContent.length} 個相關內容`);
        }
      } catch (error) {
        // RAG 失敗不影響主流程，只記錄日誌
        console.warn('[RAG] 搜索失敗，使用純 LLM 回答:', error);
      }
    }

    // 添加 RAG 上下文（如果有）
    if (ragContext) {
      messages.push({
        role: 'system',
        content: ragContext,
      });
    }

    // 添加當前頁面上下文（如果有且沒有 RAG 結果）
    if (!ragContext && currentPage && currentPage !== '/') {
      messages.push({
        role: 'system',
        content: `用戶目前正在閱讀的頁面：${currentPage}。如果問題與該頁面主題相關，請優先針對該主題回答。`,
      });
    }

    // 添加歷史對話（最近 10 條）
    if (history && Array.isArray(history)) {
      const recentHistory = history.slice(-10);
      for (const msg of recentHistory) {
        if (msg.role === 'user' || msg.role === 'assistant') {
          messages.push({
            role: msg.role,
            content: msg.content,
          });
        }
      }
    }

    // 添加當前訊息
    messages.push({ role: 'user', content: message });

    // 調用 Groq API
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages,
      temperature: 0.7,
      max_tokens: 2048,
      top_p: 0.9,
    });

    const reply = completion.choices[0]?.message?.content || '抱歉，我無法生成回應。';

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chat API Error:', error);
    
    // 更詳細的錯誤處理
    if (error instanceof Error) {
      if (error.message.includes('rate limit')) {
        return NextResponse.json(
          { error: '請求太頻繁，請稍後再試' },
          { status: 429 }
        );
      }
      if (error.message.includes('invalid_api_key')) {
        return NextResponse.json(
          { error: 'AI 服務配置錯誤' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { error: '發生錯誤，請稍後再試' },
      { status: 500 }
    );
  }
}
