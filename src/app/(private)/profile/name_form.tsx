import Loading from '@/src/components/Loading';
import NameInput from '@/src/components/NameInput';
import SubmitButton from '@/src/components/SubmitButton';
import {UpdateUser} from '@/src/constants/types';
import {useAuth} from '@/src/context/authContext';
import {useTheme} from '@/src/context/themeContext';
import useAxiosPrivate from '@/src/hooks/useAxiosPrivate';
import {userUpdateCall} from '@/src/services/apiCalls';
import handleError from '@/src/services/errorHandler';
import {useRouter} from 'expo-router';
import React, {useEffect, useState} from 'react';
import {Keyboard, KeyboardAvoidingView, Platform, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const NameForm = () => {
	const router = useRouter();
	const {user, setUser} = useAuth();
	const [input, setInput] = useState(user?.fname + ' ' + user?.lname);
	const axiosPrivate = useAxiosPrivate();
	const [updating, setUpdating] = useState(false);
	const [isValid, setIsValid] = useState(false);
	const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
	const {theme} = useTheme();

	const handleSubmit = () => {
		if (!user) return;
		const [fname, lname] = input.split(' ');
		if (fname == user.fname && lname == user.lname) return;
		console.log(lname);
		setUpdating(true);
		const data: UpdateUser = {
			fname: fname,
			lname: lname ?? '',
		};
		userUpdateCall(axiosPrivate, data)
			.then((res) => {
				setUser({...user, fname: String(data.fname), lname: String(data.lname)});
				router.back();
			})
			.catch((error) => handleError(error, theme))
			.finally(() => setUpdating(false));
	};
	useEffect(() => {
		const showSubscription = Keyboard.addListener('keyboardDidShow', () => setIsKeyboardVisible(true));
		const hideSubscription = Keyboard.addListener('keyboardDidHide', () => setIsKeyboardVisible(false));
		return () => {
			showSubscription.remove();
			hideSubscription.remove();
		};
	}, []);

	return (
		<SafeAreaView edges={['bottom']} className="flex-1 bg-light-bgcolor-100 dark:bg-dark-bgcolor-100">
			<KeyboardAvoidingView
				style={{flex: 1}}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 60}
			>
				{updating && <Loading text="Updating..." />}
				<View className={`px-6 flex-1 justify-between pt-3 ${isKeyboardVisible ? 'pb-10' : 'pb-3'}`}>
					<View>
						<Text className={`pb-3 px-3 text-light-txtcolor-100 text-justify dark:text-dark-txtcolor-200`}>
							Please Enter your first name and last name seperate by spacing.
						</Text>
						<NameInput
							onIputChange={setInput}
							input={input}
							placeholder="Enter your name"
							setValidate={setIsValid}
						/>
						<Text className={`px-3 text-light-txtcolor-100  dark:text-dark-txtcolor-200 text-justify mt-3`}>
							People will see this name if you interact with them and they don't have you saved as a contact.
						</Text>
					</View>
					<SubmitButton text="Update" disable={!isValid} onSubmit={handleSubmit} />
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default NameForm;
