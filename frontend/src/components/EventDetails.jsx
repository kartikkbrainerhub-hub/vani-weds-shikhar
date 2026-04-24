import React from "react";
import { motion } from "framer-motion";
import { WEDDING_CONFIG } from "../config";
import { MapPin, Clock, Calendar, ExternalLink } from "lucide-react";

const EventCard = ({ event, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative group"
    >
      <div className={`h-full luxury-card p-8 md:p-10 bg-white border-none shadow-sm group-hover:shadow-xl transition-all duration-500 flex flex-col items-center text-center overflow-hidden`}>
        
        {/* Invite Only Badge */}
        <div className="absolute top-4 right-4 bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full border border-[#D4AF37]/20">
          {event.label}
        </div>

        {/* Icon/Emoji */}
        <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-500">
          {event.icon}
        </div>

        {/* Title */}
        <h3 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold text-[#3d2b1f] mb-6">
          {event.title}
        </h3>

        {/* Details List */}
        <div className="space-y-4 w-full mb-8">
          <div className="flex items-center justify-center gap-3 text-[#7a6052]">
            <Calendar size={18} className="text-[#D4AF37]" />
            <span className="font-['Lato'] text-sm md:text-base font-semibold">{event.date}</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-[#7a6052]">
            <Clock size={18} className="text-[#D4AF37]" />
            <span className="font-['Lato'] text-sm md:text-base">{event.time}</span>
          </div>
          <div className="flex flex-col items-center gap-2 text-[#7a6052]">
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-[#D4AF37]" />
              <span className="font-['Playfair_Display'] text-lg font-bold text-[#3d2b1f]">{event.venue}</span>
            </div>
            {event.address && (
              <p className="font-['Lato'] text-xs text-[#9b8ea0] max-w-[200px] leading-relaxed">
                {event.address}
              </p>
            )}
          </div>
        </div>

        {/* View Location Link */}
        <motion.a
          href={event.mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto text-[#D4AF37] text-xs font-bold tracking-widest uppercase border-b border-[#D4AF37]/40 pb-1 hover:border-[#D4AF37] transition-all duration-300"
        >
          View Location
        </motion.a>
      </div>
    </motion.div>
  );
};

export default function EventDetails() {
  const { events } = WEDDING_CONFIG;

  return (
    <section id="events" className="section-padding bg-[#fdfaf5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="font-['Dancing_Script'] text-2xl text-[#D4AF37] block mb-2">
            Wedding
          </span>
          <h2 className="font-['Playfair_Display'] text-5xl md:text-7xl font-bold text-[#3d2b1f]">
            Celebrations
          </h2>
          <div className="w-24 h-px bg-[#D4AF37] mx-auto mt-8 opacity-40" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>
      
      {/* Decorative floral elements could be added here if needed */}
    </section>
  );
}
