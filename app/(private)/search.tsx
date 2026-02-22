import React from 'react';

import Card from '@/components/Card';
import {friends} from '@/constants/data.js';
import {SafeAreaView} from 'react-native-safe-area-context';
import { ScrollView, View } from 'react-native';

const SearchScreen = () => {
	return (
		<SafeAreaView edges={['bottom']} className="flex-1 bg-white p-4">
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentInsetAdjustmentBehavior="automatic"
				contentContainerStyle={{paddingTop: 5, backgroundColor: '#fff'}}
			>
				{friends.map((item, index) => (
					<View key={item.id} className="py-3">
						<Card friend={item} />
					</View>
				))}
			</ScrollView>
		</SafeAreaView>
	);
};

export default SearchScreen;
