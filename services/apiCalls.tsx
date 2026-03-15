import {Alert} from 'react-native';
import {axiosPublic} from './requestConfig';

function handleError(error: any) {
	if (!error?.response) {
		console.log(error);
		Alert.alert('Server Error', 'Server does not respond!');
	} else if (error.response?.data) {
		console.log(error.response);
		Alert.alert('Server Error', error.response.data.message);
	} else {
		Alert.alert('Network Error', 'Check your Internet Connection');
	}
}

export const getNewToken = async () => {
	try {
		const res = await axiosPublic.get(`tokens/update`);
	} catch (err: any) {
		if (!err?.response) {
			return null;
		} else if (err.response?.data) {
			localStorage.removeItem('user');
			sessionStorage.removeItem('user');
			return null;
		} else {
			return null;
		}
	}
};
export const sendOTP = async (phone: string) => {
	try {
		const res = await axiosPublic.post(`auth/send-otp`, {phone});
		return res.data;
	} catch (error: any) {
		handleError(error);
		throw error;
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

export const signUp = async (userId: string, userName: string) => {
	try {
		const res = await axiosPublic.post(`auth/sign-up`, {userId, userName});
		return res.data;
	} catch (error) {
		handleError(error);
		throw error;
	}
};

// export const logOutCall = async (axiosPrivate) => {
// 	try {
// 		const res = await axiosPrivate.post(`users/logout`);

// 		localStorage.removeItem('user');
// 		sessionStorage.removeItem('user');
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
// export const userUpdateCall = async (axiosPrivate, userCredintial) => {
// 	try {
// 		const res = await axiosPrivate.put(`users/`, userCredintial);
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
// export const fetchFriendList = async (axiosPrivate, index) => {
// 	try {
// 		const res = await axiosPrivate.get(index ? `users/friends?index=${index}` : `users/friends`);
// 		return res.data;
// 	} catch (error) {
// 		console.log(error);
// 		return [];
// 	}
// };
// export const getFriend = async (axiosPrivate, friend_id) => {
// 	try {
// 		const res = await axiosPrivate.get(`users/${friend_id}`);

// 		return res.data;
// 	} catch (err) {
// 		if (!err?.response) {
// 			return null;
// 		} else if (err.response?.data) {
// 			return null;
// 		} else {
// 			return null;
// 		}
// 	}
// };
// export const searchFriend = async (axiosPrivate, index, searchInput) => {
// 	try {
// 		const res = await axiosPrivate.post(index ? `users/search?index=${index}` : `users/search`, {name: searchInput});
// 		return res.data;
// 	} catch (err) {
// 		console.log(err);
// 		return [];
// 	}
// };

// export const fetchMessages = async (axiosPrivate, friend_id) => {
// 	const res = await axiosPrivate.get(`messages/message?friend_id=${friend_id}`);
// 	return res.data;
// };
// export const clearMessages = async (axiosPrivate, friend_id) => {
// 	axiosPrivate
// 		.delete(`messages/messages/clear?friend_id=${friend_id}`)
// 		.then((res) => {})
// 		.catch((err) => {});
// };
// export const readAllMessages = async (axiosPrivate, friend_id) => {
// 	try {
// 		axiosPrivate.put(`messages/messages/update?friend_id=${friend_id}`);
// 	} catch (err) {
// 		console.log(err);
// 	}
// };
// export const fetchAllNotification = async (axiosPrivate) => {
// 	try {
// 		const res = await axiosPrivate.get(`messages/messages/notifications`);
// 		return res.data;
// 	} catch (err) {
// 		console.log(err);
// 		return null;
// 	}
// };

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
