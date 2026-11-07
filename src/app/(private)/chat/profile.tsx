import ProfileComponent from '@/src/components/Profile';
import useAxiosPrivate from '@/src/hooks/useAxiosPrivate';
import {fetchFriend} from '@/src/services/apiCalls';
import {useLocalSearchParams} from 'expo-router';
import React, {useEffect, useState} from 'react';

const FriendProfileScreen = () => {
	const axiosPrivate = useAxiosPrivate();
	const {id} = useLocalSearchParams<{
		id: string;
	}>();
	const [friend, setFriend] = useState(null);
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (!Boolean(id)) return;
		fetchFriend(axiosPrivate, Number(id)).then((data) => {
			if(!data) return;
			setFriend(data);
			setLoading(false);
		});
	}, [id]);

	return <ProfileComponent isUser={false} user={friend} isLoading={loading} />;
};

export default FriendProfileScreen;
