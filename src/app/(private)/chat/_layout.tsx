import ChatHeader from '@/src/components/ChatHeader';
import Menu from '@/src/components/Menu';
import {Colors} from '@/src/constants/theme';
import {MenuItem} from '@/src/constants/types';
import {useAuth} from '@/src/context/authContext';
import {useTheme} from '@/src/context/themeContext';
import useAxiosPrivate from '@/src/hooks/useAxiosPrivate';
import {clearMessages} from '@/src/services/apiCalls';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {Stack, useLocalSearchParams, useRouter} from 'expo-router';
import {useMemo} from 'react';

export default function ChatLayout() {
	const {id} = useLocalSearchParams();
	const router = useRouter();
	const {theme, toggleTheme} = useTheme();
	const {signOut} = useAuth();
	const axiosPrivate = useAxiosPrivate();

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
				icon: 'chat-remove-outline',
				name: 'Clear chat',
				function: () => clearMessages(axiosPrivate, Number(id)),
			},
		],
		[theme, axiosPrivate, id]
	);
	return (
		<Stack>
			<Stack.Screen
				name="[id]"
				options={{
					headerStyle: {
						backgroundColor: theme === 'dark' ? Colors.dark.bgcolor[100] : Colors.light.bgcolor[100],
					},

					headerTitle: () => <ChatHeader />,
					headerLeft: () => (
						<MaterialIcons
							size={23}
							color={theme === 'dark' ? Colors.dark.txtcolor[100] : Colors.light.txtcolor[100]}
							name="arrow-back"
							className="pr-2"
							onPress={() => router.back()}
						/>
					),
					headerTitleAlign: 'left',
					headerRight: () => <Menu list={menuItems} />,
					headerLargeTitleEnabled: false,
					headerShadowVisible: false,
					headerBlurEffect: 'regular',
				}}
			/>
		</Stack>
	);
}
