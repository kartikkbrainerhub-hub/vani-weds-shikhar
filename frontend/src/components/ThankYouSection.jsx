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
          style={{ fontSize: "3rem", marginBottom: "0.5rem" }}
        >
          💕
        </motion.div>

        {/* Thank you text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
          style={{ fontFamily: "'Dancing Script', cursive", fontSize: "1.3rem", color: "#eab308", marginBottom: "0.25rem" }}
        >
          With Love &amp; Gratitude
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.8rem, 6vw, 3rem)",
            color: "#fdfaf5",
            fontWeight: 700,
            margin: "0 0 0.25rem",
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
            fontSize: "clamp(0.9rem, 3vw, 1.2rem)",
            color: "rgba(253,250,245,0.8)",
            fontStyle: "italic",
            marginBottom: "1.5rem",
          }}
        >
          for being part of our love story
        </motion.p>

        {/* Ornament */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.8 }}
          style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}
        >
          <div style={{ width: 60, height: 1, background: "linear-gradient(to right, transparent, #eab308)" }} />
          <span style={{ fontSize: "1.2rem" }}>💍</span>
          <div style={{ width: 60, height: 1, background: "linear-gradient(to left, transparent, #eab308)" }} />
        </motion.div>

        {/* Names */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.7 }}
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: "clamp(1.8rem, 6vw, 2.8rem)",
            color: "#eab308",
            marginBottom: "0.5rem",
          }}
        >
          {bride} &amp; {groom}
        </motion.div>

        {/* Hashtag */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: "0.9rem",
            color: "rgba(234,179,8,0.7)",
            letterSpacing: "0.15em",
            marginBottom: "2rem",
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
            padding: "1.25rem 1.5rem",
            borderRadius: "1rem",
            border: "1px solid rgba(234,179,8,0.25)",
            background: "rgba(234,179,8,0.05)",
            backdropFilter: "blur(8px)",
          }}
        >
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "0.95rem",
              color: "rgba(253,250,245,0.85)",
              lineHeight: 1.6,
              margin: 0,
              fontStyle: "italic",
            }}
          >
            "Two hearts, one love, infinite memories.<br/>
            We are grateful for every soul who has been part of our journey.<br/>
            See you on our special day! 🌸"
          </p>
        </motion.div>

        {/* Transition / Continue Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.6 }}
          className="mt-8 flex flex-col items-center gap-2"
        >
          <div className="w-px h-8 bg-gradient-to-b from-[#eab308]/40 to-transparent" />
          
          <motion.button
            whileHover={{ scale: 1.05, letterSpacing: "0.2em" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const section = document.getElementById("scratch-reveal");
              if (section) {
                const container = titleRef.current.parentElement;
                container.style.transition = "all 0.8s ease-in-out";
                container.style.opacity = "0";
                container.style.filter = "blur(10px)";
                container.style.transform = "scale(0.98)";
                setTimeout(() => {
                  section.scrollIntoView({ behavior: "auto" });
                  window.dispatchEvent(new CustomEvent('reset-scratch'));
                }, 800);
              }
            }}
            className="group relative px-8 py-4 bg-transparent text-[#eab308] font-['Cormorant_Garamond'] text-lg uppercase tracking-[0.15em] border border-[#eab308]/30 rounded-full overflow-hidden transition-all duration-500 hover:border-[#eab308] hover:shadow-[0_0_20px_rgba(234,179,8,0.2)]"
          >
            <span className="relative z-10">Continue Journey</span>
            <div className="absolute inset-0 bg-[#eab308]/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </motion.button>
          
          <span className="text-[10px] text-[#eab308]/50 uppercase tracking-[0.2em] font-['Lato']">Explore Again</span>
        </motion.div>
      </div>
    </section>
  );
}
