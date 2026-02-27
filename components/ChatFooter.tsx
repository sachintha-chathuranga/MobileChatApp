import {Message} from '@/constants/types';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
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
			sender_id: 2,
			receiver_id: 1,
			message: input,
		};
		setMessages((prev) => [msg,...prev]);
		setInput('')
	};
	return (
		<View className=" py-2 px-4 flex-row items-center gap-3">
			<TextInput
				className="flex-1 bg-white px-6 py-4 rounded-full text-base border-none border-transparent"
				onChangeText={setInput}
				value={input}
				placeholder="Search Friends for chat"
				underlineColorAndroid="transparent"

				// keyboardType="alphabetic"
			/>

			<TouchableWithoutFeedback onPress={sendMessage}>
				<View className="flex justify-center items-center rounded-full bg-green-500 p-3">
					<MaterialIcons color={'white'} size={23} name="send" />
				</View>
			</TouchableWithoutFeedback>
		</View>
	);
};

export default InputField;
