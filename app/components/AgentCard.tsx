'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'

type AgentCardProps = {
  uuid: string
  displayName: string
  displayIcon: string
  role: {
    displayName: string
    displayIcon: string
  } | null
  backgroundGradientColors: string[]
}

export default function AgentCard({
  displayName,
  displayIcon,
  role,
  backgroundGradientColors,
}: AgentCardProps) {
  const gradient = `linear-gradient(135deg, #${backgroundGradientColors[0]}, #${backgroundGradientColors[1]}, #${backgroundGradientColors[2]}, #${backgroundGradientColors[3]})`

  return (
    <Link href={`/agent/${displayName.toLowerCase()}`} className="block">
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        className="rounded-xl shadow-lg text-white overflow-hidden cursor-pointer"
        style={{ background: gradient }}
      >
        <div className="flex flex-col items-center p-4 backdrop-blur-sm bg-black/30">
          <Image
            src={displayIcon}
            alt={displayName}
            width={96}
            height={96}
            className="mx-auto transition-transform duration-300 hover:scale-110 drop-shadow-lg"
          />
          <h2 className="text-2xl font-bold mt-2 font-heading">{displayName}</h2>
          {role && (
            <div className="flex items-center gap-2 mt-1 text-sm opacity-90">
              <Image src={role.displayIcon} alt={role.displayName} width={20} height={20} />
              <span>{role.displayName}</span>
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  )
}
