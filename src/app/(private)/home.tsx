import FriendCard from '@/src/components/FriendCard';
import GuestList from '@/src/components/home/GuestList';
import HomeHeader from '@/src/components/home/HomeHeader';
import SearchButton from '@/src/components/home/SearchButton';
import Loading from '@/src/components/Loading';
import {Friend, Message} from '@/src/constants/types';
import {useAuth} from '@/src/context/authContext';
import {useSocket} from '@/src/context/socketContext';
import useAxiosPrivate from '@/src/hooks/useAxiosPrivate';
import useRecentChats from '@/src/hooks/useRecentChats';
import {deleteSelectedUserMessages, fetchAllNotification, fetchFriend, fetchRecentChats} from '@/src/services/apiCalls';
import {useFocusEffect} from 'expo-router';

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
	const {socket, isConnected} = useSocket();
	const {isLogouting} = useAuth();
	const [selectedUsers, setSelectedUsers] = useState<Set<number>>(new Set());
	const [isSelecionMode, setIsSelecionMode] = useState(false);

	const handleSelectAll = useCallback(() => {
		setSelectedUsers(new Set(friends.map((user) => user.user_id)));
	}, [friends]);

	const clearSelection = useCallback((onlyClear: boolean) => {
		if (onlyClear) return setSelectedUsers(new Set());
		setIsSelecionMode(false);
		setSelectedUsers(new Set());
	}, []);

	const handleSelectUser = useCallback((userId: number) => {
		setSelectedUsers((prev) => {
			const updated = new Set(prev);

			if (updated.has(userId)) {
				updated.delete(userId);
			} else {
				updated.add(userId);
			}

			if (updated.size > 0) {
				setIsSelecionMode(true);
			} else {
				setIsSelecionMode(false);
			}
			return updated;
		});
	}, []);

	const handleDeleteMessages = useCallback(() => {
		if (selectedUsers.size === 0) return;
		deleteSelectedUserMessages(axiosPrivate, selectedUsers)
			.then((data) => {
				const remaining = friends.filter((friend) => !selectedUsers.has(friend.user_id));
				setFriends(remaining);
				clearSelection(false);
			})
			.catch((error) => console.error(error));
	}, [selectedUsers, friends]);

	// useFocuseEffect use to update notifications every time home screen focus.
	useFocusEffect(
		useCallback(() => {
			if (!axiosPrivate) return;
			fetchAllNotification(axiosPrivate).then((data) => {
				setNotification(data);
			});
			return () => {};
		}, [])
	);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		fetchRecentChats(axiosPrivate, index).then((data) => {
			setFriends(data);
			setRefreshing(false);
		});
	}, []);

	useEffect(() => {
		friendList.current = friends;
	}, [friends]);

	useEffect(() => {
		if (!socket || !isConnected) return;
		const handleMessage = (data: any) => {
			const sender = friendList?.current?.find((f: Friend) => f.user_id === data.sender_id);
			setNotification((prev) => [...prev, data]);
			if (!sender) {
				fetchFriend(axiosPrivate, data.sender_id).then((friend) => {
					friend && setFriends((list) => [friend, ...list]);
				});
				return;
			}
		};
		socket.on('getMessage', handleMessage);
		return () => {
			socket.off('getMessage', handleMessage);
		};
		// eslint-disable-next-line
	}, [socket, isConnected]);

	return (
		<SafeAreaView className="bg-light-bgcolor-100 flex-1 dark:bg-dark-bgcolor-100">
			{isLogouting && <Loading />}
			<HomeHeader
				isSelctionMod={isSelecionMode}
				clearSelection={clearSelection}
				selectAll={handleSelectAll}
				onDeletPress={handleDeleteMessages}
			/>
			<SearchButton />
			<View className="flex-1">
				{isFetching && <Loading text="Loading" />}
				<FlatList
					data={friends}
					refreshing={refreshing}
					onRefresh={onRefresh}
					showsVerticalScrollIndicator={false}
					contentInsetAdjustmentBehavior="automatic"
					contentContainerStyle={{
						flexGrow: 1,
					}}
					ListEmptyComponent={
						!isFetching ? (
							<View className="flex-1 justify-center">
								<GuestList />
							</View>
						) : (
							<></>
						)
					}
					keyExtractor={(item) => item.user_id.toString()}
					renderItem={({item}) => {
						const isSelected = selectedUsers.has(item.user_id);
						return (
							<FriendCard
								friend={{...item}}
								notifications={notification}
								isSelect={isSelected}
								isSelecionMode={isSelecionMode}
								handleLongPress={handleSelectUser}
							/>
						);
					}}
					onEndReached={() => {
						if (!isFetching && hasMore) {
							console.log('Bottom touch');
							setindex((prev) => prev + 1);
						}
					}}
					onEndReachedThreshold={0.5}
				/>
			</View>
		</SafeAreaView>
	);
}
