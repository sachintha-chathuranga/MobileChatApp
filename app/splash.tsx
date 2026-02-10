import {useSession} from '@/context/authContext';
import {SplashScreen} from 'expo-router';

SplashScreen.preventAutoHideAsync();

const SplashScreenController = () => {
	const {isLoading} = useSession();

	if (!isLoading) {
		SplashScreen.hide();
	}

	return null;
};

export default SplashScreenController;
