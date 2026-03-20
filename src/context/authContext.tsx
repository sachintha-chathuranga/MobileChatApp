import {User} from '@/src/constants/types';
import {useStorageState} from '@/src/hooks/useStorageState';
import {createContext, useContext, useMemo, type PropsWithChildren} from 'react';

const AuthContext = createContext<{
	signIn: (user: User, accToken: string, refToken: string) => void;
	signOut: () => void;
	user: User | null;
	isLoading: boolean | null;
	refreshToken: string | null;
	accessToken: string | null;
}>({
	signIn: () => null,
	signOut: () => null,
	user: null,
	isLoading: false,
	refreshToken: null,
	accessToken: null,
});

// Use this hook to access the user info.
export function useAuth() {
	const value = useContext(AuthContext);
	if (!value) {
		throw new Error('useAuth must be wrapped in a <AuthProvider />');
	}

	return value;
}

export function AuthProvider({children}: PropsWithChildren) {
	const [refreshToken, setRefreshToken] = useStorageState<string>('REF_TOKEN');
	const [accessToken, setAccessToken] = useStorageState<string>('ACCESS_TOKEN');
	const [user, setUser, isLoading] = useStorageState<User>('USER');

	const signIn = (user: User, accToken: string, refToken: string) => {
		setAccessToken(accToken);
		setRefreshToken(refToken);
		setUser(user);
	};
	const signOut = () => {
		setUser(null);
		setAccessToken(null);
		setRefreshToken(null);
	};
	const memorizeValues = useMemo(
		() => ({
			signIn,
			signOut,
			user,
			isLoading,
			refreshToken,
			accessToken,
		}),
		[user, isLoading, refreshToken, accessToken]
	);
	return <AuthContext.Provider value={memorizeValues}>{children}</AuthContext.Provider>;
}
