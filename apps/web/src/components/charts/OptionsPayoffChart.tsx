'use client';

import { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Area,
  ComposedChart,
} from 'recharts';
import * as Slider from '@radix-ui/react-slider';
import { Settings2, Eye } from 'lucide-react';
import { generatePayoffData, calculateKeyPrices, StrategyLeg } from '@/lib/options/calculations';

interface OptionsPayoffChartProps {
  legs: StrategyLeg[];
  title?: string;
  description?: string;
  centerPrice?: number;
  interactive?: boolean;
  showStock?: boolean; // 是否顯示股票持倉線（用於 Covered Call 等）
}

export default function OptionsPayoffChart({
  legs: initialLegs,
  title,
  description,
  centerPrice = 100,
  interactive = true,
  showStock = false,
}: OptionsPayoffChartProps) {
  const [isInteractive, setIsInteractive] = useState(false);
  const [legs, setLegs] = useState<StrategyLeg[]>(initialLegs);
  const [stockPosition, setStockPosition] = useState<'none' | 'long' | 'short'>('none');

  // 計算損益數據
  const data = useMemo(() => {
    const optionData = generatePayoffData(legs, centerPrice, 0.25, 150);
    
    // 如果有股票持倉，加入股票損益
    if (stockPosition !== 'none' || showStock) {
      const position = stockPosition !== 'none' ? stockPosition : 'long';
      return optionData.map((d) => {
        const stockPayoff = position === 'long' 
          ? (d.price - centerPrice) * 100 
          : (centerPrice - d.price) * 100;
        return {
          ...d,
          stockPayoff,
          totalPayoff: d.payoff + stockPayoff,
        };
      });
    }
    
    return optionData;
  }, [legs, centerPrice, stockPosition, showStock]);

  // 計算關鍵價位
  const keyPrices = useMemo(() => calculateKeyPrices(legs), [legs]);

  // 更新某個 leg 的行權價
  const updateStrike = (index: number, newStrike: number) => {
    setLegs((prev) =>
      prev.map((leg, i) => (i === index ? { ...leg, strike: newStrike } : leg))
    );
  };

  // 更新某個 leg 的權利金
  const updatePremium = (index: number, newPremium: number) => {
    setLegs((prev) =>
      prev.map((leg, i) => (i === index ? { ...leg, premium: newPremium } : leg))
    );
  };

  // 自定義 Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg p-3 shadow-xl">
          <p className="text-sm text-[var(--text-muted)]">
            股價: <span className="text-[var(--text-primary)] font-medium">${d.price}</span>
          </p>
          <p className={`text-sm ${d.payoff >= 0 ? 'text-[var(--profit)]' : 'text-[var(--loss)]'}`}>
            期權損益: <span className="font-medium">${d.payoff.toFixed(0)}</span>
          </p>
          {d.totalPayoff !== undefined && (
            <p className={`text-sm ${d.totalPayoff >= 0 ? 'text-[var(--profit)]' : 'text-[var(--loss)]'}`}>
              總損益: <span className="font-medium">${d.totalPayoff.toFixed(0)}</span>
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-container">
      {/* 標題區域 */}
      <div className="flex items-start justify-between mb-4">
        <div>
          {title && (
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">{title}</h3>
          )}
          {description && (
            <p className="text-sm text-[var(--text-muted)] mt-1">{description}</p>
          )}
        </div>

        {/* 模式切換 */}
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

      {/* 關鍵數據 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="bg-[var(--bg-secondary)] rounded-lg p-3 overflow-hidden">
          <div className="text-xs text-[var(--text-muted)]">行權價</div>
          <div className="text-sm font-medium text-[var(--text-primary)] truncate">
            {keyPrices.strikes.map((s) => `$${s}`).join(', ')}
          </div>
        </div>
        <div className="bg-[var(--bg-secondary)] rounded-lg p-3 overflow-hidden">
          <div className="text-xs text-[var(--text-muted)]">損益平衡</div>
          <div className="text-sm font-medium text-[var(--breakeven)] truncate">
            {keyPrices.breakevens.length > 0 
              ? keyPrices.breakevens.map((b) => `$${Number(b).toFixed(2)}`).join(', ') 
              : 'N/A'}
          </div>
        </div>
        <div className="bg-[var(--bg-secondary)] rounded-lg p-3 overflow-hidden">
          <div className="text-xs text-[var(--text-muted)]">最大獲利</div>
          <div className="text-sm font-medium text-[var(--profit)] truncate">
            {keyPrices.maxProfit === 'unlimited' 
              ? '無限' 
              : `$${Number(keyPrices.maxProfit).toFixed(0)}`}
          </div>
        </div>
        <div className="bg-[var(--bg-secondary)] rounded-lg p-3 overflow-hidden">
          <div className="text-xs text-[var(--text-muted)]">最大虧損</div>
          <div className="text-sm font-medium text-[var(--loss)] truncate">
            {keyPrices.maxLoss === 'unlimited' 
              ? '無限' 
              : `$${Number(keyPrices.maxLoss).toFixed(0)}`}
          </div>
        </div>
      </div>

      {/* 圖表 */}
      <div className="h-[300px] sm:h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--profit)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="var(--profit)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="lossGradient" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="var(--loss)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="var(--loss)" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border-color)"
              vertical={false}
            />

            <XAxis
              dataKey="price"
              stroke="var(--text-muted)"
              tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
              tickFormatter={(value) => `$${value}`}
            />

            <YAxis
              stroke="var(--text-muted)"
              tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
              tickFormatter={(value) => `$${value}`}
            />

            <Tooltip content={<CustomTooltip />} />

            {/* 零線 */}
            <ReferenceLine y={0} stroke="var(--text-muted)" strokeDasharray="5 5" />

            {/* 行權價參考線 */}
            {keyPrices.strikes.map((strike, i) => (
              <ReferenceLine
                key={`strike-${i}`}
                x={strike}
                stroke="var(--accent-gold)"
                strokeDasharray="3 3"
                label={{
                  value: `K=$${strike}`,
                  position: 'top',
                  fill: 'var(--accent-gold)',
                  fontSize: 10,
                }}
              />
            ))}

            {/* 損益平衡點 */}
            {keyPrices.breakevens.map((be, i) => (
              <ReferenceLine
                key={`be-${i}`}
                x={be}
                stroke="var(--breakeven)"
                strokeDasharray="2 2"
              />
            ))}

            {/* 股票持倉線 */}
            {(stockPosition !== 'none' || showStock) && (
              <Line
                type="linear"
                dataKey="stockPayoff"
                stroke="var(--accent-blue)"
                strokeWidth={1}
                strokeDasharray="5 5"
                dot={false}
                name="股票"
              />
            )}

            {/* 總損益（如有股票） */}
            {(stockPosition !== 'none' || showStock) && (
              <Line
                type="linear"
                dataKey="totalPayoff"
                stroke="var(--accent-purple)"
                strokeWidth={2}
                dot={false}
                name="總損益"
              />
            )}

            {/* 期權損益線 */}
            <Line
              type="linear"
              dataKey="payoff"
              stroke="var(--accent-gold)"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 6, fill: 'var(--accent-gold)' }}
              name="期權損益"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* 互動控制面板 */}
      {isInteractive && (
        <div className="mt-6 pt-6 border-t border-[var(--border-color)]">
          <h4 className="text-sm font-medium text-[var(--text-primary)] mb-4">
            參數調整
          </h4>

          <div className="space-y-6">
            {legs.map((leg, index) => (
              <div key={index} className="bg-[var(--bg-secondary)] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-medium ${
                      leg.position === 'long'
                        ? 'bg-[var(--profit)]/20 text-[var(--profit)]'
                        : 'bg-[var(--loss)]/20 text-[var(--loss)]'
                    }`}
                  >
                    {leg.position === 'long' ? '買入' : '賣出'}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-medium ${
                      leg.type === 'call'
                        ? 'bg-[var(--accent-blue)]/20 text-[var(--accent-blue)]'
                        : 'bg-[var(--accent-purple)]/20 text-[var(--accent-purple)]'
                    }`}
                  >
                    {leg.type === 'call' ? 'Call' : 'Put'}
                  </span>
                </div>

                {/* 行權價滑桿 */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-[var(--text-muted)] mb-2">
                    <span>行權價 (Strike)</span>
                    <span className="text-[var(--text-primary)]">${leg.strike}</span>
                  </div>
                  <Slider.Root
                    className="slider-root"
                    value={[leg.strike]}
                    onValueChange={([value]) => updateStrike(index, value)}
                    min={centerPrice * 0.7}
                    max={centerPrice * 1.3}
                    step={1}
                  >
                    <Slider.Track className="slider-track">
                      <Slider.Range className="slider-range" />
                    </Slider.Track>
                    <Slider.Thumb className="slider-thumb" />
                  </Slider.Root>
                </div>

                {/* 權利金滑桿 */}
                <div>
                  <div className="flex justify-between text-xs text-[var(--text-muted)] mb-2">
                    <span>權利金 (Premium)</span>
                    <span className="text-[var(--text-primary)]">${leg.premium.toFixed(2)}</span>
                  </div>
                  <Slider.Root
                    className="slider-root"
                    value={[leg.premium]}
                    onValueChange={([value]) => updatePremium(index, value)}
                    min={0.5}
                    max={20}
                    step={0.25}
                  >
                    <Slider.Track className="slider-track">
                      <Slider.Range className="slider-range" />
                    </Slider.Track>
                    <Slider.Thumb className="slider-thumb" />
                  </Slider.Root>
                </div>
              </div>
            ))}

            {/* 股票持倉選項 */}
            {showStock && (
              <div className="flex gap-2">
                <button
                  onClick={() => setStockPosition('none')}
                  className={`px-3 py-2 rounded-lg text-sm transition-all ${
                    stockPosition === 'none'
                      ? 'bg-[var(--accent-gold)] text-[var(--bg-primary)]'
                      : 'bg-[var(--bg-card)] text-[var(--text-secondary)]'
                  }`}
                >
                  無股票
                </button>
                <button
                  onClick={() => setStockPosition('long')}
                  className={`px-3 py-2 rounded-lg text-sm transition-all ${
                    stockPosition === 'long'
                      ? 'bg-[var(--profit)] text-white'
                      : 'bg-[var(--bg-card)] text-[var(--text-secondary)]'
                  }`}
                >
                  持有股票
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 圖例 */}
      <div className="mt-4 flex flex-wrap gap-4 text-xs text-[var(--text-muted)]">
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-[var(--accent-gold)]"></div>
          <span>期權損益</span>
        </div>
        {(stockPosition !== 'none' || showStock) && (
          <>
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-[var(--accent-blue)] opacity-50" style={{ borderStyle: 'dashed' }}></div>
              <span>股票損益</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-[var(--accent-purple)]"></div>
              <span>總損益</span>
            </div>
          </>
        )}
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-[var(--accent-gold)] opacity-50" style={{ borderStyle: 'dashed' }}></div>
          <span>行權價</span>
        </div>
      </div>
    </div>
  );
}

