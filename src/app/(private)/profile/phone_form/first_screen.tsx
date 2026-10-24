import {images} from '@/src/assets/images';
import {useRouter} from 'expo-router';
import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const ChangePhoneFirst = () => {
	const router = useRouter();
	return (
		<SafeAreaView edges={['bottom']} className="flex-1 justify-between bg-light-bgcolor-100 dark:bg-dark-bgcolor-100">
			<View className="items-center px-10">
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
			<Pressable
				className="bg-light-bgcolor-primary py-3 px-7 w-fit self-center rounded-full mb-6 dark:bg-dark-bgcolor-primary"
				onPress={() => router.push('/settings/profile/phone_form/second_screen')}
			>
				<Text className="color-white font-semibold">Next</Text>
			</Pressable>
		</SafeAreaView>
	);
};

export default ChangePhoneFirst;
