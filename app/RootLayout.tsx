import {SessionProvider} from '@/utils/authContext';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function RootLayout() {
	// Set up the auth context and render your layout inside of it.
	return (
		<SessionProvider>
			<SafeAreaProvider<RootNavigator> />
		</SessionProvider>
	);
}
