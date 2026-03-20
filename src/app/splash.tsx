import {SplashScreen} from 'expo-router';
import { useAuth } from '../context/authContext';

SplashScreen.preventAutoHideAsync();

export default function SplashScreenController() {
	const {isLoading} = useAuth();

	if (!isLoading) {
		SplashScreen.hide();
	}

	return null;
}
