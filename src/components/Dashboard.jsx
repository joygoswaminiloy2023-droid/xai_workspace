"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV = [
  { key: "overview", label: "Overview" },
  { key: "signals", label: "Signals" },
  { key: "automations", label: "Automations" },
  { key: "sources", label: "Sources" },
];

const BARS = [38, 62, 41, 78, 55, 90, 47];

const SIGNALS = [
  {
    name: "Refund requests spiking — Region: EU",
    confidence: 94,
    tone: "data",
  },
  { name: "Churn risk cluster identified — 12 accounts", confidence: 88, tone: "signal" },
  { name: "Support backlog trending down", confidence: 76, tone: "signal" },
];

const TABLE = [
  { id: "SRC-0231", source: "Zendesk", records: "18,204", status: "Synced" },
  { id: "SRC-0198", source: "Postgres · orders", records: "402,881", status: "Synced" },
  { id: "SRC-0176", source: "Call transcripts", records: "9,442", status: "Indexing" },
];

export default function Dashboard() {
  const [active, setActive] = useState("overview");

  return (
    <section
      id="dashboard"
      className="relative mx-auto max-w-[1200px] px-6 py-28"
      aria-label="Intelligence dashboard preview"
    >
      <div className="mb-12 max-w-[52ch]">
        <p className="font-mono text-xs tracking-[0.25em] text-[var(--color-signal)] uppercase">
          Inside the workspace
        </p>
        <h2 className="font-display mt-3 text-3xl font-medium md:text-4xl">
          One place to watch it happen.
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-text-muted)]">
          Every insight Xai surfaces lives here — with the evidence, the
          confidence, and the action attached.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-panel)] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.6)]"
      >
        {/* Sidebar */}
        <aside className="hidden w-56 shrink-0 border-r border-[var(--color-border)] bg-[var(--color-bg-panel-raised)] p-5 md:block">
          <div className="mb-8 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[var(--color-signal)]" />
            <span className="font-display text-sm font-medium">Xai</span>
          </div>
          <nav className="flex flex-col gap-1">
            {NAV.map((item) => (
              <button
                key={item.key}
                onClick={() => setActive(item.key)}
                className={`focus-ring rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  active === item.key
                    ? "bg-[var(--color-bg)] text-[var(--color-text)]"
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                }`}
              >
                <span className="relative">
                  {item.label}
                  {active === item.key && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -left-3 top-1/2 h-4 w-[2px] -translate-y-1/2 rounded-full bg-[var(--color-signal)]"
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                </span>
              </button>
            ))}
          </nav>

          <div className="mt-10 rounded-lg border border-[var(--color-border)] p-3">
            <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-text-dim)]">
              Model status
            </p>
            <p className="mt-1 flex items-center gap-2 text-sm">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-signal)]" />
              Reasoning live
            </p>
          </div>
        </aside>

        {/* Main panel */}
        <div className="flex-1 p-6 md:p-8">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-display text-lg font-medium capitalize">
              {active}
            </h3>
            <span className="font-mono text-xs text-[var(--color-text-dim)]">
              Updated 2m ago
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 gap-5 lg:grid-cols-3"
            >
              {/* stat cards */}
              <div className="grid grid-cols-2 gap-4 lg:col-span-3 lg:grid-cols-4">
                {[
                  { label: "Sources connected", value: "14" },
                  { label: "Signals this week", value: "37" },
                  { label: "Automations live", value: "6" },
                  { label: "Avg. confidence", value: "91%" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 transition-colors hover:border-[var(--color-signal-dim)]"
                  >
                    <p className="font-display text-2xl font-medium text-[var(--color-text)]">
                      {s.value}
                    </p>
                    <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* chart */}
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-5 lg:col-span-2">
                <p className="text-sm text-[var(--color-text-muted)]">
                  Signals detected, last 7 days
                </p>
                <div className="mt-5 flex h-32 items-end gap-3">
                  {BARS.map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                      className="flex-1 rounded-t-sm bg-gradient-to-t from-[var(--color-signal-dim)] to-[var(--color-signal)]"
                    />
                  ))}
                </div>
              </div>

              {/* signal list */}
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-5">
                <p className="mb-4 text-sm text-[var(--color-text-muted)]">
                  Top signals
                </p>
                <ul className="flex flex-col gap-3">
                  {SIGNALS.map((s) => (
                    <li
                      key={s.name}
                      className="group cursor-default rounded-lg border border-transparent p-2 transition-colors hover:border-[var(--color-border)]"
                    >
                      <p className="text-sm leading-snug text-[var(--color-text)]">
                        {s.name}
                      </p>
                      <div className="mt-1.5 flex items-center gap-2">
                        <div className="h-1 flex-1 overflow-hidden rounded-full bg-[var(--color-border)]">
                          <div
                            className={`h-full rounded-full ${
                              s.tone === "data"
                                ? "bg-[var(--color-data)]"
                                : "bg-[var(--color-signal)]"
                            }`}
                            style={{ width: `${s.confidence}%` }}
                          />
                        </div>
                        <span className="font-mono text-[10px] text-[var(--color-text-dim)]">
                          {s.confidence}%
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* table */}
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-5 lg:col-span-3">
                <p className="mb-4 text-sm text-[var(--color-text-muted)]">
                  Connected sources
                </p>
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-[var(--color-border)] text-xs uppercase tracking-wider text-[var(--color-text-dim)]">
                      <th className="pb-2 font-normal">ID</th>
                      <th className="pb-2 font-normal">Source</th>
                      <th className="pb-2 font-normal">Records</th>
                      <th className="pb-2 font-normal">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TABLE.map((row) => (
                      <tr
                        key={row.id}
                        className="border-b border-[var(--color-border)]/60 last:border-0 hover:bg-[var(--color-bg-panel)]"
                      >
                        <td className="py-2.5 font-mono text-xs text-[var(--color-text-dim)]">
                          {row.id}
                        </td>
                        <td className="py-2.5">{row.source}</td>
                        <td className="py-2.5 text-[var(--color-text-muted)]">
                          {row.records}
                        </td>
                        <td className="py-2.5">
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs ${
                              row.status === "Synced"
                                ? "bg-[var(--color-signal-dim)]/20 text-[var(--color-signal)]"
                                : "bg-[var(--color-data-dim)]/20 text-[var(--color-data)]"
                            }`}
                          >
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
