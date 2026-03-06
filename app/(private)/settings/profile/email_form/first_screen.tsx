import {Colors} from '@/constants/theme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {Link, useRouter} from 'expo-router';
import {useColorScheme} from 'nativewind';
import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const ChangeEmailFirst = () => {
	const router = useRouter();
	const [isVerifyEmail, setIsVerifyEmail] = useState(false);
	const {colorScheme} = useColorScheme();
	return (
		<SafeAreaView edges={['bottom']} className="flex-1 bg-light-bgcolor-100 dark:bg-dark-bgcolor-100">
			<View className="px-4 pt-8">
				<Text className="text-light-txtcolor-100 mb-5 dark:text-dark-txtcolor-100">
					Email helps you access your account. It isn't visible to others.
				</Text>
				<Text className="text-light-txtcolor-200 mb-3 dark:text-dark-txtcolor-200">Email</Text>

				<TouchableOpacity
					className="flex-row justify-between mb-2 items-center"
					onPress={() => router.push('/(private)/settings/profile/email_form/second_screen')}
				>
					<Text className="font-semibold text-light-txtcolor-100 dark:text-dark-txtcolor-100">
						mmschathuranga1@gmail.com
					</Text>
					<MaterialCommunityIcons
						color={colorScheme === 'dark' ? Colors.dark.txtcolor[200] : Colors.light.txtcolor[200]}
						size={18}
						name="pencil-outline"
					/>
				</TouchableOpacity>

				<View className="flex-row items-center gap-1 pt-1">
					<MaterialCommunityIcons
						color={`${isVerifyEmail ? (colorScheme==='dark' ? Colors.dark.txtcolor.primary : Colors.light.txtcolor.primary) : '#fb923c'}`}
						size={18}
						className='pr-1'
						name={`${isVerifyEmail ? 'check-circle-outline' : 'alert-outline'}`}
					/>
					<Text className={`${isVerifyEmail ? ('text-light-txtcolor-primary dark:text-dark-txtcolor-primary') : ('text-light-txtcolor-200 dark:text-dark-txtcolor-200')}`}>
						{isVerifyEmail ? 'Verified' : 'Pending verification.'}
					</Text>
					{!isVerifyEmail && (
						<Link href={'/(private)/settings/profile/email_form/verify_screen'}>
							<Text className="font-semibold text-light-txtcolor-primary dark:text-dark-txtcolor-primary">Verify email</Text>
						</Link>
					)}
				</View>
			</View>
		</SafeAreaView>
	);
};

export default ChangeEmailFirst;
