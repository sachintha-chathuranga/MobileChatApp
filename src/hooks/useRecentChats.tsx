import {Friend} from '@/src/constants/types';
import {fetchRecentChats} from '@/src/services/apiCalls';
import {useEffect, useState} from 'react';
import useAxiosPrivate from './useAxiosPrivate';

const useRecentChats = (index: number) => {
	const [friends, setFriends] = useState<Friend[]>([]);
	const [isFetching, setIsFetching] = useState(false);
	const [hasMore, sethasMore] = useState(true);
	const axiosPrivate = useAxiosPrivate();

	// Pagination
	useEffect(() => {
		let isMounted = true;
		const fetchMore = async () => {
			try {
				setIsFetching(true);
				const data = await fetchRecentChats(axiosPrivate, index);
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
	}, [index, axiosPrivate]);

	return {friends, setFriends, isFetching, hasMore};
};

export default useRecentChats;
