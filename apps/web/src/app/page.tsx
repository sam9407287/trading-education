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
  Activity,
  Smartphone,
  Download,
  Share2,
  Plus,
  ExternalLink,
  FileText
} from 'lucide-react';
import fs from 'fs';
import path from 'path';

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

// 獲取學習筆記書籍
function getReadingNotes() {
  try {
    const contentPath = path.join(process.cwd(), 'src/content/reading-notes');
    const books = fs.readdirSync(contentPath)
      .filter(item => {
        const fullPath = path.join(contentPath, item);
        return fs.statSync(fullPath).isDirectory() && !item.startsWith('.');
      })
      .map(bookId => {
        const bookPath = path.join(contentPath, bookId);
        const chapters = fs.readdirSync(bookPath).filter(file => file.endsWith('.md'));
        
        return {
          title: bookId,
          titleEn: 'Reading Notes',
          href: `/reading-notes/${encodeURIComponent(bookId)}`,
          icon: FileText,
          description: `${chapters.length} 個章節`,
        };
      });
    
    return books;
  } catch (error) {
    return [];
  }
}

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
      className="group bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 hover:border-[var(--accent-gold)]/50 transition-all animate-fade-in card-hover active:scale-95"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--accent-gold)] group-hover:bg-[var(--accent-gold)] group-hover:text-[var(--bg-primary)] transition-all flex-shrink-0">
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors text-sm sm:text-base md:text-lg mb-1">
            {title}
          </h3>
          <p className="text-xs text-[var(--text-muted)] mb-2">{titleEn}</p>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] line-clamp-2 leading-relaxed">{description}</p>
        </div>
      </div>
    </Link>
  );
}

export default function HomePage() {
  const readingNotes = getReadingNotes();
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-x-hidden bg-gradient-to-br from-orange-50/30 via-amber-50/20 to-yellow-50/30 dark:from-[var(--bg-primary)] dark:via-[var(--bg-secondary)] dark:to-[var(--bg-primary)]">
        {/* Background Effects */}
        <div className="absolute top-0 left-1/4 w-48 sm:w-64 md:w-80 lg:w-96 h-48 sm:h-64 md:h-80 lg:h-96 bg-amber-400/10 dark:bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-48 sm:w-64 md:w-80 lg:w-96 h-48 sm:h-64 md:h-80 lg:h-96 bg-orange-400/10 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 lg:py-28">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[var(--accent-gold)]/10 border border-[var(--accent-gold)]/20 mb-6 sm:mb-8">
              <Sparkles className="w-4 h-4 text-[var(--accent-gold)]" />
              <span className="text-xs sm:text-sm font-medium text-[var(--accent-gold)]">專業交易知識平台</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight sm:leading-relaxed px-4">
              <span className="block text-[var(--text-primary)] mb-2 sm:mb-0">建立你的</span>
              <span className="block sm:inline text-[var(--accent-gold)]">交易知識體系</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Technical Analysis Section */}
      <section className="max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="flex-1">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[var(--text-primary)]">技術分析課程</h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5 sm:mt-1">Technical Analysis Courses</p>
          </div>
          <Link
            href="/technical-analysis"
            className="text-xs sm:text-sm text-[var(--accent-gold)] hover:underline flex items-center gap-1 flex-shrink-0"
          >
            <span className="hidden sm:inline">查看全部</span>
            <span className="sm:hidden">全部</span>
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {technicalSubCategories.map((sub, index) => (
            <CourseCard key={sub.href} {...sub} index={index} />
          ))}
        </div>
      </section>

      {/* Options Section */}
      <section className="max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="flex-1">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[var(--text-primary)]">期權教學課程</h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5 sm:mt-1">Options Trading Courses</p>
          </div>
          <Link
            href="/options"
            className="text-xs sm:text-sm text-[var(--accent-gold)] hover:underline flex items-center gap-1 flex-shrink-0"
          >
            <span className="hidden sm:inline">查看全部</span>
            <span className="sm:hidden">全部</span>
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {optionsSubCategories.map((sub, index) => (
            <CourseCard key={sub.href} {...sub} index={index} />
          ))}
        </div>
      </section>

      {/* Reading Notes Section */}
      {readingNotes.length > 0 && (
        <section className="max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div className="flex-1">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[var(--text-primary)]">學習筆記</h2>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5 sm:mt-1">Reading Notes</p>
            </div>
            <Link
              href="/reading-notes"
              className="text-xs sm:text-sm text-[var(--accent-gold)] hover:underline flex items-center gap-1 flex-shrink-0"
            >
              <span className="hidden sm:inline">查看全部</span>
              <span className="sm:hidden">全部</span>
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {readingNotes.map((note, index) => (
              <CourseCard key={note.href} {...note} index={index} />
            ))}
          </div>
        </section>
      )}

      {/* Download App Section */}
      <section className="border-t border-[var(--border-color)] bg-gradient-to-b from-transparent to-[var(--bg-secondary)]/30">
        <div className="max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
          <div className="text-center mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--accent-gold)]/10 border border-[var(--accent-gold)]/20 mb-4">
              <Smartphone className="w-4 h-4 text-[var(--accent-gold)]" />
              <span className="text-xs sm:text-sm font-medium text-[var(--accent-gold)]">行動應用</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-3">
              📱 下載行動應用
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-xl mx-auto">
              隨時隨地學習交易知識，支援離線閱讀
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full">
            {/* Android Download */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center hover:border-[var(--accent-green)]/50 transition-all">
              <h3 className="font-bold text-2xl sm:text-3xl md:text-4xl text-[var(--accent-green)] mb-3">Android</h3>
              <p className="text-sm sm:text-base text-[var(--text-muted)] mb-5 sm:mb-6">APK 直接安裝，無需商店</p>
              <a 
                href="/downloads/trading-education.apk"
                download="trading-education.apk"
                className="inline-flex items-center gap-2 bg-[var(--accent-green)] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium hover:opacity-90 transition-opacity text-base sm:text-lg"
              >
                <Download className="w-5 h-5 sm:w-6 sm:h-6" />
                下載 APK
              </a>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-4 sm:mt-5">
                版本 1.0.0 · 約 79MB
              </p>
            </div>

            {/* iOS Instructions */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center">
              <h3 className="font-bold text-2xl sm:text-3xl md:text-4xl text-blue-400 mb-3">iOS</h3>
              <p className="text-sm sm:text-base text-[var(--text-muted)] mb-5 sm:mb-6">使用 PWA 添加到主畫面</p>
              
              <div className="bg-[var(--bg-secondary)] rounded-lg p-4 text-left mb-4">
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-3">
                  由於 Apple 政策，iOS 無法直接下載安裝 App。<br/>
                  請使用以下方式：
                </p>
                <ol className="text-sm sm:text-base text-[var(--text-secondary)] space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0 text-xs sm:text-sm font-medium">1</span>
                    <span>使用 <strong className="text-[var(--text-primary)]">Safari</strong> 開啟此網站</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0 text-xs sm:text-sm font-medium">2</span>
                    <span>點擊底部 <Share2 className="w-4 h-4 inline text-blue-400" /> 分享按鈕</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0 text-xs sm:text-sm font-medium">3</span>
                    <span>選擇「<Plus className="w-4 h-4 inline text-blue-400" /> 加入主畫面」</span>
                  </li>
                </ol>
              </div>
              
              <p className="text-xs sm:text-sm text-[var(--text-muted)]">
                📌 PWA 支援離線使用，體驗與 App 相同
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
