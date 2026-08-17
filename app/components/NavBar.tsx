"use client";

import { motion } from "framer-motion";
import { Mail, Moon, Sun } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type NavBarProps = {
  theme: string;
  onToggleTheme: () => void;
};

const links = [
  { label: "Work", href: "#work", id: "work" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "About", href: "#about", id: "about" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export default function NavBar({ theme, onToggleTheme }: NavBarProps) {
  const [compact, setCompact] = useState(false);
  const [active, setActive] = useState("#work");
  const navRef = useRef<HTMLElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 36,
    opacity: 0,
  });

  const updateIndicator = useCallback(() => {
    if (!navRef.current) return;
    const activeEl = navRef.current.querySelector<HTMLAnchorElement>(`a[href="${active}"]`);
    if (!activeEl) {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
      return;
    }
    const navRect = navRef.current.getBoundingClientRect();
    const linkRect = activeEl.getBoundingClientRect();

    const indicatorWidth = 36;
    const center = linkRect.left - navRect.left + linkRect.width / 2;
    const left = center - indicatorWidth / 2;

    setIndicatorStyle({
      left,
      width: indicatorWidth,
      opacity: 1,
    });
  }, [active]);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    updateIndicator();
    window.addEventListener("resize", updateIndicator, { passive: true });
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator]);

  useEffect(() => {
    const sectionIds = ["work", "experience", "about", "contact"];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActive(`#${visible[0].target.id}`);
        }
      },
      {
        root: null,
        threshold: [0.15, 0.35, 0.6, 0.85],
        rootMargin: "-20% 0px -45% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));

    const onScrollEdge = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      if (scrollY < 140) {
        setActive("#work");
      } else if (scrollY >= maxScroll - 60) {
        setActive("#contact");
      }
    };

    window.addEventListener("scroll", onScrollEdge, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScrollEdge);
    };
  }, []);

  return (
    <motion.header
      className={`nav${compact ? " nav-compact" : ""}`}
      role="banner"
      animate={{ y: compact ? 2 : 0 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      <a href="#top" className="wordmark" aria-label="Harsh Kumar Jha — home">
        HKJ<span className="wordmark-dot">.</span>
      </a>

      <nav ref={navRef} className="nav-links" aria-label="Primary navigation">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={active === link.href ? "active" : ""}
            onClick={() => setActive(link.href)}
          >
            {link.label}
          </a>
        ))}
        <div
          className="nav-active-indicator"
          style={{
            transform: `translateX(${indicatorStyle.left}px)`,
            width: `${indicatorStyle.width}px`,
            opacity: indicatorStyle.opacity,
          }}
          aria-hidden="true"
        />
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
        <button
          className="icon-btn"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </motion.header>
  );
}
