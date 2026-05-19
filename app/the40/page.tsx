"use client";

import { useEffect, useRef, useState } from "react";

// ── Replace with real birthday celebration images ──
const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=900&q=80",
    span: "wide", // wide card
    caption: "The night began",
  },
  {
    src: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=700&q=80",
    span: "tall",
    caption: "Forty looks good",
  },
  {
    src: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=700&q=80",
    span: "normal",
    caption: "Surrounded by love",
  },
  {
    src: "https://images.unsplash.com/photo-1567696153798-9111f9cd3d0d?w=700&q=80",
    span: "normal",
    caption: "The cake moment",
  },
  {
    src: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=900&q=80",
    span: "wide",
    caption: "The whole squad",
  },
  {
    src: "https://images.unsplash.com/photo-1496337589254-7e19d01cec44?w=700&q=80",
    span: "normal",
    caption: "Pure joy",
  },
  {
    src: "https://images.unsplash.com/photo-1543269664-56d93c1b41a6?w=700&q=80",
    span: "normal",
    caption: "Family first",
  },
  {
    src: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=700&q=80",
    span: "tall",
    caption: "The man of the hour",
  },
  {
    src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=900&q=80",
    span: "wide",
    caption: "The celebration",
  },
  {
    src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=700&q=80",
    span: "normal",
    caption: "Dancing into 40",
  },
  {
    src: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=700&q=80",
    span: "normal",
    caption: "Good vibes only",
  },
  {
    src: "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?w=700&q=80",
    span: "normal",
    caption: "Toast to 40",
  },
];

function useInView(threshold = 0.15) {
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

function GalleryCard({
  image,
  index,
}: {
  image: (typeof galleryImages)[0];
  index: number;
}) {
  const { ref, visible } = useInView(0.1);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        overflow: "hidden",
        gridColumn: image.span === "wide" ? "span 2" : "span 1",
        gridRow: image.span === "tall" ? "span 2" : "span 1",
        aspectRatio:
          image.span === "wide"
            ? "16/7"
            : image.span === "tall"
              ? "3/4"
              : "1/1",
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0) scale(1)"
          : "translateY(20px) scale(0.98)",
        transition: `opacity 0.9s cubic-bezier(.22,.68,0,1.2) ${index * 0.06}s, transform 0.9s cubic-bezier(.22,.68,0,1.2) ${index * 0.06}s`,
        cursor: "pointer",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={image.src}
        alt={image.caption}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: hovered ? "scale(1.06)" : "scale(1)",
          filter: hovered
            ? "brightness(0.7) saturate(1.1)"
            : "brightness(0.75) saturate(0.95)",
          transition:
            "transform 0.7s cubic-bezier(.22,.68,0,1.2), filter 0.5s ease",
          display: "block",
        }}
      />

      {/* Gold shimmer overlay on hover */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: hovered
            ? "linear-gradient(135deg, rgba(201,169,110,0.12) 0%, transparent 60%)"
            : "transparent",
          transition: "background 0.5s ease",
        }}
      />

      {/* Caption on hover */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "1.5rem",
          background:
            "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
        }}
      >
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "0.9rem",
            fontStyle: "italic",
            fontWeight: 300,
            color: "#E8C98A",
            margin: 0,
          }}
        >
          {image.caption}
        </p>
      </div>

      {/* Gold border bottom — always visible */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: `linear-gradient(to right, transparent, #C9A96E44, transparent)`,
        }}
      />
    </div>
  );
}

