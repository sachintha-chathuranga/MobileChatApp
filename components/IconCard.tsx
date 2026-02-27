import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {ExternalPathString, Href, RelativePathString, useRouter} from 'expo-router';

import React from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
type Friend = {
	id: number;
	fname: string;
	lname: string;
	lastMessage: string;
	profil_pic: string;
	status: boolean;
};

type IconCardProps = {
	iconName: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
	title: string;
	info: string;
	route: Href;
};
const IconCard: React.FC<IconCardProps> = ({iconName, title, info, route}) => {
	const router = useRouter();
	return (
		<TouchableHighlight activeOpacity={0.6} underlayColor="#DDDDDD" onPress={() => router.push(route)}>
			<View className={`flex-row items-center ${info && 'p-3'} gap-1`}>
				<MaterialCommunityIcons name={iconName} size={26} color="gray" className="p-3" />
				<View className="px-2 flex-1">
					<Text className="text-lg line-clamp-1">{title}</Text>
					{info && <Text className="color-gray-500 line-clamp-1">{info}</Text>}
				</View>
			</View>
		</TouchableHighlight>
	);
};

export default IconCard;
