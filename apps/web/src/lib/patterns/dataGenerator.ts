// K 線數據類型定義
export interface CandleData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface LineAnnotation {
  type: 'horizontal' | 'diagonal' | 'trendline';
  label: string;
  color: string;
  points: { x: number; y: number }[];
  dashArray?: string;
}

export interface PointAnnotation {
  x: number;
  y: number;
  label: string;
  color: string;
}

export interface ZoneAnnotation {
  yStart: number;
  yEnd: number;
  label: string;
  color: string;
  opacity: number;
}

export interface PatternData {
  candles: CandleData[];
  annotations: {
    lines: LineAnnotation[];
    points: PointAnnotation[];
    zones: ZoneAnnotation[];
  };
  breakoutIndex?: number; // 突破發生的 K 線索引
}

// 生成日期序列
function generateDates(count: number, startDate = new Date('2024-01-01')): string[] {
  const dates: string[] = [];
  const current = new Date(startDate);
  
  for (let i = 0; i < count; i++) {
    dates.push(current.toISOString().split('T')[0]);
    // 跳過週末
    current.setDate(current.getDate() + 1);
    while (current.getDay() === 0 || current.getDay() === 6) {
      current.setDate(current.getDate() + 1);
    }
  }
  
  return dates;
}

// 生成單根 K 線（帶隨機性）
function generateCandle(
  prevClose: number,
  trend: 'up' | 'down' | 'sideways',
  volatility: number,
  volume: number
): Omit<CandleData, 'date'> {
  const trendBias = trend === 'up' ? 0.6 : trend === 'down' ? -0.6 : 0;
  const direction = Math.random() > 0.5 + trendBias ? 1 : -1;
  const bodySize = (Math.random() * volatility * prevClose) / 100;
  
  const open = prevClose + (Math.random() - 0.5) * volatility * prevClose / 200;
  const close = open + direction * bodySize;
  
  const high = Math.max(open, close) + Math.random() * volatility * prevClose / 300;
  const low = Math.min(open, close) - Math.random() * volatility * prevClose / 300;
  
  const volumeVariation = 0.7 + Math.random() * 0.6; // 70% - 130%
  
  return {
    open: Number(open.toFixed(2)),
    high: Number(high.toFixed(2)),
    low: Number(low.toFixed(2)),
    close: Number(close.toFixed(2)),
    volume: Math.round(volume * volumeVariation),
  };
}

// 生成趨勢性 K 線序列
function generateTrendCandles(
  startPrice: number,
  count: number,
  trend: 'up' | 'down' | 'sideways',
  volatility: number,
  baseVolume: number
): Omit<CandleData, 'date'>[] {
  const candles: Omit<CandleData, 'date'>[] = [];
  let currentPrice = startPrice;
  
  for (let i = 0; i < count; i++) {
    const candle = generateCandle(currentPrice, trend, volatility, baseVolume);
    candles.push(candle);
    currentPrice = candle.close;
  }
  
  return candles;
}

// ============================================
// 頭肩頂 (Head and Shoulders Top)
// ============================================
export function generateHeadAndShouldersTop(): PatternData {
  const basePrice = 100;
  const baseVolume = 1000000;
  const dates = generateDates(80);
  const candles: CandleData[] = [];
  
  // 階段 1: 上升趨勢 (20 根)
  let trendCandles = generateTrendCandles(basePrice, 20, 'up', 2.5, baseVolume * 1.2);
  trendCandles.forEach((c, i) => candles.push({ ...c, date: dates[i] }));
  
  // 階段 2: 左肩形成 (8 根 - 上升到峰值)
  let leftShoulderUp = generateTrendCandles(candles[candles.length - 1].close, 6, 'up', 2, baseVolume * 1.5);
  leftShoulderUp.forEach((c, i) => candles.push({ ...c, date: dates[candles.length] }));
  const leftShoulderPeak = candles.length - 1;
  
  // 階段 3: 左肩回調 (5 根)
  let leftShoulderDown = generateTrendCandles(candles[candles.length - 1].close, 5, 'down', 2, baseVolume * 0.9);
  leftShoulderDown.forEach((c, i) => candles.push({ ...c, date: dates[candles.length] }));
  const leftShoulderLow = candles.length - 1;
  
  // 階段 4: 頭部上升 (7 根 - 更高的峰值)
  let headUp = generateTrendCandles(candles[candles.length - 1].close, 7, 'up', 2.5, baseVolume * 1.3);
  headUp.forEach((c, i) => candles.push({ ...c, date: dates[candles.length] }));
  const headPeak = candles.length - 1;
  
  // 階段 5: 頭部回調 (6 根)
  let headDown = generateTrendCandles(candles[candles.length - 1].close, 6, 'down', 2, baseVolume * 0.8);
  headDown.forEach((c, i) => candles.push({ ...c, date: dates[candles.length] }));
  const headLow = candles.length - 1;
  
  // 階段 6: 右肩上升 (6 根 - 與左肩相似高度)
  const targetRightShoulderHeight = candles[leftShoulderPeak].high * 0.98; // 略低於左肩
  let rightShoulderUp = generateTrendCandles(candles[candles.length - 1].close, 6, 'up', 2, baseVolume * 1.1);
  rightShoulderUp.forEach((c, i) => candles.push({ ...c, date: dates[candles.length] }));
  const rightShoulderPeak = candles.length - 1;
  
  // 階段 7: 右肩回調並測試頸線 (4 根)
  let rightShoulderDown = generateTrendCandles(candles[candles.length - 1].close, 4, 'down', 2, baseVolume * 0.7);
  rightShoulderDown.forEach((c, i) => candles.push({ ...c, date: dates[candles.length] }));
  
  // 階段 8: 跌破頸線 (3 根 - 大陰線)
  const breakoutIndex = candles.length;
  for (let i = 0; i < 3; i++) {
    const candle = generateCandle(candles[candles.length - 1].close, 'down', 3, baseVolume * 1.6);
    candles.push({ ...candle, date: dates[candles.length] });
  }
  
  // 階段 9: 回測頸線 (2 根)
  let throwback = generateTrendCandles(candles[candles.length - 1].close, 2, 'up', 1.5, baseVolume * 0.9);
  throwback.forEach((c, i) => candles.push({ ...c, date: dates[candles.length] }));
  
  // 階段 10: 繼續下跌 (剩餘)
  const remaining = 80 - candles.length;
  let finalDown = generateTrendCandles(candles[candles.length - 1].close, remaining, 'down', 2, baseVolume * 1.1);
  finalDown.forEach((c, i) => candles.push({ ...c, date: dates[candles.length] }));
  
  // 計算頸線（連接左肩和頭部的回調低點）
  const necklineY = (candles[leftShoulderLow].low + candles[headLow].low) / 2;
  
  return {
    candles,
    breakoutIndex,
    annotations: {
      lines: [
        {
          type: 'horizontal',
          label: '頸線 (Neckline)',
          color: '#ef4444',
          points: [
            { x: leftShoulderLow, y: necklineY },
            { x: candles.length - 1, y: necklineY },
          ],
          dashArray: '5,5',
        },
      ],
      points: [
        { x: leftShoulderPeak, y: candles[leftShoulderPeak].high, label: '左肩', color: '#3b82f6' },
        { x: headPeak, y: candles[headPeak].high, label: '頭部', color: '#8b5cf6' },
        { x: rightShoulderPeak, y: candles[rightShoulderPeak].high, label: '右肩', color: '#3b82f6' },
      ],
      zones: [
        {
          yStart: necklineY * 0.95,
          yEnd: necklineY,
          label: '支撐區',
          color: '#10b981',
          opacity: 0.1,
        },
      ],
    },
  };
}

