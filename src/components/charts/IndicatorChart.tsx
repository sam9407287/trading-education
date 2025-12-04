'use client';

import { useEffect, useRef, useState } from 'react';
import { createChart, IChartApi, Time, LineStyle } from 'lightweight-charts';

type IndicatorType = 'rsi' | 'macd' | 'kdj' | 'bollinger' | 'atr';

interface IndicatorChartProps {
  indicator: IndicatorType;
  height?: number;
  title?: string;
}

interface OHLCData {
  time: Time;
  open: number;
  high: number;
  low: number;
  close: number;
}

// 生成示例 OHLC 數據
function generateOHLCData(days: number = 100): OHLCData[] {
  const data: OHLCData[] = [];
  let basePrice = 100;
  const now = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0] as Time;
    
    const volatility = 0.02;
    const drift = 0.0001;
    
    const open = basePrice;
    const change = basePrice * (drift + volatility * (Math.random() - 0.5) * 2);
    const close = basePrice + change;
    const high = Math.max(open, close) + basePrice * volatility * Math.random();
    const low = Math.min(open, close) - basePrice * volatility * Math.random();
    
    data.push({
      time: dateStr,
      open: Math.round(open * 100) / 100,
      high: Math.round(high * 100) / 100,
      low: Math.round(low * 100) / 100,
      close: Math.round(close * 100) / 100,
    });
    
    basePrice = close;
  }
  
  return data;
}

// RSI 計算
function calculateRSI(data: OHLCData[], period: number = 14): { time: Time; value: number }[] {
  const result: { time: Time; value: number }[] = [];
  const gains: number[] = [];
  const losses: number[] = [];
  
  for (let i = 1; i < data.length; i++) {
    const change = data[i].close - data[i - 1].close;
    gains.push(change > 0 ? change : 0);
    losses.push(change < 0 ? -change : 0);
    
    if (i >= period) {
      const avgGain = gains.slice(-period).reduce((a, b) => a + b, 0) / period;
      const avgLoss = losses.slice(-period).reduce((a, b) => a + b, 0) / period;
      const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
      const rsi = 100 - (100 / (1 + rs));
      
      result.push({
        time: data[i].time,
        value: Math.round(rsi * 100) / 100,
      });
    }
  }
  
  return result;
}

// KDJ 計算
function calculateKDJ(data: OHLCData[], period: number = 9): {
  k: { time: Time; value: number }[];
  d: { time: Time; value: number }[];
  j: { time: Time; value: number }[];
} {
  const kValues: { time: Time; value: number }[] = [];
  const dValues: { time: Time; value: number }[] = [];
  const jValues: { time: Time; value: number }[] = [];
  
  let prevK = 50;
  let prevD = 50;
  
  for (let i = period - 1; i < data.length; i++) {
    const highestHigh = Math.max(...data.slice(i - period + 1, i + 1).map(d => d.high));
    const lowestLow = Math.min(...data.slice(i - period + 1, i + 1).map(d => d.low));
    
    const rsv = highestHigh === lowestLow ? 50 : 
      ((data[i].close - lowestLow) / (highestHigh - lowestLow)) * 100;
    
    const k = (2 / 3) * prevK + (1 / 3) * rsv;
    const d = (2 / 3) * prevD + (1 / 3) * k;
    const j = 3 * k - 2 * d;
    
    kValues.push({ time: data[i].time, value: Math.round(k * 100) / 100 });
    dValues.push({ time: data[i].time, value: Math.round(d * 100) / 100 });
    jValues.push({ time: data[i].time, value: Math.round(j * 100) / 100 });
    
    prevK = k;
    prevD = d;
  }
  
  return { k: kValues, d: dValues, j: jValues };
}

// Bollinger Bands 計算
function calculateBollinger(data: OHLCData[], period: number = 20, stdDev: number = 2): {
  middle: { time: Time; value: number }[];
  upper: { time: Time; value: number }[];
  lower: { time: Time; value: number }[];
} {
  const middle: { time: Time; value: number }[] = [];
  const upper: { time: Time; value: number }[] = [];
  const lower: { time: Time; value: number }[] = [];
  
  for (let i = period - 1; i < data.length; i++) {
    const slice = data.slice(i - period + 1, i + 1);
    const closes = slice.map(d => d.close);
    const avg = closes.reduce((a, b) => a + b, 0) / period;
    const variance = closes.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / period;
    const std = Math.sqrt(variance);
    
    middle.push({ time: data[i].time, value: Math.round(avg * 100) / 100 });
    upper.push({ time: data[i].time, value: Math.round((avg + stdDev * std) * 100) / 100 });
    lower.push({ time: data[i].time, value: Math.round((avg - stdDev * std) * 100) / 100 });
  }
  
  return { middle, upper, lower };
}

// ATR 計算
function calculateATR(data: OHLCData[], period: number = 14): { time: Time; value: number }[] {
  const result: { time: Time; value: number }[] = [];
  const trueRanges: number[] = [];
  
  for (let i = 1; i < data.length; i++) {
    const tr = Math.max(
      data[i].high - data[i].low,
      Math.abs(data[i].high - data[i - 1].close),
      Math.abs(data[i].low - data[i - 1].close)
    );
    trueRanges.push(tr);
    
    if (i >= period) {
      const atr = trueRanges.slice(-period).reduce((a, b) => a + b, 0) / period;
      result.push({
        time: data[i].time,
        value: Math.round(atr * 100) / 100,
      });
    }
  }
  
  return result;
}

