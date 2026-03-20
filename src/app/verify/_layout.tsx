import {Stack} from 'expo-router';

export default function VerifyPhoneLayout() {
	return (
		<Stack>
			<Stack.Screen name="[phone]" options={{headerShown: false}} />
		</Stack>
	);
}
