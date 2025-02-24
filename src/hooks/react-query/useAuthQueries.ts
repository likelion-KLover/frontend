import useAuthStore from "@/src/stores/authStore";
import * as authApi from "@/src/apis/authApi";
import { useRouter } from "expo-router";
import { useMutation, useQueryClient } from "react-query";
import { User } from "@/src/types";
import EncryptedStorage from "react-native-encrypted-storage";
import { Alert } from "react-native";

export const useAuthQueries = () => {
  const queryClient = useQueryClient();
  const { setUser, setError } = useAuthStore();
  const router = useRouter();

  // 이메일과 비밀번호를 사용하여 로그인하는 Mutation
  const loginMutation = useMutation(
    (credentials: { email: string; password: string }) =>
      authApi.login(credentials.email, credentials.password),
    {
      onSuccess: (data: { message: string; user: User }) => {
        setUser(data.user);
        EncryptedStorage.setItem("user", JSON.stringify(data.user));
        router.replace("/(tabs)/home");
      },
      onError: (error: any) => {
        setError(error.response?.data?.message || "Login Failed!");
        Alert.alert(
          "Login Failed!",
          error.response?.data?.message || "Login Failed!",
        );
      },
    },
  );

  // 구글 로그인하는 Mutation
  const googleLoginMutation = useMutation(
    (accessToken: string) => authApi.googleLogin(accessToken),
    {
      onSuccess: (data: { message: string; user: User }) => {
        setUser(data.user);
        EncryptedStorage.setItem("user", JSON.stringify(data.user));
        router.replace("/(tabs)/home");
      },
      onError: (error: any) => {
        setError(error.response?.data?.message || "Google Login Failed!");
        Alert.alert(
          "Google Login Failed!",
          error.response?.data?.message || "Google Login Failed!",
        );
      },
    },
  );

  // 라인 로그인하는 Mutation
  const lineLoginMutation = useMutation(
    (accessToken: string) => authApi.lineLogin(accessToken),
    {
      onSuccess: (data: { message: string; user: User }) => {
        setUser(data.user);
        EncryptedStorage.setItem("user", JSON.stringify(data.user));
        router.replace("/(tabs)/home");
      },
      onError: (error: any) => {
        setError(error.response?.data?.message || "Line Login Failed!");
        Alert.alert(
          "Line Login Failed!",
          error.response?.data?.message || "Line Login Failed!",
        );
      },
    },
  );

  // 로그아웃하는 Mutation
  const logoutMutation = useMutation(() => authApi.logout(), {
    onSuccess: () => {
      queryClient.clear();
      EncryptedStorage.removeItem("user");
      router.replace("/(auth)/signin");
    },
    onError: (error: any) => {
      setError(error.response?.data?.message || "Logout Failed!");
      Alert.alert(
        "Logout Failed!",
        error.response?.data?.message || "Logout Failed!",
      );
    },
  });

  // 이메일과 비밀번호를 사용하여 회원가입하는 Mutation
  const signupMutation = useMutation(
    (credentials: { email: string; password: string }) =>
      authApi.signup(credentials.email, credentials.password),
    {
      onSuccess: (data: { message: string; user: User }) => {
        Alert.alert("Success", "Registration successful! Please login.");
        router.replace("/(auth)/signin");
      },
      onError: (error: any) => {
        Alert.alert(
          "Signup Failed!",
          error.response?.data?.message || "Signup Failed!",
        );
        console.log("Signup Failed!", error);
      },
    },
  );
  return {
    loginMutation,
    googleLoginMutation,
    lineLoginMutation,
    logoutMutation,
    signupMutation,
  };
};
