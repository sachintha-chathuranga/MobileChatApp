import ChatHeader from '@/components/ChatHeader';
import Menu from '@/components/Menu';
import SearchBar from '@/components/SearchBar';
import { friends } from '@/constants/data';
import {CONSTANT} from '@/constants/values';
import {Stack, useLocalSearchParams} from 'expo-router';

export default function HomeLayout() {
	
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
			<Stack.Screen name="chat" options={{headerShown: false, animation: 'none'}} />
		</Stack>
	);
}
