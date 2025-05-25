"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import AbilityItem from "@/app/components/AbilityItem";

type AgentDetailProps = {
  agent: any;
  background: string;
};

export default function AgentDetail({ agent, background }: AgentDetailProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div
      className="text-white min-h-screen p-8"
      style={{
        background,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative bg-black bg-opacity-60 p-8 rounded-3xl max-w-6xl mx-auto shadow-xl backdrop-blur-md"
      >
        <div className="flex flex-col md:flex-row items-center gap-8">
          <img
            src={agent.displayIcon}
            className="w-32 h-32"
            alt={agent.displayName}
          />
          <div>
            <h1 className="text-5xl font-extrabold tracking-tight">
              {agent.displayName}
            </h1>
            <div className="flex items-center space-x-2">
              <img src={agent.role.displayIcon} className="w-5 h-5" />
              <span className="text-lg font-medium text-pink-200">
                {agent.role?.displayName}
              </span>
            </div>

            <p className="mt-4 max-w-xl text-gray-200">{agent.description}</p>
          </div>
        </div>

        <img
          src={agent.fullPortrait}
          className="mt-10 w-full max-w-sm mx-auto rounded-xl shadow-lg hover:scale-105 transition-transform duration-500"
          alt={`${agent.displayName} full`}
        />

        <div className="mt-10">
          <h2 className="text-3xl font-semibold mb-4">Abilities</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {agent.abilities
              .filter((ab: any) => ab.displayIcon)
              .map((ability: any, index: number) => (
                <AbilityItem key={index} ability={ability} />
              ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
