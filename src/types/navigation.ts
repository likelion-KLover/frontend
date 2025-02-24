import { MaterialCommunityIcons } from "@expo/vector-icons";

export interface TabScreenConfig {
  name: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  component: React.FC;
  keepAlive: boolean;
}

export type TabScreens = {
  [key: string]: TabScreenConfig;
};
