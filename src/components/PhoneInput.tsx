import {Colors} from '@/src/constants/theme';
import {Country} from '@/src/constants/types';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import BottomSheet from '@gorhom/bottom-sheet';
import React, {useCallback} from 'react';
import {Keyboard, Pressable, Text, View} from 'react-native';
import MaskInput from 'react-native-mask-input';

type PhoneInputProps = {
	phone: string;
	setPhone: (pone: string) => void;
	country: Country | null;
	setIsValide: (val: boolean) => void;
	bottomSheetRef: React.RefObject<BottomSheet | null>;
};
const PhoneInput: React.FC<PhoneInputProps> = ({phone, setPhone, country, setIsValide, bottomSheetRef}) => {
	const validate = (input: string) => {
		console.log(input.length);
		input.length === 9 ? setIsValide(true) : setIsValide(false);
	};
	const handlePresentModalPress = useCallback(() => {
		Keyboard.dismiss();
		bottomSheetRef.current?.expand();
	}, []);

	function handleTextChange(masked: string, unmasked: string, obfuscated: string): void {
		setPhone(masked);
		validate(unmasked);
	}

	return (
		<View className="p-4 gap-3">
			<View className="mx-6 rounded-md border border-light-border-100 p-3 pl-3">
				<Pressable
					className=" w-full flex-row justify-between items-cente"
					onPress={() => handlePresentModalPress()}
				>
					<Text className="text-base text-black">
						{country ? `${country.flag} ${country.name}` : 'Select country'}
					</Text>
					<MaterialCommunityIcons size={20} name="chevron-right" color={Colors.light.txtcolor[100]} />
				</Pressable>
			</View>
			<MaskInput
				className="text-light-txtcolor-100 text-lg mx-6 rounded-md border border-light-border-100 p-2 pl-3"
				value={phone}
				onChangeText={handleTextChange}
				mask={country?.mask ?? [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
				keyboardType="phone-pad"
				autoFocus
			/>
		</View>
	);
};

export default PhoneInput;
