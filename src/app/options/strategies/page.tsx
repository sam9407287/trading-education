'use client';

import Link from 'next/link';
import { ArrowLeft, BookOpen, TrendingUp, TrendingDown, Activity, Layers, Repeat, Sparkles } from 'lucide-react';
import AnchorNav from '@/components/ui/AnchorNav';
import Term from '@/components/ui/Term';
import OptionsPayoffChart from '@/components/charts/OptionsPayoffChart';

// 導航區塊配置
const navSections = [
  {
    id: 'basic',
    label: '基礎策略',
    children: [
      { id: 'long-call', label: 'Long Call' },
      { id: 'long-put', label: 'Long Put' },
      { id: 'short-call', label: 'Short Call (裸賣)' },
      { id: 'short-put', label: 'Short Put (裸賣)' },
    ],
  },
  {
    id: 'income',
    label: '收入策略',
    children: [
      { id: 'covered-call', label: 'Covered Call' },
      { id: 'cash-secured-put', label: 'Cash-Secured Put' },
    ],
  },
  {
    id: 'spread',
    label: '價差策略',
    children: [
      { id: 'bull-call-spread', label: 'Bull Call Spread' },
      { id: 'bear-put-spread', label: 'Bear Put Spread' },
      { id: 'bull-put-spread', label: 'Bull Put Spread' },
      { id: 'bear-call-spread', label: 'Bear Call Spread' },
    ],
  },
  {
    id: 'volatility',
    label: '波動率策略',
    children: [
      { id: 'long-straddle', label: 'Long Straddle' },
      { id: 'short-straddle', label: 'Short Straddle' },
      { id: 'long-strangle', label: 'Long Strangle' },
      { id: 'short-strangle', label: 'Short Strangle' },
    ],
  },
  {
    id: 'complex',
    label: '複合策略',
    children: [
      { id: 'iron-condor', label: 'Iron Condor' },
      { id: 'iron-butterfly', label: 'Iron Butterfly' },
      { id: 'long-butterfly', label: 'Long Butterfly' },
      { id: 'calendar-spread', label: 'Calendar Spread' },
    ],
  },
  {
    id: 'synthetic',
    label: '合成部位',
    children: [
      { id: 'synthetic-long', label: 'Synthetic Long' },
      { id: 'synthetic-short', label: 'Synthetic Short' },
      { id: 'collar', label: 'Collar' },
    ],
  },
  {
    id: 'advanced',
    label: '進階組合',
    children: [
      { id: 'ratio-spread', label: 'Ratio Spread' },
      { id: 'jade-lizard', label: 'Jade Lizard' },
      { id: 'double-diagonal', label: 'Double Diagonal' },
    ],
  },
];

