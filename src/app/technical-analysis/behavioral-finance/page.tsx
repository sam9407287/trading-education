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
              marketExample="你持續看好某科技股三個月，認為它會突破新高。然而最近公司公布營收不如預期，股價連續下跌並跌破重要支撐位。你仍堅持原本的看法，認為只是短期波動，忽略了基本面和技術面都已經轉弱的訊號。"
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
              marketExample="你買入電動車股票後，只關注看好電動車產業的新聞和報導，對於產能過剩、競爭加劇的負面消息視而不見。社群媒體上有人分享看好電動車的文章你會轉發，但批評的聲音你直接略過。結果錯過了產業反轉的早期警訊。"
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
              definition="傾向於根據過去的經驗和分類對新信息進行分類。還有傾向於過度依賴小樣本信息，這些樣本並不代表整體。根據以前的預測做出預測，而不對當前情況進行詳細分析，因為當前情況與以前的情況相似。這是季節性預測錯誤或小樣本經驗的典型表現。"
              marketExample="你注意到過去三年每到農曆新年前，生技股都會上漲。今年新年前你大舉買入生技股，期待重現往年行情。但你忽略了今年整體環境已經改變：Fed 持續升息、資金緊縮、產業面臨監管壓力。結果不僅沒漲反而大跌，你過度依賴小樣本的歷史經驗，沒考慮當前的宏觀環境。"
              impact={{
                volume: "導致交易量減少",
                price: "可能在趨勢改變的證據下仍持有頭寸，導致更大的回撤。傾向於建立頭寸並持有集中的投資組合，波動性更高",
                sentiment: "不傾向於出現極端波動，因為無法轉變市場觀點"
              }}
            />

            <BiasCard
              id="illusion-of-control"
              title="控制錯覺"
              titleEn="Illusion of Control"
              type="belief"
              definition="傾向於相信可以控制或影響某些實際上無法控制的事物。"
              marketExample="你開發了一套當沖策略，在模擬交易中連續獲利十次。你深信掌握了市場規律，開始用真實資金大量當沖交易。然而市場的隨機波動遠比你想像的複雜，連續虧損讓你措手不及。你以為能精準預測短線走勢，實際上很多時候只是運氣好遇到趨勢行情。"
              impact={{
                volume: "導致交易量大幅增加",
                price: "動量和趨勢追隨者紛紛跟進，認為價格會繼續朝同一方向發展。通常，過度交易會導致低於平均水平的結果。投資組合分散度較低，回報波動性更高",
                sentiment: "可能產生更極端的情緒波動"
              }}
            />

            <BiasCard
              id="hindsight"
              title="後見之明"
              titleEn="Hindsight Bias"
              type="belief"
              definition="傾向於相信過去的事件是可預測的和合理的，而實際上並非如此。事後相信預測是確定的。"
              marketExample="2020 年疫情導致股市暴跌後快速反彈。現在回看圖表，你跟朋友說：「當時明明就很明顯會 V 型反轉，政府一定會大量印鈔救市。」但實際上當時市場恐慌，沒人知道會跌到哪、何時反彈。你事後諸葛，誤以為自己能預測這種黑天鵝事件，導致下次危機時過度自信，承擔過高風險。"
              impact={{
                volume: "對交易量影響不大或沒有影響",
                price: "可能導致過度冒險，因為他們認為當前的預測不會失誤，產生錯誤的信心。過度依賴過去，對未來結果關注不夠",
                sentiment: "不傾向於出現極端波動，因為無法轉變市場觀點"
              }}
            />

            <BiasCard
              id="cognitive-dissonance"
              title="認知失調"
              titleEn="Cognitive Dissonance"
              type="belief"
              definition="傾向於竭盡全力抑制和消除認知失調，即當新信息與預先存在的信息和理解衝突時感受到的心理不適。"
              marketExample="你花了大量時間研究一檔 AI 概念股，認為它是未來十年的明星。但公司連續兩季虧損擴大，競爭對手推出更好的產品，你的股票持續下跌。你內心很掙扎：承認自己看錯很痛苦，但繼續持有又不斷虧錢。你開始找各種理由說服自己「長期一定會漲回來」，拒絕面對投資失敗的事實，最終越陷越深。"
              impact={{
                volume: "導致交易量減少",
                price: "可能在趨勢改變的證據下仍持有頭寸，導致更大的回撤。傾向於建立頭寸並持有集中的投資組合，波動性更高",
                sentiment: "不傾向於出現極端波動，因為無法轉變市場觀點"
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
              definition="傾向於使用啟發式方法（經驗、試錯、經驗法則、心理捷徑）錯誤地估計機率，然後錨定到錯誤的值。這種偏誤導致人們固定於購買價格或預測價格，而這個價格只對他們有意義，對未來價格行為沒有影響。"
              marketExample="你在 150 元買入一檔股票，心想「只要漲回 150 我就賣」。股票跌到 120 元，基本面持續惡化，產業前景也轉差。理性分析應該停損，但你執著於「等回本」，每天盯著 150 這個價格。這個價格對市場毫無意義，只是你的買入成本。結果股票繼續跌到 80 元，你的錨定心理讓你錯過了最佳停損時機。"
              impact={{
                volume: "導致交易量減少",
                price: "可能在趨勢改變的證據下仍持有頭寸，導致更大的回撤。傾向於建立頭寸並持有集中的投資組合，波動性更高",
                sentiment: "不傾向於出現極端波動，因為無法轉變市場觀點"
              }}
            />

            <BiasCard
              id="availability"
              title="可得性偏誤"
              titleEn="Availability Bias"
              type="information"
              definition="傾向於根據事件的易於回憶或理解程度來決定其機率。容易回憶和理解的結果被認為比那些更難回憶或理解的結果更有可能發生。"
              marketExample="朋友最近在半導體股賺了大錢，你每天都聽他分享戰績。媒體也不斷報導晶片產業的榮景。於是你認為「現在投資半導體一定賺」，把大部分資金投入。但你忽略了其他產業的機會，也沒評估半導體是否已經過熱。只因為這些信息「容易取得」和「印象深刻」，就過度高估了獲利機率。"
              impact={{
                volume: "略微傾向於更活躍，但不顯著",
                price: "往往導致糟糕的進出場決策，因為沒有考慮更徹底的分析。投資者往往在全球範圍內分散程度較低，因為他們傾向於投資在本地或容易獲得更多信息的資產",
                sentiment: "情緒可能波動，因為意見可能因他人的影響而更快地改變。更多的羊群行為"
              }}
            />

            <BiasCard
              id="self-attribution"
              title="自我歸因"
              titleEn="Self-Attribution Bias"
              type="information"
              definition="個人傾向於將成功歸因於內在因素（如才能或遠見），而將失敗歸咎於外部影響（如運氣不好）。"
              marketExample="你連續三筆交易都獲利，開始覺得自己是「股市天才」，認為是靠精準判斷才賺錢。但當第四筆交易虧損時，你怪罪「主力洗盤」、「外資亂搞」、「消息面突然轉空」。你沒意識到前面的獲利可能只是運氣好遇到多頭，而虧損才是真實的交易水平。這種選擇性歸因讓你無法客觀檢討，持續重複錯誤。"
              impact={{
                volume: "導致交易量大幅增加",
                price: "往往導致糟糕的進出場決策以及強烈的表現不佳。投資者往往分散程度較低，持有更多投機性資產",
                sentiment: "情緒可能波動，因為意見可能因他人的影響而更快地改變。更多的羊群行為"
              }}
            />

            <BiasCard
              id="framing"
              title="框架效應"
              titleEn="Framing Bias"
              type="information"
              definition="傾向於根據問題的提問或框架方式來回答問題。受到與手頭決策無關的信息的影響。以負面方式呈現的無關信息會負面影響你的觀點，反之亦然。"
              marketExample="你持有一檔股票，早上起床心情很好，看到公司公告「營收略低於預期但仍年增 5%」，你想「還不錯啊，繼續持有」。但如果早上剛跟家人吵架，心情煩躁，看到同樣的公告，你可能想「才成長 5%？太爛了，不如預期就是利空」而急著賣出。同樣的信息，因為你的情緒框架不同，做出完全相反的決策。"
              impact={{
                volume: "對交易量沒有顯著影響",
                price: "可能導致強烈的表現不佳期（因為風險承受能力往往判斷不佳）和可能次優的投資組合配置",
                sentiment: "情緒可能波動，因為意見可能因他人的影響而更快地改變。更多的羊群行為"
              }}
            />

            <BiasCard
              id="mental-accounting"
              title="心理帳戶"
              titleEn="Mental Accounting"
              type="information"
              definition="傾向於根據分配給哪個「心理帳戶」以不同方式對待相同金額的錢——例如，用於購買頭寸的錢與頭寸賺取的錢。然而，由於金錢的可替代性，這是不合邏輯的。這些心理帳戶基於金錢的來源——獎金、工資、繼承或賭博獎金——與計劃用途——休閒、必需品、慈善等。"
              marketExample="你用年終獎金 20 萬買股票，賺了 5 萬。這 5 萬獲利你覺得「反正是賺來的」，隨意買了風險很高的飆股，結果虧光。但如果是本金虧 5 萬，你會非常心痛。明明都是你的錢，但你給「本金」和「獲利」設了不同的心理帳戶，對待方式完全不同。結果對獲利太過輕率，又讓虧損的股票「等回本」，形成惡性循環。"
              impact={{
                volume: "對交易量沒有顯著影響",
                price: "如果你保留虧損頭寸並過早賣出贏家，可能導致糟糕的投資組合構建和執行",
                sentiment: "情緒受影響較小，因為改變觀點變得更加困難"
              }}
            />

            <BiasCard
              id="recency"
              title="近因效應"
              titleEn="Recency Bias"
              type="information"
              definition="傾向於回憶和強調最近的事件、觀察和發生。當前事件過度影響你的預測，而不是與之相反的長期證據。"
              marketExample="過去一週 AI 股天天漲停，媒體瘋狂報導「AI 革命」。你完全忘記三個月前 AI 股才剛崩跌 30%，也忽略過去十年科技股的週期規律。只因為最近幾天的火熱行情，就認為「這次不一樣」、「AI 會永遠漲」，在最高點重押。你被最近的印象牽著走，忽略了更長期的歷史規律。"
              impact={{
                volume: "由於更多關注最新新聞或事件，交易量略有增加",
                price: "關注動量因子可能導致過度交易和長期表現不佳。在日常噪音中被困時，資產配置決策可能是次要的",
                sentiment: "情緒可能波動，因為意見可能因他人的影響而更快地改變。更多的羊群行為"
              }}
            />

            <BiasCard
              id="outcome"
              title="結果偏誤"
              titleEn="Outcome Bias"
              type="information"
              definition="傾向於根據過去的結果做出決定，或者傾向於僅根據過去的表現選擇證券，而不是觀察當前和未來的因素。"
              marketExample="你看到某檔基金過去五年年化報酬率 20%，毫不猶豫就買入。但你沒注意到原本的明星經理人已經離職，新團隊完全沒經驗。產業環境也從低利轉為高利率，過去的高成長股策略不再適用。你只看「過去表現好」就買，忽略了環境和團隊都已經改變，結果接下來連續兩年虧損。"
              impact={{
                volume: "對交易量沒有顯著影響",
                price: "可能導致投資組合表現不佳，因為投資決策僅基於過去的回報，而不是更穩健的前瞻性分析",
                sentiment: "情緒不是主要因素"
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
              definition="傾向於更喜歡避免損失而不是實現收益。理性的做法是增加風險以增加收益，而不是減輕損失。矛盾的是，大多數人為了避免損失而承擔的風險比為了實現收益而承擔的風險更大。投資者不喜歡損失的程度大約是他們享受相同美元價值收益的兩倍。損失厭惡可以解釋頂部形態期間的自滿和投資者因恐懼損失而恐慌。在低點附近表現為更高的美元成交量，而在頂部發展時成交量遞減。"
              marketExample="你買股票賺 10 萬會高興一天，但虧 10 萬會難過一個月。某股票你在 100 元買入，跌到 95 元你捨不得認賠「才虧 5%，等反彈」。繼續跌到 80 元你更不敢賣「已經虧這麼多了，賣了就真的虧了」。最後跌到 50 元你崩潰停損。反過來，獲利 5% 你就急著賣「見好就收」，錯過後面大波段。"
              impact={{
                volume: "可能通過快速獲利和在極端情況下被迫（投降）賣出來影響交易量",
                price: "可能導致投資組合表現不佳，因為傾向於讓損失持續並過早獲利。在最糟糕的時候投降是典型的",
                sentiment: "情緒在高點時往往被低估，在低點時被高估"
              }}
            />

            <BiasCard
              id="endowment"
              title="稟賦效應"
              titleEn="Endowment Bias"
              type="emotional"
              definition="傾向於賦予自己擁有的資產比不擁有的資產更高的價值。"
              marketExample="你花很多時間研究後買入一檔股票，總覺得它「特別有潛力」。朋友推薦另一檔基本面更好、技術面也更強的股票，你卻興趣缺缺，認為「我的股票更好」。只因為這是你擁有的、你研究過的，就給它更高的評價。客觀來看兩檔差不多，但你的情感連結讓你高估了自己持股的價值。"
              impact={{
                volume: "導致交易量減少",
                price: "對價格沒有實質性影響",
                sentiment: "不傾向於出現極端波動，因為無法轉變市場觀點"
              }}
            />

            <BiasCard
              id="overconfidence"
              title="過度自信"
              titleEn="Overconfidence Bias"
              type="emotional"
              definition="傾向於對自己的直覺推理、判斷和認知能力表現出不必要的信心。"
              marketExample="你研究投資三年，看了很多書，最近連續獲利。開始覺得自己「已經看透市場」，朋友問你都說「這個一定漲」、「那個必跌」。你忽略了獲利可能只是運氣好遇到多頭，開始加大槓桿、頻繁交易。當市況轉變，你堅持己見不願認錯，最終把過去的獲利全部吐回去，甚至虧掉本金。"
              impact={{
                volume: "導致交易量大幅增加",
                price: "往往導致糟糕的進出場決策以及強烈的表現不佳。投資者往往分散程度較低，持有更多投機性資產",
                sentiment: "情緒可能波動，意見可能更快地改變。更多的羊群行為"
              }}
            />

            <BiasCard
              id="regret-aversion"
              title="後悔厭惡"
              titleEn="Regret Aversion"
              type="emotional"
              definition="傾向於避免做出決定，因為擔心結果會很糟糕或比現在更糟。"
              marketExample="你持有一檔虧損的股票，每天都在想要不要停損。但你害怕「停損後它就反彈」的後悔感，所以一直猶豫不決。結果股票繼續跌，虧損越來越大。你也不敢買新的標的，怕「買了就跌」。這種對後悔的恐懼讓你無法採取行動，只能被動承受損失持續擴大。"
              impact={{
                volume: "導致交易量減少",
                price: "可能在趨勢改變的證據下仍持有頭寸，導致更大的回撤",
                sentiment: "不傾向於出現極端波動，因為無法轉變市場觀點"
              }}
            />

            <BiasCard
              id="conjunction-fallacy"
              title="合取謬誤"
              titleEn="Conjunction Fallacy"
              type="emotional"
              definition="傾向於錯誤地估計事件的機率，或者傾向於從不太可能的事件中得出結論或推論。"
              marketExample="某食品股被併購，你立刻買進同產業其他五檔股票，認為「既然有一檔被併購，其他的也會被併購」。或者你發現「每逢滿月台股會跌」的規律（只觀察 8 次，5 次下跌），就在每個滿月放空。你把偶然事件當成必然，把巧合當成規律，導致錯誤決策。"
              impact={{
                volume: "可能導致短期交易量增加",
                price: "往往導致糟糕的決策和隨機結果",
                sentiment: "可能產生短期情緒波動"
              }}
            />

            <BiasCard
              id="self-control"
              title="自我控制"
              titleEn="Self-Control Bias"
              type="emotional"
              definition="傾向於未能為追求長期目標而採取行動，因為由於缺乏自律而偏向短期目標。"
              marketExample="你知道應該做好投資計劃、定期檢視持股、記錄交易日誌，但總是「明天再說」。看到別人短線賺錢的分享就手癢，忍不住衝動交易。你說要長期投資，但股票漲 10% 就想賣；說要嚴守紀律，但又常常違反自己的停損原則。缺乏自制力讓你無法執行長期策略，陷入短期誘惑的循環。"
              impact={{
                volume: "對交易量沒有顯著影響",
                price: "可能導致短期思維和次優的長期表現",
                sentiment: "情緒不是主要因素"
              }}
            />

            <BiasCard
              id="status-quo"
              title="現狀偏誤"
              titleEn="Status Quo Bias"
              type="emotional"
              definition="傾向於保持現狀，什麼都不做，而不是做出改變。接受默認是容易和舒適的。"
              marketExample="你的投資組合五年沒動過，雖然有幾檔股票表現很差，但「反正也不知道要換什麼」就繼續放著。有更好的投資機會出現，但要研究、要做決定很麻煩，所以就算了。「現在這樣也還好」成為你的口頭禪。這種惰性讓你錯過更好的機會，也讓表現不佳的持股持續拖累整體報酬。"
              impact={{
                volume: "導致交易量減少",
                price: "可能導致投資組合表現不佳，因為持有表現不佳的資產",
                sentiment: "不傾向於出現極端波動，因為無法轉變市場觀點"
              }}
            />

            <BiasCard
              id="affinity"
              title="親和偏誤"
              titleEn="Affinity Bias"
              type="emotional"
              definition="傾向於根據產品或公司如何反映個人價值觀和自我形象做出糟糕的選擇。"
              marketExample="你很重視環保，就大量買進某綠能公司股票，因為「支持永續發展」。即使公司連年虧損、技術落後、市占率下滑，你仍捨不得賣，覺得「賣掉就是背叛理念」。投資變成了情感寄託，而不是理性的資金配置。你喜歡公司的價值觀，不代表它是好的投資標的。"
              impact={{
                volume: "對交易量沒有顯著影響",
                price: "可能導致持有表現不佳的資產，因為情感依戀",
                sentiment: "情緒不是主要因素"
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

