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
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, KeyboardAvoidingView, Platform, TextInput, View, useWindowDimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const ChatScreen = () => {
	const {id} = useLocalSearchParams();
	const [index, setindex] = useState(1);
	const {messages, setMessages, isMessageFetching, hasMore} = useMessages(Number(id), index);
	const {user} = useAuth();
	const {socket} = useSocket();
	const [input, setInput] = useState('');
	const inputRef = useRef<TextInput | null>(null);
	const axiosPrivate = useAxiosPrivate();
	// const [isInvert, setIsInvert] = useState(false);

	useEffect(() => {
		readAllMessages(axiosPrivate, Number(id));
		return () => {
			readAllMessages(axiosPrivate, Number(id));
		};
	}, []);

	useEffect(() => {
		if (!socket) return;
		console.log('ChatScreen getMessage listening...');
		const handler = (data: any) => {
			if (data.sender_id === Number(id)) {
				setMessages((prev) => [data, ...prev]);
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

		socket?.emit('sendMessage', newMsg);
		setMessages((prev) => [newMsg, ...prev]);
		inputRef.current?.clear();
		inputRef?.current?.focus();
	};

	const onClearMessages = useCallback(() => {
		setMessages([]);
	}, []);

	return (
		<SafeAreaView className="flex-1 bg-light-bgcolor-100 dark:bg-dark-bgcolor-100">
			<ChatHeader clear={() => onClearMessages()} />
			<KeyboardAvoidingView
				style={{flex: 1}}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
			>
				<View className={`flex-1 bg-light-bgcolor-300 dark:bg-dark-bgcolor-300`}>
					<FlatList
						data={messages}
						inverted={true}
						showsVerticalScrollIndicator={true}
						keyboardShouldPersistTaps="handled"
						keyExtractor={(item) => item.id.toString()}
						contentContainerClassName="p-3"
						contentContainerStyle={{
							flexGrow: 1,
							justifyContent: 'flex-end',
						}}
						renderItem={({item}) =>
							item.sender_id === user?.user_id ? (
								<OutgoingMsg isLoading={false} msg={item.message} />
							) : (
								<IncomeMsg isLoading={false} msg={item.message} />
							)
						}
					
						onEndReached={() => {
							if (!isMessageFetching && hasMore) {
								console.log('Upper touch');
								setindex((prev) => prev + 1);
							}
						}}
						onEndReachedThreshold={0.5}
					/>
				</View>
				<InputField inputRef={inputRef} onInputChange={setInput} onSubmit={() => sendMessage()} />
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default ChatScreen;
