"use client";

import { useEffect, useRef, useState } from "react";

const brands = [
  {
    id: "aristo",
    number: "01",
    name: "Aristo Afrikana",
    tagline: "Where Culture Meets Cuisine",
    description:
      "A vibrant dining and entertainment destination in the heart of Akure, Ondo State. Aristo Afrikana brings together the finest local and continental dishes, grills & BBQ, handcrafted cocktails, music, art, and culture — all under one roof. More than a restaurant, it is a cultural experience built on one belief: creating happiness through fine dining, a feel-at-home ambiance, and beautiful customer service.",
    instagram: "https://www.instagram.com/aristoafrikana/",
    video:
      "https://res.cloudinary.com/du9kb43d6/video/upload/v1778842011/AQOHXHjjHXmuV93YIvKbp043oHDTRJZmWREujYADiwZSuLtquCFx5PlAvkGmy7QGacqDja1gx8_wh-WByA5nh4JDcOM30vBdhwxtdqo_pqrhpc.mp4",
    accent: "#C9A96E",
    bg: "#0A0A08",
    label: "Fine Dining · Entertainment · Akure",
  },
  {
    id: "malibu",
    number: "02",
    name: "Malibu by Aristo",
    tagline: "Upscale Dining Redefined",
    description:
      "The premium sister brand to Aristo Afrikana, Malibu by Aristo is a one-of-a-kind upscale restaurant designed to elevate every visit. With an intimate setting, exceptional service, and exquisite cuisine, Malibu is where Akure's finest come to mark life's most meaningful moments. Open daily from noon — every table is a stage, every meal a memory.",
    instagram: "https://www.instagram.com/malibubyaristo/",
    video:
      "https://res.cloudinary.com/du9kb43d6/video/upload/v1778841856/AQNupE3fGD8pBwDCKEtxWssC9hGVLixYj5FJxYfS16HdMFGvi3xZSk1TRxFaHMDOtQFjNC2FI7Amjr1TmQWfjrvgDHrlXok-Q5xshnU_btmkz4.mp4",
    accent: "#A8C5DA",
    bg: "#06090C",
    label: "Upscale · Fine Dining · Akure",
  },
  {
    id: "madison",
    number: "03",
    name: "Madison",
    tagline: "Flavors That Win Every Round",
    description:
      "Located in Alagbaka, Akure, Madison is a bold, energetic restaurant that makes one promise and keeps it every time — flavors that win. A carefully curated menu blending the best of local and international cuisine, crafted with passion, fresh ingredients, and culinary excellence. Whether it's a casual lunch, a dinner date, or a celebration — Madison delivers. Every round.",
    instagram: "https://www.instagram.com/madisonnigeria/",
    video:
      "https://res.cloudinary.com/du9kb43d6/video/upload/v1778841699/AQO2GPSN8nlxPMr8Wily07pzq7aYg_bEXhshd5kWIBL3BkxaOEfHK8UXunRORP8CTz3Nv53LxGSefx8MRWD-03P7_ckntyq.mp4",
    accent: "#E8A87C",
    bg: "#0C0806",
    label: "Restaurant · Coffee · Alagbaka, Akure",
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

function BrandSection({
  brand,
  index,
}: {
  brand: (typeof brands)[0];
  index: number;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.play().catch(() => {});
            setPlaying(true);
          } else {
            videoRef.current.pause();
            setPlaying(false);
          }
        }
      },
      { threshold: 0.3 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause();
        setPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
        setPlaying(true);
      }
    }
  };

  const isEven = index % 2 === 0;

  return (
    <div
      ref={sectionRef}
      className={`brand-section brand-section-${brand.id}`}
      style={{
        position: "relative",
        width: "100%",
        background: brand.bg,
        /* Desktop: side-by-side full viewport height */
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        alignItems: "stretch",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <style>{`
        /* ── MOBILE OVERRIDES ── */
        @media (max-width: 768px) {
          /* Stack into single column: video on top, text below */
          .brand-section {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto auto !important;
            min-height: unset !important;
          }

          /* Video always renders first (top) regardless of desktop order */
          .brand-video-col {
            order: -1 !important;
            /* 75vw tall — cinematic but leaves room for text */
            height: 75vw !important;
            min-height: 280px !important;
            max-height: 420px !important;
          }

          /* Text panel sits below, natural height */
          .brand-text-col {
            order: 0 !important;
            height: auto !important;
            padding: 2.8rem 1.6rem 3rem !important;
          }

          /* Ghost number smaller on mobile */
          .brand-ghost-number {
            font-size: 5rem !important;
            top: 0 !important;
            right: 1rem !important;
            left: auto !important;
          }

          /* Progress dots — bottom center on mobile */
          .brand-progress-dots {
            right: 50% !important;
            transform: translateX(50%) !important;
          }
        }
      `}</style>

      {/* Ghost number */}
      <div
        className="brand-ghost-number"
        style={{
          position: "absolute",
          top: "5%",
          [isEven ? "right" : "left"]: "3%",
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(8rem, 16vw, 15rem)",
          fontWeight: 700,
          lineHeight: 1,
          color: "transparent",
          WebkitTextStroke: `1px ${brand.accent}10`,
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 1,
        }}
      >
        {brand.number}
      </div>

      {/* ── TEXT SIDE ── */}
      <div
        className="brand-text-col"
        style={{
          order: isEven ? 1 : 2,
          position: "relative",
          zIndex: 10,
          padding: "5rem clamp(2rem, 5vw, 4.5rem)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "8px",
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            color: brand.accent,
            marginBottom: "1.5rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.7s cubic-bezier(.22,.68,0,1.2) 0.1s",
          }}
        >
          {brand.label}
        </p>

        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.2rem, 4.5vw, 4rem)",
            fontWeight: 400,
            lineHeight: 1.05,
            color: "#EDE8DE",
            marginBottom: "0.4rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(22px)",
            transition: "all 0.8s cubic-bezier(.22,.68,0,1.2) 0.22s",
          }}
        >
          {brand.name}
        </h2>

        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
            fontStyle: "italic",
            fontWeight: 300,
            color: brand.accent,
            marginBottom: "1.8rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(22px)",
            transition: "all 0.8s cubic-bezier(.22,.68,0,1.2) 0.35s",
          }}
        >
          {brand.tagline}
        </p>

        <div
          style={{
            height: "1px",
            width: visible ? "50px" : "0px",
            background: `linear-gradient(to right, ${brand.accent}, transparent)`,
            marginBottom: "1.8rem",
            transition: "width 0.9s ease 0.5s",
          }}
        />

        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "clamp(0.75rem, 1vw, 0.85rem)",
            fontWeight: 300,
            lineHeight: 1.95,
            color: "rgba(237,232,222,0.52)",
            maxWidth: "440px",
            marginBottom: "2.2rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(18px)",
            transition: "all 0.8s cubic-bezier(.22,.68,0,1.2) 0.5s",
          }}
        >
          {brand.description}
        </p>

        <a
          href={brand.instagram}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.58rem",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "#EDE8DE",
            textDecoration: "none",
            borderBottom: `1px solid ${brand.accent}44`,
            paddingBottom: "3px",
            display: "inline-block",
            width: "fit-content",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: `all 0.8s cubic-bezier(.22,.68,0,1.2) 0.65s, color 0.3s ease, border-color 0.3s ease`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = brand.accent;
            e.currentTarget.style.borderColor = brand.accent;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#EDE8DE";
            e.currentTarget.style.borderColor = `${brand.accent}44`;
          }}
        >
          Visit on Instagram
        </a>
      </div>

      {/* ── VIDEO SIDE ── */}
      <div
        className="brand-video-col"
        style={{
          order: isEven ? 2 : 1,
          position: "relative",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <video
          ref={videoRef}
          src={brand.video}
          muted
          loop
          playsInline
          preload="metadata"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: visible ? 1 : 0,
            transition: "opacity 1.2s ease 0.2s",
          }}
        />

        {/* Edge fades */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: isEven
              ? `linear-gradient(to right, ${brand.bg} 0%, transparent 12%, transparent 88%, ${brand.bg} 100%)`
              : `linear-gradient(to left, ${brand.bg} 0%, transparent 12%, transparent 88%, ${brand.bg} 100%)`,
            pointerEvents: "none",
            zIndex: 2,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "18%",
            background: `linear-gradient(to bottom, ${brand.bg}, transparent)`,
            pointerEvents: "none",
            zIndex: 2,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "18%",
            background: `linear-gradient(to top, ${brand.bg}, transparent)`,
            pointerEvents: "none",
            zIndex: 2,
          }}
        />

        {/* Accent border on inner edge */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            bottom: "20%",
            [isEven ? "left" : "right"]: 0,
            width: "1px",
            background: `linear-gradient(to bottom, transparent, ${brand.accent}20, transparent)`,
            zIndex: 3,
          }}
        />

        {/* Video controls */}
        <div
          style={{
            position: "absolute",
            bottom: "2.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease 0.8s",
          }}
        >
          <button
            onClick={togglePlay}
            style={{
              background: "rgba(0,0,0,0.55)",
              border: `1px solid ${brand.accent}44`,
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              backdropFilter: "blur(8px)",
              transition: "border-color 0.3s ease, background 0.3s ease",
              color: "#EDE8DE",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = brand.accent;
              e.currentTarget.style.background = "rgba(0,0,0,0.8)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = `${brand.accent}44`;
              e.currentTarget.style.background = "rgba(0,0,0,0.55)";
            }}
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? (
              <svg
                width="10"
                height="12"
                viewBox="0 0 10 12"
                fill="currentColor"
              >
                <rect x="0" y="0" width="3.5" height="12" rx="1" />
                <rect x="6.5" y="0" width="3.5" height="12" rx="1" />
              </svg>
            ) : (
              <svg
                width="10"
                height="12"
                viewBox="0 0 10 12"
                fill="currentColor"
              >
                <path d="M0 0 L10 6 L0 12 Z" />
              </svg>
            )}
          </button>

          <button
            onClick={toggleMute}
            style={{
              background: "rgba(0,0,0,0.55)",
              border: `1px solid ${brand.accent}44`,
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              backdropFilter: "blur(8px)",
              transition: "border-color 0.3s ease, background 0.3s ease",
              color: "#EDE8DE",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = brand.accent;
              e.currentTarget.style.background = "rgba(0,0,0,0.8)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = `${brand.accent}44`;
              e.currentTarget.style.background = "rgba(0,0,0,0.55)";
            }}
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? (
              <svg
                width="14"
                height="12"
                viewBox="0 0 14 12"
                fill="currentColor"
              >
                <path d="M0 4H3L7 1V11L3 8H0V4Z" />
                <line
                  x1="10"
                  y1="3"
                  x2="14"
                  y2="9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <line
                  x1="14"
                  y1="3"
                  x2="10"
                  y2="9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            ) : (
              <svg
                width="14"
                height="12"
                viewBox="0 0 14 12"
                fill="currentColor"
              >
                <path d="M0 4H3L7 1V11L3 8H0V4Z" />
                <path
                  d="M9 3.5C9.8 4.3 10.3 5.1 10.3 6C10.3 6.9 9.8 7.7 9 8.5"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M11 1.5C12.5 2.8 13.3 4.3 13.3 6C13.3 7.7 12.5 9.2 11 10.5"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>

          <span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "7px",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: `${brand.accent}88`,
            }}
          >
            {playing ? "Playing" : "Paused"}
          </span>
        </div>
      </div>

      {/* Progress dots */}
      <div
        className="brand-progress-dots"
        style={{
          position: "absolute",
          bottom: "1.8rem",
          right: "2rem",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          opacity: visible ? 0.5 : 0,
          transition: "opacity 0.8s ease 1s",
          zIndex: 10,
        }}
      >
        {brands.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === index ? "22px" : "5px",
              height: "1px",
              background: i === index ? brand.accent : "#2A2420",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function VenturePage() {
  const { ref, visible } = useInView(0.3);

  return (
    <section style={{ background: "#0C0C0C" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,300;1,300;1,400&family=Montserrat:wght@200;300;400&display=swap');
      `}</style>

      {/* Section intro */}
      <div
        ref={ref}
        style={{
          padding: "7rem 2rem 5rem",
          textAlign: "center",
          borderBottom: "1px solid #161410",
        }}
      >
        <div
          style={{
            width: visible ? "40px" : "0px",
            height: "1px",
            background: "#B8935A",
            margin: "0 auto 1.8rem",
            transition: "width 0.8s ease 0.1s",
          }}
        />
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "8px",
            letterSpacing: "0.55em",
            textTransform: "uppercase",
            color: "#7A6A52",
            marginBottom: "1.2rem",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.8s ease 0.2s",
          }}
        >
          The Portfolio
        </p>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
            fontWeight: 400,
            color: "#EDE8DE",
            letterSpacing: "0.02em",
            lineHeight: 1.05,
            margin: "0 0 1rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.9s cubic-bezier(.22,.68,0,1.2) 0.3s",
          }}
        >
          His Ventures
        </h2>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
            fontStyle: "italic",
            fontWeight: 300,
            color: "rgba(237,232,222,0.38)",
            maxWidth: "400px",
            margin: "0 auto",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.8s ease 0.45s",
          }}
        >
          Three brands. One vision. A legacy built in Akure.
        </p>
      </div>

      {brands.map((brand, i) => (
        <BrandSection key={brand.id} brand={brand} index={i} />
      ))}

      {/* Bottom rule */}
      <div
        style={{
          padding: "3rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.5rem",
          borderTop: "1px solid #161410",
        }}
      >
        <div
          style={{
            width: "30px",
            height: "1px",
            background: "linear-gradient(to right, transparent, #B8935A33)",
          }}
        />
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "7px",
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            color: "#2A2218",
          }}
        >
          Madison &nbsp;·&nbsp; Aristo Afrikana &nbsp;·&nbsp; Malibu by Aristo
        </p>
        <div
          style={{
            width: "30px",
            height: "1px",
            background: "linear-gradient(to left, transparent, #B8935A33)",
          }}
        />
      </div>
    </section>
  );
}
