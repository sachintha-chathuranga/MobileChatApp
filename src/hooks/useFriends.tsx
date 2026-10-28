import {Friend} from '@/src/constants/types';
import {useEffect, useState} from 'react';

import {fetchFriendList, searchFriends} from '@/src/services/apiCalls';
import useAxiosPrivate from './useAxiosPrivate';

const useFriends = (index: number, searchInput?: string) => {
	const [friends, setFriends] = useState<Friend[]>([]);
	const [isFetching, setIsFetching] = useState(true);
	const [hasMore, sethasMore] = useState(true);
	const axiosPrivate = useAxiosPrivate();

	// Pagination
	useEffect(() => {
		if (index === 1) return;
		const fetchMore = async () => {
			try {
				setIsFetching(true);
				const data = searchInput
					? await searchFriends(axiosPrivate, index, searchInput)
					: await fetchFriendList(axiosPrivate, index);

				setFriends((prev) => [...prev, ...data]);
				sethasMore(data.length === 15);
			} catch (error) {
				console.log(error);
			} finally {
				setIsFetching(false);
			}
		};
		fetchMore();
		// eslint-disable-next-line
	}, [index, searchInput, axiosPrivate]);

	// Initial load / search
	useEffect(() => {
		setIsFetching(true);
		searchInput
			? searchFriends(axiosPrivate, null, searchInput).then((data) => {
					setFriends(data);
					sethasMore(data.length === 15);
					setIsFetching(false);
				})
			: fetchFriendList(axiosPrivate, null).then((data) => {
					setFriends(data);
					sethasMore(data.length === 15);
					setIsFetching(false);
				});

		// eslint-disable-next-line
	}, [searchInput, axiosPrivate]);

	return {friends, setFriends, isFetching, hasMore};
};

export default useFriends;
