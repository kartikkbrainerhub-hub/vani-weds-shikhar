import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import confetti from "canvas-confetti";
import { WEDDING_CONFIG } from "../config";

// --- Particle System for the "Dust" while scratching ---
class ScratchParticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 2;
    this.speedY = (Math.random() - 0.5) * 2;
    this.opacity = 1;
    this.life = 1;
    this.decay = Math.random() * 0.03 + 0.02;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life -= this.decay;
    this.opacity = this.life;
  }
  draw(ctx) {
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = "#D4AF37";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const ScratchCard = ({ label, isRevealed, allRevealed, onReveal, index }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const particleCanvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPos, setLastPos] = useState(null);
  const particles = useRef([]);
  const requestRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    
    const setupCanvas = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      // Top Layer: Ivory Background
      ctx.fillStyle = "#f5efe6";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Centered Gold Dot
      const dotSize = 4;
      ctx.fillStyle = "#D4AF37";
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, dotSize, 0, Math.PI * 2);
      ctx.fill();
    };

    setupCanvas();

    const animateParticles = () => {
      const pCanvas = particleCanvasRef.current;
      if (pCanvas && containerRef.current) {
        const pCtx = pCanvas.getContext("2d");
        pCanvas.width = containerRef.current.offsetWidth;
        pCanvas.height = containerRef.current.offsetHeight;
        pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);
        particles.current = particles.current.filter(p => p.life > 0);
        particles.current.forEach(p => { p.update(); p.draw(pCtx); });
      }
      requestRef.current = requestAnimationFrame(animateParticles);
    };
    requestRef.current = requestAnimationFrame(animateParticles);
    return () => cancelAnimationFrame(requestRef.current);
  }, [isRevealed]);

  const getPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const scratch = (x, y) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const brushSize = 25;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, brushSize);
    gradient.addColorStop(0, "rgba(0,0,0,1)");
    gradient.addColorStop(0.5, "rgba(0,0,0,0.5)");
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, brushSize, 0, Math.PI * 2);
    ctx.fill();
    if (Math.random() > 0.7) particles.current.push(new ScratchParticle(x, y));
  };

  const handleMove = (e) => {
    if (!isDrawing || isRevealed) return;
    const currentPos = getPos(e);
    if (lastPos) {
      const dist = Math.hypot(currentPos.x - lastPos.x, currentPos.y - lastPos.y);
      const steps = Math.ceil(dist / 4);
      for (let i = 0; i < steps; i++) {
        const lerpX = lastPos.x + (currentPos.x - lastPos.x) * (i / steps);
        const lerpY = lastPos.y + (currentPos.y - lastPos.y) * (i / steps);
        scratch(lerpX, lerpY);
      }
    } else {
      scratch(currentPos.x, currentPos.y);
    }
    setLastPos(currentPos);
  };

  const checkReveal = useCallback(() => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;
    for (let i = 3; i < pixels.length; i += 4) if (pixels[i] < 50) transparent++;
    if ((transparent / (pixels.length / 4)) * 100 > 50) onReveal();
  }, [isRevealed, onReveal]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isRevealed && allRevealed ? { 
        boxShadow: "0 0 25px rgba(212, 175, 55, 0.4)",
        borderColor: "rgba(212, 175, 55, 0.6)",
        scale: 1,
        opacity: 1
      } : { opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className="relative w-24 h-32 md:w-28 md:h-36 bg-white rounded-[20px] border border-[#D4AF37]/30 shadow-sm overflow-hidden"
    >
      {/* Revealed Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isRevealed ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="font-['Playfair_Display'] text-2xl md:text-3xl text-[#3d2b1f] font-semibold"
        >
          {label}
        </motion.span>
      </div>

      {/* Scratch Layer */}
      <AnimatePresence>
        {!isRevealed && (
          <motion.div
            exit={{ opacity: 0, scale: 1.1, filter: "blur(8px)" }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 z-10"
          >
            <canvas
              ref={canvasRef}
              className="w-full h-full touch-none cursor-pointer"
              onMouseDown={(e) => { setIsDrawing(true); handleMove(e); }}
              onMouseMove={handleMove}
              onMouseUp={() => { setIsDrawing(false); setLastPos(null); checkReveal(); }}
              onMouseLeave={() => { setIsDrawing(false); setLastPos(null); }}
              onTouchStart={(e) => { setIsDrawing(true); handleMove(e); }}
              onTouchMove={handleMove}
              onTouchEnd={() => { setIsDrawing(false); setLastPos(null); checkReveal(); }}
            />
            <canvas ref={particleCanvasRef} className="absolute inset-0 pointer-events-none z-20" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function ScratchToRevealSection() {
  const [revealed, setRevealed] = useState([false, false, false]);
  const [allRevealed, setAllRevealed] = useState(false);
  const [showFinalDate, setShowFinalDate] = useState(false);
  const containerRef = useRef(null);

  // Listen for reset event from Thank You section
  useEffect(() => {
    const handleReset = () => {
      setRevealed([false, false, false]);
      setAllRevealed(false);
      setShowFinalDate(false);
    };
    window.addEventListener('reset-scratch', handleReset);
    return () => window.removeEventListener('reset-scratch', handleReset);
  }, []);

  const handleReveal = (index) => {
    const newRevealed = [...revealed];
    newRevealed[index] = true;
    setRevealed(newRevealed);
  };

  useEffect(() => {
    if (revealed.every(v => v === true) && !allRevealed) {
      setAllRevealed(true);
      setTimeout(() => {
        triggerLuxuryCelebration();
      }, 300);
    }
  }, [revealed, allRevealed]);

  const triggerLuxuryCelebration = () => {
    const gold = "#D4AF37";
    const softGold = "#f3d27a";
    const white = "#ffffff";
    const defaults = {
      spread: 360,
      ticks: 150,
      gravity: 0.8,
      decay: 0.95,
      startVelocity: 30,
      colors: [gold, softGold, white],
      shapes: ["circle"],
    };
    confetti({ ...defaults, particleCount: 40, scalar: 1.2 });
    const end = Date.now() + 2000;
    const frame = () => {
      confetti({ particleCount: 2, angle: 60, spread: 55, origin: { x: 0, y: 0 }, colors: [gold, softGold], gravity: 0.5, ticks: 200, scalar: 0.7 });
      confetti({ particleCount: 2, angle: 120, spread: 55, origin: { x: 1, y: 0 }, colors: [gold, softGold], gravity: 0.5, ticks: 200, scalar: 0.7 });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
    setTimeout(() => {
      setShowFinalDate(true);
    }, 2000);
  };

  return (
    <section 
      id="scratch-reveal"
      ref={containerRef}
      className="relative py-24 bg-[#fdfaf5] flex flex-col items-center justify-center overflow-hidden px-4 min-h-[400px]"
    >
      {/* Golden Glow Bridge Effect - appears during entry */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1.2 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.05)_0%,_transparent_70%)] z-0"
      />

      <AnimatePresence mode="wait">
        {!showFinalDate ? (
          <motion.div
            key="scratch-area"
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, transition: { duration: 1, ease: "easeInOut" } }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="font-['Cormorant_Garamond'] text-[#D4AF37] text-lg uppercase tracking-[0.4em] font-bold">
                Scratch to Reveal
              </h2>
            </motion.div>

            <div className="flex gap-4 md:gap-6 justify-center items-center mb-8">
              <ScratchCard 
                index={0} 
                label="14" 
                isRevealed={revealed[0]} 
                allRevealed={allRevealed}
                onReveal={() => handleReveal(0)} 
              />
              <ScratchCard 
                index={1} 
                label="May" 
                isRevealed={revealed[1]} 
                allRevealed={allRevealed}
                onReveal={() => handleReveal(1)} 
              />
              <ScratchCard 
                index={2} 
                label="2026" 
                isRevealed={revealed[2]} 
                allRevealed={allRevealed}
                onReveal={() => handleReveal(2)} 
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="final-reveal"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center py-10 relative z-10"
          >
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="font-['Cormorant_Garamond'] text-[#D4AF37] text-base uppercase tracking-[0.5em] mb-4 font-bold"
            >
              Save the Date
            </motion.p>
            
            <div className="relative">
              <div className="absolute inset-0 bg-[#D4AF37]/10 blur-2xl rounded-full scale-150" />
              <h2 className="relative z-10 font-['Playfair_Display'] text-4xl md:text-6xl text-[#3d2b1f] tracking-[0.05em] font-medium">
                14 <span className="text-[#D4AF37] mx-2">•</span> May <span className="text-[#D4AF37] mx-2">•</span> 2026
              </h2>
            </div>

            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 60 }}
              transition={{ delay: 1, duration: 1 }}
              className="h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-8" 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
