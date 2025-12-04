import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import '../global.css';

export default function RootLayout() {
  return (
    <View className="flex-1 bg-bg-primary">
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0a0e17',
          },
          headerTintColor: '#f1f5f9',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          contentStyle: {
            backgroundColor: '#0a0e17',
          },
        }}
      >
        <Stack.Screen 
          name="(tabs)" 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="technical/[slug]" 
          options={{ 
            headerTitle: '技術分析',
            headerBackTitle: '返回',
          }} 
        />
        <Stack.Screen 
          name="options/[slug]" 
          options={{ 
            headerTitle: '期權教學',
            headerBackTitle: '返回',
          }} 
        />
      </Stack>
    </View>
  );
}

