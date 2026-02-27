import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {Stack, useRouter} from 'expo-router';
import React from 'react';

const ProfileLayout = () => {
	const router = useRouter();
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					title: 'Profile',
					headerTitleAlign: 'left',
					headerLeft: () => (
						<MaterialIcons size={23} name="arrow-back" className="pr-4" onPress={() => router.back()} />
					),
					headerBlurEffect: 'regular',
					headerTitleStyle: {fontSize: 22},
				}}
			/>
			<Stack.Screen
				name="name_form"
				options={{
					title: 'Name',
					headerTitleAlign: 'left',
					headerLeft: () => (
						<MaterialIcons size={23} name="arrow-back" className="pr-4" onPress={() => router.back()} />
					),
					headerBlurEffect: 'regular',
					headerTitleStyle: {fontSize: 22},
				}}
			/>
			<Stack.Screen
				name="about_form"
				options={{
					title: 'About',
					headerTitleAlign: 'left',
					headerLeft: () => (
						<MaterialIcons size={23} name="arrow-back" className="pr-4" onPress={() => router.back()} />
					),
					headerBlurEffect: 'regular',
					headerTitleStyle: {fontSize: 22},
				}}
			/>
			<Stack.Screen
				name="phone_form"
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="email_form"
				options={{
					headerShown: false,
				}}
			/>
		</Stack>
	);
};

export default ProfileLayout;
