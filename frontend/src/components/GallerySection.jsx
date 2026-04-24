import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import {GalleryPhotos} from "../assets/images";

const galleryPhotos = [
  {
    src:GalleryPhotos.pic1,
    alt: "Wedding flowers",
  },
  {
    src:GalleryPhotos.pic2,
    alt: "Couple portrait",
  },
  {
    src: GalleryPhotos.pic3,
    alt: "Wedding rings",
  },
  {
    src: GalleryPhotos.pic4,
    alt: "Wedding ceremony",
  },
  {
    src:GalleryPhotos.pic5,
    alt: "Couple dancing",
  },
  {
    src:GalleryPhotos.pic6,
    alt: "Bride and groom",
  },
  {
    src:GalleryPhotos.pic7,
    alt: "Wedding decoration",
  },
  ];

const LetterByLetterTitle = ({ text }) => {
  const letters = Array.from(text);
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  return (
    <motion.h2
      style={{ display: "flex", overflow: "hidden", justifyContent: "center", flexWrap: "wrap" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="font-['Playfair_Display'] text-4xl md:text-6xl font-bold text-[#4a2c2a]"
    >
      {letters.map((letter, index) => (
        <motion.span variants={child} key={index}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.h2>
  );
};

export default function GallerySection() {
  const [index, setIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState(null);

  const nextSlide = useCallback(() => {
    setIndex((prev) => (prev + 1) % galleryPhotos.length);
  }, []);

  const prevSlide = useCallback(() => {
    setIndex((prev) => (prev - 1 + galleryPhotos.length) % galleryPhotos.length);
  }, []);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(nextSlide, 3500);
      return () => clearInterval(interval);
    }
  }, [nextSlide, isHovered]);

  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    if (touchStart - touchEnd > 50) nextSlide();
    if (touchStart - touchEnd < -50) prevSlide();
    setTouchStart(null);
  };

  return (
    <section 
      id="gallery" 
      className="section-padding bg-[#f9f6f1] relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#4a2c2a] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="font-['Dancing_Script'] text-xl text-[#d4af37] block mb-1">
            Captured Moments
          </span>
          <LetterByLetterTitle text="Our Photo Gallery" />
          
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#d4af37]" />
            <span className="text-[#d4af37] text-lg flex gap-1">
              ✨ <span className="text-[#4a2c2a] opacity-60">📷</span> ✨
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#d4af37]" />
          </div>
        </motion.div>

        {/* 3D Carousel Container */}
        <div 
          className="relative h-[400px] md:h-[550px] w-full flex items-center justify-center perspective-[1200px]"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {galleryPhotos.map((photo, i) => {
              // Calculate relative position from current index
              let offset = i - index;
              if (offset < -galleryPhotos.length / 2) offset += galleryPhotos.length;
              if (offset > galleryPhotos.length / 2) offset -= galleryPhotos.length;

              const isCenter = i === index;
              const isVisible = Math.abs(offset) <= 2; // Show 5 images (center + 2 each side)

              if (!isVisible) return null;

              return (
                <motion.div
                  key={i}
                  initial={false}
                  animate={{
                    x: offset * (window.innerWidth < 768 ? 140 : 250),
                    scale: isCenter ? 1 : 0.8,
                    z: isCenter ? 0 : -150,
                    rotateY: offset * (window.innerWidth < 768 ? -15 : -35),
                    opacity: isCenter ? 1 : 1 - Math.abs(offset) * 0.3,
                    zIndex: 10 - Math.abs(offset),
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onClick={() => isCenter ? setLightboxIndex(i) : setIndex(i)}
                  className={`absolute w-[220px] h-[300px] md:w-[320px] md:h-[450px] rounded-[1.5rem] overflow-hidden cursor-pointer shadow-2xl transition-all duration-500 ${isCenter ? "ring-2 ring-[#d4af37]/30 ring-offset-4 ring-offset-[#f9f6f1]" : "blur-[1.5px]"}`}
                >
                  <motion.img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover"
                    whileHover={isCenter ? { scale: 1.05 } : {}}
                    transition={{ duration: 0.6 }}
                  />
                  {isCenter && (
                    <div className="absolute inset-0 bg-black/10 opacity-0 hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                        <ZoomIn className="text-white" size={24} />
                      </div>
                    </div>
                  )}
                  {isCenter && (
                    <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_rgba(212,175,55,0.2)]" />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 md:px-0 pointer-events-none">
            <button 
              onClick={(e) => { e.stopPropagation(); prevSlide(); }}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-[#4a2c2a] pointer-events-auto border border-[#d4af37]/20 hover:bg-[#d4af37] hover:text-white transition-all duration-300 transform active:scale-90"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); nextSlide(); }}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-[#4a2c2a] pointer-events-auto border border-[#d4af37]/20 hover:bg-[#d4af37] hover:text-white transition-all duration-300 transform active:scale-90"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-8 md:mt-12">
          {galleryPhotos.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`transition-all duration-500 rounded-full ${i === index ? "w-8 h-1.5 bg-[#d4af37]" : "w-1.5 h-1.5 bg-[#4a2c2a]/20"}`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4 md:p-8 backdrop-blur-md"
            onClick={() => setLightboxIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryPhotos[lightboxIndex].src}
                alt={galleryPhotos[lightboxIndex].alt}
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              />
              <button 
                onClick={() => setLightboxIndex(null)} 
                className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white transition-colors"
              >
                <X size={32} />
              </button>
              
              <div className="absolute bottom-[-40px] text-white/60 font-['Lato'] text-sm tracking-widest uppercase">
                {lightboxIndex + 1} / {galleryPhotos.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
