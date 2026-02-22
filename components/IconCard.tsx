import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {useRouter} from 'expo-router';

import React from 'react';
import {Text, TouchableHighlight, TouchableOpacity, View} from 'react-native';
type Friend = {
	id: number;
	fname: string;
	lname: string;
	lastMessage: string;
	profil_pic: string;
	status: boolean;
};

type IconCardProps = {
	iconName: string;
	title: string;
	info: string;
};
const IconCard: React.FC<IconCardProps> = ({iconName, title, info}) => {
	const router = useRouter();
	return (
		<TouchableHighlight activeOpacity={0.6} underlayColor="#DDDDDD" onPress={() => router.replace('/settings')}>
			<View className="flex-row items-center p-3 gap-1">
				<MaterialCommunityIcons name={iconName} size={26} color="gray" className="p-3" />
				<View className="px-2 flex-1">
					<Text className="text-lg line-clamp-1">{title}</Text>
					<Text className="color-gray-500 line-clamp-1">{info}</Text>
				</View>
			</View>
		</TouchableHighlight>
	);
};

export default IconCard;
