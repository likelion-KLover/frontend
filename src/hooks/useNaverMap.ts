import { useState, useCallback, useEffect } from "react";

interface Location {
  latitude: number;
  longitude: number;
}

export const useNaverMap = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );

  useEffect(() => {
    console.log("useNaverMap hook initialized");
  }, []);

  const handleMarkerSelect = useCallback((lat: number, lng: number) => {
    console.log("Marker selected:", { lat, lng });
    setSelectedLocation({
      latitude: lat,
      longitude: lng,
    });
  }, []);

  return {
    selectedLocation,
    handleMarkerSelect,
  };
};