// ============================================
// 頭肩底 (Head and Shoulders Bottom)
// ============================================
export function generateHeadAndShouldersBottom(): PatternData {
  const basePrice = 100;
  const baseVolume = 1000000;
  const dates = generateDates(80);
  const candles: CandleData[] = [];
  
  // 階段 1: 下降趨勢 (20 根)
  let trendCandles = generateTrendCandles(basePrice, 20, 'down', 2.5, baseVolume * 1.1);
  trendCandles.forEach((c, i) => candles.push({ ...c, date: dates[i] }));
  
  // 階段 2: 左肩形成 (6 根 - 下降到低點)
  let leftShoulderDown = generateTrendCandles(candles[candles.length - 1].close, 6, 'down', 2, baseVolume * 0.9);
  leftShoulderDown.forEach((c, i) => candles.push({ ...c, date: dates[candles.length] }));
  const leftShoulderBottom = candles.length - 1;
  
  // 階段 3: 左肩反彈 (5 根)
  let leftShoulderUp = generateTrendCandles(candles[candles.length - 1].close, 5, 'up', 2, baseVolume * 0.8);
  leftShoulderUp.forEach((c, i) => candles.push({ ...c, date: dates[candles.length] }));
  const leftShoulderHigh = candles.length - 1;
  
  // 階段 4: 頭部下降 (7 根 - 更低的低點)
  let headDown = generateTrendCandles(candles[candles.length - 1].close, 7, 'down', 2.5, baseVolume * 1.1);
  headDown.forEach((c, i) => candles.push({ ...c, date: dates[candles.length] }));
  const headBottom = candles.length - 1;
  
  // 階段 5: 頭部反彈 (6 根)
  let headUp = generateTrendCandles(candles[candles.length - 1].close, 6, 'up', 2, baseVolume * 1.2);
  headUp.forEach((c, i) => candles.push({ ...c, date: dates[candles.length] }));
  const headHigh = candles.length - 1;
  
  // 階段 6: 右肩下降 (6 根 - 與左肩相似深度)
  let rightShoulderDown = generateTrendCandles(candles[candles.length - 1].close, 6, 'down', 2, baseVolume * 0.9);
  rightShoulderDown.forEach((c, i) => candles.push({ ...c, date: dates[candles.length] }));
  const rightShoulderBottom = candles.length - 1;
  
  // 階段 7: 右肩反彈並測試頸線 (4 根)
  let rightShoulderUp = generateTrendCandles(candles[candles.length - 1].close, 4, 'up', 2, baseVolume * 1.3);
  rightShoulderUp.forEach((c, i) => candles.push({ ...c, date: dates[candles.length] }));
  
  // 階段 8: 突破頸線 (3 根 - 大陽線，高成交量)
  const breakoutIndex = candles.length;
  for (let i = 0; i < 3; i++) {
    const candle = generateCandle(candles[candles.length - 1].close, 'up', 3, baseVolume * 2.0);
    candles.push({ ...candle, date: dates[candles.length] });
  }
  
  // 階段 9: 回測頸線 (2 根)
  let throwback = generateTrendCandles(candles[candles.length - 1].close, 2, 'down', 1.5, baseVolume * 0.8);
  throwback.forEach((c, i) => candles.push({ ...c, date: dates[candles.length] }));
  
  // 階段 10: 繼續上升 (剩餘)
  const remaining = 80 - candles.length;
  let finalUp = generateTrendCandles(candles[candles.length - 1].close, remaining, 'up', 2, baseVolume * 1.3);
  finalUp.forEach((c, i) => candles.push({ ...c, date: dates[candles.length] }));
  
  // 計算頸線
  const necklineY = (candles[leftShoulderHigh].high + candles[headHigh].high) / 2;
  
  return {
    candles,
    breakoutIndex,
    annotations: {
      lines: [
        {
          type: 'horizontal',
          label: '頸線 (Neckline)',
          color: '#10b981',
          points: [
            { x: leftShoulderHigh, y: necklineY },
            { x: candles.length - 1, y: necklineY },
          ],
          dashArray: '5,5',
        },
      ],
      points: [
        { x: leftShoulderBottom, y: candles[leftShoulderBottom].low, label: '左肩', color: '#3b82f6' },
        { x: headBottom, y: candles[headBottom].low, label: '頭部', color: '#8b5cf6' },
        { x: rightShoulderBottom, y: candles[rightShoulderBottom].low, label: '右肩', color: '#3b82f6' },
      ],
      zones: [
        {
          yStart: necklineY,
          yEnd: necklineY * 1.05,
          label: '阻力區',
          color: '#ef4444',
          opacity: 0.1,
        },
      ],
    },
  };
}

