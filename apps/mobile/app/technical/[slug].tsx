import { View, Text, ScrollView } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import BehavioralFinancePage from '@/components/pages/BehavioralFinancePage';

// 頁面標題映射
const pageTitles: Record<string, string> = {
  'behavioral-finance': '行為金融學',
  'indicators': '技術指標',
  'patterns': '形態分析',
  'theories': '理論知識',
  'chart-reading': '圖表判讀',
  'cycle-analysis': '週期分析',
  'candlestick-patterns': 'K線型態',
};

export default function TechnicalDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const title = pageTitles[slug || ''] || '技術分析';

  // 根據 slug 渲染對應頁面
  const renderContent = () => {
    switch (slug) {
      case 'behavioral-finance':
        return <BehavioralFinancePage />;
      case 'indicators':
        return <PlaceholderPage title="技術指標" />;
      case 'patterns':
        return <PlaceholderPage title="形態分析" />;
      case 'theories':
        return <PlaceholderPage title="理論知識" />;
      default:
        return <PlaceholderPage title={title} />;
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerTitle: title }} />
      <SafeAreaView className="flex-1 bg-bg-primary" edges={['bottom']}>
        {renderContent()}
      </SafeAreaView>
    </>
  );
}

// 佔位頁面組件
function PlaceholderPage({ title }: { title: string }) {
  return (
    <View className="flex-1 items-center justify-center px-4">
      <Text className="text-text-primary text-xl font-bold mb-2">{title}</Text>
      <Text className="text-text-secondary text-center">
        此頁面正在開發中...
      </Text>
    </View>
  );
}

