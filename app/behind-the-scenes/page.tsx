// "use client";

// import { useEffect, useRef, useState } from "react";

// // ── GYM: real Cloudinary media ──
// const gymMedia: { type: "image" | "video"; src: string }[] = [
//   {
//     type: "image",
//     src: "https://res.cloudinary.com/du9kb43d6/image/upload/v1779183234/Mastering_the_basics_daily_1_bgg0gj.jpg",
//   },
//   {
//     type: "image",
//     src: "https://res.cloudinary.com/du9kb43d6/image/upload/v1779183232/Through_every_high_and_low_God_s_faithfulness_has_never_wavered._His_love_and_blessings_continu_1_jsecpj.jpg",
//   },
//   {
//     type: "video",
//     src: "https://res.cloudinary.com/du9kb43d6/video/upload/v1779183866/Turning_my_issues_into_muscle._Highly_recommend_%EF%B8%8F__%EF%B8%8FStrong_body_stronger_mindset._I_go_again_hxqdlu.mp4",
//   },
//   {
//     type: "video",
//     src: "https://res.cloudinary.com/du9kb43d6/video/upload/v1779185148/I_m_pushing_through_the_pain_and_embracing_the_gain._Determination_fuels_my_workouts_progress_f_zavs1j.mp4",
//   },
// ];

// const sections = [
//   {
//     id: "gym",
//     tab: "The Grind",
//     icon: "🏋🏾",
//     heading: "The Grind",
//     subheading: "Discipline is the foundation of everything.",
//     body: "Before the boardrooms and the brands, there is the early morning. The weights. The sweat. The quiet commitment to showing up — for himself, every single day. This is where Arthur sharpens the man the world sees.",
//     accent: "#C9A96E",
//     media: gymMedia,
//   },
//   {
//     id: "dad",
//     tab: "The Father",
//     icon: "👨‍👧‍👦",
//     heading: "The Father",
//     subheading: "His greatest title has nothing to do with business.",
//     body: "Every empire built means nothing if not built for someone. Behind the CEO is a father — present, proud, and deeply intentional. These are the moments that matter most. The ones no camera needs to capture, but here they are anyway.",
//     accent: "#A8C5DA",
//     media: [
//       {
//         type: "image",
//         src: "https://res.cloudinary.com/du9kb43d6/image/upload/v1779186486/SnapInsta.to_631764477_18377320675094081_5061168591905110579_n_gwca7h.jpg",
//       },
//       {
//         type: "image",
//         src: "https://res.cloudinary.com/du9kb43d6/image/upload/v1779186486/SnapInsta.to_565881275_18534645355022340_2488406260547248296_n_c6lteu.jpg",
//       },
//       {
//         type: "image",
//         src: "https://res.cloudinary.com/du9kb43d6/image/upload/v1779187701/SnapInsta.to_618645924_18071586119122784_1960066130716580127_n_rojnys.jpg",
//       },
//       {
//         type: "image",
//         src: "https://res.cloudinary.com/du9kb43d6/image/upload/v1779186949/SnapInsta.to_649244852_18073945853161137_3995922644941336978_n_wyhy7e.jpg",
//       },
//       {
//         type: "video",
//         src: "https://res.cloudinary.com/du9kb43d6/video/upload/v1779187041/AQMdhWquy-1i-OMmz-69qhy2vO4l9zTx-rWsdp3mOAcTv5hJh-QVL-EIAhIcpyn6m4SFfcqbRCYKm4z_X_FZAWF-Bj_Vyd5jsdbqQ50_zdytsg.mp4",
//       },
//     ],
//   },

//   {
//     id: "fun",
//     tab: "The Man",
//     icon: "😄",
//     heading: "The Man",
//     subheading: "Work hard. Live well. Laugh often.",
//     body: "Not every moment is a meeting. Not every day is a milestone. Some days are just good days — good people, good food, good vibes. This is Arthur unfiltered. The man behind the name, in his element.",
//     accent: "#E8A87C",
//     media: [
//       {
//         type: "image" as const,
//         src: "https://res.cloudinary.com/du9kb43d6/image/upload/v1779188174/SnapInsta.to_598693570_18546708994022340_2308281183816426781_n_txpiwv.jpg",
//       },
//       {
//         type: "image" as const,
//         src: "https://res.cloudinary.com/du9kb43d6/image/upload/v1779188173/SnapInsta.to_621165584_18055937825679696_5847381974491522002_n_ss7txe.jpg",
//       },
//       {
//         type: "image" as const,
//         src: "https://res.cloudinary.com/du9kb43d6/image/upload/v1779188173/SnapInsta.to_656353360_18180442693377496_4697082703475302250_n_lyonxe.jpg",
//       },
//       {
//         type: "image" as const,
//         src: "https://res.cloudinary.com/du9kb43d6/image/upload/v1779188173/SnapInsta.to_651352881_18057246650422633_143025275692953599_n_nlb775.jpg",
//       },
//     ],
//   },
// ];

