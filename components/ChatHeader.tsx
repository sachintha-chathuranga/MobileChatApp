import {images} from '@/assets/images';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {useRouter} from 'expo-router';
import React from 'react';
import {Image, Text, View} from 'react-native';
import Menu from './Menu';
type Friend = {
	id: number;
	fname: string;
	lname: string;
	lastMessage: string;
	profil_pic: string;
	status: boolean;
};
type FriendCardProps = {
	friend: Friend;
};
const ChatHeader: React.FC<FriendCardProps> = ({friend}) => {
	const router = useRouter();
	return (
		<View className="flex-1 flex-row items-center gap-1">
			<Image source={friend?.profil_pic || images.noperson} style={{width: 43, height: 43, borderRadius: 50}} />
			<View className="px-2 flex-1">
				<Text className="text-light-txtcolor-100 text-lg font-semibold line-clamp-1 dark:text-dark-txtcolor-100">
					{friend?.fname + ' ' + friend?.lname}
				</Text>
				<Text className="text-light-txtcolor-200 line-clamp-1  dark:text-dark-txtcolor-200">Online</Text>
			</View>
		</View>
	);
};

export default ChatHeader;
