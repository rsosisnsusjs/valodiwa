"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Ability = {
  displayName: string;
  description: string;
  displayIcon: string;
};

export default function AbilityItem({ ability }: { ability: Ability }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggle = () => {
    if (isMobile) setIsOpen(!isOpen);
  };

  return (
    <div
      className="relative flex flex-col items-center text-center group cursor-pointer"
      onMouseEnter={() => !isMobile && setIsOpen(true)}
      onMouseLeave={() => !isMobile && setIsOpen(false)}
      onClick={handleToggle}
    >
      {/* Animated Icon */}
      <motion.div
        animate={isOpen ? { scale: 1.2, rotate: 5 } : { scale: 1, rotate: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Image
          src={ability.displayIcon}
          alt={ability.displayName}
          width={50}
          height={50}
          className="transition-transform duration-200 ease-in-out"
        />
      </motion.div>

      <span className="text-base font-semibold mt-2">
        {ability.displayName}
      </span>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25 }}
            className={`${
              isMobile
                ? "fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black bg-opacity-80"
                : "absolute z-50 bottom-full mb-3 w-64"
            }`}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`${
                isMobile
                  ? "bg-white text-black max-w-md w-full p-6 rounded-2xl shadow-xl text-center"
                  : "bg-black text-white text-sm p-4 rounded-xl shadow-lg"
              }`}
            >
              {isMobile && (
                <motion.div
                  initial={{ scale: 0.8, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex justify-center mb-4"
                >
                  <Image
                    src={ability.displayIcon}
                    alt={ability.displayName}
                    width={70}
                    height={70}
                    className="rounded-lg shadow-lg"
                  />
                </motion.div>
              )}

              <h3 className="font-bold text-lg mb-2">{ability.displayName}</h3>
              <p className="text-sm">{ability.description}</p>

              {isMobile && (
                <button
                  onClick={() => setIsOpen(false)}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg"
                >
                  Close
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
