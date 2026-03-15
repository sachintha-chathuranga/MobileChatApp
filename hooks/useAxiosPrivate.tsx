import {useAuth} from '@/context/authContext';
import {getNewToken} from '@/services/apiCalls';
import {axiosPublic} from '@/services/axios';
import {useEffect} from 'react';

const useAxiosPrivate = () => {
	const {user, token} = useAuth();

	useEffect(() => {
		const requestIntercept = axiosPublic.interceptors.request.use(
			(config) => {
				if (!config.headers['Authorization']) {
					config.headers['Authorization'] = `Bearer ${token}`;
				}
				return config;
			},
			(error) => Promise.reject(error)
		);

		const responseIntercept = axiosPublic.interceptors.response.use(
			(response) => response,
			async (err) => {
				const prevRequest = err?.config;
				if (err?.response?.status === 403 && !prevRequest?.sent) {
					prevRequest.sent = true;
					const token = await getNewToken();
					if (token) {
						prevRequest.headers['Authorization'] = `Bearer ${token}`;
						return axiosPublic(prevRequest);
					}
					return Promise.reject(err);
				}
				return Promise.reject(err);
			}
		);

		return () => {
			axiosPublic.interceptors.request.eject(requestIntercept);
			axiosPublic.interceptors.response.eject(responseIntercept);
		};
	}, [user]);

	return axiosPublic;
};

export default useAxiosPrivate;
