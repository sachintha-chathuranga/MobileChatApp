import {useRouter} from 'expo-router';
import React, {useMemo} from 'react';
import {Text, View} from 'react-native';
import {MenuItem} from '../constants/types';
import {CONSTANT} from '../constants/values';
import {useAuth} from '../context/authContext';
import {useSocket} from '../context/socketContext';
import {useTheme} from '../context/themeContext';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import Menu from './Menu';

const HomeHeader = () => {
	const router = useRouter();
	const {toggleTheme, theme} = useTheme();
	const {signOut} = useAuth();
	const axiosPrivate = useAxiosPrivate();
	const {disconnectSocket} = useSocket();

	const menuItems: MenuItem[] = useMemo(
		() => [
			{
				id: 1,
				icon: 'cog-outline',
				name: 'Settings',
				function: () => router.push('/settings'),
			},
			{
				id: 2,
				icon: 'theme-light-dark',
				name: `${theme === 'dark' ? 'Light' : 'Dark'} Theme`,
				function: () => toggleTheme(),
			},
			{
				id: 3,
				icon: 'logout',
				name: 'Signout',
				function: () => {
					disconnectSocket();
					signOut(axiosPrivate);
				},
			},
		],
		[theme,disconnectSocket,axiosPrivate]
	);
	return (
		<View className="flex-row items-center justify-between pt-3 pb-2 pl-5 pr-2">
			<Text className="text-3xl font-semibold text-light-txtcolor-primary dark:text-dark-txtcolor-100">
				{CONSTANT.appName || 'AppName'}
			</Text>
			<Menu list={menuItems} />
		</View>
	);
};

export default HomeHeader;
