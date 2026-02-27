import {friends} from '@/constants/data.js';
import {useRouter} from 'expo-router';
import React from 'react';
import {Image, Pressable, Text, TouchableHighlight, TouchableOpacity, View} from 'react-native';
const ProfileCard = () => {
	const router = useRouter();
	return (
		<TouchableHighlight activeOpacity={0.6} underlayColor="#DDDDDD" onPress={()=> router.push('/settings/profile')}>
			<View className="flex-row items-center border-b border-b-gray-200 p-3 pl-5">
				<Image source={friends[0].profil_pic} style={{width: 70, height: 70, borderRadius: 50 }} />
				<View className="px-4">
					<Text className="text-lg line-clamp-1">{friends[0].fname + ' ' + friends[0].lname}</Text>
					<Text className="color-gray-500 line-clamp-1">+94 71 905 7364</Text>
					<Pressable className="flex-row flex-grow-0 px-2 py-1 mt-1 rounded-full border border-gray-400 items-center w-fit self-start gap-2">
						<Text className="text-base">{'\u{1F44B}'}</Text>
						<Text className="text-sm pr-2">Free to chat</Text>
					</Pressable>
				</View>
			</View>
		</TouchableHighlight>
	);
};

export default ProfileCard;
