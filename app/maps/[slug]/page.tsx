// app/maps/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";

interface Callout {
  regionName: string;
  superRegionName: string;
  location: {
    x: number;
    y: number;
  };
}

interface MapData {
  uuid: string;
  displayName: string;
  displayIcon: string;
  callouts: Callout[];
  xMultiplier: number;
  yMultiplier: number;
  xScalarToAdd: number;
  yScalarToAdd: number;
}

async function fetchMap(slug: string): Promise<MapData | null> {
  const res = await fetch("https://valorant-api.com/v1/maps");
  const json = await res.json();
  const map = json.data.find((m: any) => m.uuid === slug);
  return map || null;
}

export default async function MapDetail({ params }: { params: { slug: string } }) {
  const map = await fetchMap(params.slug);
  if (!map) return notFound();

  const transformCoord = (x: number, y: number) => {
    const px = (x * map.xMultiplier + map.xScalarToAdd) * 100;
    const py = (y * map.yMultiplier + map.yScalarToAdd) * 100;
    return { left: `${px}%`, top: `${py}%` };
  };

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black text-white">
      <h1 className="text-3xl font-bold text-center my-4">{map.displayName}</h1>

      <div className="relative w-full h-[80vh]">
        <Image
          src={map.displayIcon}
          alt={map.displayName}
          fill
          className="object-contain"
        />

        {map.callouts.map((callout, idx) => {
          const pos = transformCoord(callout.location.x, callout.location.y);
          return (
            <div
              key={idx}
              className="absolute z-10 flex items-center gap-1 px-2 py-1 text-xs bg-red-600 rounded shadow"
              style={{ ...pos, transform: "translate(-50%, -50%)" }}
            >
              {callout.regionName}
            </div>
          );
        })}
      </div>
    </main>
  );
}
