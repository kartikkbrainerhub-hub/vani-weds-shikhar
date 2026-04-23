import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { WEDDING_CONFIG } from "../config";
import vinayakImg from "../assets/images/Vianyak.png";

export default function HeroSection() {
  const { groom, bride, tagline, hashtag } = WEDDING_CONFIG;
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Layer 1: Ganpati + Shlok (Top)
  // 0-30%: visible
  // 30-70%: slight fade and move up
  // 85-100%: fade out completely for next section
  const topOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 0.85, 1], [1, 1, 0.15, 0.15, 0]);
  const topY = useTransform(scrollYProgress, [0, 0.3, 0.7], [0, 0, -40]);

  // Layer 2: Hero Content (Center)
  // 0-30%: hidden
  // 30-70%: fade in, slide up
  // 85-100%: fade out
  const heroOpacity = useTransform(scrollYProgress, [0.3, 0.7, 0.85, 1], [0, 1, 1, 0]);
  const heroY = useTransform(scrollYProgress, [0.3, 0.7], [60, 0]);

  // Layer 3: Couple Photo (Bottom)
  // 0-30%: visible
  // 30-70%: slight fade
  // 85-100%: fade out
  const bottomOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 0.85, 1], [1, 1, 0.25, 0.25, 0]);

  // Scroll Indicator for the next section
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0.7, 0.85, 1], [0, 1, 0]);

  return (
    <section ref={containerRef} id="hero" className="relative h-[220vh] bg-[#fdfaf5]">
      {/* Sticky container that stays fixed while scrolling */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        
        {/* Background Gradients & Textures */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#fdf6e3] via-[#faf0e6] to-[#fff5f7] -z-10" />
        <div
          className="absolute inset-0 opacity-[0.15] -z-10"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(234,179,8,0.12)_0%,transparent_70%)] -z-10" />

        {/* LAYER 1: Top Content (Ganpati & Shlok) */}
        <motion.div 
          style={{ opacity: topOpacity, y: topY }}
          className="absolute top-[6%] md:top-[8%] left-0 w-full flex flex-col items-center justify-center z-20 px-4"
        >
          <img 
            src={vinayakImg} 
            alt="Vinayak" 
            className="w-12 h-12 md:w-16 md:h-16 object-contain drop-shadow-[0_4px_10px_rgba(212,175,55,0.4)] mb-3" 
          />
          <p className="font-['Cormorant_Garamond'] font-serif text-sm md:text-base text-[#a37e46] text-center leading-relaxed">
            वक्रतुण्ड महाकाय
            सूर्यकोटि समप्रभ ।<br/>
            निर्विघ्नं कुरु मे देव
            सर्वकार्येषु सर्वदा ॥
          </p>
        </motion.div>

        {/* LAYER 2: Hero Content (Center Reveal) */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center w-full px-4 text-center pointer-events-none"
        >
          <div className="pointer-events-auto flex flex-col items-center justify-center">
            <p className="font-['Dancing_Script'] text-2xl md:text-4xl text-[#ca8a04] mb-4 md:mb-6">
              The wedding of
            </p>
            
            <div className="flex flex-col items-center mb-6 md:mb-8">
              <h1 className="font-['Playfair_Display'] text-6xl md:text-8xl lg:text-9xl font-bold text-[#3d2b1f] leading-none tracking-tight">
                {groom}
              </h1>
              <span className="font-['Dancing_Script'] text-5xl md:text-7xl text-[#ca8a04] my-1 md:-my-4">
                &amp;
              </span>
              <h1 className="font-['Playfair_Display'] text-6xl md:text-8xl lg:text-9xl font-bold text-[#3d2b1f] leading-none tracking-tight">
                {bride}
              </h1>
            </div>

            <p className="font-['Lato'] text-sm md:text-base text-[#7a6052] italic max-w-md mx-auto mb-6 md:mb-8 leading-relaxed">
              {tagline}
            </p>

            <span className="font-['Dancing_Script'] text-xl md:text-2xl text-[#ca8a04] bg-yellow-500/10 px-8 py-2 rounded-full border border-yellow-500/30">
              {hashtag}
            </span>
          </div>
          
          {/* Scroll Indicator at the bottom of Layer 2 */}
          <motion.div style={{ opacity: scrollIndicatorOpacity }} className="absolute bottom-6 md:bottom-10">
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] tracking-[0.3em] text-[#ca8a04] uppercase font-['Lato'] font-bold">
                Scroll to discover
              </span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-px h-10 bg-gradient-to-b from-[#ca8a04] to-transparent"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* LAYER 3: Couple Photo (Bottom) */}
        <motion.div 
          style={{ opacity: bottomOpacity }}
          className="absolute bottom-0 left-0 w-full flex justify-center z-10"
        >
          {/* Elegant arched photo container */}
          <div className="w-40 h-48 md:w-56 md:h-64 rounded-t-[100px] overflow-hidden border-t-[3px] border-x-[3px] border-[#D4AF37]/60 shadow-[0_-10px_30px_rgba(0,0,0,0.1)] bg-[#FDFBF7]">
            <img 
              src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80" 
              alt="Couple" 
              className="w-full h-full object-cover filter contrast-125 saturate-50" 
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