const indicatorConfig: Record<IndicatorType, {
  name: string;
  nameCn: string;
  description: string;
  overbought?: number;
  oversold?: number;
}> = {
  rsi: {
    name: 'RSI',
    nameCn: '相對強弱指標',
    description: '衡量價格變動的速度和變化，範圍 0-100',
    overbought: 70,
    oversold: 30,
  },
  macd: {
    name: 'MACD',
    nameCn: '移動平均收斂發散',
    description: '顯示兩條移動平均線之間的關係',
  },
  kdj: {
    name: 'KDJ',
    nameCn: '隨機指標',
    description: '比較收盤價與一定期間內價格範圍的關係',
    overbought: 80,
    oversold: 20,
  },
  bollinger: {
    name: 'Bollinger Bands',
    nameCn: '布林帶',
    description: '使用移動平均和標準差構建的波動率通道',
  },
  atr: {
    name: 'ATR',
    nameCn: '平均真實波幅',
    description: '衡量市場波動性的指標',
  },
};

export default function IndicatorChart({
  indicator,
  height = 200,
  title,
}: IndicatorChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const [ohlcData] = useState<OHLCData[]>(() => generateOHLCData(100));

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height,
      layout: {
        background: { color: 'transparent' },
        textColor: '#94a3b8',
      },
      grid: {
        vertLines: { color: '#1e293b' },
        horzLines: { color: '#1e293b' },
      },
      crosshair: {
        mode: 1,
        vertLine: {
          color: '#f59e0b',
          width: 1,
          style: LineStyle.Dashed,
        },
        horzLine: {
          color: '#f59e0b',
          width: 1,
          style: LineStyle.Dashed,
        },
      },
      rightPriceScale: {
        borderColor: '#1e293b',
      },
      timeScale: {
        borderColor: '#1e293b',
        timeVisible: true,
      },
    });

    chartRef.current = chart;

    const config = indicatorConfig[indicator];

    // 根據指標類型添加不同的系列
    switch (indicator) {
      case 'rsi': {
        const rsiData = calculateRSI(ohlcData);
        const rsiSeries = chart.addLineSeries({
          color: '#f59e0b',
          lineWidth: 2,
          title: 'RSI',
        });
        rsiSeries.setData(rsiData);
        
        // 超買超賣線
        if (config.overbought) {
          rsiSeries.createPriceLine({
            price: config.overbought,
            color: '#ef4444',
            lineWidth: 1,
            lineStyle: LineStyle.Dashed,
            axisLabelVisible: true,
            title: '超買',
          });
        }
        if (config.oversold) {
          rsiSeries.createPriceLine({
            price: config.oversold,
            color: '#10b981',
            lineWidth: 1,
            lineStyle: LineStyle.Dashed,
            axisLabelVisible: true,
            title: '超賣',
          });
        }
        break;
      }
      
      case 'kdj': {
        const kdj = calculateKDJ(ohlcData);
        
        const kSeries = chart.addLineSeries({
          color: '#f59e0b',
          lineWidth: 2,
          title: 'K',
        });
        kSeries.setData(kdj.k);
        
        const dSeries = chart.addLineSeries({
          color: '#3b82f6',
          lineWidth: 2,
          title: 'D',
        });
        dSeries.setData(kdj.d);
        
        const jSeries = chart.addLineSeries({
          color: '#8b5cf6',
          lineWidth: 1,
          title: 'J',
        });
        jSeries.setData(kdj.j);
        
        if (config.overbought) {
          kSeries.createPriceLine({
            price: config.overbought,
            color: '#ef4444',
            lineWidth: 1,
            lineStyle: LineStyle.Dashed,
          });
        }
        if (config.oversold) {
          kSeries.createPriceLine({
            price: config.oversold,
            color: '#10b981',
            lineWidth: 1,
            lineStyle: LineStyle.Dashed,
          });
        }
        break;
      }
      
      case 'bollinger': {
        const bollinger = calculateBollinger(ohlcData);
        
        chart.addLineSeries({
          color: '#f59e0b',
          lineWidth: 2,
          title: 'Middle',
        }).setData(bollinger.middle);
        
        chart.addLineSeries({
          color: '#3b82f6',
          lineWidth: 1,
          title: 'Upper',
        }).setData(bollinger.upper);
        
        chart.addLineSeries({
          color: '#3b82f6',
          lineWidth: 1,
          title: 'Lower',
        }).setData(bollinger.lower);
        break;
      }
      
      case 'atr': {
        const atrData = calculateATR(ohlcData);
        chart.addLineSeries({
          color: '#f59e0b',
          lineWidth: 2,
          title: 'ATR',
        }).setData(atrData);
        break;
      }
    }

    // 響應式調整
    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);
    chart.timeScale().fitContent();

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [ohlcData, indicator, height]);

  const config = indicatorConfig[indicator];

  return (
    <div className="chart-container">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">
          {title || `${config.nameCn} (${config.name})`}
        </h3>
        <p className="text-sm text-[var(--text-muted)] mt-1">{config.description}</p>
      </div>
      
      <div ref={chartContainerRef} className="w-full" />
    </div>
  );
}

