import EmojiKeyboard from '@/src/components/EmojiKeyboard';
import {Colors} from '@/src/constants/theme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import GraphemeSplitter from 'grapheme-splitter';
import {useColorScheme} from 'nativewind';
import React, {useRef, useState} from 'react';
import {Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableHighlight, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
const splitter = new GraphemeSplitter();
const NameForm = () => {
	const [input, setInput] = useState('');
	const [showEmojiKeyboard, setShowEmojiKeyboard] = useState(false);
	const inputRef = useRef<TextInput>(null);
	const {colorScheme} = useColorScheme();

	const toggleEmojiKeyboard = () => {
		if (showEmojiKeyboard) {
			// Switch to keyboard
			setShowEmojiKeyboard(false);
			inputRef.current?.focus();
		} else {
			// Switch to emoji
			Keyboard.dismiss();
			setShowEmojiKeyboard(true);
		}
	};
	const handleBackspace = () => {
		setInput((prev) => {
			const graphemes = splitter.splitGraphemes(prev);
			graphemes.pop();
			return graphemes.join('');
		});
	};

	return (
		<SafeAreaView edges={['bottom']} className="flex-1 bg-light-bgcolor-100 dark:bg-dark-bgcolor-100">
			<KeyboardAvoidingView
				style={{flex: 1}}
				enabled={!showEmojiKeyboard}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 80}
			>
				<View className="flex-1 justify-between">
					<View className="pt-5 px-7 gap-6">
						<View className="flex-row items-center gap-2 pl-3 pr-3 py-1 rounded-md border-2 border-light-border-primary dark:border-dark-border-primary">
							<TextInput
								ref={inputRef}
								cursorColor={'#4ade80'}
								onChangeText={setInput}
								className="flex-1 text-light-txtcolor-100 dark:text-dark-txtcolor-100"
								value={input}
								placeholder="Enter your name"
								placeholderTextColor={colorScheme === 'dark' ? Colors.dark.inputtxt : Colors.light.inputtxt}
								underlineColorAndroid="transparent"
								autoFocus
								onFocus={() => setShowEmojiKeyboard(false)}
							/>
							<TouchableHighlight
								activeOpacity={0.6}
								underlayColor={colorScheme === 'dark' ? Colors.dark.underlay[100] : Colors.light.underlay[100]}
								className="rounded-full p-1 justify-center items-center "
								onPress={() => toggleEmojiKeyboard()}
							>
								<MaterialIcons
									color={colorScheme === 'dark' ? Colors.dark.inputtxt : Colors.light.inputtxt}
									size={24}
									name={showEmojiKeyboard ? 'keyboard' : 'tag-faces'}
								/>
							</TouchableHighlight>
						</View>

						<Text className="text-light-txtcolor-100 text-justify dark:text-dark-txtcolor-100">
							People will see this name if you interact with them and they don't have you saved as a contact.
						</Text>
					</View>
					<View className={`${showEmojiKeyboard && 'mb-40'}`}>
						<View className="my-4 mx-8">
							<TouchableHighlight className="p-3 rounded-full mx-3 bg-light-bgcolor-primary items-center dark:bg-dark-bgcolor-primary">
								<Text className="text-white font-bold">Save</Text>
							</TouchableHighlight>
						</View>
						{showEmojiKeyboard && (
							<EmojiKeyboard
								editable={true}
								onBackSpace={() => handleBackspace()}
								onEmojiSelect={(emoji) => setInput((prev) => prev + emoji)}
							/>
						)}
					</View>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default NameForm;
