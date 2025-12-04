import Link from 'next/link';
import { ArrowLeft, BookOpen, ArrowRight, TrendingUp, TrendingDown, DollarSign, Clock, Target } from 'lucide-react';
import Term from '@/components/ui/Term';

export default function OptionsBasicsPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative overflow-x-hidden border-b border-[var(--border-color)]">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6">
            <Link href="/" className="hover:text-[var(--accent-gold)]">首頁</Link>
            <span>/</span>
            <Link href="/options" className="hover:text-[var(--accent-gold)]">期權教學</Link>
            <span>/</span>
            <span className="text-[var(--text-primary)]">期權基礎</span>
          </nav>

          <Link
            href="/options"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent-gold)] mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            返回期權教學
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[var(--text-primary)]">期權基礎</h1>
              <p className="text-[var(--text-muted)]">Options Basics</p>
            </div>
          </div>
          
          <p className="text-lg text-[var(--text-secondary)] max-w-3xl">
            期權是一種衍生性金融商品，賦予持有人在特定時間以特定價格買入或賣出標的資產的權利。
          </p>
        </div>
      </section>

      {/* What is an Option */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">什麼是期權？</h2>
        
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-6 mb-8">
          <p className="text-[var(--text-secondary)] leading-relaxed">
            <Term cn="期權" en="Option" highlight /> 是一種合約，賦予買方在約定的到期日前，
            以約定的 <Term cn="行權價" en="Strike Price" /> 買入或賣出標的資產的<strong>權利</strong>，
            但<strong>沒有義務</strong>。買方需支付 <Term cn="權利金" en="Premium" /> 給賣方來獲得這個權利。
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Call Option */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[var(--profit)]/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[var(--profit)]" />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--text-primary)]">看漲期權</h3>
                <p className="text-sm text-[var(--text-muted)]">Call Option</p>
              </div>
            </div>
            <p className="text-[var(--text-secondary)] mb-4">
              賦予持有人以行權價<strong>買入</strong>標的資產的權利。
              當你預期股價會上漲時購買 Call。
            </p>
            <div className="bg-[var(--bg-secondary)] rounded-lg p-3 text-sm text-[var(--text-muted)]">
              <strong className="text-[var(--profit)]">買方</strong>：支付權利金，獲得買入權利<br/>
              <strong className="text-[var(--loss)]">賣方</strong>：收取權利金，承擔賣出義務
            </div>
          </div>

          {/* Put Option */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[var(--loss)]/10 flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-[var(--loss)]" />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--text-primary)]">看跌期權</h3>
                <p className="text-sm text-[var(--text-muted)]">Put Option</p>
              </div>
            </div>
            <p className="text-[var(--text-secondary)] mb-4">
              賦予持有人以行權價<strong>賣出</strong>標的資產的權利。
              當你預期股價會下跌時購買 Put。
            </p>
            <div className="bg-[var(--bg-secondary)] rounded-lg p-3 text-sm text-[var(--text-muted)]">
              <strong className="text-[var(--profit)]">買方</strong>：支付權利金，獲得賣出權利<br/>
              <strong className="text-[var(--loss)]">賣方</strong>：收取權利金，承擔買入義務
            </div>
          </div>
        </div>
      </section>

      {/* Option Components */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">期權合約要素</h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-5">
            <Target className="w-8 h-8 text-[var(--accent-gold)] mb-3" />
            <h3 className="font-semibold text-[var(--text-primary)] mb-1">行權價格</h3>
            <p className="text-xs text-[var(--text-muted)] mb-2">Strike Price</p>
            <p className="text-sm text-[var(--text-secondary)]">
              買賣標的資產的約定價格。決定期權是 ITM、ATM 還是 OTM。
            </p>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-5">
            <Clock className="w-8 h-8 text-[var(--accent-gold)] mb-3" />
            <h3 className="font-semibold text-[var(--text-primary)] mb-1">到期日</h3>
            <p className="text-xs text-[var(--text-muted)] mb-2">Expiration Date</p>
            <p className="text-sm text-[var(--text-secondary)]">
              期權合約的最後有效日期。到期後期權失效。
            </p>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-5">
            <DollarSign className="w-8 h-8 text-[var(--accent-gold)] mb-3" />
            <h3 className="font-semibold text-[var(--text-primary)] mb-1">權利金</h3>
            <p className="text-xs text-[var(--text-muted)] mb-2">Premium</p>
            <p className="text-sm text-[var(--text-secondary)]">
              購買期權需支付的費用。由內在價值和時間價值組成。
            </p>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-5">
            <div className="w-8 h-8 rounded-full bg-[var(--accent-gold)] text-[var(--bg-primary)] flex items-center justify-center font-bold mb-3">
              100
            </div>
            <h3 className="font-semibold text-[var(--text-primary)] mb-1">合約單位</h3>
            <p className="text-xs text-[var(--text-muted)] mb-2">Contract Size</p>
            <p className="text-sm text-[var(--text-secondary)]">
              美股期權每張合約代表 100 股標的股票。
            </p>
          </div>
        </div>
      </section>

      {/* Moneyness */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
          價內/價平/價外 (ITM/ATM/OTM)
        </h2>
        
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[var(--bg-secondary)]">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--text-primary)]">狀態</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--text-primary)]">Call 條件</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--text-primary)]">Put 條件</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--text-primary)]">說明</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-color)]">
                <tr>
                  <td className="px-6 py-4">
                    <span className="font-medium text-[var(--profit)]">ITM (價內)</span>
                    <br />
                    <span className="text-xs text-[var(--text-muted)]">In The Money</span>
                  </td>
                  <td className="px-6 py-4 text-[var(--text-secondary)]">股價 &gt; 行權價</td>
                  <td className="px-6 py-4 text-[var(--text-secondary)]">股價 &lt; 行權價</td>
                  <td className="px-6 py-4 text-[var(--text-muted)] text-sm">有內在價值，立即行權有利可圖</td>
                </tr>
                <tr>
                  <td className="px-6 py-4">
                    <span className="font-medium text-[var(--accent-gold)]">ATM (價平)</span>
                    <br />
                    <span className="text-xs text-[var(--text-muted)]">At The Money</span>
                  </td>
                  <td className="px-6 py-4 text-[var(--text-secondary)]">股價 ≈ 行權價</td>
                  <td className="px-6 py-4 text-[var(--text-secondary)]">股價 ≈ 行權價</td>
                  <td className="px-6 py-4 text-[var(--text-muted)] text-sm">Gamma 和時間價值最高</td>
                </tr>
                <tr>
                  <td className="px-6 py-4">
                    <span className="font-medium text-[var(--loss)]">OTM (價外)</span>
                    <br />
                    <span className="text-xs text-[var(--text-muted)]">Out of The Money</span>
                  </td>
                  <td className="px-6 py-4 text-[var(--text-secondary)]">股價 &lt; 行權價</td>
                  <td className="px-6 py-4 text-[var(--text-secondary)]">股價 &gt; 行權價</td>
                  <td className="px-6 py-4 text-[var(--text-muted)] text-sm">沒有內在價值，只有時間價值</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Intrinsic vs Time Value */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">內在價值與時間價值</h2>
        
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-6">
          <div className="text-center mb-6 p-4 bg-[var(--bg-secondary)] rounded-lg">
            <p className="text-lg font-mono text-[var(--accent-gold)]">
              期權價格 = 內在價值 + 時間價值
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-3">
                內在價值 <span className="text-[var(--text-muted)] font-normal">(Intrinsic Value)</span>
              </h3>
              <ul className="space-y-2 text-[var(--text-secondary)]">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] mt-2"></div>
                  如果立即行權可以獲得的價值
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] mt-2"></div>
                  Call: Max(0, 股價 - 行權價)
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] mt-2"></div>
                  Put: Max(0, 行權價 - 股價)
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] mt-2"></div>
                  OTM 期權的內在價值為 0
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-3">
                時間價值 <span className="text-[var(--text-muted)] font-normal">(Time Value)</span>
              </h3>
              <ul className="space-y-2 text-[var(--text-secondary)]">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] mt-2"></div>
                  因為還有時間可能變成 ITM 而存在的價值
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] mt-2"></div>
                  隨時間流逝而衰減（Theta 衰減）
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] mt-2"></div>
                  ATM 期權的時間價值最高
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] mt-2"></div>
                  受波動率影響較大
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps - Removed */}
    </div>
  );
}

