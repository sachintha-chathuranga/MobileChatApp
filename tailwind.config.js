/** @type {import('tailwindcss').Config} */

import {Colors} from './src/constants/theme';

module.exports = {
	// NOTE: Update this to include the paths to all files that contain Nativewind classes.
	content: ['./App.tsx', './src/app/**/*.{js,jsx,ts,tsx}', './src/components/**/*.{js,jsx,ts,tsx}'],
	presets: [require('nativewind/preset')],
	darkMode: 'class',
	theme: {
		extend: {
			colors: Colors,
		},
	},
	plugins: [],
};

// module.exports.colors = colors;
