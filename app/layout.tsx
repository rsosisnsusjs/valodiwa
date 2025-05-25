// app/layout.tsx
import './globals.css'
import Navbar from '@/app/components/Navbar'
import { ReactNode } from 'react'

// ✅ Import fonts
import { Poppins } from 'next/font/google'
import { Noto_Sans_Thai } from 'next/font/google'

// ✅ Load font with variable name
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-en',
})

const notoThai = Noto_Sans_Thai({
  subsets: ['thai'],
  weight: ['400', '700'],
  variable: '--font-th',
})

export const metadata = {
  title: 'Valorant Agent Info',
  description: 'View details of agents in Thai and English with dynamic background',
}

// ✅ Apply className for fonts
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="th" className={`${poppins.variable} ${notoThai.variable}`}>
      <body className="font-sans bg-background text-foreground">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
