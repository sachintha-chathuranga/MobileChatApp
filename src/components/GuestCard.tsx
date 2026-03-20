import {images} from '@/src/assets/images';
import {Friend} from '@/src/constants/types';
import {useRouter} from 'expo-router';
import React, {useMemo} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

type FriendCardProps = {
	friend: Friend;
};
const GuestCard: React.FC<FriendCardProps> = ({friend}) => {
	const router = useRouter();
	const params = useMemo(() => {
		return {
			id: friend.user_id,
			name: friend.fname + ' ' + friend.lname,
			status: friend.status ? 'Online' : 'Offline',
			avatar: friend.profil_pic,
		};
	}, [friend]);
	return (
		<TouchableOpacity
			onPress={() =>
				router.push({
					pathname: '/chat/[id]',
					params: params,
				})
			}
		>
			<View className="justify-center items-center p-2">
				<Image
					source={friend.profil_pic ? friend.profil_pic : images.noperson}
					style={{width: 70, height: 70, borderRadius: 50}}
				/>
				<Text className="text-sm text-light-txtcolor-100 dark:text-dark-txtcolor-100 pt-1">{friend.fname}</Text>
			</View>
		</TouchableOpacity>
	);
};

export default GuestCard;
