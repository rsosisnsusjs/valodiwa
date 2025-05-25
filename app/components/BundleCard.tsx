import React from "react";
import Image from "next/image";
import Link from "next/link";

interface BundleCardProps {
  uuid: string;
  displayName: string;
  description: string | null;
  displayIcon: string | null;
  verticalPromoImage: string | null;
  extraDescription?: string | null;
}

export default function BundleCard({
  uuid,
  displayName,
  description,
  displayIcon,
  verticalPromoImage,
  extraDescription,
}: BundleCardProps) {
  const truncate = (text: string | null | undefined, maxLength = 100) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  // ถ้ามี extraDescription ใช้ truncate extraDescription
  // ถ้าไม่มี ใช้ truncate description แทน
  const displayText = extraDescription
    ? truncate(extraDescription)
    : truncate(description) || " ";

  return (
    <Link
      href={`/bundle/${uuid}`}
      className="rounded-2xl overflow-hidden shadow-md bg-white dark:bg-gray-800 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
    >
      <Image
        src={displayIcon || verticalPromoImage || ""}
        alt={displayName}
        width={400}
        height={225}
        className="w-full h-48 object-cover"
        unoptimized
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {displayName}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">{displayText}</p>
      </div>
    </Link>
  );
}
