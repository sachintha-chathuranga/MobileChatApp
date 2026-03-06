import {Colors} from '@/constants/theme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {useRouter} from 'expo-router';
import {useColorScheme} from 'nativewind';
import React, {useState} from 'react';
import {TextInput, View} from 'react-native';

const SearchBar = () => {
	const [input, setInput] = useState('');
	const router = useRouter();
	const {colorScheme} = useColorScheme();

	return (
		<View className="px-4 pt-10 bg-light-bgcolor-100 dark:bg-dark-bgcolor-100">
			<View className="bg-light-inputbg px-3 py-1 rounded-full flex-row items-center gap-1 dark:bg-dark-inputbg">
				<MaterialIcons
					color={colorScheme === 'dark' ? Colors.dark.txtcolor[100] : Colors.light.txtcolor[100]}
					size={23}
					name="arrow-back"
					className="pr-2"
					onPress={() => router.back()}
				/>
				<MaterialIcons
					color={colorScheme === 'dark' ? Colors.dark.inputtxt : Colors.light.inputtxt}
					size={23}
					name="search"
				/>

				<TextInput
					className="text-light-txtcolor-100 flex-1 text-base border-none border-transparent dark:text-dark-txtcolor-100"
					onChangeText={setInput}
					value={input}
					placeholder="Search Friends for chat"
					placeholderTextColor={colorScheme === 'dark' ? Colors.dark.inputtxt : Colors.light.inputtxt}
					underlineColorAndroid="transparent"
					// autoFocus={true}
					// keyboardType="alphabetic"
				/>
			</View>
		</View>
	);
};

export default SearchBar;