// ============================================
// 對稱三角形 (Symmetrical Triangle)
// ============================================
export function generateSymmetricalTriangle(scenario: 'bullish-reversal' | 'bearish-reversal' | 'bullish-continuation' | 'bearish-continuation'): PatternData {
  const basePrice = 100;
  const baseVolume = 1000000;
  const dates = generateDates(70);
  const candles: CandleData[] = [];
  
  // 前期趨勢
  const preTrend = scenario.includes('bullish') ? 'up' : 'down';
  const preTrendLength = scenario.includes('reversal') ? 20 : 12; // 反轉前趨勢更長
  
  let trendCandles = generateTrendCandles(basePrice, preTrendLength, preTrend, 2.5, baseVolume * 1.2);
  trendCandles.forEach((c, i) => candles.push({ ...c, date: dates[i] }));
  
  // 三角形形成：4 個主要轉折點
  const triangleStart = candles.length;
  const startPrice = candles[candles.length - 1].close;
  const range = startPrice * 0.15; // 初始波動幅度
  
  // 第一個高點
  let up1 = generateTrendCandles(startPrice, 4, 'up', 2, baseVolume * 0.9);
  up1.forEach((c, i) => candles.push({ ...c, date: dates[candles.length] }));
  const peak1 = candles.length - 1;
  
  // 第一個低點
  let down1 = generateTrendCandles(candles[candles.length - 1].close, 4, 'down', 2, baseVolume * 0.8);
  down1.forEach((c, i) => candles.push({ ...c, date: dates[candles.length] }));
  const trough1 = candles.length - 1;
  
  // 第二個高點（略低於第一個）
  let up2 = generateTrendCandles(candles[candles.length - 1].close, 4, 'up', 1.8, baseVolume * 0.7);
  up2.forEach((c, i) => candles.push({ ...c, date: dates[candles.length] }));
  const peak2 = candles.length - 1;
  
  // 第二個低點（略高於第一個）
  let down2 = generateTrendCandles(candles[candles.length - 1].close, 4, 'down', 1.8, baseVolume * 0.6);
  down2.forEach((c, i) => candles.push({ ...c, date: dates[candles.length] }));
  const trough2 = candles.length - 1;
  
  // 繼續收斂
  let up3 = generateTrendCandles(candles[candles.length - 1].close, 3, 'up', 1.5, baseVolume * 0.55);
  up3.forEach((c, i) => candles.push({ ...c, date: dates[candles.length] }));
  const peak3 = candles.length - 1;
  
  let down3 = generateTrendCandles(candles[candles.length - 1].close, 3, 'down', 1.5, baseVolume * 0.5);
  down3.forEach((c, i) => candles.push({ ...c, date: dates[candles.length] }));
  
  // 突破
  const breakoutIndex = candles.length;
  const breakoutDirection = scenario.includes('bullish') ? 'up' : 'down';
  
  for (let i = 0; i < 3; i++) {
    const candle = generateCandle(candles[candles.length - 1].close, breakoutDirection, 3, baseVolume * 1.8);
    candles.push({ ...candle, date: dates[candles.length] });
  }
  
  // 後續走勢
  const remaining = 70 - candles.length;
  let finalTrend = generateTrendCandles(candles[candles.length - 1].close, remaining, breakoutDirection, 2, baseVolume * 1.3);
  finalTrend.forEach((c, i) => candles.push({ ...c, date: dates[candles.length] }));
  
  // 繪製三角形邊界
  const upperTrendline = [
    { x: peak1, y: candles[peak1].high },
    { x: peak3, y: candles[peak3].high },
  ];
  
  const lowerTrendline = [
    { x: trough1, y: candles[trough1].low },
    { x: trough2, y: candles[trough2].low },
  ];
  
  return {
    candles,
    breakoutIndex,
    annotations: {
      lines: [
        {
          type: 'diagonal',
          label: '上邊界',
          color: '#ef4444',
          points: upperTrendline,
          dashArray: '5,5',
        },
        {
          type: 'diagonal',
          label: '下邊界',
          color: '#10b981',
          points: lowerTrendline,
          dashArray: '5,5',
        },
      ],
      points: [
        { x: peak1, y: candles[peak1].high, label: '高點1', color: '#ef4444' },
        { x: trough1, y: candles[trough1].low, label: '低點1', color: '#10b981' },
        { x: peak2, y: candles[peak2].high, label: '高點2', color: '#ef4444' },
        { x: trough2, y: candles[trough2].low, label: '低點2', color: '#10b981' },
      ],
      zones: [],
    },
  };
}

