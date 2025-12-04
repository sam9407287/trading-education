import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';

interface SectionHeaderProps {
  title: string;
  titleEn: string;
  href?: string;
}

export default function SectionHeader({ title, titleEn, href }: SectionHeaderProps) {
  const router = useRouter();

  return (
    <View className="flex-row items-center justify-between mb-4">
      <View>
        <Text className="text-text-primary font-bold text-xl">
          {title}
        </Text>
        <Text className="text-text-muted text-xs mt-0.5">
          {titleEn}
        </Text>
      </View>
      {href && (
        <Pressable 
          onPress={() => router.push(href as any)}
          className="flex-row items-center"
        >
          <Text className="text-accent-gold text-sm mr-1">全部</Text>
          <ChevronRight size={16} color="#f59e0b" />
        </Pressable>
      )}
    </View>
  );
}

