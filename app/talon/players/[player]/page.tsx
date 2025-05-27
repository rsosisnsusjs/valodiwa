"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoadingScreen from "@/app/components/LoadingScreen";
import { Righteous } from "next/font/google";
import Image from "next/image";

const righteous = Righteous({ subsets: ["latin"], weight: "400" });

type PlayerStats = {
  player: string;
  agents: string[];
  rounds_played: string;
  rating: string;
  average_combat_score: string;
  kill_deaths: string;
  kill_assists_survived_traded: string;
  average_damage_per_round: string;
  kills_per_round: string;
  assists_per_round: string;
  first_kills_per_round: string;
  first_deaths_per_round: string;
  headshot_percentage: string;
  clutch_success_percentage: string;
};

type AgentData = {
  displayName: string;
  fullPortrait: string | null;
  role: {
    displayName: string;
    displayIcon: string;
  } | null;
};

export default function PlayerPage() {
  const params = useParams()!;
  const playerSlug = Array.isArray(params.player)
    ? params.player[0]
    : params.player;

  const [playerData, setPlayerData] = useState<PlayerStats | null>(null);
  const [agentInfo, setAgentInfo] = useState<Record<string, AgentData>>({});
  const [loading, setLoading] = useState(true);
  const [agentIndex, setAgentIndex] = useState(0);

  useEffect(() => {
    if (!playerSlug) return;

    const fetchPlayer = async () => {
      try {
        const res = await fetch("/api/tln-stats");
        const data: PlayerStats[] = await res.json();
        const found = data.find(
          (p) => p.player.toLowerCase() === playerSlug.toLowerCase()
        );
        setPlayerData(found ?? null);
        setAgentIndex(0);
      } catch (err) {
        console.error("Error fetching player data:", err);
        setPlayerData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayer();
  }, [playerSlug]);

  useEffect(() => {
    if (!playerData) return;

    const fetchAgentInfo = async () => {
      try {
        const res = await fetch(
          "https://valorant-api.com/v1/agents?language=th-TH&isPlayableCharacter=true"
        );
        const data = await res.json();
        const topAgents = playerData.agents.slice(0, 3);
        const agentMap: Record<string, AgentData> = {};

        topAgents.forEach((name) => {
          const match = data.data.find(
            (agent: AgentData) =>
              agent.displayName.toLowerCase() === name.toLowerCase()
          );
          if (match) agentMap[name] = match;
        });

        setAgentInfo(agentMap);
      } catch (err) {
        console.error("Error fetching agent info:", err);
      }
    };

    fetchAgentInfo();
  }, [playerData]);

  const handleNext = () => {
    if (!playerData) return;
    setAgentIndex((prev) => (prev + 1) % Math.min(3, playerData.agents.length));
  };

  const handlePrev = () => {
    if (!playerData) return;
    setAgentIndex(
      (prev) =>
        (prev - 1 + Math.min(3, playerData.agents.length)) %
        Math.min(3, playerData.agents.length)
    );
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (!playerData) {
    return <div className="p-6 text-center text-red-500">Nothing...</div>;
  }

  const topAgents = playerData.agents.slice(0, 3);
  const currentAgentName = topAgents[agentIndex];
  const currentAgent = agentInfo[currentAgentName];

  console.log(playerData.player.toLowerCase().replace(/\s/g, "-"));

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Picture and Name Container */}
      <div className="relative group flex items-center justify-center h-[220px]">
        {/* Animated Picture */}
        <div
          className="relative w-[320px] h-[200px] rounded-xl overflow-hidden shadow-lg p-1
      transition-all duration-700 ease-in-out group-hover:translate-x-[-200px]"
        >
          <Image
            src={`/players/${playerData.player
              .toLowerCase()
              .replace(/\s/g, "-")}.jpg`}
            alt={`${playerData.player} picture`}
            fill
            sizes="320px"
            style={{ objectFit: "cover", borderRadius: "0.75rem" }}
            placeholder="blur"
            blurDataURL="/players/default-player.jpg"
          />
        </div>

        {/* Animated Name */}
        <h1
          className={`hidden md:block absolute left-[340px] opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-10
      transition-all duration-700 text-8xl font-bold text-white dark:text-white ${righteous.className}`}
        >
          {playerData.player}
        </h1>
        {/* Animated Name */}
        <h1
          className={`hidden md:block absolute left-[400px] top-[50px] opacity-0 group-hover:opacity-15 group-hover:translate-x-0 translate-x-10
      transition-all duration-900 text-8xl font-bold text-red dark:text-red ${righteous.className}`}
        >
          {playerData.player}
        </h1>
      </div>
      

      {/* Player name for mobile - BELOW image */}
      <h1
        className={`block md:hidden text-3xl font-bold text-center mb-4 text-white dark:text-white ${righteous.className}`}
      >
        {playerData.player}
      </h1>

      {/* Agent Section */}
      <div className="relative flex flex-col md:flex-row items-center gap-6 mb-8">
        {/* Portrait */}
        <div className="relative w-full md:w-1/2 flex items-center justify-center h-96">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentAgent?.displayName || "default"}
              src={currentAgent?.fullPortrait || "/placeholder-agent.png"}
              alt={currentAgent?.displayName || "Agent"}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="h-full object-contain drop-shadow-2xl rounded-xl"
            />
          </AnimatePresence>
        </div>

        {/* Info */}
        <div className="text-center md:text-left space-y-4 w-full md:w-1/2">
          <h2 className="text-2xl font-semibold text-white dark:text-white">
            {currentAgent?.displayName || "Agent Not Found"}
          </h2>
          {currentAgent?.role && (
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Image
                src={currentAgent.role.displayIcon}
                alt={currentAgent.role.displayName}
                width={24}
                height={24}
                className="rounded-sm"
              />
              <span className="text-gray-300 dark:text-gray-300">
                {currentAgent.role.displayName}
              </span>
            </div>
          )}

          <div className="flex justify-center md:justify-start gap-4 pt-4">
            <button
              onClick={handlePrev}
              disabled={!currentAgent}
              className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 disabled:opacity-50"
            >
              ⬅ Prev
            </button>
            <button
              onClick={handleNext}
              disabled={!currentAgent}
              className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 disabled:opacity-50"
            >
              Next ➡
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-800 dark:bg-gray-800 shadow-md rounded-xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-200 dark:text-gray-200">
        {[
          [
            "Agents",
            playerData.agents
              .map((a) => a.charAt(0).toUpperCase() + a.slice(1))
              .join(", "),
          ],
          ["Rounds Played", playerData.rounds_played],
          ["Rating", playerData.rating],
          ["ACS", playerData.average_combat_score],
          ["K/D", playerData.kill_deaths],
          ["KAST", playerData.kill_assists_survived_traded],
          ["ADR", playerData.average_damage_per_round],
          ["Kills/Round", playerData.kills_per_round],
          ["Assists/Round", playerData.assists_per_round],
          ["First Kills/Round", playerData.first_kills_per_round],
          ["First Deaths/Round", playerData.first_deaths_per_round],
          ["HS%", playerData.headshot_percentage],
          ["Clutch Success %", playerData.clutch_success_percentage],
        ].map(([label, value]) => (
          <div key={label} className="flex justify-between">
            <span className="font-medium">{label}:</span>
            <span>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
