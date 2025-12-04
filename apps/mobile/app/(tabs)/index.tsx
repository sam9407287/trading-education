import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Sparkles, TrendingUp } from 'lucide-react-native';
import { technicalSubCategories, optionsSubCategories } from '@trading-edu/shared';
import CourseCard from '@/components/ui/CourseCard';
import SectionHeader from '@/components/ui/SectionHeader';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <LinearGradient
          colors={['rgba(245, 158, 11, 0.15)', 'transparent']}
          style={styles.heroSection}
        >
          {/* Logo */}
          <View style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              <TrendingUp size={24} color="#0a0e17" />
            </View>
            <View>
              <Text style={styles.logoTitle}>交易教育平台</Text>
              <Text style={styles.logoSubtitle}>Trading Education</Text>
            </View>
          </View>

          {/* Badge */}
          <View style={styles.badge}>
            <Sparkles size={14} color="#f59e0b" />
            <Text style={styles.badgeText}>專業交易知識平台</Text>
          </View>

          {/* Title */}
          <Text style={styles.heroTitle}>建立你的</Text>
          <Text style={styles.heroTitleAccent}>交易知識體系</Text>
        </LinearGradient>

        {/* Technical Analysis Section */}
        <View style={styles.section}>
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
        <View style={[styles.section, styles.sectionLast]}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0e17',
  },
  scrollView: {
    flex: 1,
  },
  heroSection: {
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 40,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  logoIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#f59e0b',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  logoTitle: {
    color: '#f59e0b',
    fontWeight: 'bold',
    fontSize: 18,
  },
  logoSubtitle: {
    color: '#64748b',
    fontSize: 12,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.2)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  badgeText: {
    color: '#f59e0b',
    fontSize: 12,
    marginLeft: 6,
    fontWeight: '500',
  },
  heroTitle: {
    color: '#f1f5f9',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  heroTitleAccent: {
    color: '#f59e0b',
    fontSize: 30,
    fontWeight: 'bold',
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  sectionLast: {
    paddingBottom: 40,
  },
});
