import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { TrendingUp, TrendingDown, Target, Clock, DollarSign } from 'lucide-react-native';

export default function OptionsBasicsPage() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 頁面標題 */}
      <View style={styles.header}>
        <Text style={styles.pageTitle}>期權基礎</Text>
        <Text style={styles.pageDescription}>
          期權是一種衍生性金融商品，賦予持有人在特定時間以特定價格買入或賣出標的資產的權利。
        </Text>
      </View>

      {/* 什麼是期權 */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>什麼是期權？</Text>
        <Text style={styles.cardText}>
          期權 (Option) 是一種合約，賦予買方在約定的到期日前，以約定的行權價 (Strike Price) 買入或賣出標的資產的權利，但沒有義務。買方需支付權利金 (Premium) 給賣方來獲得這個權利。
        </Text>
      </View>

      {/* Call Option */}
      <View style={styles.card}>
        <View style={styles.optionHeader}>
          <View style={[styles.iconBox, { backgroundColor: 'rgba(16, 185, 129, 0.1)' }]}>
            <TrendingUp size={20} color="#10b981" />
          </View>
          <View>
            <Text style={styles.cardTitle}>看漲期權</Text>
            <Text style={styles.cardSubtitle}>Call Option</Text>
          </View>
        </View>
        <Text style={styles.cardText}>
          賦予持有人以行權價買入標的資產的權利。當你預期股價會上漲時購買 Call。
        </Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            <Text style={{ color: '#10b981', fontWeight: '500' }}>買方</Text>：支付權利金，獲得買入權利{'\n'}
            <Text style={{ color: '#ef4444', fontWeight: '500' }}>賣方</Text>：收取權利金，承擔賣出義務
          </Text>
        </View>
      </View>

      {/* Put Option */}
      <View style={styles.card}>
        <View style={styles.optionHeader}>
          <View style={[styles.iconBox, { backgroundColor: 'rgba(239, 68, 68, 0.1)' }]}>
            <TrendingDown size={20} color="#ef4444" />
          </View>
          <View>
            <Text style={styles.cardTitle}>看跌期權</Text>
            <Text style={styles.cardSubtitle}>Put Option</Text>
          </View>
        </View>
        <Text style={styles.cardText}>
          賦予持有人以行權價賣出標的資產的權利。當你預期股價會下跌時購買 Put。
        </Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            <Text style={{ color: '#10b981', fontWeight: '500' }}>買方</Text>：支付權利金，獲得賣出權利{'\n'}
            <Text style={{ color: '#ef4444', fontWeight: '500' }}>賣方</Text>：收取權利金，承擔買入義務
          </Text>
        </View>
      </View>

      {/* 期權合約要素 */}
      <Text style={styles.sectionTitle}>期權合約要素</Text>
      <View style={styles.gridRow}>
        <View style={styles.gridItem}>
          <Target size={24} color="#f59e0b" />
          <Text style={styles.gridTitle}>行權價格</Text>
          <Text style={styles.gridSubtitle}>Strike Price</Text>
          <Text style={styles.gridText}>買賣標的資產的約定價格</Text>
        </View>
        <View style={styles.gridItem}>
          <Clock size={24} color="#f59e0b" />
          <Text style={styles.gridTitle}>到期日</Text>
          <Text style={styles.gridSubtitle}>Expiration Date</Text>
          <Text style={styles.gridText}>期權合約的最後有效日期</Text>
        </View>
      </View>
      <View style={styles.gridRow}>
        <View style={styles.gridItem}>
          <DollarSign size={24} color="#f59e0b" />
          <Text style={styles.gridTitle}>權利金</Text>
          <Text style={styles.gridSubtitle}>Premium</Text>
          <Text style={styles.gridText}>購買期權需支付的費用</Text>
        </View>
        <View style={styles.gridItem}>
          <View style={styles.numberBadge}>
            <Text style={styles.numberText}>100</Text>
          </View>
          <Text style={styles.gridTitle}>合約單位</Text>
          <Text style={styles.gridSubtitle}>Contract Size</Text>
          <Text style={styles.gridText}>每張合約代表 100 股</Text>
        </View>
      </View>

      {/* 價內/價平/價外 */}
      <Text style={styles.sectionTitle}>價內/價平/價外</Text>
      <View style={styles.card}>
        <View style={styles.moneyRow}>
          <View style={styles.moneyHeader}>
            <Text style={[styles.moneyLabel, { color: '#10b981' }]}>ITM (價內)</Text>
            <Text style={styles.moneyEn}>In The Money</Text>
          </View>
          <Text style={styles.moneyText}>
            Call: 股價 {'>'} 行權價 | Put: 股價 {'<'} 行權價{'\n'}
            有內在價值，立即行權有利可圖
          </Text>
        </View>
        <View style={[styles.moneyRow, styles.borderTop]}>
          <View style={styles.moneyHeader}>
            <Text style={[styles.moneyLabel, { color: '#f59e0b' }]}>ATM (價平)</Text>
            <Text style={styles.moneyEn}>At The Money</Text>
          </View>
          <Text style={styles.moneyText}>
            股價 ≈ 行權價{'\n'}
            Gamma 和時間價值最高
          </Text>
        </View>
        <View style={[styles.moneyRow, styles.borderTop, { borderBottomWidth: 0 }]}>
          <View style={styles.moneyHeader}>
            <Text style={[styles.moneyLabel, { color: '#ef4444' }]}>OTM (價外)</Text>
            <Text style={styles.moneyEn}>Out of The Money</Text>
          </View>
          <Text style={styles.moneyText}>
            Call: 股價 {'<'} 行權價 | Put: 股價 {'>'} 行權價{'\n'}
            沒有內在價值，只有時間價值
          </Text>
        </View>
      </View>

      {/* 內在價值與時間價值 */}
      <Text style={styles.sectionTitle}>內在價值與時間價值</Text>
      <View style={styles.card}>
        <View style={styles.formulaBox}>
          <Text style={styles.formulaText}>期權價格 = 內在價值 + 時間價值</Text>
        </View>
        
        <View style={{ marginBottom: 16 }}>
          <Text style={styles.cardTitle}>
            內在價值 <Text style={styles.cardSubtitle}>(Intrinsic Value)</Text>
          </Text>
          <Text style={styles.listItem}>• 如果立即行權可以獲得的價值</Text>
          <Text style={styles.listItem}>• Call: Max(0, 股價 - 行權價)</Text>
          <Text style={styles.listItem}>• Put: Max(0, 行權價 - 股價)</Text>
        </View>

        <View>
          <Text style={styles.cardTitle}>
            時間價值 <Text style={styles.cardSubtitle}>(Time Value)</Text>
          </Text>
          <Text style={styles.listItem}>• 因為還有時間可能變成 ITM 而存在的價值</Text>
          <Text style={styles.listItem}>• 隨時間流逝而衰減（Theta 衰減）</Text>
          <Text style={styles.listItem}>• ATM 期權的時間價值最高</Text>
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
  cardSubtitle: {
    color: '#64748b',
    fontSize: 12,
    fontWeight: 'normal',
  },
  cardText: {
    color: '#94a3b8',
    fontSize: 14,
    lineHeight: 22,
  },
  optionHeader: {
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
  infoBox: {
    backgroundColor: '#111827',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
  },
  infoText: {
    color: '#64748b',
    fontSize: 12,
    lineHeight: 18,
  },
  sectionTitle: {
    color: '#f1f5f9',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 16,
    marginTop: 8,
  },
  gridRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  gridItem: {
    flex: 1,
    backgroundColor: '#1a1f2e',
    borderWidth: 1,
    borderColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
  },
  gridTitle: {
    color: '#f1f5f9',
    fontWeight: '600',
    marginTop: 8,
  },
  gridSubtitle: {
    color: '#64748b',
    fontSize: 11,
    marginBottom: 4,
  },
  gridText: {
    color: '#94a3b8',
    fontSize: 12,
    lineHeight: 16,
  },
  numberBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f59e0b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: {
    color: '#0a0e17',
    fontWeight: 'bold',
    fontSize: 13,
  },
  moneyRow: {
    padding: 16,
  },
  moneyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  moneyLabel: {
    fontWeight: '600',
  },
  moneyEn: {
    color: '#64748b',
    fontSize: 12,
  },
  moneyText: {
    color: '#94a3b8',
    fontSize: 12,
    lineHeight: 18,
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: '#1e293b',
  },
  formulaBox: {
    backgroundColor: '#111827',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  formulaText: {
    color: '#f59e0b',
    fontFamily: 'monospace',
    textAlign: 'center',
  },
  listItem: {
    color: '#94a3b8',
    fontSize: 14,
    marginBottom: 4,
  },
});
