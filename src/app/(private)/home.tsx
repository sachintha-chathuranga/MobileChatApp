import FriendCard from '@/src/components/FriendCard';
import HomeComponant from '@/src/components/Home';
import HomeHeader from '@/src/components/HomeHeader';
import Loading from '@/src/components/Loading';
import SearchButton from '@/src/components/SearchButton';
import {Friend, Message} from '@/src/constants/types';
import {useSocket} from '@/src/context/socketContext';
import useAxiosPrivate from '@/src/hooks/useAxiosPrivate';
import useRecentChats from '@/src/hooks/useRecentChats';
import {fetchAllNotification, fetchFriend, fetchRecentChats} from '@/src/services/apiCalls';
import {useFocusEffect} from '@react-navigation/native';

import {useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, View} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

export default function HomeScreen() {
	const [index, setindex] = useState(1);
	const [notification, setNotification] = useState<Message[]>([]);
	const friendList = useRef<Friend[]>(null);
	const axiosPrivate = useAxiosPrivate();
	const [refreshing, setRefreshing] = useState(false);
	const {friends, setFriends, isFetching, hasMore} = useRecentChats(index);
	const {socket} = useSocket();

		useEffect(() => {
			console.log('Home Screen mount');
			if (!axiosPrivate) return;
			fetchAllNotification(axiosPrivate).then((data) => {
				setNotification(data);
			});
			return () => console.log("Home Screen unmount");
		}, [axiosPrivate]);
	

	const onRefresh = useCallback(() => {
		setRefreshing(true)
		fetchRecentChats(axiosPrivate, index).then((data) => {
			setFriends(data);
			setRefreshing(false);
		});
	}, []);

	useEffect(() => {
		friendList.current = friends;
	}, [friends]);

	useEffect(() => {
		console.log('Socket At Home: ' + socket);
		if (!socket) return;
		console.log('HomeScreen getMessage listening...');
		const handler = (data: any) => {
			console.log('Message Comming Background');
			const sender = friendList?.current?.find((f: Friend) => f.user_id === data.sender_id);
			console.log(data);
			setNotification((prev) => [...prev, data]);
			if (!sender) {
				console.log('RealTime Fetch Freind');
				fetchFriend(axiosPrivate, data.sender_id).then((friend) => {
					friend && setFriends((list) => [friend, ...list]);
				});
				return;
			}
		};
		socket.on('getMessage', handler);
		return () => {
			console.log('Home getMessage listner Off');
			socket.off('getMessage', handler);
		};
		// eslint-disable-next-line
	}, [socket]);

	return (
		<SafeAreaView className=" bg-light-bgcolor-100 flex-1 dark:bg-dark-bgcolor-100">
			<HomeHeader />
			<SearchButton />

			{friends.length === 0 && !isFetching ? (
				<View className="flex-1 justify-center">
					<HomeComponant />
				</View>
			) : (
				<View className="flex-1">
					{isFetching && <Loading text="Loading" />}
					<FlatList
						data={friends}
						refreshing={refreshing}
						onRefresh={onRefresh}
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{
							paddingVertical: 10,
							paddingHorizontal: 15,
							gap: 20,
						}}
						keyExtractor={(item) => item.user_id.toString()}
						renderItem={({item}) => <FriendCard friend={{...item}} notifications={notification} />}
						onEndReached={() => {
							if (!isFetching && hasMore) {
								console.log('Bottom touch');
								setindex((prev) => prev + 1);
							}
						}}
						onEndReachedThreshold={0.5}
					/>
				</View>
			)}
		</SafeAreaView>
	);
}
