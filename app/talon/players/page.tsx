"use client";

import { useEffect, useState } from "react";
import LoadingScreen from "@/app/components/LoadingScreen";
import PlayerCard from "@/app/components/PlayerCard";
import { Righteous } from "next/font/google";

const righteous = Righteous({ subsets: ["latin"], weight: "400" });

type Agent = {
  displayName: string;
  displayIcon: string | null;
};

type ValorantAgent = {
  displayName: string;
  displayIcon: string | null;
};

type PlayerStats = {
  player: string;
  agents: string[];
  rounds_played: string;
  rating: string;
  average_combat_score: string;
};

const allowedPlayers = ["primmie", "thyy", "JitBoyS", "Killua", "Crws"];

export default function TLNStatsPage() {
  const [players, setPlayers] = useState<PlayerStats[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const resPlayers = await fetch("/api/tln-stats");
      const dataPlayers: PlayerStats[] = await resPlayers.json();

      const resAgents = await fetch(
        "https://valorant-api.com/v1/agents?language=th-TH&isPlayableCharacter=true"
      );
      const dataAgentsJson = await resAgents.json();

      const dataAgents: ValorantAgent[] = dataAgentsJson.data.map(
        (agent: ValorantAgent) => ({
          displayName: agent.displayName,
          displayIcon: agent.displayIcon,
        })
      );

      const filteredPlayers = dataPlayers.filter((p) =>
        allowedPlayers.some((name) => name.toLowerCase() === p.player.toLowerCase())
      );

      setPlayers(filteredPlayers);
      setAgents(dataAgents);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <LoadingScreen />;

  const getAgentIcon = (agentName: string) => {
    const agent = agents.find(
      (a) => a.displayName.toLowerCase() === agentName.toLowerCase()
    );
    return agent?.displayIcon ?? null;
  };

  return (
    <div className="p-6">
      <h1 className={`text-4xl font-bold mb-8 text-center ${righteous.className}`}>
        TLN the GOAT
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {players.map((player) => (
          <PlayerCard
            key={player.player}
            player={player}
            getAgentIcon={getAgentIcon}
            righteousClass={righteous.className}
          />
        ))}
      </div>
    </div>
  );
}
