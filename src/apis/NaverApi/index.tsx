import axios from "axios";

const api = axios.create({
  baseURL: "https://naveropenapi.apigw.ntruss.com/map-geocode/v2",
  headers: {
    "X-NCP-APIGW-API-KEY-ID": process.env.EXPO_PUBLIC_NAVER_CLIENT_ID,
    "X-NCP-APIGW-API-KEY": process.env.EXPO_PUBLIC_NAVER_CLIENT_SECRET,
    "Content-Type": "application/json", // Content-Type 헤더 추가
  },
});

export const fetchData = async (endpoint: string) => {
  try {
    // API 요청 정보 로깅
    console.log("API Request:", {
      url: api.defaults.baseURL + endpoint,
      headers: api.defaults.headers,
    });

    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // 에러 상세 정보 로깅
      console.error("API Error Details:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        config: error.config, // 실제 요청 설정 확인
      });
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};
