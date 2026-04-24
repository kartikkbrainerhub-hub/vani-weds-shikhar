import React from "react";
import { motion } from "framer-motion";
import { WEDDING_CONFIG } from "../config";
import { Heart, MapPin, Gem, PartyPopper } from "lucide-react";

const StoryItem = ({ item, index }) => {
  const icons = [
    <MapPin size={32} strokeWidth={1.5} />,
    <Heart size={32} strokeWidth={1.5} />,
    <Gem size={32} strokeWidth={1.5} />,
    <PartyPopper size={32} strokeWidth={1.5} />
  ];

  return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: index * 0.1 }}
        className="flex flex-col items-center text-center mb-16 last:mb-0 px-4"
      >
        {/* Icon Circle */}
        <div className="relative mb-4">
          <div className="absolute inset-0 bg-[#D4AF37]/10 blur-xl rounded-full scale-150" />
          <div className="w-16 h-16 rounded-full bg-white border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] relative z-10 shadow-sm">
            {React.cloneElement(icons[index % icons.length], { size: 24 })}
          </div>
        </div>
        
        {/* Year & Title */}
        <div className="mb-2">
          <span className="font-['Playfair_Display'] text-[10px] text-[#D4AF37] uppercase tracking-[0.3em] block mb-1 font-bold">
            {item.year}
          </span>
          <h3 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold text-[#3d2b1f]">
            {item.title}
          </h3>
        </div>
        
        {/* Description */}
        <p className="font-['Cormorant_Garamond'] text-[#7a6052] text-lg md:text-xl leading-relaxed italic max-w-xs md:max-w-md">
          {item.text}
        </p>
        
        {/* Connecting Line / Divider */}
        {index < 3 && (
          <div className="w-px h-12 bg-gradient-to-b from-[#D4AF37]/50 to-transparent mt-8" />
        )}
      </motion.div>
    );
  };
  
  export default function StorySection() {
    const { story } = WEDDING_CONFIG;
  
    return (
      <section id="story" className="section-padding bg-[#fdfaf5] overflow-hidden relative border-t border-[#D4AF37]/10">
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <span className="font-['Dancing_Script'] text-xl text-[#D4AF37] block mb-1">
              Our Journey
            </span>
            <h2 className="font-['Playfair_Display'] text-4xl md:text-6xl font-bold text-[#3d2b1f]">
              How It Begins
            </h2>
            <div className="gold-divider mt-6" />
          </motion.div>
  
          <div className="flex flex-col items-center">
            {story.map((item, index) => (
              <StoryItem key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>
  );
}
