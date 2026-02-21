import ChatHeader from '@/components/ChatHeader';
import {Stack, useLocalSearchParams} from 'expo-router';
import {friends} from '@/constants/data';
import { useEffect, useState } from 'react';

type Friend = {
	id: number;
	fname: string;
	lname: string;
	lastMessage: string;
	profil_pic: string;
	status: boolean;
};

export default function ChatLayout() {
	const {id} = useLocalSearchParams();
	const [friendList, setfriendList] = useState<Friend[]>([]);
	useEffect(() => {
	  setfriendList(friends);
	}, [friendList])
	
	console.log(id)
	return (
		<Stack>
			<Stack.Screen
				name="[id]"
				options={{
					headerStyle: {backgroundColor: '#fff'},
					// header: () => <ChatHeader friend={friendList[Number(id)]}/>,
					headerShown:false,
					headerShadowVisible: false,
					headerBlurEffect: 'regular',
				}}
			/>
		</Stack>
	);
}
