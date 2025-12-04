import Link from 'next/link';
import { 
  TrendingUp, 
  BarChart3, 
  LineChart, 
  CandlestickChart,
  BrainCircuit,
  Waves,
  Target,
  Layers,
  ArrowRight,
  Sparkles,
  BookOpen,
  Calculator,
  Activity
} from 'lucide-react';

// 技術分析子分類
const technicalSubCategories = [
  {
    title: '技術指標',
    titleEn: 'Indicators',
    href: '/technical-analysis/indicators',
    icon: LineChart,
    description: '均線、KDJ、RSI、布林帶、ATR 等',
  },
  {
    title: '圖表判讀',
    titleEn: 'Chart Reading',
    href: '/technical-analysis/chart-reading',
    icon: CandlestickChart,
    description: 'K線圖、點數圖、範圍線、Y軸類型',
  },
  {
    title: '理論知識',
    titleEn: 'Theories',
    href: '/technical-analysis/theories',
    icon: BrainCircuit,
    description: '道氏理論、艾略特波浪、威科夫、江恩',
  },
  {
    title: '週期分析',
    titleEn: 'Cycle Analysis',
    href: '/technical-analysis/cycle-analysis',
    icon: Waves,
    description: '循環分析、頻譜圖、序列分析',
  },
  {
    title: '形態分析',
    titleEn: 'Pattern Analysis',
    href: '/technical-analysis/patterns',
    icon: Target,
    description: '反轉型態、持續型態、諧波型態',
  },
  {
    title: 'K線型態',
    titleEn: 'Candlestick Patterns',
    href: '/technical-analysis/candlestick-patterns',
    icon: BarChart3,
    description: 'K線基礎、單根K線、組合型態',
  },
  {
    title: '行為金融學',
    titleEn: 'Behavioral Finance',
    href: '/technical-analysis/behavioral-finance',
    icon: Activity,
    description: '認知偏誤、市場情緒、群體行為',
  },
];

// 期權子分類
const optionsSubCategories = [
  {
    title: '期權基礎',
    titleEn: 'Options Basics',
    href: '/options/basics',
    icon: BookOpen,
    description: '認識期權的基本概念與運作原理',
  },
  {
    title: '希臘字母',
    titleEn: 'The Greeks',
    href: '/options/greeks',
    icon: Calculator,
    description: 'Delta、Gamma、Theta、Vega、Rho',
  },
  {
    title: '期權策略',
    titleEn: 'Strategies',
    href: '/options/strategies',
    icon: Layers,
    description: '從基礎到進階的完整策略庫',
  },
  {
    title: 'IV 分析',
    titleEn: 'IV Analysis',
    href: '/options/iv-analysis',
    icon: BarChart3,
    description: '隱含波動率的應用與時機判斷',
  },
];

// 課程卡片組件
function CourseCard({ 
  title, 
  titleEn, 
  href, 
  icon: Icon, 
  description,
  index 
}: {
  title: string;
  titleEn: string;
  href: string;
  icon: React.ElementType;
  description: string;
  index: number;
}) {
  return (
    <Link
      href={href}
      className="group bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4 sm:p-5 hover:border-[var(--accent-gold)]/50 transition-all animate-fade-in card-hover"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--accent-gold)] group-hover:bg-[var(--accent-gold)] group-hover:text-[var(--bg-primary)] transition-all flex-shrink-0">
          <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors text-sm sm:text-base">
            {title}
          </h3>
          <p className="text-xs text-[var(--text-muted)] mb-1">{titleEn}</p>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] line-clamp-2">{description}</p>
        </div>
      </div>
    </Link>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-x-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 dark:bg-gradient-to-br dark:from-[var(--bg-primary)] dark:via-[var(--bg-secondary)] dark:to-[var(--bg-primary)]"></div>
        <div className="absolute top-0 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-amber-500/5 dark:bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-28">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[var(--accent-gold)]/10 border border-[var(--accent-gold)]/20 mb-4 sm:mb-6">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-[var(--accent-gold)]" />
              <span className="text-xs sm:text-sm text-[var(--accent-gold)]">專業交易知識平台</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12 leading-relaxed text-center w-full">
              <span className="text-[var(--text-primary)]">建立你的</span>
              <br className="sm:hidden" />
              <span className="text-[var(--accent-gold)]">交易知識體系</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Technical Analysis Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">技術分析課程</h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">Technical Analysis Courses</p>
          </div>
          <Link
            href="/technical-analysis"
            className="text-xs sm:text-sm text-[var(--accent-gold)] hover:underline flex items-center gap-1"
          >
            查看全部 <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {technicalSubCategories.map((sub, index) => (
            <CourseCard key={sub.href} {...sub} index={index} />
          ))}
        </div>
      </section>

      {/* Options Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">期權教學課程</h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">Options Trading Courses</p>
          </div>
          <Link
            href="/options"
            className="text-xs sm:text-sm text-[var(--accent-gold)] hover:underline flex items-center gap-1"
          >
            查看全部 <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {optionsSubCategories.map((sub, index) => (
            <CourseCard key={sub.href} {...sub} index={index} />
          ))}
        </div>
      </section>

      {/* CTA Section - Removed */}
    </div>
  );
}
