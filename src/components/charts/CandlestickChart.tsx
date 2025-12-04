'use client';

import { useEffect, useRef, useState } from 'react';
import { createChart, IChartApi, ISeriesApi, CandlestickData, Time, LineStyle, CandlestickSeriesPartialOptions } from 'lightweight-charts';

interface CandlestickChartProps {
  data?: CandlestickData<Time>[];
  height?: number;
  showVolume?: boolean;
  showMA?: boolean;
  maPeriods?: number[];
  title?: string;
}

// 生成示例數據
function generateSampleData(days: number = 100): CandlestickData<Time>[] {
  const data: CandlestickData<Time>[] = [];
  let basePrice = 100;
  const now = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0] as Time;
    
    const volatility = 0.02;
    const drift = 0.0002;
    
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

// 計算移動平均線
function calculateMA(data: CandlestickData<Time>[], period: number): { time: Time; value: number }[] {
  const result: { time: Time; value: number }[] = [];
  
  for (let i = period - 1; i < data.length; i++) {
    let sum = 0;
    for (let j = 0; j < period; j++) {
      sum += data[i - j].close;
    }
    result.push({
      time: data[i].time,
      value: Math.round((sum / period) * 100) / 100,
    });
  }
  
  return result;
}

const MA_COLORS = ['#f59e0b', '#3b82f6', '#10b981', '#8b5cf6'];

export default function CandlestickChart({
  data,
  height = 400,
  showVolume = false,
  showMA = true,
  maPeriods = [5, 20],
  title,
}: CandlestickChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candlestickSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const [chartData] = useState<CandlestickData<Time>[]>(() => data || generateSampleData(100));

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // 創建圖表
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
          labelBackgroundColor: '#f59e0b',
        },
        horzLine: {
          color: '#f59e0b',
          width: 1,
          style: LineStyle.Dashed,
          labelBackgroundColor: '#f59e0b',
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

    // 添加 K 線系列
    const candlestickSeries = (chart as any).addCandlestickSeries({
      upColor: '#10b981',
      downColor: '#ef4444',
      borderUpColor: '#10b981',
      borderDownColor: '#ef4444',
      wickUpColor: '#10b981',
      wickDownColor: '#ef4444',
    });

    candlestickSeries.setData(chartData);
    candlestickSeriesRef.current = candlestickSeries;

    // 添加移動平均線
    if (showMA && maPeriods.length > 0) {
      maPeriods.forEach((period, index) => {
        const maData = calculateMA(chartData, period);
        const maSeries = (chart as any).addLineSeries({
          color: MA_COLORS[index % MA_COLORS.length],
          lineWidth: 1,
          title: `MA${period}`,
        });
        maSeries.setData(maData);
      });
    }

    // 自適應大小
    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    // 自動適應內容
    chart.timeScale().fitContent();

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [chartData, height, showMA, maPeriods, showVolume]);

  return (
    <div className="chart-container">
      {title && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">{title}</h3>
        </div>
      )}
      
      {/* Legend */}
      {showMA && maPeriods.length > 0 && (
        <div className="flex flex-wrap gap-4 mb-4 text-xs">
          {maPeriods.map((period, index) => (
            <div key={period} className="flex items-center gap-2">
              <div
                className="w-4 h-0.5"
                style={{ backgroundColor: MA_COLORS[index % MA_COLORS.length] }}
              ></div>
              <span className="text-[var(--text-muted)]">MA{period}</span>
            </div>
          ))}
        </div>
      )}
      
      <div ref={chartContainerRef} className="w-full" />
      
      {/* Chart Info */}
      <div className="mt-4 flex flex-wrap gap-4 text-xs text-[var(--text-muted)]">
        <span>滑鼠移動查看詳情</span>
        <span>滾輪縮放</span>
        <span>拖拽移動</span>
      </div>
    </div>
  );
}

