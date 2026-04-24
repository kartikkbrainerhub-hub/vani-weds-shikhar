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
      className="flex flex-col items-center text-center mb-20 last:mb-0 px-4"
    >
      {/* Icon Circle */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-[#D4AF37]/10 blur-xl rounded-full scale-150" />
        <div className="w-20 h-20 rounded-full bg-white border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] relative z-10 shadow-sm">
          {icons[index % icons.length]}
        </div>
      </div>
      
      {/* Year & Title */}
      <div className="mb-4">
        <span className="font-['Playfair_Display'] text-xs text-[#D4AF37] uppercase tracking-[0.3em] block mb-2 font-bold">
          {item.year}
        </span>
        <h3 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#3d2b1f]">
          {item.title}
        </h3>
      </div>
      
      {/* Description */}
      <p className="font-['Cormorant_Garamond'] text-[#7a6052] text-xl md:text-2xl leading-relaxed italic max-w-xs md:max-w-md">
        {item.text}
      </p>
      
      {/* Connecting Line */}
      {index < 3 && (
        <div className="w-px h-16 bg-gradient-to-b from-[#D4AF37]/50 to-transparent mt-12" />
      )}
    </motion.div>
  );
};

export default function StorySection() {
  const { story } = WEDDING_CONFIG;

  return (
    <section id="story" className="section-padding bg-[#fdfaf5] overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-[#D4AF37] rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-[#5a1a1a] rounded-full blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <span className="font-['Dancing_Script'] text-2xl text-[#D4AF37] block mb-2">
            Our Journey
          </span>
          <h2 className="font-['Playfair_Display'] text-5xl md:text-7xl font-bold text-[#3d2b1f]">
            How It Begins
          </h2>
          <div className="w-16 h-px bg-[#D4AF37] mx-auto mt-6 opacity-40" />
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
