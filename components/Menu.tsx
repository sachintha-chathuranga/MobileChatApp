import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Background } from '@react-navigation/elements';
import {ExternalPathString, RelativePathString, useRouter} from 'expo-router';
import React, {useState} from 'react';
import {Modal, Pressable, Text, TouchableHighlight, View} from 'react-native';

export default function Menu() {
	const [visible, setVisible] = useState(false);
	const router = useRouter();

	const openSettings = () =>{
		setVisible(false);
		router.push("/settings")
	}
	return (
		<View className="p-1">
			<TouchableHighlight
				activeOpacity={0.6}
				underlayColor="#DDDDDD"
				className="rounded-full p-1 justify-center items-center "
				onPress={() => setVisible(true)}
			>
				<MaterialIcons size={25} name="more-vert"></MaterialIcons>
			</TouchableHighlight>

			<Modal transparent visible={visible} animationType="fade">
				<Pressable className="flex-1" onPress={() => setVisible(false)}>
					<View
						className="absolute top-10 right-3 bg-white py-3 rounded-md w-40 shadow"
						style={{
							elevation: 5,
						}}
					>
						<TouchableHighlight
							activeOpacity={0.6}
							underlayColor="#DDDDDD"
							onPress={() => openSettings()}
						>
							<View className="p-2 flex-row items-center gap-1">
								<MaterialIcons color={'black'} size={20} name="settings" />
								<Text>Settings</Text>
							</View>
						</TouchableHighlight>
						<View className="p-2 flex-row items-center gap-1">
							<MaterialIcons size={20} name="logout" />
							<Text onPress={() => console.log('Delete')}>Signout</Text>
						</View>
					</View>
				</Pressable>
			</Modal>
		</View>
	);
}
