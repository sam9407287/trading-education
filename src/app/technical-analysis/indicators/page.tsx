'use client';

import Link from 'next/link';
import { ArrowLeft, LineChart, TrendingUp, Activity } from 'lucide-react';
import dynamic from 'next/dynamic';

// 動態導入圖表組件以避免 SSR 問題
const CandlestickChart = dynamic(() => import('@/components/charts/CandlestickChart'), { ssr: false });
const IndicatorChart = dynamic(() => import('@/components/charts/IndicatorChart'), { ssr: false });

const indicators = [
  {
    id: 'moving-average',
    name: '移動平均線',
    nameEn: 'Moving Average (MA)',
    description: '最基礎的趨勢指標，通過計算一定期間內的平均價格來平滑價格波動。',
    types: ['SMA - 簡單移動平均', 'EMA - 指數移動平均', 'WMA - 加權移動平均'],
    usage: '判斷趨勢方向、支撐阻力、黃金交叉/死亡交叉',
  },
  {
    id: 'rsi',
    name: 'RSI 相對強弱',
    nameEn: 'Relative Strength Index',
    description: '衡量價格變動的速度和變化，用於識別超買超賣狀態。',
    formula: 'RSI = 100 - (100 / (1 + RS))',
    usage: '超買(>70)賣出信號、超賣(<30)買入信號、背離',
  },
  {
    id: 'kdj',
    name: 'KDJ 隨機指標',
    nameEn: 'Stochastic Oscillator',
    description: '比較收盤價與一定期間內價格範圍的關係，產生 K、D、J 三條線。',
    usage: '超買超賣判斷、K/D 交叉、J 線極值',
  },
  {
    id: 'bollinger',
    name: '布林帶',
    nameEn: 'Bollinger Bands',
    description: '由中軌（移動平均線）和上下軌（標準差通道）組成的波動率指標。',
    formula: '上軌 = MA + 2σ, 下軌 = MA - 2σ',
    usage: '波動率判斷、支撐阻力、突破交易',
  },
  {
    id: 'atr',
    name: 'ATR 平均真實波幅',
    nameEn: 'Average True Range',
    description: '衡量市場波動性的指標，不判斷方向只衡量波動幅度。',
    usage: '設置止損、判斷波動環境、倉位管理',
  },
  {
    id: 'macd',
    name: 'MACD',
    nameEn: 'Moving Average Convergence Divergence',
    description: '顯示兩條移動平均線之間的關係，包含 MACD 線、信號線和柱狀圖。',
    formula: 'MACD = EMA(12) - EMA(26)',
    usage: '趨勢確認、交叉信號、背離',
  },
];

export default function IndicatorsPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative overflow-x-hidden border-b border-[var(--border-color)]">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6">
            <Link href="/" className="hover:text-[var(--accent-gold)]">首頁</Link>
            <span>/</span>
            <Link href="/technical-analysis" className="hover:text-[var(--accent-gold)]">技術分析</Link>
            <span>/</span>
            <span className="text-[var(--text-primary)]">技術指標</span>
          </nav>

          <Link
            href="/technical-analysis"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent-gold)] mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            返回技術分析
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
              <LineChart className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[var(--text-primary)]">技術指標</h1>
              <p className="text-[var(--text-muted)]">Technical Indicators</p>
            </div>
          </div>
          
          <p className="text-lg text-[var(--text-secondary)] max-w-3xl">
            技術指標是通過數學公式計算得出的輔助分析工具，幫助交易者識別趨勢、超買超賣狀態和潛在的交易信號。
          </p>
        </div>
      </section>

      {/* Chart Demo */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">K線圖與移動平均線</h2>
        <CandlestickChart 
          height={400} 
          showMA={true} 
          maPeriods={[5, 20, 60]} 
          title="示例圖表 - 帶有 MA5/MA20/MA60"
        />
      </section>

      {/* Indicators Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">常用技術指標</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {indicators.map((indicator) => (
            <div
              key={indicator.id}
              className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
                {indicator.name}
              </h3>
              <p className="text-sm text-[var(--text-muted)] mb-3">{indicator.nameEn}</p>
              <p className="text-[var(--text-secondary)] mb-4">{indicator.description}</p>
              
              {indicator.formula && (
                <div className="bg-[var(--bg-secondary)] rounded-lg p-3 mb-4 font-mono text-sm text-[var(--accent-gold)]">
                  {indicator.formula}
                </div>
              )}
              
              {indicator.types && (
                <div className="mb-4">
                  <span className="text-xs text-[var(--text-muted)]">類型：</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {indicator.types.map((type) => (
                      <span key={type} className="px-2 py-1 bg-[var(--bg-secondary)] rounded text-xs text-[var(--text-secondary)]">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex items-start gap-2">
                <Activity className="w-4 h-4 text-[var(--accent-gold)] mt-0.5" />
                <p className="text-sm text-[var(--text-muted)]">
                  <span className="text-[var(--text-secondary)]">應用：</span> {indicator.usage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RSI Demo */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">RSI 指標示例</h2>
        <IndicatorChart indicator="rsi" height={250} />
      </section>

      {/* KDJ Demo */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">KDJ 指標示例</h2>
        <IndicatorChart indicator="kdj" height={250} />
      </section>

      {/* ATR Demo */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">ATR 指標示例</h2>
        <IndicatorChart indicator="atr" height={200} />
      </section>
    </div>
  );
}

