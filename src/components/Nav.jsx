"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const LINKS = [
  { href: "#flow", id: "flow", label: "How it works" },
  { href: "#dashboard", id: "dashboard", label: "Workspace" },
  { href: "#signature", id: "signature", label: "Automations" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

 
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);


  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  
  const handleLinkClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    
    setMobileOpen(false);

    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        setActiveId(id);
      }, 60);
    }
  };

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        scrolled || mobileOpen
          ? "border-b border-[var(--color-border)] bg-[var(--color-bg)]/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      {/* Top Navbar Container */}
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4">
        
        <Link href="#hero"
          className="flex items-center gap-2 focus-ring rounded"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            setActiveId(null);
            setMobileOpen(false);
          }}
        >
          <span className="h-2 w-2 rounded-full bg-[var(--color-signal)]" />
          <span className="font-display text-sm font-medium tracking-wide">
            Xai
          </span>
        </Link>

      
        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => {
            const isActive = activeId === l.id;
            return (
              <Link key={l.id}
                href={l.href}
                onClick={(e) => handleLinkClick(e, l.id)}
                className="focus-ring relative rounded pb-1 text-sm transition-colors"
                style={{
                  color: isActive ? "var(--color-text)" : "var(--color-text-muted)",
                }}
              >
                {l.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-0 right-0 -bottom-[1px] h-[1.5px] rounded-full bg-[var(--color-signal)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="#dashboard"
            onClick={(e) => handleLinkClick(e, "dashboard")}
            className="focus-ring hidden rounded-full border border-[var(--color-border)] px-4 py-2 text-xs font-medium text-[var(--color-text)] transition-colors hover:border-[var(--color-signal)] sm:inline-block"
          >
            Open workspace
          </Link>

     
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="focus-ring relative flex h-9 w-9 items-center justify-center rounded-full md:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute h-[1.5px] w-4 rounded-full bg-[var(--color-text)]"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="absolute h-[1.5px] w-4 rounded-full bg-[var(--color-text)]"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute h-[1.5px] w-4 rounded-full bg-[var(--color-text)]"
            />
          </button>
        </div>
      </div>

   
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-bg)]/95 backdrop-blur-md md:hidden"
          >
            <nav className="flex flex-col gap-1 px-6 py-4">
              {LINKS.map((l, i) => {
                const isActive = activeId === l.id;
                return (
                  <Link
                    key={l.id}
                    href={l.href}
                    onClick={(e) => handleLinkClick(e, l.id)}
                    className="focus-ring rounded block"
                  >
                    <motion.span
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      className="block py-3 text-sm transition-colors"
                      style={{
                        color: isActive ? "var(--color-text)" : "var(--color-text-muted)",
                      }}
                    >
                      {l.label}
                    </motion.span>
                  </Link>
                );
              })}
              
              <Link
                href="#dashboard"
                onClick={(e) => handleLinkClick(e, "dashboard")}
                className="focus-ring mt-2 block"
              >
                <motion.span
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: LINKS.length * 0.05 }}
                  className="block rounded-full border border-[var(--color-border)] px-4 py-2 text-center text-xs font-medium text-[var(--color-text)] transition-colors hover:border-[var(--color-signal)]"
                >
                  Open workspace
                </motion.span>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}