// 策略卡片組件
function StrategyCard({
  id,
  title,
  titleEn,
  description,
  outlook,
  legs,
  keyPoints,
  riskReward,
  bestWhen,
  interactive = true,
  showStock = false,
}: {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  outlook: 'bullish' | 'bearish' | 'neutral' | 'volatile';
  legs: Array<{
    type: 'call' | 'put';
    position: 'long' | 'short';
    strike: number;
    premium: number;
  }>;
  keyPoints: string[];
  riskReward: {
    maxProfit: string;
    maxLoss: string;
    breakeven: string;
  };
  bestWhen: string[];
  interactive?: boolean;
  showStock?: boolean;
}) {
  const outlookConfig = {
    bullish: { label: '看漲', icon: TrendingUp, color: 'text-[var(--profit)] bg-[var(--profit)]/10' },
    bearish: { label: '看跌', icon: TrendingDown, color: 'text-[var(--loss)] bg-[var(--loss)]/10' },
    neutral: { label: '中性', icon: Activity, color: 'text-[var(--accent-gold)] bg-[var(--accent-gold)]/10' },
    volatile: { label: '波動', icon: Activity, color: 'text-[var(--accent-purple)] bg-[var(--accent-purple)]/10' },
  };

  const OutlookIcon = outlookConfig[outlook].icon;

  return (
    <div id={id} className="scroll-mt-24 mb-16">
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-[var(--border-color)]">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex-1 min-w-0 pr-2">
              <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] leading-normal py-0.5">
                {title}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">{titleEn}</p>
            </div>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium flex-shrink-0 ${outlookConfig[outlook].color}`}>
              <OutlookIcon className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="whitespace-nowrap">{outlookConfig[outlook].label}</span>
            </div>
          </div>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">{description}</p>
        </div>

        {/* Chart */}
        <div className="p-4 sm:p-6 bg-[var(--bg-secondary)]">
          <OptionsPayoffChart
            legs={legs}
            title={`${title} 損益圖`}
            interactive={interactive}
            showStock={showStock}
          />
        </div>

        {/* Details */}
        <div className="p-4 sm:p-6 grid md:grid-cols-2 gap-4 sm:gap-6">
          {/* Risk/Reward */}
          <div>
            <h4 className="text-xs sm:text-sm font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
              <Layers className="w-3 h-3 sm:w-4 sm:h-4 text-[var(--accent-gold)]" />
              風險與報酬
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-[var(--text-muted)]">最大獲利</span>
                <span className="text-[var(--profit)] font-medium">{riskReward.maxProfit}</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-[var(--text-muted)]">最大虧損</span>
                <span className="text-[var(--loss)] font-medium">{riskReward.maxLoss}</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-[var(--text-muted)]">損益平衡</span>
                <span className="text-[var(--breakeven)] font-medium">{riskReward.breakeven}</span>
              </div>
            </div>
          </div>

          {/* Key Points */}
          <div>
            <h4 className="text-xs sm:text-sm font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
              <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 text-[var(--accent-gold)]" />
              重點提示
            </h4>
            <ul className="space-y-2">
              {keyPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] mt-1.5 sm:mt-2 flex-shrink-0"></div>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Best When */}
        <div className="px-4 sm:px-6 pb-4 sm:pb-6">
          <h4 className="text-xs sm:text-sm font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-[var(--accent-gold)]" />
            最佳使用時機
          </h4>
          <div className="flex flex-wrap gap-2">
            {bestWhen.map((when, i) => (
              <span
                key={i}
                className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-[var(--bg-secondary)] text-xs sm:text-sm text-[var(--text-secondary)]"
              >
                {when}
              </span>
            ))}
          </div>
        </div>

        {/* Legs Summary */}
        <div className="px-4 sm:px-6 pb-4 sm:pb-6">
          <h4 className="text-xs sm:text-sm font-semibold text-[var(--text-primary)] mb-3">
            組成部位
          </h4>
          <div className="flex flex-wrap gap-2">
            {legs.map((leg, i) => (
              <span
                key={i}
                className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium ${
                  leg.position === 'long'
                    ? 'bg-[var(--profit)]/10 text-[var(--profit)]'
                    : 'bg-[var(--loss)]/10 text-[var(--loss)]'
                }`}
              >
                {leg.position === 'long' ? '買入' : '賣出'} {leg.type.toUpperCase()} @ ${leg.strike}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// 區塊標題組件
function SectionHeader({ id, title, titleEn, description }: {
  id: string;
  title: string;
  titleEn: string;
  description: string;
}) {
  return (
    <div id={id} className="scroll-mt-24 mb-8 pt-8 first:pt-0">
      <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] leading-normal py-1">{title}</h2>
      <p className="text-xs sm:text-sm text-[var(--text-muted)] mb-2">{titleEn}</p>
      <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">{description}</p>
    </div>
  );
}

