import {images} from '@/assets/images';
import IconCard from '@/src/components/IconCard';
import ImagePickDrawer from '@/src/components/drawer/ImagePickDrawer';
import {Colors} from '@/src/constants/theme';
import BottomSheet from '@gorhom/bottom-sheet';
import {Href, router} from 'expo-router';
import {useColorScheme} from 'nativewind';
import React, {useCallback, useRef} from 'react';
import {Image, Pressable, Text, TouchableHighlight, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {User} from '../constants/types';
import Loading from './Loading';

type ProfileComponentProps = {
	isUser: boolean;
	user: User | null;
	isLoading: boolean;
};

const ProfileComponent: React.FC<ProfileComponentProps> = ({isUser, user, isLoading}) => {
	const bottomSheetRef = useRef<BottomSheet>(null);
	const {colorScheme} = useColorScheme();

	const handlePresentModalPress = useCallback(() => {
		if (isUser && !Boolean(user?.profil_pic)) {
			bottomSheetRef.current?.expand();
		} else if (user?.profil_pic) {
			router.push({
				pathname: '/(private)/[img_uri]',
				params: {
					img_uri: user.profil_pic,
					name: user.fname + ' ' + user.lname,
					editable: String(isUser),
				},
			});
		}
	}, [isUser, user?.profil_pic]);

	const handleCardPress = useCallback((path: Href) => {
		if (isUser) {
			router.push(path);
		}
	}, []);

	return (
		<SafeAreaView edges={['bottom']} className="flex-1 bg-light-bgcolor-100 dark:bg-dark-bgcolor-100">
			<GestureHandlerRootView style={{flex: 1}}>
				{isLoading && <Loading />}
				<View className="items-center p-4 pt-6 gap-6">
					<Pressable onPress={() => handlePresentModalPress()}>
						<Image
							source={user?.profil_pic ? {uri: user.profil_pic} : images.noperson}
							style={{width: 160, height: 160, borderRadius: 100}}
						/>
					</Pressable>
					{isUser ? (
						<TouchableHighlight
							activeOpacity={0.6}
							underlayColor={
								colorScheme === 'dark' ? Colors.dark.underlay.primary : Colors.light.underlay.primary
							}
							className="rounded-3xl py-2 px-5 "
							onPress={() => bottomSheetRef.current?.expand()}
						>
							<Text className="text-light-txtcolor-primary font-semibold dark:text-dark-txtcolor-primary">
								Edit
							</Text>
						</TouchableHighlight>
					) : (
						<View>
							<Text className="text-light-txtcolor-primary dark:text-dark-txtcolor-primary">
								{user?.status ? 'Online' : 'Offline'}
							</Text>
						</View>
					)}
				</View>
				<View className="gap-2 px-4">
					<IconCard
						iconName="account-outline"
						title="Name"
						info={user ? user?.fname + ' ' + (user?.lname ? user.lname : '') : ''}
						disabled={!isUser}
						onPress={() => handleCardPress('/profile/name_form')}
					/>
					<IconCard
						iconName="information-variant-circle-outline"
						title="About"
						info={user ? user?.about?.replace('|', ' ') : ''}
						disabled={!isUser}
						onPress={() => handleCardPress('/profile/about_form')}
					/>
					<IconCard
						iconName="phone-outline"
						title="Phone"
						info={user ? user?.phone : ''}
						disabled={!isUser}
						onPress={() => handleCardPress('/profile/phone_form')}
					/>
					<IconCard
						iconName="email-outline"
						title="Email"
						info={user ? user?.email : ''}
						disabled={!isUser}
						onPress={() => handleCardPress('/profile/email_form')}
					/>
				</View>
				<ImagePickDrawer
					imageExist={Boolean(user?.profil_pic)}
					redirectPath={'/profile/crop_image'}
					dissmissPath={'/profile'}
					snapPoints={['30%']}
					bottomSheetRef={bottomSheetRef}
				/>
			</GestureHandlerRootView>
		</SafeAreaView>
	);
};

export default ProfileComponent;
