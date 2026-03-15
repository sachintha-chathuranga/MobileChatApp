import {images} from '@/assets/images';
import React, {useEffect} from 'react';
import {Image, Text, View} from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withSequence,
	withTiming,
} from 'react-native-reanimated';

const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedText = Animated.createAnimatedComponent(Text);

export default function BlissChatLogoAnimation() {
	const scale = useSharedValue(0.8);

	useEffect(() => {
		scale.value = withRepeat(
			withSequence(withTiming(1.05, {duration: 1200}), withTiming(1, {duration: 1200})),
			-1,
			true
		);
	}, []);

	const logoStyle = useAnimatedStyle(() => ({
		transform: [{scale: scale.value}],
      width: 200,
      height: 200,
	}));

	return (
		<View className="items-center justify-center">
			<AnimatedImage source={images.logo} resizeMode="contain" style={logoStyle} />
		</View>
	);
}
