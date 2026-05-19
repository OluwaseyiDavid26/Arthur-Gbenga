"use client";

import { useEffect, useRef, useState } from "react";

// ── Replace with real birthday celebration images ──
const galleryImages = [
  {
    src: "https://res.cloudinary.com/du9kb43d6/image/upload/v1779191984/SnapInsta.to_653454024_18573754195022340_6120809082290932376_n_yxzr1v.jpg",
    span: "wide", // wide card
    caption: "The night began",
  },
  // {
  //   src: "https://res.cloudinary.com/du9kb43d6/image/upload/v1779191983/SnapInsta.to_662273449_18431833966184605_8490369440126939593_n_snwcoa.jpg",
  //   span: "tall",
  //   caption: "Forty looks good",
  // },
  // {
  //   src: "https://res.cloudinary.com/du9kb43d6/image/upload/v1779191983/SnapInsta.to_661312451_18320583874255063_387309862780609744_n_tijdjz.jpg",
  //   span: "normal",
  //   caption: "Surrounded by love",
  // },
  {
    src: "https://res.cloudinary.com/du9kb43d6/image/upload/v1779191985/SnapInsta.to_502455212_18508096000022340_2715075682461337838_n_prelye.jpg",
    span: "normal",
    caption: "The cake moment",
  },
  // {
  //   src: "https://res.cloudinary.com/du9kb43d6/image/upload/v1779191985/SnapInsta.to_622420590_17956955079058610_6752413390193351686_n_ysvdkw.jpg",
  //   span: "wide",
  //   caption: "The whole squad",
  // },
  {
    src: "https://res.cloudinary.com/du9kb43d6/video/upload/v1779192019/SnapInsta.to_AQN6eeMKF4g4gmnHHAy2ZOOAiHptSn3a2Cc1RlS_1tFLpV-dZ8zP_fXldc4NLDLJdxfH0bYUjEYvZhZuDcrOw7uMXW6N8HPMKJ17CrI_tym5lp.mp4",
    span: "normal",
    caption: "Pure joy",
  },
  {
    src: "https://res.cloudinary.com/du9kb43d6/video/upload/v1779192052/SnapInsta.to_AQNRjwBqVnZcNsCBqX4DssLtQfeOR7pxZXtowMALCeBCKqeaYBPVvU9bYoWjcfgFbeGuVF8JBqqon8_tgg4pvMpKTR2IpVbCONvyIFk_kjrmfk.mp4",
    span: "normal",
    caption: "Family first",
  },
  // {
  //   src: "https://res.cloudinary.com/du9kb43d6/image/upload/v1779191984/SnapInsta.to_652752129_18090179825166669_6198461109628450833_n_fwtomn.jpg",
  //   span: "tall",
  //   caption: "The man of the hour",
  // },
  // {
  //   src: "https://res.cloudinary.com/du9kb43d6/image/upload/v1779191984/SnapInsta.to_623799235_18073959971105230_5699193985291803192_n_fin4ft.jpg",
  //   span: "wide",
  //   caption: "The celebration",
  // },
  // {
  //   src: "https://res.cloudinary.com/du9kb43d6/image/upload/v1779192392/SnapInsta.to_648313531_18096261553812544_7088950938231052573_n_usk1mj.jpg",
  //   span: "normal",
  //   caption: "Dancing into 40",
  // },
  // {
  //   src: "https://res.cloudinary.com/du9kb43d6/image/upload/v1779192392/SnapInsta.to_641779072_18107680225814062_6752189994119706617_n_cvxsxz.jpg",
  //   span: "normal",
  //   caption: "Good vibes only",
  // },
  // {
  //   src: "https://res.cloudinary.com/du9kb43d6/image/upload/v1779192392/SnapInsta.to_619235932_18119501500603445_2069364028074035926_n_vd0rlo.jpg",
  //   span: "normal",
  //   caption: "Toast to 40",
  // },
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

  function GalleryCard({
    image,
    index,
  }: {
    image: (typeof galleryImages)[0];
    index: number;
  }) {
    const { ref, visible } = useInView(0.1);
    const [hovered, setHovered] = useState(false);

    const isVideo = image.src.endsWith(".mp4");

    const mediaStyle: React.CSSProperties = {
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
    };

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
              ? "16/5" // ← increased height (was 16/7)
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
        {isVideo ? (
          <video
            src={image.src}
            autoPlay
            muted
            loop
            playsInline
            style={mediaStyle}
          />
        ) : (
          <img src={image.src} style={mediaStyle} />
        )}

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

        {/* Gold border bottom */}
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
