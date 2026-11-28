import {Stack} from 'expo-router';

export default function HomeLayout() {
	return (
		<Stack>
			<Stack.Screen
				name="home"
				options={{
					headerShown: false,
					animation: 'none',
				}}
			/>
			<Stack.Screen
				name="search"
				options={{
					headerShown: false,
					animation: 'flip',
				}}
			/>
			<Stack.Screen
				name="profile"
				options={{
					headerShown: false,
					animation: 'simple_push',
				}}
			/>
			<Stack.Screen
				name="chat"
				options={{
					headerShown: false,
					animation: 'simple_push',
				}}
			/>
			<Stack.Screen
				name="[img_uri]"
				options={{
					headerShown: false,
					animation: 'simple_push',
				}}
			/>
		</Stack>
	);
}
