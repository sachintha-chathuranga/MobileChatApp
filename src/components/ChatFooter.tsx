import {Colors} from '@/src/constants/theme';
import {Message, NewMessage} from '@/src/constants/types';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {useColorScheme} from 'nativewind';
import React, {Dispatch, SetStateAction, useRef, useState} from 'react';
import {TextInput, TextInputProps, TouchableWithoutFeedback, View} from 'react-native';
import {useAuth} from '../context/authContext';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import {postMessage} from '../services/apiCalls';

type InputFieldProps = {
	friendId: number;
	messages: Message[];
	setMessages: Dispatch<SetStateAction<Message[]>>;
};

const InputField: React.FC<InputFieldProps> = ({friendId, messages, setMessages}) => {
	const [input, setInput] = useState('');
	const {user} = useAuth();
	const axiosPrivate = useAxiosPrivate();
	const inputRef = useRef<TextInput | null>(null);
	const sendMessage = async () => {
		const msg: NewMessage = {
			sender_id: user!.user_id,
			receiver_id: friendId,
			message: input,
			createdAt: Date.now(),
		};
		const newMsg = await postMessage(axiosPrivate, msg);
		setMessages((prev) => [newMsg, ...prev]);
		inputRef.current?.clear()
		inputRef?.current?.focus()
	};
	const {colorScheme} = useColorScheme();
	return (
		<View className=" py-2 px-4 flex-row items-center gap-3 bg-light-bgcolor-100 dark:bg-dark-bgcolor-100">
			<TextInput
				ref={inputRef}
				className="text-light-txtcolor-100 flex-1 bg-light-inputbg px-6 py-4 rounded-full text-base border-none border-transparent dark:bg-dark-inputbg dark:text-dark-txtcolor-100"
				onChangeText={(setInput)}
				placeholder="Search Friends for chat"
				placeholderTextColor={colorScheme === 'dark' ? Colors.dark.inputtxt : Colors.light.inputtxt}
				underlineColorAndroid="transparent"
				autoFocus
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
