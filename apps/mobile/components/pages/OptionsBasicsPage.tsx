import { View, Text, ScrollView } from 'react-native';
import { TrendingUp, TrendingDown, Target, Clock, DollarSign } from 'lucide-react-native';

// 專有名詞組件
function Term({ cn, en, highlight = false }: { cn: string; en: string; highlight?: boolean }) {
  return (
    <Text className={highlight ? 'text-accent-gold font-medium' : 'font-medium'}>
      {cn} <Text className="text-text-muted text-xs">({en})</Text>
    </Text>
  );
}

export default function OptionsBasicsPage() {
  return (
    <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
      {/* 頁面標題 */}
      <View className="py-6">
        <Text className="text-text-primary text-2xl font-bold mb-2">期權基礎</Text>
        <Text className="text-text-secondary text-sm leading-5">
          期權是一種衍生性金融商品，賦予持有人在特定時間以特定價格買入或賣出標的資產的權利。
        </Text>
      </View>

      {/* 什麼是期權 */}
      <View className="bg-bg-card border border-border-color rounded-xl p-4 mb-6">
        <Text className="text-text-primary font-bold text-lg mb-3">什麼是期權？</Text>
        <Text className="text-text-secondary text-sm leading-6">
          期權 (Option) 是一種合約，賦予買方在約定的到期日前，以約定的行權價 (Strike Price) 買入或賣出標的資產的權利，但沒有義務。買方需支付權利金 (Premium) 給賣方來獲得這個權利。
        </Text>
      </View>

      {/* Call 和 Put */}
      <View className="mb-6">
        {/* Call Option */}
        <View className="bg-bg-card border border-border-color rounded-xl p-4 mb-3">
          <View className="flex-row items-center mb-3">
            <View className="w-10 h-10 rounded-lg bg-accent-green/10 items-center justify-center mr-3">
              <TrendingUp size={20} color="#10b981" />
            </View>
            <View>
              <Text className="text-text-primary font-semibold">看漲期權</Text>
              <Text className="text-text-muted text-xs">Call Option</Text>
            </View>
          </View>
          <Text className="text-text-secondary text-sm leading-5 mb-3">
            賦予持有人以行權價買入標的資產的權利。當你預期股價會上漲時購買 Call。
          </Text>
          <View className="bg-bg-secondary rounded-lg p-3">
            <Text className="text-text-muted text-xs">
              <Text className="text-accent-green font-medium">買方</Text>：支付權利金，獲得買入權利{'\n'}
              <Text className="text-accent-red font-medium">賣方</Text>：收取權利金，承擔賣出義務
            </Text>
          </View>
        </View>

        {/* Put Option */}
        <View className="bg-bg-card border border-border-color rounded-xl p-4">
          <View className="flex-row items-center mb-3">
            <View className="w-10 h-10 rounded-lg bg-accent-red/10 items-center justify-center mr-3">
              <TrendingDown size={20} color="#ef4444" />
            </View>
            <View>
              <Text className="text-text-primary font-semibold">看跌期權</Text>
              <Text className="text-text-muted text-xs">Put Option</Text>
            </View>
          </View>
          <Text className="text-text-secondary text-sm leading-5 mb-3">
            賦予持有人以行權價賣出標的資產的權利。當你預期股價會下跌時購買 Put。
          </Text>
          <View className="bg-bg-secondary rounded-lg p-3">
            <Text className="text-text-muted text-xs">
              <Text className="text-accent-green font-medium">買方</Text>：支付權利金，獲得賣出權利{'\n'}
              <Text className="text-accent-red font-medium">賣方</Text>：收取權利金，承擔買入義務
            </Text>
          </View>
        </View>
      </View>

      {/* 期權合約要素 */}
      <Text className="text-text-primary font-bold text-lg mb-4">期權合約要素</Text>
      <View className="flex-row flex-wrap mb-6">
        <View className="w-1/2 pr-1.5 mb-3">
          <View className="bg-bg-card border border-border-color rounded-xl p-4 h-full">
            <Target size={24} color="#f59e0b" />
            <Text className="text-text-primary font-semibold mt-2">行權價格</Text>
            <Text className="text-text-muted text-xs mb-1">Strike Price</Text>
            <Text className="text-text-secondary text-xs leading-4">
              買賣標的資產的約定價格
            </Text>
          </View>
        </View>
        <View className="w-1/2 pl-1.5 mb-3">
          <View className="bg-bg-card border border-border-color rounded-xl p-4 h-full">
            <Clock size={24} color="#f59e0b" />
            <Text className="text-text-primary font-semibold mt-2">到期日</Text>
            <Text className="text-text-muted text-xs mb-1">Expiration Date</Text>
            <Text className="text-text-secondary text-xs leading-4">
              期權合約的最後有效日期
            </Text>
          </View>
        </View>
        <View className="w-1/2 pr-1.5">
          <View className="bg-bg-card border border-border-color rounded-xl p-4 h-full">
            <DollarSign size={24} color="#f59e0b" />
            <Text className="text-text-primary font-semibold mt-2">權利金</Text>
            <Text className="text-text-muted text-xs mb-1">Premium</Text>
            <Text className="text-text-secondary text-xs leading-4">
              購買期權需支付的費用
            </Text>
          </View>
        </View>
        <View className="w-1/2 pl-1.5">
          <View className="bg-bg-card border border-border-color rounded-xl p-4 h-full">
            <View className="w-8 h-8 rounded-full bg-accent-gold items-center justify-center">
              <Text className="text-bg-primary font-bold text-sm">100</Text>
            </View>
            <Text className="text-text-primary font-semibold mt-2">合約單位</Text>
            <Text className="text-text-muted text-xs mb-1">Contract Size</Text>
            <Text className="text-text-secondary text-xs leading-4">
              每張合約代表 100 股
            </Text>
          </View>
        </View>
      </View>

      {/* 價內/價平/價外 */}
      <Text className="text-text-primary font-bold text-lg mb-4">價內/價平/價外</Text>
      <View className="bg-bg-card border border-border-color rounded-xl mb-6 overflow-hidden">
        {/* ITM */}
        <View className="p-4 border-b border-border-color">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-accent-green font-semibold">ITM (價內)</Text>
            <Text className="text-text-muted text-xs">In The Money</Text>
          </View>
          <Text className="text-text-secondary text-xs">
            Call: 股價 {'>'} 行權價 | Put: 股價 {'<'} 行權價{'\n'}
            有內在價值，立即行權有利可圖
          </Text>
        </View>
        {/* ATM */}
        <View className="p-4 border-b border-border-color">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-accent-gold font-semibold">ATM (價平)</Text>
            <Text className="text-text-muted text-xs">At The Money</Text>
          </View>
          <Text className="text-text-secondary text-xs">
            股價 ≈ 行權價{'\n'}
            Gamma 和時間價值最高
          </Text>
        </View>
        {/* OTM */}
        <View className="p-4">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-accent-red font-semibold">OTM (價外)</Text>
            <Text className="text-text-muted text-xs">Out of The Money</Text>
          </View>
          <Text className="text-text-secondary text-xs">
            Call: 股價 {'<'} 行權價 | Put: 股價 {'>'} 行權價{'\n'}
            沒有內在價值，只有時間價值
          </Text>
        </View>
      </View>

      {/* 內在價值與時間價值 */}
      <Text className="text-text-primary font-bold text-lg mb-4">內在價值與時間價值</Text>
      <View className="bg-bg-card border border-border-color rounded-xl p-4 mb-6">
        <View className="bg-bg-secondary rounded-lg p-3 mb-4">
          <Text className="text-accent-gold font-mono text-center">
            期權價格 = 內在價值 + 時間價值
          </Text>
        </View>
        
        <View className="mb-4">
          <Text className="text-text-primary font-semibold mb-2">
            內在價值 <Text className="text-text-muted font-normal">(Intrinsic Value)</Text>
          </Text>
          <View className="space-y-1">
            <Text className="text-text-secondary text-sm">• 如果立即行權可以獲得的價值</Text>
            <Text className="text-text-secondary text-sm">• Call: Max(0, 股價 - 行權價)</Text>
            <Text className="text-text-secondary text-sm">• Put: Max(0, 行權價 - 股價)</Text>
          </View>
        </View>

        <View>
          <Text className="text-text-primary font-semibold mb-2">
            時間價值 <Text className="text-text-muted font-normal">(Time Value)</Text>
          </Text>
          <View className="space-y-1">
            <Text className="text-text-secondary text-sm">• 因為還有時間可能變成 ITM 而存在的價值</Text>
            <Text className="text-text-secondary text-sm">• 隨時間流逝而衰減（Theta 衰減）</Text>
            <Text className="text-text-secondary text-sm">• ATM 期權的時間價值最高</Text>
          </View>
        </View>
      </View>

      {/* 底部間距 */}
      <View className="h-10" />
    </ScrollView>
  );
}

