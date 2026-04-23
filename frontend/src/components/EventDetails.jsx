import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { WEDDING_CONFIG } from "../config";
import { MapPin, Clock, Calendar } from "lucide-react";

export default function EventDetails() {
  const { events } = WEDDING_CONFIG;
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true });

  return (
    <section
      id="events"
      className="section-padding"
      style={{
        background: "linear-gradient(180deg, #fdfaf5 0%, #faf4e8 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 10% 80%, rgba(234,179,8,0.08) 0%, transparent 40%), radial-gradient(circle at 90% 20%, rgba(253,164,175,0.08) 0%, transparent 40%)",
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <div ref={titleRef} style={{ textAlign: "center", marginBottom: "3.5rem", position: "relative", zIndex: 1 }}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          style={{ fontFamily: "'Dancing Script', cursive", fontSize: "1.3rem", color: "#ca8a04", marginBottom: "0.5rem" }}
        >
          Join Us In Celebration
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="section-title"
        >
          Event Details
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="ornament-divider"
        >
          <span>✦</span>
          <span>🌸</span>
          <span>✦</span>
        </motion.div>
      </div>

      {/* Event cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "2rem",
          maxWidth: 1100,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {events.map((event, i) => (
          <EventCard key={event.id} event={event} index={i} parentInView={inView} />
        ))}
      </div>
    </section>
  );
}

function EventCard({ event, index, parentInView }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      className="luxury-card"
      style={{
        padding: "2.5rem 2rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            index === 0
              ? "linear-gradient(135deg, rgba(255,228,230,0.5) 0%, rgba(255,240,245,0.5) 100%)"
              : index === 1
              ? "linear-gradient(135deg, rgba(254,243,199,0.5) 0%, rgba(255,249,235,0.5) 100%)"
              : "linear-gradient(135deg, rgba(237,233,254,0.5) 0%, rgba(255,228,230,0.5) 100%)",
          borderRadius: "inherit",
          zIndex: 0,
        }}
      />

      {/* Top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "20%",
          right: "20%",
          height: 3,
          borderRadius: "0 0 4px 4px",
          background: "linear-gradient(to right, transparent, #eab308, transparent)",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Icon */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
          style={{ fontSize: "3rem", marginBottom: "1rem", display: "block" }}
        >
          {event.icon}
        </motion.div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.4rem",
            color: "#3d2b1f",
            margin: "0 0 0.5rem",
            fontWeight: 600,
          }}
        >
          {event.title}
        </h3>

        {/* Divider */}
        <div
          style={{
            width: 60,
            height: 1,
            background: "linear-gradient(to right, transparent, #eab308, transparent)",
            margin: "0.75rem auto",
          }}
        />

        {/* Details */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "1.25rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", justifyContent: "center" }}>
            <Calendar size={16} color="#ca8a04" />
            <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.9rem", color: "#3d2b1f", fontWeight: 600 }}>
              {event.date}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", justifyContent: "center" }}>
            <Clock size={16} color="#ca8a04" />
            <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.875rem", color: "#6b4c3b" }}>
              {event.time}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", justifyContent: "center" }}>
            <MapPin size={16} color="#ca8a04" style={{ flexShrink: 0, marginTop: "2px" }} />
            <div style={{ textAlign: "center" }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.95rem", color: "#3d2b1f", margin: "0 0 0.2rem", fontWeight: 500 }}>
                {event.venue}
              </p>
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.8rem", color: "#9b8ea0", margin: 0, lineHeight: 1.5 }}>
                {event.address}
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          style={{
            marginTop: "1.75rem",
            background: "transparent",
            border: "1.5px solid rgba(234,179,8,0.5)",
            borderRadius: "50px",
            padding: "0.6rem 1.75rem",
            fontFamily: "'Lato', sans-serif",
            fontSize: "0.75rem",
            color: "#ca8a04",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            cursor: "pointer",
            fontWeight: 700,
            transition: "background 0.3s, color 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(234,179,8,0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
          }}
        >
          Add to Calendar
        </motion.button>
      </div>
    </motion.div>
  );
}
