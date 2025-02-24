import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function AuthLayout() {
	return (
		<View>
			<Stack screenOptions={{ headerTintColor: 'white' }} />
		</View>
	);
}
