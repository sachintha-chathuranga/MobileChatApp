import './global.css';

import {AuthProvider, useAuth} from '@/src/context/authContext';
import {CustomThemeProvider} from '@/src/context/themeContext';
import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {Stack} from 'expo-router';
import {useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Loading from '../components/Loading';
import {SocketProvider} from '../context/socketContext';
import SplashScreenController from './splash';

export default function RootLayout() {
	const colorScheme = useColorScheme();
	return (
		<AuthProvider>
			<SocketProvider>
				<CustomThemeProvider>
					<SafeAreaProvider>
						<SplashScreenController />
						<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
							<RootNavigator />
						</ThemeProvider>
					</SafeAreaProvider>
				</CustomThemeProvider>
			</SocketProvider>
		</AuthProvider>
	);
}

// Create a new component that can access the SessionProvider context later.
function RootNavigator() {
	const {user, loadingUser} = useAuth();

	if (loadingUser) {
		return <Loading />;
	}

	return (
		<Stack>
			<Stack.Protected guard={!user}>
				<Stack.Screen name="index" options={{headerShown: false, animation: 'none'}} />
				<Stack.Screen name="sign" options={{headerShown: false, animation: 'fade'}} />
				<Stack.Screen name="verify" options={{headerShown: false, animation: 'fade'}} />
				<Stack.Screen name="signup" options={{headerShown: false, animation: 'fade'}} />
			</Stack.Protected>
			<Stack.Protected guard={!!user}>
				<Stack.Screen name="(private)" options={{headerShown: false, animation: 'none'}} />
			</Stack.Protected>
		</Stack>
	);
}
