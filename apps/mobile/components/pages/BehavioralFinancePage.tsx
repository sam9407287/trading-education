import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Brain, AlertTriangle, Zap, Heart, TrendingUp, TrendingDown, Activity } from 'lucide-react-native';

// 偏誤卡片組件
function BiasCard({
  title,
  titleEn,
  definition,
  marketExample,
  impact,
  type,
}: {
  title: string;
  titleEn: string;
  definition: string;
  marketExample: string;
  impact?: {
    volume: string;
    price: string;
    sentiment: string;
  };
  type: 'belief' | 'information' | 'emotional';
}) {
  const typeConfig = {
    belief: { color: '#3b82f6', Icon: Brain },
    information: { color: '#8b5cf6', Icon: Zap },
    emotional: { color: '#ef4444', Icon: Heart },
  };

  const { color, Icon } = typeConfig[type];

  return (
    <View style={styles.card}>
      {/* 標題欄 */}
      <View style={[styles.cardHeader, { backgroundColor: `${color}15` }]}>
        <View style={[styles.iconBox, { backgroundColor: color }]}>
          <Icon size={20} color="#fff" />
        </View>
        <View style={styles.cardHeaderText}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardSubtitle}>{titleEn}</Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        {/* 定義 */}
        <View style={styles.definitionBox}>
          <View style={styles.definitionHeader}>
            <View style={styles.dot} />
            <Text style={styles.definitionTitle}>定義</Text>
          </View>
          <Text style={styles.definitionText}>{definition}</Text>
        </View>

        {/* 市場案例 */}
        <View style={styles.exampleBox}>
          <Text style={styles.exampleTitle}>📊 市場案例</Text>
          <Text style={styles.exampleText}>{marketExample}</Text>
        </View>

        {/* 技術分析影響 */}
        {impact && (
          <View style={styles.impactContainer}>
            <Text style={styles.impactTitle}>技術分析影響</Text>
            <View style={styles.impactGrid}>
              <View style={styles.impactBox}>
                <View style={styles.impactIconRow}>
                  <Activity size={14} color="#3b82f6" />
                  <Text style={styles.impactLabel}>成交量</Text>
                </View>
                <Text style={styles.impactText}>{impact.volume}</Text>
              </View>
              <View style={styles.impactBox}>
                <View style={styles.impactIconRow}>
                  <TrendingUp size={14} color="#10b981" />
                  <Text style={styles.impactLabel}>價格</Text>
                </View>
                <Text style={styles.impactText}>{impact.price}</Text>
              </View>
              <View style={styles.impactBox}>
                <View style={styles.impactIconRow}>
                  <TrendingDown size={14} color="#f59e0b" />
                  <Text style={styles.impactLabel}>情緒</Text>
                </View>
                <Text style={styles.impactText}>{impact.sentiment}</Text>
              </View>
            </View>
          </View>
        )}
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
    <View style={styles.sectionHeader}>
      <View style={styles.sectionHeaderRow}>
        <View style={[styles.iconBox, { backgroundColor: color }]}>
          <Icon size={20} color="#fff" />
        </View>
        <View style={styles.sectionHeaderText}>
          <Text style={styles.sectionTitle}>{title}</Text>
          <Text style={styles.sectionSubtitle}>{titleEn}</Text>
        </View>
      </View>
      {description && (
        <Text style={styles.sectionDescription}>{description}</Text>
      )}
    </View>
  );
}

