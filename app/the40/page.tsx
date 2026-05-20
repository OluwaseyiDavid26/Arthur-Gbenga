// "use client";

// import { useEffect, useRef, useState } from "react";

// const galleryImages = [
//   {
//     src: "https://res.cloudinary.com/du9kb43d6/image/upload/v1779191984/SnapInsta.to_653454024_18573754195022340_6120809082290932376_n_yxzr1v.jpg",
//     span: "wide",
//     caption: "The night began",
//   },
//   {
//     src: "https://res.cloudinary.com/du9kb43d6/image/upload/v1779191985/SnapInsta.to_502455212_18508096000022340_2715075682461337838_n_prelye.jpg",
//     span: "normal",
//     caption: "The cake moment",
//   },
//   {
//     src: "https://res.cloudinary.com/du9kb43d6/video/upload/v1779192019/SnapInsta.to_AQN6eeMKF4g4gmnHHAy2ZOOAiHptSn3a2Cc1RlS_1tFLpV-dZ8zP_fXldc4NLDLJdxfH0bYUjEYvZhZuDcrOw7uMXW6N8HPMKJ17CrI_tym5lp.mp4",
//     span: "normal",
//     caption: "Pure joy",
//   },
//   {
//     src: "https://res.cloudinary.com/du9kb43d6/video/upload/v1779192052/SnapInsta.to_AQNRjwBqVnZcNsCBqX4DssLtQfeOR7pxZXtowMALCeBCKqeaYBPVvU9bYoWjcfgFbeGuVF8JBqqon8_tgg4pvMpKTR2IpVbCONvyIFk_kjrmfk.mp4",
//     span: "normal",
//     caption: "Family first",
//   },
// ];

// // ── useInView hook (standalone, no nested components) ──

// function useInView(threshold = 0.15) {
//   const ref = useRef<HTMLDivElement>(null);
//   const [visible, setVisible] = useState(false);
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) setVisible(true);
//       },
//       { threshold },
//     );
//     if (ref.current) observer.observe(ref.current);
//     return () => observer.disconnect();
//   }, [threshold]);
//   return { ref, visible };
// }

// // ── GalleryCard defined at module level (NOT inside hook) ──
// function GalleryCard({
//   image,
//   index,
// }: {
//   image: (typeof galleryImages)[0];
//   index: number;
// }) {
//   const { ref, visible } = useInView(0.1);
//   const [hovered, setHovered] = useState(false);
//   const [paused, setPaused] = useState(false);
//   const [muted, setMuted] = useState(true);
//   const videoRef = useRef<HTMLVideoElement>(null);

//   const isVideo = image.src.endsWith(".mp4");

//   const togglePlay = () => {
//     if (!videoRef.current) return;
//     if (videoRef.current.paused) {
//       videoRef.current.play();
//       setPaused(false);
//     } else {
//       videoRef.current.pause();
//       setPaused(true);
//     }
//   };

//   const toggleMute = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     if (!videoRef.current) return;
//     videoRef.current.muted = !videoRef.current.muted;
//     setMuted(videoRef.current.muted);
//   };

//   const mediaStyle: React.CSSProperties = {
//     width: "100%",
//     height: "100%",
//     objectFit: "cover",
//     transform: hovered ? "scale(1.06)" : "scale(1)",
//     filter: hovered
//       ? "brightness(0.7) saturate(1.1)"
//       : "brightness(0.75) saturate(0.95)",
//     transition: "transform 0.7s cubic-bezier(.22,.68,0,1.2), filter 0.5s ease",
//     display: "block",
//   };

