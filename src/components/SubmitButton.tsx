import React from 'react';
import {Pressable, Text} from 'react-native';
type SubmitButtonProps = {
	text: string;
	disable?: boolean;
	onSubmit: () => void;
};
const SubmitButton: React.FC<SubmitButtonProps> = ({text, disable, onSubmit}) => {
	console.log('SubmitButton rendered');
	return (
		<Pressable
			className={`w-full p-3  rounded-full items-center ${!disable ? 'bg-light-bgcolor-primary' : 'bg-light-bgcolor-inactive'}`}
			onPress={onSubmit}
			disabled={disable}
		>
			<Text
				className={`tracking-widest text-lg font-bold ${!disable ? 'text-white' : 'text-light-txtcolor-inactive'}`}
			>
				{text}
			</Text>
		</Pressable>
	);
};

export default SubmitButton;
