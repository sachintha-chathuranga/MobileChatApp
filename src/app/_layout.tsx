import './global.css';

import {AuthProvider, useAuth} from '@/src/context/authContext';
import {ThemeProvider} from '@/src/context/themeContext';
import {Stack} from 'expo-router';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {SocketProvider} from '../context/socketContext';
import SplashScreenController from './splash';

export default function RootLayout() {
	return (
		<AuthProvider>
			<SocketProvider>
				<ThemeProvider>
					<SafeAreaProvider>
						<GestureHandlerRootView style={{flex: 1}}>
							<SplashScreenController />
							<RootNavigator />
						</GestureHandlerRootView>
					</SafeAreaProvider>
				</ThemeProvider>
			</SocketProvider>
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
