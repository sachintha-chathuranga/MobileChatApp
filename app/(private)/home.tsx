import Card from '@/components/Card';
import SearchButton from '@/components/SearchButton';
import {useColorScheme} from 'nativewind';

import {friends} from '@/constants/data.js';
import {FlatList, Switch, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const notifications = ['dsfsd', 'dsfdsf', 'DSfsdf'];
export default function HomeScreen() {
	// const {signOut} = useSession();
	const {colorScheme, toggleColorScheme} = useColorScheme();
	
	return (
		<SafeAreaView edges={['bottom']} className=" bg-light-bgcolor-100 px-4 flex-1 dark:bg-dark-bgcolor-100">
		
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
