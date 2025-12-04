import Link from 'next/link';
import { 
  BookOpen, 
  TrendingUp, 
  BarChart2, 
  Layers,
  ArrowRight,
  Calculator,
  Clock,
  Target,
  Zap
} from 'lucide-react';

const optionsCourses = [
  {
    id: 'basics',
    title: '期權基礎',
    titleEn: 'Options Basics',
    description: '從零開始認識期權，了解 Call 與 Put 的基本概念、期權合約的組成要素，以及期權相較於股票的優勢與風險。',
    href: '/options/basics',
    icon: BookOpen,
    gradient: 'from-emerald-500 to-teal-400',
    topics: [
      '什麼是期權？',
      'Call vs Put 期權',
      '期權合約要素',
      '內在價值與時間價值',
      'ITM / ATM / OTM',
      '期權的槓桿效果',
    ],
    difficulty: '入門',
    duration: '約 30 分鐘',
  },
  {
    id: 'greeks',
    title: '希臘字母',
    titleEn: 'The Greeks',
    description: '深入了解 Delta、Gamma、Theta、Vega、Rho 等希臘字母的含義與實際應用，掌握期權價格變動的關鍵因素。',
    href: '/options/greeks',
    icon: Calculator,
    gradient: 'from-blue-500 to-indigo-400',
    topics: [
      'Delta - 方向性敏感度',
      'Gamma - Delta 的變化率',
      'Theta - 時間衰減',
      'Vega - 波動率敏感度',
      'Rho - 利率敏感度',
      'Greek 的實際應用',
    ],
    difficulty: '中級',
    duration: '約 45 分鐘',
  },
  {
    id: 'strategies',
    title: '期權策略',
    titleEn: 'Options Strategies',
    description: '完整的期權策略庫，從基礎的買賣 Call/Put 到複雜的多腿組合，包含損益圖、使用時機與風險分析。',
    href: '/options/strategies',
    icon: Layers,
    gradient: 'from-amber-500 to-orange-400',
    topics: [
      '基礎策略 (Long/Short Call/Put)',
      '收入策略 (Covered Call, CSP)',
      '價差策略 (Spread)',
      '波動率策略 (Straddle, Strangle)',
      '複合策略 (Iron Condor, Butterfly)',
      '合成部位與進階組合',
    ],
    difficulty: '中級 - 高級',
    duration: '約 2 小時',
    featured: true,
  },
  {
    id: 'iv-analysis',
    title: 'IV 分析',
    titleEn: 'Implied Volatility Analysis',
    description: '學習如何分析隱含波動率，了解 IV Rank、IV Percentile 的含義，以及如何根據 IV 選擇適合的策略。',
    href: '/options/iv-analysis',
    icon: BarChart2,
    gradient: 'from-purple-500 to-pink-400',
    topics: [
      '什麼是隱含波動率？',
      'IV vs 歷史波動率',
      'IV Rank 與 IV Percentile',
      '波動率微笑與偏斜',
      '高 IV vs 低 IV 策略選擇',
      '財報季與 IV 變化',
    ],
    difficulty: '中級',
    duration: '約 40 分鐘',
  },
];

const quickLinks = [
  {
    title: '快速查詢策略',
    description: '直接瀏覽所有期權策略與損益圖',
    href: '/options/strategies',
    icon: Zap,
  },
  {
    title: 'Greek 計算器',
    description: '互動式希臘字母計算工具',
    href: '/options/greeks#calculator',
    icon: Calculator,
  },
  {
    title: 'IV 分析工具',
    description: '了解當前 IV 水平與歷史對比',
    href: '/options/iv-analysis#tool',
    icon: Target,
  },
];

export default function OptionsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-x-hidden">
        <div className="absolute inset-0 dark:bg-gradient-to-br dark:from-amber-500/5 dark:via-transparent dark:to-orange-500/5"></div>
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-amber-500/5 dark:bg-amber-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            {/* Breadcrumb */}
            <nav className="flex items-center justify-center gap-2 text-sm text-[var(--text-muted)] mb-8">
              <Link href="/" className="hover:text-[var(--accent-gold)]">首頁</Link>
              <span>/</span>
              <span className="text-[var(--text-primary)]">期權教學</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-gold)]/10 border border-[var(--accent-gold)]/20 mb-6">
              <Layers className="w-4 h-4 text-[var(--accent-gold)]" />
              <span className="text-sm text-[var(--accent-gold)]">Options Trading</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mb-6">
              期權教學
            </h1>
            
            <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto text-center" style={{ textWrap: 'balance' }}>
              系統性學習期權交易的完整課程，從基礎概念到進階策略，<br className="hidden sm:block" />
              搭配互動式損益圖與實例分析，讓你真正理解期權的運作原理。
            </p>
          </div>
        </div>
      </section>

      {/* Quick Links - Removed */}


      {/* Courses Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-8">
          課程內容
        </h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {optionsCourses.map((course) => (
            <Link
              key={course.id}
              href={course.href}
              className="group relative overflow-hidden rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] p-6 hover:border-[var(--accent-gold)]/50 transition-all hover:shadow-lg hover:-translate-y-1"
            >
              {/* Featured badge - Optional, keep standard size */}
              {course.featured && (
                <div className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] text-xs font-medium border border-[var(--accent-gold)]/20">
                  推薦
                </div>
              )}

              {/* Gradient overlay */}
              <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${course.gradient} opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2`}></div>

              <div className="relative">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${course.gradient} flex items-center justify-center flex-shrink-0`}>
                    <course.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-sm text-[var(--text-muted)]">{course.titleEn}</p>
                  </div>
                </div>

                <p className="text-[var(--text-secondary)] mb-4">
                  {course.description}
                </p>

                {/* Meta info */}
                <div className="flex flex-wrap gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-1 text-[var(--text-muted)]">
                    <Target className="w-4 h-4" />
                    <span>{course.difficulty}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[var(--text-muted)]">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                {/* Topics */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {course.topics.map((topic) => (
                    <div
                      key={topic}
                      className="flex items-center gap-2 text-sm text-[var(--text-muted)]"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)]"></div>
                      {topic}
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-[var(--accent-gold)] font-medium group-hover:gap-3 transition-all">
                  <span>開始學習</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Learning Path */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-8">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">
            建議學習路徑
          </h2>

          <div className="relative">
            {/* Connection line */}
            <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-[var(--border-color)] hidden sm:block"></div>

            <div className="space-y-6">
              {[
                { step: 1, title: '期權基礎', desc: '先了解期權的基本概念與術語' },
                { step: 2, title: '希臘字母', desc: '理解影響期權價格的關鍵因素' },
                { step: 3, title: 'IV 分析', desc: '學會判斷波動率環境' },
                { step: 4, title: '期權策略', desc: '根據市場觀點選擇合適的策略' },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-4 relative">
                  <div className="w-12 h-12 rounded-full bg-[var(--accent-gold)] flex items-center justify-center text-[var(--bg-primary)] font-bold flex-shrink-0 z-10">
                    {item.step}
                  </div>
                  <div className="pt-2">
                    <h3 className="font-semibold text-[var(--text-primary)]">{item.title}</h3>
                    <p className="text-sm text-[var(--text-muted)]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Removed */}
    </div>
  );
}

