/**
 * 期權計算函數庫
 * Options Calculation Library
 */

// 標準正態分佈累積函數
function normalCDF(x: number): number {
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x) / Math.sqrt(2);

  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

  return 0.5 * (1.0 + sign * y);
}

// 標準正態分佈概率密度函數
function normalPDF(x: number): number {
  return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
}

export interface BlackScholesParams {
  S: number; // 股票價格 (Stock Price)
  K: number; // 行權價格 (Strike Price)
  T: number; // 到期時間（年）(Time to Expiration in years)
  r: number; // 無風險利率 (Risk-free Rate)
  sigma: number; // 波動率 (Volatility / IV)
}

export interface OptionPrices {
  call: number;
  put: number;
}

export interface Greeks {
  delta: number;
  gamma: number;
  theta: number;
  vega: number;
  rho: number;
}

/**
 * Black-Scholes 期權定價模型
 */
export function blackScholes(params: BlackScholesParams): OptionPrices {
  const { S, K, T, r, sigma } = params;

  if (T <= 0) {
    // 到期時的內在價值
    return {
      call: Math.max(S - K, 0),
      put: Math.max(K - S, 0),
    };
  }

  const d1 = (Math.log(S / K) + (r + 0.5 * sigma * sigma) * T) / (sigma * Math.sqrt(T));
  const d2 = d1 - sigma * Math.sqrt(T);

  const call = S * normalCDF(d1) - K * Math.exp(-r * T) * normalCDF(d2);
  const put = K * Math.exp(-r * T) * normalCDF(-d2) - S * normalCDF(-d1);

  return { call, put };
}

/**
 * 計算希臘字母
 */
export function calculateGreeks(
  params: BlackScholesParams,
  optionType: 'call' | 'put'
): Greeks {
  const { S, K, T, r, sigma } = params;

  if (T <= 0) {
    return {
      delta: optionType === 'call' ? (S > K ? 1 : 0) : (S < K ? -1 : 0),
      gamma: 0,
      theta: 0,
      vega: 0,
      rho: 0,
    };
  }

  const d1 = (Math.log(S / K) + (r + 0.5 * sigma * sigma) * T) / (sigma * Math.sqrt(T));
  const d2 = d1 - sigma * Math.sqrt(T);

  // Delta
  const delta = optionType === 'call' ? normalCDF(d1) : normalCDF(d1) - 1;

  // Gamma (相同於 call 和 put)
  const gamma = normalPDF(d1) / (S * sigma * Math.sqrt(T));

  // Theta (每日)
  const theta1 = (-S * normalPDF(d1) * sigma) / (2 * Math.sqrt(T));
  const theta2 =
    optionType === 'call'
      ? -r * K * Math.exp(-r * T) * normalCDF(d2)
      : r * K * Math.exp(-r * T) * normalCDF(-d2);
  const theta = (theta1 + theta2) / 365; // 轉換為每日

  // Vega (每 1% IV 變化)
  const vega = (S * Math.sqrt(T) * normalPDF(d1)) / 100;

  // Rho (每 1% 利率變化)
  const rho =
    optionType === 'call'
      ? (K * T * Math.exp(-r * T) * normalCDF(d2)) / 100
      : (-K * T * Math.exp(-r * T) * normalCDF(-d2)) / 100;

  return { delta, gamma, theta, vega, rho };
}

export interface PayoffParams {
  type: 'call' | 'put';
  position: 'long' | 'short';
  strike: number;
  premium: number;
  quantity?: number;
}

/**
 * 計算單一期權的損益
 */
export function calculateOptionPayoff(
  stockPrice: number,
  params: PayoffParams
): number {
  const { type, position, strike, premium, quantity = 1 } = params;
  const multiplier = position === 'long' ? 1 : -1;
  const contractMultiplier = 100; // 每張合約代表 100 股

  let intrinsicValue: number;
  if (type === 'call') {
    intrinsicValue = Math.max(stockPrice - strike, 0);
  } else {
    intrinsicValue = Math.max(strike - stockPrice, 0);
  }

  const payoff = multiplier * (intrinsicValue - premium);
  return Math.round(payoff * quantity * contractMultiplier * 100) / 100; // 四捨五入到小數點後兩位
}

