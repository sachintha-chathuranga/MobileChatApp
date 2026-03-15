import * as SecureStore from 'expo-secure-store';
import {useColorScheme as useNativeWindColorScheme} from 'nativewind';
import React, {PropsWithChildren, createContext, useEffect, useState} from 'react';
import {Platform} from 'react-native';
type ThemeType = 'light' | 'dark';

export const ThemeContext = createContext({
	theme: 'light' as ThemeType,
	toggleTheme: () => {},
});

export async function setStorageItemAsync(key: string, value: string | null) {
	if (Platform.OS === 'web') {
		try {
			if (value === null) {
				localStorage.removeItem(key);
			} else {
				localStorage.setItem(key, value);
			}
		} catch (e) {
			console.error('Local storage is unavailable:', e);
		}
	} else {
		if (value == null) {
			await SecureStore.deleteItemAsync(key);
		} else {
			await SecureStore.setItemAsync(key, value);
		}
	}
}

export const ThemeProvider = ({children}: PropsWithChildren) => {
	const {setColorScheme} = useNativeWindColorScheme();
	const [theme, setTheme] = useState<ThemeType>('light');

	// Load saved theme on app start
	useEffect(() => {
		loadTheme();
	}, []);

	const loadTheme = async () => {
		let savedTheme: string | null = null;
		if (Platform.OS === 'web') {
			try {
				if (typeof localStorage !== 'undefined') {
					savedTheme = localStorage.getItem('APP_THEME');
				}
			} catch (e) {
				console.error('Local storage is unavailable:', e);
			}
		} else {
			SecureStore.getItemAsync('APP_THEME').then((value: string | null) => {
				savedTheme = value;
			});
		}

		if (savedTheme === 'dark' || savedTheme === 'light') {
			setTheme(savedTheme);
			setColorScheme(savedTheme);
		} else {
			setTheme('light');
			setColorScheme('light');
			await setStorageItemAsync('APP_THEME', 'light');
		}
	};

	const toggleTheme = async () => {
		const newTheme = theme === 'light' ? 'dark' : 'light';

		setTheme(newTheme);
		setColorScheme(newTheme);
		await setStorageItemAsync('APP_THEME', newTheme);
	};

	return <ThemeContext.Provider value={{theme, toggleTheme}}>{children}</ThemeContext.Provider>;
};
