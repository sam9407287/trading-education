import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
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
    <View style={styles.card}>
      <Pressable 
        onPress={() => setExpanded(!expanded)}
        style={styles.cardHeader}
      >
        <View style={styles.cardHeaderContent}>
          <View style={styles.cardTitleRow}>
            <Text style={styles.cardTitle}>{strategy.name}</Text>
            <View style={[styles.outlookBadge, { backgroundColor: `${outlook.color}20` }]}>
              <outlook.Icon size={12} color={outlook.color} />
              <Text style={[styles.outlookText, { color: outlook.color }]}>
                {outlook.label}
              </Text>
            </View>
          </View>
          <Text style={styles.cardSubtitle}>{strategy.nameCn}</Text>
        </View>
        {expanded ? (
          <ChevronUp size={20} color="#64748b" />
        ) : (
          <ChevronDown size={20} color="#64748b" />
        )}
      </Pressable>

      {expanded && (
        <View style={styles.cardBody}>
          <Text style={styles.description}>{strategy.description}</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>最大獲利</Text>
              <Text style={[styles.statValue, { color: '#10b981' }]}>{strategy.maxProfit}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>最大虧損</Text>
              <Text style={[styles.statValue, { color: '#ef4444' }]}>{strategy.maxLoss}</Text>
            </View>
            <View style={[styles.statRow, { marginBottom: 0 }]}>
              <Text style={styles.statLabel}>損益平衡</Text>
              <Text style={[styles.statValue, { color: '#f59e0b' }]}>{strategy.breakeven}</Text>
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
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {items.map((strategy) => (
        <StrategyCard key={strategy.name} strategy={strategy} />
      ))}
    </View>
  );
}

export default function StrategiesPage() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 頁面標題 */}
      <View style={styles.header}>
        <Text style={styles.pageTitle}>期權策略</Text>
        <Text style={styles.pageDescription}>
          從基礎到進階的完整期權策略庫，點擊展開查看詳情。
        </Text>
      </View>

      {/* 策略快速指南 */}
      <View style={styles.guideBox}>
        <Text style={styles.guideTitle}>📊 策略選擇指南</Text>
        <Text style={styles.guideText}>
          • <Text style={{ color: '#10b981' }}>看漲</Text>：預期股價上漲{'\n'}
          • <Text style={{ color: '#ef4444' }}>看跌</Text>：預期股價下跌{'\n'}
          • <Text style={{ color: '#f59e0b' }}>中性</Text>：預期股價橫盤或小幅波動{'\n'}
          • <Text style={{ color: '#8b5cf6' }}>波動</Text>：預期大幅波動，方向不確定
        </Text>
      </View>

      {/* 策略列表 */}
      <StrategySection title={strategies.basic.title} items={strategies.basic.items} />
      <StrategySection title={strategies.spread.title} items={strategies.spread.items} />
      <StrategySection title={strategies.volatility.title} items={strategies.volatility.items} />
      <StrategySection title={strategies.synthetic.title} items={strategies.synthetic.items} />

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
  guideBox: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.2)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  guideTitle: {
    color: '#f1f5f9',
    fontWeight: '600',
    marginBottom: 8,
  },
  guideText: {
    color: '#94a3b8',
    fontSize: 12,
    lineHeight: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#f1f5f9',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#1a1f2e',
    borderWidth: 1,
    borderColor: '#1e293b',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  cardHeader: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardHeaderContent: {
    flex: 1,
    marginRight: 12,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardTitle: {
    color: '#f1f5f9',
    fontWeight: '600',
    fontSize: 15,
  },
  outlookBadge: {
    marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  outlookText: {
    fontSize: 11,
    marginLeft: 4,
    fontWeight: '500',
  },
  cardSubtitle: {
    color: '#64748b',
    fontSize: 12,
  },
  cardBody: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#1e293b',
    paddingTop: 12,
  },
  description: {
    color: '#94a3b8',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  statsContainer: {
    backgroundColor: '#111827',
    borderRadius: 8,
    padding: 12,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statLabel: {
    color: '#64748b',
    fontSize: 12,
  },
  statValue: {
    fontSize: 12,
    fontWeight: '500',
  },
});
