import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';

interface SectionHeaderProps {
  title: string;
  titleEn: string;
  href: string;
}

export default function SectionHeader({ title, titleEn, href }: SectionHeaderProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(href as any);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.titleEn}>{titleEn}</Text>
      </View>
      <Pressable onPress={handlePress} style={styles.button}>
        <Text style={styles.buttonText}>全部</Text>
        <ChevronRight size={16} color="#f59e0b" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    color: '#f1f5f9',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  titleEn: {
    color: '#64748b',
    fontSize: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#f59e0b',
    fontSize: 14,
    marginRight: 4,
  },
});
