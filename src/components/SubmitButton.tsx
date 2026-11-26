import React, {memo} from 'react';
import {Pressable, Text} from 'react-native';
type SubmitButtonProps = {
	text: string;
	disable?: boolean;
	onSubmit: () => void;
};
const SubmitButton: React.FC<SubmitButtonProps> = ({text, disable, onSubmit}) => {
	return (
		<Pressable
			className={`w-full p-3  rounded-full items-center ${!disable ? 'bg-light-bgcolor-primary dark:bg-dark-bgcolor-primary' : 'bg-light-bgcolor-inactive dark:bg-dark-bgcolor-inactive'}`}
			onPress={onSubmit}
			disabled={disable}
		>
			<Text
				className={`tracking-widest text-lg font-bold ${!disable ? 'text-light-txtcolor-active dark:text-dark-txtcolor-active' : 'text-light-txtcolor-inactive dark:text-dark-txtcolor-inactive'}`}
			>
				{text}
			</Text>
		</Pressable>
	);
};

export default memo(SubmitButton);
