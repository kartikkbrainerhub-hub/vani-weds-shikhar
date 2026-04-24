import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, VolumeX } from "lucide-react";
import weddingMusic from "../assets/music/Jashn.mp3";

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const fadeIntervalRef = useRef(null);

  // Smooth volume transition helper
  const fadeVolume = (targetVolume, duration = 3000) => {
    if (!audioRef.current) return;
    
    clearInterval(fadeIntervalRef.current);
    
    const startVolume = audioRef.current.volume;
    const steps = 60;
    const stepTime = duration / steps;
    const volumeStep = (targetVolume - startVolume) / steps;
    let currentStep = 0;

    fadeIntervalRef.current = setInterval(() => {
      currentStep++;
      const nextVolume = Math.max(0, Math.min(1, startVolume + volumeStep * currentStep));
      audioRef.current.volume = nextVolume;

      if (currentStep >= steps) {
        clearInterval(fadeIntervalRef.current);
        audioRef.current.volume = targetVolume;
      }
    }, stepTime);
  };

  useEffect(() => {
    const handleStartMusic = () => {
      if (audioRef.current && !isStarted) {
        audioRef.current.volume = 0;
        audioRef.current.play()
          .then(() => {
            setIsStarted(true);
            setIsPlaying(true);
            fadeVolume(0.48); // Targeted 45-50% volume
          })
          .catch((err) => {
            console.log("Autoplay blocked. Waiting for first interaction...", err);
          });
      }
    };

    window.addEventListener("music-start", handleStartMusic);

    return () => {
      window.removeEventListener("music-start", handleStartMusic);
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    };
  }, [isStarted]);

  const togglePlayback = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      fadeVolume(0, 1000);
      setTimeout(() => {
        if (audioRef.current) audioRef.current.pause();
        setIsPlaying(false);
      }, 1050);
    } else {
      if (!isStarted) setIsStarted(true);
      audioRef.current.play();
      setIsPlaying(true);
      fadeVolume(0.48, 1500);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        loop
        src={weddingMusic}
        preload="auto"
      />

      <AnimatePresence>
        {isStarted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            style={{
              position: "fixed",
              bottom: "1.5rem",
              right: "1.5rem",
              zIndex: 9999,
            }}
          >
            <motion.button
              onClick={togglePlayback}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={isPlaying ? "Pause Music" : "Play Music"}
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.7)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(212, 175, 55, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 32px rgba(212, 175, 55, 0.1)",
                color: "#ca8a04",
                cursor: "pointer",
                position: "relative",
                outline: "none",
              }}
            >
              {isPlaying ? (
                <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  >
                    <Music size={18} />
                  </motion.div>
                  
                  {/* Subtle animated music bars */}
                  <div 
                    style={{ 
                      position: "absolute", 
                      bottom: "-8px", 
                      display: "flex", 
                      alignItems: "flex-end", 
                      gap: "2px",
                      height: "8px"
                    }}
                  >
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ height: ["20%", "100%", "20%"] }}
                        transition={{ 
                          duration: 0.6 + (i * 0.15), 
                          repeat: Infinity, 
                          ease: "easeInOut" 
                        }}
                        style={{
                          width: "2px",
                          backgroundColor: "#ca8a04",
                          borderRadius: "1px"
                        }}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <VolumeX size={18} style={{ opacity: 0.6 }} />
              )}
              
              {/* Premium glow effect when playing */}
              {isPlaying && (
                <motion.div
                  animate={{ opacity: [0.1, 0.3, 0.1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  style={{
                    position: "absolute",
                    inset: "-4px",
                    background: "radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, transparent 70%)",
                    borderRadius: "50%",
                    zIndex: -1,
                  }}
                />
              )}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
