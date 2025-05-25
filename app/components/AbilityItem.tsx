'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Ability = {
  displayName: string
  description: string
  displayIcon: string
}

export default function AbilityItem({ ability }: { ability: Ability }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className="relative flex flex-col items-center text-center group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <img
        src={ability.displayIcon}
        alt={ability.displayName}
        className="w-10 h-10 transition-transform duration-200 ease-in-out"
      />
      <span className="text-lg font-semibold mt-2">{ability.displayName}</span>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 bottom-full mb-3 w-64 bg-black text-white text-sm p-4 rounded-xl shadow-lg"
          >
            {ability.description}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
