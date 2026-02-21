import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {Alert, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';

const SearchButton = ()=> {
	const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');
	const router = useRouter();
	const onPress = ()=> {
		router.push("/search")
	};
	return (
		<View className='pb-2'>
			<TouchableOpacity
				className="bg-gray-200 py-3 px-5 rounded-full flex-row items-center gap-1 "
				onPress={onPress}
			>
				<MaterialIcons color={'gray'} size={23} name="search" />
				<Text className={currentTheme === 'dark' ? 'text-gray-100 text-base ' : 'text-gray-500 text-base '}>
					Search Friends for start chatting
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default SearchButton;
