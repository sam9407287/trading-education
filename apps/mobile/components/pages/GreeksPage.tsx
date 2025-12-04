import { View, Text, ScrollView } from 'react-native';

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
    <View className="bg-bg-card border border-border-color rounded-xl mb-4 overflow-hidden">
      {/* 標題 */}
      <View className="p-4 flex-row items-center" style={{ backgroundColor: `${greek.color}15` }}>
        <View 
          className="w-12 h-12 rounded-lg items-center justify-center mr-3"
          style={{ backgroundColor: greek.color }}
        >
          <Text className="text-white text-xl font-bold">{greek.symbol}</Text>
        </View>
        <View className="flex-1">
          <Text className="text-text-primary font-bold text-base">
            {greek.name} ({greek.nameCn})
          </Text>
          <Text className="text-text-secondary text-xs leading-4 mt-1">
            {greek.description}
          </Text>
        </View>
      </View>

      <View className="p-4">
        {/* 範圍 */}
        <View className="flex-row mb-4">
          <View className="flex-1 bg-bg-secondary rounded-lg p-3 mr-2">
            <Text className="text-text-muted text-xs">Call 期權範圍</Text>
            <Text className="text-text-primary font-medium text-sm">{greek.range.call}</Text>
          </View>
          <View className="flex-1 bg-bg-secondary rounded-lg p-3">
            <Text className="text-text-muted text-xs">Put 期權範圍</Text>
            <Text className="text-text-primary font-medium text-sm">{greek.range.put}</Text>
          </View>
        </View>

        {/* 重要特性 */}
        <View className="mb-3">
          <Text className="text-text-primary font-semibold text-sm mb-2">重要特性</Text>
          {greek.keyPoints.map((point, i) => (
            <View key={i} className="flex-row items-start mb-1">
              <View className="w-1.5 h-1.5 rounded-full mt-1.5 mr-2" style={{ backgroundColor: greek.color }} />
              <Text className="text-text-secondary text-xs flex-1">{point}</Text>
            </View>
          ))}
        </View>

        {/* 交易應用 */}
        <View>
          <Text className="text-text-primary font-semibold text-sm mb-2">交易應用</Text>
          {greek.tradingTips.map((tip, i) => (
            <View key={i} className="flex-row items-start mb-1">
              <View className="w-1.5 h-1.5 rounded-full bg-accent-gold mt-1.5 mr-2" />
              <Text className="text-text-muted text-xs flex-1">{tip}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

export default function GreeksPage() {
  return (
    <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
      {/* 頁面標題 */}
      <View className="py-6">
        <Text className="text-text-primary text-2xl font-bold mb-2">希臘字母</Text>
        <Text className="text-text-secondary text-sm leading-5">
          希臘字母（Greeks）是衡量期權價格對各種因素敏感度的指標。理解 Greeks 是進行期權交易和風險管理的基礎。
        </Text>
      </View>

      {/* Greeks 列表 */}
      {greeks.map((greek) => (
        <GreekCard key={greek.name} greek={greek} />
      ))}

      {/* Greeks 關係 */}
      <View className="bg-bg-card border border-border-color rounded-xl p-4 mb-6">
        <Text className="text-text-primary font-bold mb-4">Greeks 之間的關係</Text>
        
        <View className="bg-bg-secondary rounded-lg p-3 mb-2">
          <Text className="text-text-primary font-semibold text-sm">Delta 與 Gamma</Text>
          <Text className="text-text-secondary text-xs mt-1">
            Gamma 是 Delta 的變化率。高 Gamma 意味著 Delta 會快速變化。
          </Text>
        </View>
        
        <View className="bg-bg-secondary rounded-lg p-3 mb-2">
          <Text className="text-text-primary font-semibold text-sm">Theta 與 Gamma</Text>
          <Text className="text-text-secondary text-xs mt-1">
            通常是對立的。Long Gamma 伴隨著負 Theta（時間衰減成本）。
          </Text>
        </View>
        
        <View className="bg-bg-secondary rounded-lg p-3 mb-2">
          <Text className="text-text-primary font-semibold text-sm">Vega 與到期時間</Text>
          <Text className="text-text-secondary text-xs mt-1">
            較長到期的期權有較高的 Vega，對 IV 變化更敏感。
          </Text>
        </View>
        
        <View className="bg-bg-secondary rounded-lg p-3">
          <Text className="text-text-primary font-semibold text-sm">ATM 特性</Text>
          <Text className="text-text-secondary text-xs mt-1">
            ATM 期權的 Gamma、Theta、Vega 通常都是最大的。
          </Text>
        </View>
      </View>

      {/* 底部間距 */}
      <View className="h-10" />
    </ScrollView>
  );
}