// function useInView(threshold = 0.3) {
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

// /** Renders one media tile — image or looping muted video */
// function MediaTile({
//   item,
//   accent,
//   aspectRatio = "1/1",
// }: {
//   item: { type: "image" | "video"; src: string };
//   accent: string;
//   aspectRatio?: string;
// }) {
//   const videoRef = useRef<HTMLVideoElement>(null);

//   // Auto-play videos when in view
//   useEffect(() => {
//     if (item.type !== "video") return;
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) videoRef.current?.play().catch(() => {});
//         else videoRef.current?.pause();
//       },
//       { threshold: 0.3 },
//     );
//     if (videoRef.current) observer.observe(videoRef.current);
//     return () => observer.disconnect();
//   }, [item.type]);

//   return (
//     <div
//       style={{
//         position: "relative",
//         overflow: "hidden",
//         aspectRatio,
//         background: "#111",
//       }}
//     >
//       {item.type === "image" ? (
//         <img
//           src={item.src}
//           alt=""
//           style={{
//             width: "100%",
//             height: "100%",
//             objectFit: "cover",
//             filter: "brightness(0.85) saturate(0.9)",
//             display: "block",
//             transition: "transform 0.6s ease, filter 0.4s ease",
//           }}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.transform = "scale(1.04)";
//             e.currentTarget.style.filter = "brightness(0.95) saturate(1)";
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.transform = "scale(1)";
//             e.currentTarget.style.filter = "brightness(0.85) saturate(0.9)";
//           }}
//         />
//       ) : (
//         <>
//           <video
//             ref={videoRef}
//             src={item.src}
//             muted
//             loop
//             playsInline
//             preload="metadata"
//             style={{
//               width: "100%",
//               height: "100%",
//               objectFit: "cover",
//               display: "block",
//               filter: "brightness(0.85) saturate(0.9)",
//             }}
//           />
//           {/* Small video badge */}
//           <div
//             style={{
//               position: "absolute",
//               top: "10px",
//               right: "10px",
//               background: "rgba(0,0,0,0.55)",
//               backdropFilter: "blur(6px)",
//               border: `1px solid ${accent}44`,
//               borderRadius: "2px",
//               padding: "3px 7px",
//               fontFamily: "'Montserrat', sans-serif",
//               fontSize: "6px",
//               letterSpacing: "0.3em",
//               textTransform: "uppercase",
//               color: accent,
//             }}
//           >
//             Video
//           </div>
//         </>
//       )}
//       {/* Bottom accent line */}
//       <div
//         style={{
//           position: "absolute",
//           bottom: 0,
//           left: 0,
//           right: 0,
//           height: "1px",
//           background: `linear-gradient(to right, ${accent}55, transparent)`,
//         }}
//       />
//     </div>
//   );
// }

// function BTSSection({
//   section,
//   index,
//   sectionRef,
// }: {
//   section: (typeof sections)[0];
//   index: number;
//   sectionRef: React.RefObject<HTMLDivElement>;
// }) {
//   const { ref: contentRef, visible } = useInView(0.2);

//   // First item is the featured (left column bottom), rest go in the grid
//   const [featured, ...grid] = section.media;

//   return (
//     <div
//       ref={sectionRef}
//       id={`bts-${section.id}`}
//       style={{
//         minHeight: "100vh",
//         background: "#0C0C0C",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         padding: "6rem clamp(1.5rem, 6vw, 5rem)",
//         borderBottom: "1px solid #141210",
//         position: "relative",
//         overflow: "hidden",
//       }}
//     >
//       {/* Ghost section number */}
//       <div
//         style={{
//           position: "absolute",
//           bottom: "-2rem",
//           right: "-1rem",
//           fontFamily: "'Playfair Display', serif",
//           fontSize: "clamp(10rem, 22vw, 22rem)",
//           fontWeight: 700,
//           lineHeight: 1,
//           color: "transparent",
//           WebkitTextStroke: `1px ${section.accent}08`,
//           pointerEvents: "none",
//           userSelect: "none",
//           zIndex: 0,
//         }}
//       >
//         0{index + 1}
//       </div>

