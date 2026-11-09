import {User} from '@/src/constants/types';
import {useStorageState} from '@/src/hooks/useStorageState';
import {createContext, useCallback, useContext, useState, type PropsWithChildren} from 'react';
import {logOutCall} from '../services/apiCalls';

const AuthContext = createContext<{
	signIn: (user: User, accToken: string, refToken: string) => void;
	signOut: () => Promise<number | null>;
	user: User | null;
	loadingUser: boolean;
	refreshToken: string | null;
	accessToken: string | null;
	setAccessToken: (token: string | null) => void;
	setUser: (user: User | null) => void;
	isLogouting: boolean;
}>({
	signIn: () => null,
	signOut: async () => null,
	user: null,
	loadingUser: false,
	refreshToken: null,
	accessToken: null,
	setAccessToken: () => null,
	setUser: () => null,
	isLogouting: false,
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
	const [isLogouting, setLogouting] = useState(false);

	const signIn = useCallback((logedUser: User, accToken: string, refToken: string) => {
		setAccessToken(accToken);
		setRefreshToken(refToken);
		setUser(logedUser);
	}, []);

	const signOut = useCallback(async () => {
		setLogouting(true);
		return logOutCall(Number(user?.user_id)).then((data) => {
			if (!data) return null;
			setLogouting(false);
			removeUser();
			removeRefToken();
			setAccessToken(null);
			return data;
		});
	}, [user?.user_id]);

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
				isLogouting,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
