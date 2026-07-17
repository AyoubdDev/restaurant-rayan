import React, { useState, useEffect } from "react";
import { Menu, X, Globe, Calendar } from "lucide-react";
import { siteConfig } from "../data/site";
import { soundManager } from "../utils/sound";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  t: any;
  lang: string;
  setLang: (lang: string) => void;
  onOpen3DMenu: () => void;
}

export default function Header({ t, lang, setLang, onOpen3DMenu }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Manage Scroll hiding & appearing animation
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Background blur color trigger
      if (currentScrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide / Show on direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // Scrolling down -> hide
      } else {
        setIsVisible(true); // Scrolling up -> show
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const leftLinks = [
    { label: lang === "ar" ? "الرئيسية" : lang === "en" ? "HOME" : "ACCUEIL", href: "#home" },
    { label: lang === "ar" ? "قصتنا" : lang === "en" ? "OUR STORY" : "NOTRE HISTOIRE", href: "#experience" },
    { label: lang === "ar" ? "القائمة" : lang === "en" ? "MENU" : "LE MENU", href: "#menu" },
  ];

  const rightLinks = [
    { label: lang === "ar" ? "المعرض" : lang === "en" ? "GALLERY" : "GALERIE", href: "#gallery" },
    { label: lang === "ar" ? "الحجوزات" : lang === "en" ? "RESERVATIONS" : "CELEBRATIONS", href: "#celebrations" },
    { label: lang === "ar" ? "اتصل بنا" : lang === "en" ? "CONTACT" : "CONTACT", href: "#contact" },
  ];

  const allLinks = [...leftLinks, ...rightLinks];

  const handleSetLanguage = (newLang: string) => {
    soundManager.playClick();
    setLang(newLang);
  };

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    soundManager.playClick();
    
    if (href === "#menu") {
      onOpen3DMenu();
      return;
    }
    
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  const FlameIcon = () => (
    <svg className="w-6 h-6 text-[#D4AF37] mb-1" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer elegant flame curve */}
      <path 
        d="M50 8C50 8 74 34 74 54C74 70.5 58.5 84 42 84C25.5 84 12 70.5 12 54C12 37 24 20 24 20" 
        stroke="url(#goldGradient)" 
        strokeWidth="3.5" 
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />
      {/* Inner flame shape */}
      <path 
        d="M50 20C50 20 64 42 64 54C64 64.5 56.5 72 46.5 72C36.5 72 29 64.5 29 54C29 42.5 38 28 38 28" 
        stroke="url(#goldGradient)" 
        strokeWidth="3" 
        strokeLinecap="round"
        fill="none"
      />
      {/* Center solid core */}
      <path 
        d="M50 32C50 32 57 46 57 54C57 60 53 64 48 64C43 64 39 60 39 54C39 48 44 38 44 38" 
        fill="url(#goldGradient)"
      />
      {/* Star inside the core */}
      <path 
        d="M50 44L51.3 47.7L54.8 47.7L52 49.9L53.1 53.5L50 51.2L46.9 53.5L48 49.9L45.2 47.7L48.7 47.7L50 44Z" 
        fill="#FFFFFF"
      />
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#71541A" />
          <stop offset="35%" stopColor="#D4AF37" />
          <stop offset="70%" stopColor="#F8E7A0" />
          <stop offset="100%" stopColor="#C7A35B" />
        </linearGradient>
      </defs>
    </svg>
  );

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -110 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        isScrolled || isMobileMenuOpen
          ? "bg-[#090909]/95 backdrop-blur-md border-[#C7A35B]/25 shadow-[0_4px_30px_rgba(0,0,0,0.8)] py-3"
          : "bg-[#090909]/60 backdrop-blur-sm border-[#C7A35B]/20 py-4.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* DESKTOP HEADER (Large screens) */}
        <div className="hidden lg:flex items-center justify-between w-full">
          
          {/* LEFT SIDE: 3 links */}
          <div className="flex-1 flex justify-end gap-10 pr-6">
            {leftLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleScrollToSection(e, link.href)}
                className="text-[11px] font-sans font-medium uppercase tracking-[0.2em] text-[#C7A35B] hover:text-[#F8E7A0] transition-colors relative py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[#F8E7A0] transition-all duration-300 group-hover:w-8"></span>
              </a>
            ))}
          </div>

          {/* CENTER: Gold Flame & RAYAN Text */}
          <div className="flex-shrink-0 flex flex-col items-center justify-center px-6">
            <a 
              href="#home" 
              onClick={(e) => handleScrollToSection(e, "#home")} 
              className="flex flex-col items-center group cursor-pointer"
            >
              <FlameIcon />
              <span className="text-xl font-serif font-medium tracking-[0.25em] text-[#D4AF37] group-hover:text-[#F8E7A0] transition-colors">
                RAYAN
              </span>
            </a>
          </div>

          {/* RIGHT SIDE: 3 links + LANGUAGE SELECTOR */}
          <div className="flex-1 flex justify-start items-center gap-7 pl-6">
            {rightLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleScrollToSection(e, link.href)}
                className="text-[11px] font-sans font-medium uppercase tracking-[0.2em] text-[#C7A35B] hover:text-[#F8E7A0] transition-colors relative py-1 group whitespace-nowrap"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[#F8E7A0] transition-all duration-300 group-hover:w-8"></span>
              </a>
            ))}

            {/* LANGUAGE SELECTOR DESKTOP */}
            <div className="flex gap-1.5 bg-black/50 border border-[#C7A35B]/30 p-0.5 rounded-full ml-2 flex-shrink-0">
              {["FR", "EN", "AR"].map((l) => (
                <button
                  key={l}
                  onClick={() => handleSetLanguage(l.toLowerCase())}
                  className={`px-3 py-0.5 text-[9px] font-mono font-bold rounded-full transition-all duration-300 cursor-pointer ${
                    lang === l.toLowerCase()
                      ? "bg-[#D4AF37] text-[#090909]"
                      : "text-[#C7A35B] hover:text-[#F8E7A0]"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* MOBILE/TABLET HEADER (Smaller screens) */}
        <div className="lg:hidden flex items-center justify-between w-full">
          
          {/* Menu Drawer Toggle */}
          <button
            onClick={() => {
              soundManager.playClick();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            className="p-2 text-[#C7A35B] hover:text-[#F8E7A0] transition-colors"
            aria-label="Toggle navigation"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Centered Flame Logo */}
          <a 
            href="#home" 
            onClick={(e) => handleScrollToSection(e, "#home")} 
            className="flex flex-col items-center group cursor-pointer"
          >
            <div className="scale-90 flex flex-col items-center">
              <FlameIcon />
              <span className="text-lg font-serif font-medium tracking-[0.25em] text-[#D4AF37]">
                RAYAN
              </span>
            </div>
          </a>

          {/* Quick 3-Language Selector on Mobile */}
          <div className="flex gap-0.5 bg-black/40 border border-[#C7A35B]/20 p-0.5 rounded-full">
            {["FR", "EN", "AR"].map((l) => (
              <button
                key={l}
                onClick={() => handleSetLanguage(l.toLowerCase())}
                className={`px-1.5 py-0.5 text-[8px] font-mono font-bold rounded-full transition-all duration-300 ${
                  lang === l.toLowerCase()
                    ? "bg-[#D4AF37] text-[#090909]"
                    : "text-[#C7A35B]/70 hover:text-[#F8E7A0]"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

        </div>

      </div>

      {/* FULLSCREEN MOBILE/TABLET DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 bg-[#090909]/98 backdrop-blur-2xl border-b border-[#C7A35B]/25 py-8 px-6 shadow-2xl z-50 text-center"
          >
            <div className="flex flex-col gap-4 max-w-xs mx-auto">
              {allLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleScrollToSection(e, link.href)}
                  className="text-base font-sans font-medium uppercase tracking-[0.15em] text-[#C7A35B] hover:text-[#F8E7A0] transition-colors py-2 border-b border-white/5 block"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
