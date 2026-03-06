import Menu from '@/components/Menu';
import SearchBar from '@/components/SearchBar';
import {CONSTANT} from '@/constants/values';
import {Colors} from '@/constants/theme'
import {ThemeContext} from '@/utils/themeContext';
import {Stack, useRouter} from 'expo-router';
import {useColorScheme} from 'nativewind';
import {useContext} from 'react';

export default function HomeLayout() {
	const router = useRouter();
	const {colorScheme} = useColorScheme();
	const {toggleTheme, theme} = useContext(ThemeContext);
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
					headerTintColor: colorScheme === 'dark' ? Colors.dark.txtcolor.primary : Colors.light.txtcolor.primary,
					headerBlurEffect: 'regular',

					headerTitleStyle: {
						fontSize: 25,
					},

					headerRight: () => <Menu />,
				}}
			/>

			<Stack.Screen
				name="search"
				options={{
					header: () => <SearchBar />,
					headerShadowVisible: false,
					headerBlurEffect: 'regular',
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
