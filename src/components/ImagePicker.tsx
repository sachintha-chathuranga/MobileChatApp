import * as ImagePicker from 'expo-image-picker';
import {RelativePathString, router} from 'expo-router';
import {useCallback, useState} from 'react';
import {Alert, View} from 'react-native';
import IconCard from './IconCard';
import Loading from './Loading';

type ImagePickerProps = {
	redirectPath: RelativePathString;
	closeDrawer: () => void;
};
const ImagePickerComponent: React.FC<ImagePickerProps> = ({redirectPath, closeDrawer}) => {
	const [loading, setLoading] = useState(false);

	const pickImage = useCallback(async () => {
		setLoading(true);
		// No permissions request is necessary for launching the image library.
		// Manually request permissions for videos on iOS when `allowsEditing` is set to `false`
		// and `videoExportPreset` is `'Passthrough'` (the default), ideally before launching the picker
		// so the app users aren't surprised by a system dialog after picking a video.
		// See "Invoke permissions for videos" sub section for more details.
		try {
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
			setLoading(false);
			closeDrawer();

			if (!result.canceled) {
				const assets = result.assets[0];
				const aspectRatio = assets.width / assets.height;
				router.push({
					pathname: redirectPath,
					params: {
						uri: assets.uri,
						imageWidth: String(assets.width),
						imageHeight: String(assets.height),
						ratio: String(aspectRatio),
					},
				});
			}
		} catch (error: any) {
			Alert.alert('Gallery Error', error?.message);
		}
	}, []);

	const takePhoto = useCallback(async () => {
		setLoading(true);
		// Camera access always requires the user's permission.
		// Taking a photo also requires a device with a camera. The iOS Simulator
		// does not have one, so use a physical device to test this button.
		try {
			const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
			if (!permissionResult.granted) {
				Alert.alert('Permission required', 'Permission to access the camera is required.');
				return;
			}

			let result = await ImagePicker.launchCameraAsync({
				allowsEditing: false,
				quality: 1,
			});

			setLoading(false);
			closeDrawer();

			if (!result.canceled) {
				const assets = result.assets[0];
				const aspectRatio = assets.width / assets.height;
				router.push({
					pathname: redirectPath,
					params: {
						uri: assets.uri,
						imageWidth: String(assets.width),
						imageHeight: String(assets.height),
						ratio: String(aspectRatio),
					},
				});
			}
		} catch (error: any) {
			Alert.alert('Camera Error', error?.message);
		}
	}, []);

	return (
		<View className="px-4 relative">
			{loading && <Loading />}
			<IconCard iconName="camera-outline" title="Camera" disabled={loading} onPress={takePhoto} />
			<IconCard iconName="image-frame" title="Gallery" disabled={loading} onPress={pickImage} />
		</View>
	);
};
export default ImagePickerComponent;
