import axios, { AxiosInstance } from "axios";

const apiBaseUrl = "";

const authApi: AxiosInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (email: string, password: string) => {
  const response = await authApi.post("/api/v1/auth/login", {
    email,
    password,
  });
  return response.data;
};

export const googleLogin = async (accessToken: string) => {
  const response = await authApi.post("/api/v1/auth/google", { accessToken });
  return response.data;
};

export const lineLogin = async (accessToken: string) => {
  const response = await authApi.post("/api/v1/auth/line", { accessToken });
  return response.data;
};

export const logout = async () => {
  const response = await authApi.post("/api/v1/auth/logout");
  return response.data;
};

export const signup = async (email: string, password: string) => {
  const response = await authApi.post("/api/v1/auth/signup", {
    email,
    password,
  });
  return response.data;
};

// 다른 인증 관련 API 함수 추가 (refreshToken, verifyEmail 등)
