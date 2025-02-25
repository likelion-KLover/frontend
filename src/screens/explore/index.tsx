import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNaverMap } from "../../hooks/useNaverMap";
import { NaverMap } from "../../components/NaverMap";
import { MAP_CONFIG } from "../../constants/map";
import { fetchData } from "../../apis/NaverApi";

export default function ExploreScreen() {
  const { selectedLocation, handleMarkerSelect } = useNaverMap();
  const [isMapReady, setIsMapReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

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

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <NaverMap
        initialCenter={MAP_CONFIG.INITIAL_CENTER}
        onMarkerSelect={handleMarkerSelect}
        onMapError={(error: string) => console.error("Map error:", error)}
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
