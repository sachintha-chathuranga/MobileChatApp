import * as SecureStore from 'expo-secure-store';
import {useCallback, useEffect, useReducer} from 'react';
import {Platform} from 'react-native';

type StorageState<T> = [T | null, (value: T | null) => void, boolean | null, () => void];

function useAsyncState<T>(initialValue: T | null = null): [T | null, (value: T | null) => void] {
	return useReducer((state: T | null, action: T | null) => action, initialValue) as [
		T | null,
		(value: T | null) => void,
	];
}

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
	// Public
	const [state, setState] = useAsyncState<T>(null);
	const [loading, setLoading] = useAsyncState<boolean>(true);
	// Get
	async function load() {
		try {
			let value: string | null = null;

			if (Platform.OS === 'web') {
				value = localStorage.getItem(key);
			} else {
				value = await SecureStore.getItemAsync(key);
			}
			console.log(`Onload ${key}: ${value}`);
			setState(
				value ? JSON.parse(value) : null
				// {
				// 		user_id: 1,
				// 		fname: 'Sachintha',
				// 		lname: 'Chathuranga',
				// 		phone: '+94 71 9057364',
				// 		profil_pic: null,
				// 		status: true,
				// 	}
			);
		} finally {
			setLoading(false);
		}
	}

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
		load();
		// clearStorage();
	}, []);

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

	return [state, setValue, loading, clearStorage];
}
