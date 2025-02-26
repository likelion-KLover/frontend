import { GoogleSignin } from '@react-native-google-signin/google-signin';
import LineLogin from '@xmartlabs/react-native-line';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';
import { useMutation, useQueryClient } from 'react-query';

import * as authApi from '@/src/apis/authApi';
import useAuthStore from '@/src/stores/authStore';

export const useAuthQueries = () => {
  const queryClient = useQueryClient();
  const { user, setUser, setError } = useAuthStore();
  const router = useRouter();

  // 이메일과 비밀번호를 사용하여 로그인하는 Mutation
  const LoginMutation = useMutation(
    (credentials: { email: string; password: string }) => authApi.login(credentials.email, credentials.password),
    {
      onSuccess: (data: { accessToken: string; refreshToken: string; memberDto: User }) => {
        setUser(data.memberDto);
        SecureStore.setItem('user', JSON.stringify(data.memberDto));
        SecureStore.setItem('accessToken', data.accessToken);
        SecureStore.setItem('refreshToken', data.refreshToken);

        Alert.alert('서버 로그인 성공', '와 해냈다');
        //router.replace('/(tabs)/home');
      },
      onError: (error: any) => {
        setError(error.response?.data?.message || 'Login Failed!');
        Alert.alert('Login Failed!', error.response?.data?.message || 'Login Failed!');
      },
    },
  );

  // 구글 로그인하는 Mutation
  const GoogleLoginMutation = useMutation(() => authApi.googleLogin(), {
    onSuccess: (data: { accessToken: string; refreshToken: string; memberDto: User }) => {
      setUser(data.memberDto);
      SecureStore.setItem('user', JSON.stringify(data.memberDto));
      SecureStore.setItem('accessToken', data.accessToken);
      SecureStore.setItem('refreshToken', data.refreshToken);

      Alert.alert('구글 로그인 성공', '와 해냈다');
      //router.replace('/(tabs)/home');
    },
    onError: (error: any) => {
      setError(error.response?.data?.message || error.message || 'Google Login Failed!');
      Alert.alert('Google Login Failed!', error.response?.data?.message || error.message || 'Google Login Failed!');
    },
  });

  // 라인 로그인하는 Mutation
  const LineLoginMutation = useMutation(() => authApi.lineLogin(), {
    onSuccess: (data: { accessToken: string; refreshToken: string; memberDto: User }) => {
      setUser(data.memberDto);
      SecureStore.setItem('user', JSON.stringify(data.memberDto));
      SecureStore.setItem('accessToken', data.accessToken);
      SecureStore.setItem('refreshToken', data.refreshToken);

      Alert.alert('라인 로그인 성공', '와 해냈다');
      //router.replace('/(tabs)/home');
    },
    onError: (error: any) => {
      setError(error.response?.data?.message || error.message || 'Line Login Failed!');
      Alert.alert('Line Login Failed!', error.response?.data?.message || error.message || 'Line Login Failed!');
    },
  });

  // 로그아웃하는 Mutation
  const LogoutMutation = useMutation(() => authApi.logout(), {
    onError: (error: any) => {
      setError(error.response?.data?.message || error.message || 'Something wrong in Logout');
      console.log(error);
    },

    onSettled: async () => {
      SecureStore.deleteItemAsync('user');
      SecureStore.deleteItemAsync('accessToken');
      SecureStore.deleteItemAsync('refreshToken');
      queryClient.clear();

      if (user?.provider === 'google') {
        GoogleSignin.signOut();
      }

      if (user?.provider === 'line') {
        LineLogin.logout();
        SecureStore.deleteItemAsync('providerAccessToken');
      }
      setUser(null);
    },
  });

  // 이메일과 비밀번호를 사용하여 회원가입하는 Mutation
  const SignupMutation = useMutation(
    (credentials: { email: string; password: string; nickname: string }) =>
      authApi.signup(credentials.email, credentials.password, credentials.nickname),
    {
      onSuccess: () => {
        Alert.alert('Success', 'Registration successful! Please login.');
        router.replace('/(auth)/signin');
      },
      onError: (error: any) => {
        setError(error);
        Alert.alert('Signup Failed!', error.response?.data?.message || error.message || 'Signup Failed!');
        console.log('Signup Failed!', error);
      },
    },
  );

  const RefreshAccessTokenMutation = useMutation(() => authApi.refreshAccessToken(), {
    onSuccess: (accessToken: string) => {
      SecureStore.setItem('accessToken', accessToken);
    },
    onError: (error: any) => {
      setError(error);
      console.log('Refresh Failed!', error);
    },
  });

  const DeleteAccountMutation = useMutation(() => authApi.deleteAccount(), {
    onSuccess: async () => {
      SecureStore.deleteItemAsync('user');
      SecureStore.deleteItemAsync('accessToken');
      SecureStore.deleteItemAsync('refreshToken');
      queryClient.clear();

      if (user?.provider === 'google') {
        await GoogleSignin.revokeAccess();
      }

      if (user?.provider === 'line') {
        //라인 로그인 시에는 line이 준 AccessToken을 따로 보관함
        const providerAccessToken = await SecureStore.getItem('providerAccessToken');

        const revokeUrl = 'https://api.line.me/oauth2/v2.1/revoke';
        const revokeParams = new URLSearchParams();

        revokeParams.append('client_id', process.env.EXPO_PUBLIC_LINE_CLIENTID ?? 'error');
        revokeParams.append('access_token', providerAccessToken ?? 'error');

        await fetch(revokeUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: revokeParams.toString(),
        });

        SecureStore.deleteItemAsync('providerAccessToken');
      }

      setUser(null);
    },
    onError: (error: any) => {
      Alert.alert('Account deletion failed!', error.response?.data?.message || error.message || 'Signup Failed!');
      setError(error);
      console.log('Account deletion Error', error);
    },
  });
  return {
    LoginMutation,
    GoogleLoginMutation,
    LineLoginMutation,
    LogoutMutation,
    SignupMutation,
    RefreshAccessTokenMutation,
    DeleteAccountMutation,
  };
};
