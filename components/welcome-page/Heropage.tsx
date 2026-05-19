// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";

// export default function Heropage() {
//   const [loaded, setLoaded] = useState(false);

//   useEffect(() => {
//     const t = setTimeout(() => setLoaded(true), 120);
//     return () => clearTimeout(t);
//   }, []);

//   const show = (delay: string) => ({
//     opacity: loaded ? 1 : 0,
//     transform: loaded ? "translateY(0)" : "translateY(22px)",
//     transition: `opacity 0.9s cubic-bezier(.22,.68,0,1.2) ${delay}, transform 0.9s cubic-bezier(.22,.68,0,1.2) ${delay}`,
//   });

//   return (
//     <section
//       style={{
//         position: "relative",
//         minHeight: "100vh",
//         width: "100%",
//         overflow: "hidden",
//         backgroundColor: "#0C0C0C",
//         display: "grid",
//         gridTemplateColumns: "1fr 1fr",
//       }}
//     >
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Cormorant+Garamond:ital,wght@0,300;1,300;1,400&family=Montserrat:wght@200;300;400&display=swap');

//         @keyframes scrollPulse {
//           0%, 100% { opacity: 0.4; transform: translateY(0); }
//           50%       { opacity: 1;   transform: translateY(6px); }
//         }
//         @keyframes lineExpand {
//           from { width: 0; }
//           to   { width: 52px; }
//         }

//         .hero-line {
//           height: 1px;
//           background: linear-gradient(to right, #B8935A, transparent);
//           animation: lineExpand 1.2s ease 0.9s both;
//         }

//         .scroll-arrow {
//           animation: scrollPulse 2s ease-in-out infinite;
//         }

//         .hero-grain::after {
//           content: '';
//           position: absolute;
//           inset: 0;
//           background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
//           opacity: 0.018;
//           pointer-events: none;
//           z-index: 30;
//         }

//         @media (max-width: 768px) {
//           .hero-grid { grid-template-columns: 1fr !important; }
//           .hero-portrait {
//             position: absolute !important;
//             inset: 0 !important;
//             opacity: 0.25 !important;
//           }
//           .hero-left { z-index: 10; padding: 0 2rem !important; }
//         }
//       `}</style>

//       {/* ── LEFT PANEL — Text ── */}
//       <div
//         className="hero-grain hero-left"
//         style={{
//           position: "relative",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           padding: "0 5vw 0 7vw",
//           zIndex: 10,
//           background: "#0C0C0C",
//         }}
//       >
//         {/* Eyebrow */}
//         <p
//           style={{
//             ...show("0.15s"),
//             fontFamily: "'Montserrat', sans-serif",
//             fontSize: "9px",
//             letterSpacing: "0.52em",
//             textTransform: "uppercase",
//             color: "#7A6A52",
//             marginBottom: "2rem",
//           }}
//         >
//           Welcome to the world of
//         </p>

//         {/* Name */}
//         <div style={show("0.3s")}>
//           <h1
//             style={{
//               fontFamily: "'Playfair Display', serif",
//               fontSize: "clamp(3rem, 6.5vw, 6.2rem)",
//               fontWeight: 400,
//               lineHeight: 1.0,
//               letterSpacing: "-0.01em",
//               color: "#EDE8DE",
//               margin: 0,
//             }}
//           >
//             Arthur
//           </h1>
//           <h1
//             style={{
//               fontFamily: "'Playfair Display', serif",
//               fontSize: "clamp(3rem, 6.5vw, 6.2rem)",
//               fontWeight: 400,
//               lineHeight: 1.0,
//               letterSpacing: "-0.01em",
//               color: "#EDE8DE",
//               margin: 0,
//             }}
//           >
//             Gbenga
//           </h1>
//           {/* Last name — muted gold, slightly smaller, feels like a subtitle of the name */}
//           <h1
//             style={{
//               fontFamily: "'Playfair Display', serif",
//               fontSize: "clamp(2.2rem, 5vw, 4.8rem)",
//               fontWeight: 400,
//               lineHeight: 1.15,
//               letterSpacing: "0.025em",
//               color: "#B8935A",
//               margin: "0.08em 0 0",
//             }}
//           >
//             Otoijamun
//           </h1>
//         </div>

//         {/* Divider */}
//         <div className="hero-line" style={{ margin: "2rem 0" }} />

//         {/* Roles */}
//         <p
//           style={{
//             ...show("0.65s"),
//             fontFamily: "'Montserrat', sans-serif",
//             fontSize: "clamp(0.52rem, 0.8vw, 0.65rem)",
//             letterSpacing: "0.4em",
//             textTransform: "uppercase",
//             color: "#6A5C46",
//             marginBottom: "1.8rem",
//           }}
//         >
//           Visionary &nbsp;·&nbsp; Entrepreneur &nbsp;·&nbsp; Father
//           &nbsp;·&nbsp; Leader
//         </p>

