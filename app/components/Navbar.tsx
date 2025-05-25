'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="w-full bg-black text-white py-4 px-8 flex justify-between items-center shadow-md sticky top-0 z-50"
    >
      <div className="text-2xl font-extrabold tracking-wider text-red-500 drop-shadow-sm">
        VALODIWA
      </div>

      <div className="flex gap-8 text-lg font-medium">
        {['Home', 'Agents', 'Bundles'].map((item, index) => (
          <Link
            key={index}
            href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
            className="relative group"
          >
            <span className="transition-colors duration-300 group-hover:text-red-400">
              {item}
            </span>
            <span
              className="absolute left-0 -bottom-1 w-0 h-0.5 bg-red-400 transition-all duration-300 group-hover:w-full"
            />
          </Link>
        ))}
      </div>
    </motion.nav>
  )
}
