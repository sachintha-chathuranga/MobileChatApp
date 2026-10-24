import {useEffect, useState} from 'react';

import {Message} from '../constants/types';
import {fetchMessages} from '../services/apiCalls';
import useAxiosPrivate from './useAxiosPrivate';

const useMessages = (friend_id: number, index: number) => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [isMessageFetching, setIsMessageFeting] = useState(false);
	const [hasMore, sethasMore] = useState(true);
	const axiosPrivate = useAxiosPrivate();
	// Initial load
	useEffect(() => {
		if (!axiosPrivate) return;
		setIsMessageFeting(true);
		console.log("Initial fetching messages")
		fetchMessages(axiosPrivate, friend_id, index).then((data)=>{
			setMessages(data);
			setIsMessageFeting(false);
		});
	}, [friend_id, axiosPrivate]);

	// Pagination
	useEffect(() => {
		if (!axiosPrivate) return;
		if (messages.length >= 30) {
			setIsMessageFeting(true);
			fetchMessages(axiosPrivate, friend_id, index).then((data) => {
				setMessages((prev) => [...prev, ...data]);
				sethasMore(data.length === 30);
				setIsMessageFeting(false);
			});
		}

		// eslint-disable-next-line
	}, [index, axiosPrivate]);

	return {messages, setMessages, isMessageFetching, hasMore};
};

export default useMessages;
