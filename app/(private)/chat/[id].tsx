import ChatHeader from '@/components/ChatHeader';
import IncomeMsg from '@/components/IncomeMsg';
import InputField from '@/components/Input';
import OutgoingMsg from '@/components/OutgoingMsg';
import {tempmessages} from '@/constants/data.js';
import {useLocalSearchParams} from 'expo-router';
import React, {useEffect, useState} from 'react';
import {FlatList, KeyboardAvoidingView, Platform, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {friends} from '@/constants/data';
import { Friend, Message } from '@/constants/types';

const ChatScreen = () => {
	const {id} = useLocalSearchParams();
	const [messages, setMessages] = useState<Message[]>([]);
	const [friendList, setfriendList] = useState<Friend[]>([]);
	const [user, setuser] = useState({user_id: 1});

	useEffect(() => {
		setfriendList(friends);
	}, []);

	useEffect(() => {
		setMessages(tempmessages);
	}, []);

	return (
		<SafeAreaView className="flex-1">
			<View className="flex-1">
				<ChatHeader friend={friendList[Number(id)]} />
				<KeyboardAvoidingView
					style={{flex: 1}}
					behavior={Platform.OS === 'ios' ? 'padding' : undefined}
					keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
				>
					<FlatList
						data={messages}
						showsVerticalScrollIndicator={false}
						inverted
						contentContainerStyle={{
							padding: 10,
							gap: 10,
						}}
						automaticallyAdjustKeyboardInsets
						keyExtractor={(item) => item.id.toString()}
						renderItem={({item}) =>
							item.sender_id === user.user_id ? (
								<OutgoingMsg isLoading={false} msg={item.message} />
							) : (
								<IncomeMsg isLoading={false} msg={item.message} />
							)
						}
					/>
					<InputField messages={messages} setMessages={setMessages} />
				</KeyboardAvoidingView>
			</View>
		</SafeAreaView>
	);
};

export default ChatScreen;
