import { MaterialCommunityIcons } from "@expo/vector-icons";
export { default as MainBottomTabNavigator } from "./MainBottomTabNavigator";
export const TAB_SCREENS = {
  HOME: {
    name: "HomeTab",
    icon: "home" as keyof typeof MaterialCommunityIcons.glyphMap,
    keepAlive: false,
  },
  EXPLORE: {
    name: "ExploreTab",
    icon: "compass" as keyof typeof MaterialCommunityIcons.glyphMap,
    keepAlive: true, // ExploreScreen은 상태를 유지
  },
  CHAT: {
    name: "ChatTab",
    icon: "chat" as keyof typeof MaterialCommunityIcons.glyphMap,
    keepAlive: false,
  },
  PROFILE: {
    name: "ProfileTab",
    icon: "account" as keyof typeof MaterialCommunityIcons.glyphMap,
    keepAlive: false,
  },
} as const;
