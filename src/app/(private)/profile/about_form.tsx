import EmojiKeyboard from '@/src/components/EmojiKeyboard';
import Loading from '@/src/components/Loading';
import SelectionList from '@/src/components/SelectionList';
import {Colors} from '@/src/constants/theme';
import {AboutItem} from '@/src/constants/types';
import {useAuth} from '@/src/context/authContext';
import useAxiosPrivate from '@/src/hooks/useAxiosPrivate';
import {userUpdateCall} from '@/src/services/apiCalls';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {useRouter} from 'expo-router';
import {useColorScheme} from 'nativewind';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Keyboard, KeyboardAvoidingView, Platform, Pressable, Text, TextInput, View} from 'react-native';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

const options = [
	{id: 1, emoji: '🟢', label: 'Free to chat'},
	{id: 2, emoji: '⏰', label: 'Slow to respond'},
	{id: 3, emoji: '😂', label: 'Hanging with friends'},
	{id: 4, emoji: '🛩️', label: 'Traveling'},
	{id: 5, emoji: '🔥', label: 'Excited'},
];

const AboutForm = () => {
	const router = useRouter();
	const [input, setInput] = useState('');
	const [showEmojiKeyboard, setShowEmojiKeyboard] = useState(false);
	const [emoji, setEmoji] = useState('');
	const inputRef = useRef<TextInput>(null);
	const {colorScheme} = useColorScheme();
	const {user, setUser} = useAuth();
	const axiosPrivate = useAxiosPrivate();
	const [updating, setUpdating] = useState(false);

	useEffect(() => {
		const [emoji, ...parts] = (user?.about ?? '').split('|');
		setInput(parts[0]);
		setEmoji(emoji);
	}, [user?.about]);

	const setAbout = useCallback((item: AboutItem) => {
		setEmoji(item.emoji);
		setInput(item.label);
	}, []);

	const toggleEmojiKeyboard = () => {
		if (showEmojiKeyboard) {
			setShowEmojiKeyboard(false);
			inputRef.current?.focus();
			return;
		}
		Keyboard.dismiss();
		setShowEmojiKeyboard(true);
	};
	// useCallback not use for this function
	// because not any passing functions to child components or not using functions inside other hooks.
	const handleSubmit = () => {
		if (!user) return;
		setUpdating(true);
		let about = null;
		if (emoji && input) {
			about = `${emoji}|${input}`;
		}
		console.log(about);
		userUpdateCall(axiosPrivate, {about}).then((res) => {
			setUpdating(false);
			if (res !== 200) return;
			setUser({...user, about});
			router.back();
		});
	};
	return (
		<GestureHandlerRootView style={{flex: 1}}>
			<SafeAreaView edges={['bottom']} className="flex-1 bg-light-bgcolor-100 dark:bg-dark-bgcolor-100">
				<KeyboardAvoidingView
					style={{flex: 1}}
					enabled={!showEmojiKeyboard}
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 80}
				>
					{updating && <Loading text="Updating..." />}
					<ScrollView automaticallyAdjustKeyboardInsets keyboardShouldPersistTaps="always">
						<View className="flex-row items-start gap-4 p-5">
							<Pressable
								className="rounded-lg justify-center p-1 items-center border text-center border-light-border-100 dark:border-dark-border-100"
								onPress={toggleEmojiKeyboard}
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
							<SelectionList options={options} onSelect={setAbout} />
						</View>
					</ScrollView>

					<View className={`${showEmojiKeyboard ? 'mb-40' : 'relative'}`}>
						<Pressable
							disabled={updating}
							onPress={handleSubmit}
							className={`absolute ${updating ? 'z-0' : 'z-20'} -top-20 right-0 bg-light-bgcolor-primary dark:bg-dark-bgcolor-primary w-fit self-end p-3 m-3 rounded-xl `}
						>
							<MaterialCommunityIcons color={'white'} size={23} name="check" />
						</Pressable>
						{showEmojiKeyboard && <EmojiKeyboard editable={false} onEmojiSelect={setEmoji} />}
					</View>
				</KeyboardAvoidingView>
			</SafeAreaView>
		</GestureHandlerRootView>
	);
};

export default AboutForm;
