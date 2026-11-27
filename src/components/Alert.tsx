import {useColorScheme} from 'nativewind';
import React, {useEffect, useState} from 'react';
import {BackHandler, Modal, Platform, Text, TouchableOpacity, View} from 'react-native';
import {AlertButton, AlertRequest, AppAlert} from '../services/appAlert';

const AlertHost = () => {
	const [alerts, setAlerts] = useState<AlertRequest[]>([]);
	const {colorScheme} = useColorScheme();

	useEffect(() => {
		const handler = (request: AlertRequest) => {
			setAlerts((prev) => [...prev, request]);
		};

		AppAlert.registerAlertHandler(handler);

		return () => {
			AppAlert.registerAlertHandler(null);
		};
	}, []);

	const currentAlert = alerts[0];

	const closeAlert = (invokeDismiss = true) => {
		if (!currentAlert) return;

		setAlerts((prev) => prev.slice(1));

		if (invokeDismiss) {
			currentAlert.options.onDismiss?.();
		}
	};

	const handleButtonPress = (button: AlertButton) => {
		setAlerts((prev) => prev.slice(1));
		button.onPress?.();
	};

	useEffect(() => {
		if (!currentAlert || Platform.OS !== 'android') return;

		const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
			if (currentAlert.options.cancelable !== false) {
				closeAlert();
			}

			return true;
		});

		return () => subscription.remove();
	}, [currentAlert]);

	return (
		<Modal
			transparent
			visible={!!currentAlert}
			animationType="fade"
			statusBarTranslucent
			onRequestClose={() => {
				if (currentAlert?.options.cancelable !== false) {
					closeAlert();
				}
			}}
		>
			<View className="flex-1 p-8 bg-light-bgcolor-overlay justify-center items-center">
				<View className="w-full max-w-80 bg-light-bgcolor-100 dark:bg-dark-bgcolor-menu rounded-xl px-5 pt-5 pb-3 elevation-lg">
					{currentAlert?.title && (
						<Text className="text-xl font-semibold color-light-txtcolor-title dark:color-dark-txtcolor-title mb-3">
							{currentAlert.title}
						</Text>
					)}

					{currentAlert?.message && (
						<Text className="text-base mb-8 color-light-txtcolor-100 dark:color-dark-txtcolor-100">
							{currentAlert.message}
						</Text>
					)}

					<View className="flex-row justify-end flex-wrap ">
						{currentAlert?.buttons.map((button, index) => (
							<TouchableOpacity
								key={index}
								className="rounded-lg py-1 px-3 "
								onPress={() => handleButtonPress(button)}
							>
								<Text
									className={`color-light-txtcolor-primary text-base font-medium ${button.style === 'destructive' && 'color-red-800'}`}
								>
									{button.text ?? 'OK'}
								</Text>
							</TouchableOpacity>
						))}
					</View>
				</View>
			</View>
		</Modal>
	);
};

export default AlertHost;
