import {images} from '@/src/assets/images';
import IconCard from '@/src/components/IconCard';
import ImagePickDrawer from '@/src/components/ImagePickDrawer';
import {Colors} from '@/src/constants/theme';
import {useAuth} from '@/src/context/authContext';
import BottomSheet from '@gorhom/bottom-sheet';
import {router} from 'expo-router';
import {useColorScheme} from 'nativewind';
import React, {useCallback, useRef} from 'react';
import {Image, Pressable, Text, TouchableHighlight, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

const ProfileScreen = () => {
	console.log("Profile Screen Rendered!")
	const bottomSheetRef = useRef<BottomSheet>(null);
	const {colorScheme} = useColorScheme();
	const {user} = useAuth();

	const handlePresentModalPress = useCallback(() => {
		bottomSheetRef.current?.expand();
	}, []);

	return (
		<GestureHandlerRootView style={{flex: 1}}>
			<SafeAreaView edges={['bottom']} className="flex-1 bg-light-bgcolor-100 dark:bg-dark-bgcolor-100">
				<View className="items-center p-4 pt-6 gap-6">
					<Pressable onPress={() => handlePresentModalPress()}>
						<Image
							source={user?.profil_pic ? {uri: user.profil_pic} : images.noperson}
							style={{width: 160, height: 160, borderRadius: 100}}
						/>
					</Pressable>
					<TouchableHighlight
						activeOpacity={0.6}
						underlayColor={colorScheme === 'dark' ? Colors.dark.underlay.primary : Colors.light.underlay.primary}
						className="rounded-3xl py-2 px-5 "
						onPress={() => handlePresentModalPress()}
					>
						<Text className="text-light-txtcolor-primary font-semibold dark:text-dark-txtcolor-primary">
							Edit
						</Text>
					</TouchableHighlight>
				</View>
				<View className="gap-2 px-4">
					<IconCard
						iconName="account-outline"
						title="Name"
						info={user ? user?.fname + ' ' + (user?.lname ? user.lname : '') : ''}
						onPress={() => router.push('/profile/name_form')}
					/>
					<IconCard
						iconName="information-variant-circle-outline"
						title="About"
						info={user ? user?.about?.replace('|', ' ') : ''}
						onPress={() => router.push('/profile/about_form')}
					/>
					<IconCard
						iconName="phone-outline"
						title="Phone"
						info={user ? user?.phone : ''}
						onPress={() => router.push('/profile/phone_form')}
					/>
					<IconCard
						iconName="email-outline"
						title="Email"
						info={user ? user?.email : ''}
						onPress={() => router.push('/profile/email_form')}
					/>
				</View>
				<ImagePickDrawer
					redirectPath={'./profile/crop_image'}
					snapPoints={['33%']}
					bottomSheetRef={bottomSheetRef}
				/>
			</SafeAreaView>
		</GestureHandlerRootView>
	);
};

export default ProfileScreen;
