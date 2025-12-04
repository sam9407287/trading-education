import { View, Text, ScrollView, Pressable } from 'react-native';
import { useState } from 'react';
import { TrendingUp, TrendingDown, Activity, ChevronDown, ChevronUp } from 'lucide-react-native';

// 策略數據
const strategies = {
  basic: {
    title: '基礎策略',
    items: [
      {
        name: 'Long Call',
        nameCn: '買入看漲期權',
        outlook: 'bullish',
        description: '預期股價上漲時買入 Call，損失有限（權利金），獲利無限。',
        maxProfit: '無限',
        maxLoss: '權利金',
        breakeven: '行權價 + 權利金',
      },
      {
        name: 'Long Put',
        nameCn: '買入看跌期權',
        outlook: 'bearish',
        description: '預期股價下跌時買入 Put，損失有限（權利金），獲利潛力大。',
        maxProfit: '行權價 - 權利金（股價跌至 0）',
        maxLoss: '權利金',
        breakeven: '行權價 - 權利金',
      },
      {
        name: 'Covered Call',
        nameCn: '備兌看漲',
        outlook: 'neutral',
        description: '持有股票的同時賣出 Call，收取權利金增加收入。',
        maxProfit: '(行權價 - 股價) + 權利金',
        maxLoss: '股價下跌 - 權利金',
        breakeven: '持股成本 - 權利金',
      },
      {
        name: 'Cash-Secured Put',
        nameCn: '現金擔保看跌',
        outlook: 'neutral',
        description: '願意以較低價格買入股票時，賣出 Put 收取權利金。',
        maxProfit: '權利金',
        maxLoss: '行權價 - 權利金（股價跌至 0）',
        breakeven: '行權價 - 權利金',
      },
    ],
  },
  spread: {
    title: '價差策略',
    items: [
      {
        name: 'Bull Call Spread',
        nameCn: '牛市看漲價差',
        outlook: 'bullish',
        description: '買入較低行權價 Call，賣出較高行權價 Call。適合溫和看漲。',
        maxProfit: '行權價差 - 淨權利金',
        maxLoss: '淨權利金',
        breakeven: '低行權價 + 淨權利金',
      },
      {
        name: 'Bear Put Spread',
        nameCn: '熊市看跌價差',
        outlook: 'bearish',
        description: '買入較高行權價 Put，賣出較低行權價 Put。適合溫和看跌。',
        maxProfit: '行權價差 - 淨權利金',
        maxLoss: '淨權利金',
        breakeven: '高行權價 - 淨權利金',
      },
    ],
  },
  volatility: {
    title: '波動率策略',
    items: [
      {
        name: 'Long Straddle',
        nameCn: '買入跨式',
        outlook: 'volatile',
        description: '同時買入相同行權價的 Call 和 Put。預期大幅波動但方向不確定。',
        maxProfit: '無限（向上）/ 行權價 - 權利金（向下）',
        maxLoss: '總權利金',
        breakeven: '行權價 ± 總權利金',
      },
      {
        name: 'Short Straddle',
        nameCn: '賣出跨式',
        outlook: 'neutral',
        description: '同時賣出相同行權價的 Call 和 Put。預期價格穩定。',
        maxProfit: '總權利金',
        maxLoss: '無限',
        breakeven: '行權價 ± 總權利金',
      },
      {
        name: 'Iron Condor',
        nameCn: '鐵禿鷹',
        outlook: 'neutral',
        description: '賣出價外 Strangle，買入更價外的保護。限定風險的中性策略。',
        maxProfit: '淨權利金',
        maxLoss: '行權價差 - 淨權利金',
        breakeven: '多個平衡點',
      },
    ],
  },
  synthetic: {
    title: '合成部位',
    items: [
      {
        name: 'Synthetic Long',
        nameCn: '合成多頭',
        outlook: 'bullish',
        description: '買入 Call + 賣出 Put（相同行權價）。模擬持有股票。',
        maxProfit: '無限（向上）',
        maxLoss: '行權價 - 淨權利金',
        breakeven: '行權價 + 淨權利金',
      },
      {
        name: 'Collar',
        nameCn: '領口策略',
        outlook: 'neutral',
        description: '持有股票 + 買入保護性 Put + 賣出 Covered Call。限定獲利和虧損。',
        maxProfit: 'Call 行權價 - 股價 + 淨權利金',
        maxLoss: '股價 - Put 行權價 + 淨權利金',
        breakeven: '根據淨權利金計算',
      },
    ],
  },
};

