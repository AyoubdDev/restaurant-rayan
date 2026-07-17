import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "motion/react";
import { galleryItems } from "../data/gallery";
import { siteConfig } from "../data/site";
import SafeImage from "./SafeImage";
import { X, ChevronLeft, ChevronRight, Instagram, Sparkles, MoveRight } from "lucide-react";
import { soundManager } from "../utils/sound";

interface GalleryProps {
  t: any;
  lang: string;
}

export default function Gallery({ t, lang }: GalleryProps) {
  const [activeFilter, setActiveFilter] = useState<"all" | "plats" | "ambiance" | "desserts" | "evenements">("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filters = [
    { id: "all", label: t.galFilterAll },
    { id: "plats", label: t.galFilterPlats },
    { id: "ambiance", label: t.galFilterAmbiance },
    { id: "desserts", label: t.galFilterDesserts },
    { id: "evenements", label: t.galFilterEvenements },
  ];

  const filteredItems = activeFilter === "all"
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeFilter);

  // Keyboard controls for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") {
        setLightboxIndex(null);
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredItems]);

  const handleNext = () => {
    if (lightboxIndex === null) return;
    soundManager.playClick();
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    soundManager.playClick();
    setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  // Draggable slider variables & constraints
  const dragRef = useRef<HTMLDivElement | null>(null);
  const [constraintsWidth, setConstraintsWidth] = useState(0);

  useEffect(() => {
    if (dragRef.current) {
      setConstraintsWidth(dragRef.current.scrollWidth - dragRef.current.offsetWidth);
    }
  }, [filteredItems]);

  return (
    <section id="gallery" className="py-24 bg-[#090909] relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cinematic Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-[#D4AF37]/10 text-[#F8E7A0] rounded-full text-[10px] font-mono tracking-widest uppercase mb-4 border border-[#D4AF37]/20">
            {lang === "ar" ? "معرض الصور الفاخر" : "GALLERY & CINEMATICS"}
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif font-light text-[#F7F7F7] tracking-tight leading-tight mb-4">
            {lang === "ar" ? "لحظات من التميز والجمال" : "Frozen masterpieces of Rayan"}
          </h2>
          <div className="w-16 h-[1px] bg-[#D4AF37] mx-auto mb-6"></div>
          <p className="text-xs sm:text-sm text-[#A7A7A7] font-light max-w-xl mx-auto leading-relaxed">
            {lang === "ar"
              ? "استكشف أبعاد الجمال في أطباقنا وأجوائنا الفاخرة. اسحب المعرض الأفقي لمشاهدة التفاصيل المذهلة."
              : "Slide through a curated stream of our boutique layout, master bakes, and Michelin-worthy atmosphere."}
          </p>
        </div>

        {/* Dynamic Premium Filter Tabs */}
        <div className="flex justify-center items-center gap-2.5 mb-14 flex-wrap max-w-2xl mx-auto">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => {
                soundManager.playClick();
                setActiveFilter(filter.id as any);
                setLightboxIndex(null);
              }}
              className={`px-5 py-2.5 rounded-full text-[10px] sm:text-xs font-mono uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                activeFilter === filter.id
                  ? "bg-[#D4AF37] text-[#090909] shadow-lg shadow-[#D4AF37]/25 font-bold"
                  : "bg-[#111111] text-[#A7A7A7] border border-white/5 hover:border-[#D4AF37]/20 hover:text-[#F7F7F7]"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Horizontal momentum drag container */}
        <div className="w-full relative overflow-hidden pb-10 cursor-grab active:cursor-grabbing" ref={dragRef}>
          
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -constraintsWidth - 80 }}
            className="flex gap-6 w-max px-4"
          >
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                onClick={() => {
                  soundManager.playSuccess();
                  setLightboxIndex(idx);
                }}
                whileHover={{ 
                  scale: 1.02, 
                  rotateY: 2, 
                  rotateX: -2,
                  boxShadow: "0px 20px 40px rgba(212, 175, 55, 0.15)"
                }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                className="w-72 sm:w-80 h-[380px] sm:h-[450px] rounded-2xl overflow-hidden border border-white/10 bg-[#111111]/60 flex-shrink-0 relative group shadow-2xl transition-all"
                style={{ perspective: 1000 }}
              >
                {/* 3D Depth image panel */}
                <div className="w-full h-full relative overflow-hidden">
                  <SafeImage
                    src={item.image}
                    alt={lang === "ar" ? item.altAr : item.altFr}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 pointer-events-none"
                    style={{ aspectRatio: "9/16" }}
                  />
                  
                  {/* Subtle luxury overlay highlighting gold details */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/40 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300"></div>

                  {/* Brass frame double border inside card on hover */}
                  <div className="absolute inset-4 border border-[#D4AF37]/0 group-hover:border-[#D4AF37]/20 transition-all duration-500 rounded-xl pointer-events-none"></div>

                  {/* Text card description revealed on hover */}
                  <div className="absolute bottom-6 left-6 right-6 z-10">
                    <span className="text-[8px] font-mono font-bold uppercase tracking-widest text-[#D4AF37] mb-2 block bg-[#D4AF37]/10 w-fit px-2 py-0.5 rounded-full border border-[#D4AF37]/20">
                      {item.category}
                    </span>
                    <p className="text-lg sm:text-xl font-serif font-light text-[#F7F7F7] leading-tight mb-1 group-hover:text-[#F8E7A0] transition-colors">
                      {lang === "ar" ? item.titleAr : item.titleFr}
                    </p>
                    <p className="text-[10px] text-[#A7A7A7] font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 mt-2 flex items-center gap-1">
                      <span>Click to view details</span>
                      <MoveRight className="w-3 h-3 text-[#D4AF37]" />
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Swipe indicator label */}
          <div className="flex justify-center items-center gap-2 text-[#A7A7A7]/50 text-[10px] font-mono uppercase tracking-[0.2em] mt-8">
            <span>Drag left or right to slide</span>
          </div>

        </div>

        {/* CTA Instagram Footer */}
        <div className="text-center mt-6">
          <a
            href={siteConfig.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#111111]/80 hover:bg-[#1a1a1a] text-[#F8E7A0] border border-[#D4AF37]/30 hover:border-[#F8E7A0] px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300"
          >
            <Instagram className="w-4 h-4 text-[#D4AF37]" />
            {t.btnFollowInstagram}
          </a>
        </div>

      </div>

      {/* LIGHTBOX CONCIERGE FULLSCREEN MODAL */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9000] bg-[#090909]/98 backdrop-blur-md flex items-center justify-center p-4 sm:p-12"
            role="dialog"
            aria-modal="true"
          >
            {/* Close trigger */}
            <button
              onClick={() => {
                soundManager.playClick();
                setLightboxIndex(null);
              }}
              className="absolute top-6 right-6 p-3 text-[#A7A7A7] hover:text-[#F7F7F7] bg-white/5 hover:bg-white/15 rounded-full transition-colors z-[9900] cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Previous */}
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-4 sm:left-6 p-3 text-[#A7A7A7] hover:text-[#F8E7A0] bg-white/5 hover:bg-white/10 rounded-full transition-colors z-[9900] cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-4 sm:right-6 p-3 text-[#A7A7A7] hover:text-[#F8E7A0] bg-white/5 hover:bg-white/10 rounded-full transition-colors z-[9900] cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image display center frame */}
            <div className="max-w-4xl max-h-[85vh] w-full flex flex-col items-center justify-center relative">
              <motion.div
                key={lightboxIndex}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="w-full h-full max-h-[70vh] rounded-2xl overflow-hidden border border-white/15 shadow-2xl relative"
              >
                <SafeImage
                  src={filteredItems[lightboxIndex].image}
                  alt="Rayan Gourmet Lightbox View"
                  className="w-full h-full max-h-[70vh] object-contain mx-auto"
                  style={{ maxHeight: "70vh" }}
                />
              </motion.div>

              {/* Title descriptions */}
              <div className="mt-6 text-center max-w-2xl px-4">
                <span className="text-[9px] font-mono text-[#D4AF37] uppercase tracking-widest block mb-1">
                  {filteredItems[lightboxIndex].category}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif text-[#F7F7F7]">
                  {lang === "ar" ? filteredItems[lightboxIndex].titleAr : filteredItems[lightboxIndex].titleFr}
                </h3>
                <p className="text-xs text-[#A7A7A7] mt-1.5 font-light">
                  {lang === "ar" ? filteredItems[lightboxIndex].altAr : filteredItems[lightboxIndex].altFr}
                </p>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
