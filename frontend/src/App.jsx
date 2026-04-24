import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import OpeningAnimation from "./components/OpeningAnimation";
import HeroSection from "./components/HeroSection";
import ScratchToRevealSection from "./components/ScratchToRevealSection";
import StorySection from "./components/StorySection";
import GallerySection from "./components/GallerySection";
import EventDetails from "./components/EventDetails";
import CountdownTimer from "./components/CountdownTimer";
import LocationSection from "./components/LocationSection";
import ThankYouSection from "./components/ThankYouSection";
import MusicPlayer from "./components/MusicPlayer";

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {/* Opening envelope animation */}
      <AnimatePresence>
        {showIntro && (
          <OpeningAnimation onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      {/* Main site */}
      {!showIntro && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="min-h-screen bg-stone-100/30 overflow-x-hidden"
        >
          {/* Global Floating Petals */}
          <div className="fixed inset-0 pointer-events-none z-[50] overflow-hidden opacity-40">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{ 
                  top: "-10%", 
                  left: `${Math.random() * 100}%`,
                  opacity: 0.3,
                  scale: Math.random() * 0.5 + 0.5
                }}
                animate={{ 
                  top: "110%", 
                  left: `${Math.random() * 100}%`,
                  rotate: 360,
                }}
                transition={{ 
                  duration: 20 + Math.random() * 20, 
                  repeat: Infinity, 
                  ease: "linear",
                  delay: Math.random() * 20
                }}
                style={{
                  width: "12px",
                  height: "12px",
                  background: i % 2 === 0 ? "#D4AF37" : "#FFD1DC",
                  borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
                  filter: "blur(0.5px)"
                }}
              />
            ))}
          </div>
          <div className="max-w-[420px] mx-auto bg-white shadow-[0_0_100px_rgba(0,0,0,0.1)] relative min-h-screen">
            <main>
              <HeroSection />
              <div className="gold-divider" />
              <ScratchToRevealSection />
              <div className="gold-divider" />
              <StorySection />
              <div className="gold-divider" />
              <GallerySection />
              <div className="gold-divider" />
              <EventDetails />
              <div className="gold-divider" />
              <CountdownTimer />
              <div className="gold-divider" />
              <LocationSection />
              <div className="gold-divider" />
              <ThankYouSection />
            </main>

            {/* Footer */}
            <footer
              style={{
                background: "#2a1a0f",
                padding: "2rem 1.5rem",
                textAlign: "center",
                borderTop: "1px solid rgba(234,179,8,0.1)",
              }}
            >
              <p
                style={{
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: "1.1rem",
                  color: "#D4AF37",
                  margin: "0 0 0.25rem",
                }}
              >
                Made with ❤️ for Shikhar & Vani
              </p>
              <p
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: "0.65rem",
                  color: "rgba(253,250,245,0.3)",
                  margin: 0,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase"
                }}
              >
                #ShiVa · May 14, 2026
              </p>
            </footer>
          </div>

          {/* Floating music player */}
          <MusicPlayer />
        </motion.div>
      )}
    </>
  );
}
