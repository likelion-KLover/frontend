import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface IconifyIconProps {
  name: keyof typeof MaterialCommunityIcons.glyphMap;
  size?: number;
  color?: string;
}

export const IconifyIcon = ({
  name,
  size = 24,
  color = "currentColor",
}: IconifyIconProps) => {
  return <MaterialCommunityIcons name={name} size={size} color={color} />;
};
