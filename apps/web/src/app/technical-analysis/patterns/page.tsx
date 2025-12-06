import Link from 'next/link';
import { 
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Activity,
  Zap,
  Target,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

const patternCategories = [
  {
    id: 'reversal',
    title: '反轉型態',
    titleEn: 'Reversal Patterns',
    description: '形成於穩定趨勢之後，標誌著趨勢的反轉。這些型態是趨勢轉換的早期信號。',
    href: '/technical-analysis/patterns/reversal',
    icon: Activity,
    gradient: 'from-purple-500 to-pink-400',
    patterns: [
      '頭肩頂/頭肩底',
      '雙重頂/雙重底',
      '對稱三角形（反轉）',
      '上升/下降三角形（反轉）',
    ],
    count: 7,
  },
  {
    id: 'continuation',
    title: '連續型態',
    titleEn: 'Continuation Patterns',
    description: '暫時中斷現有趨勢，在型態完成後預測趨勢將繼續發展。是趨勢中的休息站。',
    href: '/technical-analysis/patterns/continuation',
    icon: TrendingUp,
    gradient: 'from-emerald-500 to-teal-400',
    patterns: [
      '對稱三角形（連續）',
      '上升/下降三角形（連續）',
      '矩形',
      '杯柄型態',
    ],
    count: 5,
  },
  {
    id: 'short-term',
    title: '短期型態',
    titleEn: 'Short-term Patterns',
    description: '在急劇走勢後快速形成的小型型態，持續時間短但可靠性高。適合短線交易。',
    href: '/technical-analysis/patterns/short-term',
    icon: Zap,
    gradient: 'from-amber-500 to-orange-400',
    patterns: [
      '牛市/熊市旗型',
      '牛市/熊市三角旗型',
    ],
    count: 4,
  },
];

const theoryCards = [
  {
    title: '支撐與阻力',
    titleEn: 'Support and Resistance',
    icon: Target,
    description: '支撐是買盤活動足以阻止價格下跌的價格範圍，阻力是賣壓足以阻止價格上漲的價格範圍。',
    keyPoints: [
      '支撐 = 需求區，阻力 = 供應區',
      '極性轉換原則：支撐被跌破變阻力，反之亦然',
      '測試次數越多，該水平越重要',
      '突破後的回測驗證極性轉換',
    ],
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
  },
  {
    title: '行為與情緒',
    titleEn: 'Behavior and Emotions',
    icon: Activity,
    description: '圖表型態背後是群眾心理和情緒。恐懼與貪婪驅動價格變動，心理錨定使特定價位變得重要。',
    keyPoints: [
      '心理錨定：市場記住先前的價格水平',
      '恐懼與貪婪是主導情緒',
      '群體行為在一定程度上可預測',
      '盤整 = 猶豫不決，突破 = 共識達成',
    ],
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
  },
  {
    title: '成交量分析',
    titleEn: 'Volume Analysis',
    icon: TrendingDown,
    description: '成交量是確認圖表型態的關鍵因素。不同型態有不同的成交量特徵，理解這些差異能提高判斷準確性。',
    keyPoints: [
      '頂部型態：向下突破可以低量',
      '底部型態：向上突破必須放量',
      '型態形成中：成交量通常遞減',
      '突破確認：成交量激增',
    ],
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
  },
];

const identificationGuide = [
  {
    step: '1',
    title: '確認現有趨勢',
    description: '反轉型態需要先有明確的趨勢。判斷趨勢的方向、強度和持續時間。',
    icon: CheckCircle2,
  },
  {
    step: '2',
    title: '識別關鍵點位',
    description: '找出支撐和阻力位、高點和低點、趨勢線等關鍵技術水平。',
    icon: Target,
  },
  {
    step: '3',
    title: '觀察型態形成',
    description: '等待至少 4 個轉折點（三角形）或明確的肩部結構（頭肩型態）。',
    icon: Activity,
  },
  {
    step: '4',
    title: '分析成交量',
    description: '檢查成交量是否符合該型態的典型特徵。成交量是確認的關鍵。',
    icon: TrendingUp,
  },
  {
    step: '5',
    title: '等待突破確認',
    description: '型態未完成前不要交易。等待價格突破關鍵水平並收盤確認。',
    icon: Zap,
  },
  {
    step: '6',
    title: '考慮回測',
    description: '突破後常有回測動作，這是極性轉換原則的驗證，也是加碼的機會。',
    icon: AlertCircle,
  },
];

export default function PatternsPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-primary)] border-b border-[var(--border-color)] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5"></div>
        
        <div className="relative max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6">
            <Link href="/" className="hover:text-[var(--accent-gold)]">首頁</Link>
            <span>/</span>
            <Link href="/technical-analysis" className="hover:text-[var(--accent-gold)]">技術分析</Link>
            <span>/</span>
            <span className="text-[var(--text-primary)]">形態分析</span>
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
              <Activity className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[var(--text-primary)]">形態分析</h1>
              <p className="text-[var(--text-muted)]">Chart Patterns</p>
            </div>
          </div>
          
          <p className="text-lg text-[var(--text-secondary)] max-w-3xl leading-relaxed">
            經典圖表型態是技術分析的基石。通過識別價格形成的特定結構，
            我們可以預測未來的價格走勢。這些型態背後是群眾心理和市場行為的體現，
            經過數十年的實戰驗證，具有很高的可靠性。
          </p>
        </div>
      </section>

      {/* 理論基礎 */}
      <section className="max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-6 h-6 text-[var(--accent-gold)]" />
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">核心理論</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {theoryCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-6 hover:border-[var(--accent-gold)]/30 transition-colors"
              >
                <div className={`w-12 h-12 rounded-lg ${card.bgColor} flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${card.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
                  {card.title}
                </h3>
                <p className="text-xs text-[var(--text-muted)] mb-3">{card.titleEn}</p>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                  {card.description}
                </p>
                <ul className="space-y-2">
                  {card.keyPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                      <span className="w-1 h-1 rounded-full bg-[var(--accent-gold)] mt-1.5 flex-shrink-0"></span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* 型態分類 */}
      <section className="max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Target className="w-6 h-6 text-[var(--accent-gold)]" />
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">型態分類</h2>
          </div>
          <p className="text-sm text-[var(--text-muted)]">
            共 {patternCategories.reduce((sum, cat) => sum + cat.count, 0)} 種型態
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {patternCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.id}
                href={category.href}
                className="group bg-[var(--bg-card)] border-2 border-[var(--border-color)] rounded-2xl overflow-hidden hover:border-[var(--accent-gold)] transition-all hover:scale-[1.02]"
              >
                <div className={`relative p-6 bg-gradient-to-br ${category.gradient}`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-card)]/80 to-[var(--bg-card)]/40"></div>
                  
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <Icon className="w-10 h-10 text-white" />
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm">
                        {category.count} 種型態
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-1">
                      {category.title}
                    </h3>
                    <p className="text-sm text-white/80 mb-3">{category.titleEn}</p>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                    {category.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    {category.patterns.map((pattern, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                        <CheckCircle2 className="w-3 h-3 text-[var(--accent-gold)]" />
                        <span>{pattern}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-sm font-medium text-[var(--accent-gold)] group-hover:gap-3 transition-all">
                    <span>開始學習</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 識別指南 */}
      <section className="max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-3 mb-6">
          <Zap className="w-6 h-6 text-[var(--accent-gold)]" />
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">型態識別流程</h2>
        </div>

        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {identificationGuide.map((guide) => {
              const Icon = guide.icon;
              return (
                <div key={guide.step} className="relative">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-[var(--accent-gold)]/20 border-2 border-[var(--accent-gold)] flex items-center justify-center">
                        <span className="text-sm font-bold text-[var(--accent-gold)]">
                          {guide.step}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="w-5 h-5 text-[var(--accent-gold)]" />
                        <h3 className="font-semibold text-[var(--text-primary)]">
                          {guide.title}
                        </h3>
                      </div>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                        {guide.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-[var(--border-color)]">
            <div className="flex items-start gap-3 p-4 bg-[var(--accent-gold)]/5 border-l-4 border-[var(--accent-gold)] rounded-r-lg">
              <AlertCircle className="w-5 h-5 text-[var(--accent-gold)] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-[var(--text-primary)] mb-1">重要提醒</h4>
                <p className="text-sm text-[var(--text-secondary)]">
                  圖表型態不是 100% 準確的預測工具，而是概率優勢的體現。
                  務必結合其他技術指標、基本面分析和風險管理，不要僅憑單一型態做出交易決策。
                  止損永遠是必要的。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 快速開始 */}
      <section className="max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-20">
        <div className="bg-gradient-to-br from-[var(--accent-gold)]/10 to-transparent border border-[var(--accent-gold)]/20 rounded-2xl p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                準備好開始學習了嗎？
              </h2>
              <p className="text-[var(--text-secondary)]">
                從反轉型態開始，學習如何識別趨勢轉換的早期信號。
                每個型態都配有動畫圖表和詳細說明。
              </p>
            </div>
            <Link
              href="/technical-analysis/patterns/reversal"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent-gold)] text-white rounded-lg font-medium hover:bg-[var(--accent-gold)]/90 transition-colors"
            >
              <span>開始學習反轉型態</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
