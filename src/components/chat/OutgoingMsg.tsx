import React, {memo} from 'react';
import {Text, View} from 'react-native';

type OutgoingMsgProps = {
	msg: string;
};

const OutgoingMsg: React.FC<OutgoingMsgProps> = ({msg}) => {
	return (
		<View className="my-2 flex-auto p-3 rounded-xl rounded-ee-none bg-light-outbg w-fit max-w-72 self-end dark:bg-dark-outbg">
			<Text className="text-light-txtcolor-100 dark:text-dark-txtcolor-100">{msg}</Text>
		</View>
	);
};

export default memo(OutgoingMsg);
