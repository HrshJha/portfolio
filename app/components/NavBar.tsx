"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const links = [
  { label: "Work", href: "#work", id: "work" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "About", href: "#about", id: "about" },
  { label: "Contact", href: "/contact", id: "contact" },
];

export default function NavBar() {
  const [active, setActive] = useState("work");

  useEffect(() => {
    const sections = links
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0.1, 0.3, 0.6] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header className="nav editorial-nav" role="banner" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <a href="#top" className="wordmark" aria-label="Harsh Kumar Jha — home">HKJ<span className="wordmark-dot">.</span></a>

      <nav className="nav-links" aria-label="Primary navigation">
        {links.map((link) => (
          <a key={link.href} href={link.href} data-section={link.id} className={active === link.id ? "active" : ""}>
            {link.label}
          </a>
        ))}
      </nav>

      <div className="nav-actions">
        <a href="/harshaha.pdf" target="_blank" rel="noreferrer" className="nav-text-link">Resume <span>↗</span></a>
        <a href="mailto:jhaharsh451@gmail.com" className="nav-text-link">Email</a>
      </div>
    </motion.header>
  );
}
