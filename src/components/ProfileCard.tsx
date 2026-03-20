import {images} from '@/src/assets/images';
import {Colors} from '@/src/constants/theme';
import {useAuth} from '@/src/context/authContext';
import {useRouter} from 'expo-router';
import {useColorScheme} from 'nativewind';
import React from 'react';
import {Image, Pressable, Text, TouchableHighlight, View} from 'react-native';
const ProfileCard = () => {
	const router = useRouter();
	const {colorScheme} = useColorScheme();
	const {user} = useAuth();
	return (
		<TouchableHighlight
			activeOpacity={0.6}
			underlayColor={colorScheme === 'dark' ? Colors.dark.underlay[100] : Colors.light.underlay[100]}
			onPress={() => router.push('/settings/profile')}
		>
			<View className="flex-row items-center border-b border-b-light-border-100 p-3 pl-5 dark:border-b-dark-border-100">
				<Image
					source={user?.profil_pic ? user?.profil_pic : images.noperson}
					style={{width: 70, height: 70, borderRadius: 50}}
				/>
				<View className="px-4">
					<Text className="text-light-txtcolor-100 text-lg line-clamp-1 dark:text-dark-txtcolor-100">
						{user?.fname + ' ' + user?.lname}
					</Text>
					<Text className="text-light-txtcolor-200 line-clamp-1 dark:text-dark-txtcolor-200">{user?.phone}</Text>
					<Pressable className="flex-row flex-grow-0 px-2 py-1 mt-1 rounded-full border border-light-border-100 items-center w-fit self-start gap-2 dark:border-dark-border-100">
						<Text className="text-base">{'\u{1F44B}'}</Text>
						<Text className="text-light-txtcolor-100 text-sm pr-2 dark:text-dark-txtcolor-100">Free to chat</Text>
					</Pressable>
				</View>
			</View>
		</TouchableHighlight>
	);
};

export default ProfileCard;
