import {Country} from './types';

export const CONSTANT = {
	appName: 'BlissChat',
};

export const COUNTRIES: Country[] = [
	{
		id: 'lk',
		name: 'Sri Lanka',
		code: '+94',
		flag: '🇱🇰',
		mask: ['+', '9', '4', ' ', /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
		length: 9,
	},
	{
		id: 'in',
		name: 'India',
		code: '+91',
		flag: '🇮🇳',
		mask: ['+', '9', '1', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/],
		length: 10,
	},
	{
		id: 'us',
		name: 'United States',
		code: '+1',
		flag: '🇺🇸',
		mask: ['+', '1', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
		length: 10,
	},
	{
		id: 'gb',
		name: 'United Kingdom',
		code: '+44',
		flag: '🇬🇧',
		mask: ['+', '4', '4', ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
		length: 10,
	},
	{
		id: 'au',
		name: 'Australia',
		code: '+61',
		flag: '🇦🇺',
		mask: ['+', '6', '1', ' ', /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/],
		length: 8,
	},
	{
		id: 'ca',
		name: 'Canada',
		code: '+1',
		flag: '🇨🇦',
		mask: ['+', '1', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
		length: 10,
	},
	{
		id: 'de',
		name: 'Germany',
		code: '+49',
		flag: '🇩🇪',
		mask: ['+', '4', '9', ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
		length: 10,
	},
	{
		id: 'fr',
		name: 'France',
		code: '+33',
		flag: '🇫🇷',
		mask: ['+', '3', '3', ' ', /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/],
		length: 7,
	},
	{
		id: 'sg',
		name: 'Singapore',
		code: '+65',
		flag: '🇸🇬',
		mask: ['+', '6', '5', ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/],
		length: 8,
	},
	{
		id: 'ae',
		name: 'United Arab Emirates',
		code: '+971',
		flag: '🇦🇪',
		mask: ['+', '9', '7', '1', ' ', /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/],
		length: 8,
	},
];
