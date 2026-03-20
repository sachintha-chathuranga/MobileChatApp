import {API_URL} from '@/src/constants/config';
import axios from 'axios';

export const axiosPublic = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-type': 'application/json',
	},
	withCredentials: true,
});
// export const apiPublicRequest = async (url: string, options:any) => {
// 	try {
// 		const response = await axiosPublic.post(url, options);

// 		if (!response.data) {
// 			const message = response.statusText;
// 			throw new Error(message || 'Request failed');
// 		}

// 		return await response.data.json();
// 	} catch (error) {
// 		console.error('API Error:', error);
// 		throw error;
// 	}
// };
