import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNaverMap } from "../../hooks/useNaverMap";
import { NaverMap } from "../../components/NaverMap";

export default function ExploreScreen() {
  const { selectedLocation, handleMarkerSelect } = useNaverMap();
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    console.log("ExploreScreen mounted");
    return () => {
      console.log("ExploreScreen unmounted");
    };
  }, []);

  const handleMapLoad = () => {
    console.log("Map loaded successfully");
    setIsMapReady(true);
  };

  return (
    <View style={styles.container}>
      <NaverMap
        onMarkerSelect={handleMarkerSelect}
        onMapError={(error) => console.error("Map error:", error)}
        onMapLoad={handleMapLoad}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
