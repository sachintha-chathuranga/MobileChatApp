import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

import {Colors} from '../constants/theme';
import { useColorScheme } from 'nativewind';

const Loading: React.FC<{text: string}> = ({text}) => {
	const {colorScheme} = useColorScheme();
	return (
		<View
			style={[StyleSheet.absoluteFillObject]}
			className="z-10 bg-light-bgcolor-200 dark:bg-dark-bgcolor-200 justify-center items-center pb-32"
		>
			<ActivityIndicator size={45} color={Colors[colorScheme || 'light'].loading} />
			<Text className="text-light-txtcolor-100 dark:text-dark-txtcolor-100 p-2">{text}...</Text>
		</View>
	);
};

export default Loading;
