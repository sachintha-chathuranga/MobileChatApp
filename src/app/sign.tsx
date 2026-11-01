import {Colors} from '@/src/constants/theme';
import {Country} from '@/src/constants/types';
import {CONSTANT, COUNTRIES} from '@/src/constants/values';
import {sendOTP} from '@/src/services/apiCalls';
import BottomSheet from '@gorhom/bottom-sheet';
import {useRouter} from 'expo-router';
import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, Keyboard, KeyboardAvoidingView, Platform, Pressable, Text, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import CountryDrawer from '../components/CountryDrawer';
import PhoneInput from '../components/PhoneInput';

const SignInScreen = () => {
	const [country, setCountry] = useState<Country | null>(COUNTRIES[0]);
	const [loading, setLoading] = useState(false);
	const [phone, setPhone] = useState('');
	const router = useRouter();
	const [isValide, setIsValide] = useState(false);
	const bottomSheetRef = useRef<BottomSheet>(null);
	const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

	const handleSubmit = () => {
		setLoading(true);
		sendOTP(phone).then((data) => {
			setLoading(false);
			if (data) {
				router.replace({
					pathname: '/verify',
					params: {
						phone: phone,
					},
				});
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
		<GestureHandlerRootView style={{flex: 1}}>
			<SafeAreaView className="flex-1 bg-light-bgcolor-100 dark:bg-dark-bgcolor-100">
				<KeyboardAvoidingView
					style={{flex: 1}}
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
				>
					<View className="px-5 flex-1 justify-between mt-10">
						<View className="items-center">
							<Text className="text-2xl mb-5 text-light-txtcolor-title">Enter your phone number</Text>
							<Text className="text-center text-light-txtcolor-200">
								{CONSTANT.appName} will need to verify your phone number. Carrier charges may apply.{' '}
							</Text>
							<PhoneInput
								phone={phone}
								setPhone={setPhone}
								country={country}
								setIsValide={setIsValide}
								bottomSheetRef={bottomSheetRef}
							/>
							<Text className="text-center text-light-txtcolor-200">
								You must bo{' '}
								<Text className="font-semibold text-light-txtcolor-secondary">at least 16 years old</Text> to
								register. Learn how {CONSTANT.appName} works with the{' '}
								<Text className="font-semibold text-light-txtcolor-secondary">Companies</Text>.
							</Text>
						</View>
						<Pressable
							className={`${isKeyboardVisible ? 'mb-3' : 'mb-0'} w-full p-3  rounded-full items-center ${isValide ? 'bg-light-bgcolor-primary' : 'bg-light-bgcolor-inactive'}`}
							onPress={() => handleSubmit()}
							disabled={!isValide || loading}
						>
							<Text className={`text-lg font-bold ${isValide ? 'text-white' : 'text-light-txtcolor-inactive'}`}>
								{loading ? <ActivityIndicator size={25} color={Colors['dark'].txtcolor[100]} /> : 'Next'}
							</Text>
						</Pressable>
					</View>
					<CountryDrawer bottomSheetRef={bottomSheetRef} setCountry={setCountry} />
				</KeyboardAvoidingView>
			</SafeAreaView>
		</GestureHandlerRootView>
	);
};

export default SignInScreen;