export default function The40Page() {
  const [heroVisible, setHeroVisible] = useState(false);
  const { ref: closingRef, visible: closingVisible } = useInView(0.3);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <main
      style={{
        background: "#080808",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Montserrat:wght@200;300;400&display=swap');

        @keyframes goldPulse {
          0%, 100% { opacity: 0.6; }
          50%       { opacity: 1; }
        }
        @keyframes floatUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmerSweep {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes confettiFall {
          0%   { transform: translateY(-10px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100px) rotate(360deg); opacity: 0; }
        }

        .gold-text {
          background: linear-gradient(90deg, #C9A96E 0%, #E8C98A 35%, #C9A96E 55%, #F0D99A 75%, #C9A96E 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmerSweep 5s linear infinite;
        }

        .confetti-dot {
          position: absolute;
          border-radius: 50%;
          animation: confettiFall linear infinite;
          pointer-events: none;
        }
      `}</style>

      {/* ── HERO ── */}
      <div
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "8rem 2rem 6rem",
          overflow: "hidden",
        }}
      >
        {/* Animated confetti dots */}
        {[
          { size: 4, left: "12%", delay: "0s", dur: "6s", color: "#C9A96E" },
          { size: 3, left: "28%", delay: "1.2s", dur: "7s", color: "#E8C98A" },
          {
            size: 5,
            left: "45%",
            delay: "0.5s",
            dur: "5.5s",
            color: "#B8935A",
          },
          { size: 3, left: "62%", delay: "2s", dur: "8s", color: "#C9A96E" },
          {
            size: 4,
            left: "78%",
            delay: "0.8s",
            dur: "6.5s",
            color: "#F0D99A",
          },
          {
            size: 3,
            left: "88%",
            delay: "1.5s",
            dur: "7.5s",
            color: "#C9A96E",
          },
          { size: 5, left: "5%", delay: "3s", dur: "6s", color: "#E8C98A" },
          { size: 3, left: "93%", delay: "2.5s", dur: "5s", color: "#B8935A" },
        ].map((dot, i) => (
          <div
            key={i}
            className="confetti-dot"
            style={{
              width: dot.size,
              height: dot.size,
              left: dot.left,
              top: "-10px",
              background: dot.color,
              animationDelay: dot.delay,
              animationDuration: dot.dur,
              opacity: 0.6,
            }}
          />
        ))}

        {/* Background radial glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "70vw",
            height: "70vw",
            maxWidth: "700px",
            maxHeight: "700px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(201,169,110,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Ghost 40 */}
        <div
          style={{
            position: "absolute",
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(12rem, 35vw, 32rem)",
            fontWeight: 700,
            color: "transparent",
            WebkitTextStroke: "1px #C9A96E0C",
            pointerEvents: "none",
            userSelect: "none",
            lineHeight: 1,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            animation: "goldPulse 4s ease-in-out infinite",
          }}
        >
          40
        </div>

        {/* Content */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "8px",
              letterSpacing: "0.6em",
              textTransform: "uppercase",
              color: "#8A7355",
              marginBottom: "1.5rem",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(16px)",
              transition: "all 0.8s ease 0.2s",
            }}
          >
            A Celebration of Life
          </p>

          {/* Big 40 */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(30px)",
              transition: "all 1s cubic-bezier(.22,.68,0,1.2) 0.3s",
            }}
          >
            <span
              className="gold-text"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(6rem, 20vw, 18rem)",
                fontWeight: 700,
                lineHeight: 0.9,
                display: "block",
              }}
            >
              40
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
              fontWeight: 400,
              color: "#EDE8DE",
              letterSpacing: "0.08em",
              margin: "0.5rem 0 1.5rem",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.9s cubic-bezier(.22,.68,0,1.2) 0.5s",
            }}
          >
            The Story So Far
          </h1>

          {/* Gold divider */}
          <div
            style={{
              width: heroVisible ? "60px" : "0px",
              height: "1px",
              background:
                "linear-gradient(to right, transparent, #C9A96E, transparent)",
              margin: "0 auto 1.5rem",
              transition: "width 1s ease 0.7s",
            }}
          />

          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1rem, 1.8vw, 1.3rem)",
              fontStyle: "italic",
              fontWeight: 300,
              color: "rgba(237,232,222,0.5)",
              maxWidth: "500px",
              margin: "0 auto",
              lineHeight: 1.8,
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.9s ease 0.85s",
            }}
          >
            Forty years of purpose, passion, and perseverance. This is how it
            was celebrated.
          </p>

          {/* Scroll cue */}
          <div
            style={{
              marginTop: "3rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              opacity: heroVisible ? 0.5 : 0,
              transition: "opacity 1s ease 1.2s",
            }}
          >
            <span
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "7px",
                letterSpacing: "0.45em",
                textTransform: "uppercase",
                color: "#8A7355",
              }}
            >
              See the celebration
            </span>
            <div
              style={{
                width: "1px",
                height: "32px",
                background: "linear-gradient(to bottom, #C9A96E, transparent)",
              }}
            />
          </div>
        </div>
      </div>

      {/* ── GALLERY SECTION ── */}
      <div
        style={{
          padding: "2rem clamp(1rem, 4vw, 3rem) 5rem",
          borderTop: "1px solid #1C1810",
        }}
      >
        {/* Gallery label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.5rem",
            padding: "3rem 0 3rem",
          }}
        >
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "linear-gradient(to right, transparent, #C9A96E33)",
            }}
          />
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "8px",
              letterSpacing: "0.5em",
              textTransform: "uppercase",
              color: "#7A6A52",
              whiteSpace: "nowrap",
            }}
          >
            The Celebration Gallery
          </p>
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "linear-gradient(to left, transparent, #C9A96E33)",
            }}
          />
        </div>

        {/* Masonry-style grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "8px",
            maxWidth: "1400px",
            margin: "0 auto",
          }}
          className="gallery-grid"
        >
          {galleryImages.map((image, i) => (
            <GalleryCard key={i} image={image} index={i} />
          ))}
        </div>

        <style>{`
          @media (max-width: 1024px) {
            .gallery-grid { grid-template-columns: repeat(3, 1fr) !important; }
          }
          @media (max-width: 640px) {
            .gallery-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
        `}</style>
      </div>

      {/* ── CLOSING MESSAGE ── */}
      <div
        ref={closingRef}
        style={{
          position: "relative",
          padding: "7rem 2rem",
          textAlign: "center",
          borderTop: "1px solid #1C1810",
          overflow: "hidden",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "60vw",
            height: "60vw",
            maxWidth: "600px",
            maxHeight: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(201,169,110,0.05) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Ghost 40 */}
        <div
          style={{
            position: "absolute",
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(8rem, 22vw, 20rem)",
            fontWeight: 700,
            color: "transparent",
            WebkitTextStroke: "1px #C9A96E08",
            pointerEvents: "none",
            userSelect: "none",
            lineHeight: 1,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          40
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "8px",
              letterSpacing: "0.55em",
              textTransform: "uppercase",
              color: "#8A7355",
              marginBottom: "2rem",
              opacity: closingVisible ? 1 : 0,
              transition: "opacity 0.8s ease 0.1s",
            }}
          >
            From all of us
          </p>

          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 5vw, 4.5rem)",
              fontWeight: 400,
              lineHeight: 1.2,
              marginBottom: "2rem",
              opacity: closingVisible ? 1 : 0,
              transform: closingVisible ? "translateY(0)" : "translateY(24px)",
              transition: "all 0.9s cubic-bezier(.22,.68,0,1.2) 0.2s",
            }}
          >
            <span className="gold-text">Here's to the next 40.</span>
          </h2>

          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
              fontStyle: "italic",
              fontWeight: 300,
              color: "rgba(237,232,222,0.55)",
              maxWidth: "580px",
              margin: "0 auto 2.5rem",
              lineHeight: 1.85,
              opacity: closingVisible ? 1 : 0,
              transform: closingVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.9s cubic-bezier(.22,.68,0,1.2) 0.38s",
            }}
          >
            You have built restaurants, built brands, built a family, and built
            a legacy — all before 40. The world cannot wait to see what comes
            next, Arthur. Happy birthday.
          </p>

          {/* Gold divider */}
          <div
            style={{
              width: closingVisible ? "80px" : "0px",
              height: "1px",
              background:
                "linear-gradient(to right, transparent, #C9A96E, transparent)",
              margin: "0 auto 1.5rem",
              transition: "width 1.2s ease 0.5s",
            }}
          />

          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "8px",
              letterSpacing: "0.5em",
              textTransform: "uppercase",
              color: "#5A4A32",
              opacity: closingVisible ? 1 : 0,
              transition: "opacity 0.8s ease 0.7s",
            }}
          >
            Arthur Gbenga Otoijamun &nbsp;·&nbsp; 2025
          </p>
        </div>
      </div>
    </main>
  );
}
