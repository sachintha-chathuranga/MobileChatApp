import {useStorageState} from '@/hooks/useStorageState';
import {useRouter} from 'expo-router';
import {createContext, use, type PropsWithChildren} from 'react';

const AuthContext = createContext<{
	signIn: () => void;
	signOut: () => void;
	session?: string | null;
	isLoading: boolean;
}>({
	signIn: () => null,
	signOut: () => null,
	session: null,
	isLoading: false,
});

// Use this hook to access the user info.
export function useSession() {
	const value = use(AuthContext);
	if (!value) {
		throw new Error('useSession must be wrapped in a <SessionProvider />');
	}

	return value;
}

export function SessionProvider({children}: PropsWithChildren) {
	const [[isLoading, session], setSession] = useStorageState('session');
	const router = useRouter();

	return (
		<AuthContext.Provider
			value={{
				signIn: () => {
					// Perform sign-in logic here
					setSession('xxx');
					router.replace('/home');
				},
				signOut: () => {
					setSession(null);
					router.replace('/');
				},
				session,
				isLoading,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
