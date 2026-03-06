import InputField from '@/components/ChatFooter';
import IncomeMsg from '@/components/IncomeMsg';
import OutgoingMsg from '@/components/OutgoingMsg';
import {friends} from '@/constants/data';
import {tempmessages} from '@/constants/data.js';
import {Friend, Message} from '@/constants/types';
import {useLocalSearchParams} from 'expo-router';
import React, {useEffect, useState} from 'react';
import {FlatList, KeyboardAvoidingView, Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

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
		<SafeAreaView edges={['bottom']} className="flex-1 bg-light-bgcolor-300 dark:bg-dark-bgcolor-300">
			<KeyboardAvoidingView
				style={{flex: 1}}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 80}
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
		</SafeAreaView>
	);
};

export default ChatScreen;
