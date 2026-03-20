import {images} from '@/src/assets/images';
import {useLocalSearchParams} from 'expo-router';
import React from 'react';
import {Image, Text, View} from 'react-native';

const ChatHeader = () => {
	const {name, status, avatar} = useLocalSearchParams();
	return (
		<View className="flex-1 flex-row items-center gap-1">
			<Image source={avatar || images.noperson} style={{width: 43, height: 43, borderRadius: 50}} />
			<View className="px-2 flex-1">
				<Text className="text-light-txtcolor-100 text-lg font-semibold line-clamp-1 dark:text-dark-txtcolor-100">
					{name}
				</Text>
				<Text className="text-light-txtcolor-200 line-clamp-1  dark:text-dark-txtcolor-200">{status}</Text>
			</View>
		</View>
	);
};

export default ChatHeader;
