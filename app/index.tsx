import {useSession} from '@/utils/authContext';
import {Text, View} from 'react-native';

export default function LogginScreen() {
	const {signIn} = useSession();
	return (
		<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
			<Text>Loggin Screen</Text>
			<Text
				onPress={() => {
					signIn();
					// Navigate after signing in. You may want to tweak this to ensure sign-in is successful before navigating.
				}}
			>
				Sign In
			</Text>
		</View>
	);
}