//   return (
//     <div
//       ref={ref}
//       style={{
//         position: "relative",
//         overflow: "hidden",
//         gridColumn: image.span === "wide" ? "span 2" : "span 1",
//         gridRow: image.span === "tall" ? "span 2" : "span 1",
//         aspectRatio:
//           image.span === "wide"
//             ? "16/9"
//             : image.span === "tall"
//               ? "3/4"
//               : "1/1",
//         minHeight: "200px", // ← fixes mobile collapse
//         opacity: visible ? 1 : 0,
//         transform: visible
//           ? "translateY(0) scale(1)"
//           : "translateY(20px) scale(0.98)",
//         transition: `opacity 0.9s cubic-bezier(.22,.68,0,1.2) ${index * 0.06}s, transform 0.9s cubic-bezier(.22,.68,0,1.2) ${index * 0.06}s`,
//         cursor: "pointer",
//       }}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       onClick={isVideo ? togglePlay : undefined}
//     >
//       {isVideo ? (
//         <video
//           ref={videoRef}
//           src={image.src}
//           autoPlay
//           muted
//           loop
//           playsInline
//           style={mediaStyle}
//         />
//       ) : (
//         <img src={image.src} alt={image.caption} style={mediaStyle} />
//       )}

//       {/* Gold shimmer overlay on hover */}
//       <div
//         style={{
//           position: "absolute",
//           inset: 0,
//           background: hovered
//             ? "linear-gradient(135deg, rgba(201,169,110,0.12) 0%, transparent 60%)"
//             : "transparent",
//           transition: "background 0.5s ease",
//         }}
//       />

//       {/* Gold border bottom */}
//       <div
//         style={{
//           position: "absolute",
//           bottom: 0,
//           left: 0,
//           right: 0,
//           height: "1px",
//           background: `linear-gradient(to right, transparent, #C9A96E44, transparent)`,
//         }}
//       />

//       {/* Video controls — only shown on video cards */}
//       {isVideo && (
//         <div
//           style={{
//             position: "absolute",
//             bottom: "10px",
//             right: "10px",
//             display: "flex",
//             gap: "8px",
//             zIndex: 10,
//           }}
//         >
//           {/* Play/Pause button */}
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               togglePlay();
//             }}
//             style={{
//               background: "rgba(0,0,0,0.55)",
//               border: "1px solid #C9A96E55",
//               borderRadius: "50%",
//               width: "32px",
//               height: "32px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               cursor: "pointer",
//               color: "#C9A96E",
//               fontSize: "13px",
//               backdropFilter: "blur(4px)",
//             }}
//           >
//             {paused ? "▶" : "⏸"}
//           </button>

//           {/* Mute/Unmute button */}
//           <button
//             onClick={toggleMute}
//             style={{
//               background: "rgba(0,0,0,0.55)",
//               border: "1px solid #C9A96E55",
//               borderRadius: "50%",
//               width: "32px",
//               height: "32px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               cursor: "pointer",
//               color: "#C9A96E",
//               fontSize: "13px",
//               backdropFilter: "blur(4px)",
//             }}
//           >
//             {muted ? "🔇" : "🔊"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default function The40Page() {
//   const [heroVisible, setHeroVisible] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const { ref: closingRef, visible: closingVisible } = useInView(0.3);

//   useEffect(() => {
//     const check = () => setIsMobile(window.innerWidth < 640);
//     check();
//     window.addEventListener("resize", check);
//     return () => window.removeEventListener("resize", check);
//   }, []);

//   useEffect(() => {
//     const t = setTimeout(() => setHeroVisible(true), 100);
//     return () => clearTimeout(t);
//   }, []);

//   return (
//     <main
//       style={{
//         background: "#080808",
//         minHeight: "100vh",
//         overflow: "hidden",
//       }}
//     >
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Montserrat:wght@200;300;400&display=swap');

//         @keyframes goldPulse {
//           0%, 100% { opacity: 0.6; }
//           50%       { opacity: 1; }
//         }
//         @keyframes shimmerSweep {
//           0%   { background-position: -200% center; }
//           100% { background-position:  200% center; }
//         }
//         @keyframes confettiFall {
//           0%   { transform: translateY(-10px) rotate(0deg); opacity: 1; }
//           100% { transform: translateY(100px) rotate(360deg); opacity: 0; }
//         }

