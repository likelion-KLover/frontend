import axios, { AxiosInstance } from 'axios';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import LineLogin, { BotPrompt, LoginPermission } from '@xmartlabs/react-native-line';
import * as WebBrowser from 'expo-web-browser';
import EncryptedStorage from 'react-native-encrypted-storage';

const apiBaseUrl = `http://${process.env.EXPO_PUBLIC_BACKEND_SERVER_IP}:8080`;

const authApi: AxiosInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (email: string, password: string) => {
  const response = await authApi.post('/api/v1/auth/login', {
    email,
    password,
  });
  const body = response.data;
  if (body.returnCode !== '0000') throw Error(body.returnMessage);
  return body.data;
};

export const googleLogin = async () => {
  GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENTID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENTID,
  });

  const result = await GoogleSignin.signIn();

  if (result.type === 'cancelled') {
    throw Error('구글 로그인 실패');
  }

  const idToken = result.data?.idToken;

  const response = await authApi.post('/api/v1/auth/google', { idToken });

  const body = response.data;

  if (body.returnCode !== '0000') throw Error(body.returnMessage);

  return body.data;
};

export const lineLogin = async () => {
  WebBrowser.maybeCompleteAuthSession();
  LineLogin.setup({ channelId: process.env.EXPO_PUBLIC_LINE_CLIENTID ?? 'error' });

  const result = await LineLogin.login({
    scopes: [LoginPermission.Email, LoginPermission.OpenId, LoginPermission.Profile],
    botPrompt: BotPrompt.Normal,
    //onlyWebLogin: true,
  });

  if (!result) throw Error('라인 로그인 실패');

  const idToken = result.accessToken?.idToken;
  EncryptedStorage.setItem('providerAccessToken', result.accessToken?.accessToken);

  const response = await authApi.post('/api/v1/auth/line', { idToken });

  const body = response.data;
  if (body.returnCode !== '0000') throw Error(body.returnMessage);
  return body.data;
};

export const logout = async () => {
  const refreshToken = await EncryptedStorage.getItem('refreshToken');
  const accessToken = await EncryptedStorage.getItem('accessToken');

  const response = await authApi.post(
    '/api/v1/auth/logout',
    { refreshToken },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  const body = response.data;
  if (body.returnCode !== '0000') throw Error(body.returnMessage);
};

export const signup = async (email: string, password: string, nickname: string) => {
  const response = await authApi.post('/api/v1/auth/signup', {
    email,
    password,
    nickname,
  });

  const body = response.data;
  if (body.returnCode !== '0000') throw Error(body.returnMessage);
};

export const refreshAccessToken = async () => {
  const refreshToken = await EncryptedStorage.getItem('refreshToken');

  const response = await authApi.post('/api/v1/auth/refresh', { refreshToken });
  const body = response.data;
  if (body.returnCode !== '0000') throw Error(body.returnMessage);
  return body.data;
};

export const deleteAccount = async () => {
  const accessToken = await EncryptedStorage.getItem('accessToken');

  const response = await authApi.delete('/api/v1/members', { headers: { Authorization: `Bearer ${accessToken}` } });

  const body = response.data;
  if (body.returnCode !== '0000') throw Error(body.returnMessage);
};

// 다른 인증 관련 API 함수 추가 (refreshToken, verifyEmail 등)
