import Card from '@/components/Card';
import SearchButton from '@/components/SearchButton';
import { Friend } from '@/constants/types';
import {useColorScheme} from 'nativewind';

import {useState} from 'react';
import {FlatList, View} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

const notifications = ['dsfsd', 'dsfdsf', 'DSfsdf'];
export default function HomeScreen() {
	const [friends, setFriends] = useState<Friend[]>([]);

	return (
		<SafeAreaView edges={['bottom']} className=" bg-light-bgcolor-100 px-4 flex-1 dark:bg-dark-bgcolor-100">
			<SearchButton />
			{friends.length === 0 ? (<View></View>): (

				<FlatList
					data={friends}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{
						paddingVertical: 10,
						gap: 20,
					}}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({item}) => <Card friend={{...item}} />}
				/>
			)}
		</SafeAreaView>
	);
}
