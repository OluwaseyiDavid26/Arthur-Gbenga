"use client";

import { useEffect, useRef, useState } from "react";

// ── Replace placeholder awards with real ones when available ──
const awards = [
  {
    year: "2015",
    title: "Certificate of Excellence",
    issuer: "Sanofi Nigeria",
    description:
      "Awarded for being the 3rd best CLACIA rep in Nigeria for the year 2015, in recognition of outstanding pharmaceutical sales performance and excellence.",
    icon: "🏆",
  },
  {
    year: "2017",
    title: "Certificate of Recognition",
    issuer: "Sanofi Nigeria",
    description:
      "Recognised for exceptional contribution to the Sanofi brand in 2017, awarded in acknowledgment of leadership and performance excellence in the South-Western region.",
    icon: "🥇",
  },
  {
    year: "2017",
    title: "Certificate of Excellence — 1st Place",
    issuer: "Sanofi Nigeria",
    description:
      "Awarded for being the 1st best CLACIA rep in Nigeria for the year 2017 — a testament to relentless drive, discipline, and a commitment to being the best.",
    icon: "◈",
  },
  {
    year: "2022",
    title: "Global Leaders Summit",
    issuer: "Global Leaders Summit",
    description:
      "Recognised among distinguished leaders at the Global Leaders Summit, receiving both a trophy and certificate of participation for contributions to leadership and enterprise.",
    icon: "✦",
  },
];

