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
}