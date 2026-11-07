import {Colors} from '@/src/constants/theme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {Stack, useRouter} from 'expo-router';
import {useColorScheme} from 'nativewind';

export default function ChatLayout() {
	const router = useRouter();
	const {colorScheme} = useColorScheme();
	return (
		<Stack>
			<Stack.Screen
				name="[id]"
				options={{
					headerShown: false,
					animation: 'simple_push',
				}}
			/>
			<Stack.Screen
				name="profile"
				options={{
					animation: 'simple_push',
					title: 'Profile',
					headerTitleAlign: 'left',
					headerLeft: () => (
						<MaterialIcons
							color={colorScheme === 'dark' ? Colors.dark.txtcolor[100] : Colors.light.txtcolor[100]}
							size={23}
							name="arrow-back"
							className="pr-4"
							onPress={() => router.back()}
						/>
					),
					headerStyle: {
						backgroundColor: colorScheme === 'dark' ? Colors.dark.bgcolor[100] : Colors.light.bgcolor[100],
					},
					headerTintColor: colorScheme === 'dark' ? Colors.dark.txtcolor[100] : Colors.light.txtcolor[100],
					headerBlurEffect: 'regular',
					headerTitleStyle: {fontSize: 22},
					headerShadowVisible: false,
				}}
			/>
		</Stack>
	);
}
