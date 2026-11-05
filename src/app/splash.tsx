import {SplashScreen} from 'expo-router';
import {useAuth} from '../context/authContext';

SplashScreen.preventAutoHideAsync();

const SplashScreenController = () => {
	const {loadingUser} = useAuth();
	if (!loadingUser) {
		SplashScreen.hide();
	}
	return null;
};

export default SplashScreenController;
