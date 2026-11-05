import FriendCard from '@/src/components/FriendCard';
import SearchBar from '@/src/components/SearchBar';
import useFriends from '@/src/hooks/useFriends';
import React, {useState} from 'react';
import {FlatList, KeyboardAvoidingView, Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const SearchScreen = () => {
	console.log('search Screen render');
	const [index, setindex] = useState(1);
	const [searchInput, setSearchInput] = useState('');
	const {friends, isFetching, hasMore} = useFriends(index, searchInput);
	return (
		<SafeAreaView edges={['top']} className="flex-1 bg-light-bgcolor-100 px-3 pt-5 dark:bg-dark-bgcolor-100">
			<KeyboardAvoidingView
				style={{flex: 1}}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
			>
				<SearchBar value={searchInput} onChangeText={setSearchInput} />
				<FlatList
					data={friends}
					showsVerticalScrollIndicator={false}
					contentInsetAdjustmentBehavior="automatic"
					keyboardShouldPersistTaps="always"
					contentContainerStyle={{
						paddingTop: 10,
					}}
					keyExtractor={(item) => item.user_id.toString()}
					renderItem={({item}) => <FriendCard friend={item} type="normal" />}
					onEndReached={() => {
						if (!isFetching && hasMore) {
							console.log('Bottom touch');
							setindex((prev) => prev + 1);
						}
					}}
					onEndReachedThreshold={0.5}
				/>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default SearchScreen;
