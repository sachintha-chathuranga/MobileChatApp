import {images} from '@/src/assets/images';
import {Friend, Message} from '@/src/constants/types';
import {useRouter} from 'expo-router';
import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {formatDateTime} from '../services/formatter';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type FriendCardProps = {
	friend: Friend;
	type?: string;
	notifications?: Message[];
	isSelect?: boolean;
	handleLongPress?: () => void
};
const FriendCard: React.FC<FriendCardProps> = ({friend, type, notifications, isSelect, handleLongPress}) => {
	const [notification, setNotification] = useState<Message[]>([]);
	const router = useRouter();

	useEffect(() => {
		if (!notifications) return;
		setNotification(notifications.filter((obj) => obj.sender_id === friend.user_id));
	}, [notifications, friend]);

	const masgDate = useMemo(() => {
		if (notification.length === 0) {
			return formatDateTime(friend.lastMessageTime);
		} else {
			return formatDateTime(notification[notification.length - 1].createdAt);
		}
	}, [notification, friend]);

	const params = useMemo(() => {
		return {
			id: friend.user_id,
			name: friend.fname + ' ' + friend.lname,
			status: friend.status ? 'Online' : 'Offline',
			avatar: friend.profil_pic,
		};
	}, [friend]);

	const handlePress = useCallback(() => {
		router.push({
			pathname: '/chat/[id]',
			params: params,
		});
	}, [params]);

	return (
		<TouchableOpacity
			className={`${isSelect ? 'bg-green-100 dark:bg-green-900' : ''}`}
			onLongPress={handleLongPress}
			onPress={handlePress}
		>
			<View className="flex-row items-center gap-2">
				<Image
					source={friend.profil_pic ? {uri: friend.profil_pic} : images.noperson}
					style={{width: 50, height: 50, borderRadius: 50}}
				/>
				<View className="flex-1 flex-row justify-between">
					<View className="px-2 justify-center">
						<Text className="text-lg text-light-txtcolor-100 font-semibold line-clamp-1 dark:text-dark-txtcolor-100">
							{friend.fname + ' ' + friend.lname}
						</Text>
						{!type && (
							<Text className="text-light-txtcolor-200 line-clamp-1 dark:text-dark-txtcolor-200">
								{notification.length === 0
									? friend.lastMessage
										? friend.lastMessage
										: 'No any messages yet!'
									: notification[notification.length - 1].message}
							</Text>
						)}
					</View>
					{!type && (
						<View className="gap-1">
							<Text className="text-light-txtcolor-200 text-sm dark:text-dark-txtcolor-200 self-start mt-2">
								{masgDate}
							</Text>

							{notification.length !== 0 && (
								<View className="self-end rounded-full bg-light-bgcolor-primary justify-center items-center w-6 h-6 ">
									<Text className="text-white text-sm text-center">{notification.length}</Text>
								</View>
							)}
						</View>
					)}
				</View>
			</View>
			{isSelect && <MaterialIcons name="check" size={22} color="green" />}
		</TouchableOpacity>
	);
};

export default memo(FriendCard);