// ============================================
// 上升三角形 (Ascending Triangle)
// ============================================
export function generateAscendingTriangle(scenario: 'reversal' | 'continuation'): PatternData {
  const basePrice = 100;
  const baseVolume = 1000000;
  const dates = generateDates(70);
  const candles: CandleData[] = [];
  
  // 前期趨勢
  const preTrend = scenario === 'reversal' ? 'down' : 'up';
  const preTrendLength = scenario === 'reversal' ? 18 : 12;
  
  let trendCandles = generateTrendCandles(basePrice, preTrendLength, preTrend, 2.5, baseVolume * 1.2);
  trendCandles.forEach((c, i) => candles.push({ ...c, date: dates[i] }));
  
  // 確定水平阻力位
  const resistanceLevel = scenario === 'reversal' 
    ? candles[candles.length - 1].close * 1.15 
    : candles[candles.length - 1].close * 1.08;
  
  // 第一次觸及阻力
  let up1 = generateTrendCandles(candles[candles.length - 1].close, 5, 'up', 2, baseVolume * 1.3);
  up1.forEach((c, i) => candles.push({ ...c, date: dates[candles.length] }));
  // 調整最後一根達到阻力位
  candles[candles.length - 1].high = resistanceLevel;
  candles[candles.length - 1].close = resistanceLevel * 0.99;
  const resistance1 = candles.length - 1;
  
  // 第一次回調
  let down1 = generateTrendCandles(candles[candles.length - 1].close, 4, 'down', 2, baseVolume * 0.9);
  down1.forEach((c, i) => candles.push({ ...c, date: dates[candles.length] }));
  const trough1 = candles.length - 1;
  
  // 第二次觸及阻力
  let up2 = generateTrendCandles(candles[candles.length - 1].close, 4, 'up', 2, baseVolume * 1.2);
  up2.forEach((c, i) => candles.push({ ...c, date: dates[candles.length] }));
  candles[candles.length - 1].high = resistanceLevel;
  candles[candles.length - 1].close = resistanceLevel * 0.98;
  const resistance2 = candles.length - 1;
  
  // 第二次回調（更高的低點）
  let down2 = generateTrendCandles(candles[candles.length - 1].close, 4, 'down', 1.8, baseVolume * 0.8);
  down2.forEach((c, i) => candles.push({ ...c, date: dates[candles.length] }));
  const trough2 = candles.length - 1;
  
  // 第三次觸及阻力
  let up3 = generateTrendCandles(candles[candles.length - 1].close, 3, 'up', 2, baseVolume * 1.1);
  up3.forEach((c, i) => candles.push({ ...c, date: dates[candles.length] }));
  candles[candles.length - 1].high = resistanceLevel;
  candles[candles.length - 1].close = resistanceLevel * 0.97;
  const resistance3 = candles.length - 1;
  
  // 第三次回調（更高的低點）
  let down3 = generateTrendCandles(candles[candles.length - 1].close, 3, 'down', 1.5, baseVolume * 0.7);
  down3.forEach((c, i) => candles.push({ ...c, date: dates[candles.length] }));
  const trough3 = candles.length - 1;
  
  // 突破阻力
  const breakoutIndex = candles.length;
  for (let i = 0; i < 3; i++) {
    const candle = generateCandle(candles[candles.length - 1].close, 'up', 3, baseVolume * 2.0);
    candles.push({ ...candle, date: dates[candles.length] });
  }
  
  // 回測阻力（變成支撐）
  let throwback = generateTrendCandles(candles[candles.length - 1].close, 2, 'down', 1.5, baseVolume * 0.9);
  throwback.forEach((c, i) => candles.push({ ...c, date: dates[candles.length] }));
  
  // 後續上漲
  const remaining = 70 - candles.length;
  let finalUp = generateTrendCandles(candles[candles.length - 1].close, remaining, 'up', 2, baseVolume * 1.3);
  finalUp.forEach((c, i) => candles.push({ ...c, date: dates[candles.length] }));
  
  return {
    candles,
    breakoutIndex,
    annotations: {
      lines: [
        {
          type: 'horizontal',
          label: '水平阻力',
          color: '#ef4444',
          points: [
            { x: resistance1, y: resistanceLevel },
            { x: candles.length - 1, y: resistanceLevel },
          ],
        },
        {
          type: 'diagonal',
          label: '上升支撐',
          color: '#10b981',
          points: [
            { x: trough1, y: candles[trough1].low },
            { x: trough3, y: candles[trough3].low },
          ],
          dashArray: '5,5',
        },
      ],
      points: [
        { x: resistance1, y: resistanceLevel, label: '阻力測試1', color: '#ef4444' },
        { x: resistance2, y: resistanceLevel, label: '阻力測試2', color: '#ef4444' },
        { x: resistance3, y: resistanceLevel, label: '阻力測試3', color: '#ef4444' },
      ],
      zones: [],
    },
  };
}

// ============================================
// 下降三角形 (Descending Triangle)
// ============================================
export function generateDescendingTriangle(scenario: 'reversal' | 'continuation'): PatternData {
  const basePrice = 100;
  const baseVolume = 1000000;
  const dates = generateDates(70);
  const candles: CandleData[] = [];
  
  // 前期趨勢
  const preTrend = scenario === 'reversal' ? 'up' : 'down';
  const preTrendLength = scenario === 'reversal' ? 18 : 12;
  
  let trendCandles = generateTrendCandles(basePrice, preTrendLength, preTrend, 2.5, baseVolume * 1.2);
  trendCandles.forEach((c, i) => candles.push({ ...c, date: dates[i] }));
  
  // 確定水平支撐位
  const supportLevel = scenario === 'reversal' 
    ? candles[candles.length - 1].close * 0.88 
    : candles[candles.length - 1].close * 0.94;
  
  // 第一次觸及支撐
  let down1 = generateTrendCandles(candles[candles.length - 1].close, 5, 'down', 2, baseVolume * 1.1);
  down1.forEach((c, i) => candles.push({ ...c, date: dates[candles.length] }));
  candles[candles.length - 1].low = supportLevel;
  candles[candles.length - 1].close = supportLevel * 1.01;
  const support1 = candles.length - 1;
  
  // 第一次反彈
  let up1 = generateTrendCandles(candles[candles.length - 1].close, 4, 'up', 2, baseVolume * 0.9);
  up1.forEach((c, i) => candles.push({ ...c, date: dates[candles.length] }));
  const peak1 = candles.length - 1;
  
  // 第二次觸及支撐
  let down2 = generateTrendCandles(candles[candles.length - 1].close, 4, 'down', 2, baseVolume * 1.0);
  down2.forEach((c, i) => candles.push({ ...c, date: dates[candles.length] }));
  candles[candles.length - 1].low = supportLevel;
  candles[candles.length - 1].close = supportLevel * 1.015;
  const support2 = candles.length - 1;
  
  // 第二次反彈（更低的高點）
  let up2 = generateTrendCandles(candles[candles.length - 1].close, 4, 'up', 1.8, baseVolume * 0.8);
  up2.forEach((c, i) => candles.push({ ...c, date: dates[candles.length] }));
  const peak2 = candles.length - 1;
  
  // 第三次觸及支撐
  let down3 = generateTrendCandles(candles[candles.length - 1].close, 3, 'down', 2, baseVolume * 0.95);
  down3.forEach((c, i) => candles.push({ ...c, date: dates[candles.length] }));
  candles[candles.length - 1].low = supportLevel;
  candles[candles.length - 1].close = supportLevel * 1.01;
  const support3 = candles.length - 1;
  
  // 第三次反彈（更低的高點）
  let up3 = generateTrendCandles(candles[candles.length - 1].close, 3, 'up', 1.5, baseVolume * 0.7);
  up3.forEach((c, i) => candles.push({ ...c, date: dates[candles.length] }));
  const peak3 = candles.length - 1;
  
  // 跌破支撐
  const breakoutIndex = candles.length;
  for (let i = 0; i < 3; i++) {
    const candle = generateCandle(candles[candles.length - 1].close, 'down', 3, baseVolume * 1.6);
    candles.push({ ...candle, date: dates[candles.length] });
  }
  
  // 後續下跌
  const remaining = 70 - candles.length;
  let finalDown = generateTrendCandles(candles[candles.length - 1].close, remaining, 'down', 2, baseVolume * 1.2);
  finalDown.forEach((c, i) => candles.push({ ...c, date: dates[candles.length] }));
  
  return {
    candles,
    breakoutIndex,
    annotations: {
      lines: [
        {
          type: 'horizontal',
          label: '水平支撐',
          color: '#10b981',
          points: [
            { x: support1, y: supportLevel },
            { x: candles.length - 1, y: supportLevel },
          ],
        },
        {
          type: 'diagonal',
          label: '下降阻力',
          color: '#ef4444',
          points: [
            { x: peak1, y: candles[peak1].high },
            { x: peak3, y: candles[peak3].high },
          ],
          dashArray: '5,5',
        },
      ],
      points: [
        { x: support1, y: supportLevel, label: '支撐測試1', color: '#10b981' },
        { x: support2, y: supportLevel, label: '支撐測試2', color: '#10b981' },
        { x: support3, y: supportLevel, label: '支撐測試3', color: '#10b981' },
      ],
      zones: [],
    },
  };
}

