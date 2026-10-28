import Loading from '@/src/components/Loading';
import {UpdateUser} from '@/src/constants/types';
import {CONSTANT} from '@/src/constants/values';
import {useAuth} from '@/src/context/authContext';
import useAxiosPrivate from '@/src/hooks/useAxiosPrivate';
import {userUpdateCall} from '@/src/services/apiCalls';
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import {SaveFormat, useImageManipulator} from 'expo-image-manipulator';
import {
	addAssetsToAlbumAsync,
	createAlbumAsync,
	createAssetAsync,
	getAlbumAsync,
	requestPermissionsAsync,
} from 'expo-media-library';
import {router, useLocalSearchParams} from 'expo-router';
import {useCallback, useMemo, useState} from 'react';
import {Alert, Image, Text, View, useWindowDimensions} from 'react-native';
import {Gesture, GestureDetector, GestureHandlerRootView} from 'react-native-gesture-handler';
import Animated, {useAnimatedStyle, useSharedValue} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function CropImageScreen() {
	const {uri, imageWidth, imageHeight, ratio} = useLocalSearchParams<{
		uri: string;
		imageWidth: string;
		imageHeight: string;
		ratio: string;
	}>();
	const {user, setUser} = useAuth();
	const [saving, setSaving] = useState(false);
	const {width, height} = useWindowDimensions();
	const context = useImageManipulator(uri);
	const axiosPrivate = useAxiosPrivate();

	const IMAGE_CONTAINER_WIDTH = useMemo(() => width - 40, [width]);
	const IMAGE_CONTAINER_HEIGHT = useMemo(() => height - 100, [height]);
	const IMAGE_CONTAINER_RATIO = useMemo(
		() => IMAGE_CONTAINER_WIDTH / IMAGE_CONTAINER_HEIGHT,
		[IMAGE_CONTAINER_WIDTH, IMAGE_CONTAINER_HEIGHT]
	);

	const IMAGE_WIDTH = useMemo(() => {
		if (Number(ratio) > IMAGE_CONTAINER_RATIO) {
			return IMAGE_CONTAINER_WIDTH;
		}
		return IMAGE_CONTAINER_HEIGHT * Number(ratio);
	}, [width]);
	const IMAGE_HEIGHT = useMemo(() => IMAGE_WIDTH / Number(ratio), [ratio, IMAGE_WIDTH]);
	const frameYPoint = useMemo(
		() => (IMAGE_CONTAINER_HEIGHT - IMAGE_HEIGHT) / 2,
		[IMAGE_HEIGHT, IMAGE_CONTAINER_HEIGHT]
	);
	const frameXPoint = useMemo(() => (IMAGE_CONTAINER_WIDTH - IMAGE_WIDTH) / 2, [IMAGE_WIDTH, IMAGE_CONTAINER_WIDTH]);

	const y = useSharedValue(0);
	const startY = useSharedValue(0);

	const pan = Gesture.Pan()
		.onBegin(() => {
			startY.value = y.value;
		})
		.onUpdate((event) => {
			y.value = Math.max(0, Math.min(IMAGE_HEIGHT - IMAGE_WIDTH, startY.value + event.translationY));
		});

	const frameStyle = useAnimatedStyle(() => ({
		transform: [{translateY: y.value}],
	}));

	const topOverlayStyle = useAnimatedStyle(() => ({
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		height: y.value + frameYPoint,
		backgroundColor: 'rgba(0,0,0,0.6)',
	}));

	const bottomOverlayStyle = useAnimatedStyle(() => ({
		position: 'absolute',
		left: 0,
		right: 0,
		top: y.value + IMAGE_WIDTH + frameYPoint,
		bottom: 0,
		backgroundColor: 'rgba(0,0,0,0.6)',
	}));
	const leftOverlayStyle = useAnimatedStyle(() => ({
		position: 'absolute',
		left: 0,
		top: y.value + frameYPoint,
		width: frameXPoint,
		height: IMAGE_WIDTH,
		backgroundColor: 'rgba(0,0,0,0.6)',
	}));
	const rightOverlayStyle = useAnimatedStyle(() => ({
		position: 'absolute',
		right: 0,
		top: y.value + frameYPoint,
		width: frameXPoint,
		height: IMAGE_WIDTH,
		backgroundColor: 'rgba(0,0,0,0.6)',
	}));

	const cropAndSaveImage = useCallback(async () => {
		// Convert frame coordinates to original image pixels
		setSaving(true);
		const scaleY = Number(imageHeight) / IMAGE_HEIGHT;
		const originY = Math.round(y.value * scaleY);
		const cropHeight = Math.round(IMAGE_WIDTH * scaleY);
		try {
			// Crop the original image
			context.crop({
				originX: 0,
				originY: originY,
				width: Number(imageWidth),
				height: Math.min(cropHeight, Number(imageHeight) - originY),
			});
			const renderedImage = await context.renderAsync();
			const result = await renderedImage.saveAsync({
				format: SaveFormat.JPEG,
			});

			// Request permission to access the photo library
			const permission = await requestPermissionsAsync(true);

			if (!permission.granted) {
				Alert.alert('Permission required', 'Allow photo library access to save the image.');
				return;
			}


			// Create an image asset in the gallery
			const asset = await createAssetAsync(result.uri);

			console.log(asset.uri)
			if (user) {
				const data: UpdateUser = {
					user_id: user.user_id,
					profil_pic: asset.uri,
				};

				const statusCode = await userUpdateCall(axiosPrivate, data);
				if (statusCode === 200) {
					console.log('Save User Profile picture succsufully');
					setUser({...user, profil_pic: asset.uri});
				}
			}
			setSaving(false);
			Alert.alert('Success', 'Image saved to your gallery!', [
				{
					text: 'OK',
					onPress: () => router.back(),
				},
			]);
		} catch (error) {
			setSaving(false);
			console.error('Image crop error:', error);
			Alert.alert('Error', 'Could not crop and save the image.');
		}
	}, [imageWidth, imageHeight, IMAGE_WIDTH, IMAGE_HEIGHT]);

	return (
		<SafeAreaView className="flex-1 bg-dark-bgcolor-100">
			<GestureHandlerRootView className="flex-1 items-center justify-center">
				{saving && <Loading text="Saving..." />}
				<View className="flex-1 items-center justify-center">
					<View
						className="items-center justify-center bg-black relative"
						style={{width: IMAGE_CONTAINER_WIDTH, height: IMAGE_CONTAINER_HEIGHT}}
					>
						<Image source={{uri: uri}} style={{width: IMAGE_WIDTH, height: IMAGE_HEIGHT}} />
						<Animated.View pointerEvents={'none'} style={topOverlayStyle} />
						<Animated.View pointerEvents="none" style={bottomOverlayStyle} />
						<Animated.View pointerEvents={'none'} style={leftOverlayStyle} />
						<Animated.View pointerEvents="none" style={rightOverlayStyle} />

						<GestureDetector gesture={pan}>
							<Animated.View
								style={[
									frameStyle,
									{width: IMAGE_WIDTH, height: IMAGE_WIDTH, top: frameYPoint, borderWidth: 1},
								]}
								className={`absolute bg-transparent flex-row flex-wrap border-white opacity-50`}
							>
								{Array.from({length: 9}).map((_, index) => (
									<View
										key={index}
										style={{width: (IMAGE_WIDTH - 2) / 3, height: (IMAGE_WIDTH - 2) / 3, borderWidth: 1}}
										className={`border-t-0 border-l-0 border-white opacity-70 ${[2, 5, 8].includes(index) && 'border-r-0'} ${[6, 7, 8].includes(index) && 'border-b-0'}`}
									/>
								))}
							</Animated.View>
						</GestureDetector>
					</View>
				</View>
				<View className="flex-row h-20 justify-evenly items-center">
					<TouchableOpacity onPress={() => router.back()}>
						<Text className="text-dark-txtcolor-primary font-semibold text-lg">Cancel</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => cropAndSaveImage()}>
						<Text className="text-dark-txtcolor-primary font-semibold text-lg">Done</Text>
					</TouchableOpacity>
				</View>
			</GestureHandlerRootView>
		</SafeAreaView>
	);
}
