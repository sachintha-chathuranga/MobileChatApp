import ProfileComponent from '@/src/components/Profile';
import {useAuth} from '@/src/context/authContext';
import React from 'react';

const ProfileScreen = () => {
	console.log('Profile Screen Rendered!');
	const {user, loadingUser} = useAuth();

	return <ProfileComponent isUser={true} user={user} isLoading={loadingUser} />;
};

export default ProfileScreen;
