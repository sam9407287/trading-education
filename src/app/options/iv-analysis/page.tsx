import Link from 'next/link';
import { ArrowLeft, BarChart2, ArrowRight, TrendingUp, TrendingDown, Calendar, AlertTriangle } from 'lucide-react';
import Term from '@/components/ui/Term';

export default function IVAnalysisPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative overflow-x-hidden border-b border-[var(--border-color)]">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6">
            <Link href="/" className="hover:text-[var(--accent-gold)]">首頁</Link>
            <span>/</span>
            <Link href="/options" className="hover:text-[var(--accent-gold)]">期權教學</Link>
            <span>/</span>
            <span className="text-[var(--text-primary)]">IV 分析</span>
          </nav>

          <Link
            href="/options"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent-gold)] mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            返回期權教學
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-400 flex items-center justify-center">
              <BarChart2 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[var(--text-primary)]">IV 分析</h1>
              <p className="text-[var(--text-muted)]">Implied Volatility Analysis</p>
            </div>
          </div>
          
          <p className="text-lg text-[var(--text-secondary)] max-w-3xl">
            <Term cn="隱含波動率" en="Implied Volatility" /> 是期權定價中最關鍵的變數之一，
            反映了市場對未來價格波動的預期。理解 IV 是選擇策略的重要基礎。
          </p>
        </div>
      </section>

      {/* What is IV */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">什麼是隱含波動率？</h2>
        
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-6 mb-8">
          <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
            <Term cn="隱含波動率" en="IV" highlight /> 是從期權市場價格反推出來的預期波動率。
            它代表了市場參與者對標的資產未來價格波動幅度的共識預期。
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-[var(--bg-secondary)] rounded-lg p-4">
              <h4 className="font-medium text-[var(--text-primary)] mb-2">IV 高</h4>
              <p className="text-sm text-[var(--text-muted)]">
                期權較貴，市場預期大波動。常見於財報前、重大事件前。
              </p>
            </div>
            <div className="bg-[var(--bg-secondary)] rounded-lg p-4">
              <h4 className="font-medium text-[var(--text-primary)] mb-2">IV 低</h4>
              <p className="text-sm text-[var(--text-muted)]">
                期權較便宜，市場預期平穩。常見於無重大事件的平靜期。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* IV vs HV */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">IV vs 歷史波動率</h2>
        
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[var(--bg-secondary)]">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--text-primary)]">比較項目</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--text-primary)]">隱含波動率 (IV)</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--text-primary)]">歷史波動率 (HV)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-color)]">
                <tr>
                  <td className="px-6 py-4 text-[var(--text-primary)] font-medium">定義</td>
                  <td className="px-6 py-4 text-[var(--text-secondary)]">市場預期的未來波動率</td>
                  <td className="px-6 py-4 text-[var(--text-secondary)]">過去實際發生的波動率</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-[var(--text-primary)] font-medium">方向</td>
                  <td className="px-6 py-4 text-[var(--text-secondary)]">前瞻性</td>
                  <td className="px-6 py-4 text-[var(--text-secondary)]">回顧性</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-[var(--text-primary)] font-medium">來源</td>
                  <td className="px-6 py-4 text-[var(--text-secondary)]">從期權價格反推</td>
                  <td className="px-6 py-4 text-[var(--text-secondary)]">從歷史價格計算</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-[var(--text-primary)] font-medium">用途</td>
                  <td className="px-6 py-4 text-[var(--text-secondary)]">判斷期權是否便宜/昂貴</td>
                  <td className="px-6 py-4 text-[var(--text-secondary)]">了解標的的歷史波動特性</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* IV Rank & Percentile */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">IV Rank 與 IV Percentile</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-6">
            <h3 className="font-semibold text-[var(--text-primary)] mb-2">IV Rank</h3>
            <p className="text-sm text-[var(--text-muted)] mb-4">
              當前 IV 在過去一年 IV 範圍中的相對位置
            </p>
            <div className="bg-[var(--bg-secondary)] rounded-lg p-3 font-mono text-sm text-[var(--accent-gold)] mb-4">
              IV Rank = (當前IV - 52週最低IV) / (52週最高IV - 52週最低IV)
            </div>
            <p className="text-sm text-[var(--text-secondary)]">
              例如：如果過去一年 IV 最低 20%，最高 60%，當前 40%，則 IV Rank = (40-20)/(60-20) = 50%
            </p>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-6">
            <h3 className="font-semibold text-[var(--text-primary)] mb-2">IV Percentile</h3>
            <p className="text-sm text-[var(--text-muted)] mb-4">
              過去一年中有多少比例的天數 IV 低於當前水平
            </p>
            <div className="bg-[var(--bg-secondary)] rounded-lg p-3 font-mono text-sm text-[var(--accent-gold)] mb-4">
              IV Percentile = 低於當前IV的天數 / 總天數
            </div>
            <p className="text-sm text-[var(--text-secondary)]">
              例如：如果過去 252 個交易日中有 200 天 IV 低於當前水平，則 IV Percentile = 200/252 ≈ 79%
            </p>
          </div>
        </div>
      </section>

      {/* Strategy Selection */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">IV 與策略選擇</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* High IV */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[var(--loss)]/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[var(--loss)]" />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--text-primary)]">高 IV 環境</h3>
                <p className="text-sm text-[var(--text-muted)]">IV Rank &gt; 50%</p>
              </div>
            </div>
            <p className="text-[var(--text-secondary)] mb-4">期權較貴，適合賣出策略</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)]"></div>
                Short Strangle / Short Straddle
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)]"></div>
                Iron Condor / Iron Butterfly
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)]"></div>
                Credit Spread
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)]"></div>
                Covered Call / Cash-Secured Put
              </div>
            </div>
          </div>

          {/* Low IV */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[var(--profit)]/10 flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-[var(--profit)]" />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--text-primary)]">低 IV 環境</h3>
                <p className="text-sm text-[var(--text-muted)]">IV Rank &lt; 30%</p>
              </div>
            </div>
            <p className="text-[var(--text-secondary)] mb-4">期權較便宜，適合買入策略</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)]"></div>
                Long Call / Long Put
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)]"></div>
                Long Straddle / Long Strangle
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)]"></div>
                Debit Spread
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)]"></div>
                Calendar Spread
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IV Events */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">影響 IV 的事件</h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-5">
            <Calendar className="w-8 h-8 text-[var(--accent-gold)] mb-3" />
            <h3 className="font-semibold text-[var(--text-primary)] mb-1">財報發布</h3>
            <p className="text-sm text-[var(--text-secondary)]">
              財報前 IV 通常升高，財報後發生 IV Crush
            </p>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-5">
            <AlertTriangle className="w-8 h-8 text-[var(--accent-gold)] mb-3" />
            <h3 className="font-semibold text-[var(--text-primary)] mb-1">FDA 決定</h3>
            <p className="text-sm text-[var(--text-secondary)]">
              生技股在 FDA 審批前 IV 極高
            </p>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-5">
            <BarChart2 className="w-8 h-8 text-[var(--accent-gold)] mb-3" />
            <h3 className="font-semibold text-[var(--text-primary)] mb-1">宏觀事件</h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Fed 會議、選舉、地緣政治等
            </p>
          </div>
        </div>
      </section>

      {/* IV Crush */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-6">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
            IV Crush - 波動率崩塌
          </h3>
          <p className="text-[var(--text-secondary)] mb-4">
            當不確定性消除後（如財報公布），IV 會急劇下降，這就是 <Term cn="IV Crush" en="IV Crush" highlight />。
            即使股價往預期方向移動，買入的期權也可能因為 IV Crush 而虧損。
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 bg-[var(--bg-primary)]/50 rounded-lg">
              <h4 className="font-medium text-[var(--profit)] mb-2">利用 IV Crush</h4>
              <p className="text-sm text-[var(--text-secondary)]">
                在高 IV 時賣出期權，等 IV Crush 後平倉獲利。常見於財報後。
              </p>
            </div>
            <div className="p-4 bg-[var(--bg-primary)]/50 rounded-lg">
              <h4 className="font-medium text-[var(--loss)] mb-2">避免 IV Crush</h4>
              <p className="text-sm text-[var(--text-secondary)]">
                不要在高 IV 時買入期權賭財報方向，IV Crush 會吃掉大部分利潤。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps - Removed */}
    </div>
  );
}