//       <div
//         ref={contentRef}
//         className="bts-grid"
//         style={{
//           position: "relative",
//           zIndex: 1,
//           display: "grid",
//           gridTemplateColumns: "1fr 1fr",
//           gap: "4rem",
//           alignItems: "start",
//         }}
//       >
//         {/* ── LEFT: Text + featured media ── */}
//         <div>
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: "0.8rem",
//               marginBottom: "1.5rem",
//               opacity: visible ? 1 : 0,
//               transform: visible ? "translateY(0)" : "translateY(16px)",
//               transition: "all 0.7s ease 0.1s",
//             }}
//           >
//             <span style={{ fontSize: "1.1rem" }}>{section.icon}</span>
//             <span
//               style={{
//                 fontFamily: "'Montserrat', sans-serif",
//                 fontSize: "8px",
//                 letterSpacing: "0.5em",
//                 textTransform: "uppercase",
//                 color: section.accent,
//               }}
//             >
//               Behind the Scenes
//             </span>
//           </div>

//           <h2
//             style={{
//               fontFamily: "'Playfair Display', serif",
//               fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
//               fontWeight: 400,
//               lineHeight: 1.0,
//               color: "#EDE8DE",
//               marginBottom: "0.5rem",
//               opacity: visible ? 1 : 0,
//               transform: visible ? "translateY(0)" : "translateY(24px)",
//               transition: "all 0.85s cubic-bezier(.22,.68,0,1.2) 0.2s",
//             }}
//           >
//             {section.heading}
//           </h2>

//           <p
//             style={{
//               fontFamily: "'Cormorant Garamond', serif",
//               fontSize: "clamp(1rem, 1.8vw, 1.3rem)",
//               fontStyle: "italic",
//               fontWeight: 300,
//               color: section.accent,
//               marginBottom: "1.8rem",
//               opacity: visible ? 1 : 0,
//               transform: visible ? "translateY(0)" : "translateY(20px)",
//               transition: "all 0.85s cubic-bezier(.22,.68,0,1.2) 0.35s",
//             }}
//           >
//             {section.subheading}
//           </p>

//           <div
//             style={{
//               height: "1px",
//               width: visible ? "50px" : "0px",
//               background: `linear-gradient(to right, ${section.accent}, transparent)`,
//               marginBottom: "1.8rem",
//               transition: "width 1s ease 0.5s",
//             }}
//           />

//           <p
//             style={{
//               fontFamily: "'Montserrat', sans-serif",
//               fontSize: "clamp(0.78rem, 1vw, 0.88rem)",
//               fontWeight: 300,
//               lineHeight: 2,
//               color: "rgba(237,232,222,0.5)",
//               maxWidth: "400px",
//               marginBottom: "2.5rem",
//               opacity: visible ? 1 : 0,
//               transform: visible ? "translateY(0)" : "translateY(18px)",
//               transition: "all 0.85s cubic-bezier(.22,.68,0,1.2) 0.5s",
//             }}
//           >
//             {section.body}
//           </p>

//           {/* Featured media tile */}
//           <div
//             style={{
//               opacity: visible ? 1 : 0,
//               transform: visible ? "translateY(0)" : "translateY(24px)",
//               transition: "all 0.9s cubic-bezier(.22,.68,0,1.2) 0.65s",
//             }}
//           >
//             <MediaTile
//               item={featured}
//               accent={section.accent}
//               aspectRatio="4/3"
//             />
//           </div>
//         </div>

//         {/* ── RIGHT: 2×2 media grid ── */}
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "1fr 1fr",
//             gap: "10px",
//             opacity: visible ? 1 : 0,
//             transform: visible ? "translateY(0)" : "translateY(30px)",
//             transition: "all 1s cubic-bezier(.22,.68,0,1.2) 0.4s",
//           }}
//         >
//           {grid.map((item, i) => (
//             <MediaTile
//               key={i}
//               item={item}
//               accent={section.accent}
//               aspectRatio="1/1"
//             />
//           ))}
//         </div>
//       </div>

//       <style>{`
//         @media (max-width: 768px) {
//           .bts-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
//         }
//       `}</style>
//     </div>
//   );
// }

// export default function BTSPage() {
//   const [activeTab, setActiveTab] = useState("gym");
//   const [tabVisible, setTabVisible] = useState(false);
//   const tabRef = useRef<HTMLDivElement>(null);
//   const heroRef = useRef<HTMLDivElement>(null);
//   const [heroVisible, setHeroVisible] = useState(false);

//   const sectionRefs = useRef<Record<string, React.RefObject<HTMLDivElement>>>({
//     gym: { current: null },
//     dad: { current: null },
//     fun: { current: null },
//   });

