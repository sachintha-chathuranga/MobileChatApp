import AnimatedChatLogo from '@/src/components/AnimatedLogo';
import {CONSTANT} from '@/src/constants/values';
import {Link} from 'expo-router';
import {Linking, Pressable, Text, View} from 'react-native';
import 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function LogginScreen() {
	const openLink = () => {
		Linking.openURL('https://galaxies.dev');
	};
	return (
		<SafeAreaView className="flex-1 items-center justify-center bg-light-bgcolor-100 px-5">
			<View className="mb-10">
				<AnimatedChatLogo />
			</View>
			<Text className=" text-3xl text-light-txtcolor-title">Welcome to {CONSTANT.appName} </Text>
			<Text className="text-light-txtcolor-200 text-center mt-5 mx-6">
				Read our{' '}
				<Text onPress={openLink} className="text-light-txtcolor-secondary font-semibold">
					Privacy Policy
				</Text>
				. {'Tap "Agree & Continue" to accept the '}
				<Text onPress={openLink} className="text-light-txtcolor-secondary font-semibold">
					Terms of Service
				</Text>
				.
			</Text>
			<Link href={'./sign'} className="mt-20" replace asChild>
				<Pressable className="bg-light-bgcolor-primary w-full p-3 rounded-full items-center">
					<Text className="text-lg font-bold text-white">Agree & Continue</Text>
				</Pressable>
			</Link>
		</SafeAreaView>
	);
}
