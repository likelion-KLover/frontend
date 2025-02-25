// 지도 관련 타입 정의
export interface MapMessage {
  type: "mapInit" | "error" | "markerSelect";
  status?: "success" | "error";
  message?: string;
  lat?: number;
  lng?: number;
}

export interface NaverMapProps {
  style?: any;
  initialCenter?: {
    latitude: number;
    longitude: number;
  };
  onMarkerSelect?: (lat: number, lng: number) => void;
  onMapError?: (error: string) => void;
  onMapLoad?: () => void;
}
