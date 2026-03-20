import {Stack} from 'expo-router';

export default function SignUpLayout() {
	return (
		<Stack>
			<Stack.Screen name="[user_id]" options={{headerShown: false}} />
		</Stack>
	);
}
