import { View, Text, ScrollView } from 'react-native';
import { Brain, AlertTriangle, Zap, Heart, Activity } from 'lucide-react-native';

// 偏誤卡片組件
function BiasCard({
  title,
  titleEn,
  definition,
  marketExample,
  type,
}: {
  title: string;
  titleEn: string;
  definition: string;
  marketExample: string;
  type: 'belief' | 'information' | 'emotional';
}) {
  const typeConfig = {
    belief: { color: '#3b82f6', Icon: Brain },
    information: { color: '#8b5cf6', Icon: Zap },
    emotional: { color: '#ef4444', Icon: Heart },
  };

  const { color, Icon } = typeConfig[type];

  return (
    <View className="bg-bg-card border border-border-color rounded-xl mb-4 overflow-hidden">
      {/* 標題欄 */}
      <View className="p-4 flex-row items-center" style={{ backgroundColor: `${color}15` }}>
        <View 
          className="w-10 h-10 rounded-lg items-center justify-center mr-3"
          style={{ backgroundColor: color }}
        >
          <Icon size={20} color="#fff" />
        </View>
        <View className="flex-1">
          <Text className="text-text-primary font-bold text-base">{title}</Text>
          <Text className="text-text-muted text-xs">{titleEn}</Text>
        </View>
      </View>

      <View className="p-4">
        {/* 定義 */}
        <View className="bg-bg-secondary rounded-lg p-3 mb-3">
          <View className="flex-row items-center mb-1">
            <View className="w-1.5 h-1.5 rounded-full bg-accent-gold mr-2" />
            <Text className="text-text-primary text-sm font-semibold">定義</Text>
          </View>
          <Text className="text-text-secondary text-sm leading-5">{definition}</Text>
        </View>

        {/* 市場案例 */}
        <View className="border-l-4 border-accent-gold pl-3 py-1">
          <Text className="text-text-primary text-sm font-semibold mb-1">📊 市場案例</Text>
          <Text className="text-text-secondary text-sm leading-5">{marketExample}</Text>
        </View>
      </View>
    </View>
  );
}

// 章節標題組件
function SectionHeader({ 
  title, 
  titleEn, 
  description,
  Icon,
  color,
}: { 
  title: string; 
  titleEn: string; 
  description?: string;
  Icon: any;
  color: string;
}) {
  return (
    <View className="mb-6 mt-8">
      <View className="flex-row items-center mb-2">
        <View 
          className="w-10 h-10 rounded-lg items-center justify-center mr-3"
          style={{ backgroundColor: color }}
        >
          <Icon size={20} color="#fff" />
        </View>
        <View className="flex-1">
          <Text className="text-text-primary text-xl font-bold">{title}</Text>
          <Text className="text-text-muted text-xs">{titleEn}</Text>
        </View>
      </View>
      {description && (
        <Text className="text-text-secondary text-sm leading-5">{description}</Text>
      )}
    </View>
  );
}

