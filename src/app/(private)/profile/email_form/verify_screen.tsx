import {Colors} from '@/src/constants/theme';
import {useRouter} from 'expo-router';
import {useColorScheme} from 'nativewind';
import React, {useState} from 'react';
import {KeyboardAvoidingView, Platform, Pressable, Text, TextInput, View} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

const EmailVerification = () => {
	const [input, setInput] = useState('');
	const router = useRouter();
	const {colorScheme} = useColorScheme();
	return (
		<SafeAreaView edges={['bottom']} className="flex-1 bg-light-bgcolor-100 dark:bg-dark-bgcolor-100">
			<KeyboardAvoidingView
				style={{flex: 1}}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 80}
			>
				<View className="flex-1 justify-between">
					<View className="items-center p-6 gap-8">
						<View className="text-center">
							<Text className="text-center text-light-txtcolor-200 dark:text-dark-txtcolor-200">
								Enter the 6-digit code we sent to <Text className="font-semibold ">sachintha@gmail.com</Text>.{' '}
								<Pressable
									onPress={() => router.replace('/(private)/settings/profile/email_form/second_screen')}
								>
									<Text className="font-semibold text-light-txtcolor-primary dark:text-dark-txtcolor-primary">
										Wrong email
									</Text>
								</Pressable>
							</Text>
						</View>
						<TextInput
							cursorColor={'#4ade80'}
							onChangeText={setInput}
							className="text-light-txtcolor-100 dark:text-dark-txtcolor-100 text-base rounded-lg border-2 border-light-border-primary dark:border-dark-border-primary p-3"
							value={input}
							underlineColorAndroid="transparent"
							autoFocus
							placeholder="Email"
							placeholderTextColor={colorScheme === 'dark' ? Colors.dark.inputtxt : Colors.light.inputtxt}
						/>
						<Pressable>
							<Text className="font-semibold text-light-txtcolor-primary dark:text-dark-txtcolor-primary">
								Send a new code
							</Text>
						</Pressable>
					</View>
					<Pressable
						disabled={!input}
						className={`${input ? 'bg-light-bgcolor-primary dark:bg-dark-bgcolor-primary' : 'bg-light-bgcolor-inactive dark:bg-dark-bgcolor-inactive'} py-3 rounded-full mb-6 mx-8`}
						onPress={() => router.dismissTo('/settings/profile/email_form/first_screen')}
					>
						<Text
							className={`${input ? 'text-white' : 'text-light-txtcolor-inactive dark:text-dark-txtcolor-inactive'} text-center font-semibold`}
						>
							Verify
						</Text>
					</Pressable>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default EmailVerification;
