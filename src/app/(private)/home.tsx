import FriendCard from '@/src/components/FriendCard';
import HomeComponant from '@/src/components/Home';
import HomeHeader from '@/src/components/HomeHeader';
import Loading from '@/src/components/Loading';
import SearchButton from '@/src/components/SearchButton';
import useRecentChats from '@/src/hooks/useRecentChats';

import {useState} from 'react';
import {FlatList, View} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

const notifications = ['dsfsd', 'dsfdsf', 'DSfsdf'];
export default function HomeScreen() {
	const [index, setindex] = useState(1);
	console.log('home screen render');
	const {friends, isFetching, hasMore} = useRecentChats(index);

	return (
		<SafeAreaView className=" bg-light-bgcolor-100 flex-1 dark:bg-dark-bgcolor-100">
			<HomeHeader />
			<SearchButton />

			{friends.length === 0 && !isFetching ? (
				<View className="flex-1 justify-center">
					<HomeComponant />
				</View>
			) : (
				<View className="flex-1">
					{isFetching && <Loading text="Loading" />}
					<FlatList
						data={friends}
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{
							paddingVertical: 10,
							paddingHorizontal: 15,
							gap: 20,
						}}
						keyExtractor={(item) => item.user_id.toString()}
						renderItem={({item}) => <FriendCard friend={{...item}} />}
						onEndReached={() => {
							if (!isFetching && hasMore) {
								console.log('Bottom touch');
								setindex((prev) => prev + 1);
							}
						}}
						onEndReachedThreshold={0.5}
					/>
				</View>
			)}
		</SafeAreaView>
	);
}
