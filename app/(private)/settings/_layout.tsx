import { View, Text } from 'react-native'
import React from 'react'
import { Stack, useRouter } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const SettingsLayout = () => {
   		const router = useRouter();
  return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					title: 'Settings',
					headerTitleAlign: 'left',
					headerLeft: () => (
						<MaterialIcons size={23} name="arrow-back" className="pr-4" onPress={() => router.back()} />
					),
					headerBlurEffect: 'regular',
					headerTitleStyle: {fontSize: 22},
				}}
			/>
			<Stack.Screen
				name="profile"
				options={{
               headerShown: false
				}}
			/>
		</Stack>
  );
}

export default SettingsLayout