import {Colors} from '@/src/constants/theme';
import {useTheme} from '@/src/context/themeContext';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {useRouter} from 'expo-router';
import React, {useState} from 'react';
import {Modal, Pressable, Text, TouchableHighlight, View} from 'react-native';
import {MenuItem} from '../constants/types';
type MenuProps = {
	list: MenuItem[];
};
const Menu: React.FC<MenuProps> = ({list}) => {
	const [visible, setVisible] = useState(false);
	const router = useRouter();
	const {theme} = useTheme();

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
						className="absolute top-7 right-3 bg-light-bgcolor-200 py-3 rounded-md w-48 shadow dark:bg-dark-bgcolor-200"
						style={{
							elevation: 5,
						}}
					>
						{list.map((item) => (
							<TouchableHighlight
								key={item.id}
								activeOpacity={0.6}
								underlayColor={theme === 'dark' ? Colors.dark.underlay[100] : Colors.light.underlay[100]}
								onPress={() => {
									setVisible(false);
									item.function();
								}}
							>
								<View className="p-2 flex-row items-center gap-1">
									<MaterialCommunityIcons
										color={theme === 'dark' ? Colors.dark.txtcolor[100] : Colors.light.txtcolor[100]}
										size={20}
										name={item.icon}
									/>
									<Text className="text-light-txtcolor-100 dark:text-dark-txtcolor-100">{item.name}</Text>
								</View>
							</TouchableHighlight>
						))}
					</View>
				</Pressable>
			</Modal>
		</View>
	);
};

export default Menu;
