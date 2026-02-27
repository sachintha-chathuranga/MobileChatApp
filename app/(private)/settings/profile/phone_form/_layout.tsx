import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {Stack, useRouter} from 'expo-router';
import React from 'react';

const PhoneFormLayout = () => {
	const router = useRouter();
	return (
		<Stack>
			<Stack.Screen
				name="first_screen"
				options={{
					title: 'Change number',
					headerTitleAlign: 'left',
					headerLeft: () => (
						<MaterialIcons size={23} name="arrow-back" className="pr-4" onPress={() => router.back()} />
					),
					headerBlurEffect: 'regular',
					headerTitleStyle: {fontSize: 22},
				}}
			/>
			<Stack.Screen
				name="second_screen"
				options={{
					title: 'Change number',
					headerTitleAlign: 'left',
					headerLeft: () => (
						<MaterialIcons size={23} name="arrow-back" className="pr-4" onPress={() => router.back()} />
					),
					headerBlurEffect: 'regular',
					headerTitleStyle: {fontSize: 22},
				}}
			/>
		</Stack>
	);
};

export default PhoneFormLayout;
