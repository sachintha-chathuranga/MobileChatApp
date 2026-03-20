import React from 'react';
import {Text, View} from 'react-native';

type Friend = {
	id: number;
	fname: string;
	lname: string;
	lastMessage: string;
	profil_pic: string;
	status: boolean;
};

type OutgoingMsgProps = {
	isLoading: boolean;
	msg: string;
};

const OutgoingMsg: React.FC<OutgoingMsgProps> = ({isLoading, msg}) => {
	return (
		<View className="flex-auto p-3 rounded-2xl rounded-ee-none bg-light-outbg w-fit max-w-72 self-end dark:bg-dark-outbg">
			<Text className="text-light-txtcolor-100 dark:text-dark-txtcolor-100">{msg}</Text>
		</View>
	);
};

export default OutgoingMsg;