//         .gold-text {
//           background: linear-gradient(90deg, #C9A96E 0%, #E8C98A 35%, #C9A96E 55%, #F0D99A 75%, #C9A96E 100%);
//           background-size: 200% auto;
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//           animation: shimmerSweep 5s linear infinite;
//         }

//         .confetti-dot {
//           position: absolute;
//           border-radius: 50%;
//           animation: confettiFall linear infinite;
//           pointer-events: none;
//         }
//       `}</style>

//       {/* ── HERO ── */}
//       <div
//         style={{
//           position: "relative",
//           minHeight: "100vh",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           textAlign: "center",
//           padding: "8rem 2rem 6rem",
//           overflow: "hidden",
//         }}
//       >
//         {[
//           { size: 4, left: "12%", delay: "0s", dur: "6s", color: "#C9A96E" },
//           { size: 3, left: "28%", delay: "1.2s", dur: "7s", color: "#E8C98A" },
//           {
//             size: 5,
//             left: "45%",
//             delay: "0.5s",
//             dur: "5.5s",
//             color: "#B8935A",
//           },
//           { size: 3, left: "62%", delay: "2s", dur: "8s", color: "#C9A96E" },
//           {
//             size: 4,
//             left: "78%",
//             delay: "0.8s",
//             dur: "6.5s",
//             color: "#F0D99A",
//           },
//           {
//             size: 3,
//             left: "88%",
//             delay: "1.5s",
//             dur: "7.5s",
//             color: "#C9A96E",
//           },
//           { size: 5, left: "5%", delay: "3s", dur: "6s", color: "#E8C98A" },
//           { size: 3, left: "93%", delay: "2.5s", dur: "5s", color: "#B8935A" },
//         ].map((dot, i) => (
//           <div
//             key={i}
//             className="confetti-dot"
//             style={{
//               width: dot.size,
//               height: dot.size,
//               left: dot.left,
//               top: "-10px",
//               background: dot.color,
//               animationDelay: dot.delay,
//               animationDuration: dot.dur,
//               opacity: 0.6,
//             }}
//           />
//         ))}

//         <div
//           style={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: "70vw",
//             height: "70vw",
//             maxWidth: "700px",
//             maxHeight: "700px",
//             borderRadius: "50%",
//             background:
//               "radial-gradient(circle, rgba(201,169,110,0.06) 0%, transparent 70%)",
//             pointerEvents: "none",
//           }}
//         />

//         <div
//           style={{
//             position: "absolute",
//             fontFamily: "'Playfair Display', serif",
//             fontSize: "clamp(12rem, 35vw, 32rem)",
//             fontWeight: 700,
//             color: "transparent",
//             WebkitTextStroke: "1px #C9A96E0C",
//             pointerEvents: "none",
//             userSelect: "none",
//             lineHeight: 1,
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             animation: "goldPulse 4s ease-in-out infinite",
//           }}
//         >
//           40
//         </div>

//         <div style={{ position: "relative", zIndex: 1 }}>
//           <p
//             style={{
//               fontFamily: "'Montserrat', sans-serif",
//               fontSize: "8px",
//               letterSpacing: "0.6em",
//               textTransform: "uppercase",
//               color: "#8A7355",
//               marginBottom: "1.5rem",
//               opacity: heroVisible ? 1 : 0,
//               transform: heroVisible ? "translateY(0)" : "translateY(16px)",
//               transition: "all 0.8s ease 0.2s",
//             }}
//           >
//             A Celebration of Life
//           </p>

//           <div
//             style={{
//               opacity: heroVisible ? 1 : 0,
//               transform: heroVisible ? "translateY(0)" : "translateY(30px)",
//               transition: "all 1s cubic-bezier(.22,.68,0,1.2) 0.3s",
//             }}
//           >
//             <span
//               className="gold-text"
//               style={{
//                 fontFamily: "'Playfair Display', serif",
//                 fontSize: "clamp(6rem, 20vw, 18rem)",
//                 fontWeight: 700,
//                 lineHeight: 0.9,
//                 display: "block",
//               }}
//             >
//               40
//             </span>
//           </div>