//         {/* Bio */}
//         <p
//           style={{
//             ...show("0.82s"),
//             fontFamily: "'Cormorant Garamond', serif",
//             fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
//             fontWeight: 300,
//             fontStyle: "italic",
//             lineHeight: 1.95,
//             color: "rgba(237, 232, 222, 0.48)",
//             maxWidth: "370px",
//             marginBottom: "2.5rem",
//           }}
//         >
//           A man of purpose and passion. Behind three thriving brands, a loving
//           family, and a legacy still being written — this is the world he built.
//         </p>

//         {/* CTA */}
//         <div style={show("1s")}>
//           <a
//             href="/ventures"
//             style={{
//               fontFamily: "'Montserrat', sans-serif",
//               fontSize: "0.58rem",
//               letterSpacing: "0.4em",
//               textTransform: "uppercase",
//               color: "#C8B99A",
//               textDecoration: "none",
//               borderBottom: "1px solid #B8935A40",
//               paddingBottom: "4px",
//               transition: "color 0.3s ease, border-color 0.3s ease",
//               display: "inline-block",
//             }}
//             onMouseEnter={(e) => {
//               const el = e.currentTarget;
//               el.style.color = "#B8935A";
//               el.style.borderColor = "#B8935A";
//             }}
//             onMouseLeave={(e) => {
//               const el = e.currentTarget;
//               el.style.color = "#C8B99A";
//               el.style.borderColor = "#B8935A40";
//             }}
//           >
//             Explore his world
//           </a>
//         </div>

//         {/* Scroll indicator */}
//         <div
//           className="scroll-arrow"
//           style={{
//             position: "absolute",
//             bottom: "2.5rem",
//             left: "7vw",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             gap: "8px",
//           }}
//         >
//           <span
//             style={{
//               fontFamily: "'Montserrat', sans-serif",
//               fontSize: "7px",
//               letterSpacing: "0.45em",
//               textTransform: "uppercase",
//               color: "#3E3428",
//             }}
//           >
//             Scroll
//           </span>
//           <svg width="1" height="30" viewBox="0 0 1 30">
//             <line
//               x1="0.5"
//               y1="0"
//               x2="0.5"
//               y2="30"
//               stroke="#B8935A"
//               strokeWidth="0.8"
//               opacity="0.4"
//             />
//           </svg>
//         </div>
//       </div>

//       {/* ── RIGHT PANEL — Portrait ── */}
//       <div
//         className="hero-portrait"
//         style={{
//           position: "relative",
//           overflow: "hidden",
//           opacity: loaded ? 1 : 0,
//           transition: "opacity 1.6s ease 0.3s",
//         }}
//       >
//         <Image
//           src="/653454024_18573754195022340_6120809082290932376_n.jpeg"
//           alt="Arthur Gbenga Otoijamun"
//           fill
//           priority
//           style={{
//             objectFit: "cover",
//             objectPosition: "center top",
//             // Keep the photo colours but tone it down slightly
//             filter: "brightness(0.8) contrast(1.04) saturate(0.88)",
//           }}
//         />

//         {/* Left edge — seamless blend into black left panel */}
//         <div
//           style={{
//             position: "absolute",
//             inset: 0,
//             background:
//               "linear-gradient(to right, #0C0C0C 0%, rgba(12,12,12,0.5) 12%, rgba(12,12,12,0.15) 28%, transparent 50%)",
//           }}
//         />

//         {/* Bottom fade */}
//         <div
//           style={{
//             position: "absolute",
//             bottom: 0,
//             left: 0,
//             right: 0,
//             height: "30%",
//             background: "linear-gradient(to top, #0C0C0C 0%, transparent 100%)",
//           }}
//         />

//         {/* Top fade */}
//         <div
//           style={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             right: 0,
//             height: "12%",
//             background:
//               "linear-gradient(to bottom, #0C0C0C 0%, transparent 100%)",
//           }}
//         />

//         {/* Right edge fade */}
//         <div
//           style={{
//             position: "absolute",
//             inset: 0,
//             background: "linear-gradient(to left, #0C0C0C 0%, transparent 15%)",
//           }}
//         />

