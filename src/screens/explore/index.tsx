import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNaverMap } from "../../hooks/useNaverMap";
import { NaverMap } from "../../components/NaverMap";
import { MAP_CONFIG } from "../../constants/map";
import { fetchData } from "../../apis/NaverApi"; // 네이버 API 호출 함수 import

export default function ExploreScreen() {
  const { selectedLocation, handleMarkerSelect } = useNaverMap();
  const [isMapReady, setIsMapReady] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("ExploreScreen mounted");

    const fetchDataFromApi = async () => {
      try {
        const response = await fetchData("/geocode?query=서울");
        setData(response);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDataFromApi();

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
        onMapError={(error) => console.error("Map error:", error)}
        onMapLoad={handleMapLoad}
      />
      <StatusBar style="auto" />
      {data && (
        <View>
          <Text>API Data:</Text>
          <Text>{JSON.stringify(data, null, 2)}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