export interface StrategyLeg extends PayoffParams {}

/**
 * 計算多腿期權策略的總損益
 */
export function calculateStrategyPayoff(
  stockPrice: number,
  legs: StrategyLeg[]
): number {
  const total = legs.reduce((sum, leg) => {
    return sum + calculateOptionPayoff(stockPrice, leg);
  }, 0);
  return Math.round(total * 100) / 100; // 四捨五入到小數點後兩位
}

/**
 * 生成損益圖數據點
 */
export function generatePayoffData(
  legs: StrategyLeg[],
  centerPrice: number,
  range: number = 0.3, // 上下 30%
  points: number = 100
): { price: number; payoff: number }[] {
  const minPrice = centerPrice * (1 - range);
  const maxPrice = centerPrice * (1 + range);
  const step = (maxPrice - minPrice) / points;

  const data: { price: number; payoff: number }[] = [];

  for (let price = minPrice; price <= maxPrice; price += step) {
    data.push({
      price: Math.round(price * 100) / 100,
      payoff: calculateStrategyPayoff(price, legs),
    });
  }

  return data;
}

/**
 * 計算策略的關鍵價位
 */
export function calculateKeyPrices(legs: StrategyLeg[]): {
  strikes: number[];
  breakevens: number[];
  maxProfit: number | 'unlimited';
  maxLoss: number | 'unlimited';
} {
  const strikes = [...new Set(legs.map((leg) => leg.strike))].sort((a, b) => a - b);
  
  // 簡化計算 - 用數值方法找損益平衡點
  const testData = generatePayoffData(legs, strikes[0] || 100, 0.5, 500);
  const breakevens: number[] = [];
  
  for (let i = 1; i < testData.length; i++) {
    const prev = testData[i - 1];
    const curr = testData[i];
    if ((prev.payoff < 0 && curr.payoff >= 0) || (prev.payoff >= 0 && curr.payoff < 0)) {
      breakevens.push(Math.round((prev.price + curr.price) / 2 * 100) / 100);
    }
  }

  const payoffs = testData.map((d) => d.payoff);
  const maxPayoff = Math.max(...payoffs);
  const minPayoff = Math.min(...payoffs);

  // 格式化數字，避免浮點數精度問題
  const formatNumber = (num: number) => Math.round(num * 100) / 100;

  return {
    strikes,
    breakevens,
    maxProfit: maxPayoff > 1000000 ? 'unlimited' : formatNumber(maxPayoff),
    maxLoss: minPayoff < -1000000 ? 'unlimited' : formatNumber(Math.abs(minPayoff)),
  };
}

/**
 * 預設的期權策略配置
 */
