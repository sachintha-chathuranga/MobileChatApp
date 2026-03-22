import InputField from '@/src/components/ChatFooter';
import ChatHeader from '@/src/components/ChatHeader';
import IncomeMsg from '@/src/components/IncomeMsg';
import OutgoingMsg from '@/src/components/OutgoingMsg';
import {NewMessage} from '@/src/constants/types';
import {useAuth} from '@/src/context/authContext';
import {useSocket} from '@/src/context/socketContext';
import useAxiosPrivate from '@/src/hooks/useAxiosPrivate';
import useMessages from '@/src/hooks/useMessages';
import {postMessage, readAllMessages} from '@/src/services/apiCalls';
import {useLocalSearchParams} from 'expo-router';
import React, {useEffect, useRef, useState} from 'react';
import {FlatList, Keyboard, KeyboardAvoidingView, Platform, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const ChatScreen = () => {
	const {id} = useLocalSearchParams();
	const {messages, setMessages, isMessageFetching} = useMessages(Number(id));
	const {user} = useAuth();
	const {socket} = useSocket();
	const [input, setInput] = useState('');
	const inputRef = useRef<TextInput | null>(null);
	const axiosPrivate = useAxiosPrivate();
	const flatListRef = useRef<FlatList | null>(null);
	useEffect(() => {
		flatListRef.current?.scrollToEnd({animated: true});
	}, [messages]);

	useEffect(() => {
		readAllMessages(axiosPrivate, Number(id));
	}, [axiosPrivate, id, messages]);

	useEffect(() => {
		if (!socket) return;
		console.log('ChatScreen getMessage listening...');
		const handler = (data: any) => {
			if (data.sender_id === Number(id)) {
				console.log(data);
				setMessages((prev) => [...prev, data]);
			}
		};
		socket.on('getMessage', handler);

		return () => {
			console.log('ChatScreen listener Off');
			socket.off('getMessage', handler);
		};
	}, [socket, setMessages, id]);

	const sendMessage = async () => {
		const msg: NewMessage = {
			sender_id: user!.user_id,
			receiver_id: Number(id),
			message: input,
			createdAt: Date.now(),
		};
		const newMsg = await postMessage(axiosPrivate, msg);
		console.log(newMsg);
		socket?.emit('sendMessage', newMsg);
		setMessages((prev) => [...prev, newMsg]);
		inputRef.current?.clear();
		inputRef?.current?.focus();
	};

	return (
		<SafeAreaView className="flex-1 bg-light-bgcolor-100 dark:bg-dark-bgcolor-100">
			<KeyboardAvoidingView
				style={{flex: 1}}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
			>
				<ChatHeader clear={setMessages} />
				<View className={'flex-1 bg-light-bgcolor-300 dark:bg-dark-bgcolor-300'}>
					<FlatList
						data={messages}
						ref={flatListRef}
						showsVerticalScrollIndicator={false}
						keyboardShouldPersistTaps="handled"
						contentContainerStyle={{
							padding: 10,
							gap: 10,
						}}
						automaticallyAdjustKeyboardInsets
						keyExtractor={(item) => item.id.toString()}
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
