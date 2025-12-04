import { Tabs } from 'expo-router';
import { View, Text } from 'react-native';
import { TrendingUp, BarChart3, BookOpen } from 'lucide-react-native';

function TabIcon({ focused, icon: Icon, label }: { focused: boolean; icon: any; label: string }) {
  return (
    <View className="items-center justify-center pt-2">
      <Icon 
        size={24} 
        color={focused ? '#f59e0b' : '#64748b'} 
      />
      <Text 
        className={`text-xs mt-1 ${focused ? 'text-accent-gold' : 'text-text-muted'}`}
      >
        {label}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#0a0e17',
          borderTopColor: '#1e293b',
          height: 70,
          paddingBottom: 8,
        },
        tabBarShowLabel: false,
        headerStyle: {
          backgroundColor: '#0a0e17',
        },
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

