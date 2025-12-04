import { View, Text, ScrollView, StyleSheet } from 'react-native';
import GreeksVisualizer from '@/components/charts/GreeksVisualizer';

// Greek 數據
const greeks = [
  {
    symbol: 'Δ',
    name: 'Delta',
    nameCn: '德爾塔',
    color: '#3b82f6',
    description: '期權價格對標的價格變化的敏感度。表示標的價格變動 $1 時，期權價格的變動量。',
    range: { call: '0 到 1', put: '-1 到 0' },
    keyPoints: [
      'ITM 期權 Delta 接近 ±1',
      'ATM 期權 Delta 約為 ±0.5',
      'OTM 期權 Delta 接近 0',
      '可視為到期時 ITM 的概率估計',
    ],
    tradingTips: [
      'Delta 中性策略用於純粹交易波動率',
      '高 Delta = 更像直接持有股票',
    ],
  },
  {
    symbol: 'Γ',
    name: 'Gamma',
    nameCn: '伽馬',
    color: '#8b5cf6',
    description: 'Delta 對標的價格變化的敏感度。表示標的價格變動 $1 時，Delta 的變動量。',
    range: { call: '始終為正', put: '始終為正' },
    keyPoints: [
      'ATM 期權的 Gamma 最大',
      '接近到期時 Gamma 急劇增加',
      'Gamma 是 Long 期權的朋友',
      '高 Gamma = Delta 變化快',
    ],
    tradingTips: [
      'Long Gamma 在大幅波動中獲利',
      'Short Gamma 在橫盤中獲利但有尾部風險',
    ],
  },
  {
    symbol: 'Θ',
    name: 'Theta',
    nameCn: '西塔',
    color: '#f59e0b',
    description: '期權價格隨時間流逝而衰減的速度。通常以每日為單位表示。',
    range: { call: '通常為負（買方）', put: '通常為負（買方）' },
    keyPoints: [
      '時間衰減不是線性的',
      'ATM 期權的 Theta 最大',
      '接近到期時 Theta 加速',
      'Theta 是期權賣方的收入來源',
    ],
    tradingTips: [
      'Long 期權要注意時間衰減成本',
      'Short 期權每天都在賺 Theta',
    ],
  },
  {
    symbol: 'ν',
    name: 'Vega',
    nameCn: '維加',
    color: '#10b981',
    description: '期權價格對隱含波動率變化的敏感度。表示 IV 變動 1% 時，期權價格的變動量。',
    range: { call: '始終為正', put: '始終為正' },
    keyPoints: [
      'ATM 期權的 Vega 最大',
      '較長到期的期權 Vega 較大',
      'Long 期權是 Long Vega',
      'IV 上升對 Long 有利',
    ],
    tradingTips: [
      '低 IV 時 Long Vega（買期權）',
      '高 IV 時 Short Vega（賣期權）',
    ],
  },
  {
    symbol: 'ρ',
    name: 'Rho',
    nameCn: '柔',
    color: '#06b6d4',
    description: '期權價格對無風險利率變化的敏感度。通常影響較小。',
    range: { call: '正值', put: '負值' },
    keyPoints: [
      '利率上升對 Call 有利',
      '利率上升對 Put 不利',
      '對短期期權影響很小',
      '通常是最不重要的 Greek',
    ],
    tradingTips: [
      '一般可以忽略 Rho',
      '持有長期期權時需考慮利率環境',
    ],
  },
];

