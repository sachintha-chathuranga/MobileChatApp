import InputField from '@/src/components/ChatFooter';
import ChatHeader from '@/src/components/ChatHeader';
import IncomeMsg from '@/src/components/IncomeMsg';
import OutgoingMsg from '@/src/components/OutgoingMsg';
import {Message, NewMessage} from '@/src/constants/types';
import {useAuth} from '@/src/context/authContext';
import {useSocket} from '@/src/context/socketContext';
import useAxiosPrivate from '@/src/hooks/useAxiosPrivate';
import useMessages from '@/src/hooks/useMessages';
import {postMessage, readAllMessages} from '@/src/services/apiCalls';
import {useLocalSearchParams} from 'expo-router';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, KeyboardAvoidingView, Platform, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const ChatScreen = () => {
	const {id} = useLocalSearchParams();
	const {messages, setMessages, isMessageFetching} = useMessages(Number(id));
	const {user} = useAuth();
	const {socket} = useSocket();
	const [input, setInput] = useState('');
	const inputRef = useRef<TextInput | null>(null);
	const axiosPrivate = useAxiosPrivate();
	const [isInvert, setIsInvert] = useState(false);

	useEffect(() => {
		readAllMessages(axiosPrivate, Number(id));
		return () => {
			readAllMessages(axiosPrivate, Number(id));
		};
	}, []);

	useEffect(() => {
		if (!isInvert && messages.length >= 5) {
			console.log('Switch to Inverted list');
			setIsInvert(true);
		}
		if (messages.length === 5) {
			setMessages((prev) => prev.sort((a, b) => b.id - a.id));
		}
		if (messages.length < 5){
			setMessages(messages.sort((a, b) => a.id - b.id));
		}
	}, [messages]);

	const updateMessageList = useCallback(
		(data: Message) => {
			if (isInvert) {
				setMessages((prev) => [data, ...prev]);
				return;
			}
			setMessages((prev) => [...prev, data]);
		},
		[isInvert]
	);

	useEffect(() => {
		if (!socket) return;
		console.log('ChatScreen getMessage listening...');
		const handler = (data: any) => {
			if (data.sender_id === Number(id)) {
				updateMessageList(data);
			}
		};
		socket.on('getMessage', handler);

		return () => {
			console.log('ChatScreen listener Off');
			socket.off('getMessage', handler);
		};
	}, [socket, setMessages, id, updateMessageList]);

	const sendMessage = async () => {
		const msg: NewMessage = {
			sender_id: user!.user_id,
			receiver_id: Number(id),
			message: input,
			createdAt: Date.now(),
		};
		const newMsg = await postMessage(axiosPrivate, msg);

		socket?.emit('sendMessage', newMsg);
		updateMessageList(newMsg);
		inputRef.current?.clear();
		inputRef?.current?.focus();
	};

	const onClearMessages = useCallback(() => {
		setIsInvert(false);
		setMessages([]);
	}, []);

	return (
		<SafeAreaView className="flex-1 bg-light-bgcolor-100 dark:bg-dark-bgcolor-100">
			<KeyboardAvoidingView
				style={{flex: 1}}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
			>
				<ChatHeader clear={() => onClearMessages()} />
				<View className={`flex-1 bg-light-bgcolor-300 dark:bg-dark-bgcolor-300`}>
					<FlatList
						data={messages}
						inverted={isInvert}
						showsVerticalScrollIndicator={false}
						keyboardShouldPersistTaps="handled"
						keyExtractor={(item) => item.id.toString()}
						contentContainerClassName="p-3"
						renderItem={({item}) =>
							item.sender_id === user?.user_id ? (
								<OutgoingMsg isLoading={false} msg={item.message} />
							) : (
								<IncomeMsg isLoading={false} msg={item.message} />
							)
						}
					/>
				</View>
				<InputField inputRef={inputRef} onInputChange={setInput} onSubmit={() => sendMessage()} />
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default ChatScreen;
