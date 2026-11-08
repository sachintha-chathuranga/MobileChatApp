import {User} from '@/src/constants/types';
import {useStorageState} from '@/src/hooks/useStorageState';
import {Axios} from 'axios';
import {createContext, useCallback, useContext, useState, type PropsWithChildren} from 'react';

const AuthContext = createContext<{
	signIn: (user: User, accToken: string, refToken: string) => void;
	signOut: (axiosPrivate?: Axios) => void;
	user: User | null;
	loadingUser: boolean;
	refreshToken: string | null;
	accessToken: string | null;
	setAccessToken: (token: string | null) => void;
	setUser: (user: User | null) => void;
}>({
	signIn: () => null,
	signOut: () => null,
	user: null,
	loadingUser: false,
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
	const [refreshToken, setRefreshToken, loadingRefreshToken, removeRefToken] = useStorageState<string>('REF_TOKEN');
	const [accessToken, setAccessToken] = useState<string | null>(null);
	const [user, setUser, loadingUser, removeUser] = useStorageState<User>('USER');

	const signIn = useCallback((logedUser: User, accToken: string, refToken: string) => {
		setAccessToken(accToken);
		setRefreshToken(refToken);
		setUser(logedUser);
	}, []);

	const signOut = useCallback(() => {
		removeUser();
		removeRefToken();
		setAccessToken(null);
	}, []);

	return (
		<AuthContext.Provider
			value={{
				signIn,
				signOut,
				user,
				loadingUser,
				refreshToken,
				accessToken,
				setAccessToken,
				setUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
