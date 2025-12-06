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
        <div className="bg-[var(--bg-card)] border-2 border-[var(--accent-gold)]/30 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2 flex items-center gap-3">
            <span className="text-3xl">📚</span>
            CMT 考試重點總結
          </h2>
          <p className="text-sm text-[var(--text-muted)] mb-6">
            這些是 CMT Level 1/2 考試中關於短期型態的高頻考點
          </p>

          {/* Duration Rule */}
          <div className="mb-8 p-6 bg-gradient-to-r from-red-500/10 to-transparent border-l-4 border-red-500 rounded-r-lg">
            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2">
              <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-bold">必考</span>
              Duration Rule（時間限制規則）
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[var(--bg-secondary)] p-4 rounded-lg">
                <p className="font-semibold text-[var(--text-primary)] mb-2">Flag / Pennant（旗型/三角旗型）</p>
                <p className="text-2xl font-bold text-green-400 mb-1">&lt; 4 Weeks</p>
                <p className="text-sm text-[var(--text-secondary)]">短於 4 週</p>
              </div>
              <div className="bg-[var(--bg-secondary)] p-4 rounded-lg">
                <p className="font-semibold text-[var(--text-primary)] mb-2">Rectangle / Triangle（矩形/三角形）</p>
                <p className="text-2xl font-bold text-blue-400 mb-1">&gt; 4 Weeks</p>
                <p className="text-sm text-[var(--text-secondary)]">長於 4 週</p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-[var(--bg-primary)] rounded-lg">
              <p className="font-semibold text-red-400 mb-2">⚠️ 考題陷阱</p>
              <p className="text-sm text-[var(--text-secondary)]">
                題目給出一個持續了 <span className="font-bold text-[var(--text-primary)]">6 週</span> 的平行通道盤整，
                問這是什麼型態？<br/>
                <span className="text-red-400">❌ 錯誤答案：Flag（旗型）</span><br/>
                <span className="text-green-400">✓ 正確答案：Rectangle 或 Channel</span>
              </p>
            </div>
          </div>

          {/* Volume Profile */}
          <div className="mb-8 p-6 bg-gradient-to-r from-blue-500/10 to-transparent border-l-4 border-blue-500 rounded-r-lg">
            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3">Volume Profile（成交量特徵）</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-[var(--bg-secondary)] p-4 rounded-lg">
                <p className="font-semibold text-[var(--text-primary)] mb-2">1️⃣ Before（旗桿形成時）</p>
                <p className="text-sm text-green-400 font-semibold mb-1">Heavy / High Volume</p>
                <p className="text-xs text-[var(--text-muted)]">急劇上漲/下跌伴隨高量</p>
              </div>
              <div className="bg-[var(--bg-secondary)] p-4 rounded-lg">
                <p className="font-semibold text-[var(--text-primary)] mb-2">2️⃣ During（旗型形成時）</p>
                <p className="text-sm text-blue-400 font-semibold mb-1">Drying up / Shrinking</p>
                <p className="text-xs text-[var(--text-muted)]">成交量顯著萎縮</p>
              </div>
              <div className="bg-[var(--bg-secondary)] p-4 rounded-lg">
                <p className="font-semibold text-[var(--text-primary)] mb-2">3️⃣ After（突破時）</p>
                <p className="text-sm text-orange-400 font-semibold mb-1">Explodes / Increases</p>
                <p className="text-xs text-[var(--text-muted)]">成交量激增</p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-[var(--bg-primary)] rounded-lg">
              <p className="font-semibold text-blue-400 mb-2">💡 邏輯</p>
              <p className="text-sm text-[var(--text-secondary)]">
                旗型代表市場「喘口氣」(Pause)。如果喘氣時成交量還很大，
                代表<span className="text-red-400 font-semibold">出貨或換手</span>，
                而不是單純的獲利回吐，型態容易失敗。
              </p>
            </div>
          </div>

          {/* Shape Differentiation */}
          <div className="mb-8 p-6 bg-gradient-to-r from-purple-500/10 to-transparent border-l-4 border-purple-500 rounded-r-lg">
            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3">Shape Differentiation（形狀區分）</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[var(--bg-secondary)] p-4 rounded-lg border-2 border-purple-500/30">
                <p className="font-semibold text-[var(--text-primary)] mb-2">Flag（旗型）</p>
                <p className="text-lg text-purple-400 font-semibold mb-2">Parallelogram</p>
                <p className="text-sm text-[var(--text-secondary)] mb-3">平行四邊形 → 兩條邊界平行</p>
                <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                  <span className="w-16 h-8 border-2 border-purple-400 transform -skew-y-6"></span>
                  <span>平行邊界</span>
                </div>
              </div>
              <div className="bg-[var(--bg-secondary)] p-4 rounded-lg border-2 border-pink-500/30">
                <p className="font-semibold text-[var(--text-primary)] mb-2">Pennant（三角旗型）</p>
                <p className="text-lg text-pink-400 font-semibold mb-2">Small Triangle</p>
                <p className="text-sm text-[var(--text-secondary)] mb-3">小三角形 → 兩條邊界收斂</p>
                <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                  <span className="w-16 h-8 border-t-2 border-b-2 border-r-2 border-pink-400 transform origin-left scale-x-50"></span>
                  <span>收斂邊界</span>
                </div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-[var(--bg-primary)] rounded-lg">
              <p className="text-sm text-[var(--text-secondary)]">
                <span className="font-semibold text-[var(--text-primary)]">注意：</span>
                它們的<span className="text-green-400 font-semibold">功能和意義完全一樣</span>，
                只是形狀不同。兩者都是高可靠性的短期連續型態。
              </p>
            </div>
          </div>

          {/* Directional Bias */}
          <div className="mb-8 p-6 bg-gradient-to-r from-amber-500/10 to-transparent border-l-4 border-amber-500 rounded-r-lg">
            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3">Directional Bias（方向偏見）</h3>
            <div className="space-y-3">
              <div className="bg-[var(--bg-secondary)] p-4 rounded-lg">
                <p className="font-semibold text-[var(--text-primary)] mb-2">理想特徵：Sloping against the trend（逆勢傾斜）</p>
                <div className="grid md:grid-cols-2 gap-4 mt-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📈</span>
                    <div>
                      <p className="text-sm font-semibold text-green-400">牛市旗型</p>
                      <p className="text-xs text-[var(--text-muted)]">通常向下傾斜 (Slope down)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📉</span>
                    <div>
                      <p className="text-sm font-semibold text-red-400">熊市旗型</p>
                      <p className="text-xs text-[var(--text-muted)]">通常向上傾斜 (Slope up)</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-[var(--bg-primary)] rounded-lg">
                <p className="text-sm text-[var(--text-secondary)]">
                  <span className="font-semibold text-amber-400">例外：</span>
                  雖然文獻提到可能是「稍微傾斜或平坦」，但最理想的旗型通常是逆勢傾斜的。
                  這種逆勢傾斜反映了獲利回吐的壓力。
                </p>
              </div>
            </div>
          </div>

          {/* Target Measurement */}
          <div className="p-6 bg-gradient-to-r from-green-500/10 to-transparent border-l-4 border-green-500 rounded-r-lg">
            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3">Target Measurement（目標測量）</h3>
            <div className="bg-[var(--bg-secondary)] p-4 rounded-lg mb-3">
              <p className="font-semibold text-[var(--text-primary)] mb-2">Measured Move（測量幅度）</p>
              <p className="text-sm text-[var(--text-secondary)] mb-3">
                旗型通常發生在行情的<span className="text-green-400 font-semibold">「半山腰」(Half-mast)</span>位置。
              </p>
              <div className="p-4 bg-[var(--bg-primary)] rounded-lg">
                <p className="text-xs text-[var(--text-muted)] mb-2">公式</p>
                <p className="text-base font-mono text-[var(--text-primary)]">
                  突破後的漲幅/跌幅 = 旗型之前的旗桿長度
                </p>
              </div>
            </div>
            <div className="p-4 bg-[var(--bg-primary)] rounded-lg border border-yellow-500/30">
              <p className="font-semibold text-yellow-400 mb-2">⚠️ 重要提醒</p>
              <p className="text-sm text-[var(--text-secondary)]">
                這是<span className="text-[var(--text-primary)] font-semibold">常見的目標價位</span>，
                不代表價格一定會到達該位置。應視為<span className="text-green-400">「最小預期目標」</span>，
                實際走勢可能更強或更弱，需要結合其他技術指標和市場環境判斷。
              </p>
            </div>
          </div>

          {/* 總結 */}
          <div className="mt-6 pt-6 border-t border-[var(--border-color)]">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🎯</span>
              <div>
                <h4 className="font-semibold text-[var(--text-primary)] mb-2">CMT 考試策略</h4>
                <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                  <li>• <span className="font-semibold text-[var(--text-primary)]">時間是關鍵：</span>看到平行通道，第一件事是檢查持續時間</li>
                  <li>• <span className="font-semibold text-[var(--text-primary)]">成交量是確認：</span>Before(高) → During(低) → After(高)</li>
                  <li>• <span className="font-semibold text-[var(--text-primary)]">形狀要明確：</span>Parallelogram vs. Small Triangle</li>
                  <li>• <span className="font-semibold text-[var(--text-primary)]">逆勢傾斜更佳：</span>牛市旗向下傾斜，熊市旗向上傾斜</li>
                  <li>• <span className="font-semibold text-[var(--text-primary)]">目標價是參考：</span>Measured Move = 旗桿長度</li>
                </ul>
              </div>
            </div>
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

