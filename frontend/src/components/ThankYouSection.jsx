import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import ReactConfetti from "react-confetti";
import { WEDDING_CONFIG } from "../config";

function useWindowSize() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  useEffect(() => {
    const handler = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return size;
}

export default function ThankYouSection() {
  const { groom, bride, hashtag } = WEDDING_CONFIG;
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true, margin: "-100px" });
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiRunning, setConfettiRunning] = useState(false);

  useEffect(() => {
    if (inView && !showConfetti) {
      setTimeout(() => {
        setShowConfetti(true);
        setConfettiRunning(true);
        setTimeout(() => setConfettiRunning(false), 5000);
      }, 600);
    }
  }, [inView]);

  return (
    <section
      id="thankyou"
      className="section-padding"
      style={{
        background:
          "linear-gradient(135deg, #3d2b1f 0%, #5c3d2e 25%, #4a2c1f 50%, #3d2b1f 75%, #2a1a0f 100%)",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Confetti */}
      {showConfetti && (
        <ReactConfetti
          width={width}
          height={height}
          recycle={confettiRunning}
          numberOfPieces={confettiRunning ? 200 : 50}
          colors={["#eab308", "#fde047", "#fda4af", "#fb7185", "#fdfaf5", "#ca8a04"]}
          gravity={0.15}
          style={{ position: "fixed", top: 0, left: 0, zIndex: 9990, pointerEvents: "none" }}
        />
      )}

      {/* Decorative golden rings */}
      {[1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: `${150 + i * 120}px`,
            height: `${150 + i * 120}px`,
            borderRadius: "50%",
            border: `1px solid rgba(234,179,8,${0.25 - i * 0.04})`,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 25 + i * 5, repeat: Infinity, ease: "linear" }}
        />
      ))}

      {/* Bokeh lights */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`b${i}`}
          style={{
            position: "absolute",
            width: `${8 + i * 4}px`,
            height: `${8 + i * 4}px`,
            borderRadius: "50%",
            background: i % 3 === 0 ? "rgba(234,179,8,0.3)" : i % 3 === 1 ? "rgba(253,164,175,0.2)" : "rgba(253,250,245,0.15)",
            left: `${5 + (i * 9) % 90}%`,
            top: `${10 + (i * 11) % 80}%`,
          }}
          animate={{ opacity: [0.2, 0.7, 0.2], scale: [1, 1.3, 1] }}
          transition={{ duration: 3 + i * 0.4, repeat: Infinity }}
        />
      ))}

      <div ref={titleRef} style={{ position: "relative", zIndex: 2, maxWidth: 700 }}>
        {/* Hearts */}
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ type: "spring", damping: 10, delay: 0.2 }}
          style={{ fontSize: "4rem", marginBottom: "1rem" }}
        >
          💕
        </motion.div>

        {/* Thank you text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
          style={{ fontFamily: "'Dancing Script', cursive", fontSize: "1.5rem", color: "#eab308", marginBottom: "0.5rem" }}
        >
          With Love &amp; Gratitude
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2rem, 7vw, 4rem)",
            color: "#fdfaf5",
            fontWeight: 700,
            margin: "0 0 0.5rem",
            lineHeight: 1.2,
          }}
        >
          Thank You
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1rem, 3vw, 1.5rem)",
            color: "rgba(253,250,245,0.8)",
            fontStyle: "italic",
            marginBottom: "2rem",
          }}
        >
          for being part of our love story
        </motion.p>

        {/* Ornament */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.8 }}
          style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}
        >
          <div style={{ width: 80, height: 1, background: "linear-gradient(to right, transparent, #eab308)" }} />
          <span style={{ fontSize: "1.5rem" }}>💍</span>
          <div style={{ width: 80, height: 1, background: "linear-gradient(to left, transparent, #eab308)" }} />
        </motion.div>

        {/* Names */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.7 }}
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: "clamp(2rem, 6vw, 3.5rem)",
            color: "#eab308",
            marginBottom: "1rem",
          }}
        >
          {groom} &amp; {bride}
        </motion.div>

        {/* Hashtag */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: "1rem",
            color: "rgba(234,179,8,0.7)",
            letterSpacing: "0.15em",
            marginBottom: "3rem",
          }}
        >
          {hashtag}
        </motion.p>

        {/* Closing message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.1, duration: 0.7 }}
          style={{
            padding: "1.5rem 2rem",
            borderRadius: "1rem",
            border: "1px solid rgba(234,179,8,0.25)",
            background: "rgba(234,179,8,0.05)",
            backdropFilter: "blur(8px)",
          }}
        >
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.05rem",
              color: "rgba(253,250,245,0.85)",
              lineHeight: 1.8,
              margin: 0,
              fontStyle: "italic",
            }}
          >
            "Two hearts, one love, infinite memories.<br/>
            We are grateful for every soul who has been part of our journey.<br/>
            See you on our special day! 🌸"
          </p>
        </motion.div>

        {/* Confetti re-trigger button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setShowConfetti(true);
            setConfettiRunning(true);
            setTimeout(() => setConfettiRunning(false), 4000);
          }}
          style={{
            marginTop: "2.5rem",
            background: "transparent",
            border: "1.5px solid rgba(234,179,8,0.5)",
            borderRadius: "50px",
            padding: "0.75rem 2rem",
            fontFamily: "'Lato', sans-serif",
            fontSize: "0.8rem",
            color: "#eab308",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          🎉 Celebrate Again
        </motion.button>
      </div>
    </section>
  );
}
