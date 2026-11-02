import {Axios} from 'axios';
import {Alert} from 'react-native';
import {NewMessage, UpdateUser} from '../constants/types';
import {axiosPublic} from './requestConfig';

function handleError(error: any) {
	if (!error?.response) {
		Alert.alert('Server Error', 'Server does not respond!');
	} else if (error.response?.data) {
		console.log(error.response.data)
		Alert.alert('Server Error', error.response.data);
	} else {
		Alert.alert('Network Error', 'Check your Internet Connection');
	}
}

export const getNewToken = async (refreshToken: string | null) => {
	try {
		const res = await axiosPublic.put(`auth/update-mobile-token`, {refreshToken});
		return res.data.access_token;
	} catch (err: any) {
		handleError(err);
		return null;
	}
};
export const sendOTP = async (phone: string) => {
	try {
		const res = await axiosPublic.post(`auth/send-otp`, {phone});
		return res.data;
	} catch (error: any) {
		handleError(error);
		return null;
	}
};

export const checkPhoneNumber = async (axiosPrivate: Axios,phone: string) => {
	try {
		const res = await axiosPrivate.get(`users/phone/${phone}`);
		console.log(res.data)
		return res.data;
	} catch (error: any) {
		handleError(error);
		return null;
	}
};
export const checkEmail = async (axiosPrivate: Axios,email: string) => {
	try {
		const res = await axiosPrivate.get(`users/email/${email}`);
		return res.data;
	} catch (error: any) {
		handleError(error);
		return null;
	}
};
export const verifyOTP = async (phone: string, otp: string) => {
	try {
		const res = await axiosPublic.post(`auth/verify-otp`, {phone, otp});
		return res.data;
	} catch (error: any) {
		handleError(error);
		throw error;
	}
};
export const signInCall = async (phone: string) => {
	try {
		const res = await axiosPublic.post(`auth/mobile-sign-in`, {phone});
		return res.data;
	} catch (error: any) {
		handleError(error);
		return null;
	}
};

export const signUp = async (userId: string, userName: string) => {
	try {
		const res = await axiosPublic.post(`auth/mobile-sign-up`, {userId, userName});
		return res.data;
	} catch (error) {
		handleError(error);
		return null
	}
};

export const postMessage = async (axiosPrivate: Axios, msg: NewMessage) => {
	try {
		const res = await axiosPrivate.post(`messages/message`, JSON.stringify(msg));
		return res.data;
	} catch (error) {
		handleError(error);
		return null;
	}
};

export const logOutCall = async (axiosPrivate:Axios) => {
	try {
		const res = await axiosPrivate.put(`auth/mobile-sign-out`);
		return res.status;
	} catch (err) {
		
		handleError(err)
		return null;
	}
};
export const userUpdateCall = async (axiosPrivate: Axios, userDetails: UpdateUser) => {
	try {
		const res = await axiosPrivate.put(`users/`, userDetails);
		console.log(res.data);
		return res.status;
	} catch (err) {
		handleError(err);
		return 500;
	}
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
		handleError(error);
		return [];
	}
};
export const fetchFriendList = async (axiosPrivate: Axios, index: number | null) => {
	try {
		const res = await axiosPrivate.get(index ? `users/friends?index=${index}` : `users/friends`);
		return res.data;
	} catch (error) {
		handleError(error);
		return [];
	}
};
export const fetchFriend = async (axiosPrivate: Axios, friendId: number) => {
	try {
		const res = await axiosPrivate.get(`users/${friendId}`);
		return res.data;
	} catch (error) {
		handleError(error);
		return null;
	}
};

export const searchFriends = async (axiosPrivate: Axios, index: number | null, searchInput: string) => {
	try {
		const res = await axiosPrivate.post(index ? `users/search?index=${index}` : `users/search`, {name: searchInput});
		return res.data;
	} catch (error) {
		handleError(error);
		return [];
	}
};

export const fetchMessages = async (axiosPrivate: Axios, friend_id: number,index: number) => {
	try {
		const res = await axiosPrivate.get(`messages/message?friend_id=${friend_id}&order_by=DESC&index=${index}`);
		return res.data;
	} catch (error) {
		handleError(error);
		return [];
	}
};
export const clearMessages = (axiosPrivate: Axios, friend_id: number) => {
	axiosPrivate
		.delete(`messages/messages/clear?friend_id=${friend_id}`)
		.then((res) => {
			
		})
		.catch((err) => {
			handleError(err);
		});
};
export const readAllMessages = async (axiosPrivate: Axios, friend_id: number) => {
	try {
		await axiosPrivate.put(`messages/messages/update?friend_id=${friend_id}`);
	} catch (err) {
		handleError(err)
	}
};
export const fetchAllNotification = async (axiosPrivate: Axios) => {
	try {
		const res = await axiosPrivate.get(`messages/messages/notifications`);
		return res.data;
	} catch (err) {
		handleError(err)
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