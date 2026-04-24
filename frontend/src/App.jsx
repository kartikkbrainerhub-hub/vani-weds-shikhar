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
import RSVPSection from "./components/RSVPSection";
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
          className="min-h-screen bg-stone-100/30"
        >
          <div className="max-w-[420px] mx-auto bg-white shadow-[0_0_100px_rgba(0,0,0,0.1)] relative min-h-screen">
            <main>
              <HeroSection />
              <ScratchToRevealSection />
              <StorySection />
              <GallerySection />
              <EventDetails />
              <CountdownTimer />
              <LocationSection />
              <RSVPSection />
              <ThankYouSection />
            </main>

            {/* Footer */}
            <footer
              style={{
                background: "#2a1a0f",
                padding: "3rem 1.5rem",
                textAlign: "center",
                borderTop: "1px solid rgba(234,179,8,0.1)",
              }}
            >
              <p
                style={{
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: "1.2rem",
                  color: "#D4AF37",
                  margin: "0 0 0.5rem",
                }}
              >
                Made with ❤️ for Shikhar & Vani
              </p>
              <p
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: "0.7rem",
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
