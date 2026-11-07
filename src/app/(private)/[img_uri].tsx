import ImagePickDrawer from '@/src/components/ImagePickDrawer';
import {Colors} from '@/src/constants/theme';
import {useTheme} from '@/src/context/themeContext';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import {router, useLocalSearchParams} from 'expo-router';
import React, {useRef} from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

const ProfilePicture: React.FC = () => {
	const {img_uri, name, editable} = useLocalSearchParams<{
		img_uri: string;
		name: string;
		editable: string;
	}>();
	const bottomSheetRef = useRef<BottomSheet>(null);
	const {theme} = useTheme();

	return (
		<SafeAreaView className="flex-1 bg-light-bgcolor-100 dark:bg-dark-bgcolor-100">
			<GestureHandlerRootView style={{flex: 1}}>
				{/* Header part */}
				<View className="py-3 mx-3 mr-5 flex-row items-center">
					<MaterialIcons
						size={23}
						color={theme === 'dark' ? Colors.dark.txtcolor[100] : Colors.light.txtcolor[100]}
						name="arrow-back"
						className="px-2"
						onPress={() => router.back()}
					/>
					<View className="px-2 flex-1">
						<Text className="text-light-txtcolor-100 text-2xl font-semibold line-clamp-1 dark:text-dark-txtcolor-100">
							{name}
						</Text>
					</View>

					{editable === 'true' && (
						<Pressable onPress={() => bottomSheetRef.current?.expand()}>
							<MaterialCommunityIcons name="pencil-outline" size={24} color="black" />
						</Pressable>
					)}
				</View>

				{/* Body part */}
				<View className="flex-1 bg-light-bgcolor-100 dark:bg-dark-bgcolor-100 justify-center">
					<Image source={{uri: img_uri}} style={{width: 'auto', aspectRatio: 1}} />
				</View>
				{editable === 'true' && (
					<ImagePickDrawer
						imageExist={true}
						redirectPath={'/profile/crop_image'}
						dissmissPath={'/[img_uri]'}
						snapPoints={['28%']}
						bottomSheetRef={bottomSheetRef}
					/>
				)}
			</GestureHandlerRootView>
		</SafeAreaView>
	);
};

export default ProfilePicture;
