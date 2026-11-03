import {Stack} from 'expo-router';
import {useColorScheme} from 'nativewind';

export default function HomeLayout() {
	const {colorScheme} = useColorScheme();
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
		</Stack>
	);
}