//   useEffect(() => {
//     const t = setTimeout(() => setHeroVisible(true), 100);
//     return () => clearTimeout(t);
//   }, []);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => setTabVisible(!entry.isIntersecting),
//       { threshold: 0 },
//     );
//     if (heroRef.current) observer.observe(heroRef.current);
//     return () => observer.disconnect();
//   }, []);

//   useEffect(() => {
//     const observers: IntersectionObserver[] = [];
//     sections.forEach((section) => {
//       const ref = sectionRefs.current[section.id];
//       if (!ref?.current) return;
//       const observer = new IntersectionObserver(
//         ([entry]) => {
//           if (entry.isIntersecting) setActiveTab(section.id);
//         },
//         { threshold: 0.4 },
//       );
//       observer.observe(ref.current);
//       observers.push(observer);
//     });
//     return () => observers.forEach((o) => o.disconnect());
//   }, []);

//   const scrollToSection = (id: string) => {
//     sectionRefs.current[id]?.current?.scrollIntoView({ behavior: "smooth" });
//     setActiveTab(id);
//   };

//   return (
//     <main style={{ background: "#0C0C0C", minHeight: "100vh" }}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,300;1,300;1,400&family=Montserrat:wght@200;300;400&display=swap');

//         @keyframes fadeUp {
//           from { opacity: 0; transform: translateY(24px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes lineGrow {
//           from { width: 0; }
//           to   { width: 44px; }
//         }

//         .tab-btn {
//           background: none;
//           border: none;
//           cursor: pointer;
//           font-family: 'Montserrat', sans-serif;
//           font-size: 9px;
//           letter-spacing: 0.38em;
//           text-transform: uppercase;
//           color: #4A4035;
//           padding: 0.6rem 0;
//           position: relative;
//           transition: color 0.3s ease;
//         }
//         .tab-btn::after {
//           content: '';
//           position: absolute;
//           bottom: 0; left: 0;
//           height: 1px;
//           width: 0;
//           background: #B8935A;
//           transition: width 0.35s cubic-bezier(.22,.68,0,1.2);
//         }
//         .tab-btn:hover { color: #EDE8DE; }
//         .tab-btn.active { color: #B8935A; }
//         .tab-btn.active::after { width: 100%; }
//       `}</style>

//       {/* ── HERO HEADER ── */}
//       <div
//         ref={heroRef}
//         style={{
//           position: "relative",
//           minHeight: "55vh",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           textAlign: "center",
//           padding: "9rem 2rem 5rem",
//           borderBottom: "1px solid #141210",
//           overflow: "hidden",
//         }}
//       >
//         <div
//           style={{
//             position: "absolute",
//             fontFamily: "'Playfair Display', serif",
//             fontSize: "clamp(6rem, 20vw, 18rem)",
//             fontWeight: 700,
//             color: "transparent",
//             WebkitTextStroke: "1px #C9A96E07",
//             pointerEvents: "none",
//             userSelect: "none",
//             letterSpacing: "0.05em",
//             lineHeight: 1,
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             whiteSpace: "nowrap",
//           }}
//         >
//           BTS
//         </div>

//         <div
//           style={{
//             height: "1px",
//             background: "#B8935A",
//             marginBottom: "1.8rem",
//             animation: heroVisible ? "lineGrow 1s ease 0.2s both" : "none",
//             width: heroVisible ? undefined : 0,
//           }}
//         />

//         <p
//           style={{
//             fontFamily: "'Montserrat', sans-serif",
//             fontSize: "9px",
//             letterSpacing: "0.52em",
//             textTransform: "uppercase",
//             color: "#7A6A52",
//             marginBottom: "1.2rem",
//             opacity: heroVisible ? 1 : 0,
//             transform: heroVisible ? "translateY(0)" : "translateY(16px)",
//             transition: "all 0.8s ease 0.3s",
//             position: "relative",
//             zIndex: 1,
//           }}
//         >
//           The Private World
//         </p>

//         <h1
//           style={{
//             fontFamily: "'Playfair Display', serif",
//             fontSize: "clamp(3rem, 7vw, 6rem)",
//             fontWeight: 400,
//             color: "#EDE8DE",
//             lineHeight: 1.05,
//             letterSpacing: "0.02em",
//             margin: "0 0 1rem",
//             opacity: heroVisible ? 1 : 0,
//             transform: heroVisible ? "translateY(0)" : "translateY(22px)",
//             transition: "all 0.9s cubic-bezier(.22,.68,0,1.2) 0.4s",
//             position: "relative",
//             zIndex: 1,
//           }}
//         >
//           Behind the Scenes
//         </h1>

