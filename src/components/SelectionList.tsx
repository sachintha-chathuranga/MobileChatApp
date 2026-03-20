import {Colors} from '@/src/constants/theme';
import {AboutItem} from '@/src/constants/types';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {useColorScheme} from 'nativewind';

import React, {useState} from 'react';
import {Pressable, Text, View} from 'react-native';

interface SelectionListProps {
	options: AboutItem[];
	onSelect: (item: AboutItem) => void;
}

const SelectionList: React.FC<SelectionListProps> = ({options, onSelect}) => {
	const [selected, setSelected] = useState<number | null>(null);
	const {colorScheme} = useColorScheme();
	const handleSelected = (item: AboutItem) => {
		setSelected(item.id);
		onSelect(item);
	};

	return (
		<View className="px-3">
			{options.map((item) => (
				<Pressable
					key={item.id}
					onPress={() => handleSelected(item)}
					className="flex-row items-center justify-between p-3"
				>
					<View className="flex-row items-center gap-3">
						<Text className="text-2xl">{item.emoji}</Text>
						<Text className="text-base text-light-txtcolor-100 dark:text-dark-txtcolor-100">{item.label}</Text>
					</View>

					{selected === item.id && (
						<MaterialCommunityIcons
							name="check"
							size={22}
							color={colorScheme === 'dark' ? Colors.dark.txtcolor.primary : Colors.light.txtcolor.primary}
						/>
					)}
				</Pressable>
			))}
		</View>
	);
};

export default SelectionList;
