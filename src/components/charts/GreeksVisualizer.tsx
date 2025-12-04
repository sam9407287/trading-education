'use client';

import { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
} from 'recharts';
import * as Slider from '@radix-ui/react-slider';
import { Settings2, Eye } from 'lucide-react';
import { calculateGreeks, blackScholes, BlackScholesParams } from '@/lib/options/calculations';

type GreekType = 'delta' | 'gamma' | 'theta' | 'vega' | 'rho';

interface GreeksVisualizerProps {
  defaultStrike?: number;
  defaultDaysToExpiry?: number;
  defaultIV?: number;
  defaultRate?: number;
  interactive?: boolean;
}

// 生成 Greek 曲線數據
function generateGreekData(
  strike: number,
  daysToExpiry: number,
  iv: number,
  rate: number,
  greekType: GreekType
): { price: number; call: number; put: number }[] {
  const T = daysToExpiry / 365;
  const data: { price: number; call: number; put: number }[] = [];

  for (let price = strike * 0.7; price <= strike * 1.3; price += strike * 0.02) {
    const params: BlackScholesParams = {
      S: price,
      K: strike,
      T,
      r: rate,
      sigma: iv,
    };

    const callGreeks = calculateGreeks(params, 'call');
    const putGreeks = calculateGreeks(params, 'put');

    data.push({
      price: Math.round(price * 100) / 100,
      call: Math.round(callGreeks[greekType] * 10000) / 10000,
      put: Math.round(putGreeks[greekType] * 10000) / 10000,
    });
  }

  return data;
}

// 生成多時間維度的 Greek 數據（用於展示時間衰減）
function generateGreekOverTime(
  stockPrice: number,
  strike: number,
  iv: number,
  rate: number,
  greekType: GreekType,
  optionType: 'call' | 'put'
): { days: number; value: number }[] {
  const data: { days: number; value: number }[] = [];

  for (let days = 60; days >= 1; days -= 2) {
    const T = days / 365;
    const params: BlackScholesParams = {
      S: stockPrice,
      K: strike,
      T,
      r: rate,
      sigma: iv,
    };

    const greeks = calculateGreeks(params, optionType);
    data.push({
      days,
      value: Math.round(greeks[greekType] * 10000) / 10000,
    });
  }

  return data.reverse();
}

const greekInfo: Record<GreekType, { name: string; nameCn: string; description: string; unit: string }> = {
  delta: {
    name: 'Delta (Δ)',
    nameCn: '德爾塔',
    description: '期權價格對標的價格變化的敏感度。Call Delta 為 0 到 1，Put Delta 為 -1 到 0。',
    unit: '',
  },
  gamma: {
    name: 'Gamma (Γ)',
    nameCn: '伽馬',
    description: 'Delta 對標的價格變化的敏感度。ATM 期權的 Gamma 最大。',
    unit: '',
  },
  theta: {
    name: 'Theta (Θ)',
    nameCn: '西塔',
    description: '每日時間衰減。負值表示期權每天損失的價值。',
    unit: '每日',
  },
  vega: {
    name: 'Vega (ν)',
    nameCn: '維加',
    description: '期權價格對波動率變化的敏感度。IV 每變化 1%，期權價格變化的金額。',
    unit: '每 1% IV',
  },
  rho: {
    name: 'Rho (ρ)',
    nameCn: '柔',
    description: '期權價格對利率變化的敏感度。通常影響較小。',
    unit: '每 1% 利率',
  },
};

