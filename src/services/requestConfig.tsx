import {API_URL} from '@/src/constants/config';
import axios from 'axios';

export const axiosPublic = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-type': 'application/json',
	},
	withCredentials: true,
});

export const axiosRefresh = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-type': 'application/json',
	},
	withCredentials: true,
});
