import { View, Text, ScrollView } from 'react-native';
import { TrendingUp, TrendingDown, Calendar, AlertTriangle, BarChart3 } from 'lucide-react-native';

export default function IVAnalysisPage() {
  return (
    <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
      {/* 頁面標題 */}
      <View className="py-6">
        <Text className="text-text-primary text-2xl font-bold mb-2">IV 分析</Text>
        <Text className="text-text-secondary text-sm leading-5">
          隱含波動率 (Implied Volatility) 是期權定價中最關鍵的變數之一，反映了市場對未來價格波動的預期。
        </Text>
      </View>

      {/* 什麼是 IV */}
      <View className="bg-bg-card border border-border-color rounded-xl p-4 mb-6">
        <Text className="text-text-primary font-bold text-lg mb-3">什麼是隱含波動率？</Text>
        <Text className="text-text-secondary text-sm leading-5 mb-4">
          隱含波動率 (IV) 是從期權市場價格反推出來的預期波動率。它代表了市場參與者對標的資產未來價格波動幅度的共識預期。
        </Text>
        
        <View className="flex-row">
          <View className="flex-1 bg-bg-secondary rounded-lg p-3 mr-2">
            <Text className="text-text-primary font-semibold text-sm mb-1">IV 高</Text>
            <Text className="text-text-muted text-xs">
              期權較貴，市場預期大波動。常見於財報前。
            </Text>
          </View>
          <View className="flex-1 bg-bg-secondary rounded-lg p-3">
            <Text className="text-text-primary font-semibold text-sm mb-1">IV 低</Text>
            <Text className="text-text-muted text-xs">
              期權較便宜，市場預期平穩。
            </Text>
          </View>
        </View>
      </View>

      {/* IV vs HV */}
      <Text className="text-text-primary font-bold text-lg mb-4">IV vs 歷史波動率</Text>
      <View className="bg-bg-card border border-border-color rounded-xl mb-6 overflow-hidden">
        <View className="bg-bg-secondary p-3 flex-row">
          <Text className="flex-1 text-text-primary font-semibold text-xs">比較項目</Text>
          <Text className="flex-1 text-text-primary font-semibold text-xs">IV</Text>
          <Text className="flex-1 text-text-primary font-semibold text-xs">HV</Text>
        </View>
        <View className="p-3 border-b border-border-color flex-row">
          <Text className="flex-1 text-text-primary text-xs">定義</Text>
          <Text className="flex-1 text-text-secondary text-xs">預期波動率</Text>
          <Text className="flex-1 text-text-secondary text-xs">歷史波動率</Text>
        </View>
        <View className="p-3 border-b border-border-color flex-row">
          <Text className="flex-1 text-text-primary text-xs">方向</Text>
          <Text className="flex-1 text-text-secondary text-xs">前瞻性</Text>
          <Text className="flex-1 text-text-secondary text-xs">回顧性</Text>
        </View>
        <View className="p-3 flex-row">
          <Text className="flex-1 text-text-primary text-xs">用途</Text>
          <Text className="flex-1 text-text-secondary text-xs">判斷貴/便宜</Text>
          <Text className="flex-1 text-text-secondary text-xs">了解歷史特性</Text>
        </View>
      </View>

      {/* IV Rank & Percentile */}
      <Text className="text-text-primary font-bold text-lg mb-4">IV Rank 與 IV Percentile</Text>
      <View className="mb-6">
        <View className="bg-bg-card border border-border-color rounded-xl p-4 mb-3">
          <Text className="text-text-primary font-semibold mb-2">IV Rank</Text>
          <Text className="text-text-muted text-xs mb-2">
            當前 IV 在過去一年 IV 範圍中的相對位置
          </Text>
          <View className="bg-bg-secondary rounded-lg p-2 mb-2">
            <Text className="text-accent-gold font-mono text-xs text-center">
              IV Rank = (當前IV - 最低IV) / (最高IV - 最低IV)
            </Text>
          </View>
          <Text className="text-text-secondary text-xs">
            例：IV 最低 20%、最高 60%、當前 40%，則 IV Rank = 50%
          </Text>
        </View>

        <View className="bg-bg-card border border-border-color rounded-xl p-4">
          <Text className="text-text-primary font-semibold mb-2">IV Percentile</Text>
          <Text className="text-text-muted text-xs mb-2">
            過去一年中有多少比例的天數 IV 低於當前水平
          </Text>
          <View className="bg-bg-secondary rounded-lg p-2 mb-2">
            <Text className="text-accent-gold font-mono text-xs text-center">
              IV Percentile = 低於當前IV的天數 / 總天數
            </Text>
          </View>
          <Text className="text-text-secondary text-xs">
            例：252 個交易日中有 200 天 IV 較低，則 IV Percentile = 79%
          </Text>
        </View>
      </View>

      {/* 策略選擇 */}
      <Text className="text-text-primary font-bold text-lg mb-4">IV 與策略選擇</Text>
      <View className="mb-6">
        {/* 高 IV */}
        <View className="bg-bg-card border border-border-color rounded-xl p-4 mb-3">
          <View className="flex-row items-center mb-3">
            <View className="w-10 h-10 rounded-lg bg-accent-red/10 items-center justify-center mr-3">
              <TrendingUp size={20} color="#ef4444" />
            </View>
            <View>
              <Text className="text-text-primary font-semibold">高 IV 環境</Text>
              <Text className="text-text-muted text-xs">IV Rank {'>'} 50%</Text>
            </View>
          </View>
          <Text className="text-text-secondary text-sm mb-3">期權較貴，適合賣出策略</Text>
          <View className="space-y-1">
            <Text className="text-text-muted text-xs">• Short Strangle / Short Straddle</Text>
            <Text className="text-text-muted text-xs">• Iron Condor / Iron Butterfly</Text>
            <Text className="text-text-muted text-xs">• Credit Spread</Text>
            <Text className="text-text-muted text-xs">• Covered Call / Cash-Secured Put</Text>
          </View>
        </View>

        {/* 低 IV */}
        <View className="bg-bg-card border border-border-color rounded-xl p-4">
          <View className="flex-row items-center mb-3">
            <View className="w-10 h-10 rounded-lg bg-accent-green/10 items-center justify-center mr-3">
              <TrendingDown size={20} color="#10b981" />
            </View>
            <View>
              <Text className="text-text-primary font-semibold">低 IV 環境</Text>
              <Text className="text-text-muted text-xs">IV Rank {'<'} 30%</Text>
            </View>
          </View>
          <Text className="text-text-secondary text-sm mb-3">期權較便宜，適合買入策略</Text>
          <View className="space-y-1">
            <Text className="text-text-muted text-xs">• Long Call / Long Put</Text>
            <Text className="text-text-muted text-xs">• Long Straddle / Long Strangle</Text>
            <Text className="text-text-muted text-xs">• Debit Spread</Text>
            <Text className="text-text-muted text-xs">• Calendar Spread</Text>
          </View>
        </View>
      </View>

      {/* 影響 IV 的事件 */}
      <Text className="text-text-primary font-bold text-lg mb-4">影響 IV 的事件</Text>
      <View className="flex-row flex-wrap mb-6">
        <View className="w-1/3 pr-1">
          <View className="bg-bg-card border border-border-color rounded-xl p-3">
            <Calendar size={24} color="#f59e0b" />
            <Text className="text-text-primary font-semibold text-sm mt-2">財報</Text>
            <Text className="text-text-muted text-xs mt-1">
              財報前 IV 升高
            </Text>
          </View>
        </View>
        <View className="w-1/3 px-1">
          <View className="bg-bg-card border border-border-color rounded-xl p-3">
            <AlertTriangle size={24} color="#f59e0b" />
            <Text className="text-text-primary font-semibold text-sm mt-2">FDA</Text>
            <Text className="text-text-muted text-xs mt-1">
              審批前 IV 極高
            </Text>
          </View>
        </View>
        <View className="w-1/3 pl-1">
          <View className="bg-bg-card border border-border-color rounded-xl p-3">
            <BarChart3 size={24} color="#f59e0b" />
            <Text className="text-text-primary font-semibold text-sm mt-2">宏觀</Text>
            <Text className="text-text-muted text-xs mt-1">
              Fed、選舉等
            </Text>
          </View>
        </View>
      </View>

      {/* IV Crush */}
      <View className="bg-accent-gold/10 border border-accent-gold/20 rounded-xl p-4 mb-6">
        <Text className="text-text-primary font-bold mb-3">IV Crush - 波動率崩塌</Text>
        <Text className="text-text-secondary text-sm leading-5 mb-4">
          當不確定性消除後（如財報公布），IV 會急劇下降，這就是 IV Crush。即使股價往預期方向移動，買入的期權也可能因為 IV Crush 而虧損。
        </Text>
        <View className="flex-row">
          <View className="flex-1 bg-bg-primary/50 rounded-lg p-3 mr-2">
            <Text className="text-accent-green font-semibold text-sm mb-1">利用 IV Crush</Text>
            <Text className="text-text-secondary text-xs">
              在高 IV 時賣出期權，等 IV Crush 後平倉獲利。
            </Text>
          </View>
          <View className="flex-1 bg-bg-primary/50 rounded-lg p-3">
            <Text className="text-accent-red font-semibold text-sm mb-1">避免 IV Crush</Text>
            <Text className="text-text-secondary text-xs">
              不要在高 IV 時買入期權賭財報方向。
            </Text>
          </View>
        </View>
      </View>

      {/* 底部間距 */}
      <View className="h-10" />
    </ScrollView>
  );
}

