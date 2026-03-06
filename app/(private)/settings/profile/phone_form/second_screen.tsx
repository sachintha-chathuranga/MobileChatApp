import {useRouter} from 'expo-router';
import React, {useState} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const ChangePhoneSecond = () => {
	const [input1, setInput1] = useState('');
	const [input2, setInput2] = useState('');
	const [input3, setInput3] = useState('');
	const [input4, setInput4] = useState('');

	const [activeInput, setActiveInput] = useState(0);
	const router = useRouter();
	return (
		<SafeAreaView edges={['bottom']} className="flex-1 justify-between bg-light-bgcolor-100 dark:bg-dark-bgcolor-100">
			<View className="p-5 gap-8">
				<View className="gap-2">
					<Text className="text-base text-light-txtcolor-100  dark:text-dark-txtcolor-100">
						Enter your old phone number with country code:
					</Text>
					<View className="flex-row gap-4">
						<View
							className={`flex-row items-center gap-2 border-b ${activeInput === 1 ? 'border-b-2 border-primary-bg' : 'border-gray-400'}  w-14`}
						>
							<Text className="text-base">+</Text>
							<TextInput
								cursorColor={'#4ade80'}
								onChangeText={setInput1}
								className="max-w-10 text-base"
								value={input1}
								underlineColorAndroid="transparent"
								autoFocus
								onFocus={() => setActiveInput(1)}
								placeholder="94"
							/>
						</View>
						<TextInput
							cursorColor={'#4ade80'}
							onChangeText={setInput2}
							className={`text-base border-b ${activeInput === 2 ? 'border-b-2 border-primary-bg' : 'border-gray-400'} flex-1`}
							value={input2}
							underlineColorAndroid="transparent"
							autoFocus
							onFocus={() => setActiveInput(2)}
							placeholder="Old phone number"
						/>
					</View>
				</View>
				<View>
					<Text className="text-base">Enter your new phone number with country code:</Text>
					<View className="flex-row gap-4">
						<View
							className={`flex-row items-center gap-2 border-b ${activeInput === 3 ? 'border-b-2 border-primary-bg' : 'border-gray-400'}  w-14`}
						>
							<Text className="text-base">+</Text>
							<TextInput
								cursorColor={'#4ade80'}
								onChangeText={setInput3}
								className="max-w-10 text-base"
								value={input3}
								underlineColorAndroid="transparent"
								autoFocus
								onFocus={() => setActiveInput(3)}
								placeholder="94"
							/>
						</View>
						<TextInput
							cursorColor={'#4ade80'}
							onChangeText={setInput4}
							className={`text-base border-b ${activeInput === 4 ? 'border-b-2 border-primary-bg' : 'border-gray-400'} flex-1`}
							value={input4}
							underlineColorAndroid="transparent"
							autoFocus
							onFocus={() => setActiveInput(4)}
							placeholder="Old phone number"
						/>
					</View>
				</View>
			</View>
			<Pressable
				className="bg-primary-bg py-3 px-7 w-fit self-center rounded-full mb-6"
				onPress={() => router.push('/settings/profile/phone_form/second_screen')}
			>
				<Text className="color-white font-semibold">Next</Text>
			</Pressable>
		</SafeAreaView>
	);
};

export default ChangePhoneSecond;
