import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Sparkles, TrendingUp } from 'lucide-react-native';
import { technicalSubCategories, optionsSubCategories } from '@trading-edu/shared';
import CourseCard from '@/components/ui/CourseCard';
import SectionHeader from '@/components/ui/SectionHeader';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-bg-primary">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <LinearGradient
          colors={['rgba(245, 158, 11, 0.1)', 'transparent']}
          className="px-4 pt-8 pb-10"
        >
          {/* Logo */}
          <View className="flex-row items-center mb-6">
            <View className="w-10 h-10 rounded-lg bg-accent-gold items-center justify-center mr-3">
              <TrendingUp size={24} color="#0a0e17" />
            </View>
            <View>
              <Text className="text-accent-gold font-bold text-lg">交易教育平台</Text>
              <Text className="text-text-muted text-xs">Trading Education</Text>
            </View>
          </View>

          {/* Badge */}
          <View className="flex-row items-center bg-accent-gold/10 border border-accent-gold/20 rounded-full px-3 py-1.5 self-start mb-4">
            <Sparkles size={14} color="#f59e0b" />
            <Text className="text-accent-gold text-xs ml-1.5 font-medium">專業交易知識平台</Text>
          </View>

          {/* Title */}
          <Text className="text-text-primary text-3xl font-bold mb-1">
            建立你的
          </Text>
          <Text className="text-accent-gold text-3xl font-bold">
            交易知識體系
          </Text>
        </LinearGradient>

        {/* Technical Analysis Section */}
        <View className="px-4 py-6">
          <SectionHeader 
            title="技術分析課程" 
            titleEn="Technical Analysis Courses" 
            href="/(tabs)/technical"
          />
          {technicalSubCategories.map((course) => (
            <CourseCard key={course.href} {...course} />
          ))}
        </View>

        {/* Options Section */}
        <View className="px-4 py-6 pb-10">
          <SectionHeader 
            title="期權教學課程" 
            titleEn="Options Trading Courses" 
            href="/(tabs)/options"
          />
          {optionsSubCategories.map((course) => (
            <CourseCard key={course.href} {...course} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

