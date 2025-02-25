import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TextInput, Button } from 'react-native';
import { useAuthQueries } from '@/src/hooks/react-query/useAuthQueries';
import { QueryClientProvider, QueryClient } from 'react-query';
import EncryptedStorage from 'react-native-encrypted-storage';

const queryClient = new QueryClient();
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

  return (
    <QueryClientProvider client={queryClient}>
      <LoginScreeen></LoginScreeen>
    </QueryClientProvider>
  );
}

function SignupScreen() {
  const { SignupMutation } = useAuthQueries();

  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View>
      <Text>signup</Text>
      <TextInput placeholder="Enter your nickname" value={nickname} onChangeText={setNickname} />
      <TextInput placeholder="Enter your email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Enter your password" value={password} secureTextEntry onChangeText={setPassword} />
      <Button title="가입하기" onPress={() => SignupMutation.mutate({ email, password, nickname })}></Button>
    </View>
  );
}

function LoginScreeen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {
    LoginMutation,
    LineLoginMutation,
    GoogleLoginMutation,
    LogoutMutation,
    DeleteAccountMutation,
    RefreshAccessTokenMutation,
  } = useAuthQueries();

  return (
    <View>
      <TextInput placeholder="Enter your email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Enter your password" value={password} secureTextEntry onChangeText={setPassword} />
      <Button title="서버 로그인" onPress={() => LoginMutation.mutate({ email, password })}></Button>
      <Button title="라인 로그인" onPress={() => LineLoginMutation.mutate()}></Button>
      <Button title="구구루 로그인" onPress={() => GoogleLoginMutation.mutate()}></Button>
      <Button title="로그아웃" onPress={() => LogoutMutation.mutate()}></Button>
      <Button title="탈퇴" onPress={() => DeleteAccountMutation.mutate()}></Button>
      <Button title="일단 리프레시" onPress={() => RefreshAccessTokenMutation.mutate()}></Button>
    </View>
  );
}
