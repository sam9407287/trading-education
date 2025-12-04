import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
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
    </SafeAreaProvider>
  );
}
