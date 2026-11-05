import {useColorScheme as useNativeWindColorScheme} from 'nativewind';
import React, {PropsWithChildren, createContext, useCallback, useContext, useEffect} from 'react';
import {useStorageState} from '../hooks/useStorageState';
type ThemeType = 'light' | 'dark';

const ThemeContext = createContext<{
	theme: ThemeType | null;
	loadingTheme: boolean;
	toggleTheme: () => void;
}>({
	theme: 'light',
	loadingTheme: false,
	toggleTheme: () => null,
});
// Use this hook to access the user info.
export function useTheme() {
	const value = useContext(ThemeContext);
	if (!value) {
		throw new Error('useTheme must be wrapped in a <AuthProvider />');
	}

	return value;
}
export const CustomThemeProvider = ({children}: PropsWithChildren) => {
	const {setColorScheme} = useNativeWindColorScheme();
	const [theme, setTheme, loadingTheme] = useStorageState<ThemeType>('APP_THEME');

	useEffect(() => {
		if (!theme) return;
		console.log('Color Schema Changed to' + theme);
		setColorScheme(theme);
	}, [theme]);

	const toggleTheme = useCallback(async () => {
		const newTheme = theme === 'light' ? 'dark' : 'light';
		setTheme(newTheme);
	}, [theme]);

	return <ThemeContext.Provider value={{theme, loadingTheme, toggleTheme}}>{children}</ThemeContext.Provider>;
};
