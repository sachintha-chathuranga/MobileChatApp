import * as SecureStore from 'expo-secure-store';
import {useCallback, useEffect, useState} from 'react';
import {Platform} from 'react-native';

type StorageState<T> = [T | null, (value: T | null) => void, boolean, () => void];

export async function setStorageItemAsync(key: string, value: any | null) {
	const stringValue = value ? JSON.stringify(value) : null;
	if (Platform.OS === 'web') {
		try {
			if (stringValue === null) {
				localStorage.removeItem(key);
			} else {
				localStorage.setItem(key, stringValue);
			}
		} catch (e) {
			console.error('Local storage is unavailable:', e);
		}
	} else {
		if (stringValue == null) {
			await SecureStore.deleteItemAsync(key);
		} else {
			await SecureStore.setItemAsync(key, stringValue);
		}
	}
}

export function useStorageState<T>(key: string): StorageState<T> {
	const [state, setState] = useState<T | null>(null);
	const [loadingStorage, setLoadingStorage] = useState<boolean>(true);

	const loadStorage = useCallback(async () => {
		try {
			let value: string | null = null;

			if (Platform.OS === 'web') {
				value = localStorage.getItem(key);
			} else {
				value = await SecureStore.getItemAsync(key);
			}
			// console.log(`Onload ${key}: ${value}`);
			setState(value ? JSON.parse(value) : null);
		} finally {
			setLoadingStorage(false);
		}
	}, [key]);

	const clearStorage = useCallback(async () => {
		try {
			if (Platform.OS === 'web') {
				localStorage.removeItem(key);
			} else {
				await SecureStore.deleteItemAsync(key);
			}
			setState(null);
		} catch (error) {
			console.log(error);
		}
	}, [key]);

	useEffect(() => {
		loadStorage();
		// clearStorage();
	}, [key]);

	// Set
	const setValue = useCallback(
		(value: T | null) => {
			if (value === null) {
				return clearStorage();
			}
			setState(value);
			setStorageItemAsync(key, value);
		},
		[key]
	);

	return [state, setValue, loadingStorage, clearStorage];
}
