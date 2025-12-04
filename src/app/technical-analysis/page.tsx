import Link from 'next/link';
import { 
  LineChart, 
  CandlestickChart, 
  BrainCircuit, 
  Waves,
  Target,
  BarChart3,
  ArrowRight,
  TrendingUp,
  Activity,
  BookOpen
} from 'lucide-react';

const categories = [
  {
    id: 'indicators',
    title: '技術指標',
    titleEn: 'Technical Indicators',
    description: '學習各種技術指標的計算方式、解讀方法與實戰應用',
    href: '/technical-analysis/indicators',
    icon: LineChart,
    gradient: 'from-blue-500 to-cyan-400',
    topics: [
      { name: '移動平均線 (MA)', href: '/technical-analysis/indicators/moving-average' },
      { name: 'KDJ 指標', href: '/technical-analysis/indicators/kdj' },
      { name: 'RSI 相對強弱', href: '/technical-analysis/indicators/rsi' },
      { name: '威廉指標 (%R)', href: '/technical-analysis/indicators/williams-r' },
      { name: '威廉鱷魚', href: '/technical-analysis/indicators/alligator' },
      { name: '布林帶', href: '/technical-analysis/indicators/bollinger' },
      { name: 'ATR 波動率', href: '/technical-analysis/indicators/atr' },
      { name: 'MACD', href: '/technical-analysis/indicators/macd' },
    ],
    status: 'coming-soon',
  },
  {
    id: 'chart-reading',
    title: '圖表判讀',
    titleEn: 'Chart Reading',
    description: '認識不同類型的圖表及其優缺點，掌握正確的閱讀技巧',
    href: '/technical-analysis/chart-reading',
    icon: CandlestickChart,
    gradient: 'from-emerald-500 to-teal-400',
    topics: [
      { name: 'K 線圖基礎', href: '/technical-analysis/chart-reading/candlestick' },
      { name: '點數圖', href: '/technical-analysis/chart-reading/point-figure' },
      { name: '範圍線圖', href: '/technical-analysis/chart-reading/range-bar' },
      { name: 'Y 軸類型 (線性/對數)', href: '/technical-analysis/chart-reading/axis-types' },
      { name: '時間框架選擇', href: '/technical-analysis/chart-reading/timeframes' },
    ],
    status: 'coming-soon',
  },
  {
    id: 'theories',
    title: '理論知識',
    titleEn: 'Trading Theories',
    description: '深入了解經典的技術分析理論，建立完整的分析框架',
    href: '/technical-analysis/theories',
    icon: BrainCircuit,
    gradient: 'from-purple-500 to-pink-400',
    topics: [
      { name: '道氏理論', href: '/technical-analysis/theories/dow-theory' },
      { name: '艾略特波浪', href: '/technical-analysis/theories/elliott-wave' },
      { name: '威科夫理論', href: '/technical-analysis/theories/wyckoff' },
      { name: '江恩理論', href: '/technical-analysis/theories/gann' },
      { name: '訂單流分析', href: '/technical-analysis/theories/order-flow' },
    ],
    status: 'coming-soon',
  },
  {
    id: 'cycle-analysis',
    title: '週期分析',
    titleEn: 'Cycle Analysis',
    description: '探索市場的週期性規律，理解時間因素在分析中的重要性',
    href: '/technical-analysis/cycle-analysis',
    icon: Waves,
    gradient: 'from-amber-500 to-orange-400',
    topics: [
      { name: '循環分析基礎', href: '/technical-analysis/cycle-analysis/basics' },
      { name: '著名市場週期', href: '/technical-analysis/cycle-analysis/famous-cycles' },
      { name: '頻譜分析', href: '/technical-analysis/cycle-analysis/spectral' },
      { name: '序列分析', href: '/technical-analysis/cycle-analysis/sequence' },
    ],
    status: 'coming-soon',
  },
  {
    id: 'patterns',
    title: '形態分析',
    titleEn: 'Pattern Analysis',
    description: '識別價格圖表中的形態，預測可能的價格走勢',
    href: '/technical-analysis/patterns',
    icon: Target,
    gradient: 'from-rose-500 to-red-400',
    topics: [
      { name: '反轉型態', href: '/technical-analysis/patterns/reversal' },
      { name: '持續型態', href: '/technical-analysis/patterns/continuation' },
      { name: '諧波型態', href: '/technical-analysis/patterns/harmonic' },
    ],
    status: 'coming-soon',
  },
  {
    id: 'candlestick-patterns',
    title: 'K 線型態',
    titleEn: 'Candlestick Patterns',
    description: '學習解讀 K 線組合，掌握市場情緒的變化',
    href: '/technical-analysis/candlestick-patterns',
    icon: BarChart3,
    gradient: 'from-indigo-500 to-violet-400',
    topics: [
      { name: 'K 線基礎教學', href: '/technical-analysis/candlestick-patterns/basics' },
      { name: '單根 K 線型態', href: '/technical-analysis/candlestick-patterns/single' },
      { name: '組合 K 線型態', href: '/technical-analysis/candlestick-patterns/combinations' },
    ],
    status: 'coming-soon',
  },
  {
    id: 'behavioral-finance',
    title: '行為金融學',
    titleEn: 'Behavioral Finance',
    description: '了解心理偏誤如何影響交易決策，認識市場情緒的運作',
    href: '/technical-analysis/behavioral-finance',
    icon: Activity,
    gradient: 'from-cyan-500 to-blue-400',
    topics: [
      { name: '認知偏誤', href: '/technical-analysis/behavioral-finance/cognitive-bias' },
      { name: '市場情緒', href: '/technical-analysis/behavioral-finance/market-sentiment' },
      { name: '群體行為', href: '/technical-analysis/behavioral-finance/crowd-behavior' },
    ],
    status: 'coming-soon',
  },
];

