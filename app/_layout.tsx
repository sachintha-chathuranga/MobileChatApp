import './global.css';

import {SessionProvider, useSession} from '@/utils/authContext';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import {Stack} from 'expo-router';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function RootLayout() {
	// Set up the auth context and render your layout inside of it.
	  const colorScheme = useColorScheme();
	return (
		<SessionProvider>
			<SafeAreaProvider>
				

				<GestureHandlerRootView style={{flex: 1}}>
					<RootNavigator />
				</GestureHandlerRootView>
				
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
