import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useState } from 'react';
import { TrendingUp, TrendingDown, Activity, ChevronDown, ChevronUp, Layers, Sparkles } from 'lucide-react-native';
import { THEME_COLORS, StrategyLeg } from '@trading-edu/shared';
import StrategyPayoffChart from '@/components/charts/StrategyPayoffChart';

// 完整的策略數據
interface Strategy {
  id: string;
  name: string;
  nameCn: string;
  outlook: 'bullish' | 'bearish' | 'neutral' | 'volatile';
  description: string;
  legs: StrategyLeg[];
  maxProfit: string;
  maxLoss: string;
  breakeven: string;
  keyPoints: string[];
  bestWhen: string[];
  showStock?: boolean;
}

interface StrategyCategory {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  strategies: Strategy[];
}

const strategyCategories: StrategyCategory[] = [
  {
    id: 'basic',
    title: '基礎策略',
    titleEn: 'Basic Strategies',
    description: '期權交易的四個基本部位，是所有複雜策略的基礎組成元素。',
    strategies: [
      {
        id: 'long-call',
        name: 'Long Call',
        nameCn: '買入看漲期權',
        outlook: 'bullish',
        description: '買入看漲期權是最基本的看漲策略，當你預期股價會上漲時使用。支付權利金後，你有權利在到期日前以行權價買入股票。',
        legs: [{ type: 'call', position: 'long', strike: 100, premium: 5 }],
        maxProfit: '無限',
        maxLoss: '支付的權利金',
        breakeven: '行權價 + 權利金',
        keyPoints: ['風險有限（最多損失權利金）', '獲利潛力無限', '時間衰減對你不利', '波動率上升對你有利'],
        bestWhen: ['強烈看漲標的', '預期大幅波動', 'IV 相對較低'],
      },
      {
        id: 'long-put',
        name: 'Long Put',
        nameCn: '買入看跌期權',
        outlook: 'bearish',
        description: '買入看跌期權是基本的看跌策略，當你預期股價會下跌時使用。支付權利金後，你有權利在到期日前以行權價賣出股票。',
        legs: [{ type: 'put', position: 'long', strike: 100, premium: 5 }],
        maxProfit: '行權價 - 權利金',
        maxLoss: '支付的權利金',
        breakeven: '行權價 - 權利金',
        keyPoints: ['風險有限', '股價跌至零時獲利最大化', '可作為持股的保險', '時間衰減對你不利'],
        bestWhen: ['強烈看跌標的', '想要下方保護', 'IV 相對較低'],
      },
      {
        id: 'short-call',
        name: 'Short Call',
        nameCn: '賣出看漲期權（裸賣）',
        outlook: 'bearish',
        description: '賣出看漲期權收取權利金，當你預期股價不會大幅上漲時使用。風險在於股價大漲時虧損可能無限。',
        legs: [{ type: 'call', position: 'short', strike: 100, premium: 5 }],
        maxProfit: '收取的權利金',
        maxLoss: '無限',
        breakeven: '行權價 + 權利金',
        keyPoints: ['獲利有限（最多獲得權利金）', '虧損潛力無限（裸賣風險極高）', '時間衰減對你有利', '需要較高的保證金'],
        bestWhen: ['強烈看跌或中性觀點', 'IV 相對較高', '有足夠保證金'],
      },
      {
        id: 'short-put',
        name: 'Short Put',
        nameCn: '賣出看跌期權（裸賣）',
        outlook: 'bullish',
        description: '賣出看跌期權收取權利金，當你願意在較低價位買入股票時使用。如果股價跌破行權價，你有義務買入股票。',
        legs: [{ type: 'put', position: 'short', strike: 100, premium: 5 }],
        maxProfit: '收取的權利金',
        maxLoss: '行權價 - 權利金',
        breakeven: '行權價 - 權利金',
        keyPoints: ['獲利有限', '虧損風險大', '如同設定限價買單並收取費用', '常用於低價接貨策略'],
        bestWhen: ['看漲或中性偏多', '願意在行權價買入股票', 'IV 相對較高'],
      },
    ],
  },
  {
    id: 'income',
    title: '收入策略',
    titleEn: 'Income Strategies',
    description: '利用持有股票或現金來產生額外收入的保守策略。',
    strategies: [
      {
        id: 'covered-call',
        name: 'Covered Call',
        nameCn: '備兌看漲',
        outlook: 'neutral',
        description: '持有股票的同時賣出看漲期權收取權利金。這是最受歡迎的收入策略之一，適合對持股略微看漲或中性的投資者。',
        legs: [{ type: 'call', position: 'short', strike: 105, premium: 3 }],
        showStock: true,
        maxProfit: '(行權價 - 股票成本) + 權利金',
        maxLoss: '股票成本 - 權利金',
        breakeven: '股票成本 - 權利金',
        keyPoints: ['需要先持有 100 股標的股票', '權利金收入降低持股成本', '上漲空間被行權價限制', '下跌時仍會虧損'],
        bestWhen: ['已持有股票', '短期中性或略微看漲', '想要產生額外收入'],
      },
      {
        id: 'cash-secured-put',
        name: 'Cash-Secured Put',
        nameCn: '現金擔保看跌',
        outlook: 'bullish',
        description: '在帳戶中保留足夠現金的情況下賣出看跌期權。如果被指派，你會以行權價買入股票。這是「付費等待買入」的策略。',
        legs: [{ type: 'put', position: 'short', strike: 95, premium: 3 }],
        maxProfit: '收取的權利金',
        maxLoss: '行權價 - 權利金',
        breakeven: '行權價 - 權利金',
        keyPoints: ['需要有足夠現金買入 100 股', '如同設定限價買單並收取權利金', '如果股價不跌，白白賺取權利金', '被指派時可轉為 Covered Call'],
        bestWhen: ['看漲但願意等待更好買點', '有閒置現金', 'IV 相對較高'],
      },
    ],
  },
  {
    id: 'spread',
    title: '價差策略',
    titleEn: 'Spread Strategies',
    description: '同時買入和賣出相同類型的期權，限制風險的同時也限制了獲利。',
    strategies: [
      {
        id: 'bull-call-spread',
        name: 'Bull Call Spread',
        nameCn: '牛市看漲價差',
        outlook: 'bullish',
        description: '買入較低行權價的 Call 同時賣出較高行權價的 Call。這是一個成本較低的看漲策略，但獲利空間被限制。',
        legs: [
          { type: 'call', position: 'long', strike: 95, premium: 7 },
          { type: 'call', position: 'short', strike: 105, premium: 3 },
        ],
        maxProfit: '(高行權價 - 低行權價) - 淨成本',
        maxLoss: '淨支付的權利金',
        breakeven: '低行權價 + 淨成本',
        keyPoints: ['淨成本 = 買入 Call 權利金 - 賣出 Call 權利金', '風險有限', '獲利有限', '比單純 Long Call 便宜'],
        bestWhen: ['中度看漲', '想降低 Long Call 成本', 'IV 中等'],
      },
      {
        id: 'bear-put-spread',
        name: 'Bear Put Spread',
        nameCn: '熊市看跌價差',
        outlook: 'bearish',
        description: '買入較高行權價的 Put 同時賣出較低行權價的 Put。這是成本較低的看跌策略。',
        legs: [
          { type: 'put', position: 'long', strike: 105, premium: 7 },
          { type: 'put', position: 'short', strike: 95, premium: 3 },
        ],
        maxProfit: '(高行權價 - 低行權價) - 淨成本',
        maxLoss: '淨支付的權利金',
        breakeven: '高行權價 - 淨成本',
        keyPoints: ['淨成本 = 買入 Put 權利金 - 賣出 Put 權利金', '比單純 Long Put 便宜', '獲利和風險都有限', '適合預期下跌但幅度有限'],
        bestWhen: ['中度看跌', '想降低 Long Put 成本', '預期下跌有支撐位'],
      },
      {
        id: 'bull-put-spread',
        name: 'Bull Put Spread',
        nameCn: '牛市看跌價差（Credit Spread）',
        outlook: 'bullish',
        description: '賣出較高行權價的 Put 同時買入較低行權價的 Put。這是收取權利金的看漲策略，風險有限。',
        legs: [
          { type: 'put', position: 'short', strike: 100, premium: 5 },
          { type: 'put', position: 'long', strike: 90, premium: 2 },
        ],
        maxProfit: '淨收取的權利金',
        maxLoss: '(高行權價 - 低行權價) - 淨權利金',
        breakeven: '高行權價 - 淨權利金',
        keyPoints: ['開倉時收取權利金', '股價維持在高行權價之上即可獲得全部權利金', '風險被低行權價限制', 'Credit Spread'],
        bestWhen: ['看漲或中性', '想收取權利金', 'IV 較高'],
      },
      {
        id: 'bear-call-spread',
        name: 'Bear Call Spread',
        nameCn: '熊市看漲價差（Credit Spread）',
        outlook: 'bearish',
        description: '賣出較低行權價的 Call 同時買入較高行權價的 Call。收取權利金的看跌策略。',
        legs: [
          { type: 'call', position: 'short', strike: 100, premium: 5 },
          { type: 'call', position: 'long', strike: 110, premium: 2 },
        ],
        maxProfit: '淨收取的權利金',
        maxLoss: '(高行權價 - 低行權價) - 淨權利金',
        breakeven: '低行權價 + 淨權利金',
        keyPoints: ['開倉時收取權利金', '股價維持在低行權價之下即可獲得全部權利金', '上漲時虧損被高行權價限制', '適合看跌但不想承擔無限風險'],
        bestWhen: ['看跌或中性', '想收取權利金', 'IV 較高'],
      },
    ],
  },
  {
    id: 'volatility',
    title: '波動率策略',
    titleEn: 'Volatility Strategies',
    description: '不預測方向，而是預測波動率的策略。適合財報季或重大事件前後使用。',
    strategies: [
      {
        id: 'long-straddle',
        name: 'Long Straddle',
        nameCn: '買入跨式',
        outlook: 'volatile',
        description: '同時買入相同行權價的 Call 和 Put。當你預期股價會大幅波動但不確定方向時使用。',
        legs: [
          { type: 'call', position: 'long', strike: 100, premium: 5 },
          { type: 'put', position: 'long', strike: 100, premium: 5 },
        ],
        maxProfit: '無限（任一方向大幅移動）',
        maxLoss: '支付的總權利金',
        breakeven: '行權價 ± 總權利金',
        keyPoints: ['需要股價大幅波動才能獲利', '方向不重要，波動才重要', '時間衰減極為不利（雙倍 Theta）', 'IV 上升對你有利'],
        bestWhen: ['預期大幅波動但方向不明', '財報發布前', 'IV 相對較低'],
      },
      {
        id: 'short-straddle',
        name: 'Short Straddle',
        nameCn: '賣出跨式',
        outlook: 'neutral',
        description: '同時賣出相同行權價的 Call 和 Put。收取大量權利金，但如果股價大幅波動，虧損可能無限。',
        legs: [
          { type: 'call', position: 'short', strike: 100, premium: 5 },
          { type: 'put', position: 'short', strike: 100, premium: 5 },
        ],
        maxProfit: '收取的總權利金',
        maxLoss: '無限',
        breakeven: '行權價 ± 總權利金',
        keyPoints: ['收取雙倍權利金', '股價維持不變時獲利最大', '任一方向大幅波動都會虧損', 'IV 下降對你有利'],
        bestWhen: ['預期股價橫盤', 'IV 相對較高', '財報發布後（IV Crush）'],
      },
      {
        id: 'long-strangle',
        name: 'Long Strangle',
        nameCn: '買入勒式',
        outlook: 'volatile',
        description: '買入 OTM 的 Call 和 Put。比 Straddle 便宜，但需要更大的價格波動才能獲利。',
        legs: [
          { type: 'call', position: 'long', strike: 105, premium: 3 },
          { type: 'put', position: 'long', strike: 95, premium: 3 },
        ],
        maxProfit: '無限',
        maxLoss: '支付的總權利金',
        breakeven: '高行權價+權利金 或 低行權價-權利金',
        keyPoints: ['成本比 Straddle 低', '需要更大幅度的波動才能獲利', '兩個行權價之間的區域為虧損區', '適合預期極端波動'],
        bestWhen: ['預期極端波動', '成本考量優先', 'IV 較低'],
      },
      {
        id: 'short-strangle',
        name: 'Short Strangle',
        nameCn: '賣出勒式',
        outlook: 'neutral',
        description: '賣出 OTM 的 Call 和 Put。收取權利金並獲得較寬的獲利區間，但兩端風險仍然很大。',
        legs: [
          { type: 'call', position: 'short', strike: 105, premium: 3 },
          { type: 'put', position: 'short', strike: 95, premium: 3 },
        ],
        maxProfit: '收取的總權利金',
        maxLoss: '無限（上漲）或 低行權價-權利金（下跌）',
        breakeven: '高行權價+權利金 或 低行權價-權利金',
        keyPoints: ['獲利區間比 Short Straddle 寬', '權利金收入較少', '股價在兩行權價之間時獲利最大', '是最受歡迎的收入策略之一'],
        bestWhen: ['預期低波動', 'IV 較高（IV Rank > 50）', '想要較寬的安全區間'],
      },
    ],
  },
  {
    id: 'complex',
    title: '複合策略',
    titleEn: 'Complex Strategies',
    description: '由多個期權組合而成的進階策略，提供更精細的風險收益特徵。',
    strategies: [
      {
        id: 'iron-condor',
        name: 'Iron Condor',
        nameCn: '鐵禿鷹',
        outlook: 'neutral',
        description: '結合 Bull Put Spread 和 Bear Call Spread。在股價維持區間內時獲利，是最受歡迎的中性策略之一。',
        legs: [
          { type: 'put', position: 'long', strike: 85, premium: 1 },
          { type: 'put', position: 'short', strike: 90, premium: 2.5 },
          { type: 'call', position: 'short', strike: 110, premium: 2.5 },
          { type: 'call', position: 'long', strike: 115, premium: 1 },
        ],
        maxProfit: '淨收取的權利金',
        maxLoss: '價差寬度 - 淨權利金',
        breakeven: '賣 Put 行權價-權利金 及 賣 Call 行權價+權利金',
        keyPoints: ['四腿策略', '風險和獲利都有限', '在兩個賣出行權價之間獲利最大', '適合低波動環境'],
        bestWhen: ['預期橫盤', 'IV 較高', '想限制最大虧損'],
      },
      {
        id: 'iron-butterfly',
        name: 'Iron Butterfly',
        nameCn: '鐵蝴蝶',
        outlook: 'neutral',
        description: '所有期權都使用同一行權價的變體。獲利潛力比 Iron Condor 高，但獲利區間更窄。',
        legs: [
          { type: 'put', position: 'long', strike: 90, premium: 1 },
          { type: 'put', position: 'short', strike: 100, premium: 5 },
          { type: 'call', position: 'short', strike: 100, premium: 5 },
          { type: 'call', position: 'long', strike: 110, premium: 1 },
        ],
        maxProfit: '淨收取的權利金',
        maxLoss: '翼展寬度 - 淨權利金',
        breakeven: '行權價 ± 淨權利金',
        keyPoints: ['中間兩腿行權價相同', '收取權利金比 Iron Condor 多', '獲利區間較窄', '股價剛好在行權價時獲利最大'],
        bestWhen: ['強烈預期橫盤', '有特定目標價位', 'IV 較高'],
      },
      {
        id: 'long-butterfly',
        name: 'Long Butterfly',
        nameCn: '買入蝴蝶價差',
        outlook: 'neutral',
        description: '買入一個低行權價 Call、賣出兩個中間行權價 Call、買入一個高行權價 Call。低成本的中性策略。',
        legs: [
          { type: 'call', position: 'long', strike: 95, premium: 8 },
          { type: 'call', position: 'short', strike: 100, premium: 5 },
          { type: 'call', position: 'short', strike: 100, premium: 5 },
          { type: 'call', position: 'long', strike: 105, premium: 3 },
        ],
        maxProfit: '(高行權價-中行權價) - 淨成本',
        maxLoss: '淨支付的權利金',
        breakeven: '低行權價+淨成本 及 高行權價-淨成本',
        keyPoints: ['低成本策略', '股價在中間行權價時獲利最大', '風險有限', '報酬風險比高'],
        bestWhen: ['預期股價收斂到特定價位', '低成本交易', '想要高報酬風險比'],
      },
      {
        id: 'calendar-spread',
        name: 'Calendar Spread',
        nameCn: '日曆價差',
        outlook: 'neutral',
        description: '賣出近期到期的期權，買入遠期到期的期權（相同行權價）。利用時間衰減的差異獲利。',
        legs: [
          { type: 'call', position: 'short', strike: 100, premium: 3 },
        ],
        maxProfit: '取決於到期時的 IV 和股價',
        maxLoss: '淨支付的權利金',
        breakeven: '複雜，取決於 IV',
        keyPoints: ['近期期權時間衰減更快', '需要股價維持在行權價附近', 'IV 上升對你有利', '需要決定是否平倉遠期期權'],
        bestWhen: ['預期短期橫盤', 'IV 較低（預期上升）', '想利用 Theta 差異'],
      },
    ],
  },
  {
    id: 'synthetic',
    title: '合成部位',
    titleEn: 'Synthetic Positions',
    description: '使用期權模擬股票持倉或創造保護性組合。',
    strategies: [
      {
        id: 'synthetic-long',
        name: 'Synthetic Long Stock',
        nameCn: '合成多頭',
        outlook: 'bullish',
        description: '買入 Call 同時賣出 Put（相同行權價和到期日）。損益線與持有股票幾乎相同，但資金使用效率更高。',
        legs: [
          { type: 'call', position: 'long', strike: 100, premium: 5 },
          { type: 'put', position: 'short', strike: 100, premium: 5 },
        ],
        maxProfit: '無限（股價上漲）',
        maxLoss: '行權價 ± 淨權利金（股價跌至 0）',
        breakeven: '行權價 ± 淨權利金',
        keyPoints: ['損益曲線與股票幾乎相同', '資金需求比買股票低', '有到期日限制', '可能產生淨成本或淨收入'],
        bestWhen: ['強烈看漲', '想要槓桿效果', '資金有限'],
      },
      {
        id: 'synthetic-short',
        name: 'Synthetic Short Stock',
        nameCn: '合成空頭',
        outlook: 'bearish',
        description: '賣出 Call 同時買入 Put（相同行權價和到期日）。損益線與放空股票相同。',
        legs: [
          { type: 'call', position: 'short', strike: 100, premium: 5 },
          { type: 'put', position: 'long', strike: 100, premium: 5 },
        ],
        maxProfit: '行權價 ± 淨權利金（股價跌至 0）',
        maxLoss: '無限（股價上漲）',
        breakeven: '行權價 ± 淨權利金',
        keyPoints: ['等同於放空股票', '不需要借券', '有到期日限制', '沒有借券費用'],
        bestWhen: ['強烈看跌', '難以借券的股票', '想避免借券費用'],
      },
      {
        id: 'collar',
        name: 'Collar',
        nameCn: '領口策略',
        outlook: 'neutral',
        description: '持有股票的同時，買入保護性 Put 並賣出 Covered Call。鎖定利潤區間，限制上下方風險。',
        legs: [
          { type: 'put', position: 'long', strike: 95, premium: 3 },
          { type: 'call', position: 'short', strike: 105, premium: 3 },
        ],
        showStock: true,
        maxProfit: '(賣 Call 行權價 - 股票成本) + 淨權利金',
        maxLoss: '(股票成本 - 買 Put 行權價) - 淨權利金',
        breakeven: '股票成本 ± 淨權利金',
        keyPoints: ['零成本或低成本保護', '限制下方風險', '但也限制上方獲利', '適合長期持股但想短期保護'],
        bestWhen: ['持有獲利股票想保護', '預期短期波動', '想要零成本保護'],
      },
    ],
  },
  {
    id: 'advanced',
    title: '進階組合',
    titleEn: 'Advanced Combinations',
    description: '更複雜的多腿策略，提供獨特的風險收益特徵。',
    strategies: [
      {
        id: 'ratio-spread',
        name: 'Ratio Call Spread',
        nameCn: '比率價差',
        outlook: 'neutral',
        description: '買入一個期權，賣出多個不同行權價的同類期權。通常是 1:2 或 1:3 的比例。',
        legs: [
          { type: 'call', position: 'long', strike: 95, premium: 8 },
          { type: 'call', position: 'short', strike: 105, premium: 3 },
          { type: 'call', position: 'short', strike: 105, premium: 3 },
        ],
        maxProfit: '(賣出行權價 - 買入行權價) × 100 - 淨成本',
        maxLoss: '無限（Call Ratio）或有限（Put Ratio）',
        breakeven: '複雜，取決於比例和權利金',
        keyPoints: ['可能是零成本或收取權利金', '獲利在特定區間內最大化', '超過某價位後開始虧損', '需要精確的方向判斷'],
        bestWhen: ['有特定目標價位', '預期中度波動', '想要低成本'],
      },
      {
        id: 'jade-lizard',
        name: 'Jade Lizard',
        nameCn: '玉蜥蜴',
        outlook: 'bullish',
        description: '賣出 Put 加上賣出 Call Spread（Bear Call Spread）。收取權利金，上方風險被限制，但下方風險仍在。',
        legs: [
          { type: 'put', position: 'short', strike: 95, premium: 4 },
          { type: 'call', position: 'short', strike: 105, premium: 3 },
          { type: 'call', position: 'long', strike: 110, premium: 1 },
        ],
        maxProfit: '淨收取的權利金',
        maxLoss: 'Put 行權價 - 淨權利金',
        breakeven: 'Put 行權價 - 淨權利金',
        keyPoints: ['收取的權利金大於 Call Spread 寬度 = 上方無風險', '適合中性偏多觀點', '下方風險等同於 Short Put', '高勝率策略'],
        bestWhen: ['中性偏多', '想消除上方風險', 'IV 較高'],
      },
      {
        id: 'double-diagonal',
        name: 'Double Diagonal',
        nameCn: '雙對角價差',
        outlook: 'neutral',
        description: '結合兩個對角價差（不同行權價和到期日）。利用時間衰減和波動率變化獲利的進階策略。',
        legs: [
          { type: 'put', position: 'short', strike: 95, premium: 3 },
          { type: 'call', position: 'short', strike: 105, premium: 3 },
        ],
        maxProfit: '取決於到期時的位置和 IV',
        maxLoss: '有限（遠期期權提供保護）',
        breakeven: '複雜，取決於多個因素',
        keyPoints: ['近期賣出 OTM Put 和 Call', '遠期買入更 OTM 的 Put 和 Call', '複雜的調整需求', '需要管理多個到期日'],
        bestWhen: ['預期低波動後波動上升', '想要 Theta 和 Vega 雙重獲利', '有經驗的交易者'],
      },
    ],
  },
];

