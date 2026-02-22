import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {useRouter} from 'expo-router';
import React from 'react';
import {Image, Text, TouchableHighlight, TouchableOpacity, View} from 'react-native';
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
	return (
		<TouchableOpacity  onPress={ () => router.push( {pathname: "/chat/[id]",  params: { id: friend.id }})}>
			<View className="flex-1 flex-row items-center">
				<Image source={friend.profil_pic} style={{width: 45, height: 45, borderRadius: 50}} />
				<View className="px-2 flex-1">
					<Text className="text-lg font-semibold line-clamp-1">{friend.fname + ' ' + friend.lname}</Text>
					<Text className="color-gray-500 line-clamp-1">{friend.lastMessage}</Text>
				</View>
				<View className="flex gap-3 justify-end align-bottom">
					<Text className="color-gray-500 text-sm">2025/25/6</Text>
					<MaterialIcons className="self-end" color={'green'} name="circle" />
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default Card;
