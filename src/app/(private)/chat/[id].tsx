import InputField from '@/src/components/ChatFooter';
import ChatHeader from '@/src/components/ChatHeader';
import IncomeMsg from '@/src/components/IncomeMsg';
import OutgoingMsg from '@/src/components/OutgoingMsg';
import {useAuth} from '@/src/context/authContext';
import useMessages from '@/src/hooks/useMessages';
import {useLocalSearchParams} from 'expo-router';
import React from 'react';
import {FlatList, KeyboardAvoidingView, Platform, View} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

const ChatScreen = () => {
	const {id} = useLocalSearchParams();
	const {messages, setMessages, isMessageFetching} = useMessages(Number(id));
	const {user} = useAuth();

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
						showsVerticalScrollIndicator={false}
						inverted
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
				<InputField friendId={Number(id)} messages={messages} setMessages={setMessages} />
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default ChatScreen;
