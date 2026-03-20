import {useEffect, useState} from 'react';

import {Message} from '../constants/types';
import {fetchMessages} from '../services/apiCalls';
import useAxiosPrivate from './useAxiosPrivate';

const useMessages = (friend_id: number) => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [isMessageFetching, setIsMessageFeting] = useState(false);
	const axiosPrivate = useAxiosPrivate();

	useEffect(() => {
		let isMounted = true;
		const loadMessage = async () => {
			try {
				setIsMessageFeting(true);
				const data = await fetchMessages(axiosPrivate, friend_id);
				if (isMounted) {
					setMessages(data);
				}
			} catch (error) {
				console.log(error);
			} finally {
				if (isMounted) setIsMessageFeting(false);
			}
		};
		loadMessage();

		return () => {
			isMounted = false;
		};
	}, [friend_id, axiosPrivate]);

	return {messages, setMessages, isMessageFetching};
};

export default useMessages;
