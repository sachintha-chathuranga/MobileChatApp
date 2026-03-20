import {images} from '@/src/assets/images';
import {Colors} from '@/src/constants/theme';
import {Friend} from '@/src/constants/types';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {useRouter} from 'expo-router';
import {useColorScheme} from 'nativewind';
import React, {useCallback, useMemo} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

type FriendCardProps = {
	friend: Friend;
	type?: string;
};
const FriendCard: React.FC<FriendCardProps> = ({friend, type}) => {
	const router = useRouter();
	const {colorScheme} = useColorScheme();
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
	}, []);

	return (
		<TouchableOpacity onPress={handlePress}>
			<View className="flex-row items-center gap-3">
				<Image
					source={friend.profil_pic ? friend.profil_pic : images.noperson}
					style={{width: 45, height: 45, borderRadius: 50}}
				/>
				<View className='flex-row w-full justify-between'>
					<View className="px-2 justify-center">
						<Text className="text-lg text-light-txtcolor-100 font-semibold line-clamp-1 dark:text-dark-txtcolor-100">
							{friend.fname + ' ' + friend.lname}
						</Text>
						{friend.lastMessage && (
							<Text className="text-light-txtcolor-200 line-clamp-1 dark:text-dark-txtcolor-200">
								{friend.lastMessage}
							</Text>
						)}
					</View>
					{!type && (
						<View className="gap-3 justify-end align-bottom">
							<Text className="text-light-txtcolor-200 text-sm dark:text-dark-txtcolor-200">2025/25/6</Text>
							<MaterialIcons
								color={colorScheme === 'dark' ? Colors.dark.txtcolor[200] : Colors.light.txtcolor[200]}
								className="self-end"
								name="circle"
							/>
						</View>
					)}
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default FriendCard;
