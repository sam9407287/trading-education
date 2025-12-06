'use client';

import Link from 'next/link';
import { ArrowLeft, Zap, Clock } from 'lucide-react';
import PatternCard from '@/components/patterns/PatternCard';
import AnchorNav from '@/components/ui/AnchorNav';
import { getShortTermPatternsWithData } from '@/lib/patterns/patternDefinitions';

const navSections = [
  {
    id: 'bull-flag',
    label: '牛市旗型',
  },
  {
    id: 'bear-flag',
    label: '熊市旗型',
  },
  {
    id: 'bull-pennant',
    label: '牛市三角旗型',
  },
  {
    id: 'bear-pennant',
    label: '熊市三角旗型',
  },
];

export default function ShortTermPatternsPage() {
  const patterns = getShortTermPatternsWithData();

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-primary)] border-b border-[var(--border-color)] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5"></div>
        
        <div className="relative max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6">
            <Link href="/" className="hover:text-[var(--accent-gold)]">首頁</Link>
            <span>/</span>
            <Link href="/technical-analysis" className="hover:text-[var(--accent-gold)]">技術分析</Link>
            <span>/</span>
            <Link href="/technical-analysis/patterns" className="hover:text-[var(--accent-gold)]">形態分析</Link>
            <span>/</span>
            <span className="text-[var(--text-primary)]">短期型態</span>
          </nav>

          <Link
            href="/technical-analysis/patterns"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent-gold)] mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            返回形態分析
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-400 flex items-center justify-center">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[var(--text-primary)]">短期型態</h1>
              <p className="text-[var(--text-muted)]">Short-term Patterns</p>
            </div>
          </div>
          
          <p className="text-lg text-[var(--text-secondary)] max-w-3xl leading-relaxed mb-4">
            短期型態（旗型和三角旗型）在急劇走勢後快速形成，持續時間短但可靠性高。
            這些型態是強勁趨勢中的短暫休息，通常發生在大幅上漲或下跌之後，
            為交易者提供了追漲殺跌的良好機會。
          </p>

          <div className="flex flex-wrap gap-4 mt-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg">
              <Clock className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-[var(--text-secondary)]">
                <span className="font-semibold text-[var(--text-primary)]">四週規則：</span>
                突破應在 4 週內發生
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg">
              <Zap className="w-4 h-4 text-orange-400" />
              <span className="text-sm text-[var(--text-secondary)]">
                <span className="font-semibold text-[var(--text-primary)]">高可靠性：</span>
                符合條件的短期型態成功率很高
              </span>
            </div>
          </div>

          {/* 重要提示 */}
          <div className="mt-6 p-4 bg-[var(--accent-gold)]/5 border-l-4 border-[var(--accent-gold)] rounded-r-lg">
            <h3 className="font-semibold text-[var(--text-primary)] mb-2">📌 四週規則的重要性</h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              如果旗型或三角旗型持續超過 4 週，我們需要將該盤整重新分類為其他圖表型態（如矩形或對稱三角形）。
              超過 4 週的型態通常失去了短期型態的動能特徵，其可靠性會大幅降低。
              這是 Schabacker 和 Edwards & Magee 強調的關鍵規則。
            </p>
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

      {/* 可靠性準則總結 */}
      <section className="max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
            短期型態的可靠性準則總結
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[var(--accent-gold)]/20 text-[var(--accent-gold)] flex items-center justify-center text-sm font-bold">1</span>
                旗桿條件
              </h3>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                <li>• 必須形成於急劇且大幅度的上漲或下跌之後</li>
                <li>• 旗桿的成交量應該很高</li>
                <li>• 旗桿的角度應該接近垂直</li>
                <li>• 旗桿是整個型態的動力來源</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[var(--accent-gold)]/20 text-[var(--accent-gold)] flex items-center justify-center text-sm font-bold">2</span>
                旗幟/三角旗條件
              </h3>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                <li>• 成交量必須顯著下降</li>
                <li>• 形態應該小型且緊湊</li>
                <li>• 旗型：平行邊界，稍微傾斜</li>
                <li>• 三角旗：收斂邊界</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[var(--accent-gold)]/20 text-[var(--accent-gold)] flex items-center justify-center text-sm font-bold">3</span>
                突破條件
              </h3>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                <li>• 必須在 4 週內突破</li>
                <li>• 突破時成交量應顯著增加</li>
                <li>• 突破後的走勢通常與旗桿相似</li>
                <li>• 突破方向與旗桿方向一致</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-[var(--border-color)]">
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              <span className="font-semibold text-[var(--text-primary)]">關鍵洞察：</span>
              短期型態是最適合短線交易的圖表型態。它們的高可靠性來自於明確的結構和嚴格的條件。
              遵守四週規則是確保這些型態有效性的關鍵。如果型態符合所有條件，
              其成功率通常超過 80%，這使它們成為技術分析中最受歡迎的交易工具之一。
            </p>
          </div>
        </div>
      </section>

      {/* 底部導航 */}
      <section className="max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-20">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-6">
          <Link
            href="/technical-analysis/patterns/continuation"
            className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--accent-gold)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>上一章：連續型態</span>
          </Link>
          <Link
            href="/technical-analysis/patterns"
            className="flex items-center gap-2 px-6 py-3 bg-[var(--accent-gold)] text-white rounded-lg font-medium hover:bg-[var(--accent-gold)]/90 transition-colors"
          >
            <span>返回形態總覽</span>
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </section>
    </div>
  );
}

