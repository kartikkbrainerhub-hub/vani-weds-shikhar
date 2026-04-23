import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Zoom, Autoplay, EffectCoverflow } from "swiper/modules";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";
import "swiper/css/effect-coverflow";

const galleryPhotos = [
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=70",
    alt: "Wedding flowers",
  },
  {
    src: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=400&q=70",
    alt: "Couple portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1606216840240-f01d6e29a2d3?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1606216840240-f01d6e29a2d3?w=400&q=70",
    alt: "Wedding rings",
  },
  {
    src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=400&q=70",
    alt: "Wedding ceremony",
  },
  {
    src: "https://images.unsplash.com/photo-1583939411023-14783179e581?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1583939411023-14783179e581?w=400&q=70",
    alt: "Couple dancing",
  },
  {
    src: "https://images.unsplash.com/photo-1516401266446-6432a8a07d41?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1516401266446-6432a8a07d41?w=400&q=70",
    alt: "Wedding decoration",
  },
  {
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&q=70",
    alt: "Bride and groom",
  },
  {
    src: "https://images.unsplash.com/photo-1546032996-6dfacbacbf3f?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1546032996-6dfacbacbf3f?w=400&q=70",
    alt: "Wedding celebration",
  },
];

// Lightbox component
function Lightbox({ photos, activeIndex, onClose, onPrev, onNext }) {
  return (
    <motion.div
      className="lightbox-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 20 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          maxWidth: "90vw",
          maxHeight: "85vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={photos[activeIndex].src}
          alt={photos[activeIndex].alt}
          style={{
            maxWidth: "90vw",
            maxHeight: "80vh",
            objectFit: "contain",
            borderRadius: "1rem",
            boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
          }}
        />

        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "-2rem",
            right: "-2rem",
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: "50%",
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "white",
            backdropFilter: "blur(8px)",
          }}
        >
          <X size={18} />
        </button>

        {/* Prev */}
        <button
          onClick={onPrev}
          style={{
            position: "absolute",
            left: "-3rem",
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: "50%",
            width: 44,
            height: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "white",
            backdropFilter: "blur(8px)",
          }}
        >
          <ChevronLeft size={20} />
        </button>

        {/* Next */}
        <button
          onClick={onNext}
          style={{
            position: "absolute",
            right: "-3rem",
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: "50%",
            width: 44,
            height: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "white",
            backdropFilter: "blur(8px)",
          }}
        >
          <ChevronRight size={20} />
        </button>

        {/* Counter */}
        <div
          style={{
            position: "absolute",
            bottom: "-2.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            color: "rgba(255,255,255,0.7)",
            fontSize: "0.85rem",
            fontFamily: "'Lato', sans-serif",
          }}
        >
          {activeIndex + 1} / {photos.length}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true });

  const openLightbox = (i) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prevPhoto = () => setLightboxIndex((prev) => (prev - 1 + galleryPhotos.length) % galleryPhotos.length);
  const nextPhoto = () => setLightboxIndex((prev) => (prev + 1) % galleryPhotos.length);

  // Keyboard navigation
  React.useEffect(() => {
    const handler = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === "ArrowLeft") prevPhoto();
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex]);

  return (
    <section
      id="gallery"
      className="section-padding"
      style={{
        background: "linear-gradient(180deg, #fdfaf5 0%, #fff5f7 50%, #fdfaf5 100%)",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div ref={titleRef} style={{ textAlign: "center", marginBottom: "3rem" }}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          style={{ fontFamily: "'Dancing Script', cursive", fontSize: "1.3rem", color: "#ca8a04", marginBottom: "0.5rem" }}
        >
          Captured Moments
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="section-title"
        >
          Our Photo Gallery
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="ornament-divider"
        >
          <span>✦</span>
          <span>📸</span>
          <span>✦</span>
        </motion.div>
      </div>

      {/* Swiper Coverflow Slider */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.4 }}
      >
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 120,
            modifier: 1,
            slideShadows: true,
          }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          style={{ paddingBottom: "3rem" }}
        >
          {galleryPhotos.map((photo, i) => (
            <SwiperSlide key={i} style={{ width: "300px", cursor: "pointer" }}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                onClick={() => openLightbox(i)}
                style={{
                  position: "relative",
                  borderRadius: "1rem",
                  overflow: "hidden",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                }}
              >
                <img
                  src={photo.thumb}
                  alt={photo.alt}
                  loading="lazy"
                  style={{ width: "100%", height: 340, objectFit: "cover", display: "block" }}
                />
                {/* Hover overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    padding: "1rem",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
                >
                  <ZoomIn size={24} color="white" />
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            photos={galleryPhotos}
            activeIndex={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevPhoto}
            onNext={nextPhoto}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
