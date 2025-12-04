import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { optionsSubCategories } from '@trading-edu/shared';
import CourseCard from '@/components/ui/CourseCard';

export default function OptionsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-bg-primary" edges={['bottom']}>
      <ScrollView className="flex-1 px-4 pt-4" showsVerticalScrollIndicator={false}>
        {optionsSubCategories.map((course) => (
          <CourseCard key={course.href} {...course} />
        ))}
        <View className="h-6" />
      </ScrollView>
    </SafeAreaView>
  );
}

