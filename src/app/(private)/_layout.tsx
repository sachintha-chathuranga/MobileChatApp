import {Stack} from 'expo-router';

export default function HomeLayout() {
	return (
		<Stack>
			<Stack.Screen
				name="home"
				options={{
					headerShown: false,
				}}
			/>

			<Stack.Screen
				name="search"
				options={{
					headerShown: false,
					animation: 'fade',
				}}
			/>
			<Stack.Screen
				name="profile"
				options={{
					headerShown: false,
				}}
			/>

			<Stack.Screen name="chat" options={{headerShown: false, animation: 'none'}} />
		</Stack>
	);
}
