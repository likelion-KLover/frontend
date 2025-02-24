import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TAB_SCREENS } from "../constants/navigation";
import type { TabScreenConfig } from "../types/navigation";

const Tab = createBottomTabNavigator();

export default function MainBottomTabNavigator() {
  const renderTabScreen = (screen: TabScreenConfig) => (
    <Tab.Screen
      key={screen.name}
      name={screen.name}
      component={screen.component}
      options={{
        freezeOnBlur: screen.keepAlive,
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name={screen.icon}
            size={size}
            color={color}
          />
        ),
      }}
    />
  );

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "rgba(255, 255, 255, 0.6)",
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        lazy: true,
      }}
    >
      {Object.values(TAB_SCREENS).map(renderTabScreen)}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 55,
    left: 16,
    right: 16,
    height: 56,
    backgroundColor: "#5843BE",
    borderRadius: 16,
    elevation: 0,
    borderTopWidth: 0,
    paddingHorizontal: 24,
    zIndex: 1000,
  },
});
