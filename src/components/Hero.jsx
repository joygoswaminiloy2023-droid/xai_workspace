"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useScrollProgress } from "@/lib/useScrollProgress";

const DataField = dynamic(() => import("@/components/scene/DataField"), {
  ssr: false,
});

function FloatingNodeCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: [0, -6, 0] }}
      whileHover={{
        scale: 1.04,
        y: -10,
        borderColor: "var(--color-signal)",
        boxShadow: "0 0 46px -6px rgba(20,230,196,0.45)",
      }}
      transition={{
        opacity: { duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] },
        y: {
          duration: 4.5,
          delay: 1.2,
          repeat: Infinity,
          ease: "easeInOut",
        },
        scale: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
        borderColor: { duration: 0.3 },
        boxShadow: { duration: 0.3 },
      }}
      className="w-[300px] shrink-0 cursor-default rounded-2xl border border-[var(--color-signal-dim)] bg-[var(--color-bg-panel)]/80 p-6 shadow-[0_0_30px_-8px_rgba(20,230,196,0.25)] backdrop-blur-sm transition-colors"
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs tracking-wider text-[var(--color-text-dim)]">
          NODE_84
        </span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z"
            stroke="var(--color-signal)"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <svg viewBox="0 0 100 60" className="my-4 h-14 w-full">
        <polygon
          points="50,8 84,24 74,52 26,52 16,24"
          fill="none"
          stroke="var(--color-signal)"
          strokeWidth="1.2"
          opacity="0.85"
        />
        <polygon
          points="50,20 68,28 62,44 38,44 32,28"
          fill="none"
          stroke="var(--color-signal)"
          strokeWidth="1"
          opacity="0.5"
        />
      </svg>

      <p className="font-mono text-xs leading-relaxed text-[var(--color-text-dim)]">
        PROCESSING LOG STREAM...
        <br />
        STABILITY:{" "}
        <span className="text-[var(--color-signal)]">99.8%</span>
      </p>
    </motion.div>
  );
}

export default function Hero() {
  const { ref, progress } = useScrollProgress();
  const progressRef = useRef(0);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-[160vh] w-full"
      aria-label="Introduction"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <DataField progress={progressRef} />
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--color-bg)]/10 via-transparent to-[var(--color-bg)]" />

        <div className="relative z-10 mx-auto flex h-full max-w-[1100px] items-center px-6">
          <div className="flex w-full flex-col items-start gap-10 md:flex-row md:items-start md:justify-between">
            <div className="max-w-[600px]">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="font-mono text-xs tracking-[0.25em] text-[var(--color-signal)] uppercase"
              >
                Xai — Intelligence Workspace
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="font-display mt-5 max-w-[13ch] text-5xl leading-[1.05] font-medium text-[var(--color-text)] sm:text-6xl md:text-7xl"
              >
                Raw data, given structure.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 max-w-[46ch] text-lg leading-relaxed text-[var(--color-text-muted)]"
              >
                Xai ingests what your business already has — logs, records,
                conversations — and turns it into a system that watches, reasons,
                and acts. Scroll to see the shape it takes.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="mt-10 flex items-center gap-4"
              >
                <a
                  href="#dashboard"
                  className="focus-ring rounded-full bg-[var(--color-signal)] px-6 py-3 text-sm font-medium text-[#05100e] transition-transform hover:scale-[1.03]"
                >
                  See the workspace
                </a>
                <a
                  href="#flow"
                  className="focus-ring rounded-full border border-[var(--color-border)] px-6 py-3 text-sm font-medium text-[var(--color-text)] transition-colors hover:border-[var(--color-signal)]"
                >
                  How it works
                </a>
              </motion.div>
            </div>

            <div className="hidden pt-2 md:block">
              <FloatingNodeCard />
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center">
          <div className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-text-dim)] uppercase">
            scroll — data becomes structure
          </div>
        </div>
      </div>
    </section>
  );
}
