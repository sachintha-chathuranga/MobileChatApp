import './global.css';

import {SessionProvider, useSession} from '@/utils/authContext';
import {Stack} from 'expo-router';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function RootLayout() {
	// Set up the auth context and render your layout inside of it.
	return (
		<SessionProvider>
			<SafeAreaProvider>
				<RootNavigator />
			</SafeAreaProvider>
		</SessionProvider>
	);
}

// Create a new component that can access the SessionProvider context later.
function RootNavigator() {
	const {session} = useSession();

	return (
		<Stack>
			<Stack.Protected guard={!session}>
				<Stack.Screen name="index" options={{headerShown: false, animation: 'none'}} />
			</Stack.Protected>
			<Stack.Protected guard={!!session}>
				<Stack.Screen name="(private)" options={{headerShown: false, animation: 'none'}} />
			</Stack.Protected>
		</Stack>
	);
}
