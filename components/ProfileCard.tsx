import {friends} from '@/constants/data.js';
import {Colors} from '@/constants/theme';
import {useRouter} from 'expo-router';
import {useColorScheme} from 'nativewind';
import React from 'react';
import {Image, Pressable, Text, TouchableHighlight, View} from 'react-native';
const ProfileCard = () => {
	const router = useRouter();
	const {colorScheme} = useColorScheme();
	return (
		<TouchableHighlight
			activeOpacity={0.6}
			underlayColor={colorScheme === 'dark' ? Colors.dark.underlay : Colors.light.underlay}
			onPress={() => router.push('/settings/profile')}
		>
			<View className="flex-row items-center border-b border-b-light-border-100 p-3 pl-5 dark:border-b-dark-border-100">
				<Image source={friends[0].profil_pic} style={{width: 70, height: 70, borderRadius: 50}} />
				<View className="px-4">
					<Text className="text-light-txtcolor-100 text-lg line-clamp-1 dark:text-dark-txtcolor-100">
						{friends[0].fname + ' ' + friends[0].lname}
					</Text>
					<Text className="text-light-txtcolor-200 line-clamp-1 dark:text-dark-txtcolor-200">+94 71 905 7364</Text>
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