// ============================================
// 雙重頂 (Double Top)
// ============================================
export function generateDoubleTop(): PatternData {
  const basePrice = 100;
  const baseVolume = 1000000;
  const dates = generateDates(70);
  const candles: CandleData[] = [];
  
  // 階段 1: 長期上升趨勢 (22 根)
  let uptrend = generateTrendCandles(basePrice, 22, 'up', 2.5, baseVolume * 1.3);
  uptrend.forEach((c, i) => candles.push({ ...c, date: dates[i] }));
  
  // 階段 2: 第一個頂部 (5 根上升)
  let peak1Up = generateTrendCandles(candles[candles.length - 1].close, 5, 'up', 2, baseVolume * 1.8);
  peak1Up.forEach((c, i) => candles.push({ ...c, date: dates[candles.length] }));
  const peak1 = candles.length - 1;
  const peakLevel = candles[peak1].high;
  
  // 階段 3: 回調 (約 20% 深度，8 根)
  let correction = generateTrendCandles(candles[candles.length - 1].close, 8, 'down', 2.5, baseVolume * 1.0);
  correction.forEach((c, i) => candles.push({ ...c, date: dates[candles.length] }));
  const valley = candles.length - 1;
  const valleyLevel = candles[valley].low;
  
  // 階段 4: 第二次上升測試前高 (6 根)
  let peak2Up = generateTrendCandles(candles[candles.length - 1].close, 6, 'up', 2, baseVolume * 1.5);
  peak2Up.forEach((c, i) => candles.push({ ...c, date: dates[candles.length] }));
  candles[candles.length - 1].high = peakLevel * 0.998; // 略低於第一個頂
  candles[candles.length - 1].close = peakLevel * 0.99;
  const peak2 = candles.length - 1;
  
  // 階段 5: 下跌並測試支撐 (4 根)
  let testSupport = generateTrendCandles(candles[candles.length - 1].close, 4, 'down', 2, baseVolume * 1.1);
  testSupport.forEach((c, i) => candles.push({ ...c, date: dates[candles.length] }));
  
  // 階段 6: 跌破支撐 (3 根大陰線)
  const breakoutIndex = candles.length;
  for (let i = 0; i < 3; i++) {
    const candle = generateCandle(candles[candles.length - 1].close, 'down', 3, baseVolume * 1.7);
    candles.push({ ...candle, date: dates[candles.length] });
  }
  
  // 階段 7: 回測支撐變阻力 (2 根)
  let throwback = generateTrendCandles(candles[candles.length - 1].close, 2, 'up', 1.5, baseVolume * 0.9);
  throwback.forEach((c, i) => candles.push({ ...c, date: dates[candles.length] }));
  
  // 階段 8: 繼續下跌
  const remaining = 70 - candles.length;
  let finalDown = generateTrendCandles(candles[candles.length - 1].close, remaining, 'down', 2.5, baseVolume * 1.2);
  finalDown.forEach((c, i) => candles.push({ ...c, date: dates[candles.length] }));
  
  return {
    candles,
    breakoutIndex,
    annotations: {
      lines: [
        {
          type: 'horizontal',
          label: '頸線支撐',
          color: '#ef4444',
          points: [
            { x: valley, y: valleyLevel },
            { x: candles.length - 1, y: valleyLevel },
          ],
          dashArray: '5,5',
        },
        {
          type: 'horizontal',
          label: '雙重頂',
          color: '#f59e0b',
          points: [
            { x: peak1, y: peakLevel },
            { x: peak2, y: peakLevel },
          ],
          dashArray: '3,3',
        },
      ],
      points: [
        { x: peak1, y: peakLevel, label: '第一頂', color: '#ef4444' },
        { x: peak2, y: peakLevel, label: '第二頂', color: '#ef4444' },
        { x: valley, y: valleyLevel, label: '頸線', color: '#10b981' },
      ],
      zones: [],
    },
  };
}

