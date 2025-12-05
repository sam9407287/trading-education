/**
 * 頁面內容定義
 * 用於自動索引的內容配置
 */

export interface PageContent {
  path: string;
  title: string;
  sections: {
    title: string;
    content: string;
  }[];
}

/**
 * 所有需要索引的頁面內容
 * 這裡定義教學內容的結構化數據
 */
export const PAGE_CONTENTS: PageContent[] = [
  // ==================== 技術分析 ====================
  {
    path: '/technical-analysis',
    title: '技術分析總覽',
    sections: [
      {
        title: '什麼是技術分析',
        content: '技術分析是一種通過研究歷史價格和成交量數據來預測未來價格走勢的方法。它基於三個假設：市場行為包含一切信息、價格沿趨勢運動、歷史會重演。',
      },
      {
        title: '技術分析的類別',
        content: '技術分析包含多個領域：技術指標（均線、KDJ、RSI、MACD、布林帶）、K線型態（反轉型態、持續型態）、圖表分析（支撐阻力、趨勢線）、理論知識（道氏理論、波浪理論）、行為金融學（認知偏誤、市場心理）。',
      },
    ],
  },
  {
    path: '/technical-analysis/indicators',
    title: '技術指標',
    sections: [
      {
        title: '移動平均線 MA',
        content: '移動平均線是最基本的技術指標，計算過去N天的平均價格。常用的有簡單移動平均(SMA)和指數移動平均(EMA)。短期均線上穿長期均線稱為黃金交叉，是買入信號；反之稱為死亡交叉，是賣出信號。常用設置：5、10、20、60、120日均線。',
      },
      {
        title: 'KDJ 隨機指標',
        content: 'KDJ指標由K線、D線和J線組成，用於判斷超買超賣。K值大於80為超買區，小於20為超賣區。當K線從下向上穿過D線，且在超賣區發生，是買入信號。J值超過100表示極度超買，低於0表示極度超賣。',
      },
      {
        title: 'RSI 相對強弱指標',
        content: 'RSI測量價格變動的速度和變化，範圍0-100。RSI大於70通常表示超買，小於30表示超賣。RSI背離是重要信號：價格創新高但RSI沒有，暗示上漲動能減弱。常用週期：14日。',
      },
      {
        title: 'MACD 指標',
        content: 'MACD由快線(DIF)、慢線(DEA)和柱狀圖組成。計算方式：DIF=EMA12-EMA26，DEA是DIF的9日EMA。金叉買入，死叉賣出。零軸上方的金叉比零軸下方更強勢。MACD背離是趨勢反轉的重要信號。',
      },
      {
        title: '布林帶 Bollinger Bands',
        content: '布林帶由中軌（20日均線）、上軌（中軌+2倍標準差）、下軌（中軌-2倍標準差）組成。價格觸及上軌可能超買，觸及下軌可能超賣。帶寬收窄表示波動性降低，往往預示大行情。價格突破上軌後沿上軌運行是強勢特徵。',
      },
      {
        title: 'ATR 平均真實波幅',
        content: 'ATR衡量市場波動性，用於設置止損和評估風險。計算真實波幅的14日平均值。ATR擴大表示波動加劇，縮小表示波動減小。常用於設置止損：入場價 - 2倍ATR。',
      },
    ],
  },
  {
    path: '/technical-analysis/patterns',
    title: 'K線型態',
    sections: [
      {
        title: '反轉型態概述',
        content: '反轉型態預示趨勢可能改變。主要包括：頭肩頂/底、雙重頂/底、三重頂/底、圓弧頂/底。反轉型態需要先有趨勢存在，成交量確認很重要。',
      },
      {
        title: '頭肩頂/底',
        content: '頭肩頂由左肩、頭部、右肩組成，頸線是關鍵支撐。突破頸線後目標價位約等於頭部到頸線的距離。頭肩底是相反的形態，是底部反轉信號。成交量通常在頭部最大，右肩最小。',
      },
      {
        title: '雙重頂/底',
        content: '雙重頂（M頂）：價格兩次觸及相近高點後回落，突破頸線確認反轉。雙重底（W底）：價格兩次觸及相近低點後反彈。第二次觸及時成交量通常較小。目標價位等於形態高度。',
      },
      {
        title: '持續型態',
        content: '持續型態表示趨勢暫時休整後將繼續。包括：三角形（對稱、上升、下降）、旗形、楔形、矩形。這些形態通常伴隨成交量萎縮，突破時成交量放大。',
      },
      {
        title: '單根K線信號',
        content: '錘子線：長下影線，出現在下跌趨勢底部，是反轉信號。吊人線：形態相同但出現在上漲頂部。十字星：開盤價和收盤價接近，表示市場猶豫。長實體K線表示強烈的買方或賣方力量。',
      },
    ],
  },
  {
    path: '/technical-analysis/theories',
    title: '經典理論',
    sections: [
      {
        title: '道氏理論',
        content: '道氏理論是技術分析的基石。核心概念：市場有三種趨勢（主要趨勢、次級趨勢、小趨勢）、主要趨勢有三個階段（累積、公眾參與、派發）、指數必須相互確認、成交量必須確認趨勢、趨勢持續直到明確的反轉信號。',
      },
      {
        title: '艾略特波浪理論',
        content: '波浪理論認為市場以5-3浪的形式運動：5浪推動（1、3、5上漲，2、4回調）加3浪修正（A、B、C）。浪的比例關係常符合斐波那契數列。第3浪通常最長且最強，不能是最短的。第4浪不能與第1浪重疊。',
      },
      {
        title: '威科夫理論',
        content: '威科夫理論分析供需關係和機構行為。四個階段：累積（機構建倉）、上漲、派發（機構出貨）、下跌。關注成交量與價格的關係，識別「聰明錢」的動向。Spring（彈簧）和Upthrust（上沖）是重要信號。',
      },
      {
        title: '江恩理論',
        content: '江恩理論結合時間和價格分析。核心工具：江恩角度線（1x1、2x1等）、江恩方格、時間週期。認為特定角度（45度）具有重要意義。強調時間週期的重複性，如30、60、90、120天等。',
      },
      {
        title: '斐波那契回撤',
        content: '基於斐波那契數列的技術分析工具。關鍵回撤位：23.6%、38.2%、50%、61.8%、78.6%。在趨勢中，價格通常會回撤到這些位置後繼續。61.8%是黃金分割比例，是最重要的回撤位。',
      },
    ],
  },
  {
    path: '/technical-analysis/behavioral-finance',
    title: '行為金融學',
    sections: [
      {
        title: '認知偏誤概述',
        content: '行為金融學研究心理因素如何影響投資決策。認知偏誤會導致非理性行為，理解這些偏誤可以幫助我們做出更好的交易決策，避免常見的心理陷阱。',
      },
      {
        title: '確認偏誤',
        content: '確認偏誤是指傾向於尋找支持自己觀點的信息，忽略相反證據。在交易中表現為：買入後只看利好消息，忽視風險信號。對策：主動尋找反面觀點，設定客觀的停損標準。',
      },
      {
        title: '損失厭惡',
        content: '損失帶來的痛苦約是同等收益帶來快樂的2倍。這導致投資者持有虧損頭寸過久（不願認賠），過早賣出盈利頭寸（害怕回吐利潤）。對策：使用止損單，按計劃執行。',
      },
      {
        title: '錨定效應',
        content: '過度依賴某個參考點做決策。例如：因為股票曾經是100元，就認為80元是便宜的，忽視基本面變化。對策：基於當前條件分析，不要被歷史價格束縛。',
      },
      {
        title: '過度自信',
        content: '高估自己的判斷能力，低估風險。表現為：過度交易、重倉單一標的、忽視止損。研究顯示過度自信的交易者績效較差。對策：保持謙遜，承認市場的不確定性。',
      },
      {
        title: '羊群效應',
        content: '跟隨大眾行為，在高點買入、低點賣出。「別人都在買，應該沒錯」是典型的羊群心理。對策：獨立思考，逆向投資，記住「市場最擁擠時往往最危險」。',
      },
      {
        title: '近因偏誤',
        content: '過度重視最近發生的事件。連續幾次獲利後會過度自信，連續虧損後會過度恐懼。對策：保持長期視角，用系統化方法做決策。',
      },
      {
        title: '處置效應',
        content: '傾向於過早賣出盈利股票，過久持有虧損股票。這與損失厭惡有關。結果是「截斷利潤，讓虧損奔跑」，與正確做法相反。對策：讓利潤奔跑，及時止損。',
      },
    ],
  },
  // ==================== 期權 ====================
  {
    path: '/options',
    title: '期權交易總覽',
    sections: [
      {
        title: '什麼是期權',
        content: '期權是一種衍生性金融商品，給予持有者在特定時間以特定價格買入或賣出標的資產的權利（而非義務）。買方支付權利金獲得權利，賣方收取權利金承擔義務。',
      },
      {
        title: '期權的類型',
        content: '買權（Call）：給予買方在到期日或之前以執行價買入標的資產的權利。賣權（Put）：給予買方在到期日或之前以執行價賣出標的資產的權利。美式期權可在到期前任何時間執行，歐式期權只能在到期日執行。',
      },
    ],
  },
  {
    path: '/options/basics',
    title: '期權基礎',
    sections: [
      {
        title: '期權的構成要素',
        content: '期權有四個關鍵要素：標的資產（如股票、指數）、執行價格（履約價）、到期日、權利金（期權價格）。權利金由內在價值和時間價值組成。',
      },
      {
        title: '內在價值與時間價值',
        content: '內在價值是期權立即執行能獲得的價值。對於Call：標的價格 - 執行價（如果為正）。對於Put：執行價 - 標的價格（如果為正）。時間價值 = 權利金 - 內在價值，反映期權可能增值的潛力。',
      },
      {
        title: '價內、價平、價外',
        content: 'Call期權：標的價格 > 執行價 = 價內（ITM），等於 = 價平（ATM），小於 = 價外（OTM）。Put期權相反。價內期權有內在價值，價外期權只有時間價值。',
      },
      {
        title: '期權的四種基本部位',
        content: '買進買權（Long Call）：看漲，風險有限（權利金），收益無限。賣出買權（Short Call）：看跌或中性，收益有限，風險無限。買進賣權（Long Put）：看跌，風險有限，收益可觀。賣出賣權（Short Put）：看漲或中性，收益有限，風險可觀。',
      },
    ],
  },
  {
    path: '/options/greeks',
    title: '希臘字母',
    sections: [
      {
        title: '什麼是希臘字母',
        content: '希臘字母（Greeks）是衡量期權價格對各種因素敏感度的指標。主要有五個：Delta、Gamma、Theta、Vega、Rho。理解這些指標對於風險管理和策略選擇至關重要。',
      },
      {
        title: 'Delta（Δ）',
        content: 'Delta衡量期權價格對標的資產價格變動的敏感度。Call的Delta在0到1之間，Put在-1到0之間。ATM期權Delta約為±0.5。Delta也可解讀為期權到期價內的概率。例如Delta=0.7意味著標的漲1元，期權約漲0.7元。',
      },
      {
        title: 'Gamma（Γ）',
        content: 'Gamma衡量Delta對標的價格變動的敏感度（Delta的Delta）。ATM期權Gamma最大。Gamma高意味著Delta變化快，風險和機會都大。接近到期時，ATM期權Gamma會急劇增加（Gamma風險）。',
      },
      {
        title: 'Theta（Θ）',
        content: 'Theta衡量時間流逝對期權價值的影響（時間衰減）。通常為負值，表示每天期權價值減少多少。ATM期權Theta最大。接近到期時，時間衰減加速。賣方賺取Theta，買方承擔Theta損耗。',
      },
      {
        title: 'Vega（ν）',
        content: 'Vega衡量期權價格對隱含波動率變化的敏感度。波動率上升，期權價值增加。ATM期權Vega最大。長天期期權Vega更高。買方受益於波動率上升，賣方受益於波動率下降。',
      },
      {
        title: 'Rho（ρ）',
        content: 'Rho衡量期權價格對利率變化的敏感度。利率上升對Call有利，對Put不利。在低利率環境下，Rho影響相對較小。長天期期權Rho影響更大。',
      },
    ],
  },
  {
    path: '/options/strategies',
    title: '期權策略',
    sections: [
      {
        title: '備兌看漲期權 Covered Call',
        content: 'Covered Call是持有股票同時賣出該股票的買權。目的是賺取權利金收入。最大獲利是權利金加上股價漲至執行價的差額。風險是股價大幅下跌。適合溫和看漲或中性市場。',
      },
      {
        title: '保護性賣權 Protective Put',
        content: 'Protective Put是持有股票同時買入該股票的賣權。目的是保護下跌風險。最大損失是權利金加上股價跌至執行價的差額。類似於購買保險。適合看漲但擔心下跌風險。',
      },
      {
        title: '牛市價差 Bull Spread',
        content: '牛市看漲價差：買入較低執行價Call，賣出較高執行價Call。最大獲利是兩個執行價之差減去淨支出。最大損失是淨支出的權利金。適合溫和看漲市場，降低成本。',
      },
      {
        title: '熊市價差 Bear Spread',
        content: '熊市看跌價差：買入較高執行價Put，賣出較低執行價Put。最大獲利是兩個執行價之差減去淨支出。最大損失是淨支出的權利金。適合溫和看跌市場。',
      },
      {
        title: '跨式策略 Straddle',
        content: 'Long Straddle：同時買入相同執行價的Call和Put。預期大幅波動但不確定方向。最大損失是兩份權利金。需要標的大幅移動才能獲利。適合預期重大事件（財報、選舉）。',
      },
      {
        title: '勒式策略 Strangle',
        content: 'Long Strangle：買入價外Call和價外Put（不同執行價）。比Straddle便宜但需要更大波動。最大損失是權利金。適合預期大波動但成本敏感。',
      },
      {
        title: '鐵禿鷹 Iron Condor',
        content: 'Iron Condor：結合Bull Put Spread和Bear Call Spread。在特定價格區間內獲利。最大獲利是收取的淨權利金。最大損失是價差寬度減去權利金。適合預期低波動、區間震盪。',
      },
      {
        title: '蝶式策略 Butterfly',
        content: 'Long Butterfly：買入一個低執行價Call，賣出兩個中間執行價Call，買入一個高執行價Call。最大獲利在中間執行價。成本低但獲利區間窄。適合預期價格穩定在特定水平。',
      },
      {
        title: '日曆價差 Calendar Spread',
        content: 'Calendar Spread：賣出近期期權，買入遠期期權（相同執行價）。利用時間衰減差異獲利。近期期權Theta衰減更快。適合預期短期波動小，長期波動增加。',
      },
    ],
  },
  {
    path: '/options/iv-analysis',
    title: 'IV 分析',
    sections: [
      {
        title: '什麼是隱含波動率',
        content: '隱含波動率（IV）是從期權價格反推出的市場預期波動率。IV高表示市場預期未來波動大，期權價格貴。IV低表示預期波動小，期權便宜。IV是期權定價的關鍵輸入。',
      },
      {
        title: 'IV Rank 和 IV Percentile',
        content: 'IV Rank：當前IV在過去一年IV範圍中的位置百分比。公式：(當前IV - 52周最低IV) / (52周最高IV - 52周最低IV)。IV Percentile：過去一年中低於當前IV的天數百分比。這兩個指標幫助判斷IV是高還是低。',
      },
      {
        title: '波動率微笑',
        content: '波動率微笑（Volatility Smile）：不同執行價的期權有不同的IV。通常價外Put的IV較高（反映市場對下跌的恐懼）。波動率偏斜（Skew）衡量這種不對稱性。這反映了真實市場與Black-Scholes模型假設的差異。',
      },
      {
        title: 'IV 與策略選擇',
        content: 'IV高時：適合賣出策略（收取較高權利金），如Short Strangle、Iron Condor。IV低時：適合買入策略（權利金便宜），如Long Straddle、Long Call/Put。財報前IV通常上升（IV Crush在財報後）。',
      },
      {
        title: 'VIX 指數',
        content: 'VIX是S&P 500指數期權的隱含波動率指數，被稱為「恐慌指數」。VIX高（>30）表示市場恐慌，VIX低（<15）表示市場平靜。VIX通常與股市負相關，可用於避險。VIX也有期貨和期權可交易。',
      },
    ],
  },
];

/**
 * 獲取所有頁面路徑
 */
export function getAllPagePaths(): string[] {
  return PAGE_CONTENTS.map(page => page.path);
}

/**
 * 獲取特定頁面的內容
 */
export function getPageContent(path: string): PageContent | undefined {
  return PAGE_CONTENTS.find(page => page.path === path);
}

/**
 * 將頁面內容轉換為可索引的塊
 */
export function getContentChunks(): { pagePath: string; pageTitle: string; sectionTitle: string; content: string }[] {
  const chunks: { pagePath: string; pageTitle: string; sectionTitle: string; content: string }[] = [];
  
  for (const page of PAGE_CONTENTS) {
    for (const section of page.sections) {
      chunks.push({
        pagePath: page.path,
        pageTitle: page.title,
        sectionTitle: section.title,
        content: section.content,
      });
    }
  }
  
  return chunks;
}