export default function StrategiesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-x-hidden border-b border-[var(--border-color)]">
        <div className="absolute inset-0 dark:bg-gradient-to-br dark:from-amber-500/5 dark:via-transparent dark:to-orange-500/5"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6">
            <Link href="/" className="hover:text-[var(--accent-gold)]">首頁</Link>
            <span>/</span>
            <Link href="/options" className="hover:text-[var(--accent-gold)]">期權教學</Link>
            <span>/</span>
            <span className="text-[var(--text-primary)]">期權策略</span>
          </nav>

          <Link
            href="/options"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent-gold)] mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            返回期權教學
          </Link>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--text-primary)] mb-4 leading-normal py-1">
            期權策略完整指南
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-3xl">
            從基礎的 <Term cn="買入看漲" en="Long Call" /> 到複雜的 <Term cn="鐵禿鷹" en="Iron Condor" />，
            這裡收錄了所有常見的期權策略，包含損益圖、風險分析與最佳使用時機。
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-8">
          {/* Left Navigation */}
          <AnchorNav sections={navSections} />

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* ==================== 基礎策略 ==================== */}
            <SectionHeader
              id="basic"
              title="基礎策略"
              titleEn="Basic Strategies"
              description="期權交易的四個基本部位，是所有複雜策略的基礎組成元素。"
            />

            <StrategyCard
              id="long-call"
              title="買入看漲期權"
              titleEn="Long Call"
              outlook="bullish"
              description="買入看漲期權是最基本的看漲策略，當你預期股價會上漲時使用。支付權利金後，你有權利（但非義務）在到期日前以行權價買入股票。"
              legs={[
                { type: 'call', position: 'long', strike: 100, premium: 5 },
              ]}
              keyPoints={[
                '風險有限（最多損失權利金）',
                '獲利潛力無限（股價越高，獲利越多）',
                '時間衰減對你不利（Theta 為負）',
                '波動率上升對你有利（Vega 為正）',
              ]}
              riskReward={{
                maxProfit: '無限',
                maxLoss: '支付的權利金',
                breakeven: '行權價 + 權利金',
              }}
              bestWhen={[
                '強烈看漲標的',
                '預期大幅波動',
                'IV 相對較低',
                '有限資金想要槓桿',
              ]}
            />

            <StrategyCard
              id="long-put"
              title="買入看跌期權"
              titleEn="Long Put"
              outlook="bearish"
              description="買入看跌期權是基本的看跌策略，當你預期股價會下跌時使用。支付權利金後，你有權利在到期日前以行權價賣出股票。"
              legs={[
                { type: 'put', position: 'long', strike: 100, premium: 5 },
              ]}
              keyPoints={[
                '風險有限（最多損失權利金）',
                '股價跌至零時獲利最大化',
                '可作為持股的保險（Protective Put）',
                '時間衰減對你不利',
              ]}
              riskReward={{
                maxProfit: '行權價 - 權利金（股價跌至 0）',
                maxLoss: '支付的權利金',
                breakeven: '行權價 - 權利金',
              }}
              bestWhen={[
                '強烈看跌標的',
                '想要下方保護',
                'IV 相對較低',
                '預期快速下跌',
              ]}
            />

            <StrategyCard
              id="short-call"
              title="賣出看漲期權（裸賣）"
              titleEn="Short Call (Naked)"
              outlook="bearish"
              description="賣出看漲期權收取權利金，當你預期股價不會大幅上漲時使用。風險在於股價大漲時虧損可能無限。"
              legs={[
                { type: 'call', position: 'short', strike: 100, premium: 5 },
              ]}
              keyPoints={[
                '獲利有限（最多獲得權利金）',
                '虧損潛力無限（裸賣風險極高）',
                '時間衰減對你有利（Theta 為正）',
                '通常需要較高的保證金',
              ]}
              riskReward={{
                maxProfit: '收取的權利金',
                maxLoss: '無限（股價可無限上漲）',
                breakeven: '行權價 + 權利金',
              }}
              bestWhen={[
                '強烈看跌或中性觀點',
                'IV 相對較高',
                '願意承擔無限風險',
                '有足夠保證金',
              ]}
            />

            <StrategyCard
              id="short-put"
              title="賣出看跌期權（裸賣）"
              titleEn="Short Put (Naked)"
              outlook="bullish"
              description="賣出看跌期權收取權利金，當你願意在較低價位買入股票時使用。如果股價跌破行權價，你有義務買入股票。"
              legs={[
                { type: 'put', position: 'short', strike: 100, premium: 5 },
              ]}
              keyPoints={[
                '獲利有限（最多獲得權利金）',
                '虧損風險大（股價跌至零時最大）',
                '如同設定限價買單並收取費用',
                '常用於低價接貨策略',
              ]}
              riskReward={{
                maxProfit: '收取的權利金',
                maxLoss: '行權價 - 權利金（股價跌至 0）',
                breakeven: '行權價 - 權利金',
              }}
              bestWhen={[
                '看漲或中性偏多',
                '願意在行權價買入股票',
                'IV 相對較高',
                '有足夠資金買入股票',
              ]}
            />

            {/* ==================== 收入策略 ==================== */}
            <SectionHeader
              id="income"
              title="收入策略"
              titleEn="Income Strategies"
              description="利用持有股票或現金來產生額外收入的保守策略。"
            />

            <StrategyCard
              id="covered-call"
              title="備兌看漲"
              titleEn="Covered Call"
              outlook="neutral"
              description="持有股票的同時賣出看漲期權收取權利金。這是最受歡迎的收入策略之一，適合對持股略微看漲或中性的投資者。"
              legs={[
                { type: 'call', position: 'short', strike: 105, premium: 3 },
              ]}
              showStock={true}
              keyPoints={[
                '需要先持有 100 股標的股票',
                '權利金收入降低持股成本',
                '上漲空間被行權價限制',
                '下跌時仍會虧損（但比純持股少）',
              ]}
              riskReward={{
                maxProfit: '(行權價 - 股票成本) + 權利金',
                maxLoss: '股票成本 - 權利金（股價跌至 0）',
                breakeven: '股票成本 - 權利金',
              }}
              bestWhen={[
                '已持有股票',
                '短期中性或略微看漲',
                '想要產生額外收入',
                '願意在行權價賣出股票',
              ]}
            />

            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-6 mb-8">
              <h4 className="font-semibold text-[var(--text-primary)] mb-4">
                Covered Call 的 ITM / ATM / OTM 選擇
              </h4>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-4 bg-[var(--bg-secondary)] rounded-lg">
                  <div className="text-sm font-medium text-[var(--accent-gold)] mb-2">ITM Covered Call</div>
                  <p className="text-sm text-[var(--text-secondary)]">
                    較高權利金，但更可能被行權。適合想快速出場且不介意賣出股票的情況。
                  </p>
                </div>
                <div className="p-4 bg-[var(--bg-secondary)] rounded-lg">
                  <div className="text-sm font-medium text-[var(--accent-gold)] mb-2">ATM Covered Call</div>
                  <p className="text-sm text-[var(--text-secondary)]">
                    權利金與行權機率平衡。適合中性觀點，Theta 衰減最快。
                  </p>
                </div>
                <div className="p-4 bg-[var(--bg-secondary)] rounded-lg">
                  <div className="text-sm font-medium text-[var(--accent-gold)] mb-2">OTM Covered Call</div>
                  <p className="text-sm text-[var(--text-secondary)]">
                    較低權利金但保留更多上漲空間。適合略微看漲但仍想賺取收入。
                  </p>
                </div>
              </div>
            </div>

            <StrategyCard
              id="cash-secured-put"
              title="現金擔保看跌"
              titleEn="Cash-Secured Put"
              outlook="bullish"
              description="在帳戶中保留足夠現金的情況下賣出看跌期權。如果被指派，你會以行權價買入股票。這是「付費等待買入」的策略。"
              legs={[
                { type: 'put', position: 'short', strike: 95, premium: 3 },
              ]}
              keyPoints={[
                '需要有足夠現金買入 100 股',
                '如同設定限價買單並收取權利金',
                '如果股價不跌，白白賺取權利金',
                '被指派時可轉為 Covered Call 策略',
              ]}
              riskReward={{
                maxProfit: '收取的權利金',
                maxLoss: '行權價 - 權利金（股價跌至 0）',
                breakeven: '行權價 - 權利金',
              }}
              bestWhen={[
                '看漲但願意等待更好買點',
                '有閒置現金',
                'IV 相對較高',
                '不介意以行權價買入股票',
              ]}
            />

            {/* ==================== 價差策略 ==================== */}
            <SectionHeader
              id="spread"
              title="價差策略"
              titleEn="Spread Strategies"
              description="同時買入和賣出相同類型的期權，限制風險的同時也限制了獲利。"
            />

            <StrategyCard
              id="bull-call-spread"
              title="牛市看漲價差"
              titleEn="Bull Call Spread"
              outlook="bullish"
              description="買入較低行權價的 Call 同時賣出較高行權價的 Call。這是一個成本較低的看漲策略，但獲利空間被限制。"
              legs={[
                { type: 'call', position: 'long', strike: 95, premium: 7 },
                { type: 'call', position: 'short', strike: 105, premium: 3 },
              ]}
              keyPoints={[
                '淨成本 = 買入 Call 權利金 - 賣出 Call 權利金',
                '風險有限（最多損失淨成本）',
                '獲利有限（兩行權價之差 - 淨成本）',
                '比單純 Long Call 便宜，但上漲空間受限',
              ]}
              riskReward={{
                maxProfit: '(高行權價 - 低行權價) - 淨成本',
                maxLoss: '淨支付的權利金',
                breakeven: '低行權價 + 淨成本',
              }}
              bestWhen={[
                '中度看漲（預期上漲但有上限）',
                '想降低 Long Call 成本',
                'IV 中等',
                '有特定目標價位',
              ]}
            />

            <StrategyCard
              id="bear-put-spread"
              title="熊市看跌價差"
              titleEn="Bear Put Spread"
              outlook="bearish"
              description="買入較高行權價的 Put 同時賣出較低行權價的 Put。這是成本較低的看跌策略。"
              legs={[
                { type: 'put', position: 'long', strike: 105, premium: 7 },
                { type: 'put', position: 'short', strike: 95, premium: 3 },
              ]}
              keyPoints={[
                '淨成本 = 買入 Put 權利金 - 賣出 Put 權利金',
                '比單純 Long Put 便宜',
                '獲利和風險都有限',
                '適合預期下跌但幅度有限的情況',
              ]}
              riskReward={{
                maxProfit: '(高行權價 - 低行權價) - 淨成本',
                maxLoss: '淨支付的權利金',
                breakeven: '高行權價 - 淨成本',
              }}
              bestWhen={[
                '中度看跌',
                '想降低 Long Put 成本',
                '預期下跌有支撐位',
                'IV 中等',
              ]}
            />

            <StrategyCard
              id="bull-put-spread"
              title="牛市看跌價差"
              titleEn="Bull Put Spread (Credit Spread)"
              outlook="bullish"
              description="賣出較高行權價的 Put 同時買入較低行權價的 Put。這是收取權利金的看漲策略，風險有限。"
              legs={[
                { type: 'put', position: 'short', strike: 100, premium: 5 },
                { type: 'put', position: 'long', strike: 90, premium: 2 },
              ]}
              keyPoints={[
                '淨收入 = 賣出 Put 權利金 - 買入 Put 權利金',
                '開倉時收取權利金（Credit Spread）',
                '股價維持在高行權價之上即可獲得全部權利金',
                '風險被低行權價限制',
              ]}
              riskReward={{
                maxProfit: '淨收取的權利金',
                maxLoss: '(高行權價 - 低行權價) - 淨權利金',
                breakeven: '高行權價 - 淨權利金',
              }}
              bestWhen={[
                '看漲或中性',
                '想收取權利金',
                'IV 較高',
                '預期股價維持或上漲',
              ]}
            />

            <StrategyCard
              id="bear-call-spread"
              title="熊市看漲價差"
              titleEn="Bear Call Spread (Credit Spread)"
              outlook="bearish"
              description="賣出較低行權價的 Call 同時買入較高行權價的 Call。收取權利金的看跌策略。"
              legs={[
                { type: 'call', position: 'short', strike: 100, premium: 5 },
                { type: 'call', position: 'long', strike: 110, premium: 2 },
              ]}
              keyPoints={[
                '開倉時收取權利金',
                '股價維持在低行權價之下即可獲得全部權利金',
                '上漲時虧損被高行權價限制',
                '適合看跌但不想承擔無限風險',
              ]}
              riskReward={{
                maxProfit: '淨收取的權利金',
                maxLoss: '(高行權價 - 低行權價) - 淨權利金',
                breakeven: '低行權價 + 淨權利金',
              }}
              bestWhen={[
                '看跌或中性',
                '想收取權利金',
                'IV 較高',
                '預期股價維持或下跌',
              ]}
            />

            {/* ==================== 波動率策略 ==================== */}
            <SectionHeader
              id="volatility"
              title="波動率策略"
              titleEn="Volatility Strategies"
              description="不預測方向，而是預測波動率的策略。適合財報季或重大事件前後使用。"
            />

            <StrategyCard
              id="long-straddle"
              title="買入跨式"
              titleEn="Long Straddle"
              outlook="volatile"
              description="同時買入相同行權價的 Call 和 Put。當你預期股價會大幅波動但不確定方向時使用。"
              legs={[
                { type: 'call', position: 'long', strike: 100, premium: 5 },
                { type: 'put', position: 'long', strike: 100, premium: 5 },
              ]}
              keyPoints={[
                '需要股價大幅波動才能獲利',
                '方向不重要，波動才重要',
                '時間衰減對你極為不利（雙倍 Theta）',
                'IV 上升對你有利（雙倍 Vega）',
              ]}
              riskReward={{
                maxProfit: '無限（任一方向大幅移動）',
                maxLoss: '支付的總權利金',
                breakeven: '行權價 ± 總權利金',
              }}
              bestWhen={[
                '預期大幅波動但方向不明',
                '財報發布前',
                'IV 相對較低',
                '重大事件前',
              ]}
            />

            <StrategyCard
              id="short-straddle"
              title="賣出跨式"
              titleEn="Short Straddle"
              outlook="neutral"
              description="同時賣出相同行權價的 Call 和 Put。收取大量權利金，但如果股價大幅波動，虧損可能無限。"
              legs={[
                { type: 'call', position: 'short', strike: 100, premium: 5 },
                { type: 'put', position: 'short', strike: 100, premium: 5 },
              ]}
              keyPoints={[
                '收取雙倍權利金',
                '股價維持不變時獲利最大',
                '任一方向大幅波動都會虧損',
                'IV 下降對你有利',
              ]}
              riskReward={{
                maxProfit: '收取的總權利金',
                maxLoss: '無限（上漲）或行權價-權利金（下跌）',
                breakeven: '行權價 ± 總權利金',
              }}
              bestWhen={[
                '預期股價橫盤',
                'IV 相對較高',
                '財報發布後（IV Crush）',
                '有高風險承受能力',
              ]}
            />

            <StrategyCard
              id="long-strangle"
              title="買入勒式"
              titleEn="Long Strangle"
              outlook="volatile"
              description="買入 OTM 的 Call 和 Put。比 Straddle 便宜，但需要更大的價格波動才能獲利。"
              legs={[
                { type: 'call', position: 'long', strike: 105, premium: 3 },
                { type: 'put', position: 'long', strike: 95, premium: 3 },
              ]}
              keyPoints={[
                '成本比 Straddle 低',
                '需要更大幅度的波動才能獲利',
                '兩個行權價之間的區域為虧損區',
                '適合預期極端波動',
              ]}
              riskReward={{
                maxProfit: '無限（任一方向大幅移動）',
                maxLoss: '支付的總權利金',
                breakeven: '高行權價+權利金 或 低行權價-權利金',
              }}
              bestWhen={[
                '預期極端波動',
                '成本考量優先',
                'IV 較低',
                '願意承受較寬虧損區',
              ]}
            />

            <StrategyCard
              id="short-strangle"
              title="賣出勒式"
              titleEn="Short Strangle"
              outlook="neutral"
              description="賣出 OTM 的 Call 和 Put。收取權利金並獲得較寬的獲利區間，但兩端風險仍然很大。"
              legs={[
                { type: 'call', position: 'short', strike: 105, premium: 3 },
                { type: 'put', position: 'short', strike: 95, premium: 3 },
              ]}
              keyPoints={[
                '獲利區間比 Short Straddle 寬',
                '權利金收入較少',
                '股價在兩行權價之間時獲利最大',
                '是最受歡迎的收入策略之一',
              ]}
              riskReward={{
                maxProfit: '收取的總權利金',
                maxLoss: '無限（上漲）或低行權價-權利金（下跌）',
                breakeven: '高行權價+權利金 或 低行權價-權利金',
              }}
              bestWhen={[
                '預期低波動',
                'IV 較高（IV Rank > 50）',
                '想要較寬的安全區間',
                '願意承擔尾部風險',
              ]}
            />

            {/* ==================== 複合策略 ==================== */}
            <SectionHeader
              id="complex"
              title="複合策略"
              titleEn="Complex Strategies"
              description="由多個期權組合而成的進階策略，提供更精細的風險收益特徵。"
            />

            <StrategyCard
              id="iron-condor"
              title="鐵禿鷹"
              titleEn="Iron Condor"
              outlook="neutral"
              description="結合 Bull Put Spread 和 Bear Call Spread。在股價維持區間內時獲利，是最受歡迎的中性策略之一。"
              legs={[
                { type: 'put', position: 'long', strike: 85, premium: 1 },
                { type: 'put', position: 'short', strike: 90, premium: 2.5 },
                { type: 'call', position: 'short', strike: 110, premium: 2.5 },
                { type: 'call', position: 'long', strike: 115, premium: 1 },
              ]}
              keyPoints={[
                '四腿策略：買入 OTM Put/Call + 賣出更接近價內的 Put/Call',
                '風險和獲利都有限',
                '在兩個賣出行權價之間獲利最大',
                '適合低波動環境',
              ]}
              riskReward={{
                maxProfit: '淨收取的權利金',
                maxLoss: '價差寬度 - 淨權利金',
                breakeven: '賣 Put 行權價-淨權利金 及 賣 Call 行權價+淨權利金',
              }}
              bestWhen={[
                '預期橫盤',
                'IV 較高',
                '想限制最大虧損',
                '財報後 IV Crush',
              ]}
            />

            <StrategyCard
              id="iron-butterfly"
              title="鐵蝴蝶"
              titleEn="Iron Butterfly"
              outlook="neutral"
              description="所有期權都使用同一行權價的變體。獲利潛力比 Iron Condor 高，但獲利區間更窄。"
              legs={[
                { type: 'put', position: 'long', strike: 90, premium: 1 },
                { type: 'put', position: 'short', strike: 100, premium: 5 },
                { type: 'call', position: 'short', strike: 100, premium: 5 },
                { type: 'call', position: 'long', strike: 110, premium: 1 },
              ]}
              keyPoints={[
                '中間兩腿行權價相同',
                '收取權利金比 Iron Condor 多',
                '獲利區間較窄',
                '股價剛好在行權價時獲利最大',
              ]}
              riskReward={{
                maxProfit: '淨收取的權利金',
                maxLoss: '翼展寬度 - 淨權利金',
                breakeven: '行權價 ± 淨權利金',
              }}
              bestWhen={[
                '強烈預期橫盤',
                '有特定目標價位',
                'IV 較高',
                '想最大化權利金收入',
              ]}
            />

            <StrategyCard
              id="long-butterfly"
              title="買入蝴蝶價差"
              titleEn="Long Butterfly Spread"
              outlook="neutral"
              description="買入一個低行權價 Call、賣出兩個中間行權價 Call、買入一個高行權價 Call。低成本的中性策略。"
              legs={[
                { type: 'call', position: 'long', strike: 95, premium: 8 },
                { type: 'call', position: 'short', strike: 100, premium: 5 },
                { type: 'call', position: 'short', strike: 100, premium: 5 },
                { type: 'call', position: 'long', strike: 105, premium: 3 },
              ]}
              keyPoints={[
                '低成本策略（淨支付權利金很少）',
                '股價在中間行權價時獲利最大',
                '風險有限（最多損失淨成本）',
                '報酬風險比高',
              ]}
              riskReward={{
                maxProfit: '(高行權價-中行權價) - 淨成本',
                maxLoss: '淨支付的權利金',
                breakeven: '低行權價+淨成本 及 高行權價-淨成本',
              }}
              bestWhen={[
                '預期股價收斂到特定價位',
                '低成本交易',
                '想要高報酬風險比',
                '接近到期日',
              ]}
            />

            <StrategyCard
              id="calendar-spread"
              title="日曆價差"
              titleEn="Calendar Spread (Time Spread)"
              outlook="neutral"
              description="賣出近期到期的期權，買入遠期到期的期權（相同行權價）。利用時間衰減的差異獲利。"
              legs={[
                { type: 'call', position: 'short', strike: 100, premium: 3 },
              ]}
              keyPoints={[
                '近期期權時間衰減更快',
                '需要股價維持在行權價附近',
                'IV 上升對你有利',
                '近期到期後需要決定是否平倉遠期期權',
              ]}
              riskReward={{
                maxProfit: '取決於到期時的 IV 和股價',
                maxLoss: '淨支付的權利金',
                breakeven: '複雜，取決於 IV',
              }}
              bestWhen={[
                '預期短期橫盤',
                'IV 較低（預期上升）',
                '想利用 Theta 差異',
                '有方向性偏好但想降低成本',
              ]}
              interactive={false}
            />

            {/* ==================== 合成部位 ==================== */}
            <SectionHeader
              id="synthetic"
              title="合成部位"
              titleEn="Synthetic Positions"
              description="使用期權模擬股票持倉或創造保護性組合。"
            />

            <StrategyCard
              id="synthetic-long"
              title="合成多頭"
              titleEn="Synthetic Long Stock"
              outlook="bullish"
              description="買入 Call 同時賣出 Put（相同行權價和到期日）。損益線與持有股票幾乎相同，但資金使用效率更高。"
              legs={[
                { type: 'call', position: 'long', strike: 100, premium: 5 },
                { type: 'put', position: 'short', strike: 100, premium: 5 },
              ]}
              keyPoints={[
                '損益曲線與股票幾乎相同',
                '資金需求比買股票低',
                '有到期日限制',
                '可能產生淨成本或淨收入',
              ]}
              riskReward={{
                maxProfit: '無限（股價上漲）',
                maxLoss: '行權價 ± 淨權利金（股價跌至 0）',
                breakeven: '行權價 ± 淨權利金',
              }}
              bestWhen={[
                '強烈看漲',
                '想要槓桿效果',
                '資金有限',
                '不需要股息',
              ]}
            />

            <StrategyCard
              id="synthetic-short"
              title="合成空頭"
              titleEn="Synthetic Short Stock"
              outlook="bearish"
              description="賣出 Call 同時買入 Put（相同行權價和到期日）。損益線與放空股票相同。"
              legs={[
                { type: 'call', position: 'short', strike: 100, premium: 5 },
                { type: 'put', position: 'long', strike: 100, premium: 5 },
              ]}
              keyPoints={[
                '等同於放空股票',
                '不需要借券',
                '有到期日限制',
                '沒有借券費用',
              ]}
              riskReward={{
                maxProfit: '行權價 ± 淨權利金（股價跌至 0）',
                maxLoss: '無限（股價上漲）',
                breakeven: '行權價 ± 淨權利金',
              }}
              bestWhen={[
                '強烈看跌',
                '難以借券的股票',
                '想避免借券費用',
                '短期空頭部位',
              ]}
            />

            <StrategyCard
              id="collar"
              title="領口策略"
              titleEn="Collar"
              outlook="neutral"
              description="持有股票的同時，買入保護性 Put 並賣出 Covered Call。鎖定利潤區間，限制上下方風險。"
              legs={[
                { type: 'put', position: 'long', strike: 95, premium: 3 },
                { type: 'call', position: 'short', strike: 105, premium: 3 },
              ]}
              showStock={true}
              keyPoints={[
                '零成本或低成本保護（Call 權利金抵消 Put）',
                '限制下方風險',
                '但也限制上方獲利',
                '適合長期持股但想短期保護',
              ]}
              riskReward={{
                maxProfit: '(賣 Call 行權價 - 股票成本) + 淨權利金',
                maxLoss: '(股票成本 - 買 Put 行權價) - 淨權利金',
                breakeven: '股票成本 ± 淨權利金',
              }}
              bestWhen={[
                '持有獲利股票想保護',
                '預期短期波動但長期看好',
                '想要零成本保護',
                '接近重大事件',
              ]}
            />

            {/* ==================== 進階組合 ==================== */}
            <SectionHeader
              id="advanced"
              title="進階組合"
              titleEn="Advanced Combinations"
              description="更複雜的多腿策略，提供獨特的風險收益特徵。"
            />

            <StrategyCard
              id="ratio-spread"
              title="比率價差"
              titleEn="Ratio Spread"
              outlook="neutral"
              description="買入一個期權，賣出多個不同行權價的同類期權。通常是 1:2 或 1:3 的比例。"
              legs={[
                { type: 'call', position: 'long', strike: 95, premium: 8 },
                { type: 'call', position: 'short', strike: 105, premium: 3 },
                { type: 'call', position: 'short', strike: 105, premium: 3 },
              ]}
              keyPoints={[
                '可能是零成本或收取權利金',
                '獲利在特定區間內最大化',
                '超過某價位後開始虧損（裸賣風險）',
                '需要精確的方向判斷',
              ]}
              riskReward={{
                maxProfit: '(賣出行權價 - 買入行權價) × 100 - 淨成本',
                maxLoss: '無限（Call Ratio）或有限（Put Ratio）',
                breakeven: '複雜，取決於比例和權利金',
              }}
              bestWhen={[
                '有特定目標價位',
                '預期中度波動',
                '想要低成本或收取權利金',
                '願意管理尾部風險',
              ]}
            />

            <StrategyCard
              id="jade-lizard"
              title="玉蜥蜴"
              titleEn="Jade Lizard"
              outlook="bullish"
              description="賣出 Put 加上賣出 Call Spread（Bear Call Spread）。收取權利金，上方風險被限制，但下方風險仍在。"
              legs={[
                { type: 'put', position: 'short', strike: 95, premium: 4 },
                { type: 'call', position: 'short', strike: 105, premium: 3 },
                { type: 'call', position: 'long', strike: 110, premium: 1 },
              ]}
              keyPoints={[
                '收取的權利金大於 Call Spread 寬度 = 上方無風險',
                '適合中性偏多觀點',
                '下方風險等同於 Short Put',
                '高勝率策略',
              ]}
              riskReward={{
                maxProfit: '淨收取的權利金',
                maxLoss: 'Put 行權價 - 淨權利金（股價跌至 0）',
                breakeven: 'Put 行權價 - 淨權利金',
              }}
              bestWhen={[
                '中性偏多',
                '想消除上方風險',
                'IV 較高',
                '願意在低位買入股票',
              ]}
            />

            <StrategyCard
              id="double-diagonal"
              title="雙對角價差"
              titleEn="Double Diagonal"
              outlook="neutral"
              description="結合兩個對角價差（不同行權價和到期日）。利用時間衰減和波動率變化獲利的進階策略。"
              legs={[
                { type: 'put', position: 'short', strike: 95, premium: 3 },
                { type: 'call', position: 'short', strike: 105, premium: 3 },
              ]}
              keyPoints={[
                '近期賣出 OTM Put 和 Call',
                '遠期買入更 OTM 的 Put 和 Call',
                '複雜的調整需求',
                '需要管理多個到期日',
              ]}
              riskReward={{
                maxProfit: '取決於到期時的位置和 IV',
                maxLoss: '有限（遠期期權提供保護）',
                breakeven: '複雜，取決於多個因素',
              }}
              bestWhen={[
                '預期低波動後波動上升',
                '想要 Theta 和 Vega 雙重獲利',
                '有經驗的交易者',
                '願意頻繁調整',
              ]}
              interactive={false}
            />

            {/* 更多組合提示 */}
            <div className="mt-12 p-6 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[var(--accent-gold)]" />
                還有更多策略...
              </h3>
              <p className="text-[var(--text-secondary)] mb-4">
                期權策略的組合是無窮的。以上只是最常見的策略，你還可以探索：
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  'Christmas Tree',
                  'Broken Wing Butterfly',
                  'Skip Strike Butterfly',
                  'Ratio Back Spread',
                  'Box Spread',
                  'Conversion/Reversal',
                  'Jelly Roll',
                  'Ladder',
                  'Seagull',
                  'Strap/Strip',
                ].map((strategy) => (
                  <span
                    key={strategy}
                    className="px-3 py-1.5 rounded-lg bg-[var(--bg-secondary)] text-sm text-[var(--text-muted)]"
                  >
                    {strategy}
                  </span>
                ))}
              </div>
            </div>

            {/* IV 與策略選擇指南 */}
            <div className="mt-12 p-6 bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
                IV 與策略選擇指南
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 bg-[var(--bg-primary)]/50 rounded-lg">
                  <h4 className="font-medium text-[var(--profit)] mb-2">高 IV 環境（IV Rank {'>'} 50）</h4>
                  <ul className="space-y-1 text-sm text-[var(--text-secondary)]">
                    <li>• 賣出策略為主（Short Strangle, Iron Condor）</li>
                    <li>• 收取較高權利金</li>
                    <li>• 利用 IV Crush 獲利</li>
                    <li>• Credit Spread 優於 Debit Spread</li>
                  </ul>
                </div>
                <div className="p-4 bg-[var(--bg-primary)]/50 rounded-lg">
                  <h4 className="font-medium text-[var(--accent-blue)] mb-2">低 IV 環境（IV Rank {'<'} 30）</h4>
                  <ul className="space-y-1 text-sm text-[var(--text-secondary)]">
                    <li>• 買入策略為主（Long Straddle, Long Call）</li>
                    <li>• 期權相對便宜</li>
                    <li>• Calendar Spread 利用 IV 上升</li>
                    <li>• Debit Spread 優於 Credit Spread</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

