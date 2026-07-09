"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const PRODUCT_LINKS = [
  { href: "#flow", label: "How it works" },
  { href: "#dashboard", label: "Workspace" },
  { href: "#signature", label: "Automations" },
];

const LEGAL_LINKS = ["Privacy", "Terms", "Security", "Changelog"];

export default function Footer() {
  return (
    <footer className="relative border-t border-[var(--color-border)] bg-[var(--color-bg)]">
      {/* thin signal-colored glow sitting on the top hairline */}
      <div className="absolute top-0 left-1/2 h-px w-full max-w-[600px] -translate-x-1/2 bg-gradient-to-r from-transparent via-[var(--color-signal)]/60 to-transparent" />

      <div className="mx-auto max-w-[1200px] px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 gap-12 md:grid-cols-[1.3fr_1fr_1fr]"
        >
          {/* brand */}
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[var(--color-signal)] shadow-[0_0_12px_2px_rgba(20,230,196,0.5)]" />
              <span className="font-display text-base font-medium text-[var(--color-text)]">
                Xai
              </span>
            </div>
            <p className="mt-4 max-w-[32ch] text-sm leading-relaxed text-[var(--color-text-muted)]">
              Raw data, given structure. Xai turns what your business already
              has into decisions it can act on.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-signal)]" />
              <span className="font-mono text-[11px] tracking-wider text-[var(--color-text-dim)] uppercase">
                All systems operational
              </span>
            </div>
          </div>

          {/* product links */}
          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] text-[var(--color-text-dim)] uppercase">
              Product
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="focus-ring rounded text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-signal)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* legal links */}
          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] text-[var(--color-text-dim)] uppercase">
              Company
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {LEGAL_LINKS.map((label) => (
                <li key={label}>
                  <Link
                    href="#"
                    className="focus-ring rounded text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-signal)]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-[var(--color-border)] pt-6 text-xs text-[var(--color-text-dim)] md:flex-row">
          <p className="font-mono">
            © 2026 Xai — Intelligence Workspace
          </p>
          <p>Prototype built for the RacoAI frontend challenge.</p>
        </div>
      </div>
    </footer>
  );
}