// ============================================
// 雙重底 (Double Bottom)
// ============================================
export function generateDoubleBottom(): PatternData {
  const basePrice = 100;
  const baseVolume = 1000000;
  const dates = generateDates(70);
  const candles: CandleData[] = [];
  
  // 階段 1: 長期下降趨勢 (22 根)
  let downtrend = generateTrendCandles(basePrice, 22, 'down', 2.5, baseVolume * 1.1);
  downtrend.forEach((c, i) => candles.push({ ...c, date: dates[i] }));
  
  // 階段 2: 第一個底部 (5 根下降)
  let bottom1Down = generateTrendCandles(candles[candles.length - 1].close, 5, 'down', 2, baseVolume * 1.2);
  bottom1Down.forEach((c, i) => candles.push({ ...c, date: dates[candles.length] }));
  const bottom1 = candles.length - 1;
  const bottomLevel = candles[bottom1].low;
  
  // 階段 3: 反彈 (8 根)
  let rally = generateTrendCandles(candles[candles.length - 1].close, 8, 'up', 2.5, baseVolume * 0.9);
  rally.forEach((c, i) => candles.push({ ...c, date: dates[candles.length] }));
  const peak = candles.length - 1;
  const peakLevel = candles[peak].high;
  
  // 階段 4: 第二次下降測試前低 (6 根)
  let bottom2Down = generateTrendCandles(candles[candles.length - 1].close, 6, 'down', 2, baseVolume * 1.0);
  bottom2Down.forEach((c, i) => candles.push({ ...c, date: dates[candles.length] }));
  candles[candles.length - 1].low = bottomLevel * 1.002;
  candles[candles.length - 1].close = bottomLevel * 1.01;
  const bottom2 = candles.length - 1;
  
  // 階段 5: 上升並測試阻力 (4 根)
  let testResistance = generateTrendCandles(candles[candles.length - 1].close, 4, 'up', 2, baseVolume * 1.3);
  testResistance.forEach((c, i) => candles.push({ ...c, date: dates[candles.length] }));
  
  // 階段 6: 突破阻力 (3 根大陽線)
  const breakoutIndex = candles.length;
  for (let i = 0; i < 3; i++) {
    const candle = generateCandle(candles[candles.length - 1].close, 'up', 3, baseVolume * 2.2);
    candles.push({ ...candle, date: dates[candles.length] });
  }
  
  // 階段 7: 回測阻力變支撐 (2 根)
  let throwback = generateTrendCandles(candles[candles.length - 1].close, 2, 'down', 1.5, baseVolume * 0.8);
  throwback.forEach((c, i) => candles.push({ ...c, date: dates[candles.length] }));
  
  // 階段 8: 繼續上漲
  const remaining = 70 - candles.length;
  let finalUp = generateTrendCandles(candles[candles.length - 1].close, remaining, 'up', 2.5, baseVolume * 1.4);
  finalUp.forEach((c, i) => candles.push({ ...c, date: dates[candles.length] }));
  
  return {
    candles,
    breakoutIndex,
    annotations: {
      lines: [
        {
          type: 'horizontal',
          label: '頸線阻力',
          color: '#10b981',
          points: [
            { x: peak, y: peakLevel },
            { x: candles.length - 1, y: peakLevel },
          ],
          dashArray: '5,5',
        },
        {
          type: 'horizontal',
          label: '雙重底',
          color: '#f59e0b',
          points: [
            { x: bottom1, y: bottomLevel },
            { x: bottom2, y: bottomLevel },
          ],
          dashArray: '3,3',
        },
      ],
      points: [
        { x: bottom1, y: bottomLevel, label: '第一底', color: '#10b981' },
        { x: bottom2, y: bottomLevel, label: '第二底', color: '#10b981' },
        { x: peak, y: peakLevel, label: '頸線', color: '#ef4444' },
      ],
      zones: [],
    },
  };
}

// ============================================
// 矩形 (Rectangle)
// ============================================
export function generateRectangle(scenario: 'bullish-continuation' | 'bearish-continuation'): PatternData {
  const basePrice = 100;
  const baseVolume = 1000000;
  const dates = generateDates(70);
  const candles: CandleData[] = [];
  
  // 前期趨勢
  const preTrend = scenario === 'bullish-continuation' ? 'up' : 'down';
  let trendCandles = generateTrendCandles(basePrice, 15, preTrend, 2.5, baseVolume * 1.3);
  trendCandles.forEach((c, i) => candles.push({ ...c, date: dates[i] }));
  
  // 確定矩形邊界
  const upperBound = candles[candles.length - 1].close * (scenario === 'bullish-continuation' ? 1.08 : 1.05);
  const lowerBound = candles[candles.length - 1].close * (scenario === 'bullish-continuation' ? 0.98 : 0.92);
  
  // 在矩形內震盪 (35 根左右)
  for (let i = 0; i < 7; i++) {
    // 向上測試阻力
    let moveUp = generateTrendCandles(candles[candles.length - 1].close, 2, 'up', 1.5, baseVolume * 0.8);
    moveUp.forEach((c) => {
      const adjusted = { ...c };
      if (adjusted.high > upperBound) adjusted.high = upperBound;
      if (adjusted.close > upperBound * 0.99) adjusted.close = upperBound * 0.98;
      candles.push({ ...adjusted, date: dates[candles.length] });
    });
    
    // 向下測試支撐
    let moveDown = generateTrendCandles(candles[candles.length - 1].close, 2, 'down', 1.5, baseVolume * 0.7);
    moveDown.forEach((c) => {
      const adjusted = { ...c };
      if (adjusted.low < lowerBound) adjusted.low = lowerBound;
      if (adjusted.close < lowerBound * 1.01) adjusted.close = lowerBound * 1.02;
      candles.push({ ...adjusted, date: dates[candles.length] });
    });
  }
  
  // 突破
  const breakoutIndex = candles.length;
  const breakoutDirection = scenario === 'bullish-continuation' ? 'up' : 'down';
  
  for (let i = 0; i < 3; i++) {
    const candle = generateCandle(candles[candles.length - 1].close, breakoutDirection, 3, baseVolume * 1.9);
    candles.push({ ...candle, date: dates[candles.length] });
  }
  
  // 回測
  let throwback = generateTrendCandles(
    candles[candles.length - 1].close, 
    2, 
    breakoutDirection === 'up' ? 'down' : 'up', 
    1.5, 
    baseVolume * 0.9
  );
  throwback.forEach((c, i) => candles.push({ ...c, date: dates[candles.length] }));
  
  // 後續走勢
  const remaining = 70 - candles.length;
  let finalTrend = generateTrendCandles(candles[candles.length - 1].close, remaining, breakoutDirection, 2.5, baseVolume * 1.4);
  finalTrend.forEach((c, i) => candles.push({ ...c, date: dates[candles.length] }));
  
  return {
    candles,
    breakoutIndex,
    annotations: {
      lines: [
        {
          type: 'horizontal',
          label: '阻力',
          color: '#ef4444',
          points: [
            { x: 15, y: upperBound },
            { x: breakoutIndex, y: upperBound },
          ],
        },
        {
          type: 'horizontal',
          label: '支撐',
          color: '#10b981',
          points: [
            { x: 15, y: lowerBound },
            { x: breakoutIndex, y: lowerBound },
          ],
        },
      ],
      points: [],
      zones: [
        {
          yStart: lowerBound,
          yEnd: upperBound,
          label: '矩形盤整區',
          color: '#6b7280',
          opacity: 0.05,
        },
      ],
    },
  };
}

