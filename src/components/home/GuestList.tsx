import {Colors} from '@/src/constants/theme';
import {CONSTANT} from '@/src/constants/values';
import useFriends from '@/src/hooks/useFriends';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {useRouter} from 'expo-router';
import React, {useState} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import Loading from '../Loading';
import GuestCard from './GuestCard';

const GuestList = () => {
	const [index, setindex] = useState(1);
	const {friends, isFetching, hasMore} = useFriends(index);
	const router = useRouter();

	return (
		<View className="items-center mb-32">
			{isFetching && <Loading />}
			<Text className="text-2xl text-light-txtcolor-title dark:text-dark-txtcolor-title pb-1">Start chatting</Text>
			<Text className="text-light-txtcolor-100 dark:text-dark-txtcolor-100 text-center px-4 pb-2">
				Chat with your 297 {CONSTANT.appName} contacts, or invite a friend to {CONSTANT.appName}.
			</Text>

			<ScrollView showsHorizontalScrollIndicator={false} horizontal contentContainerClassName="pt-2 gap-2">
				{friends.map((item, index) => {
					return (
						<View key={item.user_id} className={`${index === 0 && 'pl-5'}`}>
							<GuestCard friend={{...item}} />
						</View>
					);
				})}
				<Pressable onPress={() => router.push('/search')} className="justify-center items-center p-2 mr-4">
					<View className="rounded-full bg-light-bgcolor-300 dark:bg-dark-bgcolor-300 p-7">
						<MaterialCommunityIcons size={25} name="chevron-right" color={Colors.light.txtcolor[100]} />
					</View>
					<Text className="text-sm text-light-txtcolor-100 dark:text-dark-txtcolor-100 pt-1">View more</Text>
				</Pressable>
			</ScrollView>
		</View>
	);
};

export default GuestList;