export default function BehavioralFinancePage() {
  return (
    <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
      {/* 頁面標題 */}
      <View className="py-6">
        <Text className="text-text-primary text-2xl font-bold mb-2">行為金融學</Text>
        <Text className="text-text-secondary text-sm leading-5">
          理解投資者的心理偏誤與決策行為，掌握市場情緒與價格形態背後的心理機制
        </Text>
      </View>

      {/* 引言 */}
      <View className="bg-bg-card border border-border-color rounded-xl p-4 mb-6">
        <View className="flex-row items-center mb-3">
          <View className="w-10 h-10 rounded-full bg-accent-gold items-center justify-center mr-3">
            <Text className="text-bg-primary font-bold text-sm">2002</Text>
          </View>
          <View className="flex-1">
            <Text className="text-text-primary font-semibold">諾貝爾經濟學獎</Text>
          </View>
        </View>
        <Text className="text-text-secondary text-sm leading-5">
          Daniel Kahneman 因「將心理學研究的洞見整合到經濟科學中，特別是關於不確定性下的人類判斷和決策」而獲得諾貝爾經濟學獎。
        </Text>
      </View>

      {/* 核心概念 */}
      <View className="bg-accent-gold/10 border border-accent-gold/20 rounded-xl p-4 mb-6">
        <View className="flex-row items-start">
          <AlertTriangle size={24} color="#f59e0b" />
          <View className="flex-1 ml-3">
            <Text className="text-text-primary font-semibold mb-1">損失厭惡 - 核心概念</Text>
            <Text className="text-text-secondary text-sm leading-5">
              損失 $5,000 的心理影響遠大於獲得 $5,000 的心理影響。決策者對損失的重視程度遠超過收益。
            </Text>
          </View>
        </View>
      </View>

      {/* 信念保持偏誤 */}
      <SectionHeader
        title="信念保持偏誤"
        titleEn="Belief Preservation Biases"
        description="傾向於固守已有信念，即使這些信念可能不合邏輯或非理性。"
        Icon={Brain}
        color="#3b82f6"
      />

      <BiasCard
        title="保守主義"
        titleEn="Conservatism"
        type="belief"
        definition="傾向於過度重視當前信念，低估新資訊的價值。投資者由於在接收新資訊時更保守地改變預測，從而低估某一結果的機率。"
        marketExample="你持續看好某科技股三個月，認為它會突破新高。然而最近公司公布營收不如預期，股價連續下跌並跌破重要支撐位。你仍堅持原本的看法，認為只是短期波動，忽略了基本面和技術面都已經轉弱的訊號。"
      />

      <BiasCard
        title="確認偏誤"
        titleEn="Confirmation Bias"
        type="belief"
        definition="傾向於尋找和注意確認已有信念的資訊，而忽視和低估與已有信念相矛盾的資訊。"
        marketExample="你買入電動車股票後，只關注看好電動車產業的新聞和報導，對於產能過剩、競爭加劇的負面消息視而不見。結果錯過了產業反轉的早期警訊。"
      />

      <BiasCard
        title="後見之明"
        titleEn="Hindsight Bias"
        type="belief"
        definition="傾向於相信過去的事件是可預測的和合理的，而實際上並非如此。事後相信預測是確定的。"
        marketExample="2020 年疫情導致股市暴跌後快速反彈。現在回看圖表，你跟朋友說：「當時明明就很明顯會 V 型反轉」。但實際上當時市場恐慌，沒人知道會跌到哪、何時反彈。"
      />

      {/* 資訊處理偏誤 */}
      <SectionHeader
        title="資訊處理偏誤"
        titleEn="Information Processing Biases"
        description="傾向於以不合邏輯或非理性的方式處理新資訊。"
        Icon={Zap}
        color="#8b5cf6"
      />

      <BiasCard
        title="錨定效應"
        titleEn="Anchoring Bias"
        type="information"
        definition="傾向於固定於購買價格或預測價格，而這個價格只對自己有意義，對未來價格行為沒有影響。"
        marketExample="你在 150 元買入一檔股票，心想「只要漲回 150 我就賣」。股票跌到 120 元，基本面持續惡化。你執著於「等回本」，結果股票繼續跌到 80 元。"
      />

      <BiasCard
        title="心理帳戶"
        titleEn="Mental Accounting"
        type="information"
        definition="傾向於根據分配給哪個「心理帳戶」以不同方式對待相同金額的錢。"
        marketExample="你用年終獎金 20 萬買股票，賺了 5 萬。這 5 萬獲利你覺得「反正是賺來的」，隨意買了風險很高的飆股，結果虧光。明明都是你的錢，但你給「本金」和「獲利」設了不同的心理帳戶。"
      />

      {/* 情緒偏誤 */}
      <SectionHeader
        title="情緒偏誤"
        titleEn="Emotional Biases"
        description="源於傾向於潛意識處理決策，而非更認知的努力。"
        Icon={Heart}
        color="#ef4444"
      />

      <BiasCard
        title="損失厭惡偏誤"
        titleEn="Loss Aversion Bias"
        type="emotional"
        definition="傾向於更喜歡避免損失而不是實現收益。投資者不喜歡損失的程度大約是他們享受相同美元價值收益的兩倍。"
        marketExample="你買股票賺 10 萬會高興一天，但虧 10 萬會難過一個月。某股票你在 100 元買入，跌到 95 元你捨不得認賠「才虧 5%，等反彈」。繼續跌到 80 元你更不敢賣。反過來，獲利 5% 你就急著賣「見好就收」。"
      />

      <BiasCard
        title="過度自信"
        titleEn="Overconfidence Bias"
        type="emotional"
        definition="傾向於對自己的直覺推理、判斷和認知能力表現出不必要的信心。"
        marketExample="你研究投資三年，看了很多書，最近連續獲利。開始覺得自己「已經看透市場」。你忽略了獲利可能只是運氣好遇到多頭，開始加大槓桿、頻繁交易。當市況轉變，你堅持己見不願認錯，最終把過去的獲利全部吐回去。"
      />

      <BiasCard
        title="後悔厭惡"
        titleEn="Regret Aversion"
        type="emotional"
        definition="傾向於避免做出決定，因為擔心結果會很糟糕或比現在更糟。"
        marketExample="你持有一檔虧損的股票，每天都在想要不要停損。但你害怕「停損後它就反彈」的後悔感，所以一直猶豫不決。結果股票繼續跌，虧損越來越大。"
      />

      {/* 底部間距 */}
      <View className="h-10" />
    </ScrollView>
  );
}

