"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Righteous } from "next/font/google";

const righteous = Righteous({ subsets: ["latin"], weight: "400" });

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = ["Home", "Agents", "Talon", "Bundles"];

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
      <div className="hidden md:flex gap-8 text-lg font-medium">
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
