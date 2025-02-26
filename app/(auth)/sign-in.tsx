import React, { useState } from 'react';
import { TextInput, View } from 'react-native';

// eslint-disable-next-line import/no-unresolved

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const {
  //   LoginMutation,
  //   LineLoginMutation,
  //   GoogleLoginMutation,
  //   LogoutMutation,
  //   DeleteAccountMutation,
  //   RefreshAccessTokenMutation,
  // } = useAuthQueries();

  return (
    <View>
      <TextInput placeholder="Enter your email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Enter your password" value={password} secureTextEntry onChangeText={setPassword} />
    </View>
  );
};

export default SignIn;

{
  /* <Button title="서버 로그인" onPress={() => LoginMutation.mutate({ email, password })}></Button>
      <Button title="라인 로그인" onPress={() => LineLoginMutation.mutate()}></Button>
      <Button title="구구루 로그인" onPress={() => GoogleLoginMutation.mutate()}></Button>
      <Button title="로그아웃" onPress={() => LogoutMutation.mutate()}></Button>
      <Button title="탈퇴" onPress={() => DeleteAccountMutation.mutate()}></Button>
      <Button title="일단 리프레시" onPress={() => RefreshAccessTokenMutation.mutate()}></Button> */
}
