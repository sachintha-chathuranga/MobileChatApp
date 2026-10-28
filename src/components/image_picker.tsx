import * as ImagePicker from 'expo-image-picker';
import {router} from 'expo-router';
import {useCallback, useState} from 'react';
import {Alert, View} from 'react-native';
import IconCard from './IconCard';

export default function ImagePickerComponent() {

	const pickImage = useCallback(async () => {
		// No permissions request is necessary for launching the image library.
		// Manually request permissions for videos on iOS when `allowsEditing` is set to `false`
		// and `videoExportPreset` is `'Passthrough'` (the default), ideally before launching the picker
		// so the app users aren't surprised by a system dialog after picking a video.
		// See "Invoke permissions for videos" sub section for more details.
		const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (!permissionResult.granted) {
			Alert.alert('Permission required', 'Permission to access the media library is required.');
			return;
		}

		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ['images'],
			allowsEditing: false,
			quality: 1,
		});

		console.log(result);

		if (!result.canceled) {
			const assets = result.assets[0];
			const aspectRatio = assets.width / assets.height;
			router.push({
				pathname: '/profile/crop_image',
				params: {
					uri: assets.uri,
					imageWidth: String(assets.width),
					imageHeight: String(assets.height),
					ratio: String(aspectRatio),
				},
			});
		}
	}, []);

	const takePhoto = useCallback(async () => {
		// Camera access always requires the user's permission.
		// Taking a photo also requires a device with a camera. The iOS Simulator
		// does not have one, so use a physical device to test this button.
		const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

		if (!permissionResult.granted) {
			Alert.alert('Permission required', 'Permission to access the camera is required.');
			return;
		}

		let result = await ImagePicker.launchCameraAsync({
			allowsEditing: false,
			quality: 1,
		});

		console.log(result);

		if (!result.canceled) {
			const assets = result.assets[0];
			const aspectRatio = assets.width / assets.height;
			router.push({
				pathname: '/profile/crop_image',
				params: {
					uri: assets.uri,
					imageWidth: String(assets.width),
					imageHeight: String(assets.height),
					ratio: String(aspectRatio),
				},
			});
		}
	}, []);

	return (
		<View className="px-4">
			<IconCard iconName="camera-outline" title="Camera" info="" onPress={takePhoto} />
			<IconCard iconName="image-frame" title="Gallery" info="" onPress={pickImage} />
		</View>
	);
}
