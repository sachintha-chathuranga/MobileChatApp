import {Axios} from 'axios';
import {NewMessage, UpdateUser} from '../constants/types';
import {axiosPublic, axiosRefresh} from './requestConfig';
import { API_URL } from '../constants/config';

export const getNewToken = async (refreshToken: string | null) => {
	try {
		const res = await axiosRefresh.put(`auth/update-mobile-token`, {refreshToken});
		return res.data.access_token;
	} catch (err: any) {
		return null;
	}
};

export const sendPhoneOTP = async (phone: string) => {
	console.log(API_URL)
	return await axiosPublic.post(`auth/send-phone-otp`, {phone});
};

export const sendEmailOTP = async (email: string) => {
	return await axiosPublic.post(`auth/send-mail-otp`, {email});
};

export const checkPhoneNumber = async (axiosPrivate: Axios, phone: string) => {
	return await axiosPrivate.get(`users/phone/${phone}`);
};

export const checkEmail = async (axiosPrivate: Axios, email: string) => {
	return await axiosPrivate.get(`users/email/${email}`);
};

export const verifyOTP = async (phone: string, otp: string) => {
	return await axiosPublic.post(`auth/verify-otp`, {phone, otp});
};

export const signInCall = async (phone: string) => {
	return await axiosPublic.post(`auth/mobile-sign-in`, {phone});
};

export const signUp = async (userId: number, userName: string, userImage: string | undefined) => {
	return await axiosPublic.post(`auth/mobile-sign-up`, {userId, userName, userImage});
};

export const postMessage = async (axiosPrivate: Axios, msg: NewMessage) => {
	return await axiosPrivate.post(`messages/message`, JSON.stringify(msg));
};

export const logOutCall = async (userId: number) => {
	try {
		const res = await axiosPublic.put(`auth/mobile-sign-out`, {userId});
		return res.status;
	} catch (err) {
		return null;
	}
};

export const userUpdateCall = async (axiosPrivate: Axios, userDetails: UpdateUser) => {
	return await axiosPrivate.put(`users/mobile/`, userDetails);
};
// export const userDeleteCall = async (axiosPrivate, userCredintial) => {
// 	try {
// 		const res = await axiosPrivate.delete(`users/`, {data: userCredintial});

// 		return res.status;
// 	} catch (err) {
// 		if (!err?.response) {
// 			return 500;
// 		} else if (err.response?.data) {
// 			return err.response.status;
// 		} else {
// 			return 500;
// 		}
// 	}
// };
export const fetchRecentChats = async (axiosPrivate: Axios, index: number) => {
	try {
		const res = await axiosPrivate.get(`users/recentFriends?index=${index}`);
		return res.data;
	} catch (error) {
		return [];
	}
};
export const fetchFriendList = async (axiosPrivate: Axios, index: number | null) => {
	try {
		const res = await axiosPrivate.get(index ? `users/friends?index=${index}` : `users/friends`);
		return res.data;
	} catch (error) {
		return [];
	}
};
export const fetchFriend = async (axiosPrivate: Axios, friendId: number) => {
	try {
		const res = await axiosPrivate.get(`users/${friendId}`);
		return res.data;
	} catch (error) {
		return null;
	}
};

export const searchFriends = async (axiosPrivate: Axios, index: number | null, searchInput: string) => {
	try {
		const res = await axiosPrivate.post(index ? `users/search?index=${index}` : `users/search`, {name: searchInput});
		return res.data;
	} catch (error) {
		return [];
	}
};

export const fetchMessages = async (axiosPrivate: Axios, friend_id: number, index: number) => {
	try {
		const res = await axiosPrivate.get(`messages/message?friend_id=${friend_id}&order_by=DESC&index=${index}`);
		return res.data;
	} catch (error) {
		return [];
	}
};

export const clearMessages = (axiosPrivate: Axios, friend_id: number) => {
	axiosPrivate.delete(`messages/messages/clear?friend_id=${friend_id}`).catch((error) => console.error(error));
};

export const deleteSelectedUserMessages = async (axiosPrivate: Axios, selectedUsers: Set<number>) => {
	return axiosPrivate
		.delete(`messages/messages/clear-selected`, {
			data: {
				friendIds: Array.from(selectedUsers),
			},
		})
		.then((res) => res.data)
		.catch((err) => {
			throw err;
		});
};
export const readAllMessages = async (axiosPrivate: Axios, friend_id: number) => {
	try {
		await axiosPrivate.put(`messages/messages/update?friend_id=${friend_id}`);
	} catch (err) {
		console.error(err);
	}
};
export const fetchAllNotification = async (axiosPrivate: Axios) => {
	try {
		const res = await axiosPrivate.get(`messages/messages/notifications`);
		return res.data;
	} catch (err) {
		return null;
	}
};

// export const getSignRequest = async (axiosPrivate, file) => {
// 	try {
// 		const res = await axiosPrivate.get(
// 			`aws/sign-s3?file_name=${encodeURIComponent(file.name)}&file_type=${file.type}`
// 		);
// 		return res;
// 	} catch (err) {
// 		if (!err?.response) {
// 			return 500;
// 		} else if (err.response?.data) {
// 			return err.response;
// 		} else {
// 			return 500;
// 		}
// 	}
// };
// export const deletPicture = async (axiosPrivate, profile_pic) => {
// 	try {
// 		const res = await axiosPrivate.delete(`aws/sign-s3/delete?file_name=${profile_pic}`);
// 		return res;
// 	} catch (err) {
// 		if (!err?.response) {
// 			return 500;
// 		} else if (err.response?.data) {
// 			return err.response;
// 		} else {
// 			return 500;
// 		}
// 	}
// };
