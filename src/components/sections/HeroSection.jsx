"use client";
import { motion } from "framer-motion";
import ParticleField from "../ui/ParticleField";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-4 overflow-hidden">
      
      <div className="absolute inset-0 z-0 w-full h-full">
        <ParticleField />
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
        className="relative z-10 text-center max-w-4xl space-y-6"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-indigo-300 mb-4 font-medium tracking-widest">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          SYSTEM ONLINE
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 leading-tight">
          Intelligence Workspace
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
          From raw data to actionable insight. Securely. Autonomously. The new standard for distributed intelligence architecture.
        </p>
        <div className="pt-8 flex justify-center">
          <div className="w-px h-16 bg-gradient-to-b from-indigo-500 to-transparent animate-pulse"></div>
        </div>
      </motion.div>
    </section>
  );
}