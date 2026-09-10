"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import PhysicsField from "../components/PhysicsField";

export default function ContactClient() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement)?.value;
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement)?.value;
    window.location.href = `mailto:jhaharsh451@gmail.com?subject=Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
  };

  return (
    <>
      <div className="grain" aria-hidden="true" />

      {/* Kivi-inspired floral background */}
      <div className="work-detail-field-wrap" aria-hidden="true">
        <PhysicsField />
      </div>

      {/* Top Floating Mini-Nav */}
      <header className="work-detail-nav section-pad">
        <Link href="/" className="work-detail-back-link">
          <ArrowLeft size={15} className="work-detail-back-arrow" />
          <span>Back to portfolio</span>
        </Link>

      </header>

      {/* Main Dedicated Contact View */}
      <main className="contact-page-main section-pad">
        <div className="contact-container">
          <div className="contact-page-header">
            <span className="section-kicker">04 / CONTACT</span>
            <h1 className="contact-title" id="contact-heading">
              Let&apos;s build something<br />
              <em>that holds up.</em>
            </h1>
          </div>

          <div className="contact-grid">
            {/* Left Column: Direct Email & Social Channels */}
            <div className="contact-left">
              <div className="contact-block">
                <span className="contact-label">EMAIL</span>
                <a href="mailto:jhaharsh451@gmail.com" className="contact-email-link">
                  <span className="email-text">jhaharsh451@gmail.com</span>
                  <ArrowUpRight size={18} className="email-arrow" />
                </a>
              </div>

              <div className="contact-block social-block">
                <span className="contact-label">SOCIAL</span>
                <div className="social-list">
                  <a href="https://github.com/HrshJha" target="_blank" rel="noreferrer" className="social-row-link">
                    <span className="social-row-name">GitHub</span>
                    <ArrowUpRight size={16} className="social-row-arrow" />
                  </a>
                  <a href="https://www.linkedin.com/in/hrshjha" target="_blank" rel="noreferrer" className="social-row-link">
                    <span className="social-row-name">LinkedIn</span>
                    <ArrowUpRight size={16} className="social-row-arrow" />
                  </a>
                  <a href="https://x.com/haarshjha" target="_blank" rel="noreferrer" className="social-row-link">
                    <span className="social-row-name">X</span>
                    <ArrowUpRight size={16} className="social-row-arrow" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Direct Message Form */}
            <div className="contact-right">
              <div className="contact-form-wrap">
                <span className="contact-label">SEND A MESSAGE</span>
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="contact-name" className="form-label">Name</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your name"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-email" className="form-label">Email</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      placeholder="Your email"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-message" className="form-label">Message</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={4}
                      placeholder="Tell me about your project or idea..."
                      className="form-textarea"
                    />
                  </div>

                  <button type="submit" className="contact-submit-btn">
                    <span>Send message</span>
                    <ArrowUpRight size={16} className="submit-arrow" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Minimal Site Footer */}
      <footer className="site-footer" role="contentinfo">
        <span className="footer-name">HARSH KUMAR JHA</span>
        <span className="footer-line">Building AI systems through machine learning and engineering.</span>
        <span className="footer-copy">© 2026</span>
      </footer>
    </>
  );
}
