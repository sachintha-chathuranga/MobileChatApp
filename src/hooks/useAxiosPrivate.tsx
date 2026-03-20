import {useAuth} from '@/src/context/authContext';
import {getNewToken} from '@/src/services/apiCalls';
import {axiosPublic} from '@/src/services/requestConfig';
import {AxiosResponse} from 'axios';
import {memo, useEffect} from 'react';

const useAxiosPrivate = () => {
	const {accessToken, refreshToken, signOut} = useAuth();

	useEffect(() => {
		const requestIntercept = axiosPublic.interceptors.request.use(
			(config: any) => {
				if (!config.headers['Authorization']) {
					config.headers['Authorization'] = `Bearer ${accessToken}`;
				}
				return config;
			},
			(error: any) => Promise.reject(error)
		);

		const responseIntercept = axiosPublic.interceptors.response.use(
			(response: AxiosResponse) => response,
			async (err: any) => {
				const prevRequest = err?.config;
				if (err?.response?.status === 403 && !prevRequest?.sent) {
					prevRequest.sent = true;
					const newAccessToken = await getNewToken(refreshToken);
					if (newAccessToken) {
						prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
						return axiosPublic(prevRequest);
					}
					signOut();
				}
				return Promise.reject(err);
			}
		);

		return () => {
			axiosPublic.interceptors.request.eject(requestIntercept);
			axiosPublic.interceptors.response.eject(responseIntercept);
		};
	}, [accessToken, refreshToken]);

	return axiosPublic;
};

export default useAxiosPrivate;