// ── Milestones updated based on verified online info ──
const milestones = [
  {
    year: "2020",
    title: "Aristo Afrikana — The Beginning",
    description:
      "Founded Aristo Games & Bistro on Airport Road, Oba-Ile, Akure — a cultural dining landmark celebrating local food, music, art, and community.",
  },
  {
    year: "2024",
    title: "Malibu by Aristo Opens",
    description:
      "Launched Malibu by Aristo — an upscale fine dining restaurant in Akure offering an elevated culinary experience with Sunday brunch buffets and intimate evening dining.",
  },
  {
    year: "2024",
    title: "Madison Joins the Portfolio",
    description:
      "Opened Madison Restaurant at Alagbaka, Akure — a bold, flavour-forward concept bringing accessible premium dining to the heart of the city.",
  },
  {
    year: "2026",
    title: "A Legacy at 40",
    description:
      "Three thriving brands, a growing team across Akure, and a 40th birthday celebration that became the talk of the city — the story is far from over.",
  },
];

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function AwardCard({
  award,
  index,
  total,
}: {
  award: (typeof awards)[0];
  index: number;
  total: number;
}) {
  const { ref, visible } = useInView(0.15);

  // If this is the last card and the total is odd, span full width
  const isLastOdd = index === total - 1 && total % 2 !== 0;

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.8s cubic-bezier(.22,.68,0,1.2) ${index * 0.12}s`,
        border: "1px solid #1e1e1e",
        padding: "2.5rem",
        position: "relative",
        overflow: "hidden",
        background: "#0d0d0d",
        // Span full row if last item in an odd-count list
        gridColumn: isLastOdd ? "1 / -1" : undefined,
        // When spanning full row, cap width so it doesn't look stretched
        maxWidth: isLastOdd ? "calc(50% - 0.5px)" : undefined,
      }}
    >
      {/* Ghost year */}
      <span
        style={{
          position: "absolute",
          top: "-10px",
          right: "20px",
          fontFamily: "'Cinzel', serif",
          fontSize: "5rem",
          fontWeight: 400,
          color: "transparent",
          WebkitTextStroke: "1px #C9A96E18",
          pointerEvents: "none",
          userSelect: "none",
          lineHeight: 1,
        }}
      >
        {award.year}
      </span>

      {/* Gold corner accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "3px",
          height: visible ? "60px" : "0px",
          background: "linear-gradient(to bottom, #C9A96E, transparent)",
          transition: `height 0.8s ease ${index * 0.12 + 0.3}s`,
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "1rem",
          marginBottom: "1.2rem",
        }}
      >
        <span style={{ fontSize: "1.4rem", marginTop: "2px" }}>
          {award.icon}
        </span>
        <div>
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "8px",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "#C9A96E",
              marginBottom: "0.5rem",
            }}
          >
            {award.year} &nbsp;·&nbsp; {award.issuer}
          </p>
          <h3
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(1rem, 2vw, 1.3rem)",
              fontWeight: 400,
              color: "#F5EFE0",
              lineHeight: 1.3,
            }}
          >
            {award.title}
          </h3>
        </div>
      </div>

      <p
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "0.8rem",
          fontWeight: 300,
          lineHeight: 1.8,
          color: "rgba(245,239,224,0.5)",
        }}
      >
        {award.description}
      </p>
    </div>
  );
}

function MilestoneItem({
  milestone,
  index,
}: {
  milestone: (typeof milestones)[0];
  index: number;
}) {
  const { ref, visible } = useInView(0.2);
  const isLast = index === milestones.length - 1;

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        gap: "2rem",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-20px)",
        transition: `all 0.9s cubic-bezier(.22,.68,0,1.2) ${index * 0.15}s`,
      }}
    >
      {/* Timeline spine */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: visible ? "#C9A96E" : "#333",
            border: "1px solid #C9A96E",
            transition: `background 0.5s ease ${index * 0.15 + 0.4}s`,
            flexShrink: 0,
            marginTop: "4px",
          }}
        />
        {!isLast && (
          <div
            style={{
              width: "1px",
              flex: 1,
              minHeight: "60px",
              background: "linear-gradient(to bottom, #C9A96E44, #1e1e1e)",
              marginTop: "6px",
            }}
          />
        )}
      </div>

      {/* Content */}
      <div style={{ paddingBottom: isLast ? 0 : "3rem" }}>
        <p
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "0.85rem",
            color: "#C9A96E",
            letterSpacing: "0.15em",
            marginBottom: "0.4rem",
          }}
        >
          {milestone.year}
        </p>
        <h4
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
            fontWeight: 400,
            color: "#F5EFE0",
            marginBottom: "0.5rem",
            lineHeight: 1.2,
          }}
        >
          {milestone.title}
        </h4>
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.8rem",
            fontWeight: 300,
            lineHeight: 1.8,
            color: "rgba(245,239,224,0.5)",
            maxWidth: "420px",
          }}
        >
          {milestone.description}
        </p>
      </div>
    </div>
  );
}

export default function LegacyPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <main style={{ background: "#080808", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Montserrat:wght@200;300;400&display=swap');

        .awards-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1px;
          background: #1a1a1a;
          border: 1px solid #1a1a1a;
        }

        @media (max-width: 768px) {
          .awards-grid {
            grid-template-columns: 1fr !important;
          }
          .awards-grid > div {
            grid-column: 1 !important;
            max-width: 100% !important;
          }
        }
      `}</style>

      {/* ── HERO HEADER ── */}
      <div
        ref={heroRef}
        style={{
          minHeight: "50vh",
          padding: "8rem 2rem 6rem",
          borderBottom: "1px solid #1a1a1a",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ghost LEGACY behind */}
        <span
          style={{
            position: "absolute",
            fontFamily: "'Cinzel', serif",
            fontSize: "clamp(6rem, 18vw, 16rem)",
            fontWeight: 400,
            color: "transparent",
            WebkitTextStroke: "1px #C9A96E0A",
            pointerEvents: "none",
            userSelect: "none",
            letterSpacing: "0.1em",
            lineHeight: 1,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            whiteSpace: "nowrap",
          }}
        >
          LEGACY
        </span>

        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "9px",
            letterSpacing: "0.5em",
            textTransform: "uppercase",
            color: "#C9A96E",
            marginBottom: "1.5rem",
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease 0.2s",
            position: "relative",
            zIndex: 1,
          }}
        >
          Recognition &amp; Milestones
        </p>

        <h1
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: 400,
            color: "#F5EFE0",
            letterSpacing: "0.05em",
            lineHeight: 1.1,
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(25px)",
            transition: "all 0.9s cubic-bezier(.22,.68,0,1.2) 0.35s",
            position: "relative",
            zIndex: 1,
          }}
        >
          The Legacy
        </h1>

        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1rem, 2vw, 1.3rem)",
            fontStyle: "italic",
            fontWeight: 300,
            color: "rgba(245,239,224,0.45)",
            marginTop: "1rem",
            maxWidth: "500px",
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.9s ease 0.55s",
            position: "relative",
            zIndex: 1,
          }}
        >
          A life of purpose leaves marks that time cannot erase.
        </p>
      </div>

      {/* ── AWARDS GRID ── */}
      <section
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "6rem 2rem" }}
      >
        <div
          style={{
            marginBottom: "4rem",
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "1px",
              background: "linear-gradient(to right, #C9A96E, transparent)",
            }}
          />
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "9px",
              letterSpacing: "0.45em",
              textTransform: "uppercase",
              color: "#C9A96E",
            }}
          >
            Awards &amp; Honours
          </p>
        </div>

        <div className="awards-grid">
          {awards.map((award, i) => (
            <AwardCard key={i} award={award} index={i} total={awards.length} />
          ))}
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div style={{ borderTop: "1px solid #1a1a1a" }} />

      {/* ── TIMELINE ── */}
      <section
        style={{ maxWidth: "800px", margin: "0 auto", padding: "6rem 2rem" }}
      >
        <div
          style={{
            marginBottom: "4rem",
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "1px",
              background: "linear-gradient(to right, #C9A96E, transparent)",
            }}
          />
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "9px",
              letterSpacing: "0.45em",
              textTransform: "uppercase",
              color: "#C9A96E",
            }}
          >
            The Journey
          </p>
        </div>

        <div>
          {milestones.map((milestone, i) => (
            <MilestoneItem key={i} milestone={milestone} index={i} />
          ))}
        </div>
      </section>

      {/* ── QUOTE BAND ── */}
      <div
        style={{
          borderTop: "1px solid #1a1a1a",
          borderBottom: "1px solid #1a1a1a",
          padding: "5rem 2rem",
          textAlign: "center",
          background: "#0d0d0d",
        }}
      >
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
            fontStyle: "italic",
            fontWeight: 300,
            color: "rgba(245,239,224,0.7)",
            maxWidth: "700px",
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          "The measure of a man is not in the titles he holds, but in the lives
          he touches and the world he dares to build."
        </p>
        <div
          style={{
            width: "40px",
            height: "1px",
            background: "#C9A96E",
            margin: "2rem auto 1rem",
          }}
        />
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "8px",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "#C9A96E",
          }}
        >
          Arthur Gbenga Otoijamun
        </p>
      </div>

      {/* footer spacing */}
      <div
        style={{
          padding: "4rem 2rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "9px",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "#333",
          }}
        >
          Awards · Recognition · Milestones
        </p>
      </div>
    </main>
  );
}
