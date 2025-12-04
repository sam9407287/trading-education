import { View, Text, StyleSheet } from 'react-native';
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
      <SafeAreaView style={styles.container} edges={['bottom']}>
        {renderContent()}
      </SafeAreaView>
    </>
  );
}

// 佔位頁面組件
function PlaceholderPage({ title }: { title: string }) {
  return (
    <View style={styles.placeholderContainer}>
      <Text style={styles.placeholderTitle}>{title}</Text>
      <Text style={styles.placeholderText}>此頁面正在開發中...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0e17',
  },
  placeholderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  placeholderTitle: {
    color: '#f1f5f9',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  placeholderText: {
    color: '#94a3b8',
    textAlign: 'center',
  },
});
