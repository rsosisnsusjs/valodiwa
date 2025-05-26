'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import AbilityItem from '@/app/components/AbilityItem'
import Image from 'next/image'
import { Righteous } from 'next/font/google'

const righteous = Righteous({ subsets: ['latin'], weight: '400' })

type Ability = {
  slot: string
  displayName: string
  description: string
  displayIcon: string
}

type AgentDetailProps = {
  agent: {
    uuid: string
    displayName: string
    description: string
    displayIcon: string
    fullPortrait: string
    role: {
      displayName: string
      displayIcon: string
    }
    abilities: Ability[]
  }
  background: string
}

export default function AgentDetail({ agent, background }: AgentDetailProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div
      className="text-white min-h-screen p-8"
      style={{
        background,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative bg-black bg-opacity-60 p-8 rounded-3xl max-w-6xl mx-auto shadow-xl backdrop-blur-md"
      >
        <div className="flex flex-col md:flex-row items-center gap-8">
          <Image
            src={agent.displayIcon}
            alt={agent.displayName}
            width={128}
            height={128}
          />
          <div>
            <h1 className={`text-5xl font-extrabold tracking-tight ${righteous.className}`}>
              {agent.displayName}
            </h1>
            <div className="flex items-center space-x-2">
              <Image
                src={agent.role.displayIcon}
                alt={agent.role.displayName}
                width={20}
                height={20}
              />
              <span className="text-lg font-medium text-pink-200">
                {agent.role?.displayName}
              </span>
            </div>
            <p className="mt-4 max-w-xl text-gray-200">{agent.description}</p>
          </div>
        </div>

        <div className="flex justify-center my-10">
          <Image
            src={agent.fullPortrait}
            alt={agent.displayName}
            width={500}
            height={500}
            className="rounded-xl"
          />
        </div>

        <div className="mt-10">
          <h2 className="text-3xl font-semibold mb-4">Abilities</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {agent.abilities
              .filter((ab) => ab.displayIcon)
              .map((ability, index) => (
                <AbilityItem key={index} ability={ability} />
              ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
