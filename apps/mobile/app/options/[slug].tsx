import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import OptionsBasicsPage from '@/components/pages/OptionsBasicsPage';
import GreeksPage from '@/components/pages/GreeksPage';
import StrategiesPage from '@/components/pages/StrategiesPage';
import IVAnalysisPage from '@/components/pages/IVAnalysisPage';

// 頁面標題映射
const pageTitles: Record<string, string> = {
  'basics': '期權基礎',
  'greeks': '希臘字母',
  'strategies': '期權策略',
  'iv-analysis': 'IV 分析',
};

export default function OptionsDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const title = pageTitles[slug || ''] || '期權教學';

  // 根據 slug 渲染對應頁面
  const renderContent = () => {
    switch (slug) {
      case 'basics':
        return <OptionsBasicsPage />;
      case 'greeks':
        return <GreeksPage />;
      case 'strategies':
        return <StrategiesPage />;
      case 'iv-analysis':
        return <IVAnalysisPage />;
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
