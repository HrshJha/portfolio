"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Mail, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";

type NavBarProps = {
  theme: string;
  onToggleTheme: () => void;
};

const links = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function NavBar({ theme, onToggleTheme }: NavBarProps) {
  const [compact, setCompact] = useState(false);
  const [active, setActive] = useState("#work");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map(({ href }) => document.querySelector(href))
      .filter((section): section is Element => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-28% 0px -58% 0px", threshold: [0.1, 0.4, 0.7] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <motion.header
        className={`nav${compact ? " nav-compact" : ""}`}
        role="banner"
        animate={{ y: compact ? 2 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <a href="#top" className="wordmark" aria-label="Harsh Kumar Jha — home">
          HKJ<span className="wordmark-dot">.</span>
        </a>

        <nav className="nav-links" aria-label="Primary navigation">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={active === link.href ? "active" : ""}
              onClick={() => setActive(link.href)}
            >
              {link.label}
              {active === link.href && (
                <motion.span
                  className="nav-active-indicator"
                  layoutId="nav-active"
                  transition={{ type: "spring", stiffness: 520, damping: 34, mass: 0.55 }}
                />
              )}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <motion.a
            href="/harshahha.pdf"
            target="_blank"
            rel="noreferrer"
            className="nav-pill nav-pill-primary"
            whileHover={{ scale: 1.03, boxShadow: "0 10px 30px rgba(var(--accent-rgb), .22)" }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            Resume
          </motion.a>
          <motion.a
            href="mailto:jhaharsh451@gmail.com"
            className="nav-pill nav-pill-secondary"
            whileHover={{ scale: 1.03, boxShadow: "0 10px 30px rgba(var(--accent-rgb), .14)" }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <Mail size={14} /> Email
          </motion.a>
          <button className="icon-btn" onClick={onToggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button className="icon-btn menu-btn" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open}>
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu open"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            {links.map((link) => (
              <a key={link.href} href={link.href} className={active === link.href ? "active" : ""} onClick={closeMenu}>
                {link.label}
              </a>
            ))}
            <a href="mailto:jhaharsh451@gmail.com" className="mobile-contact" onClick={closeMenu}>Contact Harsh <Mail size={15} /></a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