//         <p
//           style={{
//             fontFamily: "'Cormorant Garamond', serif",
//             fontSize: "clamp(1rem, 1.8vw, 1.25rem)",
//             fontStyle: "italic",
//             fontWeight: 300,
//             color: "rgba(237,232,222,0.42)",
//             maxWidth: "480px",
//             opacity: heroVisible ? 1 : 0,
//             transition: "opacity 0.9s ease 0.6s",
//             position: "relative",
//             zIndex: 1,
//           }}
//         >
//           The grind, the family, the man — three chapters of the life behind the
//           brands.
//         </p>

//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: "2.5rem",
//             marginTop: "3rem",
//             opacity: heroVisible ? 1 : 0,
//             transition: "opacity 0.9s ease 0.75s",
//             position: "relative",
//             zIndex: 1,
//           }}
//         >
//           {sections.map((s) => (
//             <button
//               key={s.id}
//               className={`tab-btn ${activeTab === s.id ? "active" : ""}`}
//               onClick={() => scrollToSection(s.id)}
//             >
//               {s.tab}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* ── STICKY TAB BAR ── */}
//       <div
//         ref={tabRef}
//         style={{
//           position: "sticky",
//           top: "68px",
//           zIndex: 40,
//           background: "rgba(12,12,12,0.96)",
//           backdropFilter: "blur(12px)",
//           borderBottom: "1px solid #1C1810",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           gap: "3rem",
//           padding: "0 2rem",
//           height: "52px",
//           opacity: tabVisible ? 1 : 0,
//           transform: tabVisible ? "translateY(0)" : "translateY(-8px)",
//           transition: "opacity 0.4s ease, transform 0.4s ease",
//           pointerEvents: tabVisible ? "all" : "none",
//         }}
//       >
//         {sections.map((s) => (
//           <button
//             key={s.id}
//             className={`tab-btn ${activeTab === s.id ? "active" : ""}`}
//             onClick={() => scrollToSection(s.id)}
//           >
//             <span style={{ marginRight: "0.5rem" }}>{s.icon}</span>
//             {s.tab}
//           </button>
//         ))}
//       </div>

//       {/* ── BTS SECTIONS ── */}
//       {sections.map((section, i) => (
//         <BTSSection
//           key={section.id}
//           section={section}
//           index={i}
//           sectionRef={
//             sectionRefs.current[section.id] as React.RefObject<HTMLDivElement>
//           }
//         />
//       ))}

//       {/* ── CLOSING BAND ── */}
//       <div
//         style={{
//           padding: "5rem 2rem",
//           textAlign: "center",
//           borderTop: "1px solid #141210",
//         }}
//       >
//         <p
//           style={{
//             fontFamily: "'Cormorant Garamond', serif",
//             fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
//             fontStyle: "italic",
//             fontWeight: 300,
//             color: "rgba(237,232,222,0.35)",
//             maxWidth: "600px",
//             margin: "0 auto 1.5rem",
//             lineHeight: 1.7,
//           }}
//         >
//           "The man you see in public was built in private."
//         </p>
//         <div
//           style={{
//             width: "30px",
//             height: "1px",
//             background: "#B8935A44",
//             margin: "0 auto",
//           }}
//         />
//       </div>
//     </main>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";

type MediaItem = { type: "image" | "video"; src: string };

// ── GYM: real Cloudinary media ──
const gymMedia: MediaItem[] = [
  {
    type: "image",
    src: "https://res.cloudinary.com/du9kb43d6/image/upload/v1779183234/Mastering_the_basics_daily_1_bgg0gj.jpg",
  },
  {
    type: "image",
    src: "https://res.cloudinary.com/du9kb43d6/image/upload/v1779183232/Through_every_high_and_low_God_s_faithfulness_has_never_wavered._His_love_and_blessings_continu_1_jsecpj.jpg",
  },
  {
    type: "video",
    src: "https://res.cloudinary.com/du9kb43d6/video/upload/v1779183866/Turning_my_issues_into_muscle._Highly_recommend_%EF%B8%8F__%EF%B8%8FStrong_body_stronger_mindset._I_go_again_hxqdlu.mp4",
  },
  {
    type: "video",
    src: "https://res.cloudinary.com/du9kb43d6/video/upload/v1779185148/I_m_pushing_through_the_pain_and_embracing_the_gain._Determination_fuels_my_workouts_progress_f_zavs1j.mp4",
  },
];

