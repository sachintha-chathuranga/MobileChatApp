import {User} from '@/constants/types';
import {useStorageState} from '@/hooks/useStorageState';
import {useRouter} from 'expo-router';
import {createContext, use, type PropsWithChildren} from 'react';

const AuthContext = createContext<{
	signIn: (user: User) => void;
	signOut: () => void;
	user: User | null;
	isLoading: boolean | null;
	token: string | null;
}>({
	signIn: () => null,
	signOut: () => null,
	user: null,
	isLoading: false,
	token: null,
});

// Use this hook to access the user info.
export function useAuth() {
	const value = use(AuthContext);
	if (!value) {
		throw new Error('useAuth must be wrapped in a <AuthProvider />');
	}

	return value;
}

export function AuthProvider({children}: PropsWithChildren) {
	const [user, setUser, isLoading] = useStorageState<User>('USER');
	const [token, setToken, isTokenLoading] = useStorageState<string>('TOKEN');
	const [session, setSession, isLoadinSession] = useStorageState<string>('session');
	const router = useRouter();

	const signIn = (user: User) => {
		setUser(user);
	};
	const signOut = () => {
		setUser(null);
		router.replace('/');
	};
	return (
		<AuthContext.Provider
			value={{
				signIn,
				signOut,
				user,
				isLoading,
				token,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
