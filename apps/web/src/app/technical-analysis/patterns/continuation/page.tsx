'use client';

import Link from 'next/link';
import { ArrowLeft, TrendingUp, Repeat } from 'lucide-react';
import PatternCard from '@/components/patterns/PatternCard';
import AnchorNav from '@/components/ui/AnchorNav';
import { getContinuationPatternsWithData } from '@/lib/patterns/patternDefinitions';

const navSections = [
  {
    id: 'symmetrical-triangle-continuation',
    label: '對稱三角形',
  },
  {
    id: 'ascending-triangle-continuation',
    label: '上升三角形',
  },
  {
    id: 'descending-triangle-continuation',
    label: '下降三角形',
  },
  {
    id: 'rectangle-continuation',
    label: '矩形',
  },
  {
    id: 'cup-with-handle',
    label: '杯柄型態',
  },
];

export default function ContinuationPatternsPage() {
  const patterns = getContinuationPatternsWithData();

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-primary)] border-b border-[var(--border-color)] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5"></div>
        
        <div className="relative max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6">
            <Link href="/" className="hover:text-[var(--accent-gold)]">首頁</Link>
            <span>/</span>
            <Link href="/technical-analysis" className="hover:text-[var(--accent-gold)]">技術分析</Link>
            <span>/</span>
            <Link href="/technical-analysis/patterns" className="hover:text-[var(--accent-gold)]">形態分析</Link>
            <span>/</span>
            <span className="text-[var(--text-primary)]">連續型態</span>
          </nav>

          <Link
            href="/technical-analysis/patterns"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent-gold)] mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            返回形態分析
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[var(--text-primary)]">連續型態</h1>
              <p className="text-[var(--text-muted)]">Continuation Patterns</p>
            </div>
          </div>
          
          <p className="text-lg text-[var(--text-secondary)] max-w-3xl leading-relaxed mb-4">
            連續型態暫時中斷現有趨勢，在型態完成後預測趨勢將繼續發展。
            這些型態是趨勢中的休息站，通常是買賣雙方猶豫不決的結果，
            也是機構積累或派發的時期。
          </p>

          <div className="flex flex-wrap gap-4 mt-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg">
              <Repeat className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-[var(--text-secondary)]">
                <span className="font-semibold text-[var(--text-primary)]">趨勢延續：</span>
                突破後沿原方向繼續
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-[var(--text-secondary)]">
                <span className="font-semibold text-[var(--text-primary)]">能量積累：</span>
                盤整期間為下一波走勢蓄力
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 錨點導航 */}
      <AnchorNav sections={navSections} />

      {/* 型態詳細內容 */}
      <section className="max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {patterns.map((pattern) => (
          <PatternCard key={pattern.id} {...pattern} />
        ))}
      </section>

      {/* 底部導航 */}
      <section className="max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-20">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-6">
          <Link
            href="/technical-analysis/patterns/reversal"
            className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--accent-gold)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>上一章：反轉型態</span>
          </Link>
          <Link
            href="/technical-analysis/patterns/short-term"
            className="flex items-center gap-2 px-6 py-3 bg-[var(--accent-gold)] text-white rounded-lg font-medium hover:bg-[var(--accent-gold)]/90 transition-colors"
          >
            <span>下一章：短期型態</span>
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </section>
    </div>
  );
}

