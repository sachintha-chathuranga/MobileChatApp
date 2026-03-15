import {Mask} from 'react-native-mask-input';

export type User = {
	user_id: number;
	fname: string;
	lname: string;
	phone: string;
	email: string;
	about: string;
	profil_pic: string | null;
	status: boolean;
};

export type Message = {
	id: number;
	sender_id: number;
	receiver_id: number;
	message: string;
};

export type Friend = {
	id: number;
	fname: string;
	lname: string;
	lastMessage: string;
	profil_pic: string;
	status: boolean;
};

export type AboutItem = {
	id: number;
	emoji: string;
	label: string;
};

export type Country = {
	id: string;
	name: string;
	code: string;
	flag: string;
	mask: Mask;
};
