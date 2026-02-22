import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {useRouter} from 'expo-router';
import React, {useState} from 'react';
import {KeyboardAvoidingView, Platform, TextInput, View} from 'react-native';

const SearchBar = () => {
	const [input, setInput] = useState('');
	const router = useRouter();

	return (
		<View className="px-4 pt-10 bg-white">
			<View className="bg-gray-200 px-3 py-1 rounded-full flex-row items-center gap-1">
				<MaterialIcons size={23} name="arrow-back" className="pr-2" onPress={() => router.back()} />
				<MaterialIcons color={'gray'} size={23} name="search" />
			
					<TextInput
						className="flex-1 text-base border-none border-transparent"
						onChangeText={setInput}
						value={input}
						placeholder="Search Friends for chat"
						underlineColorAndroid="transparent"
						// autoFocus={true}
						// keyboardType="alphabetic"
					/>
		
			</View>
		</View>
	);
};

export default SearchBar;
