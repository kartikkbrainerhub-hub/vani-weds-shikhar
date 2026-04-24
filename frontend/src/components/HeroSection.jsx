import React from "react";
import { motion } from "framer-motion";
import { WEDDING_CONFIG } from "../config";
import heroBg from "../assets/images/hero-floral-bg.png";
import vinayak from "../assets/images/Vianyak.png";

const FloatingPetals = () => {
  const colors = ["#FFD1DC", "#FADADD", "#FFE4E1", "#FFF0F5", "#E6C79C"];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {[...Array(35)].map((_, i) => {
        const color = colors[i % colors.length];
        const size = Math.random() * 12 + 8;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            initial={{ 
              top: "-5%", 
              left: `${Math.random() * 100}%`,
              scale: Math.random() * 0.6 + 0.6,
              opacity: 0.8,
              backgroundColor: color,
              filter: "blur(0.4px) drop-shadow(0 0 3px rgba(255,182,193,0.3))"
            }}
            animate={{ 
              top: "105%", 
              left: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
              x: [0, Math.random() * 100 - 50, 0]
            }}
            transition={{ 
              top: { duration: 12 + Math.random() * 18, repeat: Infinity, ease: "linear" },
              rotate: { duration: 8 + Math.random() * 12, repeat: Infinity, ease: "linear" },
              x: { duration: 6 + Math.random() * 6, repeat: Infinity, ease: "easeInOut" },
              delay: Math.random() * 15
            }}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%" // Petal shape
            }}
          />
        );
      })}
    </div>
  );
};

export default function HeroSection() {
  const { groom, bride, hashtag } = WEDDING_CONFIG;

  const sectionVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (custom) => ({
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        delay: custom * 0.2, 
        ease: [0.21, 0.45, 0.32, 0.9] 
      }
    })
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#fdfaf5] px-6 py-10"
    >
      
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#fdfaf5] via-transparent to-[#fdfaf5] opacity-80 z-10" />
        <img 
          src={heroBg} 
          alt="Wedding Background" 
          className="w-full h-full object-cover opacity-20 blur-[1px]" 
        />
      </div>

      {/* Floating Petals */}
      <FloatingPetals />

      {/* Main Content Container */}
      <div className="relative z-20 flex flex-col items-center w-full max-w-sm mx-auto">
        
        {/* 1. Ganesh Icon */}
        <motion.div 
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          custom={1}
          className="relative mt-1"
        >
          <div className="absolute inset-0 bg-[#C5A059]/15 blur-3xl rounded-full scale-150" />
          <img 
            src={vinayak} 
            alt="Vinayak" 
            style={{ 
              width: "clamp(85px, 22vw, 110px)",
              filter: "drop-shadow(0 2px 8px rgba(197,160,89,0.2))" 
            }}
            className="relative z-10"
          />
        </motion.div>
        
        {/* 2. Slok */}
        <motion.div 
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          custom={1.4}
          className="text-center mb-10"
        >
          <p className="font-['Cormorant_Garamond'] text-[#C5A059] text-[clamp(17px,4.2vw,20px)] leading-[1.8] tracking-[0.1em] font-light whitespace-pre-line">
            वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।{"\n"}
            निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥{"\n\n"}
          </p>
        </motion.div>

        {/* 3 & 4. Names - Focal Point */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          custom={1.8}
          className="flex flex-col items-center mb-12"
        >
          <div className="absolute w-[280px] h-[280px] bg-[#C5A059]/10 blur-[80px] rounded-full -z-10" />
          <h1 className="font-['Great_Vibes'] text-[clamp(5rem,18vw,7.5rem)] text-[#5a1a1a] leading-[0.9]">
            {bride}
          </h1>
          <span className="font-['Great_Vibes'] text-3xl md:text-4xl text-[#5a1a1a] opacity-40 my-3">
            &
          </span>
          <h1 className="font-['Great_Vibes'] text-[clamp(5rem,18vw,7.5rem)] text-[#5a1a1a] leading-[0.9]">
            {groom}
          </h1>
        </motion.div>

        {/* 5. Romantic line */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          custom={2.2}
          className="mb-8"
        >
          <p className="font-['Cormorant_Garamond'] text-[#8c7a6b] text-[clamp(1rem,4vw,1.15rem)] italic tracking-[0.2em] text-center opacity-80">
            "Two souls, one beautiful journey"
          </p>
        </motion.div>

        {/* 6. Hashtag */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          custom={2.6}
          className="mb-12"
        >
          <span className="font-['Dancing_Script'] text-2xl text-[#C5A059] italic font-bold tracking-[0.2em]">
            {hashtag}
          </span>
        </motion.div>

        {/* 7. Scroll indicator */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          custom={3}
          className="flex flex-col items-center gap-3"
        >
          <div className="w-px h-10 bg-gradient-to-b from-[#C5A059] to-transparent relative">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-1 -left-[3px] w-[7px] h-[7px] bg-[#C5A059] rounded-full shadow-[0_0_10px_rgba(197,160,89,0.4)]"
            />
          </div>
          <span className="text-[10px] tracking-[0.4em] text-[#C5A059] uppercase font-bold opacity-40">
            Scroll to Begin
          </span>
        </motion.div>

      </div>
    </section>
  );
}

