import { join } from 'path';
import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';
import { bdsTheme } from './bdstheme'

// 1. Import the Skeleton plugin
import { skeleton } from '@skeletonlabs/tw-plugin';
const config = {
	// 2. Opt for dark mode to be handled via the class method
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		// 3. Append the path to the Skeleton package
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {
			keyframes: {
				glitch: {
					'0%, 100%': { transform: 'translate(0)' },
					'20%': { transform: 'translate(-2px, -2px)' },
					'40%': { transform: 'translate(2px, 2px)' },
					'60%': { transform: 'translate(-2px, 2px)' },
					'80%': { transform: 'translate(2px, -2px)' },
				  },
				  glitchTop: {
					'0%, 100%': { transform: 'translate(0)' },
					'20%': { transform: 'translate(2px, -2px)' },
					'40%': { transform: 'translate(-2px, 2px)' },
					'60%': { transform: 'translate(2px, 2px)' },
					'80%': { transform: 'translate(-2px, -2px)' },
				  },
				  glitchBottom: {
					'0%, 100%': { transform: 'translate(0)' },
					'20%': { transform: 'translate(-2px, 2px)' },
					'40%': { transform: 'translate(2px, -2px)' },
					'60%': { transform: 'translate(-2px, -2px)' },
					'80%': { transform: 'translate(2px, 2px)' },
				  },
				  shake: {
					'0%, 100%': { transform: 'translate(0, 0)' },
					'10%, 30%, 50%, 70%, 90%': { transform: 'translate(-10px, -10px)' },
					'20%, 40%, 60%, 80%': { transform: 'translate(10px, 10px)' },
				  }
				},
				animation: {
				  glitch: 'glitch 1s infinite',
				  glitchTop: 'glitchTop 1s infinite',
				  glitchBottom: 'glitchBottom 1s infinite',
				  shake: 'shake 1s infinite',
				}
		    }
	},
	plugins: [
		forms,
		// 4. Append the Skeleton plugin (after other plugins)
		skeleton({
			themes: {
				preset: [
					{
						name: 'skeleton',
						enhancements: true,
					}
				],
				custom: [
					bdsTheme
					
				]
			}
		})
	]
} satisfies Config;

export default config;
