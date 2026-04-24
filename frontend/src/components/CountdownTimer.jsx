import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { WEDDING_CONFIG } from "../config";

function pad(n) {
  return String(n).padStart(2, "0");
}

function getTimeLeft(targetDate) {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, past: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, past: false };
}

function CountUnit({ value, label, index }) {
  const [displayValue, setDisplayValue] = useState(value);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (value !== displayValue) {
      setAnimating(true);
      const timer = setTimeout(() => {
        setDisplayValue(value);
        setAnimating(false);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {/* Flip card */}
      <div
        style={{
          position: "relative",
          width: "clamp(60px, 20vw, 90px)",
          height: "clamp(70px, 22vw, 110px)",
        }}
      >
        {/* Background card */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,249,235,0.9) 100%)",
            border: "1.5px solid rgba(234,179,8,0.35)",
            borderRadius: "1rem",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1), 0 2px 8px rgba(234,179,8,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Horizontal line separator */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              right: 0,
              height: "1px",
              background: "rgba(234,179,8,0.2)",
            }}
          />

          <AnimatePresence mode="popLayout">
            <motion.span
              key={displayValue}
              initial={{ y: animating ? -20 : 0, opacity: animating ? 0 : 1 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="countdown-digit text-[clamp(1.8rem,5vw,3rem)]"
            >
              {pad(displayValue)}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Gold corner dots */}
        {["top-1.5 left-1.5", "top-1.5 right-1.5", "bottom-1.5 left-1.5", "bottom-1.5 right-1.5"].map((pos, i) => (
          <div
            key={i}
            className={`absolute ${pos}`}
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "rgba(234,179,8,0.5)",
            }}
          />
        ))}
      </div>

      <p
        style={{
          fontFamily: "'Lato', sans-serif",
          fontSize: "0.6rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#9b8ea0",
          marginTop: "0.75rem",
          fontWeight: 700,
        }}
      >
        {label}
      </p>
    </motion.div>
  );
}

export default function CountdownTimer() {
  const { weddingDate, groom, bride } = WEDDING_CONFIG;
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(weddingDate));
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(weddingDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [weddingDate]);

  return (
    <section
      id="countdown"
      className="section-padding"
      style={{
        background:
          "linear-gradient(135deg, #3d2b1f 0%, #5c3d2e 30%, #3d2b1f 60%, #2a1a0f 100%)",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      {/* Decorative bokeh circles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: `${40 + i * 20}px`,
            height: `${40 + i * 20}px`,
            borderRadius: "50%",
            background: "rgba(234,179,8,0.05)",
            border: "1px solid rgba(234,179,8,0.1)",
            left: `${10 + (i * 13) % 85}%`,
            top: `${15 + (i * 17) % 70}%`,
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}

      {/* Gold radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 50%, rgba(234,179,8,0.08) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div ref={titleRef} style={{ position: "relative", zIndex: 2 }}>
        {/* Header */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          style={{ fontFamily: "'Dancing Script', cursive", fontSize: "1.2rem", color: "#eab308", marginBottom: "0.25rem" }}
        >
          The Big Day Is Near
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.6rem, 5vw, 2.8rem)",
            color: "#fdfaf5",
            margin: "0 0 0.25rem",
            fontWeight: 400,
          }}
        >
          Counting Down To
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          style={{ fontFamily: "'Dancing Script', cursive", fontSize: "1.3rem", color: "#eab308", marginBottom: "1.5rem" }}
        >
          {groom} &amp; {bride}'s Wedding
        </motion.p>

        {/* Timer */}
        {timeLeft.past ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "2rem",
              color: "#eab308",
              fontStyle: "italic",
            }}
          >
            🎉 The wedding day has arrived! 🎉
          </motion.div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              gap: "clamp(4px, 1.5vw, 16px)",
              width: "100%",
            }}
          >
            <CountUnit value={timeLeft.days} label="Days" index={0} />
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.2rem, 4vw, 2.5rem)",
                color: "rgba(234,179,8,0.6)",
                marginTop: "1.2rem",
              }}
            >
              :
            </div>
            <CountUnit value={timeLeft.hours} label="Hours" index={1} />
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.2rem, 4vw, 2.5rem)",
                color: "rgba(234,179,8,0.6)",
                marginTop: "1.2rem",
              }}
            >
              :
            </div>
            <CountUnit value={timeLeft.minutes} label="Minutes" index={2} />
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.2rem, 4vw, 2.5rem)",
                color: "rgba(234,179,8,0.6)",
                marginTop: "1.2rem",
              }}
            >
              :
            </div>
            <CountUnit value={timeLeft.seconds} label="Seconds" index={3} />
          </div>
        )}

        {/* Wedding date text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1rem",
            color: "rgba(253,250,245,0.6)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginTop: "2.5rem",
          }}
        >
          {weddingDate.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
        </motion.p>
      </div>
    </section>
  );
}
