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
  { label: "Contact", href: "/contact", id: "contact" },
];

export default function NavBar({ theme, onToggleTheme }: NavBarProps) {
  const [compact, setCompact] = useState(false);
  const [active, setActive] = useState("work");
  const navRef = useRef<HTMLElement>(null);
  const isNavigatingRef = useRef(false);

  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 36,
    opacity: 0,
  });

  const updateIndicator = useCallback((activeTarget: string) => {
    if (!navRef.current) return;
    const activeEl = navRef.current.querySelector<HTMLAnchorElement>(`a[data-section="${activeTarget}"]`);
    if (!activeEl) return;

    const navRect = navRef.current.getBoundingClientRect();
    const linkRect = activeEl.getBoundingClientRect();

    if (linkRect.width === 0) return;

    const indicatorWidth = 36;
    const centerX = linkRect.left - navRect.left + linkRect.width / 2;
    const targetLeft = centerX - indicatorWidth / 2;

    setIndicatorStyle({
      left: targetLeft,
      width: indicatorWidth,
      opacity: 1,
    });
  }, []);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    updateIndicator(active);
    const timer = setTimeout(() => updateIndicator(active), 60);
    const onResize = () => updateIndicator(active);
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
    };
  }, [active, updateIndicator]);

  // Smooth scroll for anchors, normal route change for pages
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, sectionId: string) => {
    if (!href.startsWith("#")) {
      // Normal route navigation (e.g. /contact)
      return;
    }

    e.preventDefault();
    const targetEl = document.getElementById(sectionId);
    if (!targetEl) return;

    isNavigatingRef.current = true;
    setActive(sectionId);
    updateIndicator(sectionId);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const navHeight = navRef.current?.closest(".nav")?.getBoundingClientRect().height || 64;
    const targetY = Math.max(0, targetEl.getBoundingClientRect().top + window.scrollY - navHeight - 24);

    // Subtle destination section entry emphasis
    const dividerEl = document.getElementById(`divider-${sectionId}`);
    if (dividerEl) {
      dividerEl.classList.add("is-highlighted");
      setTimeout(() => dividerEl.classList.remove("is-highlighted"), 380);
    }
    targetEl.classList.remove("section-arriving");
    void targetEl.offsetWidth; // trigger reflow
    targetEl.classList.add("section-arriving");
    setTimeout(() => targetEl.classList.remove("section-arriving"), 550);

    if (prefersReducedMotion) {
      window.scrollTo(0, targetY);
      isNavigatingRef.current = false;
      return;
    }

    const startY = window.scrollY;
    const diff = targetY - startY;
    const duration = 820;
    const startTime = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 4);

    function step(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const currentY = startY + diff * ease(progress);
      window.scrollTo(0, currentY);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        window.scrollTo(0, targetY);
        setTimeout(() => {
          isNavigatingRef.current = false;
        }, 100);
      }
    }
    requestAnimationFrame(step);
  };

  useEffect(() => {
    const sectionIds = ["work", "experience", "about", "contact"];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        if (isNavigatingRef.current) return;

        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          const sectionId = visible[0].target.id || visible[0].target.getAttribute("data-section");
          if (sectionId && links.some((l) => l.id === sectionId)) {
            setActive(sectionId);
          }
        }
      },
      {
        root: null,
        threshold: [0.25, 0.5, 0.75],
        rootMargin: "-20% 0px -45% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));

    const onScrollEdge = () => {
      if (isNavigatingRef.current) return;
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      if (scrollY < 140) {
        setActive("work");
      } else if (scrollY >= maxScroll - 60) {
        setActive("contact");
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
            data-section={link.id}
            className={active === link.id ? "active" : ""}
            onClick={(e) => handleNavClick(e, link.href, link.id)}
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
        >
          <span className="indicator-line" />
        </div>
      </nav>

      <div className="nav-actions">
        <motion.a
    href="/harshaha.pdf"
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
