import { NextResponse } from "next/server";

type PlayerSegment = {
  org: string;
  player: string;
  agents: string[];
  rounds_played: string;
  rating: string;
  average_combat_score: string;
};

type ApiResponse = {
  data: {
    segments: PlayerSegment[];
  };
};

export async function GET() {
  const res = await fetch("https://vlrggapi.vercel.app/stats?region=ap&timespan=all");
  const data: ApiResponse = await res.json();
  
  const filtered = data.data.segments.filter((p: PlayerSegment) => p.org === "TLN");
  
  return NextResponse.json(filtered);
}