"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/content/profile";
import { Magnetic } from "./Magnetic";
import { lenisController } from "@/lib/lenisController";
import { EASE_OUT_EXPO, maskUp, stagger } from "@/lib/motion";

// Recruiter-facing labels — logo already serves as the home link, so "Top"
// isn't listed.
const CHAPTERS = [
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

// Goal-mockup header links. CHAPTERS keeps driving the mobile menu.
const NAV_LINKS = [
  { id: "top", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const [active, setActive] = useState("top");
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    const ids = [...new Set([...CHAPTERS, ...NAV_LINKS].map((c) => c.id))];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Close the menu automatically if the viewport grows into the desktop rail.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => setMenuOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Lock page scroll and manage focus while the mobile menu is open.
  useEffect(() => {
    if (!menuOpen) return;
    lenisController.instance?.stop();
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    firstLinkRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      lenisController.instance?.start();
      document.documentElement.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      toggleRef.current?.focus();
    };
  }, [menuOpen]);

  return (
    <>
      {/* Top bar */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          solid || menuOpen ? "glass-dark border-b border-paper/10" : ""
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 md:px-10 lg:px-16 lg:py-5">
          <a
            href="#top"
            data-cursor="Top"
            className="group flex items-baseline font-display text-3xl tracking-tight transition-opacity duration-300 hover:opacity-90 md:-ml-16 md:text-4xl"
          >
            <span className="relative font-semibold">
              {profile.firstName}
              <span className="text-paper">.</span>
              <span className="absolute inset-x-0 -bottom-1 h-px scale-x-0 bg-gold transition-transform duration-300 origin-left group-hover:scale-x-100" />
            </span>
            <span className="ml-4 font-sans text-sm tracking-[0.15em] text-gold transition-colors duration-300">
              {profile.credential}
            </span>
          </a>

          {/* Desktop center nav — gold underline marks the active section */}
          <nav aria-label="Primary" className="hidden items-center gap-14 lg:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                data-cursor={l.label}
                className={`relative pb-1.5 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                  active === l.id ? "text-gold" : "text-paper/80 hover:text-paper"
                }`}
              >
                {l.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 bottom-0 h-px bg-gold transition-opacity duration-300 ${
                    active === l.id ? "opacity-100" : "opacity-0"
                  }`}
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Magnetic strength={0.4}>
              <a
                href="#contact"
                data-cursor="Say hi"
                className="group hidden items-center gap-2 whitespace-nowrap rounded-xl border border-gold/60 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-gold transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold hover:text-obsidian sm:inline-flex"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gold transition-colors group-hover:bg-obsidian" />
                Available for Work
              </a>
            </Magnetic>

            {/* Mobile/tablet chapter menu toggle */}
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-chapter-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              data-cursor={menuOpen ? "Close" : "Menu"}
              className="relative flex h-10 w-10 flex-none flex-col items-center justify-center gap-[6px] lg:hidden"
            >
              <motion.span
                animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6.5 : 0 }}
                transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                className="block h-px w-6 bg-paper"
              />
              <motion.span
                animate={{ opacity: menuOpen ? 0 : 1 }}
                transition={{ duration: 0.2 }}
                className="block h-px w-6 bg-paper"
              />
              <motion.span
                animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6.5 : 0 }}
                transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                className="block h-px w-6 bg-paper"
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile/tablet chapter menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-chapter-menu"
            aria-label="Chapters"
            data-theme="dark"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
            className="fixed inset-0 z-[55] flex flex-col bg-obsidian px-6 pb-10 pt-24 text-paper lg:hidden"
          >
            <motion.ul
              variants={stagger(0.05, 0.06)}
              initial="hidden"
              animate="show"
              className="flex flex-1 flex-col justify-center gap-1"
            >
              {CHAPTERS.map((c, i) => (
                <li key={c.id} className="overflow-hidden border-b border-paper/10 py-3">
                  <motion.a
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={`#${c.id}`}
                    onClick={() => setMenuOpen(false)}
                    data-cursor={c.label}
                    variants={maskUp}
                    className={`flex items-baseline gap-4 font-display text-4xl transition-colors ${
                      active === c.id ? "text-gold" : "text-paper"
                    }`}
                  >
                    <span className="font-mono text-xs text-paper/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {c.label}
                  </motion.a>
                </li>
              ))}
            </motion.ul>

            <div className="flex items-center justify-between gap-4">
              <a
                href={`mailto:${profile.email}`}
                onClick={() => setMenuOpen(false)}
                className="font-mono text-xs uppercase tracking-[0.2em] text-paper/50"
              >
                {profile.email}
              </a>
              <a
                href={profile.resumeUrl}
                download
                onClick={() => setMenuOpen(false)}
                className="font-mono text-xs uppercase tracking-[0.2em] text-gold"
              >
                Download Résumé <span aria-hidden="true">↓</span>
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Scroll progress bar */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gold"
        style={{ scaleX: progress }}
      />
    </>
  );
}