export default function TechnicalAnalysisPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-x-hidden">
        <div className="absolute inset-0 dark:bg-gradient-to-br dark:from-blue-500/5 dark:via-transparent dark:to-cyan-500/5"></div>
        <div className="absolute top-20 right-1/4 w-72 h-72 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          {/* Breadcrumb - Centered */}
          <nav className="flex items-center justify-center gap-2 text-sm text-[var(--text-muted)] mb-8">
            <Link href="/" className="hover:text-[var(--accent-gold)]">首頁</Link>
            <span>/</span>
            <span className="text-[var(--text-primary)]">技術分析</span>
          </nav>

          <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-400">Technical Analysis</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mb-6 text-center w-full">
              技術分析教學
            </h1>
            
            <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto text-center w-full" style={{ textWrap: 'balance' }}>
              從基礎指標到進階理論，系統性學習技術分析的完整知識體系。掌握圖表判讀、形態識別與週期分析，建立專業的市場分析能力。
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative overflow-hidden rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[var(--border-light)] transition-all hover:shadow-lg hover:-translate-y-1"
            >
              {/* Status badge */}
              {category.status === 'coming-soon' && (
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[var(--bg-secondary)] text-[var(--text-muted)] text-xs">
                  即將推出
                </div>
              )}

              {/* Gradient overlay */}
              <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${category.gradient} opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2`}></div>

              <div className="relative p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center flex-shrink-0`}>
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[var(--text-primary)]">
                      {category.title}
                    </h3>
                    <p className="text-sm text-[var(--text-muted)]">{category.titleEn}</p>
                  </div>
                </div>

                <p className="text-[var(--text-secondary)] mb-4">
                  {category.description}
                </p>

                {/* Topics list */}
                <div className="space-y-2 mb-4">
                  {category.topics.slice(0, 4).map((topic) => (
                    <Link
                      key={topic.href}
                      href={topic.href}
                      className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent-gold)] transition-colors"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--border-light)]"></div>
                      {topic.name}
                    </Link>
                  ))}
                  {category.topics.length > 4 && (
                    <span className="text-xs text-[var(--text-muted)]">
                      還有 {category.topics.length - 4} 個主題...
                    </span>
                  )}
                </div>

                <Link
                  href={category.href}
                  className="inline-flex items-center gap-2 text-[var(--accent-gold)] font-medium hover:gap-3 transition-all"
                >
                  <span>查看全部</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Learning Path */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-6 h-6 text-[var(--accent-gold)]" />
            <h2 className="text-xl font-bold text-[var(--text-primary)]">
              建議學習路徑
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { step: 1, title: '圖表基礎', desc: '學習 K 線圖的基本判讀', category: 'chart-reading' },
              { step: 2, title: '技術指標', desc: '掌握常用指標的應用', category: 'indicators' },
              { step: 3, title: '形態分析', desc: '識別價格形態與 K 線組合', category: 'patterns' },
              { step: 4, title: '理論框架', desc: '建立完整的分析體系', category: 'theories' },
            ].map((item) => (
              <div key={item.step} className="relative p-4 bg-[var(--bg-secondary)] rounded-xl">
                <div className="w-8 h-8 rounded-full bg-[var(--accent-gold)] flex items-center justify-center text-[var(--bg-primary)] font-bold text-sm mb-3">
                  {item.step}
                </div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-1">{item.title}</h3>
                <p className="text-sm text-[var(--text-muted)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Removed */}
    </div>
  );
}

