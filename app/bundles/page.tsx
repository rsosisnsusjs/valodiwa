// app/bundles/page.tsx
import React from "react";
import BundleCard from "@/app/components/BundleCard";

async function getBundles() {
  const res = await fetch("https://valorant-api.com/v1/bundles?language=th-TH", {
    next: { revalidate: 3600 },
  });
  const data = await res.json();
  return data.data;
}

export default async function BundlesPage() {
  const bundles = await getBundles();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Valorant Bundles</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {bundles.map((bundle: any) => (
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
