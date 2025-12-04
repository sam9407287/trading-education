'use client';

import Link from 'next/link';
import { ArrowLeft, Brain, AlertTriangle, Zap, Heart, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import AnchorNav from '@/components/ui/AnchorNav';

// 導航區塊配置
const navSections = [
  {
    id: 'introduction',
    label: '引言與前景理論',
    children: [
      { id: 'intro', label: '行為金融學簡介' },
      { id: 'prospect-theory', label: '前景理論' },
      { id: 'loss-aversion', label: '損失厭惡' },
    ],
  },
  {
    id: 'belief-preservation',
    label: '信念保持偏誤',
    children: [
      { id: 'conservatism', label: '保守主義' },
      { id: 'confirmation', label: '確認偏誤' },
      { id: 'representativeness', label: '代表性偏誤' },
      { id: 'illusion-of-control', label: '控制錯覺' },
      { id: 'hindsight', label: '後見之明' },
      { id: 'cognitive-dissonance', label: '認知失調' },
    ],
  },
  {
    id: 'information-processing',
    label: '信息處理偏誤',
    children: [
      { id: 'anchoring', label: '錨定效應' },
      { id: 'availability', label: '可得性偏誤' },
      { id: 'self-attribution', label: '自我歸因' },
      { id: 'framing', label: '框架效應' },
      { id: 'mental-accounting', label: '心理帳戶' },
      { id: 'recency', label: '近因效應' },
      { id: 'outcome', label: '結果偏誤' },
    ],
  },
  {
    id: 'emotional',
    label: '情緒偏誤',
    children: [
      { id: 'loss-aversion-bias', label: '損失厭惡偏誤' },
      { id: 'endowment', label: '稟賦效應' },
      { id: 'overconfidence', label: '過度自信' },
      { id: 'regret-aversion', label: '後悔厭惡' },
      { id: 'conjunction-fallacy', label: '合取謬誤' },
      { id: 'self-control', label: '自我控制' },
      { id: 'status-quo', label: '現狀偏誤' },
      { id: 'affinity', label: '親和偏誤' },
    ],
  },
  {
    id: 'chart-patterns',
    label: '偏誤與圖表形態',
  },
];

// 章节标题组件
function SectionHeader({ 
  id, 
  title, 
  titleEn, 
  description, 
  icon: Icon,
  gradient 
}: { 
  id: string; 
  title: string; 
  titleEn: string; 
  description?: string;
  icon?: React.ElementType;
  gradient?: string;
}) {
  return (
    <div id={id} className="mb-8 scroll-mt-20">
      <div className="flex items-center gap-3 mb-3">
        {Icon && (
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${gradient || 'from-blue-500 to-cyan-400'} flex items-center justify-center`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
        )}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">{title}</h2>
          <p className="text-sm text-[var(--text-muted)]">{titleEn}</p>
        </div>
      </div>
      {description && (
        <p className="text-[var(--text-secondary)] mb-6">{description}</p>
      )}
    </div>
  );
}

// 偏誤卡片组件
function BiasCard({
  id,
  title,
  titleEn,
  definition,
  marketExample,
  impact,
  type,
}: {
  id: string;
  title: string;
  titleEn: string;
  definition: string;
  marketExample: string;
  impact: {
    volume: string;
    price: string;
    sentiment: string;
  };
  type: 'belief' | 'information' | 'emotional';
}) {
  const typeConfig = {
    belief: { color: 'blue', gradient: 'from-blue-500 to-cyan-400', icon: Brain },
    information: { color: 'purple', gradient: 'from-purple-500 to-pink-400', icon: Zap },
    emotional: { color: 'rose', gradient: 'from-rose-500 to-red-400', icon: Heart },
  };

  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <div id={id} className="scroll-mt-20 mb-6">
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl overflow-hidden hover:shadow-lg transition-all">
        {/* 标题栏 */}
        <div className={`p-4 sm:p-5 bg-gradient-to-r ${config.gradient} bg-opacity-10`}>
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br ${config.gradient} flex items-center justify-center flex-shrink-0`}>
              <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] mb-1">{title}</h3>
              <p className="text-sm text-[var(--text-muted)]">{titleEn}</p>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 space-y-4">
          {/* 定义 */}
          <div className="bg-[var(--bg-secondary)] rounded-lg p-4">
            <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-2 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)]"></div>
              定义
            </h4>
            <p className="text-sm text-[var(--text-secondary)]">{definition}</p>
          </div>

          {/* 市場案例 */}
          <div className="border-l-4 border-[var(--accent-gold)] pl-4 py-2">
            <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-2">📊 市場案例</h4>
            <p className="text-sm text-[var(--text-secondary)]">{marketExample}</p>
          </div>

          {/* 技术分析影響 */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-3">技术分析影響</h4>
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="bg-[var(--bg-secondary)] rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Activity className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-semibold text-[var(--text-primary)]">成交量</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)]">{impact.volume}</p>
              </div>
              <div className="bg-[var(--bg-secondary)] rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-[var(--accent-green)]" />
                  <span className="text-xs font-semibold text-[var(--text-primary)]">价格</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)]">{impact.price}</p>
              </div>
              <div className="bg-[var(--bg-secondary)] rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingDown className="w-4 h-4 text-[var(--accent-gold)]" />
                  <span className="text-xs font-semibold text-[var(--text-primary)]">情绪</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)]">{impact.sentiment}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BehavioralFinancePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-x-hidden border-b border-[var(--border-color)]">
        <div className="absolute inset-0 dark:bg-gradient-to-br dark:from-purple-500/5 dark:via-transparent dark:to-pink-500/5"></div>
        
        <div className="relative max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6">
            <Link href="/" className="hover:text-[var(--accent-gold)]">首页</Link>
            <span>/</span>
            <Link href="/technical-analysis" className="hover:text-[var(--accent-gold)]">技术分析</Link>
            <span>/</span>
            <span className="text-[var(--text-primary)]">行为金融学</span>
          </nav>

          <Link
            href="/technical-analysis"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent-gold)] mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            返回技术分析
          </Link>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--text-primary)] mb-4 leading-normal py-1">
            行為金融學
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-3xl">
            理解投資者的心理偏誤與決策行為，掌握市場情緒與價格形態背後的心理機制
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
            {/* ==================== 引言與前景理論 ==================== */}
            <SectionHeader
              id="introduction"
              title="引言與前景理論"
              titleEn="Introduction & Prospect Theory"
              icon={Brain}
              gradient="from-purple-500 to-pink-400"
            />

            {/* 行為金融學簡介 */}
            <div id="intro" className="mb-12 scroll-mt-20">
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">行為金融學簡介</h3>
              
              <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-6 mb-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-400 flex items-center justify-center flex-shrink-0 text-white font-bold">
                    2002
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--text-primary)] mb-2">諾貝爾經濟學獎</h4>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Daniel Kahneman（1934-2024）因「將心理學研究的洞見整合到經濟科學中，特別是關於不確定性下的人類判斷和決策」而獲得諾貝爾經濟學獎。
                    </p>
                  </div>
                </div>
              </div>

              <div className="prose prose-sm max-w-none space-y-4 text-[var(--text-secondary)]">
                <p>
                  在不確定性下做出決策，是買賣風險資產決策的基本定義。看到自己的權益（通常是畢生積蓄）價值漲跌時，往往會產生強烈的情緒反應，並以不同方式影響人們的決策。
                </p>
                
                <p>
                  通過心理測試，Daniel Kahneman 和 Amos Tversky（1937-1996）發現，人類對收益和損失的反應主要由情緒驅動。技術分析師在圖表形態、支撐與阻力區域、成交量形態以及投資者情緒變化中觀察到這些行為反應。<strong className="text-[var(--text-primary)]">損失厭惡是驅動投資者決策的主要因素</strong>。
                </p>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 my-6">
                  <h5 className="font-semibold text-[var(--text-primary)] mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-blue-400" />
                    傳統經濟學的兩大假設
                  </h5>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">1.</span>
                      <span><strong>「理性人」（Homo Economicus）</strong>：假設人類受自利動機驅動，能夠做出理性決策</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">2.</span>
                      <span><strong>非實驗性科學</strong>：依賴於對真實經濟的觀察，而非受控實驗</span>
                    </li>
                  </ul>
                </div>

                <p>
                  但實際上，<strong className="text-[var(--text-primary)]">買賣決策並非總是理性的，事實上大多是非理性的</strong>。正如我們將從行為分析中學到的，買賣決策充滿了情緒和非理性決策。
                </p>
              </div>
            </div>

            {/* 前景理論 */}
            <div id="prospect-theory" className="mb-12 scroll-mt-20">
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">前景理論</h3>
              
              <div className="prose prose-sm max-w-none space-y-4 text-[var(--text-secondary)] mb-6">
                <p>
                  Kahneman 與 Tversky 共同提出了<strong className="text-[var(--text-primary)]">前景理論（Prospect Theory）</strong>，作為標準經濟理論的替代方案，更好地解釋了實際觀察到的行為。
                </p>
                
                <p className="text-lg font-semibold text-[var(--accent-gold)]">
                  核心觀點：決策者對損失的重視程度遠超過收益。
                </p>
              </div>

              {/* TODO: 添加前景理論互動圖表 */}
              <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-6 mb-6">
                <h4 className="font-semibold text-[var(--text-primary)] mb-4">💡 實例：投資選擇</h4>
                
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div className="bg-[var(--accent-green)]/10 border border-[var(--accent-green)]/20 rounded-lg p-4">
                    <div className="text-sm font-semibold text-[var(--accent-green)] mb-2">投資 A</div>
                    <p className="text-[var(--text-secondary)] text-sm mb-2">保證回報 $50,000</p>
                    <p className="text-xs text-[var(--text-muted)]">期望值 = $50,000 × 100% = $50,000</p>
                  </div>
                  
                  <div className="bg-[var(--accent-gold)]/10 border border-[var(--accent-gold)]/20 rounded-lg p-4">
                    <div className="text-sm font-semibold text-[var(--accent-gold)] mb-2">投資 B</div>
                    <p className="text-[var(--text-secondary)] text-sm mb-2">50% 機率獲得 $100,000 或 $0</p>
                    <p className="text-xs text-[var(--text-muted)]">期望值 = $100,000 × 50% = $50,000</p>
                  </div>
                </div>

                <div className="bg-blue-500/10 border-l-4 border-blue-400 pl-4 py-2">
                  <p className="text-sm text-[var(--text-secondary)]">
                    <strong className="text-[var(--text-primary)]">結果</strong>：儘管兩者期望值相同，但大多數投資者會選擇保證收益的投資 A，因為<strong className="text-[var(--accent-gold)]">損失厭惡</strong>。
                  </p>
                </div>
              </div>

              <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-6">
                <h4 className="font-semibold text-[var(--text-primary)] mb-4">🍽️ 實例：餐廳點菜</h4>
                <p className="text-sm text-[var(--text-secondary)] mb-3">
                  在最喜歡的餐廳，你總有一道「保底菜」——每次都點它，因為熟悉的味道和可靠的準備讓你滿意。
                </p>
                <p className="text-sm text-[var(--text-secondary)] mb-3">
                  某天，菜單上有一道誘人的新菜，承諾帶來愉悅和滿足。但由於<strong className="text-[var(--accent-gold)]">損失厭惡</strong>，對嘗試新事物可能帶來的失望或後悔的恐懼，你傾向於點那道安全可靠的保底菜，而不是冒險獲得一道新的最愛。
                </p>
              </div>
            </div>

            {/* 損失厭惡 */}
            <div id="loss-aversion" className="mb-12 scroll-mt-20">
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">損失厭惡</h3>
              
              <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-xl p-6 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-500 to-orange-400 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--text-primary)] mb-2">核心概念</h4>
                    <p className="text-sm text-[var(--text-secondary)]">
                      損失 $5,000 的心理影響遠大於獲得 $5,000 的心理影響。換句話說，需要獲得超過 $5,000 才能抵消 $5,000 損失帶來的心理負擔。
                    </p>
                  </div>
                </div>
              </div>

              {/* TODO: 添加損失厭惡曲線可視化 */}
              
              <div className="prose prose-sm max-w-none space-y-4 text-[var(--text-secondary)]">
                <p>
                  這種現象也體現在人際關係中：友誼可能需要多年才能建立，但一次困難或痛苦的事件就能立即結束長久的友誼。
                </p>

                <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-6">
                  <h5 className="font-semibold text-[var(--text-primary)] mb-3">交易中的損失厭惡表現</h5>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--accent-gold)]">•</span>
                      <span>表現良好的投資下跌到買入價以下時，投資者不願意承認小額損失</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--accent-gold)]">•</span>
                      <span>投資繼續下跌，最終情緒反應變得極端，在最糟糕的時候投降</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--accent-gold)]">•</span>
                      <span>在頂部形成期間表現出自滿，在底部區域表現出恐慌</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* ==================== 信念保持偏誤 ==================== */}
            <SectionHeader
              id="belief-preservation"
              title="信念保持偏誤"
              titleEn="Belief Preservation Biases"
              description="傾向於固守已有信念，即使這些信念可能不合邏輯或非理性。這類偏誤往往導致交易量減少，因為投資者傾向於維持現有頭寸而非根據新信息調整。"
              icon={Brain}
              gradient="from-blue-500 to-cyan-400"
            />

            <BiasCard
              id="conservatism"
              title="保守主義"
              titleEn="Conservatism"
              type="belief"
              definition="傾向於過度重視當前信念，低估新信息的價值。投資者由於在接收新信息時更保守地改變預測，從而低估某一結果的機率。"
              marketExample="你一直看好某隻股票的預測。但形成了頭肩頂形態，頸線已突破。儘管更大調整發展的可能性增加，你仍堅持長期預測。你可能低估了趨勢已經改變的重要性。"
              impact={{
                volume: "導致交易量減少",
                price: "可能在趨勢改變的證據下仍持有頭寸，導致更大的回撤和表現不佳",
                sentiment: "不傾向於出現極端波動，因為無法轉變市場觀點"
              }}
            />

            <BiasCard
              id="confirmation"
              title="確認偏誤"
              titleEn="Confirmation Bias"
              type="belief"
              definition="傾向於尋找和注意確認已有信念的信息，而忽視和低估與已有信念相矛盾的信息。忽略與當前觀點相反的證據，接受類似觀點而不考慮當前觀點可能是錯誤的。"
              marketExample="你持有某股票多頭頭寸，一位有影響力的分析師下調了該股票。你甚至不閱讀報告以查看你的觀點是否需要改變。同一天，另一位分析師上調了該股票，你立即閱讀並同意該分析。"
              impact={{
                volume: "導致交易量減少",
                price: "可能在趨勢改變的證據下仍持有頭寸，導致更大的回撤。傾向於建立頭寸並持有集中的投資組合，波動性更高",
                sentiment: "不傾向於出現極端波動，因為無法轉變市場觀點"
              }}
            />

            <BiasCard
              id="representativeness"
              title="代表性偏誤"
              titleEn="Representativeness Bias"
              type="belief"
              definition="傾向於根据過去的经验和分类对新信息进行分类。还有傾向於過度依賴小樣本信息，这些樣本并不代表整体。根据以前的預測做出預測，而不对当前情况进行詳細分析，因为当前情况与以前的情况相似。这是季节性預測错誤或小樣本经验的典型表現。"
              marketExample="你对過去 10 年的分析顯示，9 月份是一年中最差的月份。儘管 7 月和 8 月低点形成了看涨的双底形态，并且動量和广度指标强劲，你仍然推荐做空，因为大多数 9 月份都是下跌的。你默認采用簡單預測，而不是檢查最近几个月更複雜的發展。"
              impact={{
                volume: "導致交易量减少",
                price: "可能在趨勢改变的證據下仍持有頭寸，導致更大的回撤。傾向於建立頭寸并持有集中的投资組合，波動性更高",
                sentiment: "不傾向於出现極端波動，因为無法轉變市場觀點"
              }}
            />

            <BiasCard
              id="illusion-of-control"
              title="控制錯覺"
              titleEn="Illusion of Control"
              type="belief"
              definition="傾向於相信可以控制或影響某些實際上無法控制的事物。"
              marketExample="这通常在非常短期的交易建議中觀察到。社交媒体影響力的爆炸式增长和當日到期期权对交易量和价格動量因子的影響，增加了对隨機結果的信心。许多投资意见领袖正在影響交易量和流动性。"
              impact={{
                volume: "導致交易量大幅增加",
                price: "動量和趨勢追随者纷纷跟进，認為价格會繼續朝同一方向發展。通常，過度交易會導致低于平均水平的結果。投资組合分散度較低，回报波動性更高",
                sentiment: "可能產生更極端的情绪波動"
              }}
            />

            <BiasCard
              id="hindsight"
              title="后见之明"
              titleEn="Hindsight Bias"
              type="belief"
              definition="傾向於相信過去的事件是可預測的和合理的，而實際上并非如此。事后相信預測是確定的。"
              marketExample="你查看标普 500 指数 20 年的图表，画出趨勢线顯示 2000 年 90 年代牛市的突破以及死亡交叉。在同一张图表上，你顯示了 2002 年至 2007 年牛市的趨勢线突破以及死亡交叉。你的分析是，这些明顯是熊市，这些指标顯示了这一点的明确性。在當時，預測 50% 或更大的市場下跌是不太可能的，但事后，人们相信他们準確預測了这些走势。"
              impact={{
                volume: "对交易量影響不大或沒有影響",
                price: "可能導致過度冒险，因为他们認為当前的預測不會失誤，產生错誤的信心。過度依賴過去，对未来結果关注不够",
                sentiment: "不傾向於出现極端波動，因为無法轉變市場觀點"
              }}
            />

            <BiasCard
              id="cognitive-dissonance"
              title="認知失調"
              titleEn="Cognitive Dissonance"
              type="belief"
              definition="傾向於竭盡全力抑制和消除認知失調，即当新信息与預先存在的信息和理解衝突时感受到的心理不适。"
              marketExample="你相信你已经選擇了该行业中表現最佳的股票，但随后几位分析师下调了该股票并建議購買竞争对手。儘管其他人卖出该股票，而该行业的其他股票正在上涨，你的股票却沒有，你可能仍然繼續持有该股票。在心理上，卖出并转换到表現更好的股票變得很困难。最终，这可能變得不堪重负，你可能最终認輸。"
              impact={{
                volume: "導致交易量减少",
                price: "可能在趨勢改变的證據下仍持有頭寸，導致更大的回撤。傾向於建立頭寸并持有集中的投资組合，波動性更高",
                sentiment: "不傾向於出现極端波動，因为無法轉變市場觀點"
              }}
            />

            {/* ==================== 信息处理偏誤 ==================== */}
            <SectionHeader
              id="information-processing"
              title="信息处理偏誤"
              titleEn="Information Processing Biases"
              description="傾向於以不合逻辑或非理性的方式处理新信息，这往往是信念保持偏誤的前兆。这些偏誤帮助解释技术分析师觀察到的许多图表形态，如支撑与阻力区域的形成。"
              icon={Zap}
              gradient="from-purple-500 to-pink-400"
            />

            <BiasCard
              id="anchoring"
              title="錨定效應"
              titleEn="Anchoring Bias"
              type="information"
              definition="傾向於使用啟發式方法（经验、试错、经验法则、心理捷径）错誤地估计機率，然后錨定到错誤的值。这种偏誤導致人们固定于購買价格或預測价格，而这个价格只对他们有意义，对未来价格行为沒有影響。"
              marketExample="你以 $40 买入一只股票，在之前低点的强支撑測试上，初始目标是 $50。一段时间后，支撑被突破，股票現在在 $30。更新的分析表明它可能跌至 $20。你不願意改变你的价格目标，因为理想情况下，你想在 $40 收回你的钱，現在可能會在那个点卖出以達到盈虧平衡。你錨定在一个无关的价格上，这个价格只对你有意义，对股票的未来走势沒有影響。"
              impact={{
                volume: "導致交易量减少",
                price: "可能在趨勢改变的證據下仍持有頭寸，導致更大的回撤。傾向於建立頭寸并持有集中的投资組合，波動性更高",
                sentiment: "不傾向於出现極端波動，因为無法轉變市場觀點"
              }}
            />

            <BiasCard
              id="availability"
              title="可得性偏誤"
              titleEn="Availability Bias"
              type="information"
              definition="傾向於根据事件的易于回忆或理解程度来決定其機率。容易回忆和理解的結果被認為比那些更难回忆或理解的結果更有可能发生。"
              marketExample="你专注于艾略特波浪分析，很少考虑其他形式的市場解读。有人要求你对一只你从未听说过的股票进行預測。你做了一个簡單的波浪计数，而不考虑相对强度以及是否有任何跨市場考虑。你以最簡單或最容易的方法評估證券，可能導致更弱的結果。"
              impact={{
                volume: "略微傾向於更活跃，但不顯著",
                price: "往往導致糟糕的進出場決策，因为沒有考虑更徹底的分析。投资者往往在全球範圍内分散程度較低，因为他们傾向於投资在本地或容易獲得更多信息的資產",
                sentiment: "情绪可能波動，因为意见可能因他人的影響而更快地改变。更多的羊群行为"
              }}
            />

            <BiasCard
              id="self-attribution"
              title="自我歸因"
              titleEn="Self-Attribution Bias"
              type="information"
              definition="个人傾向於将成功歸因于內在因素（如才能或遠見），而将失败歸咎于外部影響（如运气不好）。"
              marketExample="当你的頭寸不奏效时，你不断責怪他人，而当頭寸奏效时，你将功劳归于自己的想法。在一段时间的良好回报后，投资者可能对自己的投资能力过于樂觀。随着信心上升，過度交易是常见的結果。"
              impact={{
                volume: "導致交易量大幅增加",
                price: "往往導致糟糕的進出場決策以及强烈的表現不佳。投资者往往分散程度較低，持有更多投机性資產",
                sentiment: "情绪可能波動，因为意见可能因他人的影響而更快地改变。更多的羊群行为"
              }}
            />

            <BiasCard
              id="framing"
              title="框架效應"
              titleEn="Framing Bias"
              type="information"
              definition="傾向於根据問題的提问或框架方式来回答問題。受到与手头決策无关的信息的影響。以負面方式呈现的无关信息會負面影響你的觀點，反之亦然。"
              marketExample="早上去办公室前你和配偶吵架了。你心情非常糟糕，这与市場无关。你长期持有的看涨頭寸的收益公布了一些正面和一些負面的消息。由于你的心情，你選擇卖出该頭寸，因为你過度关注負面因素，儘管在過去几年中你已经度过了许多低迷期。"
              impact={{
                volume: "对交易量沒有顯著影響",
                price: "可能導致强烈的表現不佳期（因为風險承受能力往往判断不佳）和可能次优的投资組合配置",
                sentiment: "情绪可能波動，因为意见可能因他人的影響而更快地改变。更多的羊群行为"
              }}
            />

            <BiasCard
              id="mental-accounting"
              title="心理帳戶"
              titleEn="Mental Accounting"
              type="information"
              definition="傾向於根据分配给哪个'心理帳戶'以不同方式對待相同金额的钱——例如，用于購買頭寸的钱与頭寸赚取的钱。然而，由于金钱的可替代性，这是不合逻辑的。这些心理帳戶基于金钱的来源——奖金、工资、继承或赌博奖金——与计划用途——休闲、必需品、慈善等。"
              marketExample="你是对冲基金的自营交易员。你从不持有隔夜頭寸。距离月底还有几天，你刚好沒有達到月度奖金数字。你在收盘前一小时左右大量建仓，试图達到你的数字。你在股票收盘后報告收益前约一小时买入了一个晚期突破。你推測有泄漏，快钱玩家知道这些数字。公司在最后五分钟交易暂停后提前公布，股票跳空下跌了几美元。你快速计算，如果按照你的交易计划止损，你就拿不到奖金了。所以你反而保留了股票过夜，希望早上會有反弹来填补缺口，你可以持平退出，仍然拿到奖金。"
              impact={{
                volume: "对交易量沒有顯著影響",
                price: "如果你保留虧損頭寸并过早卖出赢家，可能導致糟糕的投资組合构建和执行",
                sentiment: "情绪受影響較小，因为改变觀點變得更加困难"
              }}
            />

            <BiasCard
              id="recency"
              title="近因效應"
              titleEn="Recency Bias"
              type="information"
              definition="傾向於回忆和强调最近的事件、觀察和发生。当前事件過度影響你的預測，而不是与之相反的长期證據。"
              marketExample="最近的图表形态比趨勢指标的长期衰减或在多个周期中重复的长期形态更重地影響你的預測。你正在切换你的时间框架焦点，因为其他分析师跳上当前的叙事。你受到最近事件的過度影響，而不是坚持更长期焦点的更高機率。"
              impact={{
                volume: "由于更多关注最新新闻或事件，交易量略有增加",
                price: "关注動量因子可能導致過度交易和长期表現不佳。在日常噪音中被困时，資產配置決策可能是次要的",
                sentiment: "情绪可能波動，因为意见可能因他人的影響而更快地改变。更多的羊群行为"
              }}
            />

            <BiasCard
              id="outcome"
              title="結果偏誤"
              titleEn="Outcome Bias"
              type="information"
              definition="傾向於根据過去的結果做出決定，或者傾向於仅根据過去的表現選擇證券，而不是觀察当前和未来的因素。"
              marketExample="你購買了一只共同基金，因为過去 10 年的回报强劲。然而，首席投资經理和几位高级分析师最近已经退休。大部分投资团队是新的，投资风格发生了實質性變化。你也可能購買高估值資產，因为最近表現强劲而不考虑长期價值。"
              impact={{
                volume: "对交易量沒有顯著影響",
                price: "可能導致投资組合表現不佳，因为投资決策仅基于過去的回报，而不是更稳健的前瞻性分析",
                sentiment: "情绪不是主要因素"
              }}
            />

            {/* ==================== 情绪偏誤 ==================== */}
            <SectionHeader
              id="emotional"
              title="情绪偏誤"
              titleEn="Emotional Biases"
              description="情绪偏誤源于傾向於潜意识处理決策，而非更認知的努力。它们对投资者来说更难修正，因为情绪与通过直觉或冲动自发產生的心理状态相关，而不是通过有意识的努力。可能只能适應它们，而不是纠正它们。"
              icon={Heart}
              gradient="from-rose-500 to-red-400"
            />

            <BiasCard
              id="loss-aversion-bias"
              title="損失厭惡偏誤"
              titleEn="Loss Aversion Bias"
              type="emotional"
              definition="傾向於更喜欢避免損失而不是實現收益。理性的做法是增加風險以增加收益，而不是减轻損失。矛盾的是，大多数人为了避免損失而承担的風險比为了實現收益而承担的風險更大。投资者不喜欢損失的程度大约是他们享受相同美元價值收益的两倍。損失厭惡可以解释顶部形态期间的自满和投资者因恐惧損失而恐慌。在低点附近表現为更高的美元成交量，而在顶部發展时成交量递减。"
              marketExample="在一段时间的良好表現后，你的投资已经跌破購買价格。你不願意承担小额損失，因为你不喜欢承担損失。投资繼續下跌。最终，你投降，因为情绪反應严重且損失極端。"
              impact={{
                volume: "可能通过快速获利和在極端情况下被迫（投降）卖出来影響交易量",
                price: "可能導致投资組合表現不佳，因为傾向於让損失持续并过早获利。在最糟糕的时候投降是典型的",
                sentiment: "情绪在高点时往往被低估，在低点时被高估"
              }}
            />

            <BiasCard
              id="endowment"
              title="禀賦效應"
              titleEn="Endowment Bias"
              type="emotional"
              definition="傾向於賦予自己擁有的資產比不擁有的資產更高的價值。"
              marketExample="你以 $20 擁有一只流动性差的股票的控股权，你的目标是 $30。你有一个非常大的区块，所以通常很难移动。激进股东试图将公司私有化。他们为股票提供了 $35，儘管估值更高，你不願意出售你的股票。你現在認為價值在 $40，儘管你的分析表明 $30 是完整價值。"
              impact={{
                volume: "導致交易量减少",
                price: "对价格沒有實質性影響",
                sentiment: "不傾向於出现極端波動，因为無法轉變市場觀點"
              }}
            />

            <BiasCard
              id="overconfidence"
              title="過度自信"
              titleEn="Overconfidence Bias"
              type="emotional"
              definition="傾向於对自己的直觉推理、判断和認知能力表現出不必要的信心。"
              marketExample="你对标普 500 指数有长期看涨觀點。儘管道氏理论發出卖出信号且市場广度衰减，但你在看涨时比看跌时更多地上电视。随着市場崩溃，你繼續做出你的看涨论点，儘管趨勢线已经突破，并且有明顯的熊市正在發展。"
              impact={{
                volume: "導致交易量大幅增加",
                price: "往往導致糟糕的進出場決策以及强烈的表現不佳。投资者往往分散程度較低，持有更多投机性資產",
                sentiment: "情绪可能波動，意见可能更快地改变。更多的羊群行为"
              }}
            />

            <BiasCard
              id="regret-aversion"
              title="后悔厭惡"
              titleEn="Regret Aversion"
              type="emotional"
              definition="傾向於避免做出決定，因为擔心結果會很糟糕或比現在更糟。"
              marketExample="你處於虧損頭寸，儘管有相反的證據，也無法改变你的觀點。"
              impact={{
                volume: "導致交易量减少",
                price: "可能在趨勢改变的證據下仍持有頭寸，導致更大的回撤",
                sentiment: "不傾向於出现極端波動，因为無法轉變市場觀點"
              }}
            />

            <BiasCard
              id="conjunction-fallacy"
              title="合取谬誤"
              titleEn="Conjunction Fallacy"
              type="emotional"
              definition="傾向於错誤地估计事件的機率，或者傾向於从不太可能的事件中得出結論或推论。"
              marketExample="你建議买入一只明顯處於下跌趨勢的股票，因为同一行业的另一只股票被收购了。假设该行业的其他股票也會被收购。你建議买入大豆，因为有滿月。你觀察到在過去一年中，滿月后的第二天大豆有 55% 的时间會上涨。"
              impact={{
                volume: "可能導致短期交易量增加",
                price: "往往導致糟糕的決策和隨機結果",
                sentiment: "可能產生短期情绪波動"
              }}
            />

            <BiasCard
              id="self-control"
              title="自我控制"
              titleEn="Self-Control Bias"
              type="emotional"
              definition="傾向於未能为追求长期目标而采取行动，因为由于缺乏自律而偏向短期目标。"
              marketExample="你一直试图開發一个更全面的市場行业组分析系统用于市場報告。因为在写完報告后需要花费大量时间，你反而每天下班后去酒吧，而不是投入工作来使報告更好、更全面。"
              impact={{
                volume: "对交易量沒有顯著影響",
                price: "可能導致短期思维和次优的长期表現",
                sentiment: "情绪不是主要因素"
              }}
            />

            <BiasCard
              id="status-quo"
              title="现状偏誤"
              titleEn="Status Quo Bias"
              type="emotional"
              definition="傾向於保持现状，什么都不做，而不是做出改变。接受默認是容易和舒适的。"
              marketExample="一只股票正在攀升，但沒有跟上基准的步伐。因为股票正在走高，所以将其保留在投资組合中比寻找一只跑赢基准的股票更容易。"
              impact={{
                volume: "導致交易量减少",
                price: "可能導致投资組合表現不佳，因为持有表現不佳的資產",
                sentiment: "不傾向於出现極端波動，因为無法轉變市場觀點"
              }}
            />

            <BiasCard
              id="affinity"
              title="亲和偏誤"
              titleEn="Affinity Bias"
              type="emotional"
              definition="傾向於根据产品或公司如何反映个人價值觀和自我形象做出糟糕的選擇。"
              marketExample="儘管股票下跌，你仍将其保留在投资組合中，因为该公司在其产品中使用所有可持续材料，而你支持这一点。"
              impact={{
                volume: "对交易量沒有顯著影響",
                price: "可能導致持有表現不佳的資產，因为情感依恋",
                sentiment: "情绪不是主要因素"
              }}
            />

            {/* ==================== 行为偏誤与图表形态 ==================== */}
            <SectionHeader
              id="chart-patterns"
              title="行为偏誤与图表形态"
              titleEn="Behavioral Biases and Chart Patterns"
              icon={TrendingUp}
              gradient="from-amber-500 to-orange-400"
            />

            <div className="prose prose-sm max-w-none space-y-6 text-[var(--text-secondary)]">
              <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-6">
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">偏誤如何影響图表形态</h3>
                
                <p className="mb-4">
                  損失厭惡、心理帳戶、錨定和后见之明偏誤等行为现象与许多图表形态的發展高度相关，包括支撑与阻力区域、双顶和双底以及三角形。
                </p>

                <div className="bg-[var(--accent-gold)]/10 border-l-4 border-[var(--accent-gold)] pl-4 py-3 mb-4">
                  <p className="text-[var(--text-primary)] font-semibold mb-2">典型的投资者心理</p>
                  <p className="text-sm italic">
                    "我之前涨了那么多，現在正在虧損；如果它回到我买入的地方，我就卖出！"
                  </p>
                </div>

                <p className="mb-4">
                  投资者會有意识地记住他们个人的利润和損失，通常在经历了一段时间未實現的收益和損失后，投资者會傾向於做出盈虧平衡类型的決策。
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <h4 className="font-semibold text-[var(--text-primary)] mb-2 flex items-center gap-2">
                      <TrendingDown className="w-5 h-5 text-blue-400" />
                      導致这些行为的偏誤
                    </h4>
                    <ul className="text-sm space-y-1">
                      <li>• 心理帳戶</li>
                      <li>• 錨定效應</li>
                      <li>• 損失厭惡</li>
                    </ul>
                  </div>

                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                    <h4 className="font-semibold text-[var(--text-primary)] mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-purple-400" />
                      導致投资者不作为的偏誤
                    </h4>
                    <ul className="text-sm space-y-1">
                      <li>• 现状偏誤</li>
                      <li>• 過度自信</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl p-6">
                <h4 className="font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[var(--accent-gold)]" />
                  技术分析中的关键觀察
                </h4>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--accent-gold)] font-bold">•</span>
                    <span><strong>支撑变阻力</strong>：这些行为決策（心理帳戶、錨定、損失厭惡）傾向於表現为交易者所说的头顶供應。技术分析中的"曾经的支撑变成阻力"这句话，正是这些偏誤驱动的"盈虧平衡心态"決策的結果。</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--accent-gold)] font-bold">•</span>
                    <span><strong>投降形态</strong>：当许多人对共同虧損頭寸的情绪反應以递增的速度增加时，最终導致技术分析师所说的投降形态。極端看跌的价格行为加上不断增加的成交量是由金融損失的情绪痛苦驱动的。</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--accent-gold)] font-bold">•</span>
                    <span><strong>顶部自满</strong>：相反，随着价格上涨成交量下降的模式表明一定程度的自满，投资者对上涨的价格感到满意。</span>
                  </li>
                </ul>
              </div>

              {/* TODO: 考虑添加自測题组件 */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

