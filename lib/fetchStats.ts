// lib/fetchStats.ts

export interface PlayerStats {
  player: string;
  org: string;
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
}

export async function fetchTLNPlayers(): Promise<PlayerStats[]> {
  const res = await fetch('https://vlrggapi.vercel.app/stats?region=ap&timespan=all');
  const json = await res.json();

  const allPlayers: PlayerStats[] = json.data.segments;

  // Filter เฉพาะ org === "TLN"
  const filtered = allPlayers.filter((player) => player.org === "TLN");

  return filtered;
}
