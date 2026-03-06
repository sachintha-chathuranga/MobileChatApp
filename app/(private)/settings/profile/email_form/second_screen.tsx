import {Colors} from '@/constants/theme';
import {useFocusEffect, useRouter} from 'expo-router';
import { useColorScheme } from 'nativewind';
import React, {useState} from 'react';
import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	Pressable,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const hostnames = [
	{
		id: 1,
		name: '@gmail.com',
	},
	{
		id: 2,
		name: '@outlook.com',
	},
	{
		id: 3,
		name: '@hotmail.com',
	},
	{
		id: 4,
		name: '@live.com',
	},
	{
		id: 5,
		name: '@msn.com',
	},
];

const ChangeEmailSecond = () => {
	const [input, setInput] = useState('');
	const router = useRouter();
	const {colorScheme} = useColorScheme();
	useFocusEffect(
		React.useCallback(() => {
			return () => Keyboard.dismiss();
		}, [])
	);

	const addHostName = (host: string) => {
		setInput((prev) => {
			if (prev.includes('@')) {
				return prev.replace(/@.*/, host);
			} else {
				return prev + host;
			}
		});
	};
	return (
		<SafeAreaView edges={['bottom']} className="flex-1 bg-light-bgcolor-100 dark:bg-dark-bgcolor-100">
			<KeyboardAvoidingView
				style={{flex: 1}}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 80}
			>
				<View className="flex-1 justify-between">
					<View className="p-6 gap-8">
						<Text className="text-light-txtcolor-100 dark:text-dark-txtcolor-100 ">
							Email helps us verify your account or reach you in case of security or support issues. Your email
							address won't be visible to others.
						</Text>
						<View>
							<View >
								<TextInput
									cursorColor={'#4ade80'}
									onChangeText={setInput}
									className={`text-light-txtcolor-100 dark:text-dark-txtcolor-100 text-base rounded-lg border-2 border-light-border-primary p-3 dark:border-dark-border-primary`}
									value={input}
									underlineColorAndroid="transparent"
									autoFocus
									placeholder="Email"
									placeholderTextColor={colorScheme==='dark' ? Colors.dark.inputtxt : Colors.light.inputtxt}
								/>
							</View>
							<ScrollView
								aria-hidden={!input}
								automaticallyAdjustKeyboardInsets
								keyboardShouldPersistTaps="always"
								showsHorizontalScrollIndicator={false}
								horizontal
								className="pt-2"
							>
								{hostnames.map((item) => (
									<TouchableOpacity
										key={item.id}
										className="mr-2 py-2 px-3 border rounded-full border-light-border-100 dark:border-dark-border-100"
										onPress={() => addHostName(item.name)}
									>
										<Text className="font-semibold text-light-txtcolor-200 dark:text-dark-txtcolor-200">
											{item.name}
										</Text>
									</TouchableOpacity>
								))}
							</ScrollView>
						</View>
					</View>
					<Pressable
						disabled={!input}
						className={`${input ? 'bg-light-bgcolor-primary dark:bg-dark-bgcolor-primary' : 'bg-light-bgcolor-inactive dark:bg-dark-bgcolor-inactive'} py-3 rounded-full mb-6 mx-8`}
						onPress={() => router.push('/settings/profile/email_form/verify_screen')}
					>
						<Text className={` ${input ? 'color-white' : 'text-light-txtcolor-inactive dark:text-dark-txtcolor-inactive'} text-center font-semibold`}>Next</Text>
					</Pressable>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default ChangeEmailSecond;
