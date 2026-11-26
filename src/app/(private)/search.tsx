import FriendCard from '@/src/components/FriendCard';
import SearchInputBar from '@/src/components/search/SearchInputBar';
import useFriends from '@/src/hooks/useFriends';
import React, {memo, useEffect, useState} from 'react';
import {FlatList, Keyboard, KeyboardAvoidingView, Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const SearchScreen = () => {
	const [index, setindex] = useState(1);
	const [searchInput, setSearchInput] = useState('');
	const {friends, isFetching, hasMore} = useFriends(index, searchInput);
	const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

	useEffect(() => {
		const showSubscription = Keyboard.addListener('keyboardDidShow', () => setIsKeyboardVisible(true));
		const hideSubscription = Keyboard.addListener('keyboardDidHide', () => setIsKeyboardVisible(false));
		return () => {
			showSubscription.remove();
			hideSubscription.remove();
		};
	}, []);

	return (
		<SafeAreaView className="flex-1 bg-light-bgcolor-100 px-3 pt-5 dark:bg-dark-bgcolor-100">
			<KeyboardAvoidingView
				style={isKeyboardVisible ? {flex: 1} : {flexGrow: 1}}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
			>
				<SearchInputBar value={searchInput} onChangeText={setSearchInput} />
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

export default memo(SearchScreen);
