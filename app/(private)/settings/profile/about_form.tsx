import EmojiKeyboard from '@/components/EmojiKeyboard';
import SelectionList from '@/components/SelectionList';
import {AboutItem} from '@/constants/types';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
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

	const setAbout = (item: AboutItem) => {
		setEmoji(item.emoji);
		setInput(item.label);
	};
	const openEmojiKeyboard = () => {
		Keyboard.dismiss();
		setShowEmojiKeyboard(true);
	};
	return (
		<SafeAreaView edges={['bottom']} className="flex-1 bg-white">
			<KeyboardAvoidingView
				style={{flex: 1}}
				enabled={!showEmojiKeyboard}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 80}
			>
				<ScrollView automaticallyAdjustKeyboardInsets keyboardShouldPersistTaps="always">
					<View className="flex-row items-start gap-4 p-5">
						<Pressable
							className="rounded-lg justify-center p-1 items-center border text-center border-gray-400"
							onPress={() => openEmojiKeyboard()}
						>
							{emoji === '' ? (
								<MaterialIcons color={'gray'} size={24} name="tag-faces" />
							) : (
								<Text className="text-xl">{emoji}</Text>
							)}
						</Pressable>
						<View className="flex-1 gap-4">
							<TextInput
								ref={inputRef}
								cursorColor={'#4ade80'}
								onChangeText={setInput}
								className="border-b-2 border-green-600 py-2"
								value={input}
								placeholder="What's happening?"
								underlineColorAndroid="transparent"
								autoFocus
								onFocus={() => setShowEmojiKeyboard(false)}
							/>
							<Text className="color-gray-700 text-justify">
								Visible in chats to:
								<Text className="font-semibold color-green-700"> My contacts</Text>
							</Text>
						</View>
					</View>

					<View className="border-t border-gray-300">
						<Text className="font-semibold color-gray-700 pl-4 pt-2">Select</Text>
						<SelectionList options={options} onSelect={(item) => setAbout(item)} />
					</View>
				</ScrollView>

				<View className={`${showEmojiKeyboard ? 'mb-40' : 'relative'}`}>
					<Pressable className={`absolute z-20 -top-20 right-0 bg-green-600 w-fit self-end p-3 m-3 rounded-xl `}>
						<MaterialCommunityIcons color={'white'} size={23} name="check" />
					</Pressable>
					{showEmojiKeyboard && (
						<EmojiKeyboard editable={false} onEmojiSelect={(emoji) => setEmoji(emoji)} />
					)}
				</View>
			</KeyboardAvoidingView>
		
		</SafeAreaView>
	);
};

export default AboutForm;
