import { useSession } from '@/context/authContext';
import {Text, View} from 'react-native';


export default function Index() {
	const {signOut} = useSession();
	return (
		<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
			<View className="flex-1 items-center justify-center bg-white">
				<Text className="text-xl font-bold text-dark-200">Welcome to Nativewind!</Text>
			</View>
			<Text
				onPress={() => {
					// The guard in `RootNavigator` redirects back to the sign-in screen.
					signOut();
				}}
			>
				Sign Out
			</Text>
		</View>
	);
}
