import {images} from '@/src/assets/images';
import SubmitButton from '@/src/components/SubmitButton';
import {useRouter} from 'expo-router';
import React from 'react';
import {Image, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const PhoneUpdateFirstScreen = () => {
	const router = useRouter();
	return (
		<SafeAreaView
			edges={['bottom']}
			className="flex-1 px-10 pb-5 justify-between bg-light-bgcolor-100 dark:bg-dark-bgcolor-100"
		>
			<View className="items-center">
				<Image source={images.sim} style={{width: 160, height: 160}} resizeMode="contain" />
				<View className="gap-6">
					<Text className="text-base text-light-txtcolor-100 dark:text-dark-txtcolor-100">
						Changing your phone number will migrate your account info, groups & settings.
					</Text>
					<Text className="text-light-txtcolor-200 dark:text-dark-txtcolor-200 ">
						Before proceeding, please confirm that you are able to receive SMS or calls at your new number.
					</Text>
					<Text className="text-light-txtcolor-200 dark:text-dark-txtcolor-200 ">
						If you have both a new phone & a new number, first change your number on your old phone.
					</Text>
				</View>
			</View>
			<SubmitButton text="Next" onSubmit={() => router.push('/profile/phone_form/form')} />
		</SafeAreaView>
	);
};

export default PhoneUpdateFirstScreen;
