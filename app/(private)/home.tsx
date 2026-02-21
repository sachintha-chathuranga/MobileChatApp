import {images} from '@/assets/images';
import Card from '@/components/Card';
import SearchButton from '@/components/SearchButton';

import {FlatList, View} from 'react-native';
import {friends} from '@/constants/data.js'

const notifications = ['dsfsd', 'dsfdsf', 'DSfsdf'];
export default function HomeScreen() {
	// const {signOut} = useSession();

	return (
		<View className=" bg-white p-4">
			<SearchButton />

			<FlatList
				data={friends}
				className='pt-5'
				showsVerticalScrollIndicator={false}
				ItemSeparatorComponent={() => <View className="p-3"></View>}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({item}) => <Card friend={{...item}} />}
			/>
		</View>
	);
}
