'use client';

import { useEffect, useRef } from 'react';
import { createChart, LineStyle } from 'lightweight-charts';

interface HeadAndShouldersChartProps {
  type: 'top' | 'bottom';
}

export default function HeadAndShouldersChart({ type }: HeadAndShouldersChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // 清理之前的圖表
    if (chartRef.current) {
      chartRef.current.remove();
    }

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 500,
      layout: {
        background: { color: 'transparent' },
        textColor: '#9ca3af',
      },
      grid: {
        vertLines: { color: '#374151' },
        horzLines: { color: '#374151' },
      },
      crosshair: {
        vertLine: {
          color: '#9ca3af',
          width: 1,
          style: LineStyle.Dotted,
          labelBackgroundColor: '#1f2937',
        },
        horzLine: {
          color: '#9ca3af',
          width: 1,
          style: LineStyle.Dotted,
          labelBackgroundColor: '#1f2937',
        },
      },
      rightPriceScale: {
        borderColor: '#374151',
      },
      timeScale: {
        borderColor: '#374151',
        timeVisible: true,
      },
    });

    chartRef.current = chart;

    // 創建 K 線序列（使用類型斷言繞過 TypeScript 錯誤）
    const candleSeries = (chart as any).addCandlestickSeries({
      upColor: '#10b981',
      downColor: '#ef4444',
      borderUpColor: '#10b981',
      borderDownColor: '#ef4444',
      wickUpColor: '#10b981',
      wickDownColor: '#ef4444',
    });

    if (type === 'top') {
      // 頭肩頂數據
      const data = [
        // 上升趨勢
        { time: '2024-01-02', open: 100, high: 102, low: 99, close: 101 },
        { time: '2024-01-03', open: 101, high: 104, low: 100, close: 103 },
        { time: '2024-01-04', open: 103, high: 106, low: 102, close: 105 },
        { time: '2024-01-05', open: 105, high: 108, low: 104, close: 107 },
        { time: '2024-01-08', open: 107, high: 110, low: 106, close: 109 },
        { time: '2024-01-09', open: 109, high: 112, low: 108, close: 111 },
        { time: '2024-01-10', open: 111, high: 114, low: 110, close: 113 },
        { time: '2024-01-11', open: 113, high: 116, low: 112, close: 115 },
        
        // 左肩形成
        { time: '2024-01-12', open: 115, high: 118, low: 114, close: 117 },
        { time: '2024-01-15', open: 117, high: 120, low: 116, close: 119 },
        { time: '2024-01-16', open: 119, high: 122, low: 118, close: 121 }, // 左肩峰
        { time: '2024-01-17', open: 121, high: 121, low: 117, close: 118 },
        { time: '2024-01-18', open: 118, high: 119, low: 115, close: 116 },
        { time: '2024-01-19', open: 116, high: 117, low: 113, close: 114 }, // 左肩低點（頸線附近）
        
        // 頭部形成
        { time: '2024-01-22', open: 114, high: 117, low: 113, close: 116 },
        { time: '2024-01-23', open: 116, high: 119, low: 115, close: 118 },
        { time: '2024-01-24', open: 118, high: 122, low: 117, close: 121 },
        { time: '2024-01-25', open: 121, high: 125, low: 120, close: 124 },
        { time: '2024-01-26', open: 124, high: 128, low: 123, close: 127 }, // 頭部峰（最高）
        { time: '2024-01-29', open: 127, high: 127, low: 123, close: 124 },
        { time: '2024-01-30', open: 124, high: 125, low: 120, close: 121 },
        { time: '2024-01-31', open: 121, high: 122, low: 117, close: 118 },
        { time: '2024-02-01', open: 118, high: 119, low: 114, close: 115 }, // 頭部低點（頸線附近）
        
        // 右肩形成
        { time: '2024-02-02', open: 115, high: 118, low: 114, close: 117 },
        { time: '2024-02-05', open: 117, high: 120, low: 116, close: 119 },
        { time: '2024-02-06', open: 119, high: 122, low: 118, close: 121 }, // 右肩峰
        { time: '2024-02-07', open: 121, high: 121, low: 117, close: 118 },
        { time: '2024-02-08', open: 118, high: 119, low: 115, close: 116 },
        { time: '2024-02-09', open: 116, high: 117, low: 113, close: 114 },
        
        // 跌破頸線（入場點1 - 大陰線放量）
        { time: '2024-02-12', open: 114, high: 114, low: 109, close: 110 }, // ⬇️ 入場點1
        { time: '2024-02-13', open: 110, high: 111, low: 107, close: 108 },
        { time: '2024-02-14', open: 108, high: 109, low: 105, close: 106 },
        
        // 回踩頸線（入場點2 - 被阻力擋住）
        { time: '2024-02-15', open: 106, high: 109, low: 105, close: 108 },
        { time: '2024-02-16', open: 108, high: 113, low: 107, close: 112 }, // 回踩頸線
        { time: '2024-02-19', open: 112, high: 114, low: 110, close: 111 }, // ⬇️ 入場點2：被頸線擋住
        { time: '2024-02-20', open: 111, high: 112, low: 108, close: 109 },
        
        // 繼續下跌
        { time: '2024-02-21', open: 109, high: 110, low: 105, close: 106 },
        { time: '2024-02-22', open: 106, high: 107, low: 102, close: 103 },
        { time: '2024-02-23', open: 103, high: 104, low: 99, close: 100 },
        { time: '2024-02-26', open: 100, high: 101, low: 96, close: 97 },
        { time: '2024-02-27', open: 97, high: 98, low: 93, close: 94 },
        { time: '2024-02-28', open: 94, high: 95, low: 90, close: 91 },
        { time: '2024-02-29', open: 91, high: 92, low: 87, close: 88 },
      ];

      candleSeries.setData(data);

      // 頸線（連接左肩和頭部的低點）
      const necklineSeries = (chart as any).addLineSeries({
        color: '#ef4444',
        lineWidth: 2,
        lineStyle: LineStyle.Dashed,
        title: '頸線 (Neckline)',
        priceLineVisible: false,
        lastValueVisible: false,
      });
      
      necklineSeries.setData([
        { time: '2024-01-19', value: 114 },
        { time: '2024-02-29', value: 114 },
      ]);

      // 添加標記
      const markers = [
        {
          time: '2024-01-16' as any,
          position: 'aboveBar' as const,
          color: '#3b82f6',
          shape: 'circle' as const,
          text: '左肩',
        },
        {
          time: '2024-01-26' as any,
          position: 'aboveBar' as const,
          color: '#8b5cf6',
          shape: 'circle' as const,
          text: '頭部',
        },
        {
          time: '2024-02-06' as any,
          position: 'aboveBar' as const,
          color: '#3b82f6',
          shape: 'circle' as const,
          text: '右肩',
        },
        {
          time: '2024-02-12' as any,
          position: 'belowBar' as const,
          color: '#f59e0b',
          shape: 'arrowDown' as const,
          text: '入場點1: 跌破頸線',
        },
        {
          time: '2024-02-19' as any,
          position: 'aboveBar' as const,
          color: '#f59e0b',
          shape: 'arrowDown' as const,
          text: '入場點2: 回踩被擋',
        },
      ];

      candleSeries.setMarkers(markers);

    } else {
      // 頭肩底數據（鏡像）
      const data = [
        // 下降趨勢
        { time: '2024-01-02', open: 100, high: 101, low: 98, close: 99 },
        { time: '2024-01-03', open: 99, high: 100, low: 96, close: 97 },
        { time: '2024-01-04', open: 97, high: 98, low: 94, close: 95 },
        { time: '2024-01-05', open: 95, high: 96, low: 92, close: 93 },
        { time: '2024-01-08', open: 93, high: 94, low: 90, close: 91 },
        { time: '2024-01-09', open: 91, high: 92, low: 88, close: 89 },
        { time: '2024-01-10', open: 89, high: 90, low: 86, close: 87 },
        { time: '2024-01-11', open: 87, high: 88, low: 84, close: 85 },
        
        // 左肩形成
        { time: '2024-01-12', open: 85, high: 86, low: 82, close: 83 },
        { time: '2024-01-15', open: 83, high: 84, low: 80, close: 81 },
        { time: '2024-01-16', open: 81, high: 82, low: 78, close: 79 }, // 左肩底
        { time: '2024-01-17', open: 79, high: 82, low: 79, close: 81 },
        { time: '2024-01-18', open: 81, high: 84, low: 80, close: 83 },
        { time: '2024-01-19', open: 83, high: 86, low: 82, close: 85 }, // 左肩高點（頸線附近）
        
        // 頭部形成
        { time: '2024-01-22', open: 85, high: 86, low: 83, close: 84 },
        { time: '2024-01-23', open: 84, high: 85, low: 81, close: 82 },
        { time: '2024-01-24', open: 82, high: 83, low: 78, close: 79 },
        { time: '2024-01-25', open: 79, high: 80, low: 75, close: 76 },
        { time: '2024-01-26', open: 76, high: 77, low: 72, close: 73 }, // 頭部底（最低）
        { time: '2024-01-29', open: 73, high: 76, low: 73, close: 75 },
        { time: '2024-01-30', open: 75, high: 79, low: 74, close: 78 },
        { time: '2024-01-31', open: 78, high: 82, low: 77, close: 81 },
        { time: '2024-02-01', open: 81, high: 85, low: 80, close: 84 }, // 頭部高點（頸線附近）
        
        // 右肩形成
        { time: '2024-02-02', open: 84, high: 85, low: 82, close: 83 },
        { time: '2024-02-05', open: 83, high: 84, low: 80, close: 81 },
        { time: '2024-02-06', open: 81, high: 82, low: 78, close: 79 }, // 右肩底
        { time: '2024-02-07', open: 79, high: 82, low: 79, close: 81 },
        { time: '2024-02-08', open: 81, high: 84, low: 80, close: 83 },
        { time: '2024-02-09', open: 83, high: 86, low: 82, close: 85 },
        
        // 突破頸線（入場點1 - 大陽線放量）
        { time: '2024-02-12', open: 85, high: 90, low: 85, close: 89 }, // ⬆️ 入場點1
        { time: '2024-02-13', open: 89, high: 92, low: 88, close: 91 },
        { time: '2024-02-14', open: 91, high: 94, low: 90, close: 93 },
        
        // 回踩頸線（入場點2 - 獲得支撐）
        { time: '2024-02-15', open: 93, high: 94, low: 90, close: 91 },
        { time: '2024-02-16', open: 91, high: 92, low: 86, close: 87 }, // 回踩頸線
        { time: '2024-02-19', open: 87, high: 88, low: 85, close: 88 }, // ⬆️ 入場點2：獲得支撐
        { time: '2024-02-20', open: 88, high: 91, low: 87, close: 90 },
        
        // 繼續上漲
        { time: '2024-02-21', open: 90, high: 94, low: 89, close: 93 },
        { time: '2024-02-22', open: 93, high: 97, low: 92, close: 96 },
        { time: '2024-02-23', open: 96, high: 100, low: 95, close: 99 },
        { time: '2024-02-26', open: 99, high: 103, low: 98, close: 102 },
        { time: '2024-02-27', open: 102, high: 106, low: 101, close: 105 },
        { time: '2024-02-28', open: 105, high: 109, low: 104, close: 108 },
        { time: '2024-02-29', open: 108, high: 112, low: 107, close: 111 },
      ];

      candleSeries.setData(data);

      // 頸線
      const necklineSeries = (chart as any).addLineSeries({
        color: '#10b981',
        lineWidth: 2,
        lineStyle: LineStyle.Dashed,
        title: '頸線 (Neckline)',
        priceLineVisible: false,
        lastValueVisible: false,
      });
      
      necklineSeries.setData([
        { time: '2024-01-19', value: 85 },
        { time: '2024-02-29', value: 85 },
      ]);

      // 添加標記
      const markers = [
        {
          time: '2024-01-16' as any,
          position: 'belowBar' as const,
          color: '#3b82f6',
          shape: 'circle' as const,
          text: '左肩',
        },
        {
          time: '2024-01-26' as any,
          position: 'belowBar' as const,
          color: '#8b5cf6',
          shape: 'circle' as const,
          text: '頭部',
        },
        {
          time: '2024-02-06' as any,
          position: 'belowBar' as const,
          color: '#3b82f6',
          shape: 'circle' as const,
          text: '右肩',
        },
        {
          time: '2024-02-12' as any,
          position: 'aboveBar' as const,
          color: '#f59e0b',
          shape: 'arrowUp' as const,
          text: '入場點1: 突破頸線',
        },
        {
          time: '2024-02-19' as any,
          position: 'belowBar' as const,
          color: '#f59e0b',
          shape: 'arrowUp' as const,
          text: '入場點2: 回踩確認',
        },
      ];

      candleSeries.setMarkers(markers);
    }

    // 響應式處理
    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({ 
          width: chartContainerRef.current.clientWidth 
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, [type]);

  return (
    <div className="relative">
      <div ref={chartContainerRef} className="w-full" />
      
      {/* 圖例 */}
      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-[#ef4444] opacity-50"></div>
          <span className="text-[var(--text-muted)]">頸線</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#3b82f6]"></div>
          <span className="text-[var(--text-muted)]">肩部</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#8b5cf6]"></div>
          <span className="text-[var(--text-muted)]">頭部</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#f59e0b] text-lg">⬇</span>
          <span className="text-[var(--text-muted)]">入場點</span>
        </div>
      </div>
    </div>
  );
}
