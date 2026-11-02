import Loading from '@/src/components/Loading';
import {Colors} from '@/src/constants/theme';
import {UpdateUser} from '@/src/constants/types';
import {useAuth} from '@/src/context/authContext';
import useAxiosPrivate from '@/src/hooks/useAxiosPrivate';
import {userUpdateCall} from '@/src/services/apiCalls';
import {useRouter} from 'expo-router';
import {useColorScheme} from 'nativewind';
import React, {useRef, useState} from 'react';
import {KeyboardAvoidingView, Platform, Text, TextInput, TouchableHighlight, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const NameForm = () => {
	const router = useRouter();
	const {user, setUser} = useAuth();
	const [input, setInput] = useState(user?.fname + ' ' + user?.lname);
	const inputRef = useRef<TextInput>(null);
	const [error, setError] = useState('');
	const {colorScheme} = useColorScheme();
	const axiosPrivate = useAxiosPrivate();
	const [updating, setUpdating] = useState(false);

	const handleSubmit = () => {
		if (!user) return;
		if (!input) {
			setError('Please enter your name');
			return;
		}
		const [fname, lname] = input.split(' ');
		if (fname == user.fname && lname == user.lname) {
			return;
		}
		setUpdating(true);
		const data: UpdateUser = {
			fname,
			lname,
		};
		userUpdateCall(axiosPrivate, data).then((res) => {
			setUpdating(false);
			if (res === 200) {
				setUser({...user, fname, lname});
				router.back();
			}
		});
	};

	const handleInputChange = (value: string) => {
		const spaceCount = (value.match(/ /g) || []).length;

		if (spaceCount > 1) {
			// setInput(prev => prev);
			setError('Please enter only your first name and last name.');
		} else {
			setInput((prev) => (prev = value));
			setError('');
		}
	};

	return (
		<SafeAreaView
			edges={['left', 'right', 'bottom']}
			className="flex-1 bg-light-bgcolor-100 dark:bg-dark-bgcolor-100"
		>
			<KeyboardAvoidingView
				style={{flex: 1}}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 80}
			>
				{updating && <Loading text="Updating..." />}
				<View className="flex-1 justify-between">
					<View className="pt-5 px-7">
						<View
							className={`flex-row items-center gap-2 pl-3 pr-3 py-1 rounded-md border-2 ${
								error ? 'border-red-500' : 'border-light-border-primary dark:border-dark-border-primary'
							}`}
						>
							<TextInput
								ref={inputRef}
								cursorColor={'#4ade80'}
								onChangeText={handleInputChange}
								className="flex-1 text-light-txtcolor-100 dark:text-dark-txtcolor-100"
								value={input}
								placeholder="Enter your name"
								placeholderTextColor={colorScheme === 'dark' ? Colors.dark.inputtxt : Colors.light.inputtxt}
								underlineColorAndroid="transparent"
								autoFocus
							/>
						</View>
						{error && <Text className="text-red-500 text-sm px-1">{error}</Text>}
						<View className="px-1">
							<Text
								className={`${!error && 'mt-3'} text-light-txtcolor-100 text-justify dark:text-dark-txtcolor-100`}
							>
								Please Enter your first name and last name seperate by spacing.
							</Text>
							<Text className="text-light-txtcolor-100 text-justify dark:text-dark-txtcolor-100">
								People will see this name if you interact with them and they don't have you saved as a contact.
							</Text>
						</View>
					</View>
				</View>
				<View className=" my-4 mx-8">
					<TouchableHighlight
						disabled={updating}
						onPress={handleSubmit}
						className="p-3 rounded-full mx-3 bg-light-bgcolor-primary items-center dark:bg-dark-bgcolor-primary"
					>
						<Text className="text-white font-bold">Save</Text>
					</TouchableHighlight>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default NameForm;
