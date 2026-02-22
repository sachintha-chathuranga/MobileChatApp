import IconCard from '@/components/IconCard';
import ProfileCard from '@/components/ProfileCard';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

const SettingsScreen = () => {
	return (
		<SafeAreaView edges={['bottom']} className="flex-1 bg-white">
			<ProfileCard />
			<IconCard
				iconName="shield-account-variant-outline"
				title="Account"
				info="Security notifications, change number"
			></IconCard>
			<IconCard iconName="lock-outline" title="Privacy" info="Block contacts, disappearing messages"></IconCard>
			<IconCard iconName="theme-light-dark" title="Theme" info="System default"></IconCard>
			<IconCard iconName="bell-outline" title="Notifications" info="Message, group & call tones"></IconCard>
			<IconCard
				iconName="cellphone-check"
				title="App updates"
				info="Block contacts, disappearing messages"
			></IconCard>
		</SafeAreaView>
	);
};

export default SettingsScreen;
