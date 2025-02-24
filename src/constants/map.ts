// 지도 초기 설정 및 상수값 정의
export const MAP_CONFIG = {
  INITIAL_CENTER: {
    latitude: 37.5666805, // 서울시청 위도
    longitude: 126.9784147, // 서울시청 경도
  },
  INITIAL_ZOOM: 15, // 줌 레벨 (1: 세계 ~ 21: 건물)
  SEOUL_BOUNDS: {
    // 서울시 경계 영역
    SW: { latitude: 37.4269, longitude: 126.7644 },
    NE: { latitude: 37.701, longitude: 127.1839 },
  },
};