export const STRATEGY_PRESETS: Record<string, { name: string; nameCn: string; legs: Omit<StrategyLeg, 'premium'>[] }> = {
  'long-call': {
    name: 'Long Call',
    nameCn: '買入看漲期權',
    legs: [{ type: 'call', position: 'long', strike: 100 }],
  },
  'long-put': {
    name: 'Long Put',
    nameCn: '買入看跌期權',
    legs: [{ type: 'put', position: 'long', strike: 100 }],
  },
  'short-call': {
    name: 'Short Call',
    nameCn: '賣出看漲期權',
    legs: [{ type: 'call', position: 'short', strike: 100 }],
  },
  'short-put': {
    name: 'Short Put',
    nameCn: '賣出看跌期權',
    legs: [{ type: 'put', position: 'short', strike: 100 }],
  },
  'covered-call': {
    name: 'Covered Call',
    nameCn: '備兌看漲',
    legs: [{ type: 'call', position: 'short', strike: 105 }],
  },
  'cash-secured-put': {
    name: 'Cash-Secured Put',
    nameCn: '現金擔保看跌',
    legs: [{ type: 'put', position: 'short', strike: 95 }],
  },
  'bull-call-spread': {
    name: 'Bull Call Spread',
    nameCn: '牛市看漲價差',
    legs: [
      { type: 'call', position: 'long', strike: 95 },
      { type: 'call', position: 'short', strike: 105 },
    ],
  },
  'bear-put-spread': {
    name: 'Bear Put Spread',
    nameCn: '熊市看跌價差',
    legs: [
      { type: 'put', position: 'long', strike: 105 },
      { type: 'put', position: 'short', strike: 95 },
    ],
  },
  'long-straddle': {
    name: 'Long Straddle',
    nameCn: '買入跨式',
    legs: [
      { type: 'call', position: 'long', strike: 100 },
      { type: 'put', position: 'long', strike: 100 },
    ],
  },
  'short-straddle': {
    name: 'Short Straddle',
    nameCn: '賣出跨式',
    legs: [
      { type: 'call', position: 'short', strike: 100 },
      { type: 'put', position: 'short', strike: 100 },
    ],
  },
  'long-strangle': {
    name: 'Long Strangle',
    nameCn: '買入勒式',
    legs: [
      { type: 'call', position: 'long', strike: 105 },
      { type: 'put', position: 'long', strike: 95 },
    ],
  },
  'short-strangle': {
    name: 'Short Strangle',
    nameCn: '賣出勒式',
    legs: [
      { type: 'call', position: 'short', strike: 105 },
      { type: 'put', position: 'short', strike: 95 },
    ],
  },
  'iron-condor': {
    name: 'Iron Condor',
    nameCn: '鐵禿鷹',
    legs: [
      { type: 'put', position: 'long', strike: 90 },
      { type: 'put', position: 'short', strike: 95 },
      { type: 'call', position: 'short', strike: 105 },
      { type: 'call', position: 'long', strike: 110 },
    ],
  },
  'iron-butterfly': {
    name: 'Iron Butterfly',
    nameCn: '鐵蝴蝶',
    legs: [
      { type: 'put', position: 'long', strike: 90 },
      { type: 'put', position: 'short', strike: 100 },
      { type: 'call', position: 'short', strike: 100 },
      { type: 'call', position: 'long', strike: 110 },
    ],
  },
  'long-call-butterfly': {
    name: 'Long Call Butterfly',
    nameCn: '買入蝴蝶價差 (Call)',
    legs: [
      { type: 'call', position: 'long', strike: 95 },
      { type: 'call', position: 'short', strike: 100 },
      { type: 'call', position: 'short', strike: 100 },
      { type: 'call', position: 'long', strike: 105 },
    ],
  },
  'calendar-spread': {
    name: 'Calendar Spread',
    nameCn: '日曆價差',
    legs: [
      { type: 'call', position: 'short', strike: 100 },
      // 注意：遠期合約需要在組件中特別處理
    ],
  },
  'synthetic-long': {
    name: 'Synthetic Long Stock',
    nameCn: '合成多頭',
    legs: [
      { type: 'call', position: 'long', strike: 100 },
      { type: 'put', position: 'short', strike: 100 },
    ],
  },
  'synthetic-short': {
    name: 'Synthetic Short Stock',
    nameCn: '合成空頭',
    legs: [
      { type: 'call', position: 'short', strike: 100 },
      { type: 'put', position: 'long', strike: 100 },
    ],
  },
  'collar': {
    name: 'Collar',
    nameCn: '領口策略',
    legs: [
      { type: 'put', position: 'long', strike: 95 },
      { type: 'call', position: 'short', strike: 105 },
    ],
  },
  'ratio-spread': {
    name: 'Ratio Call Spread',
    nameCn: '比率價差',
    legs: [
      { type: 'call', position: 'long', strike: 95 },
      { type: 'call', position: 'short', strike: 105 },
      { type: 'call', position: 'short', strike: 105 },
    ],
  },
  'jade-lizard': {
    name: 'Jade Lizard',
    nameCn: '玉蜥蜴',
    legs: [
      { type: 'put', position: 'short', strike: 95 },
      { type: 'call', position: 'short', strike: 105 },
      { type: 'call', position: 'long', strike: 110 },
    ],
  },
};
