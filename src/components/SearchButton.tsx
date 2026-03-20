import {Colors} from '@/src/constants/theme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {useRouter} from 'expo-router';
import {useColorScheme} from 'nativewind';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

const SearchButton = () => {
	const {colorScheme} = useColorScheme();
	const router = useRouter();
	const onPress = () => {
		router.push('/search');
	};
	return (
		<View className="pb-2 px-4">
			<TouchableOpacity
				className="bg-light-inputbg py-3 px-5 rounded-full flex-row items-center gap-1 dark:bg-dark-inputbg"
				onPress={onPress}
			>
				<MaterialIcons
					color={colorScheme === 'dark' ? Colors.dark.inputtxt : Colors.light.inputtxt}
					size={23}
					name="search"
				/>
				<Text className={'text-light-inputtxt text-base dark:text-dark-inputtxt'}>
					Search Friends for start chatting
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default SearchButton;
