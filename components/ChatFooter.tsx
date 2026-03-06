import {Message} from '@/constants/types';
import {Colors} from '@/constants/theme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {useColorScheme} from 'nativewind';
import React, {Dispatch, SetStateAction, useState} from 'react';
import {TextInput, TouchableWithoutFeedback, View} from 'react-native';
type InputFieldProps = {
	messages: Message[];
	setMessages: Dispatch<SetStateAction<Message[]>>;
};

const InputField: React.FC<InputFieldProps> = ({messages, setMessages}) => {
	const [input, setInput] = useState('');

	const sendMessage = () => {
		const msg = {
			id: messages.length + 1,
			sender_id: 1,
			receiver_id: 2,
			message: input,
		};
		setMessages((prev) => [msg, ...prev]);
		setInput('');
	};
	const {colorScheme} = useColorScheme();
	return (
		<View className=" py-2 px-4 flex-row items-center gap-3 bg-light-bgcolor-100 dark:bg-dark-bgcolor-100">
			<TextInput
				className="text-light-txtcolor-100 flex-1 bg-light-inputbg px-6 py-4 rounded-full text-base border-none border-transparent dark:bg-dark-inputbg dark:text-dark-txtcolor-100"
				onChangeText={setInput}
				value={input}
				placeholder="Search Friends for chat"
				placeholderTextColor={colorScheme === 'dark' ? Colors.dark.inputtxt : Colors.light.inputtxt}
				underlineColorAndroid="transparent"

				// keyboardType="alphabetic"
			/>

			<TouchableWithoutFeedback onPress={sendMessage}>
				<View className="flex justify-center items-center rounded-full bg-light-bgcolor-primary p-3 dark:bg-dark-bgcolor-primary">
					<MaterialIcons color={'white'} size={23} name="send" />
				</View>
			</TouchableWithoutFeedback>
		</View>
	);
};

export default InputField;
