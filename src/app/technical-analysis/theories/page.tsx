import Link from 'next/link';
import { ArrowLeft, BrainCircuit, BookOpen, ArrowRight } from 'lucide-react';

const theories = [
  {
    id: 'dow-theory',
    name: '道氏理論',
    nameEn: 'Dow Theory',
    description: '技術分析的奠基石，由查爾斯·道創立。定義了趨勢的三種類型（主要、次要、短期）和六大基本原則。',
    keyPoints: [
      '市場反映一切信息',
      '市場有三種趨勢',
      '主要趨勢有三個階段',
      '平均指數必須相互確認',
      '成交量必須確認趨勢',
      '趨勢持續到明確反轉',
    ],
    gradient: 'from-blue-500 to-indigo-400',
  },
  {
    id: 'elliott-wave',
    name: '艾略特波浪理論',
    nameEn: 'Elliott Wave Theory',
    description: '由拉爾夫·艾略特發現的市場周期理論，認為市場以 5 浪推動、3 浪調整的模式運行。',
    keyPoints: [
      '推動浪（1-2-3-4-5）',
      '調整浪（A-B-C）',
      '浪的層級嵌套',
      '費波納契比例關係',
      '浪的規則與指引',
      '複雜調整形態',
    ],
    gradient: 'from-purple-500 to-pink-400',
  },
  {
    id: 'wyckoff',
    name: '威科夫理論',
    nameEn: 'Wyckoff Method',
    description: '由理查德·威科夫創立，強調通過分析價格和成交量來理解大資金的行為。',
    keyPoints: [
      '供需法則',
      '因果法則',
      '努力與結果法則',
      '吸籌階段 (Accumulation)',
      '派發階段 (Distribution)',
      '複合人 (Composite Man)',
    ],
    gradient: 'from-emerald-500 to-teal-400',
  },
  {
    id: 'gann',
    name: '江恩理論',
    nameEn: 'Gann Theory',
    description: '威廉·江恩結合幾何、數學和占星術發展出的獨特分析方法，強調時間和價格的關係。',
    keyPoints: [
      '江恩角度線',
      '江恩方格',
      '時間循環',
      '自然法則',
      '價格與時間平方',
      '重要數字：7、12、144',
    ],
    gradient: 'from-amber-500 to-orange-400',
  },
  {
    id: 'order-flow',
    name: '訂單流分析',
    nameEn: 'Order Flow Analysis',
    description: '通過分析實際的買賣訂單流來理解市場微觀結構和短期價格行為。',
    keyPoints: [
      'DOM（深度報價）',
      '成交量分佈 (Volume Profile)',
      'Delta（買賣差）',
      '大單追蹤',
      '吸收與推動',
      'POC（成交密集區）',
    ],
    gradient: 'from-cyan-500 to-blue-400',
  },
];

export default function TheoriesPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative overflow-x-hidden border-b border-[var(--border-color)]">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6">
            <Link href="/" className="hover:text-[var(--accent-gold)]">首頁</Link>
            <span>/</span>
            <Link href="/technical-analysis" className="hover:text-[var(--accent-gold)]">技術分析</Link>
            <span>/</span>
            <span className="text-[var(--text-primary)]">理論知識</span>
          </nav>

          <Link
            href="/technical-analysis"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent-gold)] mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            返回技術分析
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-400 flex items-center justify-center">
              <BrainCircuit className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[var(--text-primary)]">理論知識</h1>
              <p className="text-[var(--text-muted)]">Trading Theories</p>
            </div>
          </div>
          
          <p className="text-lg text-[var(--text-secondary)] max-w-3xl">
            這些經典的技術分析理論為我們提供了理解市場行為的框架。
            每種理論都有其獨特的視角和方法論，學習它們有助於建立完整的分析體系。
          </p>
        </div>
      </section>

      {/* Theories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {theories.map((theory) => (
            <div
              key={theory.id}
              className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden"
            >
              <div className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                  {/* Icon & Title */}
                  <div className="flex items-start gap-4 sm:w-1/3">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${theory.gradient} flex items-center justify-center flex-shrink-0`}>
                      <BookOpen className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[var(--text-primary)]">{theory.name}</h3>
                      <p className="text-sm text-[var(--text-muted)]">{theory.nameEn}</p>
                    </div>
                  </div>
                  
                  {/* Description & Key Points */}
                  <div className="sm:w-2/3">
                    <p className="text-[var(--text-secondary)] mb-4">{theory.description}</p>
                    
                    <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-3">核心概念</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {theory.keyPoints.map((point, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                          <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)]"></div>
                          {point}
                        </div>
                      ))}
                    </div>
                    
                    <Link
                      href={`/technical-analysis/theories/${theory.id}`}
                      className="inline-flex items-center gap-2 mt-4 text-[var(--accent-gold)] text-sm font-medium hover:gap-3 transition-all"
                    >
                      深入學習 <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Learning Tips */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-6">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">學習建議</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 bg-[var(--bg-primary)]/50 rounded-lg">
              <h4 className="font-medium text-[var(--accent-gold)] mb-2">循序漸進</h4>
              <p className="text-sm text-[var(--text-secondary)]">
                建議先從道氏理論開始，它是所有技術分析的基礎。然後根據興趣選擇深入學習其他理論。
              </p>
            </div>
            <div className="p-4 bg-[var(--bg-primary)]/50 rounded-lg">
              <h4 className="font-medium text-[var(--accent-gold)] mb-2">理論結合實踐</h4>
              <p className="text-sm text-[var(--text-secondary)]">
                每學完一個理論，都應該在實際圖表上練習識別和應用，加深理解。
              </p>
            </div>
            <div className="p-4 bg-[var(--bg-primary)]/50 rounded-lg">
              <h4 className="font-medium text-[var(--accent-gold)] mb-2">融會貫通</h4>
              <p className="text-sm text-[var(--text-secondary)]">
                不同理論之間有很多相通之處，嘗試找到它們的共同點會幫助你建立更完整的分析框架。
              </p>
            </div>
            <div className="p-4 bg-[var(--bg-primary)]/50 rounded-lg">
              <h4 className="font-medium text-[var(--accent-gold)] mb-2">保持開放</h4>
              <p className="text-sm text-[var(--text-secondary)]">
                沒有任何理論是完美的，每種方法都有其局限性。保持批判性思維，找到適合自己的分析方法。
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

