import { TabScreens } from "../types/navigation";
import ExploreScreen from "../screens/explore";
import HomeScreen from "../screens/home";
import ChatScreen from "../screens/chat";
import ProfileScreen from "../screens/profile";

export const TAB_SCREENS: TabScreens = {
  HOME: {
    name: "HomeTab",
    icon: "home",
    component: HomeScreen,
    keepAlive: false,
  },
  EXPLORE: {
    name: "ExploreTab",
    icon: "compass",
    component: ExploreScreen,
    keepAlive: true,
  },
  CHAT: {
    name: "ChatTab",
    icon: "chat",
    component: ChatScreen,
    keepAlive: false,
  },
  PROFILE: {
    name: "ProfileTab",
    icon: "account",
    component: ProfileScreen,
    keepAlive: false,
  },
} as const;
