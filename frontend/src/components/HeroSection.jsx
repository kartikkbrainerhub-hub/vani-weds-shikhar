import React from "react";
import { motion } from "framer-motion";
import { WEDDING_CONFIG } from "../config";
import heroBg from "../assets/images/hero-floral-bg.png";
import vinayak from "../assets/images/Vianyak.png";

const GanpatiIcon = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.2, ease: "easeOut" }}
    className="mb-4 mt-8 md:mt-12"
  >
    <div className="relative">
      <div className="absolute inset-0 bg-[#D4AF37]/20 blur-2xl rounded-full scale-150" />
      <img 
        src={vinayak} 
        alt="Vinayak" 
        className="w-[60px] relative z-10 drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]"
      />
    </div>
  </motion.div>
);

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
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#fdfaf5] px-6"
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

      {/* --- TOP ZONE (Anchored near top) --- */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        custom={1}
        className="absolute top-[30px] md:top-[50px] z-20 flex flex-col items-center px-4 w-full"
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative mb-2.5"
        >
          <div className="absolute inset-0 bg-[#D4AF37]/15 blur-3xl rounded-full scale-150" />
          <img 
            src={vinayak} 
            alt="Vinayak" 
            style={{ 
              width: "clamp(48px, 12vw, 64px)",
              filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.1))" 
            }}
            className="relative z-10"
          />
        </motion.div>
        
        {/* Vakratunda Mahakaya Shloka */}
        <div className="text-center max-w-[320px] md:max-w-xl">
          <p className="font-['Cormorant_Garamond'] text-[#D4AF37] text-[clamp(14px,3.5vw,16px)] leading-[1.7] tracking-wider opacity-90 font-medium whitespace-pre-line drop-shadow-[0_0_8px_rgba(212,175,55,0.25)]">
            वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।{"\n"}
            निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥
          </p>
        </div>
      </motion.div>

      {/* --- CENTER ZONE (Perfectly centered focus) --- */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        custom={2}
        className="relative z-20 flex flex-col items-center"
      >
        {/* Shimmering focus behind names */}
        <div className="absolute w-[300px] h-[300px] bg-[#D4AF37]/10 blur-[80px] rounded-full z-0" />
        
        <div className="relative z-10 flex flex-col items-center gap-y-2 md:gap-y-3">
          <h1 className="font-['Great_Vibes'] text-7xl md:text-9xl text-[#5a1a1a] leading-none">
            {bride}
          </h1>
          <span className="font-['Great_Vibes'] text-3xl md:text-4xl text-[#5a1a1a] opacity-60">
            &
          </span>
          <h1 className="font-['Great_Vibes'] text-7xl md:text-9xl text-[#5a1a1a] leading-none">
            {groom}
          </h1>
          
          <p className="font-['Cormorant_Garamond'] text-[#8c7a6b] text-base md:text-lg italic tracking-widest mt-4">
            "Two souls, one beautiful journey"
          </p>
        </div>
      </motion.div>

      {/* --- BOTTOM ZONE (Anchored action area) --- */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        custom={3}
        className="absolute bottom-[40px] z-20 flex flex-col items-center"
      >
        {/* Hashtag */}
        <span className="font-['Dancing_Script'] text-2xl text-[#D4AF37] italic font-bold tracking-[0.15em] mb-4">
          {hashtag}
        </span>

        {/* Scroll Indicator (Refined spacing) */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-px h-8 bg-gradient-to-b from-[#D4AF37] to-transparent relative">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-1 -left-[3px] w-[7px] h-[7px] bg-[#D4AF37] rounded-full shadow-[0_0_10px_rgba(212,175,55,0.4)]"
            />
          </div>
          <span className="text-[9px] tracking-[0.35em] text-[#D4AF37] uppercase font-bold opacity-50 mt-4">
            Scroll to Begin
          </span>
        </div>
      </motion.div>

    </section>
  );
}

