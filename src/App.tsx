import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainBottomTabNavigator from "./navigations/MainBottomTabNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <MainBottomTabNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
