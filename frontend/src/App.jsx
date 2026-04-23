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
        >
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
              padding: "2rem 1.5rem",
              textAlign: "center",
              borderTop: "1px solid rgba(234,179,8,0.2)",
            }}
          >
            <p
              style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: "1.1rem",
                color: "#eab308",
                margin: "0 0 0.5rem",
              }}
            >
              Made with ❤️ for Arjun &amp; Priya
            </p>
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "0.75rem",
                color: "rgba(253,250,245,0.4)",
                margin: 0,
                letterSpacing: "0.1em",
              }}
            >
              #ArjunWedsPriya · December 20, 2026
            </p>
          </footer>

          {/* Floating music player */}
          <MusicPlayer />
        </motion.div>
      )}
    </>
  );
}