export default function BehavioralFinancePage() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 頁面標題 */}
      <View style={styles.header}>
        <Text style={styles.pageTitle}>行為金融學</Text>
        <Text style={styles.pageDescription}>
          理解投資者的心理偏誤與決策行為，掌握市場情緒與價格形態背後的心理機制
        </Text>
      </View>

      {/* 引言 */}
      <View style={styles.introCard}>
        <View style={styles.introHeader}>
          <View style={styles.yearBadge}>
            <Text style={styles.yearText}>2002</Text>
          </View>
          <Text style={styles.introTitle}>諾貝爾經濟學獎</Text>
        </View>
        <Text style={styles.introDescription}>
          Daniel Kahneman（1934-2024）因「將心理學研究的洞見整合到經濟科學中，特別是關於不確定性下的人類判斷和決策」而獲得諾貝爾經濟學獎。
        </Text>
      </View>

      {/* 前景理論 */}
      <View style={styles.theoryCard}>
        <Text style={styles.theoryTitle}>前景理論 Prospect Theory</Text>
        <Text style={styles.theoryHighlight}>
          核心觀點：決策者對損失的重視程度遠超過收益。
        </Text>
        <Text style={styles.theoryText}>
          Kahneman 與 Tversky 共同提出了前景理論，作為標準經濟理論的替代方案，更好地解釋了實際觀察到的行為。
        </Text>
      </View>

      {/* 核心概念 */}
      <View style={styles.highlightBox}>
        <AlertTriangle size={24} color="#f59e0b" />
        <View style={styles.highlightContent}>
          <Text style={styles.highlightTitle}>損失厭惡 - 核心概念</Text>
          <Text style={styles.highlightText}>
            損失 $5,000 的心理影響遠大於獲得 $5,000 的心理影響。換句話說，需要獲得超過 $5,000 才能抵消 $5,000 損失帶來的心理負擔。
          </Text>
        </View>
      </View>

      {/* ==================== 信念保持偏誤 ==================== */}
      <SectionHeader
        title="信念保持偏誤"
        titleEn="Belief Preservation Biases"
        description="傾向於固守已有信念，即使這些信念可能不合邏輯或非理性。這類偏誤往往導致交易量減少，因為投資者傾向於維持現有頭寸而非根據新資訊調整。"
        Icon={Brain}
        color="#3b82f6"
      />

      <BiasCard
        title="保守主義"
        titleEn="Conservatism"
        type="belief"
        definition="傾向於過度重視當前信念，低估新資訊的價值。投資者由於在接收新資訊時更保守地改變預測，從而低估某一結果的機率。"
        marketExample="你持續看好某科技股三個月，認為它會突破新高。然而最近公司公布營收不如預期，股價連續下跌並跌破重要支撐位。你仍堅持原本的看法，認為只是短期波動，忽略了基本面和技術面都已經轉弱的訊號。"
        impact={{
          volume: "導致交易量減少",
          price: "可能在趨勢改變的證據下仍持有頭寸，導致更大的回撤",
          sentiment: "不傾向於出現極端波動"
        }}
      />

      <BiasCard
        title="確認偏誤"
        titleEn="Confirmation Bias"
        type="belief"
        definition="傾向於尋找和注意確認已有信念的資訊，而忽視和低估與已有信念相矛盾的資訊。忽略與當前觀點相反的證據。"
        marketExample="你買入電動車股票後，只關注看好電動車產業的新聞和報導，對於產能過剩、競爭加劇的負面消息視而不見。社群媒體上有人分享看好電動車的文章你會轉發，但批評的聲音你直接略過。結果錯過了產業反轉的早期警訊。"
        impact={{
          volume: "導致交易量減少",
          price: "傾向於建立頭寸並持有集中的投資組合，波動性更高",
          sentiment: "不傾向於出現極端波動"
        }}
      />

      <BiasCard
        title="代表性偏誤"
        titleEn="Representativeness Bias"
        type="belief"
        definition="傾向於根據過去的經驗和分類對新資訊進行分類。還有傾向於過度依賴小樣本資訊，這些樣本並不代表整體。"
        marketExample="你注意到過去三年每到農曆新年前，生技股都會上漲。今年新年前你大舉買入生技股，期待重現往年行情。但你忽略了今年整體環境已經改變：Fed 持續升息、資金緊縮、產業面臨監管壓力。結果不僅沒漲反而大跌。"
        impact={{
          volume: "導致交易量減少",
          price: "傾向於持有集中的投資組合，波動性更高",
          sentiment: "不傾向於出現極端波動"
        }}
      />

      <BiasCard
        title="控制錯覺"
        titleEn="Illusion of Control"
        type="belief"
        definition="傾向於相信可以控制或影響某些實際上無法控制的事物。"
        marketExample="你開發了一套當沖策略，在模擬交易中連續獲利十次。你深信掌握了市場規律，開始用真實資金大量當沖交易。然而市場的隨機波動遠比你想像的複雜，連續虧損讓你措手不及。你以為能精準預測短線走勢，實際上很多時候只是運氣好遇到趨勢行情。"
        impact={{
          volume: "導致交易量大幅增加",
          price: "過度交易會導致低於平均水平的結果，分散度較低",
          sentiment: "可能產生更極端的情緒波動"
        }}
      />

      <BiasCard
        title="後見之明"
        titleEn="Hindsight Bias"
        type="belief"
        definition="傾向於相信過去的事件是可預測的和合理的，而實際上並非如此。事後相信預測是確定的。"
        marketExample="2020 年疫情導致股市暴跌後快速反彈。現在回看圖表，你跟朋友說：「當時明明就很明顯會 V 型反轉，政府一定會大量印鈔救市。」但實際上當時市場恐慌，沒人知道會跌到哪、何時反彈。你事後諸葛，誤以為自己能預測這種黑天鵝事件。"
        impact={{
          volume: "對交易量影響不大",
          price: "可能導致過度冒險，產生錯誤的信心",
          sentiment: "不傾向於出現極端波動"
        }}
      />

      <BiasCard
        title="認知失調"
        titleEn="Cognitive Dissonance"
        type="belief"
        definition="傾向於竭盡全力抑制和消除認知失調，即當新資訊與預先存在的資訊和理解衝突時感受到的心理不適。"
        marketExample="你花了大量時間研究一檔 AI 概念股，認為它是未來十年的明星。但公司連續兩季虧損擴大，競爭對手推出更好的產品，你的股票持續下跌。你內心很掙扎：承認自己看錯很痛苦，但繼續持有又不斷虧錢。你開始找各種理由說服自己「長期一定會漲回來」，拒絕面對投資失敗的事實。"
        impact={{
          volume: "導致交易量減少",
          price: "傾向於持有集中的投資組合，波動性更高",
          sentiment: "不傾向於出現極端波動"
        }}
      />

      {/* ==================== 資訊處理偏誤 ==================== */}
      <SectionHeader
        title="資訊處理偏誤"
        titleEn="Information Processing Biases"
        description="傾向於以不合邏輯或非理性的方式處理新資訊，這往往是信念保持偏誤的前兆。這些偏誤幫助解釋技術分析師觀察到的許多圖表形態，如支撐與阻力區域的形成。"
        Icon={Zap}
        color="#8b5cf6"
      />

      <BiasCard
        title="錨定效應"
        titleEn="Anchoring Bias"
        type="information"
        definition="傾向於使用啟發式方法錯誤地估計機率，然後錨定到錯誤的值。這種偏誤導致人們固定於購買價格或預測價格，而這個價格只對他們有意義。"
        marketExample="你在 150 元買入一檔股票，心想「只要漲回 150 我就賣」。股票跌到 120 元，基本面持續惡化，產業前景也轉差。理性分析應該停損，但你執著於「等回本」，每天盯著 150 這個價格。這個價格對市場毫無意義，只是你的買入成本。結果股票繼續跌到 80 元。"
        impact={{
          volume: "導致交易量減少",
          price: "傾向於持有集中的投資組合，波動性更高",
          sentiment: "不傾向於出現極端波動"
        }}
      />

      <BiasCard
        title="可得性偏誤"
        titleEn="Availability Bias"
        type="information"
        definition="傾向於根據事件的易於回憶或理解程度來決定其機率。容易回憶和理解的結果被認為比那些更難回憶或理解的結果更有可能發生。"
        marketExample="朋友最近在半導體股賺了大錢，你每天都聽他分享戰績。媒體也不斷報導晶片產業的榮景。於是你認為「現在投資半導體一定賺」，把大部分資金投入。但你忽略了其他產業的機會，也沒評估半導體是否已經過熱。只因為這些資訊「容易取得」和「印象深刻」，就過度高估了獲利機率。"
        impact={{
          volume: "略微傾向於更活躍",
          price: "往往導致糟糕的進出場決策，分散程度較低",
          sentiment: "情緒可能波動，更多的羊群行為"
        }}
      />

      <BiasCard
        title="自我歸因"
        titleEn="Self-Attribution Bias"
        type="information"
        definition="個人傾向於將成功歸因於內在因素（如才能或遠見），而將失敗歸咎於外部影響（如運氣不好）。"
        marketExample="你連續三筆交易都獲利，開始覺得自己是「股市天才」，認為是靠精準判斷才賺錢。但當第四筆交易虧損時，你怪罪「主力洗盤」、「外資亂搞」、「消息面突然轉空」。你沒意識到前面的獲利可能只是運氣好遇到多頭，而虧損才是真實的交易水平。"
        impact={{
          volume: "導致交易量大幅增加",
          price: "往往導致糟糕的進出場決策以及強烈的表現不佳",
          sentiment: "情緒可能波動，更多的羊群行為"
        }}
      />

      <BiasCard
        title="框架效應"
        titleEn="Framing Bias"
        type="information"
        definition="傾向於根據問題的提問或框架方式來回答問題。受到與手頭決策無關的資訊的影響。"
        marketExample="你持有一檔股票，早上起床心情很好，看到公司公告「營收略低於預期但仍年增 5%」，你想「還不錯啊，繼續持有」。但如果早上剛跟家人吵架，心情煩躁，看到同樣的公告，你可能想「才成長 5%？太爛了，不如預期就是利空」而急著賣出。同樣的資訊，因為你的情緒框架不同，做出完全相反的決策。"
        impact={{
          volume: "對交易量沒有顯著影響",
          price: "可能導致強烈的表現不佳期和次優的投資組合配置",
          sentiment: "情緒可能波動，更多的羊群行為"
        }}
      />

      <BiasCard
        title="心理帳戶"
        titleEn="Mental Accounting"
        type="information"
        definition="傾向於根據分配給哪個「心理帳戶」以不同方式對待相同金額的錢——例如，用於購買頭寸的錢與頭寸賺取的錢。"
        marketExample="你用年終獎金 20 萬買股票，賺了 5 萬。這 5 萬獲利你覺得「反正是賺來的」，隨意買了風險很高的飆股，結果虧光。但如果是本金虧 5 萬，你會非常心痛。明明都是你的錢，但你給「本金」和「獲利」設了不同的心理帳戶，對待方式完全不同。"
        impact={{
          volume: "對交易量沒有顯著影響",
          price: "如果保留虧損頭寸並過早賣出贏家，可能導致糟糕的投資組合",
          sentiment: "情緒受影響較小"
        }}
      />

      <BiasCard
        title="近因效應"
        titleEn="Recency Bias"
        type="information"
        definition="傾向於回憶和強調最近的事件、觀察和發生。當前事件過度影響你的預測，而不是與之相反的長期證據。"
        marketExample="過去一週 AI 股天天漲停，媒體瘋狂報導「AI 革命」。你完全忘記三個月前 AI 股才剛崩跌 30%，也忽略過去十年科技股的週期規律。只因為最近幾天的火熱行情，就認為「這次不一樣」、「AI 會永遠漲」，在最高點重押。"
        impact={{
          volume: "交易量略有增加",
          price: "關注動量因子可能導致過度交易和長期表現不佳",
          sentiment: "情緒可能波動，更多的羊群行為"
        }}
      />

      <BiasCard
        title="結果偏誤"
        titleEn="Outcome Bias"
        type="information"
        definition="傾向於根據過去的結果做出決定，或者傾向於僅根據過去的表現選擇證券，而不是觀察當前和未來的因素。"
        marketExample="你看到某檔基金過去五年年化報酬率 20%，毫不猶豫就買入。但你沒注意到原本的明星經理人已經離職，新團隊完全沒經驗。產業環境也從低利轉為高利率，過去的高成長股策略不再適用。你只看「過去表現好」就買，忽略了環境和團隊都已經改變。"
        impact={{
          volume: "對交易量沒有顯著影響",
          price: "可能導致投資組合表現不佳，僅基於過去回報",
          sentiment: "情緒不是主要因素"
        }}
      />

      {/* ==================== 情緒偏誤 ==================== */}
      <SectionHeader
        title="情緒偏誤"
        titleEn="Emotional Biases"
        description="情緒偏誤源於傾向於潛意識處理決策，而非更認知的努力。它們對投資者來說更難修正，因為情緒與通過直覺或衝動自發產生的心理狀態相關。可能只能適應它們，而不是糾正它們。"
        Icon={Heart}
        color="#ef4444"
      />

      <BiasCard
        title="損失厭惡偏誤"
        titleEn="Loss Aversion Bias"
        type="emotional"
        definition="傾向於更喜歡避免損失而不是實現收益。投資者不喜歡損失的程度大約是他們享受相同美元價值收益的兩倍。損失厭惡可以解釋頂部形態期間的自滿和底部區域的恐慌。"
        marketExample="你買股票賺 10 萬會高興一天，但虧 10 萬會難過一個月。某股票你在 100 元買入，跌到 95 元你捨不得認賠「才虧 5%，等反彈」。繼續跌到 80 元你更不敢賣「已經虧這麼多了，賣了就真的虧了」。最後跌到 50 元你崩潰停損。反過來，獲利 5% 你就急著賣「見好就收」，錯過後面大波段。"
        impact={{
          volume: "可能通過快速獲利和投降賣出來影響交易量",
          price: "傾向於讓損失持續並過早獲利，在最糟糕的時候投降",
          sentiment: "情緒在高點時往往被低估，在低點時被高估"
        }}
      />

      <BiasCard
        title="稟賦效應"
        titleEn="Endowment Bias"
        type="emotional"
        definition="傾向於賦予自己擁有的資產比不擁有的資產更高的價值。"
        marketExample="你花很多時間研究後買入一檔股票，總覺得它「特別有潛力」。朋友推薦另一檔基本面更好、技術面也更強的股票，你卻興趣缺缺，認為「我的股票更好」。只因為這是你擁有的、你研究過的，就給它更高的評價。客觀來看兩檔差不多，但你的情感連結讓你高估了自己持股的價值。"
        impact={{
          volume: "導致交易量減少",
          price: "對價格沒有實質性影響",
          sentiment: "不傾向於出現極端波動"
        }}
      />

      <BiasCard
        title="過度自信"
        titleEn="Overconfidence Bias"
        type="emotional"
        definition="傾向於對自己的直覺推理、判斷和認知能力表現出不必要的信心。"
        marketExample="你研究投資三年，看了很多書，最近連續獲利。開始覺得自己「已經看透市場」，朋友問你都說「這個一定漲」、「那個必跌」。你忽略了獲利可能只是運氣好遇到多頭，開始加大槓桿、頻繁交易。當市況轉變，你堅持己見不願認錯，最終把過去的獲利全部吐回去，甚至虧掉本金。"
        impact={{
          volume: "導致交易量大幅增加",
          price: "往往導致糟糕的進出場決策，分散程度較低",
          sentiment: "情緒可能波動，更多的羊群行為"
        }}
      />

      <BiasCard
        title="後悔厭惡"
        titleEn="Regret Aversion"
        type="emotional"
        definition="傾向於避免做出決定，因為擔心結果會很糟糕或比現在更糟。"
        marketExample="你持有一檔虧損的股票，每天都在想要不要停損。但你害怕「停損後它就反彈」的後悔感，所以一直猶豫不決。結果股票繼續跌，虧損越來越大。你也不敢買新的標的，怕「買了就跌」。這種對後悔的恐懼讓你無法採取行動，只能被動承受損失持續擴大。"
        impact={{
          volume: "導致交易量減少",
          price: "可能在趨勢改變的證據下仍持有頭寸，導致更大的回撤",
          sentiment: "不傾向於出現極端波動"
        }}
      />

      <BiasCard
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
        title="自我控制"
        titleEn="Self-Control Bias"
        type="emotional"
        definition="傾向於未能為追求長期目標而採取行動，因為由於缺乏自律而偏向短期目標。"
        marketExample="你知道應該做好投資計劃、定期檢視持股、記錄交易日誌，但總是「明天再說」。看到別人短線賺錢的分享就手癢，忍不住衝動交易。你說要長期投資，但股票漲 10% 就想賣；說要嚴守紀律，但又常常違反自己的停損原則。缺乏自制力讓你無法執行長期策略。"
        impact={{
          volume: "對交易量沒有顯著影響",
          price: "可能導致短期思維和次優的長期表現",
          sentiment: "情緒不是主要因素"
        }}
      />

      <BiasCard
        title="現狀偏誤"
        titleEn="Status Quo Bias"
        type="emotional"
        definition="傾向於保持現狀，什麼都不做，而不是做出改變。接受默認是容易和舒適的。"
        marketExample="你的投資組合五年沒動過，雖然有幾檔股票表現很差，但「反正也不知道要換什麼」就繼續放著。有更好的投資機會出現，但要研究、要做決定很麻煩，所以就算了。「現在這樣也還好」成為你的口頭禪。這種惰性讓你錯過更好的機會，也讓表現不佳的持股持續拖累整體報酬。"
        impact={{
          volume: "導致交易量減少",
          price: "可能導致投資組合表現不佳，持有表現不佳的資產",
          sentiment: "不傾向於出現極端波動"
        }}
      />

      <BiasCard
        title="親和偏誤"
        titleEn="Affinity Bias"
        type="emotional"
        definition="傾向於根據產品或公司如何反映個人價值觀和自我形象做出糟糕的選擇。"
        marketExample="你很重視環保，就大量買進某綠能公司股票，因為「支持永續發展」。即使公司連年虧損、技術落後、市占率下滑，你仍捨不得賣，覺得「賣掉就是背叛理念」。投資變成了情感寄託，而不是理性的資金配置。你喜歡公司的價值觀，不代表它是好的投資標的。"
        impact={{
          volume: "對交易量沒有顯著影響",
          price: "可能導致持有表現不佳的資產",
          sentiment: "情緒不是主要因素"
        }}
      />

      {/* ==================== 行為偏誤與圖表形態 ==================== */}
      <SectionHeader
        title="行為偏誤與圖表形態"
        titleEn="Behavioral Biases and Chart Patterns"
        Icon={TrendingUp}
        color="#f59e0b"
      />

      <View style={styles.patternCard}>
        <Text style={styles.patternTitle}>偏誤如何影響圖表形態</Text>
        <Text style={styles.patternText}>
          損失厭惡、心理帳戶、錨定和後見之明偏誤等行為現象與許多圖表形態的發展高度相關，包括支撐與阻力區域、雙頂和雙底以及三角形。
        </Text>

        <View style={styles.quoteBox}>
          <Text style={styles.quoteTitle}>典型的投資者心理</Text>
          <Text style={styles.quoteText}>
            "我之前漲了那麼多，現在正在虧損；如果它回到我買入的地方，我就賣出！"
          </Text>
        </View>

        <Text style={styles.patternText}>
          投資者會有意識地記住他們個人的利潤和損失，通常在經歷了一段時間未實現的收益和損失後，投資者會傾向於做出盈虧平衡類型的決策。
        </Text>
      </View>

      <View style={styles.biasGroupCard}>
        <View style={[styles.biasGroupBox, { backgroundColor: 'rgba(59, 130, 246, 0.1)', borderColor: 'rgba(59, 130, 246, 0.2)' }]}>
          <View style={styles.biasGroupHeader}>
            <TrendingDown size={16} color="#3b82f6" />
            <Text style={styles.biasGroupTitle}>導致這些行為的偏誤</Text>
          </View>
          <Text style={styles.biasGroupItem}>• 心理帳戶</Text>
          <Text style={styles.biasGroupItem}>• 錨定效應</Text>
          <Text style={styles.biasGroupItem}>• 損失厭惡</Text>
        </View>

        <View style={[styles.biasGroupBox, { backgroundColor: 'rgba(139, 92, 246, 0.1)', borderColor: 'rgba(139, 92, 246, 0.2)' }]}>
          <View style={styles.biasGroupHeader}>
            <AlertTriangle size={16} color="#8b5cf6" />
            <Text style={styles.biasGroupTitle}>導致投資者不作為的偏誤</Text>
          </View>
          <Text style={styles.biasGroupItem}>• 現狀偏誤</Text>
          <Text style={styles.biasGroupItem}>• 過度自信</Text>
        </View>
      </View>

      <View style={styles.observationCard}>
        <View style={styles.observationHeader}>
          <TrendingUp size={18} color="#f59e0b" />
          <Text style={styles.observationTitle}>技術分析中的關鍵觀察</Text>
        </View>

        <View style={styles.observationItem}>
          <Text style={styles.observationBullet}>•</Text>
          <View style={styles.observationContent}>
            <Text style={styles.observationLabel}>支撐變阻力</Text>
            <Text style={styles.observationText}>
              這些行為決策傾向於表現為交易者所說的頭頂供應。技術分析中的「曾經的支撐變成阻力」這句話，正是這些偏誤驅動的「盈虧平衡心態」決策的結果。
            </Text>
          </View>
        </View>

        <View style={styles.observationItem}>
          <Text style={styles.observationBullet}>•</Text>
          <View style={styles.observationContent}>
            <Text style={styles.observationLabel}>投降形態</Text>
            <Text style={styles.observationText}>
              當許多人對共同虧損頭寸的情緒反應以遞增的速度增加時，最終導致技術分析師所說的投降形態。極端看跌的價格行為加上不斷增加的成交量是由金融損失的情緒痛苦驅動的。
            </Text>
          </View>
        </View>

        <View style={styles.observationItem}>
          <Text style={styles.observationBullet}>•</Text>
          <View style={styles.observationContent}>
            <Text style={styles.observationLabel}>頂部自滿</Text>
            <Text style={styles.observationText}>
              隨著價格上漲成交量下降的模式表明一定程度的自滿，投資者對上漲的價格感到滿意。
            </Text>
          </View>
        </View>
      </View>

      {/* 底部間距 */}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0e17',
    paddingHorizontal: 16,
  },
  header: {
    paddingVertical: 24,
  },
  pageTitle: {
    color: '#f1f5f9',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  pageDescription: {
    color: '#94a3b8',
    fontSize: 14,
    lineHeight: 20,
  },
  introCard: {
    backgroundColor: '#1a1f2e',
    borderWidth: 1,
    borderColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  introHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  yearBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f59e0b',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  yearText: {
    color: '#0a0e17',
    fontWeight: 'bold',
    fontSize: 13,
  },
  introTitle: {
    color: '#f1f5f9',
    fontWeight: '600',
  },
  introDescription: {
    color: '#94a3b8',
    fontSize: 14,
    lineHeight: 20,
  },
  theoryCard: {
    backgroundColor: '#1a1f2e',
    borderWidth: 1,
    borderColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  theoryTitle: {
    color: '#f1f5f9',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  theoryHighlight: {
    color: '#f59e0b',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
  },
  theoryText: {
    color: '#94a3b8',
    fontSize: 14,
    lineHeight: 20,
  },
  highlightBox: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.2)',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  highlightContent: {
    flex: 1,
    marginLeft: 12,
  },
  highlightTitle: {
    color: '#f1f5f9',
    fontWeight: '600',
    marginBottom: 4,
  },
  highlightText: {
    color: '#94a3b8',
    fontSize: 14,
    lineHeight: 20,
  },
  sectionHeader: {
    marginBottom: 24,
    marginTop: 32,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionHeaderText: {
    flex: 1,
  },
  sectionTitle: {
    color: '#f1f5f9',
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionSubtitle: {
    color: '#64748b',
    fontSize: 12,
  },
  sectionDescription: {
    color: '#94a3b8',
    fontSize: 14,
    lineHeight: 20,
  },
  card: {
    backgroundColor: '#1a1f2e',
    borderWidth: 1,
    borderColor: '#1e293b',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  cardHeader: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardHeaderText: {
    flex: 1,
  },
  cardTitle: {
    color: '#f1f5f9',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardSubtitle: {
    color: '#64748b',
    fontSize: 12,
  },
  cardBody: {
    padding: 16,
  },
  definitionBox: {
    backgroundColor: '#111827',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  definitionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#f59e0b',
    marginRight: 8,
  },
  definitionTitle: {
    color: '#f1f5f9',
    fontSize: 14,
    fontWeight: '600',
  },
  definitionText: {
    color: '#94a3b8',
    fontSize: 14,
    lineHeight: 20,
  },
  exampleBox: {
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
    paddingLeft: 12,
    paddingVertical: 4,
    marginBottom: 12,
  },
  exampleTitle: {
    color: '#f1f5f9',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  exampleText: {
    color: '#94a3b8',
    fontSize: 14,
    lineHeight: 20,
  },
  impactContainer: {
    marginTop: 8,
  },
  impactTitle: {
    color: '#f1f5f9',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  impactGrid: {
    gap: 8,
  },
  impactBox: {
    backgroundColor: '#111827',
    borderRadius: 8,
    padding: 10,
  },
  impactIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  impactLabel: {
    color: '#f1f5f9',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  impactText: {
    color: '#94a3b8',
    fontSize: 12,
    lineHeight: 16,
  },
  // 圖表形態章節樣式
  patternCard: {
    backgroundColor: '#1a1f2e',
    borderWidth: 1,
    borderColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  patternTitle: {
    color: '#f1f5f9',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  patternText: {
    color: '#94a3b8',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  quoteBox: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
    paddingLeft: 12,
    paddingVertical: 8,
    marginVertical: 12,
  },
  quoteTitle: {
    color: '#f1f5f9',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  quoteText: {
    color: '#94a3b8',
    fontSize: 14,
    fontStyle: 'italic',
  },
  biasGroupCard: {
    gap: 12,
    marginBottom: 16,
  },
  biasGroupBox: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
  },
  biasGroupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  biasGroupTitle: {
    color: '#f1f5f9',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  biasGroupItem: {
    color: '#94a3b8',
    fontSize: 13,
    marginBottom: 4,
  },
  observationCard: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.2)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  observationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  observationTitle: {
    color: '#f1f5f9',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 8,
  },
  observationItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  observationBullet: {
    color: '#f59e0b',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  observationContent: {
    flex: 1,
  },
  observationLabel: {
    color: '#f1f5f9',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  observationText: {
    color: '#94a3b8',
    fontSize: 13,
    lineHeight: 18,
  },
});