// ============================================
// 旗型 (Flag)
// ============================================
export function generateFlag(type: 'bull' | 'bear'): PatternData {
  const basePrice = 100;
  const baseVolume = 1000000;
  const dates = generateDates(50);
  const candles: CandleData[] = [];
  
  // 階段 1: 短期趨勢 (8 根)
  const initialTrend = type === 'bull' ? 'up' : 'down';
  let initial = generateTrendCandles(basePrice, 8, initialTrend, 2, baseVolume * 1.2);
  initial.forEach((c, i) => candles.push({ ...c, date: dates[i] }));
  
  // 階段 2: 旗桿 - 急劇走勢 (5 根大 K 線)
  for (let i = 0; i < 5; i++) {
    const candle = generateCandle(candles[candles.length - 1].close, initialTrend, 4, baseVolume * 2.5);
    candles.push({ ...candle, date: dates[candles.length] });
  }
  const poleEnd = candles.length - 1;
  
  // 階段 3: 旗幟 - 小幅反向盤整 (12 根，成交量萎縮)
  const flagStart = candles.length;
  const flagTrend = type === 'bull' ? 'down' : 'up'; // 旗幟方向與主趨勢相反
  const flagUpper = candles[poleEnd].close * (type === 'bull' ? 1.02 : 0.98);
  const flagLower = candles[poleEnd].close * (type === 'bull' ? 0.96 : 1.04);
  
  for (let i = 0; i < 12; i++) {
    const candle = generateCandle(candles[candles.length - 1].close, flagTrend, 0.8, baseVolume * 0.4);
    const adjusted = { ...candle };
    
    // 保持在旗幟範圍內
    if (type === 'bull') {
      if (adjusted.high > flagUpper) adjusted.high = flagUpper;
      if (adjusted.low < flagLower) adjusted.low = flagLower;
      adjusted.close = Math.min(Math.max(adjusted.close, flagLower * 1.01), flagUpper * 0.99);
    } else {
      if (adjusted.low < flagLower) adjusted.low = flagLower;
      if (adjusted.high > flagUpper) adjusted.high = flagUpper;
      adjusted.close = Math.min(Math.max(adjusted.close, flagLower * 1.01), flagUpper * 0.99);
    }
    
    candles.push({ ...adjusted, date: dates[candles.length] });
  }
  const flagEnd = candles.length - 1;
  
  // 階段 4: 突破旗幟 (3 根)
  const breakoutIndex = candles.length;
  for (let i = 0; i < 3; i++) {
    const candle = generateCandle(candles[candles.length - 1].close, initialTrend, 3.5, baseVolume * 2.3);
    candles.push({ ...candle, date: dates[candles.length] });
  }
  
  // 階段 5: 繼續原趨勢
  const remaining = 50 - candles.length;
  let finalTrend = generateTrendCandles(candles[candles.length - 1].close, remaining, initialTrend, 2.5, baseVolume * 1.5);
  finalTrend.forEach((c, i) => candles.push({ ...c, date: dates[candles.length] }));
  
  return {
    candles,
    breakoutIndex,
    annotations: {
      lines: [
        {
          type: 'horizontal',
          label: '旗幟上邊界',
          color: '#ef4444',
          points: [
            { x: flagStart, y: flagUpper },
            { x: flagEnd, y: flagUpper },
          ],
          dashArray: '4,4',
        },
        {
          type: 'horizontal',
          label: '旗幟下邊界',
          color: '#10b981',
          points: [
            { x: flagStart, y: flagLower },
            { x: flagEnd, y: flagLower },
          ],
          dashArray: '4,4',
        },
      ],
      points: [
        { x: poleEnd, y: candles[poleEnd].close, label: '旗桿頂', color: type === 'bull' ? '#10b981' : '#ef4444' },
      ],
      zones: [
        {
          yStart: Math.min(flagUpper, flagLower),
          yEnd: Math.max(flagUpper, flagLower),
          label: '旗幟整理區',
          color: '#f59e0b',
          opacity: 0.08,
        },
      ],
    },
  };
}

