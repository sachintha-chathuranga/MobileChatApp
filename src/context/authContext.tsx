import {User} from '@/src/constants/types';
import {useStorageState} from '@/src/hooks/useStorageState';
import {Axios} from 'axios';
import {createContext, useCallback, useContext, useMemo, useState, type PropsWithChildren} from 'react';
import {logOutCall} from '../services/apiCalls';

const AuthContext = createContext<{
	signIn: (user: User, accToken: string, refToken: string) => void;
	signOut: (axiosPrivate: Axios) => void;
	user: User | null;
	isLoading: boolean | null;
	refreshToken: string | null;
	accessToken: string | null;
	setAccessToken: (token: string | null) => void;
	setUser: (user: User | null) => void;
}>({
	signIn: () => null,
	signOut: () => null,
	user: null,
	isLoading: false,
	refreshToken: null,
	accessToken: null,
	setAccessToken: () => null,
	setUser: () => null,
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
	const [accessToken, setAccessToken] = useState<string | null>('');
	const [user, setUser, isLoading] = useStorageState<User>('USER');

	const signIn = (user: User, accToken: string, refToken: string) => {
		setAccessToken(accToken);
		setRefreshToken(refToken);
		setUser(user);
	};
	const signOut = useCallback(
		(axiosPrivate: Axios) => {
			logOutCall(axiosPrivate).then((data) => {
				if (data) {
					setUser(null);
					setAccessToken(null);
					setRefreshToken(null);
				}
			});
		},
		[]
	);

	const memorizeValues = useMemo(
		() => ({
			signIn,
			signOut,
			user,
			isLoading,
			refreshToken,
			accessToken,
			setAccessToken,
			setUser,
		}),
		[user, isLoading, refreshToken, accessToken]
	);
	return <AuthContext.Provider value={memorizeValues}>{children}</AuthContext.Provider>;
}
