import Card from '@/components/Card';
import SearchButton from '@/components/SearchButton';

import {friends} from '@/constants/data.js';
import {FlatList, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const notifications = ['dsfsd', 'dsfdsf', 'DSfsdf'];
export default function HomeScreen() {
	// const {signOut} = useSession();

	return (
		<SafeAreaView edges={['bottom']} className=" bg-white px-4 flex-1">
			<SearchButton />
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
		</SafeAreaView>
	);
}
