'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';

type PlayerCardProps = {
  player: {
    player: string;
    agents: string[];
    rounds_played: string;
    rating: string;
    average_combat_score: string;
  };
  getAgentIcon: (agentName: string) => string | null;
  righteousClass: string;
};

export default function PlayerCard({ player, getAgentIcon, righteousClass }: PlayerCardProps) {
  const playerImageUrl = `/players/${player.player.toLowerCase().replace(/\s/g, '-')}.jpg`;
  const [playerImageError, setPlayerImageError] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="border rounded-lg p-4 shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer bg-white dark:bg-zinc-900 flex flex-col items-center"
    >
      <Link href={`/talon/players/${player.player.toLowerCase()}`} className="w-full flex flex-col items-center">
        <div className="w-[160px] h-[100px] rounded-lg overflow-hidden shadow-lg mb-4 relative">
          <Image
            src={playerImageError ? "/players/default-player.jpg" : playerImageUrl}
            alt={`${player.player} picture`}
            fill
            className="object-cover"
            onError={() => setPlayerImageError(true)}
            sizes="160px"
          />
        </div>

        <h2 className={`text-2xl font-semibold mb-2 text-center ${righteousClass}`}>
          {player.player}
        </h2>

        <p className="mb-2 text-center">
          <strong>Agents:</strong>{' '}
          {player.agents.map((agentName, i) => {
            const icon = getAgentIcon(agentName);
            return (
              <span key={i} className="inline-flex items-center mr-2">
                {icon && (
                  <Image
                    src={icon}
                    alt={agentName}
                    width={24}
                    height={24}
                    className="rounded mr-1"
                  />
                )}
                <span>{agentName}</span>
              </span>
            );
          })}
        </p>

        <div className="text-center space-y-1">
          <p><strong>Rounds:</strong> {player.rounds_played}</p>
          <p><strong>Rating:</strong> {player.rating}</p>
          <p><strong>ACS:</strong> {player.average_combat_score}</p>
        </div>
      </Link>
    </motion.div>
  );
}