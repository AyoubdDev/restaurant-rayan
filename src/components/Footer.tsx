import React from "react";
import { siteConfig } from "../data/site";
import { ArrowUp, Instagram, Facebook, MessageCircle, MapPin, Mail, Phone, Sparkles, Heart } from "lucide-react";
import { motion } from "motion/react";
import { soundManager } from "../utils/sound";

interface FooterProps {
  t: any;
  lang: string;
}

export default function Footer({ t, lang }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    soundManager.playClick();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    soundManager.playClick();
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

  return (
    <footer className="bg-[#090909] text-[#F7F7F7] pt-20 pb-24 lg:pb-12 relative z-10 overflow-hidden">
      
      {/* 1. SOLID LUXURY GOLD HORIZONTAL DIVIDER BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="relative h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/45 to-transparent">
          {/* Centered fine spark indicator on divider */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#D4AF37] border border-[#F8E7A0] shadow-[0_0_10px_#D4AF37] flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-black"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core footer layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-14 pb-12 border-b border-white/5">
          
          {/* Section 1: Brand & Animated Signature (5 columns) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex flex-col">
              <span className="text-2xl font-serif font-black tracking-[0.25em] text-[#F7F7F7]">
                RAYAN
              </span>
              <span className="text-[8px] font-mono tracking-[0.3em] text-[#D4AF37] uppercase mt-1">
                Pâtisserie & Gastronomie
              </span>
            </div>

            <p className="text-xs text-[#A7A7A7] font-light leading-relaxed max-w-sm">
              {t.footerAbout || "Un voyage culinaire d'exception au cœur de la ville, mariant traditions marocaines et l'excellence de la haute gastronomie."}
            </p>

            {/* ANIMATED CURSIVE SIGNATURE */}
            <div className="pt-4 pb-2">
              <span className="text-[10px] font-mono tracking-widest text-[#A7A7A7]/50 uppercase block mb-2">
                Executive Chef Authenticity
              </span>
              <motion.div
                initial={{ opacity: 0.7 }}
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="font-serif italic text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#F8E7A0] via-[#D4AF37] to-[#F8E7A0] tracking-wider selection:bg-transparent"
              >
                Yassine El Amrani
              </motion.div>
              <div className="w-20 h-[1px] bg-[#D4AF37]/30 mt-1"></div>
            </div>
          </div>

          {/* Section 2: Quick Navigation Links (3 columns) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#D4AF37] pb-2 border-b border-[#D4AF37]/10">
              {lang === "ar" ? "روابط سريعة" : "EXPLORE SANCTUARY"}
            </h3>
            <ul className="space-y-3">
              {[
                { label: t.navHome, href: "#home" },
                { label: t.navMenu, href: "#menu" },
                { label: t.navGallery, href: "#gallery" },
                { label: t.navCelebrations, href: "#celebrations" },
                { label: t.navContact, href: "#contact" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScrollToSection(e, link.href)}
                    className="text-[10px] text-[#A7A7A7] hover:text-[#D4AF37] transition-all font-mono uppercase tracking-widest block py-0.5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3: Hours & Contacts (4 columns) */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#D4AF37] pb-2 border-b border-[#D4AF37]/10">
              {lang === "ar" ? "أوقات العمل والعناوين" : "HOURS & STEWARDSHIP"}
            </h3>
            <div className="space-y-3.5 text-xs text-[#A7A7A7] font-sans">
              <p className="leading-relaxed">
                <strong className="text-[#F7F7F7] font-serif font-bold text-sm block mb-1">
                  {lang === "ar" ? "الاستقبال يومياً :" : "Everyday Reception :"}
                </strong>
                <span className="font-mono text-[11px] leading-relaxed block text-xs">
                  {lang === "ar" ? siteConfig.openingHours.ar : lang === "en" ? siteConfig.openingHours.en : siteConfig.openingHours.fr}
                </span>
              </p>
              
              <div className="flex gap-2 items-start text-xs pt-1 border-t border-white/5">
                <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span className="font-mono text-[11px] leading-tight">{siteConfig.address}</span>
              </div>

              <div className="flex gap-2 items-center text-xs">
                <Phone className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <a href={`tel:${siteConfig.phonePrimary.replace(/\s+/g, "")}`} className="font-mono text-[11px] hover:text-[#D4AF37] transition-colors">
                  {siteConfig.phonePrimary}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Lower footer copyright details */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-[#A7A7A7]/50 font-mono">
          <p className="text-center md:text-left flex items-center gap-1.5">
            <span>© {currentYear} RAYAN GOURMET. ALL RIGHTS RESERVED.</span>
            <span>|</span>
            <span className="flex items-center gap-1">
              Crafted for Awwwards <Heart className="w-2.5 h-2.5 text-[#D4AF37] fill-[#D4AF37]" />
            </span>
          </p>

          <div className="flex gap-3 pt-2">
            <a
              href={siteConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-[#111111] border border-white/5 hover:border-[#D4AF37] flex items-center justify-center text-[#A7A7A7] hover:text-[#D4AF37] transition-all"
              aria-label="Instagram"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a
              href={siteConfig.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-[#111111] border border-white/5 hover:border-[#D4AF37] flex items-center justify-center text-[#A7A7A7] hover:text-[#D4AF37] transition-all"
              aria-label="Facebook"
            >
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a
              href={siteConfig.socials.whatsappChat}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-[#111111] border border-white/5 hover:border-[#D4AF37] flex items-center justify-center text-[#A7A7A7] hover:text-[#D4AF37] transition-all"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Luxury scroll to top trigger button */}
          <button
            onClick={handleScrollToTop}
            className="p-3 rounded-full bg-[#111111] border border-white/5 hover:border-[#D4AF37] text-[#D4AF37] hover:text-[#F8E7A0] transition-all shadow-md flex items-center justify-center cursor-pointer hover:scale-110"
            aria-label="Scroll to top"
            title="Ascend to Top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
