import {Alert} from 'react-native';
import {ThemeType} from '../constants/types';
const errorButton = [
	{
		text: 'OK',
	},
];
const handleError = (error: any, theme: ThemeType | null) => {
	let ErrorTheme = 'light';
	if (theme) {
		ErrorTheme = theme;
	}
	const options = {
		userInterfaceStyle: ErrorTheme as ThemeType,
	};

	if (!error?.response) {
		Alert.alert('Server Error', 'Server does not respond!', errorButton, options);
	} else if (error.response?.data) {
		console.error(error.response.data);
		Alert.alert('Message', error.response.data, errorButton, {
			userInterfaceStyle: 'dark',
			// userInterfaceStyle: ErrorTheme as ThemeType,
		});
	} else {
		Alert.alert('Network Error', 'Check your Internet Connection', errorButton, options);
	}
};

export default handleError;
