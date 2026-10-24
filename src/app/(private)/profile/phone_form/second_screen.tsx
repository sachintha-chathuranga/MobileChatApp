import {Colors} from '@/src/constants/theme';
import {useRouter} from 'expo-router';
import {useColorScheme} from 'nativewind';
import React, {useState} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const ChangePhoneSecond = () => {
	const [input1, setInput1] = useState('');
	const [input2, setInput2] = useState('');
	const [input3, setInput3] = useState('');
	const [input4, setInput4] = useState('');
	const {colorScheme} = useColorScheme();

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
							className={`flex-row items-center gap-2 border-b ${activeInput === 1 ? 'border-b-2 border-light-border-primary dark:border-dark-border-primary' : 'border-light-border-100 dark:border-dark-border-100'}  w-14`}
						>
							<Text className="text-light-inputtxt dark:text-dark-inputtxt text-base">+</Text>
							<TextInput
								cursorColor={'#4ade80'}
								onChangeText={setInput1}
								className="text-light-txtcolor-100 dark:text-dark-txtcolor-100 max-w-10 text-base"
								value={input1}
								underlineColorAndroid="transparent"
								autoFocus
								onFocus={() => setActiveInput(1)}
								placeholder="94"
								placeholderTextColor={colorScheme === 'dark' ? Colors.dark.inputtxt : Colors.light.inputtxt}
							/>
						</View>
						<TextInput
							cursorColor={'#4ade80'}
							onChangeText={setInput2}
							className={`text-light-txtcolor-100 dark:text-dark-txtcolor-100 text-base border-b ${activeInput === 2 ? 'border-b-2 border-light-border-primary dark:border-dark-border-primary' : 'border-light-border-100 dark:border-dark-border-100'} flex-1`}
							value={input2}
							underlineColorAndroid="transparent"
							autoFocus
							onFocus={() => setActiveInput(2)}
							placeholder="Old phone number"
							placeholderTextColor={colorScheme === 'dark' ? Colors.dark.inputtxt : Colors.light.inputtxt}
						/>
					</View>
				</View>
				<View>
					<Text className="text-base">Enter your new phone number with country code:</Text>
					<View className="flex-row gap-4">
						<View
							className={`flex-row items-center gap-2 border-b ${activeInput === 3 ? 'border-b-2 border-light-border-primary dark:border-dark-border-primary' : 'border-light-border-100 dark:border-dark-border-100'}  w-14`}
						>
							<Text className="text-light-inputtxt dark:text-dark-inputtxt text-base">+</Text>
							<TextInput
								cursorColor={'#4ade80'}
								onChangeText={setInput3}
								className="text-light-txtcolor-100 dark:text-dark-txtcolor-100 max-w-10 text-base"
								value={input3}
								underlineColorAndroid="transparent"
								autoFocus
								onFocus={() => setActiveInput(3)}
								placeholder="94"
								placeholderTextColor={colorScheme === 'dark' ? Colors.dark.inputtxt : Colors.light.inputtxt}
							/>
						</View>
						<TextInput
							cursorColor={'#4ade80'}
							onChangeText={setInput4}
							className={`text-light-txtcolor-100 dark:text-dark-txtcolor-100 text-base border-b ${activeInput === 4 ? 'border-b-2 border-light-border-primary dark:border-dark-border-primary' : 'border-light-border-100 dark:border-dark-border-100'} flex-1`}
							value={input4}
							underlineColorAndroid="transparent"
							autoFocus
							onFocus={() => setActiveInput(4)}
							placeholder="Old phone number"
							placeholderTextColor={colorScheme === 'dark' ? Colors.dark.inputtxt : Colors.light.inputtxt}
						/>
					</View>
				</View>
			</View>
			<Pressable
				className="bg-light-bgcolor-primary dark:bg-dark-bgcolor-primary py-3 px-7 w-fit self-center rounded-full mb-6"
				onPress={() => router.push('/settings/profile/phone_form/second_screen')}
			>
				<Text className="color-white font-semibold">Next</Text>
			</Pressable>
		</SafeAreaView>
	);
};

export default ChangePhoneSecond;
