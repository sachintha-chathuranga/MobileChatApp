import AnimatedChatLogo from '@/src/components/AnimatedLogo';
import {CONSTANT} from '@/src/constants/values';
import {router} from 'expo-router';
import {Linking, Text, View} from 'react-native';
import 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import SubmitButton from '../components/SubmitButton';

export default function WelcomeScreen() {
	const openLink = () => {
		Linking.openURL('https://galaxies.dev');
	};
	return (
		<SafeAreaView className="flex-1 gap-10 items-center justify-center bg-light-bgcolor-100 dark:bg-dark-bgcolor-100 px-6">
			<View className="items-center">
				<View className="mb-10">
					<AnimatedChatLogo />
				</View>
				<Text className=" text-3xl text-light-txtcolor-title dark:text-dark-txtcolor-title">
					Welcome to {CONSTANT.appName}{' '}
				</Text>
				<Text className="text-light-txtcolor-200 dark:text-dark-txtcolor-200 text-center mt-5 mx-6">
					Read our{' '}
					<Text
						onPress={openLink}
						className="text-light-txtcolor-secondary dark:text-dark-txtcolor-secondary font-semibold"
					>
						Privacy Policy
					</Text>
					. {'Tap "Agree & Continue" to accept the '}
					<Text
						onPress={openLink}
						className="text-light-txtcolor-secondary dark:text-dark-txtcolor-secondary font-semibold"
					>
						Terms of Service
					</Text>
					.
				</Text>
			</View>
			<SubmitButton text="Agrree & Continue" disable={false} onSubmit={() => router.replace('/sign')} />
		</SafeAreaView>
	);
}
