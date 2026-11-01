import {Colors} from '@/src/constants/theme';
import {sendOTP, signInCall, userUpdateCall, verifyOTP} from '@/src/services/apiCalls';
import {Link, useLocalSearchParams, useRouter} from 'expo-router';
import React, {useEffect, useState} from 'react';
import {
	ActivityIndicator,
	Alert,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	Pressable,
	Text,
	TextInputProps,
	View,
} from 'react-native';
import {CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell} from 'react-native-confirmation-code-field';
import {SafeAreaView} from 'react-native-safe-area-context';
import {UpdateUser} from '../constants/types';
import {useAuth} from '../context/authContext';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import Loading from './Loading';
const CELL_COUNT = 6;

const autoComplete = Platform.select<TextInputProps['autoComplete']>({
	android: 'sms-otp',
	default: 'one-time-code',
});
type VerifyOTPProps = {
	type: string;
};
const VerifyOTP: React.FC<VerifyOTPProps> = ({type}) => {
	const [verifying, setVerifying] = useState(false);
	const [sending, setSending] = useState(false);
	const {phone} = useLocalSearchParams<{phone: string}>();
	const [otp, setOtp] = useState('');
	const router = useRouter();
	const ref = useBlurOnFulfill({value: otp, cellCount: CELL_COUNT});
	const [props, getCellOnLayoutHandler] = useClearByFocusCell({value: otp, setValue: setOtp});
	const [isValide, setIsValide] = useState(false);
	const {user, setUser, signIn} = useAuth();
	const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
	const axiosPrivate = useAxiosPrivate();

	const validateInput = (text: string) => {
		text.length === CELL_COUNT ? setIsValide(true) : setIsValide(false);
	};
	const handleInputChange = (text: string) => {
		setOtp(text);
		validateInput(text);
	};
	const handleSubmit = () => {
		setVerifying(true);
		verifyOTP(phone, otp)
			.then((data) => {
				console.log(type);
				console.log(data);
				if (type === 'sign-in') {
					signInCall(data).then((res) => {
						console.log(res);
						if (res) {
							if (res.user.fname) {
								signIn(res.user, res.accessToken, res.refreshToken);
							} else {
								router.replace(`/signup/${res.user.user_id}`);
							}
						}
					});
				} else if (type === 'update-phone') {
					if (!user) return;
					console.log('update-phone block');
					console.log(data);
					const updateValues: UpdateUser = {
						phone: data,
					};
					userUpdateCall(axiosPrivate, updateValues).then((res) => {
						if (res === 200) {
							setUser({...user, phone: data});
							Alert.alert('Success', 'Your phone number changed succesfully.', [
								{
									text: 'OK',
									onPress: () => router.dismissTo('/(private)/profile'),
								},
							]);
						}
					});
				}
			})
			.catch((error) => {
				setOtp('');
			})
			.finally(() => setVerifying(false));
	};
	const resendOTP = () => {
		setSending(true);
		sendOTP(phone).then((data) => {
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
				<View className="px-5 flex-1 justify-between mt-10">
					<View className="items-center">
						<Text className="text-2xl mb-5 text-light-txtcolor-title">Verifying your number</Text>
						<Text className="text-center text-light-txtcolor-200">
							To complete your phone number verification, please enter the 6-digit otp code. We have sent you an
							SMS with a code to
							<Text className="font-semibold text-light-txtcolor-100"> {phone}</Text>.{' '}
							<Link
								href={`${type === 'sign-in' ? '/sign' : '/(private)/profile/phone_form/form'}`}
								className="mt-20"
								replace
							>
								<Text className="font-semibold text-light-txtcolor-secondary"> Wrong number? </Text>
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
										isFocused ? 'border-light-border-primary' : 'border-light-border-100 '
									}`}
								>
									<Text className="text-lg text-light-txtcolor-100">
										{symbol || (isFocused ? <Cursor /> : null)}
									</Text>
								</View>
							)}
						/>
						<Pressable disabled={verifying || sending} onPress={resendOTP}>
							<Text className="font-semibold text-light-txtcolor-primary">Didn't receive code?</Text>
						</Pressable>
					</View>
					<Pressable
						disabled={!isValide || verifying || sending}
						className={`${isKeyboardVisible ? 'mb-3' : 'mb-0'} w-full p-3  rounded-full items-center ${isValide ? 'bg-light-bgcolor-primary' : 'bg-light-bgcolor-inactive'}`}
						onPress={handleSubmit}
					>
						<Text className={`text-lg font-bold ${isValide ? 'text-white' : 'text-light-txtcolor-inactive'}`}>
							{verifying ? <ActivityIndicator size={25} color={Colors['dark'].txtcolor[100]} /> : 'Verify'}
						</Text>
					</Pressable>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default VerifyOTP;
