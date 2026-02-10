import './global.css';

import {SessionProvider, useSession} from '@/context/authContext';
import {Stack} from 'expo-router';
import SplashScreenController from './splash';

export default function Root() {
	// Set up the auth context and render your layout inside of it.
	return (
		<SessionProvider>
			<SplashScreenController />
			<RootNavigator />
		</SessionProvider>
	);
}

// Create a new component that can access the SessionProvider context later.
function RootNavigator() {
	const {session} = useSession();

	return (
		<Stack>
			<Stack.Protected guard={!!session}>
				<Stack.Screen name="(app)" />
			</Stack.Protected>

			<Stack.Protected guard={!session}>
				<Stack.Screen name="sign-in" />
			</Stack.Protected>
		</Stack>
	);
}
