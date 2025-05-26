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

export async function generateMetadata({ params }: { params: { uuid: string } }) {
  try {
    const res = await fetch(
      `https://valorant-api.com/v1/bundles/${params.uuid}?language=th-TH`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return {
        title: "Bundle Not Found | VALODIWA",
        description: "Bundle Not Found",
      };
    }

    const data = await res.json();
    const bundle: Bundle = data.data;

    if (!bundle) {
      return {
        title: "Bundle Not Found | VALODIWA",
        description: "Bundle Not Found",
      };
    }

    return {
      title: `${bundle.displayName} | VALODIWA`,
      description: bundle.extraDescription || `${bundle.displayName}`,
      openGraph: {
        title: `${bundle.displayName} | VALODIWA`,
        description: bundle.extraDescription,
        images: [bundle.verticalPromoImage || bundle.displayIcon],
      },
    };
  } catch (error) {
    console.error("Error fetching bundle metadata:", error);
    return {
      title: "Bundle Error | VALODIWA",
      description: "Bundle Error",
    };
  }
}


export default async function BundleDetailPage({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) {
  const { uuid } = await params;
  
  const bundle = await getBundle(uuid);

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