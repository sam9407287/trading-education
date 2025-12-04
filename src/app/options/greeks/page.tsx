'use client';

import Link from 'next/link';
import { ArrowLeft, Calculator, ArrowRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import Term from '@/components/ui/Term';

const GreeksVisualizer = dynamic(() => import('@/components/charts/GreeksVisualizer'), { ssr: false });

const greeks = [
  {
    symbol: 'Δ',
    name: 'Delta',
    nameCn: '德爾塔',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    description: '期權價格對標的價格變化的敏感度。表示標的價格變動 $1 時，期權價格的變動量。',
    range: {
      call: '0 到 1',
      put: '-1 到 0',
    },
    keyPoints: [
      'ITM 期權 Delta 接近 ±1',
      'ATM 期權 Delta 約為 ±0.5',
      'OTM 期權 Delta 接近 0',
      '可視為到期時 ITM 的概率估計',
      'Delta 是建立對沖部位的基礎',
    ],
    tradingTips: [
      'Delta 中性策略用於純粹交易波動率',
      '高 Delta = 更像直接持有股票',
      '低 Delta = 更多槓桿，但成功率較低',
    ],
  },
  {
    symbol: 'Γ',
    name: 'Gamma',
    nameCn: '伽馬',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    description: 'Delta 對標的價格變化的敏感度。表示標的價格變動 $1 時，Delta 的變動量。',
    range: {
      call: '始終為正',
      put: '始終為正',
    },
    keyPoints: [
      'ATM 期權的 Gamma 最大',
      '接近到期時 Gamma 急劇增加',
      'Gamma 是 Long 期權的朋友',
      'Gamma 是 Short 期權的敵人',
      '高 Gamma = Delta 變化快',
    ],
    tradingTips: [
      'Long Gamma 在大幅波動中獲利',
      'Short Gamma 在橫盤中獲利但有尾部風險',
      '接近到期的 ATM 期權 Gamma 風險最大',
    ],
  },
  {
    symbol: 'Θ',
    name: 'Theta',
    nameCn: '西塔',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    description: '期權價格隨時間流逝而衰減的速度。通常以每日為單位表示。',
    range: {
      call: '通常為負（買方）',
      put: '通常為負（買方）',
    },
    keyPoints: [
      '時間衰減不是線性的',
      'ATM 期權的 Theta 最大',
      '接近到期時 Theta 加速',
      '週末和假日不交易但 Theta 仍在流失',
      'Theta 是期權賣方的收入來源',
    ],
    tradingTips: [
      'Long 期權要注意時間衰減成本',
      'Short 期權每天都在賺 Theta',
      '選擇合適的到期日平衡 Theta 和 Gamma',
    ],
  },
  {
    symbol: 'ν',
    name: 'Vega',
    nameCn: '維加',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    description: '期權價格對隱含波動率變化的敏感度。表示 IV 變動 1% 時，期權價格的變動量。',
    range: {
      call: '始終為正',
      put: '始終為正',
    },
    keyPoints: [
      'ATM 期權的 Vega 最大',
      '較長到期的期權 Vega 較大',
      'Long 期權是 Long Vega',
      'Short 期權是 Short Vega',
      'IV 上升對 Long 有利，對 Short 不利',
    ],
    tradingTips: [
      '低 IV 時 Long Vega（買期權）',
      '高 IV 時 Short Vega（賣期權）',
      '財報前後 IV 變化劇烈（IV Crush）',
    ],
  },
  {
    symbol: 'ρ',
    name: 'Rho',
    nameCn: '柔',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    description: '期權價格對無風險利率變化的敏感度。通常影響較小。',
    range: {
      call: '正值',
      put: '負值',
    },
    keyPoints: [
      '利率上升對 Call 有利',
      '利率上升對 Put 不利',
      '對短期期權影響很小',
      '對長期 LEAPS 影響較大',
      '通常是最不重要的 Greek',
    ],
    tradingTips: [
      '一般可以忽略 Rho',
      '持有長期期權時需考慮利率環境',
      '利率大幅變動時重新評估 LEAPS',
    ],
  },
];

export default function GreeksPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative overflow-x-hidden border-b border-[var(--border-color)]">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6">
            <Link href="/" className="hover:text-[var(--accent-gold)]">首頁</Link>
            <span>/</span>
            <Link href="/options" className="hover:text-[var(--accent-gold)]">期權教學</Link>
            <span>/</span>
            <span className="text-[var(--text-primary)]">希臘字母</span>
          </nav>

          <Link
            href="/options"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent-gold)] mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            返回期權教學
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-400 flex items-center justify-center">
              <Calculator className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[var(--text-primary)]">希臘字母</h1>
              <p className="text-[var(--text-muted)]">The Greeks</p>
            </div>
          </div>
          
          <p className="text-lg text-[var(--text-secondary)] max-w-3xl">
            希臘字母（<Term cn="Greeks" en="The Greeks" />）是衡量期權價格對各種因素敏感度的指標。
            理解 Greeks 是進行期權交易和風險管理的基礎。
          </p>
        </div>
      </section>

      {/* Interactive Visualizer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="calculator">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">互動式視覺化</h2>
        <GreeksVisualizer interactive={true} />
      </section>

      {/* Greeks Details */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-8">詳細說明</h2>
        
        <div className="space-y-8">
          {greeks.map((greek) => (
            <div
              key={greek.name}
              className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden"
            >
              <div className="p-6 sm:p-8">
                {/* Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-16 h-16 rounded-xl ${greek.bgColor} flex items-center justify-center`}>
                    <span className={`text-3xl font-bold ${greek.color}`}>{greek.symbol}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[var(--text-primary)]">
                      {greek.name} ({greek.nameCn})
                    </h3>
                    <p className="text-[var(--text-secondary)] mt-1">{greek.description}</p>
                  </div>
                </div>

                {/* Range */}
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-[var(--bg-secondary)] rounded-lg p-4">
                    <span className="text-xs text-[var(--text-muted)]">Call 期權範圍</span>
                    <p className="text-[var(--text-primary)] font-medium">{greek.range.call}</p>
                  </div>
                  <div className="bg-[var(--bg-secondary)] rounded-lg p-4">
                    <span className="text-xs text-[var(--text-muted)]">Put 期權範圍</span>
                    <p className="text-[var(--text-primary)] font-medium">{greek.range.put}</p>
                  </div>
                </div>

                {/* Key Points & Trading Tips */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-3">重要特性</h4>
                    <ul className="space-y-2">
                      {greek.keyPoints.map((point, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                          <div className={`w-1.5 h-1.5 rounded-full ${greek.bgColor} mt-2`}></div>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-3">交易應用</h4>
                    <ul className="space-y-2">
                      {greek.tradingTips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                          <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] mt-2"></div>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Greeks Relationship */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-6">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Greeks 之間的關係</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm text-[var(--text-secondary)]">
            <div className="p-4 bg-[var(--bg-primary)]/50 rounded-lg">
              <strong className="text-[var(--text-primary)]">Delta 與 Gamma：</strong>
              <p className="mt-1">Gamma 是 Delta 的變化率。高 Gamma 意味著 Delta 會快速變化。</p>
            </div>
            <div className="p-4 bg-[var(--bg-primary)]/50 rounded-lg">
              <strong className="text-[var(--text-primary)]">Theta 與 Gamma：</strong>
              <p className="mt-1">通常是對立的。Long Gamma 伴隨著負 Theta（時間衰減成本）。</p>
            </div>
            <div className="p-4 bg-[var(--bg-primary)]/50 rounded-lg">
              <strong className="text-[var(--text-primary)]">Vega 與到期時間：</strong>
              <p className="mt-1">較長到期的期權有較高的 Vega，對 IV 變化更敏感。</p>
            </div>
            <div className="p-4 bg-[var(--bg-primary)]/50 rounded-lg">
              <strong className="text-[var(--text-primary)]">ATM 特性：</strong>
              <p className="mt-1">ATM 期權的 Gamma、Theta、Vega 通常都是最大的。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps - Removed */}
    </div>
  );
}

