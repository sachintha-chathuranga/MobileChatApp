import './global.css';

import {AuthProvider, useAuth} from '@/context/authContext';
import {ThemeProvider} from '@/context/themeContext';
import {Stack} from 'expo-router';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function RootLayout() {
	return (
		<AuthProvider>
			<ThemeProvider>
				<SafeAreaProvider>
					<GestureHandlerRootView style={{flex: 1}}>
						<RootNavigator />
					</GestureHandlerRootView>
				</SafeAreaProvider>
			</ThemeProvider>
		</AuthProvider>
	);
}

// Create a new component that can access the SessionProvider context later.
function RootNavigator() {
	const {user} = useAuth();

	return (
		<Stack>
			<Stack.Protected guard={!user}>
				<Stack.Screen name="index" options={{headerShown: false, animation: 'none'}} />
				<Stack.Screen name="sign" options={{headerShown: false}} />
				<Stack.Screen name="verify" options={{headerShown: false}} />
				<Stack.Screen name="signup" options={{headerShown: false}} />
			</Stack.Protected>
			<Stack.Protected guard={!!user}>
				<Stack.Screen name="(private)" options={{headerShown: false, animation: 'none'}} />
			</Stack.Protected>
		</Stack>
	);
}
