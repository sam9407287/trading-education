'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
} from 'recharts';
import * as Slider from '@radix-ui/react-slider';
import { Play, Pause, RotateCcw, Settings2 } from 'lucide-react';
import type { CandleData, LineAnnotation, PointAnnotation, ZoneAnnotation } from '@/lib/patterns/dataGenerator';

interface PatternChartProps {
  candles: CandleData[];
  annotations?: {
    lines?: LineAnnotation[];
    points?: PointAnnotation[];
    zones?: ZoneAnnotation[];
  };
  breakoutIndex?: number;
  title?: string;
  autoPlay?: boolean;
  playSpeed?: number; // 毫秒/幀
}

// 自定義 K 線繪製組件
function CandlestickShape(props: any) {
  const { x, y, width, height, payload, dataKey } = props;
  
  if (!payload || !payload.open || !payload.close || !payload.high || !payload.low) {
    return null;
  }
  
  const isGreen = payload.close >= payload.open;
  const color = isGreen ? '#10b981' : '#ef4444';
  const bodyX = x - width / 2;
  const bodyWidth = width;
  
  // 計算 Y 座標（Recharts 提供的 Y 是基於數據值的）
  const maxPrice = Math.max(payload.high, payload.open, payload.close, payload.low);
  const minPrice = Math.min(payload.high, payload.open, payload.close, payload.low);
  
  return (
    <g>
      {/* 影線 */}
      <line
        x1={x}
        y1={y - ((payload.high - maxPrice) / (maxPrice - minPrice)) * height}
        x2={x}
        y2={y + height + ((minPrice - payload.low) / (maxPrice - minPrice)) * height}
        stroke={color}
        strokeWidth={1}
      />
      
      {/* K 線實體 */}
      <rect
        x={bodyX}
        y={y}
        width={bodyWidth}
        height={height || 1}
        fill={color}
        stroke={color}
        strokeWidth={1}
      />
    </g>
  );
}

// 自定義 Tooltip
function CustomTooltip({ active, payload }: any) {
  if (!active || !payload || !payload.length) return null;
  
  const data = payload[0].payload;
  const isGreen = data.close >= data.open;
  
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg p-3 shadow-xl">
      <p className="text-xs text-[var(--text-muted)] mb-2">{data.date}</p>
      <div className="space-y-1 text-xs">
        <div className="flex justify-between gap-4">
          <span className="text-[var(--text-muted)]">開:</span>
          <span className="text-[var(--text-primary)] font-mono">{data.open?.toFixed(2)}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-[var(--text-muted)]">高:</span>
          <span className="text-[var(--text-primary)] font-mono">{data.high?.toFixed(2)}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-[var(--text-muted)]">低:</span>
          <span className="text-[var(--text-primary)] font-mono">{data.low?.toFixed(2)}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-[var(--text-muted)]">收:</span>
          <span className={`font-mono font-semibold ${isGreen ? 'text-green-400' : 'text-red-400'}`}>
            {data.close?.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between gap-4 pt-1 border-t border-[var(--border-color)]">
          <span className="text-[var(--text-muted)]">量:</span>
          <span className="text-[var(--text-primary)] font-mono">{(data.volume / 1000000).toFixed(2)}M</span>
        </div>
      </div>
    </div>
  );
}

