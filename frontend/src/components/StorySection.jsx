import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { WEDDING_CONFIG } from "../config";

// Story images (Unsplash couple photos)
const storyImages = [
  "https://images.unsplash.com/photo-1529636798458-92182e662485?w=600&q=80",
  "https://images.unsplash.com/photo-1516401266446-6432a8a07d41?w=600&q=80",
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600&q=80",
  "https://images.unsplash.com/photo-1606216840240-f01d6e29a2d3?w=600&q=80",
  "https://images.unsplash.com/photo-1583939411023-14783179e581?w=600&q=80",
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
];

function StoryItem({ item, index, image }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isLeft = item.side === "left";

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        marginBottom: "4rem",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          width: "100%",
          gap: "2rem",
        }}
      >
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{
            textAlign: isLeft ? "right" : "left",
            padding: "0 1rem",
          }}
        >
          {isLeft ? (
            <StoryCard item={item} image={image} align="right" />
          ) : (
            <div style={{ opacity: 0 }}>placeholder</div>
          )}
        </motion.div>

        {/* Center timeline node */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #ca8a04, #eab308)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 20px rgba(234,179,8,0.4)",
              flexShrink: 0,
              zIndex: 2,
              position: "relative",
            }}
          >
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "#fff", fontSize: "0.8rem" }}>
              {item.year}
            </span>
          </motion.div>
        </div>

        {/* Right content */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{
            textAlign: isLeft ? "left" : "right",
            padding: "0 1rem",
          }}
        >
          {!isLeft ? (
            <StoryCard item={item} image={image} align="left" />
          ) : (
            <div style={{ opacity: 0 }}>placeholder</div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

function StoryCard({ item, image, align }) {
  return (
    <div
      className="luxury-card"
      style={{
        padding: "1.5rem",
        maxWidth: 340,
        marginLeft: align === "left" ? 0 : "auto",
        marginRight: align === "right" ? 0 : "auto",
      }}
    >
      <img
        src={image}
        alt={item.title}
        loading="lazy"
        style={{
          width: "100%",
          height: 180,
          objectFit: "cover",
          borderRadius: "0.75rem",
          marginBottom: "1rem",
        }}
      />
      <h3
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1.2rem",
          color: "#3d2b1f",
          margin: "0 0 0.5rem",
          fontWeight: 600,
        }}
      >
        {item.title}
      </h3>
      <p
        style={{
          fontFamily: "'Lato', sans-serif",
          fontSize: "0.875rem",
          color: "#6b4c3b",
          lineHeight: 1.7,
          margin: 0,
        }}
      >
        {item.text}
      </p>
    </div>
  );
}

// Mobile story item (stacked)
function MobileStoryItem({ item, index, image }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}
    >
      {/* Year badge */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #ca8a04, #eab308)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 16px rgba(234,179,8,0.35)",
          }}
        >
          <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "#fff", fontSize: "0.7rem" }}>
            {item.year}
          </span>
        </div>
        {index < 5 && (
          <div style={{ width: 2, flex: 1, background: "linear-gradient(to bottom, #eab308, transparent)", marginTop: 8 }} />
        )}
      </div>

      {/* Card */}
      <div
        className="luxury-card"
        style={{ padding: "1.25rem", flex: 1, marginBottom: 0 }}
      >
        <img
          src={image}
          alt={item.title}
          loading="lazy"
          style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: "0.5rem", marginBottom: "0.75rem" }}
        />
        <h3
          style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.05rem", color: "#3d2b1f", margin: "0 0 0.4rem", fontWeight: 600 }}
        >
          {item.title}
        </h3>
        <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.8rem", color: "#6b4c3b", lineHeight: 1.6, margin: 0 }}>
          {item.text}
        </p>
      </div>
    </motion.div>
  );
}

export default function StorySection() {
  const { story } = WEDDING_CONFIG;
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section
      id="story"
      className="section-padding"
      style={{
        background: "linear-gradient(180deg, #fdfaf5 0%, #faf4e8 50%, #fdfaf5 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle at 20% 50%, rgba(234,179,8,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(253,164,175,0.06) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />

      {/* Section header */}
      <div ref={titleRef} style={{ textAlign: "center", marginBottom: "4rem", position: "relative", zIndex: 1 }}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={titleInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          style={{ fontFamily: "'Dancing Script', cursive", fontSize: "1.3rem", color: "#ca8a04", marginBottom: "0.5rem" }}
        >
          Our Love Story
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="section-title"
        >
          How It All Began
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={titleInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="ornament-divider"
          style={{ margin: "1rem auto" }}
        >
          <span>✦</span>
          <span>❤️</span>
          <span>✦</span>
        </motion.div>
      </div>

      {/* Desktop timeline */}
      <div
        className="hidden md:block"
        style={{ maxWidth: 900, margin: "0 auto", position: "relative" }}
      >
        {/* Vertical line */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            top: 0,
            bottom: 0,
            width: 2,
            background: "linear-gradient(to bottom, transparent, #eab308 20%, #eab308 80%, transparent)",
            zIndex: 1,
          }}
        />
        {story.map((item, i) => (
          <StoryItem key={i} item={item} index={i} image={storyImages[i % storyImages.length]} />
        ))}
      </div>

      {/* Mobile stacked */}
      <div className="md:hidden" style={{ maxWidth: 480, margin: "0 auto" }}>
        {story.map((item, i) => (
          <MobileStoryItem key={i} item={item} index={i} image={storyImages[i % storyImages.length]} />
        ))}
      </div>
    </section>
  );
}
