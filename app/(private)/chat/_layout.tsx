import ChatHeader from '@/components/ChatHeader';
import Menu from '@/components/Menu';
import {friends} from '@/constants/data';
import {Friend} from '@/constants/types';
import {Colors} from '@/constants/theme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {Stack, useLocalSearchParams, useRouter} from 'expo-router';
import {useColorScheme} from 'nativewind';
import {useEffect, useState} from 'react';

export default function ChatLayout() {
	const {id} = useLocalSearchParams();
	const [friendList, setfriendList] = useState<Friend[]>([]);
	useEffect(() => {
		setfriendList(friends);
	}, [friendList]);
	const router = useRouter();
	const {colorScheme} = useColorScheme();
	return (
		<Stack>
			<Stack.Screen
				name="[id]"
				options={{
					headerStyle: {
						backgroundColor: colorScheme === 'dark' ? Colors.dark.bgcolor[100] : Colors.light.bgcolor[100],
					},

					headerTitle: () => <ChatHeader friend={friendList[Number(id)]} />,
					headerLeft: () => (
						<MaterialIcons
							size={23}
							color={colorScheme === 'dark' ? Colors.dark.txtcolor[100] : Colors.light.txtcolor[100]}
							name="arrow-back"
							className="pr-2"
							onPress={() => router.back()}
						/>
					),
					headerTitleAlign: 'left',
					headerRight: () => <Menu />,
					headerLargeTitleEnabled: false,
					headerShadowVisible: false,
					headerBlurEffect: 'regular',
				}}
			/>
		</Stack>
	);
}