//           <h1
//             style={{
//               fontFamily: "'Playfair Display', serif",
//               fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
//               fontWeight: 400,
//               color: "#EDE8DE",
//               letterSpacing: "0.08em",
//               margin: "0.5rem 0 1.5rem",
//               opacity: heroVisible ? 1 : 0,
//               transform: heroVisible ? "translateY(0)" : "translateY(20px)",
//               transition: "all 0.9s cubic-bezier(.22,.68,0,1.2) 0.5s",
//             }}
//           >
//             The Story So Far
//           </h1>

//           <div
//             style={{
//               width: heroVisible ? "60px" : "0px",
//               height: "1px",
//               background:
//                 "linear-gradient(to right, transparent, #C9A96E, transparent)",
//               margin: "0 auto 1.5rem",
//               transition: "width 1s ease 0.7s",
//             }}
//           />

//           <p
//             style={{
//               fontFamily: "'Cormorant Garamond', serif",
//               fontSize: "clamp(1rem, 1.8vw, 1.3rem)",
//               fontStyle: "italic",
//               fontWeight: 300,
//               color: "rgba(237,232,222,0.5)",
//               maxWidth: "500px",
//               margin: "0 auto",
//               lineHeight: 1.8,
//               opacity: heroVisible ? 1 : 0,
//               transition: "opacity 0.9s ease 0.85s",
//             }}
//           >
//             Forty years of purpose, passion, and perseverance. This is how it
//             was celebrated.
//           </p>

//           <div
//             style={{
//               marginTop: "3rem",
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               gap: "8px",
//               opacity: heroVisible ? 0.5 : 0,
//               transition: "opacity 1s ease 1.2s",
//             }}
//           >
//             <span
//               style={{
//                 fontFamily: "'Montserrat', sans-serif",
//                 fontSize: "7px",
//                 letterSpacing: "0.45em",
//                 textTransform: "uppercase",
//                 color: "#8A7355",
//               }}
//             >
//               See the celebration
//             </span>
//             <div
//               style={{
//                 width: "1px",
//                 height: "32px",
//                 background: "linear-gradient(to bottom, #C9A96E, transparent)",
//               }}
//             />
//           </div>
//         </div>
//       </div>

//       {/* ── GALLERY SECTION ── */}
//       <div
//         style={{
//           padding: "2rem clamp(1rem, 4vw, 3rem) 5rem",
//           borderTop: "1px solid #1C1810",
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             gap: "1.5rem",
//             padding: "3rem 0 3rem",
//           }}
//         >
//           <div
//             style={{
//               flex: 1,
//               height: "1px",
//               background: "linear-gradient(to right, transparent, #C9A96E33)",
//             }}
//           />
//           <p
//             style={{
//               fontFamily: "'Montserrat', sans-serif",
//               fontSize: "8px",
//               letterSpacing: "0.5em",
//               textTransform: "uppercase",
//               color: "#7A6A52",
//               whiteSpace: "nowrap",
//             }}
//           >
//             The Celebration Gallery
//           </p>
//           <div
//             style={{
//               flex: 1,
//               height: "1px",
//               background: "linear-gradient(to left, transparent, #C9A96E33)",
//             }}
//           />
//         </div>

//         {/* Grid: wide image spans full width on top, 3 cells below */}
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(2, 1fr)",
//             gap: "8px",
//             maxWidth: "1400px",
//             margin: "0 auto",
//           }}
//           className="gallery-grid"
//         >
//           {galleryImages.map((image, i) => (
//             <GalleryCard key={i} image={image} index={i} />
//           ))}
//         </div>

//         <style>{`
//           @media (max-width: 640px) {
//             .gallery-grid { grid-template-columns: 1fr !important; }
//           }
//         `}</style>
//       </div>

