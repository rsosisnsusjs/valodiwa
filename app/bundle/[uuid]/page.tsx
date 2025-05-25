import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Bundle {
  uuid: string;
  displayName: string;
  description: string;
  displayIcon: string;
  displayIcon2: string;
  verticalPromoImage: string;
  extraDescription: string;
}

async function getBundle(uuid: string): Promise<Bundle | null> {
  try {
    const res = await fetch(`https://valorant-api.com/v1/bundles/${uuid}?language=th-TH`, {
      cache: "no-store",
    });
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("Failed to fetch bundle detail:", error);
    return null;
  }
}

export default async function BundleDetailPage({
  params,
}: {
  params: { uuid: string };
}) {
  const bundle = await getBundle(params.uuid);

  if (!bundle) return notFound();

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{bundle.displayName}</h1>
      <p className="text-lg text-gray-600 mb-6">{bundle.extraDescription}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Image
          src={bundle.displayIcon}
          alt={bundle.displayName + " icon"}
          width={400}
          height={400}
          className="rounded-xl"
        />
        <Image
          src={bundle.verticalPromoImage}
          alt={bundle.displayName + " vertical promo"}
          width={400}
          height={600}
          className="rounded-xl"
        />
      </div>
    </div>
  );
}
