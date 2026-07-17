import { useState, useEffect } from "react";
import { fr } from "./i18n/fr";
import { ar } from "./i18n/ar";
import { en } from "./i18n/en";
import { trackEvent } from "./utils/analytics";

// Importations des composants principaux du site
import MetaTagsManager from "./components/MetaTagsManager";
import Header from "./components/Header";
import Hero from "./components/Hero";
import MenuCategories from "./components/MenuCategories";
import SignatureDishes from "./components/SignatureDishes";
import Experience from "./components/Experience";
import Celebrations from "./components/Celebrations";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import ContactLocation from "./components/ContactLocation";
import Footer from "./components/Footer";
import MobileActionBar from "./components/MobileActionBar";
import AIAssistant from "./components/AIAssistant";

import AestheticsManager from "./components/AestheticsManager";
import InteractiveBookMenu3D from "./components/InteractiveBookMenu3D";

export default function App() {
  const [lang, setLang] = useState<string>("fr");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isBookMenuOpen, setIsBookMenuOpen] = useState<boolean>(false);

  // Charger le dictionnaire de traduction correspondant
  const t = lang === "ar" ? ar : lang === "en" ? en : fr;

  // Gérer dynamiquement la direction du texte (LTR ou RTL) pour l'ensemble de la page
  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  // Enregistrer la consultation initiale du menu
  useEffect(() => {
    trackEvent("view_menu", { defaultLanguage: lang });
  }, []);

  // Déclencher le suivi analytique lors du changement de catégorie de menu
  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    trackEvent("view_menu", { category: categoryId });
  };

  const handleOpenMenu = () => {
    const element = document.getElementById("menu");
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  // Suivi des clics globaux sur les numéros d'appel, WhatsApp, et réseaux sociaux
  useEffect(() => {
    const handleGlobalClicks = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // WhatsApp
      if (target.closest('a[href*="wa.me"]') || target.closest('a[href*="whatsapp"]')) {
        trackEvent("click_whatsapp", { elementId: target.id || "unnamed_whatsapp_link" });
      }
      // Phone
      else if (target.closest('a[href^="tel:"]')) {
        const telHref = (target.closest('a[href^="tel:"]') as HTMLAnchorElement).href;
        trackEvent("click_phone", { phoneNumber: telHref });
      }
      // Google Maps Itinerary
      else if (target.closest('a[href*="maps.google.com"]') || target.closest('a[href*="maps.app.goo.gl"]')) {
        trackEvent("click_directions");
      }
      // Instagram
      else if (target.closest('a[href*="instagram.com"]')) {
        trackEvent("social_instagram");
      }
    };

    window.addEventListener("click", handleGlobalClicks);
    return () => window.removeEventListener("click", handleGlobalClicks);
  }, []);

  return (
    <div className="min-h-screen bg-[#060607] text-[#F7F7F7] font-sans antialiased overflow-x-hidden relative">
      
      {/* Noise overlay for cinematic luxury paper texture */}
      <div className="noise-overlay" />

      {/* Aesthetics Manager: Loader, particles, custom cursor, sound synthethizer */}
      <AestheticsManager />
      
      {/* Dynamic SEO Meta Tags & Section Auto-Scroll manager */}
      <MetaTagsManager />
      
      {/* 2. En-tête / Navigation principal */}
      <Header t={t} lang={lang} setLang={setLang} onOpen3DMenu={() => setIsBookMenuOpen(true)} />

      {/* 3. Section Hero Cinématique */}
      <Hero t={t} lang={lang} />

      {/* 4. Section Catégories du Menu */}
      <MenuCategories
        t={t}
        lang={lang}
        onSelectCategory={handleSelectCategory}
        selectedCategory={selectedCategory}
        onOpen3DMenu={() => setIsBookMenuOpen(true)}
      />

      {/* 5. Section Plats Signatures & Filtres */}
      <SignatureDishes
        t={t}
        lang={lang}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />

      {/* 6. Section "L'Expérience Rayan" */}
      <Experience t={t} lang={lang} />

      {/* 8. Section Anniversaires, Groupes & Réservations */}
      <Celebrations t={t} lang={lang} />

      {/* 9. Galerie Photo Éditoriale avec Lightbox */}
      <Gallery t={t} lang={lang} />

      {/* 10. Témoignages & Avis Clients réels */}
      <Testimonials t={t} lang={lang} />

      {/* 11. Informations de Localisation, Horaires & Google Maps */}
      <ContactLocation t={t} lang={lang} />

      {/* 12. Pied de Page (Footer) */}
      <Footer t={t} lang={lang} />

      {/* 13. Barre d'action collante en bas sur Mobile */}
      <MobileActionBar t={t} lang={lang} />

      {/* 14. Assistant conversationnel Gemini (Floating Chat) */}
      <AIAssistant t={t} lang={lang} />

      {/* 15. Menu 3D Interactif Overlay */}
      <InteractiveBookMenu3D
        isOpen={isBookMenuOpen}
        onClose={() => setIsBookMenuOpen(false)}
        lang={lang}
        t={t}
      />

    </div>
  );
}