// ============================================
// 三角旗型 (Pennant)
// ============================================
export function generatePennant(type: 'bull' | 'bear'): PatternData {
  const basePrice = 100;
  const baseVolume = 1000000;
  const dates = generateDates(50);
  const candles: CandleData[] = [];
  
  // 階段 1: 短期趨勢 (8 根)
  const initialTrend = type === 'bull' ? 'up' : 'down';
  let initial = generateTrendCandles(basePrice, 8, initialTrend, 2, baseVolume * 1.2);
  initial.forEach((c, i) => candles.push({ ...c, date: dates[i] }));
  
  // 階段 2: 旗桿 - 急劇走勢 (5 根)
  for (let i = 0; i < 5; i++) {
    const candle = generateCandle(candles[candles.length - 1].close, initialTrend, 4, baseVolume * 2.5);
    candles.push({ ...candle, date: dates[candles.length] });
  }
  const poleEnd = candles.length - 1;
  const polePrice = candles[poleEnd].close;
  
  // 階段 3: 三角旗 - 收斂震盪 (10 根)
  const pennantStart = candles.length;
  let currentHigh = polePrice * 1.03;
  let currentLow = polePrice * 0.97;
  
  for (let i = 0; i < 10; i++) {
    // 逐步收斂
    const convergence = i / 10;
    const rangeHigh = polePrice + (currentHigh - polePrice) * (1 - convergence * 0.9);
    const rangeLow = polePrice + (currentLow - polePrice) * (1 - convergence * 0.9);
    
    const trend = i % 2 === 0 ? 'up' : 'down';
    const candle = generateCandle(candles[candles.length - 1].close, trend, 0.8, baseVolume * (0.5 - i * 0.03));
    
    // 限制在收斂範圍內
    const adjusted = { ...candle };
    adjusted.high = Math.min(adjusted.high, rangeHigh);
    adjusted.low = Math.max(adjusted.low, rangeLow);
    adjusted.close = Math.min(Math.max(adjusted.close, rangeLow * 1.005), rangeHigh * 0.995);
    
    candles.push({ ...adjusted, date: dates[candles.length] });
  }
  
  const peak1 = pennantStart + 1;
  const trough1 = pennantStart + 2;
  const peak2 = pennantStart + 5;
  const trough2 = pennantStart + 8;
  
  // 階段 4: 突破 (3 根)
  const breakoutIndex = candles.length;
  for (let i = 0; i < 3; i++) {
    const candle = generateCandle(candles[candles.length - 1].close, initialTrend, 3.5, baseVolume * 2.2);
    candles.push({ ...candle, date: dates[candles.length] });
  }
  
  // 階段 5: 繼續原趨勢
  const remaining = 50 - candles.length;
  let finalTrend = generateTrendCandles(candles[candles.length - 1].close, remaining, initialTrend, 2.5, baseVolume * 1.5);
  finalTrend.forEach((c, i) => candles.push({ ...c, date: dates[candles.length] }));
  
  return {
    candles,
    breakoutIndex,
    annotations: {
      lines: [
        {
          type: 'diagonal',
          label: '上邊界',
          color: '#ef4444',
          points: [
            { x: peak1, y: candles[peak1].high },
            { x: peak2, y: candles[peak2].high },
          ],
          dashArray: '4,4',
        },
        {
          type: 'diagonal',
          label: '下邊界',
          color: '#10b981',
          points: [
            { x: trough1, y: candles[trough1].low },
            { x: trough2, y: candles[trough2].low },
          ],
          dashArray: '4,4',
        },
      ],
      points: [
        { x: poleEnd, y: candles[poleEnd].close, label: '旗桿頂', color: type === 'bull' ? '#10b981' : '#ef4444' },
      ],
      zones: [],
    },
  };
}

// ============================================
// 杯柄型態 (Cup with Handle)
// ============================================
export function generateCupWithHandle(): PatternData {
  const basePrice = 100;
  const baseVolume = 1000000;
  const dates = generateDates(80);
  const candles: CandleData[] = [];
  
  // 階段 1: 初始上升 (12 根)
  let initial = generateTrendCandles(basePrice, 12, 'up', 2.5, baseVolume * 1.3);
  initial.forEach((c, i) => candles.push({ ...c, date: dates[i] }));
  const cupStart = candles.length - 1;
  const cupStartPrice = candles[cupStart].high;
  
  // 階段 2: 杯子左側下降 (12 根，U 形)
  for (let i = 0; i < 12; i++) {
    const progress = i / 12;
    // U 形曲線：使用二次函數
    const depthFactor = Math.sin(progress * Math.PI); // 0 -> 1 -> 0
    const targetDepth = cupStartPrice * 0.75; // 最深回調 25%
    
    const trend = i < 6 ? 'down' : 'sideways';
    const volatility = 1.5 + depthFactor * 0.5;
    const candle = generateCandle(candles[candles.length - 1].close, trend, volatility, baseVolume * (1.2 - depthFactor * 0.4));
    
    candles.push({ ...candle, date: dates[candles.length] });
  }
  const cupBottom = candles.length - 6; // U 形最低點
  
  // 階段 3: 杯子右側上升 (12 根，回到原高度附近)
  for (let i = 0; i < 12; i++) {
    const candle = generateCandle(candles[candles.length - 1].close, 'up', 1.8, baseVolume * (0.8 + i * 0.03));
    candles.push({ ...candle, date: dates[candles.length] });
  }
  
  // 調整最後達到接近杯口
  candles[candles.length - 1].high = cupStartPrice * 0.98;
  candles[candles.length - 1].close = cupStartPrice * 0.97;
  const cupEnd = candles.length - 1;
  
  // 階段 4: 柄 - 小幅回調整理 (8 根，成交量低)
  const handleStart = candles.length;
  let handle = generateTrendCandles(candles[candles.length - 1].close, 8, 'down', 1.2, baseVolume * 0.5);
  handle.forEach((c, i) => candles.push({ ...c, date: dates[candles.length] }));
  const handleEnd = candles.length - 1;
  
  // 階段 5: 突破杯口 (3 根，成交量激增)
  const breakoutIndex = candles.length;
  for (let i = 0; i < 3; i++) {
    const candle = generateCandle(candles[candles.length - 1].close, 'up', 3, baseVolume * 2.5);
    candles.push({ ...candle, date: dates[candles.length] });
  }
  
  // 階段 6: 繼續上漲
  const remaining = 80 - candles.length;
  let finalUp = generateTrendCandles(candles[candles.length - 1].close, remaining, 'up', 2.5, baseVolume * 1.6);
  finalUp.forEach((c, i) => candles.push({ ...c, date: dates[candles.length] }));
  
  return {
    candles,
    breakoutIndex,
    annotations: {
      lines: [
        {
          type: 'horizontal',
          label: '杯口阻力',
          color: '#ef4444',
          points: [
            { x: cupStart, y: cupStartPrice },
            { x: candles.length - 1, y: cupStartPrice },
          ],
          dashArray: '5,5',
        },
      ],
      points: [
        { x: cupStart, y: cupStartPrice, label: '杯口左側', color: '#3b82f6' },
        { x: cupBottom, y: candles[cupBottom].low, label: '杯底', color: '#10b981' },
        { x: cupEnd, y: cupStartPrice * 0.98, label: '杯口右側', color: '#3b82f6' },
        { x: handleEnd, y: candles[handleEnd].close, label: '柄部', color: '#f59e0b' },
      ],
      zones: [
        {
          yStart: candles[cupBottom].low * 0.98,
          yEnd: cupStartPrice,
          label: '杯子形成區',
          color: '#3b82f6',
          opacity: 0.05,
        },
        {
          yStart: candles[handleEnd].low * 0.99,
          yEnd: cupStartPrice * 0.98,
          label: '柄部整理區',
          color: '#f59e0b',
          opacity: 0.08,
        },
      ],
    },
  };
}