const outlookConfig = {
  bullish: { label: '看漲', color: '#10b981', Icon: TrendingUp },
  bearish: { label: '看跌', color: '#ef4444', Icon: TrendingDown },
  neutral: { label: '中性', color: '#f59e0b', Icon: Activity },
  volatile: { label: '波動', color: '#8b5cf6', Icon: Activity },
};

// 策略卡片組件
function StrategyCard({ strategy }: { strategy: typeof strategies.basic.items[0] }) {
  const [expanded, setExpanded] = useState(false);
  const outlook = outlookConfig[strategy.outlook as keyof typeof outlookConfig];

  return (
    <View className="bg-bg-card border border-border-color rounded-xl mb-3 overflow-hidden">
      <Pressable 
        onPress={() => setExpanded(!expanded)}
        className="p-4 flex-row items-center justify-between"
      >
        <View className="flex-1 mr-3">
          <View className="flex-row items-center mb-1">
            <Text className="text-text-primary font-semibold">{strategy.name}</Text>
            <View 
              className="ml-2 px-2 py-0.5 rounded flex-row items-center"
              style={{ backgroundColor: `${outlook.color}20` }}
            >
              <outlook.Icon size={12} color={outlook.color} />
              <Text className="text-xs ml-1" style={{ color: outlook.color }}>
                {outlook.label}
              </Text>
            </View>
          </View>
          <Text className="text-text-muted text-xs">{strategy.nameCn}</Text>
        </View>
        {expanded ? (
          <ChevronUp size={20} color="#64748b" />
        ) : (
          <ChevronDown size={20} color="#64748b" />
        )}
      </Pressable>

      {expanded && (
        <View className="px-4 pb-4 border-t border-border-color pt-3">
          <Text className="text-text-secondary text-sm leading-5 mb-4">
            {strategy.description}
          </Text>
          
          <View className="bg-bg-secondary rounded-lg p-3">
            <View className="flex-row justify-between mb-2">
              <Text className="text-text-muted text-xs">最大獲利</Text>
              <Text className="text-accent-green text-xs font-medium">{strategy.maxProfit}</Text>
            </View>
            <View className="flex-row justify-between mb-2">
              <Text className="text-text-muted text-xs">最大虧損</Text>
              <Text className="text-accent-red text-xs font-medium">{strategy.maxLoss}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-text-muted text-xs">損益平衡</Text>
              <Text className="text-accent-gold text-xs font-medium">{strategy.breakeven}</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

// 策略分類組件
function StrategySection({ title, items }: { title: string; items: typeof strategies.basic.items }) {
  return (
    <View className="mb-6">
      <Text className="text-text-primary font-bold text-lg mb-3">{title}</Text>
      {items.map((strategy) => (
        <StrategyCard key={strategy.name} strategy={strategy} />
      ))}
    </View>
  );
}

export default function StrategiesPage() {
  return (
    <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
      {/* 頁面標題 */}
      <View className="py-6">
        <Text className="text-text-primary text-2xl font-bold mb-2">期權策略</Text>
        <Text className="text-text-secondary text-sm leading-5">
          從基礎到進階的完整期權策略庫，點擊展開查看詳情。
        </Text>
      </View>

      {/* 策略快速指南 */}
      <View className="bg-accent-gold/10 border border-accent-gold/20 rounded-xl p-4 mb-6">
        <Text className="text-text-primary font-semibold mb-2">📊 策略選擇指南</Text>
        <Text className="text-text-secondary text-xs leading-5">
          • <Text className="text-accent-green">看漲</Text>：預期股價上漲{'\n'}
          • <Text className="text-accent-red">看跌</Text>：預期股價下跌{'\n'}
          • <Text className="text-accent-gold">中性</Text>：預期股價橫盤或小幅波動{'\n'}
          • <Text className="text-accent-purple">波動</Text>：預期大幅波動，方向不確定
        </Text>
      </View>

      {/* 策略列表 */}
      <StrategySection title={strategies.basic.title} items={strategies.basic.items} />
      <StrategySection title={strategies.spread.title} items={strategies.spread.items} />
      <StrategySection title={strategies.volatility.title} items={strategies.volatility.items} />
      <StrategySection title={strategies.synthetic.title} items={strategies.synthetic.items} />

      {/* 底部間距 */}
      <View className="h-10" />
    </ScrollView>
  );
}

