"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { Righteous } from "next/font/google";

const righteous = Righteous({ subsets: ["latin"], weight: "400" });

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [valorantOpen, setValorantOpen] = useState(false);

  const navItems = ["Home", "Talon"];

  const valorantItems = [
    { name: "Agents", href: "/agents" },
    { name: "Bundles", href: "/bundles" },
    { name: "Weapons", href: "https://www.google.com/search?q=Talon+Valorant", external: true },
    { name: "Maps", href: "https://www.google.com/search?q=Talon+Valorant", external: true },
    { name: "Comps", href: "https://www.google.com/search?q=Talon+Valorant", external: true },
    { name: "Lineups", href: "https://www.google.com/search?q=Talon+Valorant", external: true },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="w-full bg-black text-white py-4 px-6 sm:px-8 flex justify-between items-center shadow-md sticky top-0 z-50"
    >
      {/* Logo */}
      <div
        className={`text-2xl font-extrabold tracking-wider text-red-500 drop-shadow-sm ${righteous.className}`}
      >
        VALODIWA
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-8 text-lg font-medium items-center relative">
        {navItems.map((item, index) => (
          <Link
            key={index}
            href={
              item.toLowerCase() === "home"
                ? "/"
                : item.toLowerCase() === "talon"
                ? "/talon/players"
                : `/${item.toLowerCase()}`
            }
            className="relative group"
          >
            <span className="transition-colors duration-300 group-hover:text-red-400">
              {item}
            </span>
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-red-400 transition-all duration-300 group-hover:w-full" />
          </Link>
        ))}

        {/* Valorant Dropdown */}
        <div
          className="relative cursor-pointer select-none"
          onMouseEnter={() => setValorantOpen(true)}
          onMouseLeave={() => setValorantOpen(false)}
        >
          <div className="flex items-center gap-1 group">
            <span className="transition-colors duration-300 group-hover:text-red-400">
              Valorant
            </span>
            {valorantOpen ? (
              <ChevronUp size={16} className="text-red-400" />
            ) : (
              <ChevronDown size={16} className="text-red-400" />
            )}
          </div>

          <AnimatePresence>
            {valorantOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full right-0 mt-2 w-48 bg-black border border-red-600 rounded-lg shadow-lg flex flex-col overflow-hidden z-50"
                style={{ minWidth: 180 }}
              >
                {valorantItems.map(({ name, href, external }, idx) =>
                  external ? (
                    <a
                      key={idx}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-3 text-white hover:bg-red-700 transition-colors duration-200"
                    >
                      {name}
                    </a>
                  ) : (
                    <Link
                      key={idx}
                      href={href}
                      className="px-4 py-3 text-white hover:bg-red-700 transition-colors duration-200"
                    >
                      {name}
                    </Link>
                  )
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="absolute top-full left-0 w-full bg-black text-white px-6 py-4 flex flex-col gap-4 md:hidden shadow-lg z-40"
          >
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={
                  item.toLowerCase() === "home"
                    ? "/"
                    : item.toLowerCase() === "talon"
                    ? "/talon/players"
                    : `/${item.toLowerCase()}`
                }
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium hover:text-red-400 transition-colors"
              >
                {item}
              </Link>
            ))}

            {/* Mobile Valorant dropdown */}
            <div>
              <button
                onClick={() => setValorantOpen(!valorantOpen)}
                className="flex items-center gap-2 text-lg font-medium hover:text-red-400 transition-colors"
              >
                Valorant
                {valorantOpen ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>

              <AnimatePresence>
                {valorantOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="flex flex-col pl-4 mt-2 gap-3"
                  >
                    {valorantItems.map(({ name, href, external }, idx) =>
                      external ? (
                        <a
                          key={idx}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-base font-medium hover:text-red-400 transition-colors"
                          onClick={() => {
                            setIsOpen(false);
                            setValorantOpen(false);
                          }}
                        >
                          {name}
                        </a>
                      ) : (
                        <Link
                          key={idx}
                          href={href}
                          onClick={() => {
                            setIsOpen(false);
                            setValorantOpen(false);
                          }}
                          className="text-base font-medium hover:text-red-400 transition-colors"
                        >
                          {name}
                        </Link>
                      )
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
