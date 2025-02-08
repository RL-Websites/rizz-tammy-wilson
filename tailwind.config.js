/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./*.html', './assets/**/*.js'],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: 'var(--primary)',
				},
				dark1: 'var(--dark1)',
				dark2: 'var(--dark2)',
				dark3: 'var(--dark3)',
				dark4: 'var(--dark4)',
				grey1: 'var(--grey1)',
			},
			keyframes: {
				bounceIn: {
					'0%': {
						transform: 'scale(1.3)',
						opacity: '0.8',
					},
					'50%': {
						transform: 'scale(0.85)',
						opacity: '1',
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1',
					},
				},
			},
			animation: {
				bounceIn: 'bounceIn 1s ease-in-out',
			},
		},
		container: {
			screens: {
				'2xl': '1300px',
			},
		},
	},
	plugins: [],
};
