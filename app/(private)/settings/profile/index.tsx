import {images} from '@/assets/images';
import IconCard from '@/components/IconCard';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import BottomSheet, {BottomSheetBackdrop, BottomSheetView} from '@gorhom/bottom-sheet';

import React, {useCallback, useMemo, useRef} from 'react';
import {Image, Pressable, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const ProfileScreen = () => {
	const bottomSheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ['30%'], []);
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
		<SafeAreaView edges={['bottom']} className="flex-1 bg-white">
			<View className="items-center p-4 pt-6 gap-6">
				<Pressable onPress={() => handlePresentModalPress()}>
					<Image source={images.noperson} style={{width: 160, height: 160, borderRadius: 50}} />
				</Pressable>
				<TouchableHighlight
					activeOpacity={0.6}
					underlayColor="#bbf7d0"
					className="rounded-3xl py-2 px-5"
					onPress={() => handlePresentModalPress()}
				>
					<Text className="text-green-600 font-semibold">Edit</Text>
				</TouchableHighlight>
			</View>

			<IconCard
				iconName="account-outline"
				title="Name"
				info="sachintha chathuranga"
				route="/settings/profile/name_form"
			></IconCard>
			<IconCard
				iconName="information-variant-circle-outline"
				title="About"
				info="Free to chat"
				route="/settings/profile/about_form"
			/>
			<IconCard
				iconName="phone-outline"
				title="Phone"
				info="+94719057364"
				route="/settings/profile/phone_form/first_screen"
			/>
			<IconCard
				iconName="email-outline"
				title="Email"
				info="sachintha.financial@gmail.com"
				route="/settings/profile/email_form/first_screen"
			/>

			<BottomSheet
				ref={bottomSheetRef}
				snapPoints={snapPoints}
				index={-1}
				backdropComponent={renderBackdrop}
				enablePanDownToClose={true}
			>
				<BottomSheetView style={styles.contentContainer}>
					<View className="flex-row items-center mx-3 pb-3 pt-2">
						<Pressable onPress={handleClosePress}>
							<MaterialIcons size={25} name="close" />
						</Pressable>
						<View className="flex-1 mr-6">
							<Text className="self-center text-2xl">Profile picture</Text>
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
const styles = StyleSheet.create({
	contentContainer: {
		flex: 1,
	},
});

export default ProfileScreen;
