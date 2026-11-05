import {Country} from '@/src/constants/types';
import {CONSTANT, COUNTRIES} from '@/src/constants/values';
import {sendOTP} from '@/src/services/apiCalls';
import BottomSheet from '@gorhom/bottom-sheet';
import {useRouter} from 'expo-router';
import React, {useEffect, useRef, useState} from 'react';
import {Keyboard, KeyboardAvoidingView, Platform, Text, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import CountryDrawer from '../components/CountryDrawer';
import Loading from '../components/Loading';
import PhoneInput from '../components/PhoneInput';
import SubmitButton from '../components/SubmitButton';

const SignInScreen = () => {
	console.log('SignIn Screen Rendered!');
	const [country, setCountry] = useState<Country | null>(COUNTRIES[0]);
	const [sending, setSending] = useState(false);
	const [phone, setPhone] = useState('');
	const router = useRouter();
	const [isValide, setIsValide] = useState(false);
	const bottomSheetRef = useRef<BottomSheet>(null);
	const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

	const handleSubmit = () => {
		setSending(true);
		sendOTP(phone)
			.then((data) => {
				if (!data) return;
				router.push({
					pathname: '/verify',
					params: {
						param: phone,
					},
				});
			})
			.finally(() => setSending(false));
	};
	useEffect(() => {
		if (isValide) Keyboard.dismiss();
	}, [isValide]);

	useEffect(() => {
		const showSubscription = Keyboard.addListener('keyboardDidShow', () => setIsKeyboardVisible(true));

		const hideSubscription = Keyboard.addListener('keyboardDidHide', () => setIsKeyboardVisible(false));

		return () => {
			showSubscription.remove();
			hideSubscription.remove();
		};
	}, []);

	return (
		<GestureHandlerRootView style={{flex: 1}}>
			<SafeAreaView className="flex-1 bg-light-bgcolor-100 dark:bg-dark-bgcolor-100">
				<KeyboardAvoidingView
					style={{flex: 1}}
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
				>
					{sending && <Loading text={'Sending'} />}
					<View className={`px-5 flex-1 justify-between mt-10 ${isKeyboardVisible ? 'pb-3' : 'pb-0'}`}>
						<View className="items-center">
							<Text className="text-2xl mb-5 text-light-txtcolor-title dark:text-dark-txtcolor-title">
								Enter your phone number
							</Text>
							<Text className="text-center text-light-txtcolor-200 dark:text-dark-txtcolor-200">
								{CONSTANT.appName} will need to verify your phone number. Carrier charges may apply.{' '}
							</Text>
							<PhoneInput
								phone={phone}
								setPhone={setPhone}
								country={country}
								setIsValide={setIsValide}
								bottomSheetRef={bottomSheetRef}
							/>
							<Text className="text-center text-light-txtcolor-200 dark:text-dark-txtcolor-200">
								You must bo{' '}
								<Text className="font-semibold text-light-txtcolor-secondary dark:text-dark-txtcolor-secondary">
									at least 16 years old
								</Text>{' '}
								to register. Learn how {CONSTANT.appName} works with the{' '}
								<Text className="font-semibold text-light-txtcolor-secondary dark:text-dark-txtcolor-secondary">
									Companies
								</Text>
								.
							</Text>
						</View>
						<SubmitButton text="Next" disable={!isValide} onSubmit={handleSubmit} />
					</View>
					<CountryDrawer bottomSheetRef={bottomSheetRef} setCountry={setCountry} />
				</KeyboardAvoidingView>
			</SafeAreaView>
		</GestureHandlerRootView>
	);
};

export default SignInScreen;
