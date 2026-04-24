import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { WEDDING_CONFIG } from "../config";
import { MapPin, Navigation } from "lucide-react";

export default function LocationSection() {
  const { venueMapSrc, events } = WEDDING_CONFIG;
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true });
  const mainVenue = events[1]; // Wedding ceremony

  return (
    <section
      id="location"
      className="section-padding"
      style={{
        background: "linear-gradient(180deg, #fdfaf5 0%, #faf4e8 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle at 80% 50%, rgba(234,179,8,0.06) 0%, transparent 40%)",
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <div ref={titleRef} className="text-center mb-10 relative z-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="font-['Dancing_Script'] text-xl text-[#ca8a04] mb-1"
        >
          Find Us Here
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="section-title"
        >
          Venue & Location
        </motion.h2>
        <div className="gold-divider mt-6" />
      </div>

      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "2.5rem",
          alignItems: "start",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Venue Info */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <div className="luxury-card" style={{ padding: "2.5rem 2rem" }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #ca8a04, #eab308)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.5rem",
                boxShadow: "0 4px 16px rgba(234,179,8,0.35)",
              }}
            >
              <MapPin size={24} color="white" />
            </div>

            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.5rem",
                color: "#3d2b1f",
                margin: "0 0 0.5rem",
                fontWeight: 600,
              }}
            >
              {mainVenue.venue}
            </h3>
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "0.9rem",
                color: "#6b4c3b",
                lineHeight: 1.7,
                marginBottom: "1.5rem",
              }}
            >
              {mainVenue.address}
            </p>

            {/* Details */}
            {events.map((e, i) => (
              <div
                key={i}
                style={{
                  padding: "1rem",
                  borderRadius: "0.75rem",
                  background: "rgba(234,179,8,0.06)",
                  border: "1px solid rgba(234,179,8,0.15)",
                  marginBottom: "0.75rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <span style={{ fontSize: "1.25rem" }}>{e.icon}</span>
                <div>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.9rem", color: "#3d2b1f", margin: 0, fontWeight: 600 }}>
                    {e.title}
                  </p>
                  <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.78rem", color: "#9b8ea0", margin: 0 }}>
                    {e.date} • {e.time}
                  </p>
                </div>
              </div>
            ))}

            {/* Directions Link */}
            <motion.a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 flex items-center justify-center gap-2 text-[#ca8a04] font-bold uppercase tracking-widest text-[10px] border-b border-[#ca8a04]/30 pb-1 hover:border-[#ca8a04] transition-all"
            >
              <Navigation size={12} />
              Get Directions
            </motion.a>
          </div>
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="map-container"
        >
          <iframe
            title="Wedding Venue Map"
            src={venueMapSrc}
            width="100%"
            height="420"
            style={{ border: 0, display: "block" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </section>
  );
}
