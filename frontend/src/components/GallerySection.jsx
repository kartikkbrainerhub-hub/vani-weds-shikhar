import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

const galleryPhotos = [
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80",
    alt: "Wedding flowers",
  },
  {
    src: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=1200&q=80",
    alt: "Couple portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1606216840240-f01d6e29a2d3?w=1200&q=80",
    alt: "Wedding rings",
  },
  {
    src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=1200&q=80",
    alt: "Wedding ceremony",
  },
  {
    src: "https://images.unsplash.com/photo-1583939411023-14783179e581?w=1200&q=80",
    alt: "Couple dancing",
  },
  {
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=80",
    alt: "Bride and groom",
  },
  {
    src: "https://images.unsplash.com/photo-1516401266446-6432a8a07d41?w=1200&q=80",
    alt: "Wedding decoration",
  },
  {
    src: "https://images.unsplash.com/photo-1546032996-6dfacbacbf3f?w=1200&q=80",
    alt: "Wedding celebration",
  },
  {
    src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=80",
    alt: "Bridal detail",
  },
  {
    src: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1200&q=80",
    alt: "Groom detail",
  },
];

function Lightbox({ photos, activeIndex, onClose, onPrev, onNext }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-w-6xl w-full h-full flex items-center justify-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={photos[activeIndex].src}
          alt={photos[activeIndex].alt}
          className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
        />

        <button onClick={onClose} className="absolute top-0 right-0 p-2 text-white/70 hover:text-white transition-colors">
          <X size={32} />
        </button>

        <button onClick={onPrev} className="absolute left-0 p-2 text-white/70 hover:text-white transition-colors">
          <ChevronLeft size={48} />
        </button>

        <button onClick={onNext} className="absolute right-0 p-2 text-white/70 hover:text-white transition-colors">
          <ChevronRight size={48} />
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  return (
    <section id="gallery" className="section-padding bg-[#fdfaf5] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-20">
          <span className="font-['Dancing_Script'] text-2xl text-[#D4AF37] block mb-2">
            Captured Moments
          </span>
          <h2 className="font-['Playfair_Display'] text-5xl md:text-7xl font-bold text-[#3d2b1f]">
            Our Photo Gallery
          </h2>
          <div className="w-16 h-px bg-[#D4AF37] mx-auto mt-6 opacity-40" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {galleryPhotos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              onClick={() => setLightboxIndex(i)}
              className={`relative group cursor-pointer overflow-hidden rounded-[2rem] shadow-md hover:shadow-xl transition-all duration-500 ${i === 0 ? "md:col-span-2 h-[400px] md:h-[600px]" : "h-[300px] md:h-[450px]"}`}
            >
              <motion.img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <ZoomIn className="text-white" size={24} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            photos={galleryPhotos}
            activeIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onPrev={() => setLightboxIndex((prev) => (prev - 1 + galleryPhotos.length) % galleryPhotos.length)}
            onNext={() => setLightboxIndex((prev) => (prev + 1) % galleryPhotos.length)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