// ── DAD: real Cloudinary media ──
const dadMedia: MediaItem[] = [
  {
    type: "image",
    src: "https://res.cloudinary.com/du9kb43d6/image/upload/v1779186486/SnapInsta.to_631764477_18377320675094081_5061168591905110579_n_gwca7h.jpg",
  },
  {
    type: "image",
    src: "https://res.cloudinary.com/du9kb43d6/image/upload/v1779186486/SnapInsta.to_565881275_18534645355022340_2488406260547248296_n_c6lteu.jpg",
  },
  {
    type: "image",
    src: "https://res.cloudinary.com/du9kb43d6/image/upload/v1779187701/SnapInsta.to_618645924_18071586119122784_1960066130716580127_n_rojnys.jpg",
  },
  {
    type: "image",
    src: "https://res.cloudinary.com/du9kb43d6/image/upload/v1779186949/SnapInsta.to_649244852_18073945853161137_3995922644941336978_n_wyhy7e.jpg",
  },
  {
    type: "video",
    src: "https://res.cloudinary.com/du9kb43d6/video/upload/v1779187041/AQMdhWquy-1i-OMmz-69qhy2vO4l9zTx-rWsdp3mOAcTv5hJh-QVL-EIAhIcpyn6m4SFfcqbRCYKm4z_X_FZAWF-Bj_Vyd5jsdbqQ50_zdytsg.mp4",
  },
];

// ── THE MAN: real Cloudinary media ──
const funMedia: MediaItem[] = [
  {
    type: "image",
    src: "https://res.cloudinary.com/du9kb43d6/image/upload/v1779188174/SnapInsta.to_598693570_18546708994022340_2308281183816426781_n_txpiwv.jpg",
  },
  {
    type: "image",
    src: "https://res.cloudinary.com/du9kb43d6/image/upload/v1779188173/SnapInsta.to_621165584_18055937825679696_5847381974491522002_n_ss7txe.jpg",
  },
  {
    type: "image",
    src: "https://res.cloudinary.com/du9kb43d6/image/upload/v1779188173/SnapInsta.to_656353360_18180442693377496_4697082703475302250_n_lyonxe.jpg",
  },
  {
    type: "image",
    src: "https://res.cloudinary.com/du9kb43d6/image/upload/v1779188173/SnapInsta.to_651352881_18057246650422633_143025275692953599_n_nlb775.jpg",
  },
];

const sections = [
  {
    id: "gym",
    tab: "The Grind",
    icon: "🏋🏾",
    heading: "The Grind",
    subheading: "Discipline is the foundation of everything.",
    body: "Before the boardrooms and the brands, there is the early morning. The weights. The sweat. The quiet commitment to showing up — for himself, every single day. This is where Arthur sharpens the man the world sees.",
    accent: "#C9A96E",
    media: gymMedia,
  },
  {
    id: "dad",
    tab: "The Father",
    icon: "👨‍👧‍👦",
    heading: "The Father",
    subheading: "His greatest title has nothing to do with business.",
    body: "Every empire built means nothing if not built for someone. Behind the CEO is a father — present, proud, and deeply intentional. These are the moments that matter most. The ones no camera needs to capture, but here they are anyway.",
    accent: "#A8C5DA",
    media: dadMedia,
  },
  {
    id: "fun",
    tab: "The Man",
    icon: "😄",
    heading: "The Man",
    subheading: "Work hard. Live well. Laugh often.",
    body: "Not every moment is a meeting. Not every day is a milestone. Some days are just good days — good people, good food, good vibes. This is Arthur unfiltered. The man behind the name, in his element.",
    accent: "#E8A87C",
    media: funMedia,
  },
];

function useInView(threshold = 0.3) {
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

function MediaTile({
  item,
  accent,
  aspectRatio = "1/1",
}: {
  item: MediaItem;
  accent: string;
  aspectRatio?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (item.type !== "video") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) videoRef.current?.play().catch(() => {});
        else videoRef.current?.pause();
      },
      { threshold: 0.3 },
    );
    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, [item.type]);

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        aspectRatio,
        background: "#111",
      }}
    >
      {item.type === "image" ? (
        <img
          src={item.src}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.85) saturate(0.9)",
            display: "block",
            transition: "transform 0.6s ease, filter 0.4s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.04)";
            e.currentTarget.style.filter = "brightness(0.95) saturate(1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.filter = "brightness(0.85) saturate(0.9)";
          }}
        />
      ) : (
        <>
          <video
            ref={videoRef}
            src={item.src}
            muted
            loop
            playsInline
            preload="metadata"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              filter: "brightness(0.85) saturate(0.9)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(6px)",
              border: `1px solid ${accent}44`,
              borderRadius: "2px",
              padding: "3px 7px",
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "6px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: accent,
            }}
          >
            Video
          </div>
        </>
      )}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: `linear-gradient(to right, ${accent}55, transparent)`,
        }}
      />
    </div>
  );
}

