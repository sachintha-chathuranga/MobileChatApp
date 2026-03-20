import Menu from '@/src/components/Menu';
import {Colors} from '@/src/constants/theme';
import {MenuItem} from '@/src/constants/types';
import {CONSTANT} from '@/src/constants/values';
import {useAuth} from '@/src/context/authContext';
import {useTheme} from '@/src/context/themeContext';

import {Stack, useRouter} from 'expo-router';
import {useColorScheme} from 'nativewind';
import {useMemo} from 'react';

export default function HomeLayout() {
	const router = useRouter();
	const {colorScheme} = useColorScheme();
	const {toggleTheme, theme} = useTheme();
	const {signOut} = useAuth();

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
				name: `${theme==='dark' ? "Light" : "Dark"} Theme`,
				function: () => toggleTheme(),
			},
			{
				id: 3,
				icon: 'logout',
				name: 'Signout',
				function: () => signOut(),
			},
		],
		[theme]
	);

	return (
		<Stack>
			<Stack.Screen
				name="home"
				options={{
					title: CONSTANT.appName || 'AppName',
					headerLargeTitleEnabled: true,
					headerShadowVisible: false,
					headerStyle: {
						backgroundColor: colorScheme === 'dark' ? Colors.dark.bgcolor[100] : Colors.light.bgcolor[100],
					},
					headerTintColor: colorScheme === 'dark' ? Colors.dark.txtcolor[100] : Colors.light.txtcolor.primary,
					headerBlurEffect: 'regular',
					headerTitleStyle: {
						fontSize: 25,
					},

					headerRight: () => <Menu list={menuItems} />,
				}}
			/>

			<Stack.Screen
				name="search"
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="settings"
				options={{
					headerShown: false,
				}}
			/>

			<Stack.Screen name="chat" options={{headerShown: false, animation: 'none'}} />
		</Stack>
	);
}
