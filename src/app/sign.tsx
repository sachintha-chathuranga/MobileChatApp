import {Colors} from '@/src/constants/theme';
import {Country} from '@/src/constants/types';
import {CONSTANT, COUNTRIES} from '@/src/constants/values';
import {sendOTP} from '@/src/services/apiCalls';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import BottomSheet, {BottomSheetBackdrop, BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {useRouter} from 'expo-router';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
	ActivityIndicator,
	Keyboard,
	KeyboardAvoidingView,
	Linking,
	Platform,
	Pressable,
	Text,
	View,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import MaskInput from 'react-native-mask-input';
import {SafeAreaView} from 'react-native-safe-area-context';

const SignInScreen = () => {
	const [loading, setLoading] = useState(false);
	const [phone, setPhone] = useState('');
	const router = useRouter();
	const [isValide, setIsValide] = useState(false);
	const [country, setCountry] = useState<Country | null>(COUNTRIES[0]);
	const bottomSheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ['30%', '50%'], []);

	const renderBackdrop = useCallback(
		(props: any) => (
			<BottomSheetBackdrop
				{...props}
				disappearsOnIndex={-1}
				appearsOnIndex={0}
				pressBehavior="close" // 👈 THIS closes on outside press
			/>
		),
		[]
	);
	const handleSubmit = () => {
		setLoading(true);
		sendOTP(phone).then((data) => {
			setLoading(false);
			if (data) {
				router.replace(`/verify/${phone}`);
			}
		});
	};
	const validate = (input: string) => {
		input.length === 9 ? setIsValide(true) : setIsValide(true);
	};
	const handlePresentModalPress = useCallback(() => {
		Keyboard.dismiss();
		bottomSheetRef.current?.expand();
	}, []);

	const handleClosePress = useCallback(() => {
		bottomSheetRef.current?.close();
	}, []);

	const openLink = () => {
		Linking.openURL('https://galaxies.dev');
	};
	return (
		<GestureHandlerRootView style={{flex: 1}}>
			<SafeAreaView className="flex-1 bg-light-bgcolor-100">
				<KeyboardAvoidingView
					style={{flex: 1}}
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 10}
				>
					<View className="px-5 flex-1 justify-between mt-10">
						<View className="items-center">
							<Text className="text-2xl mb-5 text-light-txtcolor-title">Enter your phone number</Text>
							<Text className="text-center text-light-txtcolor-200">
								{CONSTANT.appName} will need to verify your phone number. Carrier charges may apply.{' '}
							</Text>
							<View className=" rounded-md p-4 my-5 gap-3">
								<View className="mx-6 rounded-md border border-light-border-100 p-3 pl-3">
									<Pressable
										className=" w-full flex-row justify-between items-cente"
										onPress={() => handlePresentModalPress()}
									>
										<Text className="text-base text-black">
											{country ? `${country.flag} ${country.name}` : 'Select country'}
										</Text>
										<MaterialCommunityIcons
											size={20}
											name="chevron-right"
											color={Colors.light.txtcolor[100]}
										/>
									</Pressable>
								</View>
								<MaskInput
									className="text-light-txtcolor-100 text-lg mx-6 rounded-md border border-light-border-100 p-2 pl-3"
									value={phone}
									onChangeText={(masked, unmasked) => {
										setPhone(masked);
										validate(unmasked);
									}}
									mask={country?.mask ?? [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
									keyboardType="phone-pad"
									autoFocus
								/>
							</View>
							<Text className="text-center text-light-txtcolor-200">
								You must bo{' '}
								<Text className="font-semibold text-light-txtcolor-secondary">at least 16 years old</Text> to
								register. Learn how {CONSTANT.appName} works with the{' '}
								<Text className="font-semibold text-light-txtcolor-secondary">Companies</Text>.
							</Text>
						</View>
						<Pressable
							className={`w-full p-3  rounded-full items-center ${isValide ? 'bg-light-bgcolor-primary' : 'bg-light-bgcolor-inactive'}`}
							onPress={() => handleSubmit()}
							disabled={!isValide || loading}
						>
							<Text className={`text-lg font-bold ${isValide ? 'text-white' : 'text-light-txtcolor-inactive'}`}>
								{loading ? <ActivityIndicator size={25} color={Colors['dark'].txtcolor[100]} /> : 'Next'}
							</Text>
						</Pressable>
					</View>
					<BottomSheet
						ref={bottomSheetRef}
						snapPoints={snapPoints}
						index={-1}
						backdropComponent={renderBackdrop}
						enablePanDownToClose={true}
						enableDynamicSizing={false}
						backgroundStyle={{
							backgroundColor: Colors.light.bgcolor[200],
						}}
						handleIndicatorStyle={{
							backgroundColor: Colors.light.txtcolor[200],
						}}
						keyboardBehavior="extend"
					>
						<BottomSheetScrollView>
							{COUNTRIES.map((item) => (
								<Pressable
									key={item.id}
									className="text-light-txtcolor-100 flex-row items-center gap-4 px-4 py-3 border-b border-light-border-100"
									onPress={() => {
										setCountry(item);
										handleClosePress();
									}}
								>
									<Text className="text-lg">{item.flag}</Text>
									<Text className="text-base text-light-txtcolor-100">
										{item.name} ({item.code})
									</Text>
								</Pressable>
							))}
						</BottomSheetScrollView>
					</BottomSheet>
				</KeyboardAvoidingView>
			</SafeAreaView>
		</GestureHandlerRootView>
	);
};

export default SignInScreen;
