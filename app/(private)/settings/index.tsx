import IconCard from '@/components/IconCard';
import ProfileCard from '@/components/ProfileCard';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

const SettingsScreen = () => {
	return (
		<SafeAreaView edges={['bottom']} className="flex-1 bg-light-bgcolor-100 dark:bg-dark-bgcolor-100">
			<ProfileCard />
			<IconCard
				iconName="shield-account-variant-outline"
				title="Account"
				info="Security notifications, change number"
				route="/settings"
			/>
			<IconCard
				iconName="lock-outline"
				title="Privacy"
				info="Block contacts, disappearing messages"
				route="/settings"
			/>
			<IconCard iconName="theme-light-dark" title="Theme" info="System default" route="/settings" />
			<IconCard iconName="bell-outline" title="Notifications" info="Message, group & call tones" route="/settings" />
			<IconCard
				iconName="cellphone-check"
				title="App updates"
				info="Block contacts, disappearing messages"
				route="/settings"
			/>
		</SafeAreaView>
	);
};

export default SettingsScreen;
