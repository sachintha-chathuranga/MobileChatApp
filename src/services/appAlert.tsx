export type AlertButton = {
	text?: string;
	onPress?: () => void;
	style?: 'default' | 'cancel' | 'destructive';
};

export type AlertOptions = {
	cancelable?: boolean;
	onDismiss?: () => void;
};

export type AlertRequest = {
	title?: string;
	message?: string;
	buttons: AlertButton[];
	options: AlertOptions;
};

type AlertHandler = (request: AlertRequest) => void;

let alertHandler: AlertHandler | null = null;

const pendingAlerts: AlertRequest[] = [];

const registerAlertHandler = (handler: AlertHandler | null) => {
	alertHandler = handler;

	if (handler) {
		while (pendingAlerts.length > 0) {
			handler(pendingAlerts.shift()!);
		}
	}
};

const alert = (title?: string, message?: string, buttons?: AlertButton[], options?: AlertOptions) => {
	const request: AlertRequest = {
		title,
		message,
		buttons: buttons?.length ? buttons : [{text: 'OK'}],
		options: options ?? {},
	};

	if (alertHandler) {
		alertHandler(request);
	} else {
		pendingAlerts.push(request);
	}
};

export const AppAlert = {
	alert,
	registerAlertHandler,
};