//       {/* ── CLOSING MESSAGE ── */}
//       <div
//         ref={closingRef}
//         style={{
//           position: "relative",
//           padding: "7rem 2rem",
//           textAlign: "center",
//           borderTop: "1px solid #1C1810",
//           overflow: "hidden",
//         }}
//       >
//         <div
//           style={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: "60vw",
//             height: "60vw",
//             maxWidth: "600px",
//             maxHeight: "600px",
//             borderRadius: "50%",
//             background:
//               "radial-gradient(circle, rgba(201,169,110,0.05) 0%, transparent 70%)",
//             pointerEvents: "none",
//           }}
//         />

//         <div
//           style={{
//             position: "absolute",
//             fontFamily: "'Playfair Display', serif",
//             fontSize: "clamp(8rem, 22vw, 20rem)",
//             fontWeight: 700,
//             color: "transparent",
//             WebkitTextStroke: "1px #C9A96E08",
//             pointerEvents: "none",
//             userSelect: "none",
//             lineHeight: 1,
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//           }}
//         >
//           40
//         </div>

//         <div style={{ position: "relative", zIndex: 1 }}>
//           <p
//             style={{
//               fontFamily: "'Montserrat', sans-serif",
//               fontSize: "8px",
//               letterSpacing: "0.55em",
//               textTransform: "uppercase",
//               color: "#8A7355",
//               marginBottom: "2rem",
//               opacity: closingVisible ? 1 : 0,
//               transition: "opacity 0.8s ease 0.1s",
//             }}
//           >
//             From all of us
//           </p>

//           <h2
//             style={{
//               fontFamily: "'Playfair Display', serif",
//               fontSize: "clamp(2rem, 5vw, 4.5rem)",
//               fontWeight: 400,
//               lineHeight: 1.2,
//               marginBottom: "2rem",
//               opacity: closingVisible ? 1 : 0,
//               transform: closingVisible ? "translateY(0)" : "translateY(24px)",
//               transition: "all 0.9s cubic-bezier(.22,.68,0,1.2) 0.2s",
//             }}
//           >
//             <span className="gold-text">Here's to the next 40.</span>
//           </h2>

//           <p
//             style={{
//               fontFamily: "'Cormorant Garamond', serif",
//               fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
//               fontStyle: "italic",
//               fontWeight: 300,
//               color: "rgba(237,232,222,0.55)",
//               maxWidth: "580px",
//               margin: "0 auto 2.5rem",
//               lineHeight: 1.85,
//               opacity: closingVisible ? 1 : 0,
//               transform: closingVisible ? "translateY(0)" : "translateY(20px)",
//               transition: "all 0.9s cubic-bezier(.22,.68,0,1.2) 0.38s",
//             }}
//           >
//             You have built restaurants, built brands, built a family, and built
//             a legacy — all before 40. The world cannot wait to see what comes
//             next, Arthur. Happy birthday.
//           </p>

//           <div
//             style={{
//               width: closingVisible ? "80px" : "0px",
//               height: "1px",
//               background:
//                 "linear-gradient(to right, transparent, #C9A96E, transparent)",
//               margin: "0 auto 1.5rem",
//               transition: "width 1.2s ease 0.5s",
//             }}
//           />

//           <p
//             style={{
//               fontFamily: "'Montserrat', sans-serif",
//               fontSize: "8px",
//               letterSpacing: "0.5em",
//               textTransform: "uppercase",
//               color: "#5A4A32",
//               opacity: closingVisible ? 1 : 0,
//               transition: "opacity 0.8s ease 0.7s",
//             }}
//           >
//             Arthur Gbenga Otoijamun &nbsp;·&nbsp; 2025
//           </p>
//         </div>
//       </div>
//     </main>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";