export default function GreeksVisualizer({
  defaultStrike = 100,
  defaultDaysToExpiry = 30,
  defaultIV = 0.25,
  defaultRate = 0.05,
  interactive = true,
}: GreeksVisualizerProps) {
  const [isInteractive, setIsInteractive] = useState(false);
  const [selectedGreek, setSelectedGreek] = useState<GreekType>('delta');
  const [strike, setStrike] = useState(defaultStrike);
  const [daysToExpiry, setDaysToExpiry] = useState(defaultDaysToExpiry);
  const [iv, setIV] = useState(defaultIV);
  const [rate, setRate] = useState(defaultRate);
  const [viewMode, setViewMode] = useState<'price' | 'time'>('price');

  // 計算當前參數下的期權價格
  const prices = useMemo(() => {
    const params: BlackScholesParams = {
      S: strike,
      K: strike,
      T: daysToExpiry / 365,
      r: rate,
      sigma: iv,
    };
    return blackScholes(params);
  }, [strike, daysToExpiry, iv, rate]);

  // 生成圖表數據
  const chartData = useMemo(() => {
    if (viewMode === 'price') {
      return generateGreekData(strike, daysToExpiry, iv, rate, selectedGreek);
    } else {
      return generateGreekOverTime(strike, strike, iv, rate, selectedGreek, 'call');
    }
  }, [strike, daysToExpiry, iv, rate, selectedGreek, viewMode]);

  // 自定義 Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg p-3 shadow-xl">
          {viewMode === 'price' ? (
            <>
              <p className="text-sm text-[var(--text-muted)]">
                股價: <span className="text-[var(--text-primary)] font-medium">${d.price}</span>
              </p>
              <p className="text-sm text-[var(--accent-green)]">
                Call {greekInfo[selectedGreek].name}: <span className="font-medium">{d.call}</span>
              </p>
              <p className="text-sm text-[var(--accent-red)]">
                Put {greekInfo[selectedGreek].name}: <span className="font-medium">{d.put}</span>
              </p>
            </>
          ) : (
            <>
              <p className="text-sm text-[var(--text-muted)]">
                到期天數: <span className="text-[var(--text-primary)] font-medium">{d.days} 天</span>
              </p>
              <p className="text-sm text-[var(--accent-gold)]">
                {greekInfo[selectedGreek].name}: <span className="font-medium">{d.value}</span>
              </p>
            </>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-container">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
            希臘字母視覺化
          </h3>
          <p className="text-sm text-[var(--text-muted)]">The Greeks Visualizer</p>
        </div>

        {interactive && (
          <button
            onClick={() => setIsInteractive(!isInteractive)}
            className={`mode-toggle ${isInteractive ? 'active' : ''}`}
          >
            {isInteractive ? (
              <>
                <Settings2 className="w-4 h-4" />
                互動模式
              </>
            ) : (
              <>
                <Eye className="w-4 h-4" />
                觀看模式
              </>
            )}
          </button>
        )}
      </div>

      {/* Greek Selection */}
      <div className="flex flex-wrap gap-2 mb-4">
        {(Object.keys(greekInfo) as GreekType[]).map((greek) => (
          <button
            key={greek}
            onClick={() => setSelectedGreek(greek)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              selectedGreek === greek
                ? 'bg-[var(--accent-gold)] text-[var(--bg-primary)]'
                : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            {greekInfo[greek].name}
          </button>
        ))}
      </div>

      {/* Greek Info */}
      <div className="bg-[var(--bg-secondary)] rounded-lg p-4 mb-6">
        <h4 className="font-medium text-[var(--text-primary)] mb-1">
          {greekInfo[selectedGreek].name} ({greekInfo[selectedGreek].nameCn})
        </h4>
        <p className="text-sm text-[var(--text-secondary)]">
          {greekInfo[selectedGreek].description}
        </p>
      </div>

      {/* View Mode Toggle */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setViewMode('price')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            viewMode === 'price'
              ? 'bg-[var(--accent-blue)] text-white'
              : 'bg-[var(--bg-secondary)] text-[var(--text-muted)]'
          }`}
        >
          vs 股價
        </button>
        <button
          onClick={() => setViewMode('time')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            viewMode === 'time'
              ? 'bg-[var(--accent-blue)] text-white'
              : 'bg-[var(--bg-secondary)] text-[var(--text-muted)]'
          }`}
        >
          vs 時間
        </button>
      </div>

      {/* Current Values */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="bg-[var(--bg-secondary)] rounded-lg p-3">
          <div className="text-xs text-[var(--text-muted)]">行權價</div>
          <div className="text-sm font-medium text-[var(--text-primary)]">${strike}</div>
        </div>
        <div className="bg-[var(--bg-secondary)] rounded-lg p-3">
          <div className="text-xs text-[var(--text-muted)]">到期天數</div>
          <div className="text-sm font-medium text-[var(--text-primary)]">{daysToExpiry} 天</div>
        </div>
        <div className="bg-[var(--bg-secondary)] rounded-lg p-3">
          <div className="text-xs text-[var(--text-muted)]">隱含波動率</div>
          <div className="text-sm font-medium text-[var(--text-primary)]">{(iv * 100).toFixed(0)}%</div>
        </div>
        <div className="bg-[var(--bg-secondary)] rounded-lg p-3">
          <div className="text-xs text-[var(--text-muted)]">ATM 期權價</div>
          <div className="text-sm font-medium text-[var(--accent-gold)]">
            C: ${prices.call.toFixed(2)} / P: ${prices.put.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[300px] sm:h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
            
            <XAxis
              dataKey={viewMode === 'price' ? 'price' : 'days'}
              stroke="var(--text-muted)"
              tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
              tickFormatter={(value) => viewMode === 'price' ? `$${value}` : `${value}d`}
            />
            
            <YAxis
              stroke="var(--text-muted)"
              tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
            />
            
            <Tooltip content={<CustomTooltip />} />
            
            {viewMode === 'price' && <Legend />}

            {/* Reference line at strike price */}
            {viewMode === 'price' && (
              <ReferenceLine
                x={strike}
                stroke="var(--accent-gold)"
                strokeDasharray="3 3"
                label={{ value: 'ATM', position: 'top', fill: 'var(--accent-gold)', fontSize: 10 }}
              />
            )}

            {/* Zero line for Delta/Theta */}
            {(selectedGreek === 'delta' || selectedGreek === 'theta') && (
              <ReferenceLine y={0} stroke="var(--text-muted)" strokeDasharray="5 5" />
            )}

            {viewMode === 'price' ? (
              <>
                <Line
                  type="monotone"
                  dataKey="call"
                  stroke="var(--accent-green)"
                  strokeWidth={2}
                  dot={false}
                  name="Call"
                />
                <Line
                  type="monotone"
                  dataKey="put"
                  stroke="var(--accent-red)"
                  strokeWidth={2}
                  dot={false}
                  name="Put"
                />
              </>
            ) : (
              <Line
                type="monotone"
                dataKey="value"
                stroke="var(--accent-gold)"
                strokeWidth={2}
                dot={false}
                name={greekInfo[selectedGreek].name}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Interactive Controls */}
      {isInteractive && (
        <div className="mt-6 pt-6 border-t border-[var(--border-color)]">
          <h4 className="text-sm font-medium text-[var(--text-primary)] mb-4">參數調整</h4>
          
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Strike */}
            <div>
              <div className="flex justify-between text-xs text-[var(--text-muted)] mb-2">
                <span>行權價 (Strike)</span>
                <span className="text-[var(--text-primary)]">${strike}</span>
              </div>
              <Slider.Root
                className="slider-root"
                value={[strike]}
                onValueChange={([value]) => setStrike(value)}
                min={50}
                max={200}
                step={5}
              >
                <Slider.Track className="slider-track">
                  <Slider.Range className="slider-range" />
                </Slider.Track>
                <Slider.Thumb className="slider-thumb" />
              </Slider.Root>
            </div>

            {/* Days to Expiry */}
            <div>
              <div className="flex justify-between text-xs text-[var(--text-muted)] mb-2">
                <span>到期天數 (DTE)</span>
                <span className="text-[var(--text-primary)]">{daysToExpiry} 天</span>
              </div>
              <Slider.Root
                className="slider-root"
                value={[daysToExpiry]}
                onValueChange={([value]) => setDaysToExpiry(value)}
                min={1}
                max={365}
                step={1}
              >
                <Slider.Track className="slider-track">
                  <Slider.Range className="slider-range" />
                </Slider.Track>
                <Slider.Thumb className="slider-thumb" />
              </Slider.Root>
            </div>

            {/* IV */}
            <div>
              <div className="flex justify-between text-xs text-[var(--text-muted)] mb-2">
                <span>隱含波動率 (IV)</span>
                <span className="text-[var(--text-primary)]">{(iv * 100).toFixed(0)}%</span>
              </div>
              <Slider.Root
                className="slider-root"
                value={[iv * 100]}
                onValueChange={([value]) => setIV(value / 100)}
                min={5}
                max={100}
                step={1}
              >
                <Slider.Track className="slider-track">
                  <Slider.Range className="slider-range" />
                </Slider.Track>
                <Slider.Thumb className="slider-thumb" />
              </Slider.Root>
            </div>

            {/* Rate */}
            <div>
              <div className="flex justify-between text-xs text-[var(--text-muted)] mb-2">
                <span>無風險利率</span>
                <span className="text-[var(--text-primary)]">{(rate * 100).toFixed(1)}%</span>
              </div>
              <Slider.Root
                className="slider-root"
                value={[rate * 100]}
                onValueChange={([value]) => setRate(value / 100)}
                min={0}
                max={10}
                step={0.1}
              >
                <Slider.Track className="slider-track">
                  <Slider.Range className="slider-range" />
                </Slider.Track>
                <Slider.Thumb className="slider-thumb" />
              </Slider.Root>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

