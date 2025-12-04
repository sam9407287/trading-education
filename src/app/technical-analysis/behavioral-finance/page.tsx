'use client';

import Link from 'next/link';
import { ArrowLeft, Brain, AlertTriangle, Zap, Heart, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import AnchorNav from '@/components/ui/AnchorNav';

// 导航区块配置
const navSections = [
  {
    id: 'introduction',
    label: '引言与前景理论',
    children: [
      { id: 'intro', label: '行为金融学简介' },
      { id: 'prospect-theory', label: '前景理论' },
      { id: 'loss-aversion', label: '损失厌恶' },
    ],
  },
  {
    id: 'belief-preservation',
    label: '信念保持偏误',
    children: [
      { id: 'conservatism', label: '保守主义' },
      { id: 'confirmation', label: '确认偏误' },
      { id: 'representativeness', label: '代表性偏误' },
      { id: 'illusion-of-control', label: '控制错觉' },
      { id: 'hindsight', label: '后见之明' },
      { id: 'cognitive-dissonance', label: '认知失调' },
    ],
  },
  {
    id: 'information-processing',
    label: '信息处理偏误',
    children: [
      { id: 'anchoring', label: '锚定效应' },
      { id: 'availability', label: '可得性偏误' },
      { id: 'self-attribution', label: '自我归因' },
      { id: 'framing', label: '框架效应' },
      { id: 'mental-accounting', label: '心理账户' },
      { id: 'recency', label: '近因效应' },
      { id: 'outcome', label: '结果偏误' },
    ],
  },
  {
    id: 'emotional',
    label: '情绪偏误',
    children: [
      { id: 'loss-aversion-bias', label: '损失厌恶偏误' },
      { id: 'endowment', label: '禀赋效应' },
      { id: 'overconfidence', label: '过度自信' },
      { id: 'regret-aversion', label: '后悔厌恶' },
      { id: 'conjunction-fallacy', label: '合取谬误' },
      { id: 'self-control', label: '自我控制' },
      { id: 'status-quo', label: '现状偏误' },
      { id: 'affinity', label: '亲和偏误' },
    ],
  },
  {
    id: 'chart-patterns',
    label: '偏误与图表形态',
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

// 偏误卡片组件
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

          {/* 市场案例 */}
          <div className="border-l-4 border-[var(--accent-gold)] pl-4 py-2">
            <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-2">📊 市场案例</h4>
            <p className="text-sm text-[var(--text-secondary)]">{marketExample}</p>
          </div>

          {/* 技术分析影响 */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-3">技术分析影响</h4>
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
            行为金融学
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-3xl">
            理解投资者的心理偏误与决策行为，掌握市场情绪与价格形态背后的心理机制
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
            {/* ==================== 引言与前景理论 ==================== */}
            <SectionHeader
              id="introduction"
              title="引言与前景理论"
              titleEn="Introduction & Prospect Theory"
              icon={Brain}
              gradient="from-purple-500 to-pink-400"
            />

            {/* 行为金融学简介 */}
            <div id="intro" className="mb-12 scroll-mt-20">
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">行为金融学简介</h3>
              
              <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-6 mb-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-400 flex items-center justify-center flex-shrink-0 text-white font-bold">
                    2002
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--text-primary)] mb-2">诺贝尔经济学奖</h4>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Daniel Kahneman（1934-2024）因"将心理学研究的洞见整合到经济科学中，特别是关于不确定性下的人类判断和决策"而获得诺贝尔经济学奖。
                    </p>
                  </div>
                </div>
              </div>

              <div className="prose prose-sm max-w-none space-y-4 text-[var(--text-secondary)]">
                <p>
                  在不确定性下做出决策，是买卖风险资产决策的基本定义。看到自己的权益（通常是毕生积蓄）价值涨跌时，往往会产生强烈的情绪反应，并以不同方式影响人们的决策。
                </p>
                
                <p>
                  通过心理测试，Daniel Kahneman 和 Amos Tversky（1937-1996）发现，人类对收益和损失的反应主要由情绪驱动。技术分析师在图表形态、支撑与阻力区域、成交量形态以及投资者情绪变化中观察到这些行为反应。<strong className="text-[var(--text-primary)]">损失厌恶是驱动投资者决策的主要因素</strong>。
                </p>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 my-6">
                  <h5 className="font-semibold text-[var(--text-primary)] mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-blue-400" />
                    传统经济学的两大假设
                  </h5>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">1.</span>
                      <span><strong>"理性人"（Homo Economicus）</strong>：假设人类受自利动机驱动，能够做出理性决策</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">2.</span>
                      <span><strong>非实验性科学</strong>：依赖于对真实经济的观察，而非受控实验</span>
                    </li>
                  </ul>
                </div>

                <p>
                  但实际上，<strong className="text-[var(--text-primary)]">买卖决策并非总是理性的，事实上大多是非理性的</strong>。正如我们将从行为分析中学到的，买卖决策充满了情绪和非理性决策。
                </p>
              </div>
            </div>

            {/* 前景理论 */}
            <div id="prospect-theory" className="mb-12 scroll-mt-20">
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">前景理论</h3>
              
              <div className="prose prose-sm max-w-none space-y-4 text-[var(--text-secondary)] mb-6">
                <p>
                  Kahneman 与 Tversky 共同提出了<strong className="text-[var(--text-primary)]">前景理论（Prospect Theory）</strong>，作为标准经济理论的替代方案，更好地解释了实际观察到的行为。
                </p>
                
                <p className="text-lg font-semibold text-[var(--accent-gold)]">
                  核心观点：决策者对损失的重视程度远超过收益。
                </p>
              </div>

              {/* TODO: 添加前景理论互动图表 */}
              <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-6 mb-6">
                <h4 className="font-semibold text-[var(--text-primary)] mb-4">💡 实例：投资选择</h4>
                
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div className="bg-[var(--accent-green)]/10 border border-[var(--accent-green)]/20 rounded-lg p-4">
                    <div className="text-sm font-semibold text-[var(--accent-green)] mb-2">投资 A</div>
                    <p className="text-[var(--text-secondary)] text-sm mb-2">保证回报 $50,000</p>
                    <p className="text-xs text-[var(--text-muted)]">期望值 = $50,000 × 100% = $50,000</p>
                  </div>
                  
                  <div className="bg-[var(--accent-gold)]/10 border border-[var(--accent-gold)]/20 rounded-lg p-4">
                    <div className="text-sm font-semibold text-[var(--accent-gold)] mb-2">投资 B</div>
                    <p className="text-[var(--text-secondary)] text-sm mb-2">50% 概率获得 $100,000 或 $0</p>
                    <p className="text-xs text-[var(--text-muted)]">期望值 = $100,000 × 50% = $50,000</p>
                  </div>
                </div>

                <div className="bg-blue-500/10 border-l-4 border-blue-400 pl-4 py-2">
                  <p className="text-sm text-[var(--text-secondary)]">
                    <strong className="text-[var(--text-primary)]">结果</strong>：尽管两者期望值相同，但大多数投资者会选择保证收益的投资 A，因为<strong className="text-[var(--accent-gold)]">损失厌恶</strong>。
                  </p>
                </div>
              </div>

              <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-6">
                <h4 className="font-semibold text-[var(--text-primary)] mb-4">🍽️ 实例：餐厅点菜</h4>
                <p className="text-sm text-[var(--text-secondary)] mb-3">
                  在最喜欢的餐厅，你总有一道"保底菜"——每次都点它，因为熟悉的味道和可靠的准备让你满意。
                </p>
                <p className="text-sm text-[var(--text-secondary)] mb-3">
                  某天，菜单上有一道诱人的新菜，承诺带来愉悦和满足。但由于<strong className="text-[var(--accent-gold)]">损失厌恶</strong>，对尝试新事物可能带来的失望或后悔的恐惧，你倾向于点那道安全可靠的保底菜，而不是冒险获得一道新的最爱。
                </p>
              </div>
            </div>

            {/* 损失厌恶 */}
            <div id="loss-aversion" className="mb-12 scroll-mt-20">
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">损失厌恶</h3>
              
              <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-xl p-6 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-500 to-orange-400 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--text-primary)] mb-2">核心概念</h4>
                    <p className="text-sm text-[var(--text-secondary)]">
                      损失 $5,000 的心理影响远大于获得 $5,000 的心理影响。换句话说，需要获得超过 $5,000 才能抵消 $5,000 损失带来的心理负担。
                    </p>
                  </div>
                </div>
              </div>

              {/* TODO: 添加损失厌恶曲线可视化 */}
              
              <div className="prose prose-sm max-w-none space-y-4 text-[var(--text-secondary)]">
                <p>
                  这种现象也体现在人际关系中：友谊可能需要多年才能建立，但一次困难或痛苦的事件就能立即结束长久的友谊。
                </p>

                <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-6">
                  <h5 className="font-semibold text-[var(--text-primary)] mb-3">交易中的损失厌恶表现</h5>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--accent-gold)]">•</span>
                      <span>表现良好的投资下跌到买入价以下时，投资者不愿意承认小额损失</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--accent-gold)]">•</span>
                      <span>投资继续下跌，最终情绪反应变得极端，在最糟糕的时候投降</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--accent-gold)]">•</span>
                      <span>在顶部形成期间表现出自满，在底部区域表现出恐慌</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* ==================== 信念保持偏误 ==================== */}
            <SectionHeader
              id="belief-preservation"
              title="信念保持偏误"
              titleEn="Belief Preservation Biases"
              description="倾向于固守已有信念，即使这些信念可能不合逻辑或非理性。这类偏误往往导致交易量减少，因为投资者倾向于维持现有头寸而非根据新信息调整。"
              icon={Brain}
              gradient="from-blue-500 to-cyan-400"
            />

            <BiasCard
              id="conservatism"
              title="保守主义"
              titleEn="Conservatism"
              type="belief"
              definition="倾向于过度重视当前信念，低估新信息的价值。投资者由于在接收新信息时更保守地改变预测，从而低估某一结果的概率。"
              marketExample="你一直看好某只股票的预测。但形成了头肩顶形态，颈线已突破。尽管更大调整发展的可能性增加，你仍坚持长期预测。你可能低估了趋势已经改变的重要性。"
              impact={{
                volume: "导致交易量减少",
                price: "可能在趋势改变的证据下仍持有头寸，导致更大的回撤和表现不佳",
                sentiment: "不倾向于出现极端波动，因为无法转变市场观点"
              }}
            />

            <BiasCard
              id="confirmation"
              title="确认偏误"
              titleEn="Confirmation Bias"
              type="belief"
              definition="倾向于寻找和注意确认已有信念的信息，而忽视和低估与已有信念相矛盾的信息。忽略与当前观点相反的证据，接受类似观点而不考虑当前观点可能是错误的。"
              marketExample="你持有某股票多头头寸，一位有影响力的分析师下调了该股票。你甚至不阅读报告以查看你的观点是否需要改变。同一天，另一位分析师上调了该股票，你立即阅读并同意该分析。"
              impact={{
                volume: "导致交易量减少",
                price: "可能在趋势改变的证据下仍持有头寸，导致更大的回撤。倾向于建立头寸并持有集中的投资组合，波动性更高",
                sentiment: "不倾向于出现极端波动，因为无法转变市场观点"
              }}
            />

            <BiasCard
              id="representativeness"
              title="代表性偏误"
              titleEn="Representativeness Bias"
              type="belief"
              definition="倾向于根据过去的经验和分类对新信息进行分类。还有倾向于过度依赖小样本信息，这些样本并不代表整体。根据以前的预测做出预测，而不对当前情况进行详细分析，因为当前情况与以前的情况相似。这是季节性预测错误或小样本经验的典型表现。"
              marketExample="你对过去 10 年的分析显示，9 月份是一年中最差的月份。尽管 7 月和 8 月低点形成了看涨的双底形态，并且动量和广度指标强劲，你仍然推荐做空，因为大多数 9 月份都是下跌的。你默认采用简单预测，而不是检查最近几个月更复杂的发展。"
              impact={{
                volume: "导致交易量减少",
                price: "可能在趋势改变的证据下仍持有头寸，导致更大的回撤。倾向于建立头寸并持有集中的投资组合，波动性更高",
                sentiment: "不倾向于出现极端波动，因为无法转变市场观点"
              }}
            />

            <BiasCard
              id="illusion-of-control"
              title="控制错觉"
              titleEn="Illusion of Control"
              type="belief"
              definition="倾向于相信可以控制或影响某些实际上无法控制的事物。"
              marketExample="这通常在非常短期的交易建议中观察到。社交媒体影响力的爆炸式增长和当日到期期权对交易量和价格动量因子的影响，增加了对随机结果的信心。许多投资意见领袖正在影响交易量和流动性。"
              impact={{
                volume: "导致交易量大幅增加",
                price: "动量和趋势追随者纷纷跟进，认为价格会继续朝同一方向发展。通常，过度交易会导致低于平均水平的结果。投资组合分散度较低，回报波动性更高",
                sentiment: "可能产生更极端的情绪波动"
              }}
            />

            <BiasCard
              id="hindsight"
              title="后见之明"
              titleEn="Hindsight Bias"
              type="belief"
              definition="倾向于相信过去的事件是可预测的和合理的，而实际上并非如此。事后相信预测是确定的。"
              marketExample="你查看标普 500 指数 20 年的图表，画出趋势线显示 2000 年 90 年代牛市的突破以及死亡交叉。在同一张图表上，你显示了 2002 年至 2007 年牛市的趋势线突破以及死亡交叉。你的分析是，这些明显是熊市，这些指标显示了这一点的明确性。在当时，预测 50% 或更大的市场下跌是不太可能的，但事后，人们相信他们准确预测了这些走势。"
              impact={{
                volume: "对交易量影响不大或没有影响",
                price: "可能导致过度冒险，因为他们认为当前的预测不会失误，产生错误的信心。过度依赖过去，对未来结果关注不够",
                sentiment: "不倾向于出现极端波动，因为无法转变市场观点"
              }}
            />

            <BiasCard
              id="cognitive-dissonance"
              title="认知失调"
              titleEn="Cognitive Dissonance"
              type="belief"
              definition="倾向于竭尽全力抑制和消除认知失调，即当新信息与预先存在的信息和理解冲突时感受到的心理不适。"
              marketExample="你相信你已经选择了该行业中表现最佳的股票，但随后几位分析师下调了该股票并建议购买竞争对手。尽管其他人卖出该股票，而该行业的其他股票正在上涨，你的股票却没有，你可能仍然继续持有该股票。在心理上，卖出并转换到表现更好的股票变得很困难。最终，这可能变得不堪重负，你可能最终认输。"
              impact={{
                volume: "导致交易量减少",
                price: "可能在趋势改变的证据下仍持有头寸，导致更大的回撤。倾向于建立头寸并持有集中的投资组合，波动性更高",
                sentiment: "不倾向于出现极端波动，因为无法转变市场观点"
              }}
            />

            {/* ==================== 信息处理偏误 ==================== */}
            <SectionHeader
              id="information-processing"
              title="信息处理偏误"
              titleEn="Information Processing Biases"
              description="倾向于以不合逻辑或非理性的方式处理新信息，这往往是信念保持偏误的前兆。这些偏误帮助解释技术分析师观察到的许多图表形态，如支撑与阻力区域的形成。"
              icon={Zap}
              gradient="from-purple-500 to-pink-400"
            />

            <BiasCard
              id="anchoring"
              title="锚定效应"
              titleEn="Anchoring Bias"
              type="information"
              definition="倾向于使用启发式方法（经验、试错、经验法则、心理捷径）错误地估计概率，然后锚定到错误的值。这种偏误导致人们固定于购买价格或预测价格，而这个价格只对他们有意义，对未来价格行为没有影响。"
              marketExample="你以 $40 买入一只股票，在之前低点的强支撑测试上，初始目标是 $50。一段时间后，支撑被突破，股票现在在 $30。更新的分析表明它可能跌至 $20。你不愿意改变你的价格目标，因为理想情况下，你想在 $40 收回你的钱，现在可能会在那个点卖出以达到盈亏平衡。你锚定在一个无关的价格上，这个价格只对你有意义，对股票的未来走势没有影响。"
              impact={{
                volume: "导致交易量减少",
                price: "可能在趋势改变的证据下仍持有头寸，导致更大的回撤。倾向于建立头寸并持有集中的投资组合，波动性更高",
                sentiment: "不倾向于出现极端波动，因为无法转变市场观点"
              }}
            />

            <BiasCard
              id="availability"
              title="可得性偏误"
              titleEn="Availability Bias"
              type="information"
              definition="倾向于根据事件的易于回忆或理解程度来决定其概率。容易回忆和理解的结果被认为比那些更难回忆或理解的结果更有可能发生。"
              marketExample="你专注于艾略特波浪分析，很少考虑其他形式的市场解读。有人要求你对一只你从未听说过的股票进行预测。你做了一个简单的波浪计数，而不考虑相对强度以及是否有任何跨市场考虑。你以最简单或最容易的方法评估证券，可能导致更弱的结果。"
              impact={{
                volume: "略微倾向于更活跃，但不显著",
                price: "往往导致糟糕的进出场决策，因为没有考虑更彻底的分析。投资者往往在全球范围内分散程度较低，因为他们倾向于投资在本地或容易获得更多信息的资产",
                sentiment: "情绪可能波动，因为意见可能因他人的影响而更快地改变。更多的羊群行为"
              }}
            />

            <BiasCard
              id="self-attribution"
              title="自我归因"
              titleEn="Self-Attribution Bias"
              type="information"
              definition="个人倾向于将成功归因于内在因素（如才能或远见），而将失败归咎于外部影响（如运气不好）。"
              marketExample="当你的头寸不奏效时，你不断责怪他人，而当头寸奏效时，你将功劳归于自己的想法。在一段时间的良好回报后，投资者可能对自己的投资能力过于乐观。随着信心上升，过度交易是常见的结果。"
              impact={{
                volume: "导致交易量大幅增加",
                price: "往往导致糟糕的进出场决策以及强烈的表现不佳。投资者往往分散程度较低，持有更多投机性资产",
                sentiment: "情绪可能波动，因为意见可能因他人的影响而更快地改变。更多的羊群行为"
              }}
            />

            <BiasCard
              id="framing"
              title="框架效应"
              titleEn="Framing Bias"
              type="information"
              definition="倾向于根据问题的提问或框架方式来回答问题。受到与手头决策无关的信息的影响。以负面方式呈现的无关信息会负面影响你的观点，反之亦然。"
              marketExample="早上去办公室前你和配偶吵架了。你心情非常糟糕，这与市场无关。你长期持有的看涨头寸的收益公布了一些正面和一些负面的消息。由于你的心情，你选择卖出该头寸，因为你过度关注负面因素，尽管在过去几年中你已经度过了许多低迷期。"
              impact={{
                volume: "对交易量没有显著影响",
                price: "可能导致强烈的表现不佳期（因为风险承受能力往往判断不佳）和可能次优的投资组合配置",
                sentiment: "情绪可能波动，因为意见可能因他人的影响而更快地改变。更多的羊群行为"
              }}
            />

            <BiasCard
              id="mental-accounting"
              title="心理账户"
              titleEn="Mental Accounting"
              type="information"
              definition="倾向于根据分配给哪个'心理账户'以不同方式对待相同金额的钱——例如，用于购买头寸的钱与头寸赚取的钱。然而，由于金钱的可替代性，这是不合逻辑的。这些心理账户基于金钱的来源——奖金、工资、继承或赌博奖金——与计划用途——休闲、必需品、慈善等。"
              marketExample="你是对冲基金的自营交易员。你从不持有隔夜头寸。距离月底还有几天，你刚好没有达到月度奖金数字。你在收盘前一小时左右大量建仓，试图达到你的数字。你在股票收盘后报告收益前约一小时买入了一个晚期突破。你推测有泄漏，快钱玩家知道这些数字。公司在最后五分钟交易暂停后提前公布，股票跳空下跌了几美元。你快速计算，如果按照你的交易计划止损，你就拿不到奖金了。所以你反而保留了股票过夜，希望早上会有反弹来填补缺口，你可以持平退出，仍然拿到奖金。"
              impact={{
                volume: "对交易量没有显著影响",
                price: "如果你保留亏损头寸并过早卖出赢家，可能导致糟糕的投资组合构建和执行",
                sentiment: "情绪受影响较小，因为改变观点变得更加困难"
              }}
            />

            <BiasCard
              id="recency"
              title="近因效应"
              titleEn="Recency Bias"
              type="information"
              definition="倾向于回忆和强调最近的事件、观察和发生。当前事件过度影响你的预测，而不是与之相反的长期证据。"
              marketExample="最近的图表形态比趋势指标的长期衰减或在多个周期中重复的长期形态更重地影响你的预测。你正在切换你的时间框架焦点，因为其他分析师跳上当前的叙事。你受到最近事件的过度影响，而不是坚持更长期焦点的更高概率。"
              impact={{
                volume: "由于更多关注最新新闻或事件，交易量略有增加",
                price: "关注动量因子可能导致过度交易和长期表现不佳。在日常噪音中被困时，资产配置决策可能是次要的",
                sentiment: "情绪可能波动，因为意见可能因他人的影响而更快地改变。更多的羊群行为"
              }}
            />

            <BiasCard
              id="outcome"
              title="结果偏误"
              titleEn="Outcome Bias"
              type="information"
              definition="倾向于根据过去的结果做出决定，或者倾向于仅根据过去的表现选择证券，而不是观察当前和未来的因素。"
              marketExample="你购买了一只共同基金，因为过去 10 年的回报强劲。然而，首席投资经理和几位高级分析师最近已经退休。大部分投资团队是新的，投资风格发生了实质性变化。你也可能购买高估值资产，因为最近表现强劲而不考虑长期价值。"
              impact={{
                volume: "对交易量没有显著影响",
                price: "可能导致投资组合表现不佳，因为投资决策仅基于过去的回报，而不是更稳健的前瞻性分析",
                sentiment: "情绪不是主要因素"
              }}
            />

            {/* ==================== 情绪偏误 ==================== */}
            <SectionHeader
              id="emotional"
              title="情绪偏误"
              titleEn="Emotional Biases"
              description="情绪偏误源于倾向于潜意识处理决策，而非更认知的努力。它们对投资者来说更难修正，因为情绪与通过直觉或冲动自发产生的心理状态相关，而不是通过有意识的努力。可能只能适应它们，而不是纠正它们。"
              icon={Heart}
              gradient="from-rose-500 to-red-400"
            />

            <BiasCard
              id="loss-aversion-bias"
              title="损失厌恶偏误"
              titleEn="Loss Aversion Bias"
              type="emotional"
              definition="倾向于更喜欢避免损失而不是实现收益。理性的做法是增加风险以增加收益，而不是减轻损失。矛盾的是，大多数人为了避免损失而承担的风险比为了实现收益而承担的风险更大。投资者不喜欢损失的程度大约是他们享受相同美元价值收益的两倍。损失厌恶可以解释顶部形态期间的自满和投资者因恐惧损失而恐慌。在低点附近表现为更高的美元成交量，而在顶部发展时成交量递减。"
              marketExample="在一段时间的良好表现后，你的投资已经跌破购买价格。你不愿意承担小额损失，因为你不喜欢承担损失。投资继续下跌。最终，你投降，因为情绪反应严重且损失极端。"
              impact={{
                volume: "可能通过快速获利和在极端情况下被迫（投降）卖出来影响交易量",
                price: "可能导致投资组合表现不佳，因为倾向于让损失持续并过早获利。在最糟糕的时候投降是典型的",
                sentiment: "情绪在高点时往往被低估，在低点时被高估"
              }}
            />

            <BiasCard
              id="endowment"
              title="禀赋效应"
              titleEn="Endowment Bias"
              type="emotional"
              definition="倾向于赋予自己拥有的资产比不拥有的资产更高的价值。"
              marketExample="你以 $20 拥有一只流动性差的股票的控股权，你的目标是 $30。你有一个非常大的区块，所以通常很难移动。激进股东试图将公司私有化。他们为股票提供了 $35，尽管估值更高，你不愿意出售你的股票。你现在认为价值在 $40，尽管你的分析表明 $30 是完整价值。"
              impact={{
                volume: "导致交易量减少",
                price: "对价格没有实质性影响",
                sentiment: "不倾向于出现极端波动，因为无法转变市场观点"
              }}
            />

            <BiasCard
              id="overconfidence"
              title="过度自信"
              titleEn="Overconfidence Bias"
              type="emotional"
              definition="倾向于对自己的直觉推理、判断和认知能力表现出不必要的信心。"
              marketExample="你对标普 500 指数有长期看涨观点。尽管道氏理论发出卖出信号且市场广度衰减，但你在看涨时比看跌时更多地上电视。随着市场崩溃，你继续做出你的看涨论点，尽管趋势线已经突破，并且有明显的熊市正在发展。"
              impact={{
                volume: "导致交易量大幅增加",
                price: "往往导致糟糕的进出场决策以及强烈的表现不佳。投资者往往分散程度较低，持有更多投机性资产",
                sentiment: "情绪可能波动，意见可能更快地改变。更多的羊群行为"
              }}
            />

            <BiasCard
              id="regret-aversion"
              title="后悔厌恶"
              titleEn="Regret Aversion"
              type="emotional"
              definition="倾向于避免做出决定，因为担心结果会很糟糕或比现在更糟。"
              marketExample="你处于亏损头寸，尽管有相反的证据，也无法改变你的观点。"
              impact={{
                volume: "导致交易量减少",
                price: "可能在趋势改变的证据下仍持有头寸，导致更大的回撤",
                sentiment: "不倾向于出现极端波动，因为无法转变市场观点"
              }}
            />

            <BiasCard
              id="conjunction-fallacy"
              title="合取谬误"
              titleEn="Conjunction Fallacy"
              type="emotional"
              definition="倾向于错误地估计事件的概率，或者倾向于从不太可能的事件中得出结论或推论。"
              marketExample="你建议买入一只明显处于下跌趋势的股票，因为同一行业的另一只股票被收购了。假设该行业的其他股票也会被收购。你建议买入大豆，因为有满月。你观察到在过去一年中，满月后的第二天大豆有 55% 的时间会上涨。"
              impact={{
                volume: "可能导致短期交易量增加",
                price: "往往导致糟糕的决策和随机结果",
                sentiment: "可能产生短期情绪波动"
              }}
            />

            <BiasCard
              id="self-control"
              title="自我控制"
              titleEn="Self-Control Bias"
              type="emotional"
              definition="倾向于未能为追求长期目标而采取行动，因为由于缺乏自律而偏向短期目标。"
              marketExample="你一直试图开发一个更全面的市场行业组分析系统用于市场报告。因为在写完报告后需要花费大量时间，你反而每天下班后去酒吧，而不是投入工作来使报告更好、更全面。"
              impact={{
                volume: "对交易量没有显著影响",
                price: "可能导致短期思维和次优的长期表现",
                sentiment: "情绪不是主要因素"
              }}
            />

            <BiasCard
              id="status-quo"
              title="现状偏误"
              titleEn="Status Quo Bias"
              type="emotional"
              definition="倾向于保持现状，什么都不做，而不是做出改变。接受默认是容易和舒适的。"
              marketExample="一只股票正在攀升，但没有跟上基准的步伐。因为股票正在走高，所以将其保留在投资组合中比寻找一只跑赢基准的股票更容易。"
              impact={{
                volume: "导致交易量减少",
                price: "可能导致投资组合表现不佳，因为持有表现不佳的资产",
                sentiment: "不倾向于出现极端波动，因为无法转变市场观点"
              }}
            />

            <BiasCard
              id="affinity"
              title="亲和偏误"
              titleEn="Affinity Bias"
              type="emotional"
              definition="倾向于根据产品或公司如何反映个人价值观和自我形象做出糟糕的选择。"
              marketExample="尽管股票下跌，你仍将其保留在投资组合中，因为该公司在其产品中使用所有可持续材料，而你支持这一点。"
              impact={{
                volume: "对交易量没有显著影响",
                price: "可能导致持有表现不佳的资产，因为情感依恋",
                sentiment: "情绪不是主要因素"
              }}
            />

            {/* ==================== 行为偏误与图表形态 ==================== */}
            <SectionHeader
              id="chart-patterns"
              title="行为偏误与图表形态"
              titleEn="Behavioral Biases and Chart Patterns"
              icon={TrendingUp}
              gradient="from-amber-500 to-orange-400"
            />

            <div className="prose prose-sm max-w-none space-y-6 text-[var(--text-secondary)]">
              <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-6">
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">偏误如何影响图表形态</h3>
                
                <p className="mb-4">
                  损失厌恶、心理账户、锚定和后见之明偏误等行为现象与许多图表形态的发展高度相关，包括支撑与阻力区域、双顶和双底以及三角形。
                </p>

                <div className="bg-[var(--accent-gold)]/10 border-l-4 border-[var(--accent-gold)] pl-4 py-3 mb-4">
                  <p className="text-[var(--text-primary)] font-semibold mb-2">典型的投资者心理</p>
                  <p className="text-sm italic">
                    "我之前涨了那么多，现在正在亏损；如果它回到我买入的地方，我就卖出！"
                  </p>
                </div>

                <p className="mb-4">
                  投资者会有意识地记住他们个人的利润和损失，通常在经历了一段时间未实现的收益和损失后，投资者会倾向于做出盈亏平衡类型的决策。
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <h4 className="font-semibold text-[var(--text-primary)] mb-2 flex items-center gap-2">
                      <TrendingDown className="w-5 h-5 text-blue-400" />
                      导致这些行为的偏误
                    </h4>
                    <ul className="text-sm space-y-1">
                      <li>• 心理账户</li>
                      <li>• 锚定效应</li>
                      <li>• 损失厌恶</li>
                    </ul>
                  </div>

                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                    <h4 className="font-semibold text-[var(--text-primary)] mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-purple-400" />
                      导致投资者不作为的偏误
                    </h4>
                    <ul className="text-sm space-y-1">
                      <li>• 现状偏误</li>
                      <li>• 过度自信</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl p-6">
                <h4 className="font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[var(--accent-gold)]" />
                  技术分析中的关键观察
                </h4>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--accent-gold)] font-bold">•</span>
                    <span><strong>支撑变阻力</strong>：这些行为决策（心理账户、锚定、损失厌恶）倾向于表现为交易者所说的头顶供应。技术分析中的"曾经的支撑变成阻力"这句话，正是这些偏误驱动的"盈亏平衡心态"决策的结果。</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--accent-gold)] font-bold">•</span>
                    <span><strong>投降形态</strong>：当许多人对共同亏损头寸的情绪反应以递增的速度增加时，最终导致技术分析师所说的投降形态。极端看跌的价格行为加上不断增加的成交量是由金融损失的情绪痛苦驱动的。</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--accent-gold)] font-bold">•</span>
                    <span><strong>顶部自满</strong>：相反，随着价格上涨成交量下降的模式表明一定程度的自满，投资者对上涨的价格感到满意。</span>
                  </li>
                </ul>
              </div>

              {/* TODO: 考虑添加自测题组件 */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