export default function PatternChart({
  candles,
  annotations = {},
  breakoutIndex,
  title,
  autoPlay = false,
  playSpeed = 150,
}: PatternChartProps) {
  const [visibleCount, setVisibleCount] = useState(autoPlay ? 10 : candles.length);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [highlightBreakout, setHighlightBreakout] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // 自動播放邏輯
  useEffect(() => {
    if (isPlaying && visibleCount < candles.length) {
      intervalRef.current = setInterval(() => {
        setVisibleCount(prev => {
          const next = prev + 1;
          if (next >= candles.length) {
            setIsPlaying(false);
            // 播放完成，顯示突破高亮
            if (breakoutIndex !== undefined) {
              setTimeout(() => setHighlightBreakout(true), 300);
            }
            return candles.length;
          }
          
          // 到達突破點時短暫暫停
          if (breakoutIndex !== undefined && next === breakoutIndex) {
            setTimeout(() => setHighlightBreakout(true), 200);
          }
          
          return next;
        });
      }, playSpeed);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, visibleCount, candles.length, breakoutIndex, playSpeed]);
  
  // 重置動畫
  const handleReset = () => {
    setIsPlaying(false);
    setVisibleCount(10);
    setHighlightBreakout(false);
  };
  
  // 處理滑桿拖動
  const handleSliderChange = (values: number[]) => {
    setIsPlaying(false);
    setVisibleCount(values[0]);
    setHighlightBreakout(breakoutIndex !== undefined && values[0] >= breakoutIndex);
  };
  
  // 計算當前可見數據
  const visibleData = useMemo(() => {
    return candles.slice(0, visibleCount).map((candle, index) => ({
      ...candle,
      index,
      // 計算 K 線實體的 Y 座標和高度（用於 Recharts）
      candleTop: Math.max(candle.open, candle.close),
      candleBottom: Math.min(candle.open, candle.close),
      candleHeight: Math.abs(candle.close - candle.open),
    }));
  }, [candles, visibleCount]);
  
  // 計算 Y 軸範圍
  const yDomain = useMemo(() => {
    if (visibleData.length === 0) return [0, 100];
    
    const allPrices = visibleData.flatMap(d => [d.high, d.low]);
    const min = Math.min(...allPrices);
    const max = Math.max(...allPrices);
    const padding = (max - min) * 0.1;
    
    return [min - padding, max + padding];
  }, [visibleData]);
  
  // 計算成交量最大值
  const maxVolume = useMemo(() => {
    if (visibleData.length === 0) return 1000000;
    return Math.max(...visibleData.map(d => d.volume));
  }, [visibleData]);
  
  // 處理標註線（只顯示在可見範圍內的）
  const visibleLines = useMemo(() => {
    if (!showAnnotations || !annotations.lines) return [];
    
    return annotations.lines.filter(line => {
      return line.points.every(p => p.x < visibleCount);
    });
  }, [annotations.lines, visibleCount, showAnnotations]);
  
  const visiblePoints = useMemo(() => {
    if (!showAnnotations || !annotations.points) return [];
    
    return annotations.points.filter(p => p.x < visibleCount);
  }, [annotations.points, visibleCount, showAnnotations]);
  
  return (
    <div className="space-y-4">
      {title && (
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">{title}</h3>
          
          {/* 控制按鈕 */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAnnotations(!showAnnotations)}
              className={`p-2 rounded-lg transition-colors ${
                showAnnotations
                  ? 'bg-[var(--accent-gold)]/20 text-[var(--accent-gold)]'
                  : 'bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
              title={showAnnotations ? '隱藏標註' : '顯示標註'}
            >
              <Settings2 className="w-4 h-4" />
            </button>
            
            <button
              onClick={handleReset}
              className="p-2 rounded-lg bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              title="重置"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              disabled={visibleCount >= candles.length}
              className="p-2 rounded-lg bg-[var(--accent-gold)] text-white hover:bg-[var(--accent-gold)]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title={isPlaying ? '暫停' : '播放'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
          </div>
        </div>
      )}
      
      {/* K 線圖 */}
      <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-color)] p-4">
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={visibleData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" opacity={0.3} />
            
            <XAxis
              dataKey="index"
              tickFormatter={(value) => {
                const candle = visibleData[value];
                return candle ? candle.date.slice(5) : '';
              }}
              stroke="var(--text-muted)"
              tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
              interval="preserveStartEnd"
            />
            
            <YAxis
              yAxisId="price"
              domain={yDomain}
              orientation="right"
              stroke="var(--text-muted)"
              tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
              tickFormatter={(value) => value.toFixed(0)}
            />
            
            <YAxis
              yAxisId="volume"
              orientation="left"
              stroke="var(--text-muted)"
              tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
              tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
              domain={[0, maxVolume * 4]}
            />
            
            <Tooltip content={<CustomTooltip />} />
            
            {/* 成交量柱狀圖 */}
            <Bar
              yAxisId="volume"
              dataKey="volume"
              fill="var(--text-muted)"
              opacity={0.3}
              radius={[2, 2, 0, 0]}
            />
            
            {/* 繪製區域標註 */}
            {showAnnotations && annotations.zones?.map((zone, i) => (
              <Area
                key={`zone-${i}`}
                yAxisId="price"
                type="monotone"
                dataKey={() => zone.yEnd}
                fill={zone.color}
                fillOpacity={zone.opacity}
                stroke="none"
                baseValue={zone.yStart}
              />
            ))}
            
            {/* 繪製標註線 */}
            {visibleLines.map((line, i) => {
              if (line.type === 'horizontal') {
                return (
                  <ReferenceLine
                    key={`line-${i}`}
                    yAxisId="price"
                    y={line.points[0].y}
                    stroke={line.color}
                    strokeDasharray={line.dashArray || '0'}
                    strokeWidth={2}
                    label={{
                      value: line.label,
                      position: 'insideTopRight',
                      fill: line.color,
                      fontSize: 11,
                    }}
                  />
                );
              }
              
              // 對角線用 Line 組件（簡化處理）
              return null;
            })}
            
            {/* K 線 - 使用高低價繪製 */}
            <Line
              yAxisId="price"
              type="monotone"
              dataKey="high"
              stroke="transparent"
              dot={false}
              isAnimationActive={false}
            />
            <Line
              yAxisId="price"
              type="monotone"
              dataKey="low"
              stroke="transparent"
              dot={false}
              isAnimationActive={false}
            />
            
            {/* 突破高亮 */}
            {highlightBreakout && breakoutIndex !== undefined && visibleCount > breakoutIndex && (
              <ReferenceLine
                yAxisId="price"
                x={breakoutIndex}
                stroke="#f59e0b"
                strokeWidth={3}
                strokeDasharray="5 5"
                label={{
                  value: '突破',
                  position: 'top',
                  fill: '#f59e0b',
                  fontSize: 12,
                  fontWeight: 'bold',
                }}
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
        
        {/* K 線實體疊加層（使用 SVG） */}
        <div className="relative -mt-[400px] pointer-events-none">
          <svg width="100%" height="400" className="overflow-visible">
            {visibleData.map((candle, index) => {
              const isGreen = candle.close >= candle.open;
              const color = isGreen ? '#10b981' : '#ef4444';
              
              // 簡化計算（實際需要與 Recharts 座標對齊）
              const chartWidth = typeof window !== 'undefined' ? window.innerWidth * 0.85 : 1000;
              const x = (index / visibleData.length) * chartWidth + 60;
              const barWidth = Math.max(2, chartWidth / visibleData.length * 0.6);
              
              return (
                <g key={index}>
                  {/* 影線 */}
                  <line
                    x1={x}
                    y1={10 + ((yDomain[1] - candle.high) / (yDomain[1] - yDomain[0])) * 380}
                    x2={x}
                    y2={10 + ((yDomain[1] - candle.low) / (yDomain[1] - yDomain[0])) * 380}
                    stroke={color}
                    strokeWidth={1}
                  />
                  
                  {/* K 線實體 */}
                  <rect
                    x={x - barWidth / 2}
                    y={10 + ((yDomain[1] - Math.max(candle.open, candle.close)) / (yDomain[1] - yDomain[0])) * 380}
                    width={barWidth}
                    height={Math.max(1, ((Math.abs(candle.close - candle.open)) / (yDomain[1] - yDomain[0])) * 380)}
                    fill={color}
                  />
                </g>
              );
            })}
            
            {/* 繪製標註點 */}
            {showAnnotations && visiblePoints.map((point, i) => {
              const chartWidth = typeof window !== 'undefined' ? window.innerWidth * 0.85 : 1000;
              const x = (point.x / visibleData.length) * chartWidth + 60;
              const y = 10 + ((yDomain[1] - point.y) / (yDomain[1] - yDomain[0])) * 380;
              
              return (
                <g key={`point-${i}`}>
                  <circle cx={x} cy={y} r={4} fill={point.color} stroke="white" strokeWidth={2} />
                  <text
                    x={x}
                    y={y - 10}
                    textAnchor="middle"
                    fill={point.color}
                    fontSize={11}
                    fontWeight="bold"
                  >
                    {point.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
      
      {/* 時間軸滑桿 */}
      <div className="flex items-center gap-4">
        <span className="text-xs text-[var(--text-muted)] w-16">
          {visibleCount} / {candles.length}
        </span>
        
        <Slider.Root
          className="relative flex items-center select-none touch-none flex-1 h-5"
          value={[visibleCount]}
          max={candles.length}
          min={10}
          step={1}
          onValueChange={handleSliderChange}
        >
          <Slider.Track className="bg-[var(--bg-secondary)] relative grow rounded-full h-1">
            <Slider.Range className="absolute bg-[var(--accent-gold)] rounded-full h-full" />
          </Slider.Track>
          <Slider.Thumb
            className="block w-4 h-4 bg-white border-2 border-[var(--accent-gold)] rounded-full hover:bg-[var(--accent-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-gold)] focus:ring-offset-2"
            aria-label="時間軸"
          />
        </Slider.Root>
        
        <span className="text-xs text-[var(--text-muted)]">
          {visibleData.length > 0 ? visibleData[visibleData.length - 1].date : ''}
        </span>
      </div>
      
      {/* 進度提示 */}
      {breakoutIndex !== undefined && visibleCount < breakoutIndex && (
        <div className="text-xs text-[var(--text-muted)] text-center">
          距離突破還有 {breakoutIndex - visibleCount} 根 K 線
        </div>
      )}
      
      {highlightBreakout && (
        <div className="text-xs text-[var(--accent-gold)] text-center font-semibold animate-pulse">
          ✨ 型態突破完成！
        </div>
      )}
    </div>
  );
}


