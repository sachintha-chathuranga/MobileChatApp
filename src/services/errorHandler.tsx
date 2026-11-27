import {ThemeType} from '../constants/types';
import {AppAlert} from './appAlert';
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
		AppAlert.alert('Server Error', 'Server does not respond!', errorButton);
	} else if (error.response?.data) {
		console.log(error.response.data);
		AppAlert.alert('Message', error.response.data, errorButton);
	} else {
		AppAlert.alert('Network Error', 'Check your Internet Connection', errorButton);
	}
};

export default handleError;
