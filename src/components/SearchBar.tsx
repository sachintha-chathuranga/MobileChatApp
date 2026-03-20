import {Colors} from '@/src/constants/theme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {useRouter} from 'expo-router';
import {useColorScheme} from 'nativewind';
import React from 'react';
import {TextInput, View} from 'react-native';
type SearchBarProps = {
	value: string;
	onChangeText: (text: string) => void;
};
const SearchBar: React.FC<SearchBarProps> = ({value, onChangeText}) => {
	const router = useRouter();
	const {colorScheme} = useColorScheme();

	return (
		<View className="px-1 bg-light-bgcolor-100 dark:bg-dark-bgcolor-100">
			<View className="bg-light-inputbg px-3 rounded-full flex-row items-center gap-1 dark:bg-dark-inputbg">
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
					onChangeText={onChangeText}
					value={value}
					cursorColor={colorScheme === 'dark' ? Colors.dark.cursor : Colors.light.cursor}
					placeholder="Search Friends for chat"
					placeholderTextColor={colorScheme === 'dark' ? Colors.dark.inputtxt : Colors.light.inputtxt}
					autoFocus
					underlineColorAndroid="transparent"
				/>
			</View>
		</View>
	);
};

export default SearchBar;
