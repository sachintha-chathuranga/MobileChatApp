import {Friend} from '@/src/constants/types';
import {fetchRecentChats} from '@/src/services/apiCalls';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import useAxiosPrivate from './useAxiosPrivate';

const useRecentChats = (index: number) => {
	const [friends, setFriends] = useState<Friend[]>([]);
	const [isFetching, setIsFetching] = useState(false);
	const [hasMore, sethasMore] = useState(true);
	const axiosPrivate = useAxiosPrivate();
	// Initial load & Focus load
	// useFocusEffect(
		useEffect(() => {
			if (!axiosPrivate) return;
			setIsFetching(true);
			fetchRecentChats(axiosPrivate, index).then((data) => {
				setFriends(data);
				setIsFetching(false);
			});
		}, [axiosPrivate])
	// );

	// Pagination
	useEffect(() => {
		if (!axiosPrivate) return;
		if (friends.length >= 15) {
			setIsFetching(true);
			console.log('pagination fetchFriend');
			fetchRecentChats(axiosPrivate, index).then((data) => {
				setFriends((prev) => [...prev, ...data]);
				sethasMore(data.length === 15);
				setIsFetching(false);
			});
		}

		// eslint-disable-next-line
	}, [index, axiosPrivate]);

	return {friends, setFriends, isFetching, hasMore};
};

export default useRecentChats;
