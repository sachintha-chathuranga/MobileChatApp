import {Colors} from '@/constants/theme';
import {ThemeContext} from '@/context/themeContext';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {useRouter} from 'expo-router';
import React, {useContext, useState} from 'react';
import {Modal, Pressable, Text, TouchableHighlight, View} from 'react-native';

export default function Menu() {
	const [visible, setVisible] = useState(false);
	const router = useRouter();
	const {theme, toggleTheme} = useContext(ThemeContext);
	const openSettings = () => {
		setVisible(false);
		router.push('/settings');
	};
	const changeTheme = () => {
		setVisible(false);
		toggleTheme();
	};
	return (
		<View className="p-1">
			<TouchableHighlight
				activeOpacity={0.6}
				underlayColor={theme === 'dark' ? Colors.dark.underlay[100] : Colors.light.underlay[100]}
				className="rounded-full p-1 justify-center items-center "
				onPress={() => setVisible(true)}
			>
				<MaterialIcons
					color={theme === 'dark' ? Colors.dark.txtcolor[100] : Colors.light.txtcolor[100]}
					size={25}
					name="more-vert"
				></MaterialIcons>
			</TouchableHighlight>

			<Modal transparent visible={visible} animationType="fade">
				<Pressable className="flex-1" onPress={() => setVisible(false)}>
					<View
						className="absolute top-12 right-3 bg-light-bgcolor-200 py-3 rounded-md w-48 shadow dark:bg-dark-bgcolor-200"
						style={{
							elevation: 5,
						}}
					>
						<TouchableHighlight
							activeOpacity={0.6}
							underlayColor={theme === 'dark' ? Colors.dark.underlay[100] : Colors.light.underlay[100]}
							onPress={() => openSettings()}
						>
							<View className="p-2 flex-row items-center gap-1">
								<MaterialIcons
									color={theme === 'dark' ? Colors.dark.txtcolor[100] : Colors.light.txtcolor[100]}
									size={20}
									name="settings"
								/>
								<Text className="text-light-txtcolor-100 dark:text-dark-txtcolor-100">Settings</Text>
							</View>
						</TouchableHighlight>
						<TouchableHighlight
							activeOpacity={0.6}
							underlayColor={theme === 'dark' ? Colors.dark.underlay[100] : Colors.light.underlay[100]}
							onPress={() => changeTheme()}
						>
							<View className="p-2 flex-row items-center gap-1">
								<MaterialIcons
									color={theme === 'dark' ? Colors.dark.txtcolor[100] : Colors.light.txtcolor[100]}
									size={20}
									name="settings"
								/>
								<Text className="text-light-txtcolor-100 dark:text-dark-txtcolor-100">
									{theme === 'dark' ? 'Light theme' : 'Dark theme'}
								</Text>
							</View>
						</TouchableHighlight>
					</View>
				</Pressable>
			</Modal>
		</View>
	);
}
