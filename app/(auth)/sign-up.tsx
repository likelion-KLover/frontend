// eslint-disable-next-line import/order
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import InputField from '@/components/shared/InputField';
import { icons } from '@/src/constants';

const SignUp = () => {
  // const { SignupMutation } = useAuthQueries();

  const [form, setForm] = useState({
    email: '',
    password: '',
    nickname: '',
  });

  // const onSignupPress = () => {
  //   try {
  //   } catch (error: any) {
  //     console.log(JSON.stringify(error, null, 2));
  //     Alert.alert('Error', error.erros[0].longMessage);
  //   }
  // };

  // const onVerifyPress = async () => {
  //   try {
  //   } catch (error) {}
  // };

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="flex-1 bg-background">
        <InputField
          label="Email"
          placeholder="Enter your email"
          icon={icons.email}
          textContentType="emailAddress"
          value={form.email}
          onChangeText={(value: string) => setForm({ ...form, email: value })}
        />
      </View>
      <Text>signup</Text>
    </ScrollView>
  );
};

export default SignUp;

{
  /* <TextInput placeholder="Enter your nickname" value={nickname} onChangeText={setNickname} />
      <TextInput placeholder="Enter your email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Enter your password" value={password} secureTextEntry onChangeText={setPassword} />
      <Button title="가입하기" onPress={() => SignupMutation.mutate({ email, password, nickname })}></Button> */
}
