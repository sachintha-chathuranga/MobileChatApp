import {sendOTP, signInCall, userUpdateCall, verifyOTP} from '@/src/services/apiCalls';
import {Link, useLocalSearchParams, useRouter} from 'expo-router';
import React, {useEffect, useState} from 'react';
import {Alert, Keyboard, KeyboardAvoidingView, Platform, Pressable, Text, TextInputProps, View} from 'react-native';
import {CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell} from 'react-native-confirmation-code-field';
import {SafeAreaView} from 'react-native-safe-area-context';
import {VerifyType} from '../constants/types';
import {useAuth} from '../context/authContext';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import Loading from './Loading';
import SubmitButton from './SubmitButton';
const CELL_COUNT = 6;

const autoComplete = Platform.select<TextInputProps['autoComplete']>({
	android: 'sms-otp',
	default: 'one-time-code',
});
type VerifyOTPProps = {
	type: VerifyType;
};
const VerifyOTP: React.FC<VerifyOTPProps> = ({type}) => {
	const [verifying, setVerifying] = useState(false);
	const [sending, setSending] = useState(false);
	const {param} = useLocalSearchParams<{param: string}>();
	const [otp, setOtp] = useState('');
	const router = useRouter();
	const ref = useBlurOnFulfill({value: otp, cellCount: CELL_COUNT});
	const [props, getCellOnLayoutHandler] = useClearByFocusCell({value: otp, setValue: setOtp});
	const [isValide, setIsValide] = useState(false);
	const {user, setUser, signIn} = useAuth();
	const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
	const axiosPrivate = useAxiosPrivate();
	const textToShow = type === 'update-mail' ? 'email' : 'phone number';
	const validateInput = (text: string) => {
		text.length === CELL_COUNT ? setIsValide(true) : setIsValide(false);
	};
	const handleInputChange = (text: string) => {
		setOtp(text);
		validateInput(text);
	};
	const handleSubmit = () => {
		setVerifying(true);
		verifyOTP(param, otp)
			.then((verifyRes) => {
				switch (type) {
					case 'sign-in':
						signInCall(verifyRes)
							.then((res) => {
								if (!res) return;
								console.log(res.user.fname);
								if (res.user.fname) return signIn(res.user, res.accessToken, res.refreshToken);
								router.replace({
									pathname: `/signup`,
									params: {
										user_id: res.user.user_id,
									},
								});
							})
							.finally(() => setVerifying(false));
						break;
					case 'update-phone':
						if (!user) return;
						userUpdateCall(axiosPrivate, {phone: verifyRes})
							.then((res) => {
								if (res !== 200) return;
								setUser({...user, phone: verifyRes});
								Alert.alert('Success', 'Your phone number changed succesfully.', [
									{
										text: 'OK',
										onPress: () => router.dismissTo('/(private)/profile'),
									},
								]);
							})
							.finally(() => setVerifying(false));
						break;
					case 'update-mail':
						console.log('On update-mail');
						if (!user) return;
						userUpdateCall(axiosPrivate, {email: param})
							.then((res) => {
								if (res !== 200) return;
								setUser({...user, email: param});
								Alert.alert('Success', 'Your email changed succesfully.', [
									{
										text: 'OK',
										onPress: () => router.dismissTo('/(private)/profile'),
									},
								]);
							})
							.finally(() => setVerifying(false));
						break;
					default:
						break;
				}
			})
			.catch((error) => {
				setOtp('');
			})
			.finally(() => setVerifying(false));
	};
	const resendOTP = () => {
		setSending(true);
		sendOTP(param).then((data) => {
			setSending(false);
			if (data) {
				console.log(data);
			}
		});
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
		<SafeAreaView className="flex-1 bg-light-bgcolor-100 dark:bg-dark-bgcolor-100">
			<KeyboardAvoidingView
				style={{flex: 1}}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
			>
				{(sending || verifying) && <Loading text={`${sending ? 'Sending' : 'Verifying'}`} />}
				<View className={`px-8 flex-1 justify-between mt-10 ${isKeyboardVisible ? 'pb-3' : 'pb-0'}`}>
					<View className="items-center">
						<Text className="text-2xl mb-5 text-light-txtcolor-title dark:text-dark-txtcolor-title">
							Verifying your {textToShow}
						</Text>
						<Text className="text-justify text-light-txtcolor-200 dark:text-dark-txtcolor-200">
							To complete your {textToShow} verification, please enter the 6-digit otp code. We have sent to your{' '}
							{textToShow}
							<Text className="font-semibold text-light-txtcolor-100 dark:text-dark-txtcolor-100"> {param}</Text>
							.
							<Link
								href={`${type === 'sign-in' ? '/sign' : type === 'update-phone' ? '/profile/phone_form/form' : '/profile/email_form'}`}
								className="mt-20"
								dismissTo
							>
								<Text className="font-semibold text-light-txtcolor-secondary dark:text-dark-txtcolor-secondary">
									{' '}
									Wrong {textToShow}?{' '}
								</Text>
							</Link>
						</Text>

						<CodeField
							ref={ref}
							{...props}
							value={otp}
							onChangeText={(text) => handleInputChange(text)}
							cellCount={CELL_COUNT}
							rootStyle={{marginVertical: 30}}
							keyboardType="number-pad"
							textContentType="oneTimeCode"
							autoComplete={autoComplete}
							renderCell={({index, symbol, isFocused}) => (
								<View
									key={index}
									onLayout={getCellOnLayoutHandler(index)}
									className={`border-b-2 w-8 h-8 mx-1 justify-center items-center ${
										isFocused
											? 'border-light-border-primary dark:border-dark-border-primary'
											: 'border-light-border-100 dark:border-dark-border-100'
									}`}
								>
									<Text className="text-lg text-light-txtcolor-100 dark:text-dark-txtcolor-100">
										{symbol || (isFocused ? <Cursor /> : null)}
									</Text>
								</View>
							)}
						/>
						<Pressable disabled={verifying || sending} onPress={resendOTP}>
							<Text className="font-semibold text-light-txtcolor-primary dark:text-dark-txtcolor-primary">
								Didn't receive code?
							</Text>
						</Pressable>
					</View>
					<SubmitButton text="Verify" disable={!isValide} onSubmit={handleSubmit} />
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default VerifyOTP;
