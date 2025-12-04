'use client';

import Link from 'next/link';
import { ArrowLeft, Target } from 'lucide-react';
import PatternDiagram, { availablePatterns } from '@/components/charts/PatternDiagram';

const patternCategories = [
  {
    id: 'reversal',
    name: '反轉型態',
    nameEn: 'Reversal Patterns',
    description: '出現在趨勢末端，預示趨勢即將反轉的形態',
    patterns: ['head-shoulders', 'inverse-head-shoulders', 'double-top', 'double-bottom'],
  },
  {
    id: 'continuation',
    name: '持續型態',
    nameEn: 'Continuation Patterns',
    description: '出現在趨勢中途，預示趨勢將繼續的形態',
    patterns: ['triangle-ascending', 'triangle-descending', 'triangle-symmetric', 'flag-bullish', 'flag-bearish'],
  },
  {
    id: 'special',
    name: '特殊型態',
    nameEn: 'Special Patterns',
    description: '具有特殊意義的複雜形態',
    patterns: ['wedge-rising', 'wedge-falling', 'cup-handle'],
  },
];

export default function PatternsPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative overflow-x-hidden border-b border-[var(--border-color)]">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-transparent to-red-500/5"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6">
            <Link href="/" className="hover:text-[var(--accent-gold)]">首頁</Link>
            <span>/</span>
            <Link href="/technical-analysis" className="hover:text-[var(--accent-gold)]">技術分析</Link>
            <span>/</span>
            <span className="text-[var(--text-primary)]">形態分析</span>
          </nav>

          <Link
            href="/technical-analysis"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent-gold)] mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            返回技術分析
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-rose-500 to-red-400 flex items-center justify-center">
              <Target className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[var(--text-primary)]">形態分析</h1>
              <p className="text-[var(--text-muted)]">Pattern Analysis</p>
            </div>
          </div>
          
          <p className="text-lg text-[var(--text-secondary)] max-w-3xl">
            形態分析是通過識別價格圖表中反覆出現的特定形狀來預測未來價格走勢的方法。
            這些形態反映了市場參與者的集體心理和行為模式。
          </p>
        </div>
      </section>

      {/* Pattern Categories */}
      {patternCategories.map((category) => (
        <section key={category.id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">{category.name}</h2>
            <p className="text-sm text-[var(--text-muted)] mb-2">{category.nameEn}</p>
            <p className="text-[var(--text-secondary)]">{category.description}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.patterns.map((patternId) => (
              <PatternDiagram
                key={patternId}
                type={patternId as any}
                showAnnotations={true}
                interactive={true}
              />
            ))}
          </div>
        </section>
      ))}

      {/* Tips */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-6">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">形態分析要點</h3>
          <ul className="space-y-3 text-[var(--text-secondary)]">
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] mt-2"></div>
              <span><strong>確認突破：</strong>形態完成需要價格突破關鍵支撐/阻力位，且最好有成交量配合</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] mt-2"></div>
              <span><strong>目標價位：</strong>通常可用形態的高度來預估突破後的目標價位</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] mt-2"></div>
              <span><strong>時間框架：</strong>形態在較長時間框架上更為可靠，形成時間越長，突破後動能越強</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] mt-2"></div>
              <span><strong>假突破：</strong>需警惕假突破的可能，建議等待回測確認再進場</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

