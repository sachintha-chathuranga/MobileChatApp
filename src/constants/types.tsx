import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {Mask} from 'react-native-mask-input';
type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

export type MenuItem = {
	id: number;
	icon: IconName;
	name: string;
	function: () => void;
};

export type User = {
	user_id: number;
	fname: string;
	lname: string;
	phone: string;
	email: string;
	about: string | null;
	profil_pic: string | null;
	status: boolean;
};

export type UpdateUser = {
	fname?: string;
	lname?: string;
	phone?: string;
	email?: string;
	about?: string | null;
	profil_pic?: string | null;
	status?: boolean;
};

export type Message = {
	id: number;
	sender_id: number;
	receiver_id: number;
	message: string;
	is_read?: boolean;
	createdAt: number;
};
export type NewMessage = {
	sender_id: number;
	receiver_id: number;
	message: string;
	createdAt: number;
};

export type Friend = {
	user_id: number;
	fname: string;
	lname: string;
	lastMessage: string;
	lastMessageTime: number;
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
	length: number;
};

export type ThemeType = 'light' | 'dark';

export type VerifyType = 'update-phone' | 'sign-in' | 'update-mail';

export type CropPath = '/profile/crop_image' | '/signup/crop_image';
export type CropBackPath = '/signup' | '/profile' | '/[img_uri]';
