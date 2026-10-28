import {Colors} from '@/src/constants/theme';
import {useAuth} from '@/src/context/authContext';
import {sendOTP, verifyOTP} from '@/src/services/apiCalls';
import {Link, useLocalSearchParams, useRouter} from 'expo-router';
import React, {useState} from 'react';
import {ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, Text, TextInputProps, View} from 'react-native';
import {CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell} from 'react-native-confirmation-code-field';
import {SafeAreaView} from 'react-native-safe-area-context';
const CELL_COUNT = 6;
const autoComplete = Platform.select<TextInputProps['autoComplete']>({
	android: 'sms-otp',
	default: 'one-time-code',
});
const VerificationScreen = () => {
	const [loading, setLoading] = useState(false);
	const [sending, setSending] = useState(false);
	const {phone} = useLocalSearchParams<{phone: string}>();
	const [otp, setOtp] = useState('');
	const router = useRouter();
	const ref = useBlurOnFulfill({value: otp, cellCount: CELL_COUNT});
	const [props, getCellOnLayoutHandler] = useClearByFocusCell({value: otp, setValue: setOtp});
	const [isValide, setIsValide] = useState(false);
	const {signIn} = useAuth();

	const validateInput = (text: string) => {
		text.length === CELL_COUNT ? setIsValide(true) : setIsValide(false);
	};
	const handleInputChange = (text: string) => {
		setOtp(text);
		validateInput(text);
	};
	const handleSubmit = () => {
		setLoading(true);
		verifyOTP(phone, otp)
			.then((data) => {
				if (data.user.fname) {
					signIn(data.user, data.accessToken, data.refreshToken);
				} else {
					router.replace(`/signup/${data.user.user_id}`);
				}
			})
			.catch((error) => {
				setOtp('');
			})
			.finally(() => setLoading(false));
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
	return (
		<SafeAreaView className="flex-1 bg-light-bgcolor-100">
			<KeyboardAvoidingView
				style={{flex: 1}}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 10}
			>
				<View className="px-5 flex-1 justify-between mt-10">
					<View className="items-center">
						<Text className="text-2xl mb-5 text-light-txtcolor-title">Verifying your number</Text>
						<Text className="text-center text-light-txtcolor-200">
							To complete your phone number verification, please enter the 6-digit otp code. We have sent you an
							SMS with a code to
							<Text className="font-semibold text-light-txtcolor-100"> {phone}</Text>.{' '}
							<Link href={'./../sign'} className="mt-20" replace>
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
							autoFocus
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
						<Pressable disabled={loading} onPress={resendOTP}>
							<Text className="font-semibold text-light-txtcolor-primary">Didn't receive code?</Text>
						</Pressable>
					</View>
					<Pressable
						disabled={!isValide || loading}
						className={`w-full p-3  rounded-full items-center ${isValide ? 'bg-light-bgcolor-primary' : 'bg-light-bgcolor-inactive'}`}
						onPress={handleSubmit}
					>
						<Text className="text-white text-base">
							{loading || sending ? (
								<ActivityIndicator size={25} color={Colors['dark'].txtcolor[100]} />
							) : (
								'Verify'
							)}
						</Text>
					</Pressable>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default VerificationScreen;
