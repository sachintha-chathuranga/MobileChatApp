import {useColorScheme} from 'nativewind';
import React, {useRef, useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import {Colors} from '../constants/theme';

type NameInputProps = {
	onIputChange: (input: string) => void;
	input: string;
	placeholder: string;
	setValidate: (val: boolean) => void;
};
const NameInput: React.FC<NameInputProps> = ({onIputChange, input, placeholder, setValidate}) => {
	const inputRef = useRef(null);
	const [error, setError] = useState('');
	const {colorScheme} = useColorScheme();

	const handleInputChange = (value: string) => {
		const spaceCount = (value.match(/ /g) || []).length;

		if (spaceCount > 2) return setError('Please enter only your first name and last name.');
		if (value.length > 25) return setError('Name must be less than 26 character!');
		onIputChange(value);
		setError('');
		setValidate(6 <= value.length && value.length <= 25);
	};
	return (
		<View className="w-full px-3">
			<View
				className={`px-3 rounded-md border-2 ${
					error ? 'border-red-500' : 'border-light-border-primary dark:border-dark-border-primary'
				}`}
			>
				<TextInput
					ref={inputRef}
					cursorColor={'#4ade80'}
					onChangeText={handleInputChange}
					className="text-light-txtcolor-100 dark:border-dark-txtcolor-100"
					style={{color: colorScheme === 'dark' ? Colors.dark.txtcolor[100] : Colors.light.txtcolor[100]}}
					value={input}
					keyboardAppearance={colorScheme}
					keyboardType="name-phone-pad"
					placeholder={placeholder}
					placeholderTextColor={colorScheme === 'dark' ? Colors.dark.inputtxt : Colors.light.inputtxt}
					underlineColorAndroid="transparent"
					autoFocus
				/>
			</View>
			{error && <Text className="text-red-500 text-sm px-1">{error}</Text>}
		</View>
	);
};

export default NameInput;
