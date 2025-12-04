import { View, Text, Pressable } from 'react-native';
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
    // 轉換路徑：/technical-analysis/behavioral-finance -> /technical/behavioral-finance
    const mobilePath = href
      .replace('/technical-analysis/', '/technical/')
      .replace('/options/', '/options/');
    router.push(mobilePath as any);
  };

  return (
    <Pressable 
      onPress={handlePress}
      className="bg-bg-card border border-border-color rounded-xl p-4 mb-3 active:scale-95"
    >
      <View className="flex-row items-start">
        <View className="w-12 h-12 rounded-xl bg-bg-secondary items-center justify-center mr-4">
          <Icon size={24} color="#f59e0b" />
        </View>
        <View className="flex-1">
          <Text className="text-text-primary font-semibold text-base mb-0.5">
            {title}
          </Text>
          <Text className="text-text-muted text-xs mb-2">
            {titleEn}
          </Text>
          <Text className="text-text-secondary text-sm leading-5" numberOfLines={2}>
            {description}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

