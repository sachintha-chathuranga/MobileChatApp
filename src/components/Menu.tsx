import {Colors} from '@/src/constants/theme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, {memo, useState} from 'react';
import {Modal, Pressable, Text, TouchableHighlight, View} from 'react-native';
import {MenuItem} from '../constants/types';
import {useTheme} from '../context/themeContext';

type MenuProps = {
	list: MenuItem[];
};

const Menu: React.FC<MenuProps> = ({list}) => {
	const [visible, setVisible] = useState(false);
	const {theme} = useTheme();

	return (
		<View>
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

			<Modal
				navigationBarTranslucent={true}
				statusBarTranslucent={true}
				transparent
				visible={visible}
				animationType="fade"
			>
				<Pressable className="flex-1" onPress={() => setVisible(false)}>
					<View
						className="absolute top-24 right-4 bg-light-bgcolor-menu rounded-md w-56 py-3 shadow-md shadow-black dark:bg-dark-bgcolor-menu"
						style={{
							elevation: 5,
							top: 80,
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
								<View className="px-4 py-3 flex-row items-center gap-2">
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

export default memo(Menu);
