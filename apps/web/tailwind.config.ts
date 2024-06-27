import { type Config } from 'tailwindcss'
import sharedConfig from '@repo/tailwind-config'

export default {
  darkMode: 'selector',
  content: ['./{src,mdx}/**/*.{js,mjs,jsx,ts,tsx,mdx}'],
  presets: [sharedConfig],
} satisfies Config
