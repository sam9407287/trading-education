import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { TrendingUp, TrendingDown, Calendar, AlertTriangle, BarChart3 } from 'lucide-react-native';

export default function IVAnalysisPage() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 頁面標題 */}
      <View style={styles.header}>
        <Text style={styles.pageTitle}>IV 分析</Text>
        <Text style={styles.pageDescription}>
          隱含波動率 (Implied Volatility) 是期權定價中最關鍵的變數之一，反映了市場對未來價格波動的預期。
        </Text>
      </View>

      {/* 什麼是 IV */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>什麼是隱含波動率？</Text>
        <Text style={styles.cardText}>
          隱含波動率 (IV) 是從期權市場價格反推出來的預期波動率。它代表了市場參與者對標的資產未來價格波動幅度的共識預期。
        </Text>
        
        <View style={styles.ivRow}>
          <View style={styles.ivBox}>
            <Text style={styles.ivTitle}>IV 高</Text>
            <Text style={styles.ivText}>
              期權較貴，市場預期大波動。常見於財報前。
            </Text>
          </View>
          <View style={styles.ivBox}>
            <Text style={styles.ivTitle}>IV 低</Text>
            <Text style={styles.ivText}>
              期權較便宜，市場預期平穩。
            </Text>
          </View>
        </View>
      </View>

      {/* IV vs HV */}
      <Text style={styles.sectionTitle}>IV vs 歷史波動率</Text>
      <View style={styles.tableCard}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderCell}>比較項目</Text>
          <Text style={styles.tableHeaderCell}>IV</Text>
          <Text style={styles.tableHeaderCell}>HV</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>定義</Text>
          <Text style={styles.tableCellValue}>預期波動率</Text>
          <Text style={styles.tableCellValue}>歷史波動率</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>方向</Text>
          <Text style={styles.tableCellValue}>前瞻性</Text>
          <Text style={styles.tableCellValue}>回顧性</Text>
        </View>
        <View style={[styles.tableRow, { borderBottomWidth: 0 }]}>
          <Text style={styles.tableCell}>用途</Text>
          <Text style={styles.tableCellValue}>判斷貴/便宜</Text>
          <Text style={styles.tableCellValue}>了解歷史特性</Text>
        </View>
      </View>

      {/* IV Rank & Percentile */}
      <Text style={styles.sectionTitle}>IV Rank 與 IV Percentile</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>IV Rank</Text>
        <Text style={styles.cardSubtext}>當前 IV 在過去一年 IV 範圍中的相對位置</Text>
        <View style={styles.formulaBox}>
          <Text style={styles.formulaText}>
            IV Rank = (當前IV - 最低IV) / (最高IV - 最低IV)
          </Text>
        </View>
        <Text style={styles.cardText}>
          例：IV 最低 20%、最高 60%、當前 40%，則 IV Rank = 50%
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>IV Percentile</Text>
        <Text style={styles.cardSubtext}>過去一年中有多少比例的天數 IV 低於當前水平</Text>
        <View style={styles.formulaBox}>
          <Text style={styles.formulaText}>
            IV Percentile = 低於當前IV的天數 / 總天數
          </Text>
        </View>
        <Text style={styles.cardText}>
          例：252 個交易日中有 200 天 IV 較低，則 IV Percentile = 79%
        </Text>
      </View>

      {/* 策略選擇 */}
      <Text style={styles.sectionTitle}>IV 與策略選擇</Text>
      
      {/* 高 IV */}
      <View style={styles.card}>
        <View style={styles.strategyHeader}>
          <View style={[styles.iconBox, { backgroundColor: 'rgba(239, 68, 68, 0.1)' }]}>
            <TrendingUp size={20} color="#ef4444" />
          </View>
          <View>
            <Text style={styles.cardTitle}>高 IV 環境</Text>
            <Text style={styles.cardSubtext}>IV Rank {'>'} 50%</Text>
          </View>
        </View>
        <Text style={styles.cardText}>期權較貴，適合賣出策略</Text>
        <Text style={styles.listItem}>• Short Strangle / Short Straddle</Text>
        <Text style={styles.listItem}>• Iron Condor / Iron Butterfly</Text>
        <Text style={styles.listItem}>• Credit Spread</Text>
        <Text style={styles.listItem}>• Covered Call / Cash-Secured Put</Text>
      </View>

      {/* 低 IV */}
      <View style={styles.card}>
        <View style={styles.strategyHeader}>
          <View style={[styles.iconBox, { backgroundColor: 'rgba(16, 185, 129, 0.1)' }]}>
            <TrendingDown size={20} color="#10b981" />
          </View>
          <View>
            <Text style={styles.cardTitle}>低 IV 環境</Text>
            <Text style={styles.cardSubtext}>IV Rank {'<'} 30%</Text>
          </View>
        </View>
        <Text style={styles.cardText}>期權較便宜，適合買入策略</Text>
        <Text style={styles.listItem}>• Long Call / Long Put</Text>
        <Text style={styles.listItem}>• Long Straddle / Long Strangle</Text>
        <Text style={styles.listItem}>• Debit Spread</Text>
        <Text style={styles.listItem}>• Calendar Spread</Text>
      </View>

      {/* 影響 IV 的事件 */}
      <Text style={styles.sectionTitle}>影響 IV 的事件</Text>
      <View style={styles.eventRow}>
        <View style={styles.eventBox}>
          <Calendar size={24} color="#f59e0b" />
          <Text style={styles.eventTitle}>財報</Text>
          <Text style={styles.eventText}>財報前 IV 升高</Text>
        </View>
        <View style={styles.eventBox}>
          <AlertTriangle size={24} color="#f59e0b" />
          <Text style={styles.eventTitle}>FDA</Text>
          <Text style={styles.eventText}>審批前 IV 極高</Text>
        </View>
        <View style={styles.eventBox}>
          <BarChart3 size={24} color="#f59e0b" />
          <Text style={styles.eventTitle}>宏觀</Text>
          <Text style={styles.eventText}>Fed、選舉等</Text>
        </View>
      </View>

      {/* IV Crush */}
      <View style={styles.highlightBox}>
        <Text style={styles.highlightTitle}>IV Crush - 波動率崩塌</Text>
        <Text style={styles.highlightText}>
          當不確定性消除後（如財報公布），IV 會急劇下降，這就是 IV Crush。即使股價往預期方向移動，買入的期權也可能因為 IV Crush 而虧損。
        </Text>
        <View style={styles.crushRow}>
          <View style={styles.crushBox}>
            <Text style={[styles.crushTitle, { color: '#10b981' }]}>利用 IV Crush</Text>
            <Text style={styles.crushText}>
              在高 IV 時賣出期權，等 IV Crush 後平倉獲利。
            </Text>
          </View>
          <View style={styles.crushBox}>
            <Text style={[styles.crushTitle, { color: '#ef4444' }]}>避免 IV Crush</Text>
            <Text style={styles.crushText}>
              不要在高 IV 時買入期權賭財報方向。
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
  card: {
    backgroundColor: '#1a1f2e',
    borderWidth: 1,
    borderColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    color: '#f1f5f9',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  cardSubtext: {
    color: '#64748b',
    fontSize: 12,
    marginBottom: 8,
  },
  cardText: {
    color: '#94a3b8',
    fontSize: 14,
    lineHeight: 20,
  },
  sectionTitle: {
    color: '#f1f5f9',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 16,
    marginTop: 8,
  },
  ivRow: {
    flexDirection: 'row',
    marginTop: 16,
  },
  ivBox: {
    flex: 1,
    backgroundColor: '#111827',
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 4,
  },
  ivTitle: {
    color: '#f1f5f9',
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 4,
  },
  ivText: {
    color: '#64748b',
    fontSize: 12,
    lineHeight: 16,
  },
  tableCard: {
    backgroundColor: '#1a1f2e',
    borderWidth: 1,
    borderColor: '#1e293b',
    borderRadius: 12,
    marginBottom: 24,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#111827',
    padding: 12,
  },
  tableHeaderCell: {
    flex: 1,
    color: '#f1f5f9',
    fontWeight: '600',
    fontSize: 12,
  },
  tableRow: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  tableCell: {
    flex: 1,
    color: '#f1f5f9',
    fontSize: 12,
  },
  tableCellValue: {
    flex: 1,
    color: '#94a3b8',
    fontSize: 12,
  },
  formulaBox: {
    backgroundColor: '#111827',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  formulaText: {
    color: '#f59e0b',
    fontFamily: 'monospace',
    fontSize: 11,
    textAlign: 'center',
  },
  strategyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  listItem: {
    color: '#64748b',
    fontSize: 12,
    marginTop: 4,
  },
  eventRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  eventBox: {
    flex: 1,
    backgroundColor: '#1a1f2e',
    borderWidth: 1,
    borderColor: '#1e293b',
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 4,
  },
  eventTitle: {
    color: '#f1f5f9',
    fontWeight: '600',
    fontSize: 14,
    marginTop: 8,
  },
  eventText: {
    color: '#64748b',
    fontSize: 11,
    marginTop: 4,
  },
  highlightBox: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.2)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  highlightTitle: {
    color: '#f1f5f9',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  highlightText: {
    color: '#94a3b8',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  crushRow: {
    flexDirection: 'row',
  },
  crushBox: {
    flex: 1,
    backgroundColor: 'rgba(10, 14, 23, 0.5)',
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 4,
  },
  crushTitle: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 4,
  },
  crushText: {
    color: '#94a3b8',
    fontSize: 12,
    lineHeight: 16,
  },
});
