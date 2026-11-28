import ProfileComponent from '@/src/components/Profile';
import {useAuth} from '@/src/context/authContext';

const ProfileScreen = () => {
	const {user, loadingUser} = useAuth();

	return <ProfileComponent isUser={true} user={user} isLoading={loadingUser} />;
};

export default ProfileScreen;