const galleryImages = [
  {
    src: "https://res.cloudinary.com/du9kb43d6/image/upload/v1779191984/SnapInsta.to_653454024_18573754195022340_6120809082290932376_n_yxzr1v.jpg",
    span: "wide",
    caption: "The night began",
  },
  {
    src: "https://res.cloudinary.com/du9kb43d6/image/upload/v1779191985/SnapInsta.to_502455212_18508096000022340_2715075682461337838_n_prelye.jpg",
    span: "normal",
    caption: "The cake moment",
  },
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
];

// ── Module-level registry so all GalleryCards share one Map ──
const videoRegistry = new Map<number, HTMLVideoElement>();

// ── useInView hook ──
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

// ── GalleryCard ──
function GalleryCard({
  image,
  index,
}: {
  image: (typeof galleryImages)[0];
  index: number;
}) {
  const { ref, visible } = useInView(0.1);
  const [hovered, setHovered] = useState(false);
  // Videos start paused — user must tap to play
  const [paused, setPaused] = useState(true);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isVideo = image.src.endsWith(".mp4");

  // Register / unregister this video in the shared map
  useEffect(() => {
    if (!isVideo || !videoRef.current) return;
    videoRegistry.set(index, videoRef.current);
    return () => {
      videoRegistry.delete(index);
    };
  }, [index, isVideo]);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      // Pause every other video first
      videoRegistry.forEach((vid, key) => {
        if (key !== index) {
          vid.pause();
        }
      });
      videoRef.current.play();
      setPaused(false);
    } else {
      videoRef.current.pause();
      setPaused(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  };

  const mediaStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transform: hovered ? "scale(1.06)" : "scale(1)",
    filter: hovered
      ? "brightness(0.7) saturate(1.1)"
      : "brightness(0.75) saturate(0.95)",
    transition: "transform 0.7s cubic-bezier(.22,.68,0,1.2), filter 0.5s ease",
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
            ? "16/9"
            : image.span === "tall"
              ? "3/4"
              : "1/1",
        minHeight: "200px",
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0) scale(1)"
          : "translateY(20px) scale(0.98)",
        transition: `opacity 0.9s cubic-bezier(.22,.68,0,1.2) ${index * 0.06}s, transform 0.9s cubic-bezier(.22,.68,0,1.2) ${index * 0.06}s`,
        cursor: "pointer",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={isVideo ? togglePlay : undefined}
    >
      {isVideo ? (
        <video
          ref={videoRef}
          src={image.src}
          autoPlay={false} // ← no autoplay, user taps to start
          muted
          loop
          playsInline
          style={mediaStyle}
        />
      ) : (
        <img src={image.src} alt={image.caption} style={mediaStyle} />
      )}

      {/* Tap-to-play overlay when paused */}
      {isVideo && paused && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.25)",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "50%",
              background: "rgba(0,0,0,0.55)",
              border: "1px solid #C9A96E88",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#C9A96E",
              fontSize: "20px",
              backdropFilter: "blur(4px)",
            }}
          >
            ▶
          </div>
        </div>
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
          pointerEvents: "none",
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
          pointerEvents: "none",
        }}
      />

      {/* Video controls */}
      {isVideo && (
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            display: "flex",
            gap: "8px",
            zIndex: 10,
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            style={{
              background: "rgba(0,0,0,0.55)",
              border: "1px solid #C9A96E55",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#C9A96E",
              fontSize: "13px",
              backdropFilter: "blur(4px)",
            }}
          >
            {paused ? "▶" : "⏸"}
          </button>

          <button
            onClick={toggleMute}
            style={{
              background: "rgba(0,0,0,0.55)",
              border: "1px solid #C9A96E55",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#C9A96E",
              fontSize: "13px",
              backdropFilter: "blur(4px)",
            }}
          >
            {muted ? "🔇" : "🔊"}
          </button>
        </div>
      )}
    </div>
  );
}

export default function The40Page() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { ref: closingRef, visible: closingVisible } = useInView(0.3);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

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

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
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
          @media (max-width: 640px) {
            .gallery-grid { grid-template-columns: 1fr !important; }
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
