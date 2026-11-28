import {Colors} from '@/src/constants/theme';
import {Country} from '@/src/constants/types';
import {COUNTRIES} from '@/src/constants/values';
import BottomSheet, {BottomSheetBackdrop, BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {useColorScheme} from 'nativewind';
import React, {memo, useCallback, useMemo} from 'react';
import {Pressable, Text} from 'react-native';

type CountryDrawerProps = {
	bottomSheetRef: React.RefObject<BottomSheet | null>;
	setCountry: (country: Country) => void;
};

const CountryDrawer: React.FC<CountryDrawerProps> = ({bottomSheetRef, setCountry}) => {
	const snapPoints = useMemo(() => ['30%', '50%'], []);
	const {colorScheme} = useColorScheme();
	const renderBackdrop = useCallback(
		(props: any) => (
			<BottomSheetBackdrop
				{...props}
				disappearsOnIndex={-1}
				appearsOnIndex={0}
				pressBehavior="close" // 👈 THIS closes on outside press
			/>
		),
		[]
	);

	const handleClosePress = useCallback(() => {
		bottomSheetRef.current?.close();
	}, []);

	return (
		<BottomSheet
			ref={bottomSheetRef}
			snapPoints={snapPoints}
			index={-1}
			backdropComponent={renderBackdrop}
			enablePanDownToClose={true}
			enableDynamicSizing={false}
			backgroundStyle={{
				backgroundColor: colorScheme === 'dark' ? Colors.dark.bgcolor[200] : Colors.light.bgcolor[200],
			}}
			handleIndicatorStyle={{
				backgroundColor: colorScheme === 'dark' ? Colors.dark.txtcolor[200] : Colors.light.txtcolor[200],
			}}
			keyboardBehavior="extend"
		>
			<BottomSheetScrollView>
				{COUNTRIES.map((item) => (
					<Pressable
						key={item.id}
						className="text-light-txtcolor-100 dark:text-dark-txtcolor-100 flex-row items-center gap-4 px-4 py-3 border-b border-light-border-100 dark:border-dark-border-100"
						onPress={() => {
							setCountry(item);
							handleClosePress();
						}}
					>
						<Text className="text-lg">{item.flag}</Text>
						<Text className="text-base text-light-txtcolor-100 dark:text-dark-txtcolor-100">
							{item.name} ({item.code})
						</Text>
					</Pressable>
				))}
			</BottomSheetScrollView>
		</BottomSheet>
	);
};

export default memo(CountryDrawer);
