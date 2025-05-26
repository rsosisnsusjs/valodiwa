'use client'; // Required for App Router

import React, { useEffect, useState } from 'react';

// TypeScript type for player data
interface PlayerStats {
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

const TlnStats: React.FC = () => {
  const [tlnPlayers, setTlnPlayers] = useState<PlayerStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTlnPlayers = async () => {
      try {
        const response = await fetch(
          'https://vlrggapi.vercel.app/stats?region=ap&timespan=all'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const json = await response.json();
        const segments: PlayerStats[] = json.data.segments;

        const filtered = segments.filter((player) => player.org === 'TLN');
        setTlnPlayers(filtered);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTlnPlayers();
  }, []);

  if (loading) return <p>Loading TLN players...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>TLN Players</h2>
      {tlnPlayers.length === 0 ? (
        <p>No TLN players found.</p>
      ) : (
        <ul>
          {tlnPlayers.map((player) => (
            <li key={player.player}>
              <strong>{player.player}</strong> — Rating: {player.rating}, Agents:{' '}
              {player.agents.join(', ')}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TlnStats;
