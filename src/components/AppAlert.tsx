import React, {useState} from 'react';
import {Modal, StyleSheet, Text, TouchableHighlight, View} from 'react-native';

const AppAlert = () => {
	const [visible, setVisible] = useState(true);
	return (
		<Modal
			style={StyleSheet.absoluteFillObject}
			visible={visible}
			transparent
			animationType="fade"
			onRequestClose={() => setVisible(false)}
		>
			<View
				style={StyleSheet.absoluteFillObject}
				className="flex-1 z-50 bg-light-bgcolor-overlay justify-center items-center"
			>
				<View className="w-10/12 bg-white rounded-xl p-5">
					<Text className="text-2xl font-semibold color-light-txtcolor-title">Message</Text>
					<Text className="text-lg font-normal color-light-txtcolor-100 mt-3">Server does not respond!</Text>
					<View className="flex-row justify-end self-end items-end mt-6 gap-3">
						<TouchableHighlight className="p-3" onPress={() => setVisible(false)}>
							<Text>OK</Text>
						</TouchableHighlight>
					</View>
				</View>
			</View>
		</Modal>
	);
};

export default AppAlert;
