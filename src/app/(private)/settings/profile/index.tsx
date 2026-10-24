import {images} from '@/src/assets/images';
import IconCard from '@/src/components/IconCard';
import {Colors} from '@/src/constants/theme';
import {useAuth} from '@/src/context/authContext';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import BottomSheet, {BottomSheetBackdrop, BottomSheetView} from '@gorhom/bottom-sheet';
import {useColorScheme} from 'nativewind';

import React, {useCallback, useMemo, useRef} from 'react';
import {Image, Pressable, Text, TouchableHighlight, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const ProfileScreen = () => {
	const bottomSheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ['30%'], []);
	const {colorScheme} = useColorScheme();
	const {user} = useAuth();

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
		bottomSheetRef.current?.expand();
	}, []);

	const handleClosePress = useCallback(() => {
		bottomSheetRef.current?.close();
	}, []);
	return (
		<SafeAreaView edges={['bottom']} className="flex-1 bg-light-bgcolor-100 dark:bg-dark-bgcolor-100">
			<View className="items-center p-4 pt-6 gap-6">
				<Pressable onPress={() => handlePresentModalPress()}>
					<Image source={images.noperson} style={{width: 160, height: 160, borderRadius: 50}} />
				</Pressable>
				<TouchableHighlight
					activeOpacity={0.6}
					underlayColor={colorScheme === 'dark' ? Colors.dark.underlay.primary : Colors.light.underlay.primary}
					className="rounded-3xl py-2 px-5 "
					onPress={() => handlePresentModalPress()}
				>
					<Text className="text-light-txtcolor-primary font-semibold dark:text-dark-txtcolor-primary">Edit</Text>
				</TouchableHighlight>
			</View>

			<IconCard
				iconName="account-outline"
				title="Name"
				info={user ? user?.fname + ' ' + (user?.lname ? user.lname : "") : ''}
				route="/settings/profile/name_form"
			/>
			<IconCard
				iconName="information-variant-circle-outline"
				title="About"
				info={user ? user?.about : ''}
				route="/settings/profile/about_form"
			/>
			<IconCard
				iconName="phone-outline"
				title="Phone"
				info={user ? user?.phone : ''}
				route="/settings/profile/phone_form/first_screen"
			/>
			<IconCard
				iconName="email-outline"
				title="Email"
				info={user ? user?.email : ''}
				route="/settings/profile/email_form/first_screen"
			/>

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
						<IconCard iconName="camera-outline" title="Camera" info="" route="/settings/profile" />
						<IconCard iconName="image-frame" title="Gallery" info="" route="/settings/profile" />
					</View>
				</BottomSheetView>
			</BottomSheet>
		</SafeAreaView>
	);
};

export default ProfileScreen;
