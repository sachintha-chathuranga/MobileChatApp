import {imojiCategories} from '@/constants/emojis.js';
import {Colors} from '@/constants/theme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import emojis from 'emoji-datasource';
import {useColorScheme} from 'nativewind';
import React, {useMemo, useState} from 'react';
import {FlatList, Pressable, Text, TouchableOpacity, View} from 'react-native';

interface EmojiModalProps {
	editable: boolean;
	onBackSpace?: () => void;
	onEmojiSelect: (emoji: string) => void;
}

const EmojiModal: React.FC<EmojiModalProps> = ({editable, onBackSpace, onEmojiSelect}) => {
	const categories = useMemo(() => [...new Set(emojis.map((e) => e.category))], []);
	const [selectedCategory, setSelectedCategory] = useState(categories[0]);
	const {colorScheme} = useColorScheme();
	const filteredEmojis = useMemo(
		() =>
			emojis.filter(
				(e) => e.category === selectedCategory && !e.skin_variations // remove duplicates
			),
		[selectedCategory]
	);

	const renderEmoji = ({item}: any) => {
		const emojiChar = String.fromCodePoint(...item.unified.split('-').map((u: string) => parseInt(u, 16)));

		return (
			<TouchableOpacity className="flex-1 items-center justify-center p-2" onPress={() => onEmojiSelect(emojiChar)}>
				<Text className="text-3xl">{emojiChar}</Text>
			</TouchableOpacity>
		);
	};

	return (
		<View className={`bg-light-bgcolor-200 dark:bg-dark-bgcolor-200 h-80 ${editable ? '' : 'flex-col-reverse'}`}>
			{editable && (
				<View className=" py-2 px-3 items-end">
					<Pressable onPress={onBackSpace}>
						<MaterialCommunityIcons
							color={colorScheme === 'dark' ? Colors.dark.txtcolor[100] : Colors.light.txtcolor[100]}
							size={20}
							name="backspace-outline"
						/>
					</Pressable>
				</View>
			)}
			{/* Emoji Grid */}
			<FlatList
				data={filteredEmojis}
				renderItem={renderEmoji}
				keyExtractor={(item) => item.unified}
				numColumns={8}
				showsVerticalScrollIndicator={false}
				className="flex-1"
			/>

			{/* Category Tabs */}
			<View className="flex-row border-t border-light-border dark:border-dark-border py-2 px-3 justify-between">
				{imojiCategories.map((cat) => (
					<TouchableOpacity
						key={cat}
						onPress={() => setSelectedCategory(cat)}
						className={`p-1 rounded-full ${selectedCategory === cat ? 'bg-light-underlay dark:bg-dark-underlay' : ''}`}
					>
						<Text>
							<MaterialIcons
								color={
									selectedCategory === cat
										? colorScheme === 'dark'
											? Colors.dark.txtcolor[100]
											: Colors.light.txtcolor[100]
										: colorScheme === 'dark'
											? Colors.dark.txtcolor[200]
											: Colors.light.txtcolor[200]
								}
								size={25}
								name={getCategoryIcon(cat)}
							/>
						</Text>
					</TouchableOpacity>
				))}
			</View>
		</View>
	);
};

export default EmojiModal;

// Helper for category icons
function getCategoryIcon(category: string) {
	switch (category) {
		case 'Smileys & Emotion':
			return 'tag-faces';
		case 'Animals & Nature':
			return 'emoji-nature';
		case 'Food & Drink':
			return 'emoji-food-beverage';
		case 'Travel & Places':
			return 'directions-car';
		case 'Activities':
			return 'sports-volleyball';
		case 'Objects':
			return 'lightbulb-outline';
		case 'Symbols':
			return 'emoji-symbols';
		case 'Flags':
			return 'outlined-flag';
		default:
			return 'question-mark';
	}
}
