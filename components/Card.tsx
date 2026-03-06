import {Colors} from '@/constants/theme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {useRouter} from 'expo-router';
import {useColorScheme} from 'nativewind';
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
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
const Card: React.FC<FriendCardProps> = ({friend}) => {
	const router = useRouter();
	const {colorScheme} = useColorScheme();
	return (
		<TouchableOpacity onPress={() => router.push({pathname: '/chat/[id]', params: {id: friend.id}})}>
			<View className="flex-1 flex-row items-center">
				<Image source={friend.profil_pic} style={{width: 45, height: 45, borderRadius: 50}} />
				<View className="px-2 flex-1">
					<Text className="text-lg text-light-txtcolor-100 font-semibold line-clamp-1 dark:text-dark-txtcolor-100">
						{friend.fname + ' ' + friend.lname}
					</Text>
					<Text className="text-light-txtcolor-200 line-clamp-1 dark:text-dark-txtcolor-200">
						{friend.lastMessage}
					</Text>
				</View>
				<View className="flex gap-3 justify-end align-bottom">
					<Text className="text-light-txtcolor-200 text-sm dark:text-dark-txtcolor-200">2025/25/6</Text>
					<MaterialIcons
						color={colorScheme === 'dark' ? Colors.dark.txtcolor[200] : Colors.light.txtcolor[200]}
						className="self-end"
						name="circle"
					/>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default Card;
