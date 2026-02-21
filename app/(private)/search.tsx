import React from 'react';
import {ScrollView, View} from 'react-native';

import {images} from '@/assets/images';
import Card from '@/components/Card';
import {friends} from '@/constants/data.js';
const SearchScreen = () => {
	return (
		<View className="flex-1 bg-white p-4">
			{/* <ScrollView
					showsVerticalScrollIndicator={false}
					contentInsetAdjustmentBehavior="automatic"
					contentContainerStyle={{paddingTop: 20, backgroundColor: '#fff'}}
				>
					<FlatList
						scrollEnabled={false}
						data={friends}
						showsVerticalScrollIndicator={false}
						ItemSeparatorComponent={() => <View className="p-3"></View>}
						keyExtractor={(item) => item.id.toString()}
						renderItem={({item}) => <Card friend={{...item}} />}
					/>
				</ScrollView> */}

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
		</View>
	);
};

export default SearchScreen;
