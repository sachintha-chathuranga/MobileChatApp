import {images} from '@/src/assets/images';
import IconCard from '@/src/components/IconCard';
import Loading from '@/src/components/Loading';
import NameInput from '@/src/components/NameInput';
import SubmitButton from '@/src/components/SubmitButton';
import {Colors} from '@/src/constants/theme';
import {useAuth} from '@/src/context/authContext';
import {signUp} from '@/src/services/apiCalls';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import BottomSheet, {BottomSheetBackdrop, BottomSheetView} from '@gorhom/bottom-sheet';
import {useLocalSearchParams} from 'expo-router';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Image, Keyboard, KeyboardAvoidingView, Platform, Pressable, Text, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

const SignUpScreen = () => {
	const [sending, setSending] = useState(false);
	const [input, setInput] = useState('');
	const bottomSheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ['30%'], []);
	const {user_id} = useLocalSearchParams<{user_id: string}>();
	const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
	const [isValid, setIsValid] = useState(false);
	const {signIn} = useAuth();

	const handleSubmit = () => {
		setSending(true);
		signUp(user_id, input)
			.then((data) => {
				if (!data) return;
				signIn(data.user, data.accessToken, data.refreshToken);
			})
			.finally(() => setSending(false));
	};

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
	const handlePresentModalPress = useCallback(() => {
		Keyboard.dismiss();
		bottomSheetRef.current?.expand();
	}, []);

	const handleClosePress = useCallback(() => {
		bottomSheetRef.current?.close();
	}, []);

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
			<SafeAreaView className="flex-1 bg-light-bgcolor-100">
				<KeyboardAvoidingView
					style={{flex: 1}}
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
				>
					{sending && <Loading text="Sending" />}
					<View className={`px-7 flex-1 justify-between mt-10 ${isKeyboardVisible ? 'pb-3' : 'pb-0'}`}>
						<View className="items-center">
							<Text className="text-2xl mb-5 text-light-txtcolor-title ">Profile info</Text>
							<Text className="text-center text-light-txtcolor-200">
								Please provide your name and an optional profile photo
							</Text>
							<Pressable className="py-4" onPress={() => handlePresentModalPress()}>
								<Image source={images.noperson} style={{width: 120, height: 120, borderRadius: 50}} />
							</Pressable>
							<NameInput
								onIputChange={setInput}
								input={input}
								placeholder="Enter your name"
								setValidate={setIsValid}
							/>
						</View>

						<SubmitButton text="Next" disable={!isValid} onSubmit={handleSubmit} />
					</View>
					<BottomSheet
						ref={bottomSheetRef}
						snapPoints={snapPoints}
						index={-1}
						backdropComponent={renderBackdrop}
						enablePanDownToClose={true}
						backgroundStyle={{
							backgroundColor: Colors.light.bgcolor[200],
						}}
						handleIndicatorStyle={{
							backgroundColor: Colors.light.txtcolor[200],
						}}
					>
						<BottomSheetView className="flex-1">
							<View className="flex-row items-center mx-3 pb-3 pt-2">
								<Pressable onPress={handleClosePress}>
									<MaterialIcons color={Colors.light.txtcolor[100]} size={25} name="close" />
								</Pressable>
								<View className="flex-1 mr-6">
									<Text className="text-light-txtcolor-100 self-center text-2xl ">Profile picture</Text>
								</View>
							</View>
							<View className="px-4">
								<IconCard
									iconName="camera-outline"
									title="Camera"
									info=""
									onPress={() => console.log('press')}
								/>
								<IconCard iconName="image-frame" title="Gallery" info="" onPress={() => console.log('press')} />
							</View>
						</BottomSheetView>
					</BottomSheet>
				</KeyboardAvoidingView>
			</SafeAreaView>
		</GestureHandlerRootView>
	);
};

export default SignUpScreen;
