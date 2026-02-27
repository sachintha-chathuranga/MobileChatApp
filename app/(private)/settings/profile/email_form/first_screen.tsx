import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {Link, useRouter} from 'expo-router';
import React, { useState } from 'react';
import {Text, TouchableHighlight, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const ChangeEmailFirst = () => {
	const router = useRouter();
	const [isVerifyEmail, setIsVerifyEmail] = useState(false)
	return (
		<SafeAreaView edges={['bottom']} className="flex-1 bg-white">
			<View className="px-4 pt-8">
				<Text className="text-gray-500 mb-5">Email helps you access your account. It isn't visible to others.</Text>
				<Text className="text-gray-500 mb-3">Email</Text>

				<TouchableOpacity
					className="flex-row justify-between mb-2 items-center"
					onPress={() => router.push('/(private)/settings/profile/email_form/second_screen')}
				>
					<Text className="font-semibold">mmschathuranga1@gmail.com</Text>
					<MaterialCommunityIcons color={'#6b7280'} size={18} name="pencil-outline" />
				</TouchableOpacity>

				<View className="flex-row items-center gap-1">
					<MaterialCommunityIcons
						color={`${isVerifyEmail ? '#16a34a' : '#fb923c'}`}
						size={18}
						name={`${isVerifyEmail ? 'check-circle-outline' : 'alert-outline'}`}
					/>
					<Text className={`${isVerifyEmail ? 'color-green-600' : 'color-gray-500'}`}>{isVerifyEmail ? 'Verified' : 'Pending verification.'}</Text>
					{!isVerifyEmail && <Link href={'/(private)/settings/profile/email_form/verify_screen'}>
					<Text className='font-semibold text-green-700'>Verify email</Text>
					</Link>}
				</View>
			</View>
		</SafeAreaView>
	);
};

export default ChangeEmailFirst;
