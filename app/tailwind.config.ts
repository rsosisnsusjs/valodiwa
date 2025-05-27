import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class', // บังคับใช้ class-based dark mode
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-th)', 'var(--font-en)', 'sans-serif'],
        thai: ['var(--font-th)', 'sans-serif'],
        en: ['var(--font-en)', 'sans-serif'],
      },
      colors: {
        background: 'var(--color-background)',   // พื้นหลังจาก CSS var
        foreground: 'var(--color-foreground)',   // สีข้อความจาก CSS var

        // เพิ่มค่าสำหรับ dark-theme โดยตรง
        dark: {
          background: '#1f2937', // tailwind gray-800
          foreground: '#e5e7eb', // tailwind gray-200
          card: '#374151',       // tailwind gray-700
          border: '#4b5563',     // tailwind gray-600
        },
      },
    },
  },
  plugins: [],
}

export default config
