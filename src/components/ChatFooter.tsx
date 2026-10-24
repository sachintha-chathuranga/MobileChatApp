import {Colors} from '@/src/constants/theme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {useColorScheme} from 'nativewind';
import React, {Ref} from 'react';
import {TextInput, TouchableWithoutFeedback, View} from 'react-native';

type InputFieldProps = {
	inputRef: Ref<TextInput> | undefined;
	onInputChange: (text: string) => void;
	onSubmit: () => void;
};

const InputField: React.FC<InputFieldProps> = ({inputRef, onInputChange, onSubmit}) => {
	const {colorScheme} = useColorScheme();
	return (
		<View className=" py-2 px-4 flex-row items-center gap-3 bg-light-bgcolor-100 dark:bg-dark-bgcolor-100">
			<TextInput
				ref={inputRef}
				className="text-light-txtcolor-100 flex-1 bg-light-inputbg px-6 py-4 rounded-full text-base border-none border-transparent dark:bg-dark-inputbg dark:text-dark-txtcolor-100"
				onChangeText={onInputChange}
				placeholder="Search Friends for chat"
				placeholderTextColor={colorScheme === 'dark' ? Colors.dark.inputtxt : Colors.light.inputtxt}
				underlineColorAndroid="transparent"
				// autoFocus
				// keyboardType="alphabetic"
			/>

			<TouchableWithoutFeedback onPress={onSubmit}>
				<View className="flex justify-center items-center rounded-full bg-light-bgcolor-primary p-3 dark:bg-dark-bgcolor-primary">
					<MaterialIcons color={'white'} size={23} name="send" />
				</View>
			</TouchableWithoutFeedback>
		</View>
	);
};

export default InputField;
