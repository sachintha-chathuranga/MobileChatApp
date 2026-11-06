import React, {memo} from 'react';
import {Text, View} from 'react-native';

type IncomeMsgProps = {
	msg: string;
};

const IncomeMsg: React.FC<IncomeMsgProps> = ({msg}) => {
	console.log('IncomeMsg Rendered!');
	return (
		<View className="my-2 p-3 self-start rounded-xl rounded-ss-none bg-light-incomebg w-fit max-w-72 dark:bg-dark-incomebg">
			<Text className="text-light-txtcolor-100 dark:text-dark-txtcolor-100">{msg}</Text>
		</View>
	);
};

export default memo(IncomeMsg);
