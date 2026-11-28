import {Colors} from '@/src/constants/theme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {useColorScheme} from 'nativewind';
import React from 'react';
import {Text, TouchableHighlight, View} from 'react-native';

type IconCardProps = {
	iconName: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
	title: string;
	info?: string;
	disabled?: boolean;
	onPress: () => void;
};

const IconCard: React.FC<IconCardProps> = ({iconName, title, info, disabled, onPress}) => {
	const {colorScheme} = useColorScheme();
	return (
		<TouchableHighlight
			disabled={disabled}
			activeOpacity={0.6}
			underlayColor={colorScheme === 'dark' ? Colors.dark.underlay[100] : Colors.light.underlay[100]}
			onPress={onPress}
		>
			<View className={`flex-row items-center gap-1`}>
				<MaterialCommunityIcons
					name={iconName}
					size={26}
					color={colorScheme === 'dark' ? Colors.dark.txtcolor[100] : Colors.light.txtcolor[100]}
					className="p-3"
				/>
				<View className="px-2 flex-1">
					<Text className="text-light-txtcolor-100 text-lg line-clamp-1 dark:text-dark-txtcolor-100">{title}</Text>
					{info && (
						<Text className="text-light-txtcolor-200 line-clamp-1 dark:text-dark-txtcolor-200">{info}</Text>
					)}
				</View>
			</View>
		</TouchableHighlight>
	);
};

export default IconCard;
