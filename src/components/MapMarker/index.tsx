import React from "react";
import { View, StyleSheet } from "react-native";
import { IconifyIcon } from "../shared/IconifyIcon";

//지도 위 마커 표시
interface MapMarkerProps {
  latitude: number;
  longitude: number;
}

export const MapMarker = ({ latitude, longitude }: MapMarkerProps) => {
  return (
    <View style={styles.marker}>
      <IconifyIcon name="map-marker" size={32} color="#FF0000" />
    </View>
  );
};

const styles = StyleSheet.create({
  marker: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});
