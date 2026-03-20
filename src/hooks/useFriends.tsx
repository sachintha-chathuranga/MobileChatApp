import {Friend} from '@/src/constants/types';
import {useEffect, useState} from 'react';

import {fetchFriendList, searchFriends} from '@/src/services/apiCalls';
import useAxiosPrivate from './useAxiosPrivate';

const useFriends = (index: number, searchInput?: string) => {
	const [friends, setFriends] = useState<Friend[]>([]);
	const [isFetching, setIsFetching] = useState(false);
	const [hasMore, sethasMore] = useState(true);
	const axiosPrivate = useAxiosPrivate();

	// Pagination
	useEffect(() => {
		if (index === 1) return;
		let isMounted = true;
		const fetchMore = async () => {
			try {
				setIsFetching(true);
				const data = searchInput
					? await searchFriends(axiosPrivate, index, searchInput)
					: await fetchFriendList(axiosPrivate, index);
				if (isMounted) {
					setFriends((prev) => [...prev, ...data]);
					sethasMore(data.length === 15);
				}
			} catch (error) {
				console.log(error);
			} finally {
				if (isMounted) setIsFetching(false);
			}
		};
		fetchMore();
		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line
	}, [index, searchInput, axiosPrivate]);

	// Initial load / search
	useEffect(() => {
		let isMounted = true;

		const fetchInitial = async () => {
			try {
				setIsFetching(true);
				const data = searchInput
					? await searchFriends(axiosPrivate, null, searchInput)
					: await fetchFriendList(axiosPrivate, null);
				if (isMounted) {
					setFriends(data);
					sethasMore(data.length === 15);
				}
			} catch (error) {
				console.error(error);
			} finally {
				if (isMounted) setIsFetching(false);
			}
		};

		fetchInitial();

		return () => {
			isMounted = false;
		};

		// eslint-disable-next-line
	}, [searchInput, axiosPrivate]);

	return {friends, setFriends, isFetching, hasMore};
};

export default useFriends;
