import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WEDDING_CONFIG } from "../config";
import ganpatiSeal from "../assets/images/ganpati-seal.png.png";

// Floating petals background component
function FloatingPetals() {
  const petalCount = 25;
  const colors = ["#E6C79C", "#F5D7A1", "#FFD1DC"];
  
  return (
    <div 
      style={{ 
        position: "fixed", 
        inset: 0, 
        pointerEvents: "none", 
        zIndex: 1, 
        overflow: "hidden" 
      }}
    >
      {[...Array(petalCount)].map((_, i) => {
        const left = Math.random() * 100;
        const duration = 15 + Math.random() * 10;
        const delay = Math.random() * 5;
        const size = 8 + Math.random() * 12;
        const color = colors[i % colors.length];
        
        return (
          <motion.div
            key={i}
            initial={{ y: "-10vh", x: 0, rotate: 0, opacity: 0 }}
            animate={{ 
              y: "110vh", 
              x: [0, 50, -40, 20], 
              rotate: [0, 180, 360, 720],
              opacity: [0, 0.7, 0.7, 0] 
            }}
            transition={{ duration, repeat: Infinity, delay, ease: "linear" }}
            style={{
              position: "absolute",
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`,
              background: color,
              borderRadius: "50%",
              filter: "blur(0.3px)",
              boxShadow: "0 0 4px rgba(255, 255, 255, 0.4)",
            }}
          />
        );
      })}
    </div>
  );
}

const COLORS = {
  bgGradient: "radial-gradient(circle at center, #fdfaf5 0%, #f3ece0 100%)",
  envelope: "#FDFBF7",
  flap: "#F5F1E9",
  wax: "linear-gradient(145deg, #d4af37, #b8962e)", // Luxury Gold Gradient
  gold: "#D4AF37",
  text: "#3d2b1f",
  accent: "#ca8a04",
  luxuryText: "#6b5b4b",
};

export default function OpeningAnimation({ onComplete }) {
  const { groom, bride } = WEDDING_CONFIG;
  const [isOpening, setIsOpening] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    
    setTimeout(() => {
      setIsRevealed(true);
      setTimeout(() => {
        // Start background music automatically after animation completes
        window.dispatchEvent(new CustomEvent("music-start"));
        onComplete();
      }, 1200);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        background: COLORS.bgGradient,
        overflow: "hidden",
        perspective: "1500px",
      }}
    >
      <FloatingPetals />

      {/* Main UI Wrapper */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Envelope Container */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "relative",
            width: "90vw",
            maxWidth: "420px",
            aspectRatio: "4 / 3",
            background: COLORS.envelope,
            borderRadius: "4px 4px 12px 12px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.06), 0 5px 10px rgba(0,0,0,0.04)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Inner Content (Luxury Invitation Card) */}
          <motion.div
            animate={isOpening ? { y: -200, opacity: 0 } : { y: 0 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            style={{
              position: "absolute",
              inset: "5%",
              background: "#fff",
              borderRadius: "4px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "2rem",
              zIndex: 1,
              border: "1px solid rgba(0,0,0,0.02)",
            }}
          >
            {/* Hierarchy: Names -> Line -> OUR STORY BEGINS -> WEDDING INVITATION */}
            <div style={{ fontFamily: "'Dancing Script', cursive", fontSize: "1.8rem", color: COLORS.accent,paddingTop:"70px",marginBottom:"50px" }}>
              {bride} & {groom}
            </div>
            <div style={{ width: "40px", height: "1px", background: COLORS.gold}} />
            <p style={{ 
              fontFamily: "'Playfair Display', serif", 
              fontSize: "0.8rem", 
              textTransform: "uppercase", 
              letterSpacing: "2px",
              color: "#9b8ea0",
              margin: "0 0 0.75rem 0"
              
            }}>
              Our Story Begins
            </p>
            <p style={{ 
              fontFamily: "'Playfair Display', serif", 
              fontSize: "14px", 
              textTransform: "uppercase", 
              letterSpacing: "3px", 
              color: COLORS.luxuryText,
              margin: 0,
              
              fontWeight: 500
            }}>
              • Wedding Invitation •
            </p>
          </motion.div>

          {/* Envelope Body Decoration */}
          <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}>
            <div style={{ position: "absolute", bottom: 0, left: 0, width: 0, height: 0, borderLeft: "45vw solid rgba(0,0,0,0.01)", borderBottom: "35vw solid transparent" }} />
            <div style={{ position: "absolute", bottom: 0, right: 0, width: 0, height: 0, borderRight: "45vw solid rgba(0,0,0,0.01)", borderBottom: "35vw solid transparent" }} />
          </div>

          {/* Envelope Flap */}
          <motion.div
            animate={isOpening ? { rotateX: 160, zIndex: 0 } : { rotateX: 0, zIndex: 5 }}
            transition={{ duration: 1.1, delay: 0.4 }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              transformOrigin: "top center",
              zIndex: 5,
            }}
          >
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: "min(210px, 45vw) solid transparent",
                borderRight: "min(210px, 45vw) solid transparent",
                borderTop: "min(160px, 35vw) solid #F5F1E9",
                filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.05))",
              }}
            />
          </motion.div>

          {/* Luxury Ganpati Seal */}
          <motion.div
            onClick={handleOpen}
            animate={isOpening ? { scale: 0, opacity: 0 } : { scale: 1 }}
            whileHover={!isOpening ? { scale: 1.05, boxShadow: "0 0 25px rgba(212, 175, 55, 0.4)" } : {}}
            whileTap={!isOpening ? { scale: 0.95 } : {}}
            transition={isOpening ? { duration: 0.4 } : { duration: 0.3 }}
            style={{
              position: "absolute",
              top: "43%",
              left: "43%",
              transform: "translate(-50%, -50%)",
              width: "clamp(64px, 15vw, 80px)",
              height: "clamp(64px, 15vw, 80px)",
              borderRadius: "50%",
              background: "#FDFBF7",
              boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04), inset 0 0 20px rgba(212, 175, 55, 0.15)",
              zIndex: 10,
              cursor: "pointer",
              border: "3px solid #D4AF37",
              overflow: "hidden",
              padding: "2px",
            }}
          >
            {/* Gold gradient overlay for premium feel */}
            <div style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(circle at center, rgba(212, 175, 55, 0.05) 0%, rgba(212, 175, 55, 0.15) 100%)",
              pointerEvents: "none",
              zIndex: 2,
              borderRadius: "50%",
            }} />
            <img 
              src={ganpatiSeal} 
              alt="Ganpati Seal"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
                zIndex: 1,
                position: "relative",
              }}
            />
          </motion.div>
        </motion.div>

        {/* Action Hint */}
        {!isOpening && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 2, duration: 1.5 }}
            style={{
              marginTop: "2.5rem",
              fontFamily: "'Playfair Display', serif",
              fontSize: "13px",
              letterSpacing: "2px",
              color: COLORS.text,
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            Tap the seal to open
          </motion.div>
        )}
      </div>

      {/* Reveal Flash Overlay */}
      <AnimatePresence>
        {isRevealed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ position: "absolute", inset: 0, background: "#fff", zIndex: 100 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
