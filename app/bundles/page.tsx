// app/bundles/page.tsx
import React from "react";
import BundleCard from "@/app/components/BundleCard";

interface Bundle {
  uuid: string;
  displayName: string;
  description: string;
  displayIcon: string;
  verticalPromoImage: string;
  extraDescription: string;
}

async function getBundles(): Promise<Bundle[]> {
  const res = await fetch("https://valorant-api.com/v1/bundles?language=th-TH", {
    next: { revalidate: 3600 },
  });
  
  if (!res.ok) throw new Error('Failed to fetch bundles');
  
  const data = await res.json();
  return data.data;
}

export const metadata = {
  title: 'Bundles | VALODIWA',
  description: 'View all Valorant bundles in VALODIWA',
}

export default async function BundlesPage() {
  const bundles = await getBundles();

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {bundles.map((bundle) => (
          <BundleCard
            key={bundle.uuid}
            uuid={bundle.uuid}
            displayName={bundle.displayName}
            description={bundle.description}
            displayIcon={bundle.displayIcon}
            verticalPromoImage={bundle.verticalPromoImage}
            extraDescription={bundle.extraDescription}
          />
        ))}
      </div>
    </div>
  );
}