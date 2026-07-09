"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const STAGES = [
  {
    index: "Ingest",
    title: "Pull from everywhere it already lives",
    body: "Tickets, call transcripts, spreadsheets, product logs. Xai connects to the systems you already run and reads them as they are — no migration, no reformatting.",
  },
  {
    index: "Analyze",
    title: "Reason over it like an analyst would",
    body: "Xai cross-references entities, spots the patterns a person would take a week to find, and flags what actually matters against the goals you've set.",
  },
  {
    index: "Generate",
    title: "Turn the pattern into an action",
    body: "Not a report to read later — a decision proposed now, with the evidence attached, ready for a person to approve or an automation to run.",
  },
];

function useStageProgress(scrollYProgress, i) {
  const start = i / STAGES.length;
  const end = (i + 1) / STAGES.length;
  const opacity = useTransform(
    scrollYProgress,
    [start, start + 0.06, end - 0.08, end],
    [0, 1, 1, 0]
  );
  const y = useTransform(scrollYProgress, [start, end], [40, -40]);
  const lineProgress = useTransform(
    scrollYProgress,
    [start, start + 0.35],
    [0, 1]
  );
  return { opacity, y, lineProgress };
}

function StageGeometry({ i, lineProgress }) {
  // three distinct geometry-based motifs per stage
  if (i === 0) {
    // Ingest: scattered marks pulled into a single vertical channel
    return (
      <svg viewBox="0 0 240 240" className="h-56 w-56">
        {[...Array(7)].map((_, k) => {
          const angle = (k / 7) * Math.PI * 2;
          const r = 78;
          const x1 = 120 + Math.cos(angle) * r;
          const y1 = 120 + Math.sin(angle) * r;
          return (
            <motion.line
              key={k}
              x1={x1}
              y1={y1}
              x2={120}
              y2={120}
              stroke="var(--color-data)"
              strokeWidth="1.5"
              style={{ pathLength: lineProgress }}
              strokeLinecap="round"
              opacity={0.7}
            />
          );
        })}
        <motion.circle
          cx={120}
          cy={120}
          r={6}
          fill="var(--color-signal)"
          style={{ scale: lineProgress }}
        />
      </svg>
    );
  }
  if (i === 1) {
    // Analyze: a connective mesh among nodes
    const nodes = [
      [60, 60],
      [180, 50],
      [200, 150],
      [110, 190],
      [40, 140],
      [120, 110],
    ];
    return (
      <svg viewBox="0 0 240 240" className="h-56 w-56">
        {nodes.map(([x, y], k) =>
          nodes.slice(k + 1).map(([x2, y2], j) => (
            <motion.line
              key={`${k}-${j}`}
              x1={x}
              y1={y}
              x2={x2}
              y2={y2}
              stroke="var(--color-signal)"
              strokeWidth="1"
              opacity={0.35}
              style={{ pathLength: lineProgress }}
            />
          ))
        )}
        {nodes.map(([x, y], k) => (
          <motion.circle
            key={k}
            cx={x}
            cy={y}
            r={4}
            fill="var(--color-signal)"
            style={{ scale: lineProgress }}
          />
        ))}
      </svg>
    );
  }
  // Generate: a mask reveal forming an arrow / action glyph
  return (
    <svg viewBox="0 0 240 240" className="h-56 w-56">
      <motion.path
        d="M50 170 L120 70 L190 170"
        fill="none"
        stroke="var(--color-signal)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ pathLength: lineProgress }}
      />
      <motion.line
        x1={120}
        y1={70}
        x2={120}
        y2={180}
        stroke="var(--color-data)"
        strokeWidth="3"
        strokeLinecap="round"
        style={{ pathLength: lineProgress }}
      />
    </svg>
  );
}

function Stage({ i, scrollYProgress }) {
  const { opacity, y, lineProgress } = useStageProgress(scrollYProgress, i);
  const stage = STAGES[i];

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col items-center justify-center gap-10 px-6 md:flex-row md:justify-between md:gap-16"
    >
      <div className="max-w-[42ch] md:order-1">
        <span className="font-mono text-xs tracking-[0.25em] text-[var(--color-text-dim)] uppercase">
          Stage 0{i + 1}
        </span>
        <h3 className="font-display mt-3 text-3xl font-medium text-[var(--color-text)] md:text-4xl">
          {stage.index}
        </h3>
        <p className="mt-2 text-lg text-[var(--color-text)]">{stage.title}</p>
        <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-text-muted)]">
          {stage.body}
        </p>
      </div>
      <div className="flex items-center justify-center md:order-2">
        <StageGeometry i={i} lineProgress={lineProgress} />
      </div>
    </motion.div>
  );
}

function ProgressSegment({ i, scrollYProgress }) {
  const scaleX = useTransform(
    scrollYProgress,
    [i / STAGES.length, (i + 1) / STAGES.length],
    [0, 1]
  );
  return (
    <div className="h-[2px] flex-1 overflow-hidden rounded-full bg-[var(--color-border)]">
      <motion.div
        className="h-full bg-[var(--color-signal)]"
        style={{ scaleX, transformOrigin: "left" }}
      />
    </div>
  );
}

export default function InsightFlow() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="flow"
      ref={sectionRef}
      className="relative h-[320vh] w-full bg-[var(--color-bg)]"
      aria-label="How Xai turns data into insight"
    >
      <div className="sticky top-0 flex h-screen w-full flex-col justify-center overflow-hidden border-y border-[var(--color-border)]">
        <div className="mx-auto w-full max-w-[1100px] px-6">
          <p className="font-mono text-xs tracking-[0.25em] text-[var(--color-signal)] uppercase">
            The Path
          </p>
          <h2 className="font-display mt-3 max-w-[20ch] text-3xl font-medium md:text-4xl">
            From input to action, in three moves.
          </h2>
        </div>

        <div className="relative mx-auto mt-8 h-[46vh] w-full max-w-[1100px] px-6">
          {STAGES.map((_, i) => (
            <Stage key={i} i={i} scrollYProgress={scrollYProgress} />
          ))}
        </div>

        <div className="mx-auto mt-6 flex w-full max-w-[1100px] gap-2 px-6">
          {STAGES.map((_, i) => (
            <ProgressSegment key={i} i={i} scrollYProgress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}
