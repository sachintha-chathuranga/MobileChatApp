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

type IncomeMsgProps = {
	isLoading: boolean;
	msg: string;
};

const IncomeMsg: React.FC<IncomeMsgProps> = ({isLoading, msg}) => {
	return (
		<View className="my-2 p-3 self-start rounded-xl rounded-ss-none bg-light-incomebg w-fit max-w-72 dark:bg-dark-incomebg">
			<Text className="text-light-txtcolor-100 dark:text-dark-txtcolor-100">{msg}</Text>
		</View>
	);
};

export default IncomeMsg;
