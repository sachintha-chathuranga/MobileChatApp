import IconCard from '@/src/components/IconCard';
import ProfileCard from '@/src/components/ProfileCard';
import {router} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';

const SettingsScreen = () => {
	return (
		<SafeAreaView edges={['bottom']} className="flex-1 bg-light-bgcolor-100 dark:bg-dark-bgcolor-100">
			<ProfileCard />
			<IconCard
				iconName="shield-account-variant-outline"
				title="Account"
				info="Security notifications, change number"
				onPress={() => router.push('/settings')}
			/>
			<IconCard
				iconName="lock-outline"
				title="Privacy"
				info="Block contacts, disappearing messages"
				onPress={() => router.push('/settings')}
			/>
			<IconCard
				iconName="theme-light-dark"
				title="Theme"
				info="System default"
				onPress={() => router.push('/settings')}
			/>
			<IconCard
				iconName="bell-outline"
				title="Notifications"
				info="Message, group & call tones"
				onPress={() => router.push('/settings')}
			/>
			<IconCard
				iconName="cellphone-check"
				title="App updates"
				info="Block contacts, disappearing messages"
				onPress={() => router.push('/settings')}
			/>
		</SafeAreaView>
	);
};

export default SettingsScreen;
