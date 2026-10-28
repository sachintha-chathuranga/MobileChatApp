import {SplashScreen} from 'expo-router';
import { useAuth } from '../context/authContext';

SplashScreen.preventAutoHideAsync();

export default function SplashScreenController() {
	const {loadingUser} = useAuth();

	if (!loadingUser) {
		SplashScreen.hide();
	}

	return null;
}