const outlookConfig = {
  bullish: { label: '看漲', color: '#10b981', Icon: TrendingUp },
  bearish: { label: '看跌', color: '#ef4444', Icon: TrendingDown },
  neutral: { label: '中性', color: '#f59e0b', Icon: Activity },
  volatile: { label: '波動', color: '#8b5cf6', Icon: Activity },
};

// 策略卡片組件
function StrategyCard({ strategy }: { strategy: Strategy }) {
  const [expanded, setExpanded] = useState(false);
  const outlook = outlookConfig[strategy.outlook];

  return (
    <View style={styles.card}>
      <Pressable 
        onPress={() => setExpanded(!expanded)}
        style={styles.cardHeader}
      >
        <View style={styles.cardHeaderContent}>
          <View style={styles.cardTitleRow}>
            <Text style={styles.cardTitle}>{strategy.name}</Text>
            <View style={[styles.outlookBadge, { backgroundColor: `${outlook.color}20` }]}>
              <outlook.Icon size={12} color={outlook.color} />
              <Text style={[styles.outlookText, { color: outlook.color }]}>
                {outlook.label}
              </Text>
            </View>
          </View>
          <Text style={styles.cardSubtitle}>{strategy.nameCn}</Text>
        </View>
        {expanded ? (
          <ChevronUp size={20} color="#64748b" />
        ) : (
          <ChevronDown size={20} color="#64748b" />
        )}
      </Pressable>

      {expanded && (
        <View style={styles.cardBody}>
          <Text style={styles.description}>{strategy.description}</Text>
          
          {/* 互動圖表 */}
          <View style={styles.chartContainer}>
            <StrategyPayoffChart
              legs={strategy.legs}
              title={`${strategy.nameCn} 損益圖`}
              showStock={strategy.showStock}
            />
          </View>

          {/* 風險收益 */}
          <View style={styles.statsContainer}>
            <View style={styles.statsHeader}>
              <Layers size={14} color={THEME_COLORS.accentGold} />
              <Text style={styles.statsTitle}>風險與報酬</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>最大獲利</Text>
              <Text style={[styles.statValue, { color: '#10b981' }]}>{strategy.maxProfit}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>最大虧損</Text>
              <Text style={[styles.statValue, { color: '#ef4444' }]}>{strategy.maxLoss}</Text>
            </View>
            <View style={[styles.statRow, { marginBottom: 0 }]}>
              <Text style={styles.statLabel}>損益平衡</Text>
              <Text style={[styles.statValue, { color: '#f59e0b' }]}>{strategy.breakeven}</Text>
            </View>
          </View>

          {/* 重點提示 */}
          <View style={styles.keyPointsContainer}>
            <Text style={styles.sectionLabel}>重點提示</Text>
            {strategy.keyPoints.map((point, i) => (
              <View key={i} style={styles.keyPointRow}>
                <View style={styles.keyPointDot} />
                <Text style={styles.keyPointText}>{point}</Text>
              </View>
            ))}
          </View>

          {/* 最佳使用時機 */}
          <View style={styles.bestWhenContainer}>
            <View style={styles.bestWhenHeader}>
              <Sparkles size={14} color={THEME_COLORS.accentGold} />
              <Text style={styles.sectionLabel}>最佳使用時機</Text>
            </View>
            <View style={styles.bestWhenTags}>
              {strategy.bestWhen.map((when, i) => (
                <View key={i} style={styles.bestWhenTag}>
                  <Text style={styles.bestWhenTagText}>{when}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* 組成部位 */}
          <View style={styles.legsContainer}>
            <Text style={styles.sectionLabel}>組成部位</Text>
            <View style={styles.legsTags}>
              {strategy.showStock && (
                <View style={[styles.legTag, { backgroundColor: 'rgba(59, 130, 246, 0.2)' }]}>
                  <Text style={[styles.legTagText, { color: '#3b82f6' }]}>
                    持有 100 股
                  </Text>
                </View>
              )}
              {strategy.legs.map((leg, i) => (
                <View 
                  key={i} 
                  style={[
                    styles.legTag, 
                    { backgroundColor: leg.position === 'long' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)' }
                  ]}
                >
                  <Text style={[
                    styles.legTagText, 
                    { color: leg.position === 'long' ? '#10b981' : '#ef4444' }
                  ]}>
                    {leg.position === 'long' ? '買入' : '賣出'} {leg.type.toUpperCase()} @ ${leg.strike}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

// 策略分類組件
function StrategySection({ category }: { category: StrategyCategory }) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{category.title}</Text>
        <Text style={styles.sectionTitleEn}>{category.titleEn}</Text>
      </View>
      <Text style={styles.sectionDescription}>{category.description}</Text>
      {category.strategies.map((strategy) => (
        <StrategyCard key={strategy.id} strategy={strategy} />
      ))}
    </View>
  );
}

export default function StrategiesPage() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 頁面標題 */}
      <View style={styles.header}>
        <Text style={styles.pageTitle}>期權策略完整指南</Text>
        <Text style={styles.pageDescription}>
          從基礎的買入看漲到複雜的鐵禿鷹，這裡收錄了所有常見的期權策略。點擊展開查看損益圖和詳細分析。
        </Text>
      </View>

      {/* 策略快速指南 */}
      <View style={styles.guideBox}>
        <Text style={styles.guideTitle}>📊 策略選擇指南</Text>
        <Text style={styles.guideText}>
          • <Text style={{ color: '#10b981' }}>看漲</Text>：預期股價上漲{'\n'}
          • <Text style={{ color: '#ef4444' }}>看跌</Text>：預期股價下跌{'\n'}
          • <Text style={{ color: '#f59e0b' }}>中性</Text>：預期股價橫盤或小幅波動{'\n'}
          • <Text style={{ color: '#8b5cf6' }}>波動</Text>：預期大幅波動，方向不確定
        </Text>
      </View>

      {/* IV 與策略選擇 */}
      <View style={styles.ivGuideBox}>
        <Text style={styles.ivGuideTitle}>IV 與策略選擇</Text>
        <View style={styles.ivGuideRow}>
          <View style={styles.ivGuideItem}>
            <Text style={[styles.ivGuideLabel, { color: '#10b981' }]}>高 IV（{'>'} 50）</Text>
            <Text style={styles.ivGuideText}>賣出策略為主{'\n'}收取較高權利金</Text>
          </View>
          <View style={styles.ivGuideItem}>
            <Text style={[styles.ivGuideLabel, { color: '#3b82f6' }]}>低 IV（{'<'} 30）</Text>
            <Text style={styles.ivGuideText}>買入策略為主{'\n'}期權相對便宜</Text>
          </View>
        </View>
      </View>

      {/* 策略列表 */}
      {strategyCategories.map((category) => (
        <StrategySection key={category.id} category={category} />
      ))}

      {/* 更多策略提示 */}
      <View style={styles.moreStrategiesBox}>
        <View style={styles.moreStrategiesHeader}>
          <Sparkles size={16} color={THEME_COLORS.accentGold} />
          <Text style={styles.moreStrategiesTitle}>還有更多策略...</Text>
        </View>
        <Text style={styles.moreStrategiesText}>
          期權策略的組合是無窮的。以上只是最常見的策略，你還可以探索：
        </Text>
        <View style={styles.moreStrategiesTags}>
          {['Christmas Tree', 'Broken Wing Butterfly', 'Skip Strike', 'Box Spread', 'Conversion', 'Seagull', 'Strap/Strip'].map((name) => (
            <View key={name} style={styles.moreStrategyTag}>
              <Text style={styles.moreStrategyTagText}>{name}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 底部間距 */}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME_COLORS.bgPrimary,
    paddingHorizontal: 16,
  },
  header: {
    paddingVertical: 24,
  },
  pageTitle: {
    color: THEME_COLORS.textPrimary,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  pageDescription: {
    color: THEME_COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  guideBox: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.2)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  guideTitle: {
    color: THEME_COLORS.textPrimary,
    fontWeight: '600',
    marginBottom: 8,
  },
  guideText: {
    color: THEME_COLORS.textSecondary,
    fontSize: 12,
    lineHeight: 20,
  },
  ivGuideBox: {
    backgroundColor: THEME_COLORS.bgCard,
    borderWidth: 1,
    borderColor: THEME_COLORS.borderColor,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  ivGuideTitle: {
    color: THEME_COLORS.textPrimary,
    fontWeight: '600',
    marginBottom: 12,
  },
  ivGuideRow: {
    flexDirection: 'row',
    gap: 12,
  },
  ivGuideItem: {
    flex: 1,
    backgroundColor: THEME_COLORS.bgSecondary,
    borderRadius: 8,
    padding: 12,
  },
  ivGuideLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  ivGuideText: {
    color: THEME_COLORS.textSecondary,
    fontSize: 11,
    lineHeight: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    marginBottom: 8,
  },
  sectionTitle: {
    color: THEME_COLORS.textPrimary,
    fontWeight: 'bold',
    fontSize: 18,
  },
  sectionTitleEn: {
    color: THEME_COLORS.textMuted,
    fontSize: 12,
  },
  sectionDescription: {
    color: THEME_COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
  },
  card: {
    backgroundColor: THEME_COLORS.bgCard,
    borderWidth: 1,
    borderColor: THEME_COLORS.borderColor,
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  cardHeader: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardHeaderContent: {
    flex: 1,
    marginRight: 12,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardTitle: {
    color: THEME_COLORS.textPrimary,
    fontWeight: '600',
    fontSize: 15,
  },
  outlookBadge: {
    marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  outlookText: {
    fontSize: 11,
    marginLeft: 4,
    fontWeight: '500',
  },
  cardSubtitle: {
    color: THEME_COLORS.textMuted,
    fontSize: 12,
  },
  cardBody: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: THEME_COLORS.borderColor,
    paddingTop: 12,
  },
  description: {
    color: THEME_COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  chartContainer: {
    marginBottom: 16,
  },
  statsContainer: {
    backgroundColor: THEME_COLORS.bgSecondary,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  statsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statsTitle: {
    color: THEME_COLORS.textPrimary,
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 6,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statLabel: {
    color: THEME_COLORS.textMuted,
    fontSize: 12,
  },
  statValue: {
    fontSize: 12,
    fontWeight: '500',
  },
  keyPointsContainer: {
    marginBottom: 16,
  },
  sectionLabel: {
    color: THEME_COLORS.textPrimary,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  keyPointRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  keyPointDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: THEME_COLORS.accentGold,
    marginTop: 6,
    marginRight: 8,
  },
  keyPointText: {
    flex: 1,
    color: THEME_COLORS.textSecondary,
    fontSize: 12,
    lineHeight: 18,
  },
  bestWhenContainer: {
    marginBottom: 16,
  },
  bestWhenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bestWhenTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  bestWhenTag: {
    backgroundColor: THEME_COLORS.bgSecondary,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  bestWhenTagText: {
    color: THEME_COLORS.textSecondary,
    fontSize: 11,
  },
  legsContainer: {
    marginBottom: 8,
  },
  legsTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  legTag: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  legTagText: {
    fontSize: 11,
    fontWeight: '500',
  },
  moreStrategiesBox: {
    backgroundColor: THEME_COLORS.bgCard,
    borderWidth: 1,
    borderColor: THEME_COLORS.borderColor,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  moreStrategiesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  moreStrategiesTitle: {
    color: THEME_COLORS.textPrimary,
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 8,
  },
  moreStrategiesText: {
    color: THEME_COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
  },
  moreStrategiesTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  moreStrategyTag: {
    backgroundColor: THEME_COLORS.bgSecondary,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  moreStrategyTagText: {
    color: THEME_COLORS.textMuted,
    fontSize: 11,
  },
});
