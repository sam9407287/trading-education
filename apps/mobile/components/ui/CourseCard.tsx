import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  TrendingUp, 
  BarChart3, 
  LineChart, 
  Activity,
  BrainCircuit,
  Waves,
  Target,
  BookOpen,
  Calculator,
  Layers
} from 'lucide-react-native';

// 圖標映射
const iconMap: Record<string, any> = {
  TrendingUp,
  BarChart3,
  LineChart,
  Activity,
  BrainCircuit,
  Waves,
  Target,
  BookOpen,
  Calculator,
  Layers,
  CandlestickChart: BarChart3, // 替代
};

interface CourseCardProps {
  title: string;
  titleEn: string;
  href: string;
  iconName: string;
  description: string;
}

export default function CourseCard({ title, titleEn, href, iconName, description }: CourseCardProps) {
  const router = useRouter();
  const Icon = iconMap[iconName] || TrendingUp;

  const handlePress = () => {
    // 轉換路徑：
    // /technical-analysis/behavioral-finance -> technical/behavioral-finance
    // /options/basics -> options/basics
    let mobilePath = href
      .replace('/technical-analysis/', 'technical/')
      .replace(/^\/options\//, 'options/');
    
    // 確保沒有前導斜杠
    if (mobilePath.startsWith('/')) {
      mobilePath = mobilePath.substring(1);
    }
    
    console.log('Navigating to:', mobilePath);
    router.push(mobilePath as any);
  };

  return (
    <Pressable 
      onPress={handlePress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed
      ]}
    >
      <View style={styles.iconContainer}>
        <Icon size={24} color="#f59e0b" />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.titleEn}>{titleEn}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1a1f2e',
    borderWidth: 1,
    borderColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  cardPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    color: '#f1f5f9',
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 2,
  },
  titleEn: {
    color: '#64748b',
    fontSize: 12,
    marginBottom: 8,
  },
  description: {
    color: '#94a3b8',
    fontSize: 14,
    lineHeight: 20,
  },
});
