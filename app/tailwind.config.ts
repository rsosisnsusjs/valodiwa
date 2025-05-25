// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-th)', 'var(--font-en)', 'sans-serif'], // ไทยก่อน อังกฤษ
        thai: ['var(--font-th)', 'sans-serif'],
        en: ['var(--font-en)', 'sans-serif'],
      },
      colors: {
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
      },
    },
  },
  plugins: [],
}
export default config
