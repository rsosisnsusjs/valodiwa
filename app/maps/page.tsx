// app/maps/page.tsx
import Image from "next/image";
import Link from "next/link";

interface Map {
  uuid: string;
  displayName: string;
  displayIcon: string;
}

async function fetchMaps(): Promise<Map[]> {
  const res = await fetch("https://valorant-api.com/v1/maps");
  const json = await res.json();
  return json.data;
}

export default async function MapsPage() {
  const maps = await fetchMaps();

  return (
    <main className="p-4 grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {maps.map((map) => (
        <Link
          key={map.uuid}
          href={`/maps/${map.uuid}`}
          className="flex flex-col items-center hover:scale-105 transition-transform"
        >
          <Image
            src={map.displayIcon}
            alt={map.displayName}
            width={200}
            height={200}
            className="object-contain"
          />
          <span className="mt-2 text-center font-bold">{map.displayName}</span>
        </Link>
      ))}
    </main>
  );
}
