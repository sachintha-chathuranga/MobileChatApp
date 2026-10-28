import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

import {Colors} from '../constants/theme';
import { useColorScheme } from 'nativewind';

const Loading: React.FC<{text?: string}> = ({text}) => {
	const {colorScheme} = useColorScheme();
	return (
		<View
			className="z-10 absolute top-0 bottom-0 left-0 right-0 bg-light-bgcolor-transparent dark:bg-dark-bgcolor-transparent justify-center items-center"
		>
			<ActivityIndicator size={45} color={Colors[colorScheme || 'light'].loading} />
			{text && <Text className="text-light-txtcolor-100 dark:text-dark-txtcolor-100 p-2">{text}...</Text>}
		</View>
	);
};

export default Loading;
