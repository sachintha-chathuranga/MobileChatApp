import {images} from '@/assets/images';
import ImagePickDrawer from '@/src/components/drawer/ImagePickDrawer';
import Loading from '@/src/components/Loading';
import NameInput from '@/src/components/NameInput';
import SubmitButton from '@/src/components/SubmitButton';
import {useAuth} from '@/src/context/authContext';
import {useTheme} from '@/src/context/themeContext';
import {signUp} from '@/src/services/apiCalls';
import handleError from '@/src/services/errorHandler';
import BottomSheet from '@gorhom/bottom-sheet';
import {useLocalSearchParams} from 'expo-router';
import {useEffect, useRef, useState} from 'react';
import {Image, Keyboard, KeyboardAvoidingView, Platform, Pressable, Text, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

const SignUpScreen = () => {
	const [sending, setSending] = useState(false);
	const [input, setInput] = useState('');
	const bottomSheetRef = useRef<BottomSheet>(null);
	const {user_id, img_uri} = useLocalSearchParams<{user_id?: string; img_uri?: string}>();
	const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
	const [isValid, setIsValid] = useState(false);
	const {signIn} = useAuth();
	const [userId, setuserId] = useState(0);
	const {theme} = useTheme();

	useEffect(() => {
		if (user_id) {
			setuserId(Number(user_id));
		}
	}, []);

	const handleSubmit = () => {
		if (!userId) return;
		setSending(true);
		signUp(userId, input.trim(), img_uri)
			.then((res) => {
				signIn(res.data.user, res.data.accessToken, res.data.refreshToken);
			})
			.catch((error) => handleError(error, theme))
			.finally(() => setSending(false));
	};

	const handlePresentModalPress = () => {
		if (isKeyboardVisible) return Keyboard.dismiss();
		bottomSheetRef.current?.expand();
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
					style={isKeyboardVisible ? {flex: 1, paddingBottom: 10} : {flexGrow: 1, paddingBottom: 20}}
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
				>
					{sending && <Loading text="Sending" />}
					<View className={`px-6 flex-1 justify-between mt-10`}>
						<View className="items-center">
							<Text className="text-2xl mb-5 text-light-txtcolor-title dark:text-dark-txtcolor-title">
								Profile info
							</Text>
							<Text className="text-center text-light-txtcolor-200 dark:text-dark-txtcolor-200">
								Please provide your name and an optional profile photo
							</Text>
							<Pressable className="py-4" onPress={handlePresentModalPress}>
								<Image
									source={img_uri ? {uri: img_uri} : images.noperson}
									style={{width: 120, height: 120, borderRadius: 100}}
								/>
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
					<ImagePickDrawer
						imageExist={Boolean(img_uri)}
						redirectPath={'/signup/crop_image'}
						dissmissPath={'/signup'}
						snapPoints={['28%']}
						bottomSheetRef={bottomSheetRef}
					/>
				</KeyboardAvoidingView>
			</SafeAreaView>
		</GestureHandlerRootView>
	);
};

export default SignUpScreen;