function BTSSection({
  section,
  index,
  sectionRef,
}: {
  section: (typeof sections)[0];
  index: number;
  //   sectionRef: React.RefObject<HTMLDivElement>;
  sectionRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { ref: contentRef, visible } = useInView(0.2);
  const [featured, ...grid] = section.media;

  return (
    <div
      ref={sectionRef}
      id={`bts-${section.id}`}
      style={{
        minHeight: "100vh",
        background: "#0C0C0C",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "6rem clamp(1.5rem, 6vw, 5rem)",
        borderBottom: "1px solid #141210",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ghost section number */}
      <div
        style={{
          position: "absolute",
          bottom: "-2rem",
          right: "-1rem",
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(10rem, 22vw, 22rem)",
          fontWeight: 700,
          lineHeight: 1,
          color: "transparent",
          WebkitTextStroke: `1px ${section.accent}08`,
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
        }}
      >
        0{index + 1}
      </div>

      <div
        ref={contentRef}
        className="bts-grid"
        style={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          alignItems: "start",
        }}
      >
        {/* ── LEFT: Text + featured media ── */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.8rem",
              marginBottom: "1.5rem",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: "all 0.7s ease 0.1s",
            }}
          >
            <span style={{ fontSize: "1.1rem" }}>{section.icon}</span>
            <span
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "8px",
                letterSpacing: "0.5em",
                textTransform: "uppercase",
                color: section.accent,
              }}
            >
              Behind the Scenes
            </span>
          </div>

          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
              fontWeight: 400,
              lineHeight: 1.0,
              color: "#EDE8DE",
              marginBottom: "0.5rem",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: "all 0.85s cubic-bezier(.22,.68,0,1.2) 0.2s",
            }}
          >
            {section.heading}
          </h2>

          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1rem, 1.8vw, 1.3rem)",
              fontStyle: "italic",
              fontWeight: 300,
              color: section.accent,
              marginBottom: "1.8rem",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.85s cubic-bezier(.22,.68,0,1.2) 0.35s",
            }}
          >
            {section.subheading}
          </p>

          <div
            style={{
              height: "1px",
              width: visible ? "50px" : "0px",
              background: `linear-gradient(to right, ${section.accent}, transparent)`,
              marginBottom: "1.8rem",
              transition: "width 1s ease 0.5s",
            }}
          />

          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(0.78rem, 1vw, 0.88rem)",
              fontWeight: 300,
              lineHeight: 2,
              color: "rgba(237,232,222,0.5)",
              maxWidth: "400px",
              marginBottom: "2.5rem",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(18px)",
              transition: "all 0.85s cubic-bezier(.22,.68,0,1.2) 0.5s",
            }}
          >
            {section.body}
          </p>

          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: "all 0.9s cubic-bezier(.22,.68,0,1.2) 0.65s",
            }}
          >
            <MediaTile
              item={featured}
              accent={section.accent}
              aspectRatio="4/3"
            />
          </div>
        </div>

        {/* ── RIGHT: 2×2 media grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 1s cubic-bezier(.22,.68,0,1.2) 0.4s",
          }}
        >
          {grid.map((item, i) => (
            <MediaTile
              key={i}
              item={item}
              accent={section.accent}
              aspectRatio="1/1"
            />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .bts-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </div>
  );
}

// ── Individual ref components so refs are created in components, not during render ──
function GymSection() {
  const ref = useRef<HTMLDivElement>(null);
  return <BTSSection section={sections[0]} index={0} sectionRef={ref} />;
}

function DadSection() {
  const ref = useRef<HTMLDivElement>(null);
  return <BTSSection section={sections[1]} index={1} sectionRef={ref} />;
}

function FunSection() {
  const ref = useRef<HTMLDivElement>(null);
  return <BTSSection section={sections[2]} index={2} sectionRef={ref} />;
}

export default function BTSPage() {
  const [activeTab, setActiveTab] = useState("gym");
  const [tabVisible, setTabVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setTabVisible(!entry.isIntersecting),
      { threshold: 0 },
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  // Update active tab based on scroll — using document.getElementById
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sections.forEach((section) => {
      const el = document.getElementById(`bts-${section.id}`);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveTab(section.id);
        },
        { threshold: 0.4 },
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollToSection = (id: string) => {
    document
      .getElementById(`bts-${id}`)
      ?.scrollIntoView({ behavior: "smooth" });
    setActiveTab(id);
  };

  return (
    <main style={{ background: "#0C0C0C", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,300;1,300;1,400&family=Montserrat:wght@200;300;400&display=swap');

        @keyframes lineGrow {
          from { width: 0; }
          to   { width: 44px; }
        }

        .tab-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'Montserrat', sans-serif;
          font-size: 9px;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          color: #4A4035;
          padding: 0.6rem 0;
          position: relative;
          transition: color 0.3s ease;
        }
        .tab-btn::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          height: 1px;
          width: 0;
          background: #B8935A;
          transition: width 0.35s cubic-bezier(.22,.68,0,1.2);
        }
        .tab-btn:hover { color: #EDE8DE; }
        .tab-btn.active { color: #B8935A; }
        .tab-btn.active::after { width: 100%; }
      `}</style>

      {/* ── HERO HEADER ── */}
      <div
        ref={heroRef}
        style={{
          position: "relative",
          minHeight: "55vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "9rem 2rem 5rem",
          borderBottom: "1px solid #141210",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(6rem, 20vw, 18rem)",
            fontWeight: 700,
            color: "transparent",
            WebkitTextStroke: "1px #C9A96E07",
            pointerEvents: "none",
            userSelect: "none",
            letterSpacing: "0.05em",
            lineHeight: 1,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            whiteSpace: "nowrap",
          }}
        >
          BTS
        </div>

        <div
          style={{
            height: "1px",
            background: "#B8935A",
            marginBottom: "1.8rem",
            animation: heroVisible ? "lineGrow 1s ease 0.2s both" : "none",
            width: heroVisible ? undefined : 0,
          }}
        />

        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "9px",
            letterSpacing: "0.52em",
            textTransform: "uppercase",
            color: "#7A6A52",
            marginBottom: "1.2rem",
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.8s ease 0.3s",
            position: "relative",
            zIndex: 1,
          }}
        >
          The Private World
        </p>

        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(3rem, 7vw, 6rem)",
            fontWeight: 400,
            color: "#EDE8DE",
            lineHeight: 1.05,
            letterSpacing: "0.02em",
            margin: "0 0 1rem",
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(22px)",
            transition: "all 0.9s cubic-bezier(.22,.68,0,1.2) 0.4s",
            position: "relative",
            zIndex: 1,
          }}
        >
          Behind the Scenes
        </h1>

        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1rem, 1.8vw, 1.25rem)",
            fontStyle: "italic",
            fontWeight: 300,
            color: "rgba(237,232,222,0.42)",
            maxWidth: "480px",
            opacity: heroVisible ? 1 : 0,
            transition: "opacity 0.9s ease 0.6s",
            position: "relative",
            zIndex: 1,
          }}
        >
          The grind, the family, the man — three chapters of the life behind the
          brands.
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2.5rem",
            marginTop: "3rem",
            opacity: heroVisible ? 1 : 0,
            transition: "opacity 0.9s ease 0.75s",
            position: "relative",
            zIndex: 1,
          }}
        >
          {sections.map((s) => (
            <button
              key={s.id}
              className={`tab-btn ${activeTab === s.id ? "active" : ""}`}
              onClick={() => scrollToSection(s.id)}
            >
              {s.tab}
            </button>
          ))}
        </div>
      </div>

      {/* ── STICKY TAB BAR ── */}
      <div
        style={{
          position: "sticky",
          top: "68px",
          zIndex: 40,
          background: "rgba(12,12,12,0.96)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #1C1810",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "3rem",
          padding: "0 2rem",
          height: "52px",
          opacity: tabVisible ? 1 : 0,
          transform: tabVisible ? "translateY(0)" : "translateY(-8px)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
          pointerEvents: tabVisible ? "all" : "none",
        }}
      >
        {sections.map((s) => (
          <button
            key={s.id}
            className={`tab-btn ${activeTab === s.id ? "active" : ""}`}
            onClick={() => scrollToSection(s.id)}
          >
            <span style={{ marginRight: "0.5rem" }}>{s.icon}</span>
            {s.tab}
          </button>
        ))}
      </div>

      {/* ── BTS SECTIONS — each has its own ref, no access during render ── */}
      <GymSection />
      <DadSection />
      <FunSection />

      {/* ── CLOSING BAND ── */}
      <div
        style={{
          padding: "5rem 2rem",
          textAlign: "center",
          borderTop: "1px solid #141210",
        }}
      >
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
            fontStyle: "italic",
            fontWeight: 300,
            color: "rgba(237,232,222,0.35)",
            maxWidth: "600px",
            margin: "0 auto 1.5rem",
            lineHeight: 1.7,
          }}
        >
          "The man you see in public was built in private."
        </p>
        <div
          style={{
            width: "30px",
            height: "1px",
            background: "#B8935A44",
            margin: "0 auto",
          }}
        />
      </div>
    </main>
  );
}
