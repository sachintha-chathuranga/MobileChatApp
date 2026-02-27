import {useFocusEffect, useRouter} from 'expo-router';
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
		<SafeAreaView edges={['bottom']} className="flex-1">
			<KeyboardAvoidingView
				style={{flex: 1}}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 80}
			>
				<View className="flex-1 justify-between">
					<View className="p-6 gap-8">
						<Text className="text-gray-500 ">
							Email helps us verify your account or reach you in case of security or support issues. Your email
							address won't be visible to others.
						</Text>
						<View>
							<View className="">
								<TextInput
									cursorColor={'#4ade80'}
									onChangeText={setInput}
									className={`text-base rounded-lg border-2 border-green-600 p-3`}
									value={input}
									underlineColorAndroid="transparent"
									autoFocus
									placeholder="Email"
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
										className="mr-2 py-2 px-3 border rounded-full border-gray-400"
										onPress={() => addHostName(item.name)}
									>
										<Text className="font-semibold text-gray-600">{item.name}</Text>
									</TouchableOpacity>
								))}
							</ScrollView>
						</View>
					</View>
					<Pressable
						disabled={!input}
						className={`${input ? 'bg-green-600' : 'bg-gray-300'} py-3 rounded-full mb-6 mx-8`}
						onPress={() => router.push('/settings/profile/email_form/verify_screen')}
					>
						<Text className={`${input ? 'color-white' : 'color-gray-400'} text-center font-semibold`}>Next</Text>
					</Pressable>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default ChangeEmailSecond;
