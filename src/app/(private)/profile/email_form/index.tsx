import Loading from '@/src/components/Loading';
import SubmitButton from '@/src/components/SubmitButton';
import {Colors} from '@/src/constants/theme';
import {useAuth} from '@/src/context/authContext';
import {useTheme} from '@/src/context/themeContext';
import useAxiosPrivate from '@/src/hooks/useAxiosPrivate';
import {checkEmail, sendEmailOTP} from '@/src/services/apiCalls';
import handleError from '@/src/services/errorHandler';
import {useRouter} from 'expo-router';
import {useColorScheme} from 'nativewind';
import React, {memo, useEffect, useState} from 'react';
import {
	Alert,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const hostnames = [
	{
		id: 1,
		name: '@gmail.com',
	},
	{
		id: 2,
		name: '@outlook.com',
	},
	{
		id: 3,
		name: '@hotmail.com',
	},
	{
		id: 4,
		name: '@live.com',
	},
	{
		id: 5,
		name: '@msn.com',
	},
];

const ChangeEmailScreen = () => {
	const router = useRouter();
	const {colorScheme} = useColorScheme();
	const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
	const [sending, setSending] = useState(false);
	const [checking, setChecking] = useState(false);
	const [isValid, setIsValid] = useState(false);
	const [error, setError] = useState('');
	const {user} = useAuth();
	const [emailInput, setInput] = useState(user?.email ?? '');
	const axiosPrivate = useAxiosPrivate();
	const {theme} = useTheme();

	const validateEmail = (email: string): boolean => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email.trim());
	};
	const handleInputChange = (value: string) => {
		const sanitize = value.toLowerCase().trim();
		setInput(sanitize);
		setIsValid(validateEmail(sanitize));
	};
	const addHostName = (host: string) => {
		setInput((prev) => {
			let newValue;
			if (prev.includes('@')) {
				newValue = prev.replace(/@.*/, host);
			} else {
				newValue = prev + host;
			}
			setIsValid(validateEmail(newValue));
			return newValue;
		});
	};
	const handleSubmit = () => {
		if (!isValid) return setError('Please enter a valid email address');
		if (emailInput === user?.phone) return Alert.alert('Message', 'Please Enter your new email address.');

		setChecking(true);
		checkEmail(axiosPrivate, emailInput)
			.then((checkRes) => {
				setSending(true);
				sendEmailOTP(emailInput)
					.then((res) => {
						router.replace({
							pathname: '/profile/email_form/verify_screen',
							params: {
								param: emailInput,
							},
						});
					})
					.catch((error) => handleError(error, theme))
					.finally(() => setSending(false));
			})
			.catch((error) => handleError(error, theme))
			.finally(() => setChecking(false));
		// router.push('/profile/email_form/verify_screen');
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
				{(checking || sending) && <Loading text={`${checking ? 'Cheking' : 'Sending'}`} />}
				<View className={`flex-1 justify-between px-8 ${isKeyboardVisible ? 'pb-10' : 'pb-3'}`}>
					<View className="gap-5">
						<Text className="text-justify text-light-txtcolor-100 dark:text-dark-txtcolor-200 ">
							Email helps us verify your account or reach you in case of security or support issues. Your email
							address won't be visible to others.
						</Text>
						<View>
							<View
								className={`mx-2 px-2 rounded-md border-2 ${
									error ? 'border-red-500' : 'border-light-border-primary dark:border-dark-border-primary'
								}`}
							>
								<TextInput
									cursorColor={'#4ade80'}
									onChangeText={handleInputChange}
									className={`text-light-txtcolor-100 dark:text-dark-txtcolor-100 text-base`}
									value={emailInput}
									underlineColorAndroid="transparent"
									autoFocus
									placeholder="Email"
									inputMode="email"
									keyboardType="email-address"
									autoComplete="email"
									placeholderTextColor={colorScheme === 'dark' ? Colors.dark.inputtxt : Colors.light.inputtxt}
								/>
							</View>
							{error && <Text className="text-red-500 text-sm px-1">{error}</Text>}
							<ScrollView
								aria-hidden={!emailInput}
								automaticallyAdjustKeyboardInsets
								keyboardShouldPersistTaps="always"
								showsHorizontalScrollIndicator={false}
								horizontal
								className="pt-2"
							>
								{hostnames.map((item) => (
									<TouchableOpacity
										key={item.id}
										className="mr-2 py-2 px-3 border rounded-full border-light-border-100 dark:border-dark-border-100"
										onPress={() => addHostName(item.name)}
									>
										<Text className="font-semibold text-light-txtcolor-200 dark:text-dark-txtcolor-200">
											{item.name}
										</Text>
									</TouchableOpacity>
								))}
							</ScrollView>
						</View>
					</View>

					<SubmitButton text="Submit" disable={!isValid} onSubmit={handleSubmit} />
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default memo(ChangeEmailScreen);
