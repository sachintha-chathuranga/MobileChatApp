import {images} from '@/src/assets/images';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {router, useLocalSearchParams} from 'expo-router';
import React, {useMemo} from 'react';
import {Image, Text, View} from 'react-native';
import {Colors} from '../constants/theme';
import {MenuItem} from '../constants/types';
import {useTheme} from '../context/themeContext';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import {clearMessages} from '../services/apiCalls';
import Menu from './Menu';
type ChatHeaderProps = {
	clear: () => void;
};
const ChatHeader: React.FC<ChatHeaderProps> = ({clear}) => {
	const {id, name, status, avatar} = useLocalSearchParams();
	const {theme, toggleTheme} = useTheme();
	const axiosPrivate = useAxiosPrivate();
	const menuItems: MenuItem[] = useMemo(
		() => [
			{
				id: 1,
				icon: 'cog-outline',
				name: 'Profile',
				function: () => router.push('/profile'),
			},
			{
				id: 2,
				icon: 'theme-light-dark',
				name: `${theme === 'dark' ? 'Light' : 'Dark'} Theme`,
				function: () => toggleTheme(),
			},
			{
				id: 3,
				icon: 'delete-outline',
				// icon: 'chat-remove-outline',
				name: 'Clear chat',
				function: () => {
					clear();
					clearMessages(axiosPrivate, Number(id));
				},
			},
		],
		[theme, axiosPrivate, id]
	);

	return (
		<View className="py-3 mx-3 flex-row items-center gap-1 ">
			<MaterialIcons
				size={23}
				color={theme === 'dark' ? Colors.dark.txtcolor[100] : Colors.light.txtcolor[100]}
				name="arrow-back"
				className="px-2"
				onPress={() => router.back()}
			/>
			<Image source={avatar ? {uri: avatar} : images.noperson} style={{width: 43, height: 43, borderRadius: 50}} />
			<View className="px-2 flex-1">
				<Text className="text-light-txtcolor-100 text-lg font-semibold line-clamp-1 dark:text-dark-txtcolor-100">
					{name}
				</Text>
				<Text className="text-light-txtcolor-200 line-clamp-1  dark:text-dark-txtcolor-200">{status}</Text>
			</View>
			<Menu list={menuItems} />
		</View>
	);
};

export default ChatHeader;
