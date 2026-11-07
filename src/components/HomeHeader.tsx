import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {useRouter} from 'expo-router';
import React, {memo, useMemo, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {Colors} from '../constants/theme';
import {MenuItem} from '../constants/types';
import {CONSTANT} from '../constants/values';
import {useAuth} from '../context/authContext';
import {useSocket} from '../context/socketContext';
import {useTheme} from '../context/themeContext';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import Menu from './Menu';
type HomeHeaderProps = {
	isSelctionMod: boolean;
	clearSelection: (onlyClear: boolean) => void;
	selectAll: () => void;
	onDeletPress: () => void;
};
const HomeHeader: React.FC<HomeHeaderProps> = ({isSelctionMod, clearSelection, selectAll, onDeletPress}) => {
	console.log('Home Header rendered!');
	const router = useRouter();
	const {toggleTheme, theme} = useTheme();
	const {signOut} = useAuth();
	const axiosPrivate = useAxiosPrivate();
	const {disconnectSocket} = useSocket();
	const [isChecked, setIsChecked] = useState(false);

	const menuItems: MenuItem[] = useMemo(
		() => [
			{
				id: 1,
				icon: 'account-circle-outline',
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
				icon: 'logout',
				name: 'Logout',
				function: () => {
					disconnectSocket();
					signOut(axiosPrivate);
				},
			},
		],
		[theme, disconnectSocket, axiosPrivate]
	);

	const handleBackPress = (onlyClear: boolean) => {
		setIsChecked(false);
		clearSelection(onlyClear);
	};

	const handleCheckBoxPress = () => {
		if (isChecked) return handleBackPress(true);
		selectAll();
		setIsChecked(true);
	};

	return (
		<View className="flex-row items-center justify-between pt-3 pb-2 pl-6 pr-3">
			<Text className="text-3xl font-semibold text-light-txtcolor-primary dark:text-dark-txtcolor-100">
				{!isSelctionMod ? (
					CONSTANT.appName || 'AppName'
				) : (
					<MaterialIcons
						color={theme === 'dark' ? Colors.dark.txtcolor[100] : Colors.light.txtcolor[100]}
						size={23}
						className="pl-3"
						name="arrow-back"
						onPress={() => handleBackPress(false)}
					/>
				)}
			</Text>
			{isSelctionMod ? (
				<View className="flex-row items-center gap-4 mr-5">
					<Pressable onPress={onDeletPress}>
						<MaterialCommunityIcons
							name="trash-can-outline"
							size={24}
							color={theme === 'dark' ? Colors.dark.txtcolor[100] : Colors.light.txtcolor[100]}
						/>
					</Pressable>
					{isChecked ? (
						<Pressable onPress={handleCheckBoxPress}>
							<MaterialCommunityIcons
								name="checkbox-multiple-marked-outline"
								size={24}
								color={theme === 'dark' ? Colors.dark.txtcolor[100] : Colors.light.txtcolor[100]}
							/>
						</Pressable>
					) : (
						<Pressable onPress={handleCheckBoxPress}>
							<MaterialCommunityIcons
								name="checkbox-multiple-blank-outline"
								size={24}
								color={theme === 'dark' ? Colors.dark.txtcolor[100] : Colors.light.txtcolor[100]}
							/>
						</Pressable>
					)}
				</View>
			) : (
				<Menu list={menuItems} />
			)}
		</View>
	);
};

export default memo(HomeHeader);
