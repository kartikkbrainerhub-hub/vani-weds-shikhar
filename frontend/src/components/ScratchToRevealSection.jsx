import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const ScratchCircle = ({ label, isRevealed, onReveal }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    const setupCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      // Premium gold foil gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "#d4af37");
      gradient.addColorStop(0.5, "#f9f2d1");
      gradient.addColorStop(1, "#c5a017");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Subtle texture overlay
      for (let i = 0; i < canvas.width * canvas.height * 0.04; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        ctx.fillStyle = Math.random() > 0.5 ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.05)";
        ctx.fillRect(x, y, 1.5, 1.5);
      }
      
      // Reset composite for future scratch erasing
      ctx.globalCompositeOperation = "source-over";
    };

    setupCanvas();
    
    // Ensure canvas stays accurate if resized before scratch
    const handleResize = () => setupCanvas();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isRevealed]);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if (e.touches && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const checkReveal = () => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] < 128) {
        transparentPixels++;
      }
    }

    const percentage = (transparentPixels / (pixels.length / 4)) * 100;
    // Fast interaction threshold (~25%)
    if (percentage > 25) {
      onReveal();
    }
  };

  const handleStart = (e) => {
    if (isRevealed) return;
    setIsDrawing(true);
    scratch(e);
  };

  const handleEnd = () => {
    setIsDrawing(false);
    checkReveal();
  };

  const scratch = (e) => {
    if (!isDrawing || isRevealed) return;
    const { x, y } = getCoordinates(e);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 24, 0, Math.PI * 2); // Brush size
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
  };

  return (
    <motion.div
      layout
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className="relative w-36 h-36 md:w-44 md:h-44 rounded-full shadow-lg flex-shrink-0"
    >
      {/* Background Revealed Value */}
      <div className="absolute inset-0 rounded-full bg-white flex items-center justify-center border border-yellow-200/60 shadow-inner">
        <span className="font-['Playfair_Display'] text-3xl md:text-4xl text-stone-800 tracking-wider">
          {label}
        </span>
      </div>

      {/* Foreground Canvas Cover */}
      <AnimatePresence>
        {!isRevealed && (
          <motion.canvas
            ref={canvasRef}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full rounded-full cursor-pointer z-10"
            style={{ touchAction: "none" }}
            onMouseDown={handleStart}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onMouseMove={scratch}
            onTouchStart={handleStart}
            onTouchEnd={handleEnd}
            onTouchMove={scratch}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function ScratchToRevealSection() {
  const [revealedItems, setRevealedItems] = useState([]);
  const [showFinal, setShowFinal] = useState(false);

  const triggerFirecracker = () => {
    // Elegant gold firework burst
    confetti({
      particleCount: 120,
      spread: 360,
      origin: { y: 0.5 },
      colors: ["#d4af37", "#f9f2d1", "#c5a017", "#ffffff"],
      shapes: ["circle"],
      scalar: 0.8,
      ticks: 120,
      startVelocity: 40,
      disableForReducedMotion: true,
    });
  };

  const handleReveal = (item) => {
    if (revealedItems.includes(item)) return;

    const newRevealed = [...revealedItems, item];
    setRevealedItems(newRevealed);

    if (newRevealed.length === 3) {
      setTimeout(() => {
        setShowFinal(true);
        // Trigger burst immediately when final text shows up
        setTimeout(() => triggerFirecracker(), 200);
      }, 1000); // Quick wait after the 3rd scratch before merging
    }
  };

  return (
    <section className="min-h-[50vh] py-24 bg-[#faf9f6] flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full max-w-4xl mx-auto px-4 flex items-center justify-center min-h-[250px]">
        <AnimatePresence mode="wait">
          {!showFinal ? (
            <motion.div
              key="circles-container"
              exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="w-full"
            >
              <motion.div
                layout
                className="flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-center"
              >
                {/* Circle 1: Year */}
                <ScratchCircle
                  label="2026"
                  isRevealed={revealedItems.includes("year")}
                  onReveal={() => handleReveal("year")}
                />

                {/* Circle 2: Month */}
                <AnimatePresence>
                  {revealedItems.includes("year") && (
                    <ScratchCircle
                      label="May"
                      isRevealed={revealedItems.includes("month")}
                      onReveal={() => handleReveal("month")}
                    />
                  )}
                </AnimatePresence>

                {/* Circle 3: Day */}
                <AnimatePresence>
                  {revealedItems.includes("month") && (
                    <ScratchCircle
                      label="14"
                      isRevealed={revealedItems.includes("day")}
                      onReveal={() => handleReveal("day")}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="final-text"
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-center z-10"
            >
              <h2 className="font-['Playfair_Display'] text-5xl md:text-7xl lg:text-8xl text-[#3d2b1f] tracking-widest font-medium drop-shadow-sm">
                14 <span className="text-[#c5a017] italic font-light">May</span> 2026
              </h2>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