//         {/* Vertical side text */}
//         <div
//           style={{
//             position: "absolute",
//             right: "1.2rem",
//             top: "50%",
//             transform: "translateY(-50%)",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             gap: "10px",
//             opacity: loaded ? 0.28 : 0,
//             transition: "opacity 1s ease 1.8s",
//           }}
//         >
//           <span
//             style={{
//               writingMode: "vertical-rl",
//               fontFamily: "'Montserrat', sans-serif",
//               fontSize: "6px",
//               letterSpacing: "0.45em",
//               textTransform: "uppercase",
//               color: "#B8935A",
//             }}
//           >
//             CEO · Madison · Aristo · Malibu
//           </span>
//           <div
//             style={{
//               width: "1px",
//               height: "36px",
//               background: "linear-gradient(to bottom, #B8935A66, transparent)",
//             }}
//           />
//         </div>
//       </div>

//       {/* Centre seam — barely visible gold thread */}
//       <div
//         style={{
//           position: "absolute",
//           top: "18%",
//           bottom: "18%",
//           left: "50%",
//           width: "1px",
//           background:
//             "linear-gradient(to bottom, transparent, #B8935A18 35%, #B8935A18 65%, transparent)",
//           pointerEvents: "none",
//           zIndex: 5,
//         }}
//       />
//     </section>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Heropage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 120);
    return () => clearTimeout(t);
  }, []);

  const show = (delay: string) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(22px)",
    transition: `opacity 0.9s cubic-bezier(.22,.68,0,1.2) ${delay}, transform 0.9s cubic-bezier(.22,.68,0,1.2) ${delay}`,
  });

  return (
    <section
      className="hero-grain hero-section"
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
        backgroundColor: "#0C0C0C",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Cormorant+Garamond:ital,wght@0,300;1,300;1,400&family=Montserrat:wght@200;300;400&display=swap');

        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; transform: translateY(0); }
          50%       { opacity: 1;   transform: translateY(6px); }
        }
        @keyframes lineExpand {
          from { width: 0; }
          to   { width: 52px; }
        }

        .hero-line {
          height: 1px;
          background: linear-gradient(to right, #B8935A, transparent);
          animation: lineExpand 1.2s ease 0.9s both;
        }

        .scroll-arrow {
          animation: scrollPulse 2s ease-in-out infinite;
        }

        .hero-grain::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          opacity: 0.018;
          pointer-events: none;
          z-index: 30;
        }

        /* ── DESKTOP: hide the mobile-only portrait ── */
        .hero-portrait-mobile {
          display: none;
        }

        /* ── MOBILE ── */
        @media (max-width: 768px) {
          .hero-section {
            grid-template-columns: 1fr !important;
          }

          /* Hide desktop split portrait */
          .hero-portrait-desktop {
            display: none !important;
          }

          /* Show full-bleed mobile portrait */
          .hero-portrait-mobile {
            display: block !important;
            position: absolute !important;
            inset: 0 !important;
            z-index: 1;
          }

          /* Text panel: transparent, full height, text anchored to bottom */
          .hero-left {
            position: relative !important;
            z-index: 10 !important;
            min-height: 100vh !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: flex-end !important;
            padding: 0 1.8rem 3.5rem !important;
            background: transparent !important;
          }

          .scroll-indicator { display: none !important; }
          .side-text { display: none !important; }
        }
      `}</style>

      {/* ── MOBILE PORTRAIT — full bleed, sits behind everything ── */}
      <div className="hero-portrait-mobile">
        <Image
          src="/653454024_18573754195022340_6120809082290932376_n.jpeg"
          alt="Arthur Gbenga Otoijamun"
          fill
          priority
          style={{
            objectFit: "cover",
            objectPosition: "center top",
            filter: "brightness(0.72) contrast(1.04) saturate(0.85)",
          }}
        />
        {/* Top fade to black */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "22%",
            background:
              "linear-gradient(to bottom, #0C0C0C 0%, transparent 100%)",
          }}
        />
        {/* Heavy bottom gradient — keeps text legible */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "78%",
            background:
              "linear-gradient(to top, #0C0C0C 0%, #0C0C0C 30%, rgba(12,12,12,0.9) 55%, transparent 100%)",
          }}
        />
      </div>

      {/* ── LEFT PANEL — Text ── */}
      <div
        className="hero-left"
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "6rem 5vw 4rem 7vw",
          zIndex: 10,
          background: "#0C0C0C",
        }}
      >
        {/* Eyebrow */}
        <p
          style={{
            ...show("0.15s"),
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "9px",
            letterSpacing: "0.52em",
            textTransform: "uppercase",
            color: "#7A6A52",
            marginBottom: "2rem",
          }}
        >
          Welcome to the world of
        </p>

        {/* Name */}
        <div style={show("0.3s")}>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(3rem, 6.5vw, 6.2rem)",
              fontWeight: 400,
              lineHeight: 1.0,
              letterSpacing: "-0.01em",
              color: "#EDE8DE",
              margin: 0,
            }}
          >
            Arthur
          </h1>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(3rem, 6.5vw, 6.2rem)",
              fontWeight: 400,
              lineHeight: 1.0,
              letterSpacing: "-0.01em",
              color: "#EDE8DE",
              margin: 0,
            }}
          >
            Gbenga
          </h1>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.2rem, 5vw, 4.8rem)",
              fontWeight: 400,
              lineHeight: 1.15,
              letterSpacing: "0.025em",
              color: "#B8935A",
              margin: "0.08em 0 0",
            }}
          >
            Otoijamun
          </h1>
        </div>

        {/* Divider */}
        <div className="hero-line" style={{ margin: "2rem 0" }} />

        {/* Roles */}
        <p
          style={{
            ...show("0.65s"),
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "clamp(0.52rem, 0.8vw, 0.65rem)",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "#6A5C46",
            marginBottom: "1.8rem",
          }}
        >
          Visionary &nbsp;·&nbsp; Entrepreneur &nbsp;·&nbsp; Father
          &nbsp;·&nbsp; Leader
        </p>

        {/* Bio */}
        <p
          style={{
            ...show("0.82s"),
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
            fontWeight: 300,
            fontStyle: "italic",
            lineHeight: 1.95,
            color: "rgba(237, 232, 222, 0.48)",
            maxWidth: "370px",
            marginBottom: "2.5rem",
          }}
        >
          A man of purpose and passion. Behind three thriving brands, a loving
          family, and a legacy still being written — this is the world he built.
        </p>

        {/* CTA */}
        <div style={show("1s")}>
          <a
            href="/ventures"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.58rem",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "#C8B99A",
              textDecoration: "none",
              borderBottom: "1px solid #B8935A40",
              paddingBottom: "4px",
              transition: "color 0.3s ease, border-color 0.3s ease",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.color = "#B8935A";
              el.style.borderColor = "#B8935A";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.color = "#C8B99A";
              el.style.borderColor = "#B8935A40";
            }}
          >
            Explore his world
          </a>
        </div>

        {/* Scroll indicator — desktop only */}
        <div
          className="scroll-arrow scroll-indicator"
          style={{
            position: "absolute",
            bottom: "2.5rem",
            left: "7vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "7px",
              letterSpacing: "0.45em",
              textTransform: "uppercase",
              color: "#3E3428",
            }}
          >
            Scroll
          </span>
          <svg width="1" height="30" viewBox="0 0 1 30">
            <line
              x1="0.5"
              y1="0"
              x2="0.5"
              y2="30"
              stroke="#B8935A"
              strokeWidth="0.8"
              opacity="0.4"
            />
          </svg>
        </div>
      </div>

      {/* ── RIGHT PANEL — Portrait (desktop only) ── */}
      <div
        className="hero-portrait-desktop"
        style={{
          position: "relative",
          overflow: "hidden",
          opacity: loaded ? 1 : 0,
          transition: "opacity 1.6s ease 0.3s",
        }}
      >
        <Image
          src="/653454024_18573754195022340_6120809082290932376_n.jpeg"
          alt="Arthur Gbenga Otoijamun"
          fill
          priority
          style={{
            objectFit: "cover",
            objectPosition: "center top",
            filter: "brightness(0.8) contrast(1.04) saturate(0.88)",
          }}
        />
        {/* Left edge blend */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, #0C0C0C 0%, rgba(12,12,12,0.5) 12%, rgba(12,12,12,0.15) 28%, transparent 50%)",
          }}
        />
        {/* Bottom fade */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "30%",
            background: "linear-gradient(to top, #0C0C0C 0%, transparent 100%)",
          }}
        />
        {/* Top fade */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "12%",
            background:
              "linear-gradient(to bottom, #0C0C0C 0%, transparent 100%)",
          }}
        />
        {/* Right edge fade */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to left, #0C0C0C 0%, transparent 15%)",
          }}
        />

        {/* Vertical side text */}
        <div
          className="side-text"
          style={{
            position: "absolute",
            right: "1.2rem",
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            opacity: loaded ? 0.28 : 0,
            transition: "opacity 1s ease 1.8s",
          }}
        >
          <span
            style={{
              writingMode: "vertical-rl",
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "6px",
              letterSpacing: "0.45em",
              textTransform: "uppercase",
              color: "#B8935A",
            }}
          >
            CEO · Madison · Aristo · Malibu
          </span>
          <div
            style={{
              width: "1px",
              height: "36px",
              background: "linear-gradient(to bottom, #B8935A66, transparent)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
