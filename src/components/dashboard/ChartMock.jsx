"use client";
import { motion } from "framer-motion";

export default function ChartMock() {
  const bars = [40, 70, 50, 90, 30, 60, 85, 45];
  return (
    <div className="w-full h-48 flex items-end justify-between gap-3 px-2 pt-6 relative">
      {bars.map((h, i) => (
        <motion.div 
          key={i}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: `${h}%`, opacity: 1 }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-sm relative group hover:bg-indigo-300 transition-colors"
        >
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">{h}%</div>
        </motion.div>
      ))}
    </div>
  );
}