import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import BottomSheet, {BottomSheetBackdrop, BottomSheetView} from '@gorhom/bottom-sheet';
import {useColorScheme} from 'nativewind';
import React, {useCallback} from 'react';
import {Pressable, Text, View} from 'react-native';
import {Colors} from '../../constants/theme';
import {CropBackPath, CropPath} from '../../constants/types';
import ImagePickerComponent from './ImagePicker';

type ImagePickerDrawerProps = {
	imageExist: boolean;
	redirectPath: CropPath;
	dissmissPath: CropBackPath;
	snapPoints: (string | number)[];
	bottomSheetRef: React.RefObject<BottomSheet | null>;
};
const ImagePickDrawer: React.FC<ImagePickerDrawerProps> = ({
	imageExist,
	redirectPath,
	dissmissPath,
	snapPoints,
	bottomSheetRef,
}) => {
	const {colorScheme} = useColorScheme();

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

	const handleClosePress = useCallback(() => {
		bottomSheetRef.current?.close();
	}, []);

	return (
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
			<BottomSheetView>
				<View className="flex-row items-center px-5 pb-3 pt-2">
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

					{imageExist && (
						<Pressable>
							<MaterialCommunityIcons
								name="trash-can-outline"
								size={24}
								color={colorScheme === 'dark' ? Colors.dark.txtcolor[100] : Colors.light.txtcolor[100]}
							/>
						</Pressable>
					)}
				</View>
				<ImagePickerComponent
					redirectPath={redirectPath}
					dissmissPath={dissmissPath}
					closeDrawer={handleClosePress}
				/>
			</BottomSheetView>
		</BottomSheet>
	);
};

export default ImagePickDrawer;
