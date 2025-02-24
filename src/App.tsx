import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainBottomTabNavigator from "./navigations/MainBottomTabNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  // 환경변수 확인을 위한 useEffect
  useEffect(() => {
    console.warn("Environment Check:", {
      NAVER_CLIENT_ID: process.env.EXPO_PUBLIC_NAVER_CLIENT_ID,
      // 다른 환경변수들도 필요하다면 여기에 추가
    });
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <MainBottomTabNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
