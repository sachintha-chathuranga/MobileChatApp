import React, {memo} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';

import {useColorScheme} from 'nativewind';
import {Colors} from '../constants/theme';
import {ThemeType} from '../constants/types';

type LoadingProps = {
	text?: string;
	theme?: ThemeType;
};

const Loading: React.FC<LoadingProps> = ({text, theme}) => {
	const {colorScheme} = useColorScheme();
	return (
		<View
			className={`${theme === 'dark' ? 'bg-dark-bgcolor-transparent' : 'bg-light-bgcolor-transparent'} z-10 absolute top-0 bottom-0 left-0 right-0 dark:bg-dark-bgcolor-transparent justify-center items-center`}
		>
			<ActivityIndicator size={45} color={Colors[colorScheme || 'light'].loading} />
			{text && (
				<Text
					className={`${theme === 'dark' ? 'text-dark-txtcolor-100' : 'text-light-txtcolor-100'}  dark:text-dark-txtcolor-100 p-2`}
				>
					{text}...
				</Text>
			)}
		</View>
	);
};

export default memo(Loading);
