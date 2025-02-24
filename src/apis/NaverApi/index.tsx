import axios from "axios";

const api = axios.create({
  baseURL: "https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode",
  headers: {
    "X-NCP-APIGW-API-KEY-ID": process.env.EXPO_PUBLIC_NAVER_CLIENT_ID,
    "X-NCP-APIGW-API-KEY": process.env.EXPO_PUBLIC_NAVER_CLIENT_SECRET,
  },
});

export const fetchData = async (endpoint: string) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("API fetch error:", error);
    throw error;
  }
};
