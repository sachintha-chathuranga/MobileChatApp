import EmojiKeyboard from '@/src/components/EmojiKeyboard';
import SelectionList from '@/src/components/SelectionList';
import {Colors} from '@/src/constants/theme';
import {AboutItem} from '@/src/constants/types';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {useColorScheme} from 'nativewind';
import React, {useRef, useState} from 'react';
import {Keyboard, KeyboardAvoidingView, Platform, Pressable, Text, TextInput, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
const options = [
	{id: 1, emoji: '🟢', label: 'Free to chat'},
	{id: 2, emoji: '⏰', label: 'Slow to respond'},
	{id: 3, emoji: '😂', label: 'Hanging with friends'},
	{id: 4, emoji: '🛩️', label: 'Traveling'},
	{id: 5, emoji: '🔥', label: 'Excited'},
];

const AboutForm = () => {
	const [input, setInput] = useState('');
	const [showEmojiKeyboard, setShowEmojiKeyboard] = useState(false);
	const [emoji, setEmoji] = useState('');
	const inputRef = useRef<TextInput>(null);
	const {colorScheme} = useColorScheme();
	const setAbout = (item: AboutItem) => {
		setEmoji(item.emoji);
		setInput(item.label);
	};
	const openEmojiKeyboard = () => {
		Keyboard.dismiss();
		setShowEmojiKeyboard(true);
	};
	return (
		<SafeAreaView edges={['bottom']} className="flex-1 bg-light-bgcolor-100 dark:bg-dark-bgcolor-100">
			<KeyboardAvoidingView
				style={{flex: 1}}
				enabled={!showEmojiKeyboard}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 80}
			>
				<ScrollView automaticallyAdjustKeyboardInsets keyboardShouldPersistTaps="always">
					<View className="flex-row items-start gap-4 p-5">
						<Pressable
							className="rounded-lg justify-center p-1 items-center border text-center border-light-border-100 dark:border-dark-border-100"
							onPress={() => openEmojiKeyboard()}
						>
							{emoji === '' ? (
								<MaterialIcons
									color={colorScheme === 'dark' ? Colors.dark.txtcolor[200] : Colors.light.txtcolor[200]}
									size={24}
									name="tag-faces"
								/>
							) : (
								<Text className="text-xl">{emoji}</Text>
							)}
						</Pressable>
						<View className="flex-1 gap-4">
							<TextInput
								ref={inputRef}
								cursorColor={'#4ade80'}
								onChangeText={setInput}
								className="text-light-txtcolor-100 border-b-2 border-light-border-primary py-2 dark:border-dark-border-primary dark:text-dark-txtcolor-100"
								value={input}
								placeholder="What's happening?"
								placeholderTextColor={colorScheme === 'dark' ? Colors.dark.inputtxt : Colors.light.inputtxt}
								underlineColorAndroid="transparent"
								autoFocus
								onFocus={() => setShowEmojiKeyboard(false)}
							/>
							<Text className="text-light-txtcolor-200 text-justify dark:text-dark-txtcolor-200">
								Visible in chats to:
								<Text className="font-semibold text-light-txtcolor-primary dark:text-dark-txtcolor-primary">
									{' '}
									My contacts
								</Text>
							</Text>
						</View>
					</View>

					<View className="border-t border-light-border-100 dark:border-dark-border-100">
						<Text className="font-semibold text-light-txtcolor-200 dark:text-dark-txtcolor-200 pl-4 pt-2">
							Select
						</Text>
						<SelectionList options={options} onSelect={(item) => setAbout(item)} />
					</View>
				</ScrollView>

				<View className={`${showEmojiKeyboard ? 'mb-40' : 'relative'}`}>
					<Pressable
						className={`absolute z-20 -top-20 right-0 bg-light-bgcolor-primary dark:bg-dark-bgcolor-primary w-fit self-end p-3 m-3 rounded-xl `}
					>
						<MaterialCommunityIcons color={'white'} size={23} name="check" />
					</Pressable>
					{showEmojiKeyboard && <EmojiKeyboard editable={false} onEmojiSelect={(emoji) => setEmoji(emoji)} />}
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default AboutForm;
