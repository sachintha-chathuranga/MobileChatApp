import {Alert} from 'react-native';

const handleError = (error: any) => {
	if (!error?.response) {
		Alert.alert('Server Error', 'Server does not respond!');
	} else if (error.response?.data) {
		console.log(error.response.data);
		Alert.alert('Error Message', error.response.data);
	} else {
		Alert.alert('Network Error', 'Check your Internet Connection');
	}
};

export default handleError;
