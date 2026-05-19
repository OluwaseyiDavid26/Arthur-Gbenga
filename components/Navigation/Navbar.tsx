"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "Ventures", href: "/#ventures" },
  { label: "Legacy", href: "/#legacy" },
  { label: "Behind the Scenes", href: "/behind-the-scenes" },
  { label: "The 40", href: "/the40" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Only track scroll for homepage sections
  useEffect(() => {
    // Only run this on the homepage
    if (pathname !== "/") return;

    const handleScroll = () => {
      const sections = ["home", "ventures", "legacy"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Function to determine if a link is active
  //   const isActive = (link) => {
  const isActive = (link: { href: string }) => {
    // For homepage anchor links
    if (link.href.startsWith("/#")) {
      const section = link.href.replace("/#", "");
      return pathname === "/" && activeSection === section;
    }
    // For regular page routes
    return pathname === link.href;
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,400&family=Montserrat:wght@200;300;400&display=swap');

        .nav-link {
          font-family: 'Montserrat', sans-serif;
          font-size: 9.5px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          text-decoration: none;
          color: #7A6A52;
          transition: color 0.3s ease;
          position: relative;
          padding-bottom: 2px;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: #B8935A;
          transition: width 0.35s cubic-bezier(.22,.68,0,1.2);
        }
        .nav-link:hover { color: #EDE8DE; }
        .nav-link:hover::after { width: 100%; }
        .nav-link.active { color: #B8935A; }
        .nav-link.active::after { width: 100%; }

        .social-link {
          font-family: 'Montserrat', sans-serif;
          font-size: 9px;
          letter-spacing: 0.25em;
          text-decoration: none;
          color: #4A4035;
          transition: color 0.3s ease;
        }
        .social-link:hover { color: #B8935A; }

        /* mobile menu */
        .mobile-menu {
          position: fixed;
          inset: 0;
          background: #0A0A0A;
          z-index: 90;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 2.5rem;
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(.22,.68,0,1.2);
        }
        .mobile-menu.open  { opacity: 1; transform: translateY(0);    pointer-events: all; }
        .mobile-menu.closed{ opacity: 0; transform: translateY(-12px); pointer-events: none; }

        .mobile-nav-link {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          letter-spacing: 0.45em;
          text-transform: uppercase;
          text-decoration: none;
          color: #6A5C46;
          transition: color 0.3s ease;
        }
        .mobile-nav-link:hover,
        .mobile-nav-link.active { color: #B8935A; }

        /* hamburger bars */
        .bar {
          display: block;
          height: 1px;
          background: #B8935A;
          transition: all 0.35s cubic-bezier(.22,.68,0,1.2);
          transform-origin: center;
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: "68px",
          display: "flex",
          alignItems: "center",
          padding: "0 clamp(1.5rem, 5vw, 4rem)",
          transition:
            "background 0.5s ease, border-color 0.5s ease, backdrop-filter 0.5s ease",
          background: scrolled ? "rgba(10,10,10,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled
            ? "1px solid #1C1810"
            : "1px solid transparent",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: "1.15rem",
            color: "#B8935A",
            textDecoration: "none",
            letterSpacing: "0.04em",
            flexShrink: 0,
            opacity: mounted ? 1 : 0,
            transition: "opacity 0.8s ease 0.1s",
          }}
        >
          AGO
        </Link>

        {/* Desktop nav — centred */}
        <nav
          style={{
            display: "flex",
            gap: "clamp(1.5rem, 3vw, 2.8rem)",
            margin: "0 auto",
            opacity: mounted ? 1 : 0,
            transition: "opacity 0.8s ease 0.2s",
          }}
          className="hidden-mobile"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link ${isActive(link) ? "active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Social icons — right */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.4rem",
            flexShrink: 0,
            opacity: mounted ? 1 : 0,
            transition: "opacity 0.8s ease 0.3s",
          }}
          className="hidden-mobile"
        >
          {/* Thin divider */}
          <div
            style={{ width: "1px", height: "18px", background: "#2A2218" }}
          />

          <a
            href="https://www.linkedin.com/in/arthurotoijamun/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="LinkedIn"
          >
            {/* LinkedIn SVG */}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>

          <a
            href="https://www.instagram.com/arthurgbenga/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="Instagram"
          >
            {/* Instagram SVG */}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
            </svg>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((p) => !p)}
          aria-label="Toggle menu"
          style={{
            marginLeft: "auto",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "6px",
            display: "none",
            flexDirection: "column",
            gap: "5px",
            width: "28px",
          }}
          className="show-mobile"
        >
          <span
            className="bar"
            style={{
              width: menuOpen ? "24px" : "24px",
              transform: menuOpen ? "translateY(6px) rotate(45deg)" : "none",
            }}
          />
          <span
            className="bar"
            style={{
              width: "16px",
              opacity: menuOpen ? 0 : 1,
              transform: menuOpen ? "scaleX(0)" : "none",
            }}
          />
          <span
            className="bar"
            style={{
              width: menuOpen ? "24px" : "24px",
              transform: menuOpen ? "translateY(-6px) rotate(-45deg)" : "none",
            }}
          />
        </button>

        {/* Responsive helpers */}
        <style>{`
          @media (max-width: 768px) {
            .hidden-mobile { display: none !important; }
            .show-mobile   { display: flex !important; }
          }
        `}</style>
      </header>

      {/* ── MOBILE MENU OVERLAY ── */}
      <div className={`mobile-menu ${menuOpen ? "open" : "closed"}`}>
        {/* Close button top right */}
        <button
          onClick={() => setMenuOpen(false)}
          style={{
            position: "absolute",
            top: "1.5rem",
            right: "clamp(1.5rem, 5vw, 4rem)",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#4A4035",
            fontSize: "0.6rem",
            fontFamily: "'Montserrat', sans-serif",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}
        >
          Close
        </button>

        {/* Logo in overlay */}
        <span
          style={{
            position: "absolute",
            top: "1.4rem",
            left: "clamp(1.5rem, 5vw, 4rem)",
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: "1.1rem",
            color: "#B8935A",
            letterSpacing: "0.04em",
          }}
        >
          AGO
        </span>

        {/* Links */}
        {navLinks.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            className={`mobile-nav-link ${isActive(link) ? "active" : ""}`}
            style={{
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(10px)",
              transition: `opacity 0.4s ease ${i * 0.07 + 0.1}s, transform 0.4s ease ${i * 0.07 + 0.1}s, color 0.3s ease`,
            }}
          >
            {link.label}
          </Link>
        ))}

        {/* Social links in mobile menu */}
        <div
          style={{
            display: "flex",
            gap: "2rem",
            marginTop: "1rem",
            opacity: menuOpen ? 1 : 0,
            transition: "opacity 0.4s ease 0.45s",
          }}
        >
          <a
            href="https://www.linkedin.com/in/arthurotoijamun/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            style={{
              fontSize: "8px",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
            }}
          >
            LinkedIn
          </a>
          <a
            href="https://www.instagram.com/arthurgbenga/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            style={{
              fontSize: "8px",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
            }}
          >
            Instagram
          </a>
        </div>

        {/* Bottom decorative line */}
        <div
          style={{
            position: "absolute",
            bottom: "2.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            width: "40px",
            height: "1px",
            background:
              "linear-gradient(to right, transparent, #B8935A44, transparent)",
          }}
        />
      </div>
    </>
  );
}
