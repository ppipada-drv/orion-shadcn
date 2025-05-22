import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		dts({
			exclude: ['**/*.stories.ts', '**/*.stories.tsx', '**/*.mdx'],
		}),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	build: {
		lib: {
			entry: path.resolve(__dirname, 'src/index.ts'),
			name: 'OrionShadcn',
			fileName: format => `orion-shadcn.${format}.js`,
			formats: ['es', 'cjs'],
		},
		rollupOptions: {
			external: ['react', 'react-dom'],
			output: {
				globals: {
					react: 'React',
					'react-dom': 'ReactDOM',
				},
			},

			input: [path.resolve(__dirname, 'src/index.ts')],
		},
		cssCodeSplit: false,
	},
});
