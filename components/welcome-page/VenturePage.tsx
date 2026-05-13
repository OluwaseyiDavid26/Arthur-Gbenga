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
    // Replace with real image from @aristoafrikana Instagram
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1400&q=80",
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
    // Replace with real image from @malibubyaristo Instagram
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=80",
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
    // Replace with real image from @madisonnigeria Instagram
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1400&q=80",
    accent: "#E8A87C",
    bg: "#0C0806",
    label: "Restaurant · Coffee · Alagbaka, Akure",
  },
];

function BrandSection({
  brand,
  index,
}: {
  brand: (typeof brands)[0];
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.25 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const isEven = index % 2 === 0;

  return (
    <section
      ref={ref}
      className="relative min-h-screen w-full flex items-center overflow-hidden"
      style={{ background: brand.bg }}
    >
      {/* Full bleed image — alternates left/right */}
      <div
        className={`absolute inset-y-0 w-full md:w-[55%] ${isEven ? "md:right-0" : "md:left-0"}`}
        style={{ transition: "opacity 1s ease", opacity: visible ? 1 : 0 }}
      >
        <img
          src={brand.image}
          alt={brand.name}
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.55) saturate(0.85)" }}
        />
        {/* gradient fade toward text side */}
        <div
          className="absolute inset-0"
          style={{
            background: isEven
              ? `linear-gradient(to left, transparent 30%, ${brand.bg} 85%)`
              : `linear-gradient(to right, transparent 30%, ${brand.bg} 85%)`,
          }}
        />
        {/* bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40"
          style={{
            background: `linear-gradient(to top, ${brand.bg}, transparent)`,
          }}
        />
      </div>

      {/* Content */}
      <div
        className={`relative z-10 w-full md:w-[55%] px-8 md:px-16 lg:px-24 py-24 ${
          isEven ? "md:ml-0" : "md:ml-auto"
        }`}
      >
        {/* Number */}
        <div
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "clamp(5rem, 12vw, 10rem)",
            fontWeight: 400,
            lineHeight: 1,
            color: "transparent",
            WebkitTextStroke: `1px ${brand.accent}22`,
            position: "absolute",
            top: "10%",
            right: isEven ? "auto" : "5%",
            left: isEven ? "5%" : "auto",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          {brand.number}
        </div>

        {/* Label */}
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "9px",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: brand.accent,
            marginBottom: "1.5rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s cubic-bezier(.22,.68,0,1.2) 0.1s",
          }}
        >
          {brand.label}
        </p>

        {/* Brand name */}
        <h2
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "clamp(2.2rem, 5vw, 4.5rem)",
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: "0.03em",
            color: "#F5EFE0",
            marginBottom: "0.5rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(25px)",
            transition: "all 0.9s cubic-bezier(.22,.68,0,1.2) 0.25s",
          }}
        >
          {brand.name}
        </h2>

        {/* Tagline */}
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1rem, 2vw, 1.4rem)",
            fontStyle: "italic",
            fontWeight: 300,
            color: brand.accent,
            marginBottom: "2rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(25px)",
            transition: "all 0.9s cubic-bezier(.22,.68,0,1.2) 0.4s",
          }}
        >
          {brand.tagline}
        </p>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            width: visible ? "60px" : "0px",
            background: `linear-gradient(to right, ${brand.accent}, transparent)`,
            marginBottom: "2rem",
            transition: "width 1s ease 0.6s",
          }}
        />

        {/* Description */}
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "clamp(0.8rem, 1.2vw, 0.9rem)",
            fontWeight: 300,
            lineHeight: 1.9,
            color: "rgba(245,239,224,0.65)",
            maxWidth: "480px",
            marginBottom: "2.5rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.9s cubic-bezier(.22,.68,0,1.2) 0.55s",
          }}
        >
          {brand.description}
        </p>

        {/* Instagram link */}
        <a
          href={brand.instagram}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "#F5EFE0",
            borderBottom: `1px solid ${brand.accent}`,
            paddingBottom: "3px",
            textDecoration: "none",
            display: "inline-block",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: `all 0.9s cubic-bezier(.22,.68,0,1.2) 0.7s, color 0.3s ease`,
          }}
          onMouseEnter={(e) =>
            ((e.target as HTMLElement).style.color = brand.accent)
          }
          onMouseLeave={(e) =>
            ((e.target as HTMLElement).style.color = "#F5EFE0")
          }
        >
          Visit on Instagram
        </a>
      </div>

      {/* Side brand number indicator */}
      <div
        className="hidden lg:flex absolute bottom-10 right-10 items-center gap-3"
        style={{ opacity: visible ? 0.4 : 0, transition: "opacity 1s ease 1s" }}
      >
        {brands.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === index ? "24px" : "6px",
              height: "1px",
              background: i === index ? brand.accent : "#444",
              transition: "width 0.3s ease",
            }}
          />
        ))}
      </div>
    </section>
  );
}

export default function VenturesPage() {
  return (
    <main style={{ background: "#080808" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500&family=Cormorant+Garamond:ital,wght@0,300;1,300;1,400&family=Montserrat:wght@200;300;400&display=swap');
      `}</style>

      {/* Page header */}
      <div
        className="relative flex flex-col items-center justify-center text-center py-32 px-6"
        style={{
          borderBottom: "1px solid #1a1a1a",
          background: "linear-gradient(to bottom, #080808, #0a0a0a)",
        }}
      >
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "9px",
            letterSpacing: "0.5em",
            textTransform: "uppercase",
            color: "#C9A96E",
            marginBottom: "1.5rem",
          }}
        >
          The Portfolio
        </p>
        <h1
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: 400,
            color: "#F5EFE0",
            letterSpacing: "0.05em",
            lineHeight: 1.1,
          }}
        >
          His Ventures
        </h1>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1rem, 2vw, 1.3rem)",
            fontStyle: "italic",
            fontWeight: 300,
            color: "rgba(245,239,224,0.5)",
            marginTop: "1rem",
            maxWidth: "480px",
          }}
        >
          Three brands. One vision. A legacy built in Akure.
        </p>
      </div>

      {/* Brand sections */}
      {brands.map((brand, i) => (
        <BrandSection key={brand.id} brand={brand} index={i} />
      ))}

      {/* Footer bar */}
      <div
        className="flex items-center justify-center py-16 px-6"
        style={{ borderTop: "1px solid #1a1a1a" }}
      >
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "9px",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "#444",
          }}
        >
          Madison &nbsp;·&nbsp; Aristo Afrikana &nbsp;·&nbsp; Malibu by Aristo
        </p>
      </div>
    </main>
  );
}