// Greek 卡片組件
function GreekCard({ greek }: { greek: typeof greeks[0] }) {
  return (
    <View style={styles.card}>
      {/* 標題 */}
      <View style={[styles.cardHeader, { backgroundColor: `${greek.color}15` }]}>
        <View style={[styles.symbolBox, { backgroundColor: greek.color }]}>
          <Text style={styles.symbolText}>{greek.symbol}</Text>
        </View>
        <View style={styles.headerText}>
          <Text style={styles.cardTitle}>
            {greek.name} ({greek.nameCn})
          </Text>
          <Text style={styles.cardDescription}>{greek.description}</Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        {/* 範圍 */}
        <View style={styles.rangeRow}>
          <View style={styles.rangeBox}>
            <Text style={styles.rangeLabel}>Call 期權範圍</Text>
            <Text style={styles.rangeValue}>{greek.range.call}</Text>
          </View>
          <View style={styles.rangeBox}>
            <Text style={styles.rangeLabel}>Put 期權範圍</Text>
            <Text style={styles.rangeValue}>{greek.range.put}</Text>
          </View>
        </View>

        {/* 重要特性 */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>重要特性</Text>
          {greek.keyPoints.map((point, i) => (
            <View key={i} style={styles.bulletRow}>
              <View style={[styles.bullet, { backgroundColor: greek.color }]} />
              <Text style={styles.bulletText}>{point}</Text>
            </View>
          ))}
        </View>

        {/* 交易應用 */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>交易應用</Text>
          {greek.tradingTips.map((tip, i) => (
            <View key={i} style={styles.bulletRow}>
              <View style={[styles.bullet, { backgroundColor: '#f59e0b' }]} />
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

export default function GreeksPage() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 頁面標題 */}
      <View style={styles.header}>
        <Text style={styles.pageTitle}>希臘字母</Text>
        <Text style={styles.pageDescription}>
          希臘字母（Greeks）是衡量期權價格對各種因素敏感度的指標。理解 Greeks 是進行期權交易和風險管理的基礎。
        </Text>
      </View>

      {/* 互動式圖表 */}
      <GreeksVisualizer />

      {/* Greeks 列表 */}
      {greeks.map((greek) => (
        <GreekCard key={greek.name} greek={greek} />
      ))}

      {/* Greeks 關係 */}
      <View style={styles.card}>
        <Text style={[styles.cardTitle, { marginBottom: 16 }]}>Greeks 之間的關係</Text>
        
        <View style={styles.relationBox}>
          <Text style={styles.relationTitle}>Delta 與 Gamma</Text>
          <Text style={styles.relationText}>
            Gamma 是 Delta 的變化率。高 Gamma 意味著 Delta 會快速變化。
          </Text>
        </View>
        
        <View style={styles.relationBox}>
          <Text style={styles.relationTitle}>Theta 與 Gamma</Text>
          <Text style={styles.relationText}>
            通常是對立的。Long Gamma 伴隨著負 Theta（時間衰減成本）。
          </Text>
        </View>
        
        <View style={styles.relationBox}>
          <Text style={styles.relationTitle}>Vega 與到期時間</Text>
          <Text style={styles.relationText}>
            較長到期的期權有較高的 Vega，對 IV 變化更敏感。
          </Text>
        </View>
        
        <View style={[styles.relationBox, { marginBottom: 0 }]}>
          <Text style={styles.relationTitle}>ATM 特性</Text>
          <Text style={styles.relationText}>
            ATM 期權的 Gamma、Theta、Vega 通常都是最大的。
          </Text>
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
    alignItems: 'flex-start',
  },
  symbolBox: {
    width: 48,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  symbolText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerText: {
    flex: 1,
  },
  cardTitle: {
    color: '#f1f5f9',
    fontWeight: 'bold',
    fontSize: 15,
  },
  cardDescription: {
    color: '#94a3b8',
    fontSize: 12,
    lineHeight: 16,
    marginTop: 4,
  },
  cardBody: {
    padding: 16,
  },
  rangeRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  rangeBox: {
    flex: 1,
    backgroundColor: '#111827',
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 4,
  },
  rangeLabel: {
    color: '#64748b',
    fontSize: 11,
  },
  rangeValue: {
    color: '#f1f5f9',
    fontWeight: '500',
    fontSize: 13,
    marginTop: 2,
  },
  section: {
    marginBottom: 12,
  },
  sectionLabel: {
    color: '#f1f5f9',
    fontWeight: '600',
    fontSize: 13,
    marginBottom: 8,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 5,
    marginRight: 8,
  },
  bulletText: {
    color: '#94a3b8',
    fontSize: 12,
    flex: 1,
    lineHeight: 16,
  },
  tipText: {
    color: '#64748b',
    fontSize: 12,
    flex: 1,
    lineHeight: 16,
  },
  relationBox: {
    backgroundColor: '#111827',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  relationTitle: {
    color: '#f1f5f9',
    fontWeight: '600',
    fontSize: 13,
  },
  relationText: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 4,
    lineHeight: 16,
  },
});
