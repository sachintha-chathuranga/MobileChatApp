import {images} from '@/src/assets/images';
import IconCard from '@/src/components/IconCard';
import Loading from '@/src/components/Loading';
import {Colors} from '@/src/constants/theme';
import {useAuth} from '@/src/context/authContext';
import {signUp} from '@/src/services/apiCalls';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import BottomSheet, {BottomSheetBackdrop, BottomSheetView} from '@gorhom/bottom-sheet';
import {useLocalSearchParams} from 'expo-router';
import GraphemeSplitter from 'grapheme-splitter';
import {useColorScheme} from 'nativewind';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {Image, Keyboard, KeyboardAvoidingView, Platform, Pressable, Text, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const splitter = new GraphemeSplitter();

const SignUpScreen = () => {
	const [loading, setLoading] = useState(false);
	const [input, setInput] = useState('');
	const inputRef = useRef<TextInput>(null);
	const {colorScheme} = useColorScheme();
	const bottomSheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ['30%'], []);
	const {user_id} = useLocalSearchParams<{user_id: string}>();
	const {signIn} = useAuth();

	const handleSubmit = () => {
		setLoading(true);
		signUp(user_id, input).then((data) => {
			setLoading(false);
			if (data) {
				signIn(data.user, data.accessToken, data.refreshToken);
			}
		});
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

	return (
		<SafeAreaView className="flex-1 bg-light-bgcolor-100 dark:bg-dark-bgcolor-100">
			<KeyboardAvoidingView
				style={{flex: 1}}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 10}
			>
				{loading && <Loading text={'Saving'} />}
				<View className="px-7 flex-1 justify-between mt-10">
					<View className="items-center">
						<Text className="text-2xl mb-5 text-light-txtcolor-title dark:text-dark-txtcolor-title">
							Profile info
						</Text>
						<Text className="text-center text-light-txtcolor-200 dark:text-dark-txtcolor-200">
							Please provide your name and an optional profile photo
						</Text>
						<Pressable className="pt-4 pb-1" onPress={() => handlePresentModalPress()}>
							<Image source={images.noperson} style={{width: 120, height: 120, borderRadius: 50}} />
						</Pressable>
						<View className="w-full px-5">
							<TextInput
								ref={inputRef}
								cursorColor={'#4ade80'}
								onChangeText={setInput}
								className="text-light-txtcolor-100 dark:text-dark-txtcolor-100 border-b-2 border-light-border-primary dark:border-dark-border-primary"
								value={input}
								placeholder="Enter your name"
								placeholderTextColor={colorScheme === 'dark' ? Colors.dark.inputtxt : Colors.light.inputtxt}
								underlineColorAndroid="transparent"
								autoFocus
							/>
						</View>
					</View>
					<View className="px-3">
						<Pressable
							disabled={!input || loading}
							className={`w-full p-3  rounded-full items-center ${input ? 'bg-light-bgcolor-primary dark:bg-dark-bgcolor-primary ' : 'bg-light-bgcolor-inactive dark:bg-dark-bgcolor-inactive'}`}
							onPress={() => handleSubmit()}
						>
							<Text className="text-white text-base">Next</Text>
						</Pressable>
					</View>
				</View>
				<BottomSheet
					ref={bottomSheetRef}
					snapPoints={snapPoints}
					index={-1}
					backdropComponent={renderBackdrop}
					enablePanDownToClose={true}
					backgroundStyle={{
						backgroundColor: colorScheme === 'dark' ? Colors.dark.bgcolor[200] : Colors.light.bgcolor[200],
					}}
					handleIndicatorStyle={{
						backgroundColor: colorScheme === 'dark' ? Colors.dark.txtcolor[200] : Colors.light.txtcolor[200],
					}}
				>
					<BottomSheetView className="flex-1">
						<View className="flex-row items-center mx-3 pb-3 pt-2">
							<Pressable onPress={handleClosePress}>
								<MaterialIcons
									color={colorScheme === 'dark' ? Colors.dark.txtcolor[100] : Colors.light.txtcolor[100]}
									size={25}
									name="close"
								/>
							</Pressable>
							<View className="flex-1 mr-6">
								<Text className="text-light-txtcolor-100 self-center text-2xl dark:text-dark-txtcolor-100">
									Profile picture
								</Text>
							</View>
						</View>
						<View className="px-4">
							<IconCard iconName="camera-outline" title="Camera" info="" route="/profile" />
							<IconCard iconName="image-frame" title="Gallery" info="" route="/profile" />
						</View>
					</BottomSheetView>
				</BottomSheet>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default SignUpScreen;
