import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, Phone, MapPin, Facebook, Instagram } from "lucide-react";
import SafeImage from "./SafeImage";
import { soundManager } from "../utils/sound";
import { siteConfig } from "../data/site";

interface HeroProps {
  t: any;
  lang: string;
}

export default function Hero({ t, lang }: HeroProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // Parallax and hover only on wider screens
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  // Dishes for "OUR CULINARY ART" slider
  const culinaryItems = [
    {
      id: 1,
      title: {
        fr: "Plateau de fruits de mer",
        en: "Seafood platter",
        ar: "طبق ثمار البحر"
      },
      desc: {
        fr: "Homard bleu, huîtres sauvages et crevettes de roche fraîches.",
        en: "Premium blue lobster, wild oysters, and fresh rock prawns.",
        ar: "الاستاكوزا الزرقاء والمحار البري والروبيان الطازج."
      },
      image: "https://images.unsplash.com/photo-1534080391025-09795d197a5b?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: 2,
      title: {
        fr: "Magret de canard rôti",
        en: "Roasted duck breast",
        ar: "صدر البط المشوي"
      },
      desc: {
        fr: "Magret de canard glacé au miel de l'Atlas et épices locales.",
        en: "Atlas honey-glazed roasted duck breast with organic local spices.",
        ar: "صدر البط المشوي بالعسل والتوابل المحلية العضوية."
      },
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: 3,
      title: {
        fr: "Filet de bœuf premium",
        en: "Gourmet beef steak",
        ar: "ستيك بقري فاخر"
      },
      desc: {
        fr: "Filet de bœuf rôti, champignons des bois et sauce truffe noire.",
        en: "Wood-fired beef fillet with wild forest mushrooms and black truffle.",
        ar: "فيليه البقر المشوي مع فطر الغابة والترفاس الأسود."
      },
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=80"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % culinaryItems.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [culinaryItems.length]);

  const handleScrollToSection = (id: string) => {
    soundManager.playClick();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  // Custom SVG Icons for Features
  const ClocheIcon = () => (
    <svg className="w-5 h-5 text-[#D4AF37] mx-auto mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20h20" />
      <path d="M20 20A8 8 0 0 0 4 20" />
      <path d="M12 4v4" />
      <circle cx="12" cy="4" r="1" />
    </svg>
  );

  const TableIcon = () => (
    <svg className="w-5 h-5 text-[#D4AF37] mx-auto mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12h16" />
      <path d="M4 12v8" />
      <path d="M20 12v8" />
      <path d="M8 8V4" />
      <path d="M16 8V4" />
      <path d="M12 8V4" />
    </svg>
  );

  const LeafIcon = () => (
    <svg className="w-5 h-5 text-[#D4AF37] mx-auto mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 2 5.5a7 7 0 0 1-7 7h-3" />
      <path d="M9 20v-5" />
    </svg>
  );

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col lg:flex-row bg-[#060607] overflow-hidden pt-16 lg:pt-20"
    >
      {/* LEFT HALF: Massive Atmospheric Culinary Image & Centered Call to Action */}
      <div className="w-full lg:w-7/12 min-h-[65vh] lg:min-h-screen relative flex flex-col justify-center items-center p-8 sm:p-12 lg:p-16 text-center">
        {/* Deep, highly detailed food/gourmet photo background */}
        <div className="absolute inset-0 select-none overflow-hidden">
          <motion.div
            animate={isMobile ? {} : {
              x: mousePos.x * -25,
              y: mousePos.y * -25,
              scale: 1.05
            }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.8 }}
            className="w-full h-full"
          >
            <SafeImage
              src="https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&auto=format&fit=crop&q=90"
              alt="Rayan Gourmet Experience"
              className="w-full h-full object-cover brightness-[0.25] transition-transform duration-10000"
              style={{ aspectRatio: "16/9" }}
            />
          </motion.div>
          {/* Gradients to blend and fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#060607] via-transparent to-[#060607]/40"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#060607]/50 via-transparent to-[#060607]/80 lg:to-[#060607]"></div>
          
          {/* Subtle gold volumetric light rays */}
          <motion.div 
            animate={isMobile ? {} : {
              x: mousePos.x * 40,
              y: mousePos.y * 40,
            }}
            transition={{ type: "tween", ease: "easeOut", duration: 1.2 }}
            className="absolute top-1/4 left-1/4 w-[380px] h-[380px] bg-[#D4AF37]/8 rounded-full filter blur-[140px] pointer-events-none"
          ></motion.div>
        </div>

        {/* Brand Copywriting Overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center max-w-xl">
          
          {/* Rayan Luxury Title */}
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.1em", y: 15 }}
            animate={{ opacity: 1, letterSpacing: "0.35em", y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-2xl sm:text-3xl font-serif font-light text-[#D4AF37] uppercase mb-4"
          >
            RAYAN
          </motion.span>

          {/* Huge high-end display typography heading */}
          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ opacity: 0, y: 55 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-[#D4AF37] tracking-[0.12em] uppercase leading-[1.15]"
            >
              {lang === "ar" ? (
                <>ملاذ لذيذ <br /><span className="text-[#F8E7A0] font-light">في الدروة</span></>
              ) : lang === "en" ? (
                <>A Culinary Escape <br /><span className="text-[#F8E7A0] font-light">In Deroua</span></>
              ) : (
                <>Une Évasion Culinaire <br /><span className="text-[#F8E7A0] font-light">À Deroua</span></>
              )}
            </motion.h1>
          </div>

          {/* Subtext description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.2, ease: "easeOut" }}
            className="text-sm sm:text-base md:text-lg text-[#DFD1B8]/90 italic font-serif font-light tracking-wide leading-relaxed max-w-md mb-10"
          >
            {lang === "ar" ? (
              `"${siteConfig.description.ar}"`
            ) : lang === "en" ? (
              `"${siteConfig.description.en}"`
            ) : (
              `"${siteConfig.description.fr}"`
            )}
          </motion.p>

          {/* Glowing Book a Table button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 35px rgba(248, 231, 160, 0.35)" }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3 }}
            onClick={() => handleScrollToSection("celebrations")}
            className="px-10 py-4 border border-[#D4AF37] hover:border-[#F8E7A0] text-[#D4AF37] hover:text-[#F8E7A0] hover:bg-[#D4AF37]/5 text-xs font-sans font-bold uppercase tracking-[0.25em] rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.15)] cursor-pointer"
          >
            {lang === "ar" ? "احجز طاولة" : "BOOK A TABLE"}
          </motion.button>

        </div>

        {/* Animated luxury scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-10"
          onClick={() => handleScrollToSection("menu")}
        >
          <span className="text-[8px] font-mono tracking-[0.3em] uppercase text-[#C7A35B]">SCROLL</span>
          <div className="w-[12px] h-[22px] rounded-full border border-[#C7A35B]/40 flex items-start justify-center p-0.5">
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-1 h-1 bg-[#D4AF37] rounded-full"
            />
          </div>
        </motion.div>
      </div>

      {/* RIGHT HALF: Richly Decorated Panel with Carousel & Features & Footer bar */}
      <div className="w-full lg:w-5/12 bg-[#0c0d0e] border-t lg:border-t-0 lg:border-l border-[#C7A35B]/20 min-h-screen relative flex flex-col justify-between p-8 sm:p-12 lg:p-10 z-10">
        
        {/* Subtle geometric overlay to emulate high-end wallpaper */}
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#C7A35B_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

        {/* SUB-SECTION 1: OUR CULINARY ART CAROUSEL */}
        <div className="space-y-6 relative z-10">
          <div className="text-center lg:text-left">
            <span className="text-[10px] font-sans font-medium uppercase tracking-[0.25em] text-[#C7A35B]">
              OUR CULINARY ART
            </span>
          </div>

          {/* Dishes Slider */}
          <div className="relative w-full overflow-visible py-4 select-none">
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, info) => {
                const threshold = 40;
                if (info.offset.x < -threshold) {
                  // Swipe left -> Next
                  soundManager.playClick();
                  setActiveSlide((prev) => (prev + 1) % culinaryItems.length);
                } else if (info.offset.x > threshold) {
                  // Swipe right -> Prev
                  soundManager.playClick();
                  setActiveSlide((prev) => (prev - 1 + culinaryItems.length) % culinaryItems.length);
                }
              }}
              className="relative w-full h-[180px] sm:h-[220px] flex items-center justify-center cursor-grab active:cursor-grabbing preserve-3d"
              style={{ perspective: "1000px" }}
            >
              {culinaryItems.map((item, index) => {
                const isActive = activeSlide === index;
                // Circular difference calculation for infinite loop layout of 3 items
                let diff = index - activeSlide;
                if (diff < -1) diff += 3;
                if (diff > 1) diff -= 3;

                // 3D positioning coefficients
                const xOffset = diff * (isMobile ? 120 : 160);
                const rotateY = diff * -35; // rotate outwards
                const scale = diff === 0 ? 1.0 : 0.82;
                const opacity = diff === 0 ? 1.0 : 0.45;
                const zIndex = 30 - Math.abs(diff) * 10;
                const translateZ = diff === 0 ? 0 : -120;

                return (
                  <motion.div
                    key={item.id}
                    animate={{
                      x: `calc(-50% + ${xOffset}px)`,
                      y: "-50%",
                      rotateY: rotateY,
                      scale: scale,
                      opacity: opacity,
                      z: translateZ,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 120,
                      damping: 18,
                    }}
                    onClick={() => {
                      if (!isActive) {
                        soundManager.playClick();
                        setActiveSlide(index);
                      }
                    }}
                    className={`absolute left-1/2 top-1/2 w-[175px] sm:w-[210px] cursor-pointer overflow-hidden rounded-xl border select-none transition-shadow duration-300 ${
                      isActive
                        ? "border-[#D4AF37] shadow-[0_15px_45px_rgba(212,175,55,0.25)]"
                        : "border-white/5 shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
                    }`}
                    style={{
                      transformOrigin: "center center",
                      backfaceVisibility: "hidden",
                      zIndex: zIndex,
                    }}
                  >
                    <div className="h-28 sm:h-32 overflow-hidden relative">
                      <SafeImage
                        src={item.image}
                        alt={item.title[lang === "ar" ? "ar" : lang === "fr" ? "fr" : "en"]}
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500 pointer-events-none"
                        style={{ aspectRatio: "4/3" }}
                      />
                    </div>
                    <div className="p-2 sm:p-3 bg-[#111213] text-center border-t border-white/5">
                      <h3 className="text-[11px] sm:text-xs font-serif font-medium text-[#F4EBDD] tracking-wide truncate">
                        {item.title[lang === "ar" ? "ar" : lang === "fr" ? "fr" : "en"]}
                      </h3>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Selected item description below */}
            <div className="mt-4 text-center min-h-[40px] px-4">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeSlide}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="text-xs text-[#B7B2A8] italic font-serif leading-relaxed"
                >
                  {culinaryItems[activeSlide].desc[lang === "ar" ? "ar" : lang === "fr" ? "fr" : "en"]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Carousel Dots indicators */}
            <div className="flex justify-center gap-2 mt-4">
              {culinaryItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    soundManager.playClick();
                    setActiveSlide(index);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeSlide === index ? "w-6 bg-[#D4AF37]" : "w-1.5 bg-white/20"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* SUB-SECTION 2: FEATURES */}
        <div className="py-6 border-t border-white/5 relative z-10">
          <div className="text-center lg:text-left mb-6">
            <span className="text-[10px] font-sans font-medium uppercase tracking-[0.25em] text-[#C7A35B]">
              FEATURES
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            {/* Cloche column */}
            <div className="space-y-1">
              <ClocheIcon />
              <h4 className="text-[9px] sm:text-[10px] font-sans font-bold uppercase tracking-wider text-[#F4EBDD]">
                {lang === "ar" ? "أطباق مميزة" : "Signature Dishes"}
              </h4>
              <p className="text-[8px] sm:text-[9px] text-[#B7B2A8] italic font-serif leading-tight">
                {lang === "ar" ? "تذوق الفن في كل طبق" : "Artistry in every plate"}
              </p>
            </div>

            {/* Table/Dining column */}
            <div className="space-y-1">
              <TableIcon />
              <h4 className="text-[9px] sm:text-[10px] font-sans font-bold uppercase tracking-wider text-[#F4EBDD]">
                {lang === "ar" ? "عشاء خاص" : "Private Dining"}
              </h4>
              <p className="text-[8px] sm:text-[9px] text-[#B7B2A8] italic font-serif leading-tight">
                {lang === "ar" ? "أجواء عائلية فاخرة" : "Exquisite warm settings"}
              </p>
            </div>

            {/* Ingredients column */}
            <div className="space-y-1">
              <LeafIcon />
              <h4 className="text-[9px] sm:text-[10px] font-sans font-bold uppercase tracking-wider text-[#F4EBDD]">
                {lang === "ar" ? "مكونات طازجة" : "Finest Ingredients"}
              </h4>
              <p className="text-[8px] sm:text-[9px] text-[#B7B2A8] italic font-serif leading-tight">
                {lang === "ar" ? "طازج وعضوي ومحلي" : "Fresh, organic, and local"}
              </p>
            </div>
          </div>
        </div>

        {/* SUB-SECTION 3: CONTACT QUICK-BAR FOOTER */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
          
          {/* Contacts Block */}
          <div className="text-center sm:text-left space-y-0.5">
            <span className="block text-[8px] font-sans font-bold uppercase tracking-wider text-[#C7A35B]">
              CONTACT
            </span>
            <a 
              href={`tel:${siteConfig.phoneSecondary.replace(/\s+/g, "")}`} 
              className="block text-[11px] font-mono text-[#F4EBDD] hover:text-[#D4AF37] transition-colors font-bold"
            >
              {siteConfig.phoneSecondary}
            </a>
            <span className="block text-[9px] text-[#B7B2A8] font-sans">
              Deroua, Morocco
            </span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href={siteConfig.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-full bg-white/5 border border-white/10 hover:border-[#D4AF37] hover:text-[#D4AF37] flex items-center justify-center text-white transition-all duration-300"
              aria-label="Facebook"
            >
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a
              href={siteConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-full bg-white/5 border border-white/10 hover:border-[#D4AF37] hover:text-[#D4AF37] flex items-center justify-center text-white transition-all duration-300"
              aria-label="Instagram"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Action pill button */}
          <button
            onClick={() => handleScrollToSection("celebrations")}
            className="px-5 py-2 border border-[#D4AF37]/50 hover:border-[#F8E7A0] text-[10px] text-[#D4AF37] hover:text-[#F8E7A0] font-sans font-bold uppercase tracking-wider rounded-full transition-all duration-300 bg-transparent hover:bg-[#D4AF37]/5 cursor-pointer shadow-[0_0_10px_rgba(212,175,55,0.15)] hover:shadow-[0_0_15px_rgba(248,231,160,0.3)]"
          >
            {lang === "ar" ? "حجوزات" : "RESERVATIONS"}
          </button>

        </div>

      </div>
    </section>
  );
}
