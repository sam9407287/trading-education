import { Tabs } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { TrendingUp, BarChart3, BookOpen } from 'lucide-react-native';

function TabIcon({ focused, icon: Icon, label }: { focused: boolean; icon: any; label: string }) {
  return (
    <View style={styles.tabIconContainer}>
      <Icon 
        size={24} 
        color={focused ? '#f59e0b' : '#64748b'} 
      />
      <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>
        {label}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        headerStyle: styles.header,
        headerTintColor: '#f1f5f9',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={TrendingUp} label="首頁" />
          ),
        }}
      />
      <Tabs.Screen
        name="technical"
        options={{
          headerTitle: '技術分析',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={BarChart3} label="技術分析" />
          ),
        }}
      />
      <Tabs.Screen
        name="options"
        options={{
          headerTitle: '期權教學',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={BookOpen} label="期權" />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#0a0e17',
    borderTopColor: '#1e293b',
    borderTopWidth: 1,
    height: 70,
    paddingBottom: 8,
  },
  header: {
    backgroundColor: '#0a0e17',
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 4,
    color: '#64748b',
  },
  tabLabelFocused: {
    color: '#f59e0b',
  },
});
