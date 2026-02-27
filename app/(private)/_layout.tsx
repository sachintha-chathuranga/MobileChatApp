import Menu from '@/components/Menu';
import SearchBar from '@/components/SearchBar';
import {CONSTANT} from '@/constants/values';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {Stack, useRouter} from 'expo-router';

export default function HomeLayout() {
			const router = useRouter();
	return (
		<Stack>
			<Stack.Screen
				name="home"
				options={{
					title: CONSTANT.appName || 'AppName',
					headerLargeTitleEnabled: true,
					headerShadowVisible: false,
					headerBlurEffect: 'regular',
					headerTitleStyle: {fontSize: 25},

					headerRight: () => <Menu />,
				}}
			/>

			<Stack.Screen
				name="search"
				options={{
					headerStyle: {backgroundColor: '#fff'},
					header: () => <SearchBar />,
					headerShadowVisible: false,
					headerBlurEffect: 'regular',
				}}
			/>
			<Stack.Screen
				name="settings"
				options={{
					headerShown: false
				}}
			/>

			<Stack.Screen name="chat" options={{headerShown: false, animation: 'none'}} />
		</Stack>
	);
}
