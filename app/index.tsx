import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // const unsubscribe = onAuthStateChanged(
    //   (auth,
    //   (user) => {
    //     if (user) {
    //       // 사용자가 로그인한 경우
    //       router.replace("/(root)/home");
    //     } else {
    //       // 사용자가 로그인하지 않은 경우
    //       router.replace("/(auth)/signin");
    //     }
    //   }),
    // );
    // return () => unsubscribe();
  }, []);
  return null;
}
