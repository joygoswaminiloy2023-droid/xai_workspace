"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const NodeCluster = dynamic(() => import("@/components/scene/NodeCluster"), {
  ssr: false,
});

export default function Signature() {
  return (
    <section
      id="signature"
      className="relative mx-auto max-w-[1200px] px-6 py-28"
      aria-label="Automations reorganizing themselves"
    >
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono text-xs tracking-[0.25em] text-[var(--color-signal)] uppercase">
            Automations, self-organizing
          </p>
          <h2 className="font-display mt-3 max-w-[16ch] text-3xl font-medium md:text-4xl">
            Every automation finds its own shape.
          </h2>
          <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-[var(--color-text-muted)]">
            Each node here is a live automation Xai is running. As priorities
            shift, they don&apos;t just update — they reorganize into the
            structure that fits the moment: a sphere of even coverage, a
            grid of scheduled jobs, a knot of interdependent triggers, a
            helix of sequenced steps. Drag to look around. Reorganize to
            watch it happen.
          </p>
          <button
            onClick={() => {
              window.__reorganizeCluster?.();
            }}
            className="focus-ring mt-8 rounded-full border border-[var(--color-signal-dim)] bg-[var(--color-signal)]/10 px-6 py-3 text-sm font-medium text-[var(--color-signal)] transition-colors hover:bg-[var(--color-signal)]/20"
          >
            Reorganize cluster
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-[420px] w-full overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-panel)] md:h-[480px]"
        >
          <NodeCluster />
          <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.2em] text-[var(--color-text-dim)] uppercase">
            drag to orbit
          </div>
        </motion.div>
      </div>
    </section>
  );
}
