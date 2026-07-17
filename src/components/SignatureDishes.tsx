import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { menuItems, menuCategories } from "../data/menu";
import { siteConfig } from "../data/site";
import { soundManager } from "../utils/sound";
import SafeImage from "./SafeImage";
import { 
  ShoppingBag, 
  Utensils, 
  Sparkles 
} from "lucide-react";

interface SignatureDishesProps {
  t: any;
  lang: string;
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export default function SignatureDishes({
  t,
  lang,
  selectedCategory,
  onSelectCategory,
}: SignatureDishesProps) {
  const [activeTabMap, setActiveTabMap] = useState<Record<string, "info" | "ingredients">>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleCategoryClick = (catId: string, e: React.MouseEvent<HTMLButtonElement>) => {
    onSelectCategory(catId);
    soundManager.playClick();
    
    // Centrer en douceur le bouton de catégorie cliqué dans le conteneur de défilement horizontal
    const button = e.currentTarget;
    const container = scrollContainerRef.current;
    if (button && container) {
      const containerWidth = container.offsetWidth;
      const buttonOffsetLeft = button.offsetLeft;
      const buttonWidth = button.offsetWidth;
      const targetScrollLeft = buttonOffsetLeft - (containerWidth / 2) + (buttonWidth / 2);
      
      container.scrollTo({
        left: targetScrollLeft,
        behavior: "smooth"
      });
    }
  }  // WhatsApp order triggers
  const triggerWhatsAppOrder = (itemName: string) => {
    soundManager.playSuccess();
    const message = lang === "ar"
      ? `مرحباً مطعم ريان، أود طلب: ${itemName} من فضلكم.`
      : lang === "en"
      ? `Hello Restaurant Rayan, I would like to order the following dish: ${itemName}.`
      : `Bonjour Restaurant Rayan, j'aimerais commander le plat suivant : ${itemName}.`;
    const encodedText = encodeURIComponent(message);
    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${encodedText}`, "_blank");
  };

  // Helper to map item to category ID
  const getItemCategory = (itemId: string): string => {
    if (itemId.startsWith("pdej")) return "breakfast";
    if (itemId.startsWith("grill")) return "grillades";
    if (itemId.startsWith("poisson")) return "poissons";
    if (itemId.startsWith("sushi")) return "sushi";
    if (itemId.startsWith("inter")) return "cuisine-inter";
    if (itemId.startsWith("tacos") || itemId.startsWith("sand")) return "tacos-sandwiches";
    if (itemId.startsWith("gelato") || itemId.startsWith("boisson") || itemId.startsWith("dessert")) return "desserts";
    return "other";
  };

  // Dynamic premium details for dictionary lookups
  const getIngredients = (id: string, currentLang: string) => {
    if (id.includes("sushi")) {
      if (currentLang === "ar") return "سلمون أتلانتيك فاخر، أفوكادو الأطلس، أرز كوشيهيكاري متبل بخل الأرز، أعشاب بحرية نوري، سيزام محمص.";
      if (currentLang === "en") return "Wild Atlantic salmon, Atlas avocado, seasoned Koshihikari rice, royal Nori seaweed, toasted golden sesame.";
      return "Saumon Atlantique sauvage, Avocat de l'Atlas, Riz Koshihikari vinaigré, Feuille d'algue Nori royale, Sésame doré.";
    }
    if (id.includes("grill") || id.includes("beef") || id.includes("kefta")) {
      if (currentLang === "ar") return "لحم عجل مختار بعناية، أعشاب الأطلس المنسمة، ملح الهيمالايا، فلفل سيشوان، لمسة من زيت الزيتون البكر.";
      if (currentLang === "en") return "Noble beef tenderloin, Himalayan black salt, Sichuan pepper, wild Atlas thyme, truffle-infused olive oil.";
      return "Viande de bœuf noble, Sel noir d'Himalaya, Poivre de Sichuan, Thym sauvage de l'Atlas, Huile d'olive de truffe.";
    }
    if (id.includes("poisson") || id.includes("crevette") || id.includes("calamar")) {
      if (currentLang === "ar") return "سمك طازج من صيد اليوم، ثوم بلدي محمر، ليمون تارودانت المعتق، كزبرة طازجة، كمون بلدي.";
      if (currentLang === "en") return "Fresh wild catch of the day, preserved lemons from Taroudant, sweet caramelized garlic, fresh coriander, noble Marrakech cumin.";
      return "Pêche du jour sauvage, Citrons confits de Taroudant, Ail doux caramélisé, Coriandre fraîche, Cumin noble de Marrakech.";
    }
    if (id.includes("pdej") || id.includes("beldi") || id.includes("fassi")) {
      if (currentLang === "ar") return "بيض بلدي حر، عسل زهور برية، أملو اللوز والكراميل، زبدة تارودانت، خبز تافيرنوت ساخن.";
      if (currentLang === "en") return "Organic farm-fresh eggs, wild orange blossom honey, traditional almond Amlou, local farm butter, warm Tafarnout bread.";
      return "Œufs fermiers bio, Miel d'oranger sauvage, Amlou traditionnel, Beurre de terroir, Pain Tafarnout chaud.";
    }
    if (currentLang === "ar") return "توليفة الشيف السرية من البهارات والأعشاب الطازجة المحضرة يومياً.";
    if (currentLang === "en") return "Chef's secret blend of fresh seasonal spices, herbs, and noble infused oils.";
    return "Combinaison maraîchère de saison, herbes fraîches et aromates nobles infusés.";
  };

  const getWinePairing = (id: string, currentLang: string) => {
    if (id.includes("sushi") || id.includes("poisson")) {
      if (currentLang === "ar") return "شاي سينشا الياباني العضوي الساخن";
      if (currentLang === "en") return "Ideal pairing: Organic iced green Sencha tea";
      return "Accord idéal: Thé vert Sencha Impérial glacé";
    }
    if (id.includes("grill") || id.includes("beef")) {
      if (currentLang === "ar") return "شاي الزعفران الملكي الفاخر";
      if (currentLang === "en") return "Ideal pairing: Barrel-aged noble black grape juice";
      return "Accord idéal: Jus de raisin noir noble barriqué";
    }
    if (id.includes("pdej")) {
      if (currentLang === "ar") return "شاي النعناع والزعتر الفاسي الأصيل";
      if (currentLang === "en") return "Ideal pairing: Royal mint tea with pine nuts";
      return "Accord idéal: Infusion royale menthe et pignons de pin";
    }
    if (currentLang === "ar") return "كوكتيل فواكه استوائية طازج";
    if (currentLang === "en") return "Ideal pairing: Signature Citrus & Ginger Mocktail";
    return "Accord idéal: Mocktail Signature Agrumes & Gingembre";
  };

  const getChefRecommendation = (id: string, currentLang: string) => {
    if (id.includes("sushi") || id.includes("signature") || id.includes("beldi") || id.includes("grill")) {
      if (currentLang === "ar") return "★★ ينصح به بشدة لمذاقه المتوازن الفاخر";
      if (currentLang === "en") return "★★ Chef's Signature: Highly recommended for perfect balance";
      return "★★ Signature du Chef: Recommandé pour son équilibre";
    }
    if (currentLang === "ar") return "★ طبق متميز وعصري";
    if (currentLang === "en") return "★ Chef's Choice: A signature value from our kitchens";
    return "★ Chef's Choice: Une valeur sûre de notre cuisine";
  };



  // 📋 GOURMET RICH CARD for the GRID VIEW
  const MenuItemGridCard = ({ item }: { item: any; key?: any }) => {
    const activeTab = activeTabMap[item.id] || "info";

    return (
      <motion.div 
        layout
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="group bg-[#0c0d0f] border border-[#C7A35B]/15 rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.6)] flex flex-col h-full hover:border-[#D4AF37]/45 transition-colors duration-500 glow-gold-hover"
      >
        {/* Gourmet Photo */}
        <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
          <SafeImage 
            src={item.image} 
            alt={lang === "ar" ? item.nameAr : item.nameFr}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-106"
            style={{ aspectRatio: "16/10" }}
          />
          {/* Chef signature ribbon badge */}
          {item.isSignature && (
            <div className="absolute top-3 left-3 bg-[#D4AF37] text-[#090909] text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#090909] animate-pulse" />
              <span>{lang === "ar" ? "توقيع الشيف" : "Chef Signature"}</span>
            </div>
          )}
          {item.badgeFr && (
            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white border border-[#C7A35B]/30 text-[8px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md">
              {lang === "ar" ? item.badgeAr : item.badgeFr}
            </div>
          )}
        </div>

        {/* Details and Description Tabs */}
        <div className="p-5 flex-grow flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start gap-2 mb-3">
              <h4 className="text-base sm:text-lg font-serif font-bold text-[#F4EBDD] group-hover:text-[#F8E7A0] transition-colors leading-snug">
                {lang === "ar" ? item.nameAr : item.nameFr}
              </h4>
              <span className="text-sm font-mono font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1 rounded-full border border-[#D4AF37]/25 whitespace-nowrap shadow-sm group-hover:bg-[#D4AF37]/20 transition-all duration-300">
                {item.price} DH
              </span>
            </div>

            {/* Inline dynamic tab toggles */}
            <div className="flex gap-4 mb-3 border-b border-white/5 pb-1">
              <button 
                onClick={() => setActiveTabMap(p => ({ ...p, [item.id]: "info" }))}
                className={`text-[10px] font-mono uppercase tracking-wider transition-colors py-0.5 cursor-pointer ${activeTab === "info" ? "text-[#D4AF37] border-b border-[#D4AF37] font-bold" : "text-[#A7A7A7] hover:text-[#F7F7F7]"}`}
              >
                {lang === "ar" ? "الوصف" : "Description"}
              </button>
              <button 
                onClick={() => setActiveTabMap(p => ({ ...p, [item.id]: "ingredients" }))}
                className={`text-[10px] font-mono uppercase tracking-wider transition-colors py-0.5 cursor-pointer ${activeTab === "ingredients" ? "text-[#D4AF37] border-b border-[#D4AF37] font-bold" : "text-[#A7A7A7] hover:text-[#F7F7F7]"}`}
              >
                {lang === "ar" ? "التفاصيل والمرافقة" : "Détails & Accord"}
              </button>
            </div>
            
            <AnimatePresence mode="wait">
              {activeTab === "info" ? (
                <motion.p 
                  key="desc"
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-[#B7B2A8] font-light leading-relaxed mb-4"
                >
                  {lang === "ar" ? item.descriptionAr : item.descriptionFr}
                </motion.p>
              ) : (
                <motion.div 
                  key="ing"
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-[10px] space-y-1.5 text-[#B7B2A8] mb-4"
                >
                  <p className="italic text-[#F8E7A0]">
                    <strong>{lang === "ar" ? "المكونات: " : "Composition: "}</strong>
                    {getIngredients(item.id, lang)}
                  </p>
                  <p className="text-[#A7A7A7]/90 font-mono text-[9px]">
                    <strong>{lang === "ar" ? "المشروب المقترح: " : "Sommelier: "}</strong>
                    {getWinePairing(item.id, lang)}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-white/5">
            <span className="text-[9px] font-mono text-[#D4AF37]/80 italic">
              {getChefRecommendation(item.id, lang)}
            </span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => triggerWhatsAppOrder(lang === "ar" ? item.nameAr : item.nameFr)}
              className="inline-flex items-center gap-1.5 text-xs text-[#090909] bg-[#D4AF37] hover:bg-[#F8E7A0] px-4 py-2 rounded-lg font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-[#D4AF37]/20 cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              {lang === "ar" ? "اطلب الآن" : "Commander"}
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="menu" className="py-24 bg-[#090909] relative overflow-hidden">
      
      {/* Editorial Luxury Lighting Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#D4AF37]/5 rounded-full filter blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-[#D4AF37]/10 text-[#F8E7A0] rounded-full text-[10px] font-mono tracking-widest uppercase mb-4 border border-[#D4AF37]/20">
            {t.navMenu}
          </span>
          <h2 className="text-4xl sm:text-6xl font-serif font-medium text-[#F7F7F7] tracking-tight mb-6">
            {lang === "ar" ? "قائمة طعام ريان الفاخرة" : "Le dictionnaire culinaire de Rayan"}
          </h2>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]"></div>
            <span className="text-[#D4AF37] text-xs">◆</span>
            <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
          </div>
          <p className="text-sm text-[#A7A7A7] font-light max-w-xl mx-auto leading-relaxed">
            {lang === "ar" 
              ? "اكتشف أشهى أطباقنا الفاخرة والمعدة بكل حب وشغف لطلبها كوجبة ممتازة مباشرة على واتساب."
              : "Découvrez nos spécialités gastronomiques exclusives élaborées avec passion et commandez-les directement en un clic."}
          </p>
        </div>

        {/* Dynamic Category Selector Bookmark tabs */}
        <div className="relative max-w-4xl mx-auto mb-14 px-1 select-none">
          {/* Custom style injection for hiding scrollbars */}
          <style dangerouslySetInnerHTML={{ __html: `
            .no-scrollbar::-webkit-scrollbar {
              display: none !important;
            }
            .no-scrollbar {
              -ms-overflow-style: none !important;
              scrollbar-width: none !important;
            }
          `}} />

          {/* Luxury ambient light blending masks for horizontal scrolling indicator */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#090909] to-transparent pointer-events-none z-20"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#090909] to-transparent pointer-events-none z-20"></div>

          {/* Swipeable Horizontal list */}
          <div
            ref={scrollContainerRef}
            className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-3 px-8 flex-nowrap scroll-smooth snap-x touch-pan-x"
          >
            <button
              onClick={(e) => handleCategoryClick("all", e)}
              className={`px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer flex-shrink-0 snap-center ${
                selectedCategory === "all"
                  ? "bg-[#D4AF37] text-[#090909] shadow-lg shadow-[#D4AF37]/30 font-bold scale-102"
                  : "bg-[#111111] text-[#A7A7A7] border border-white/5 hover:border-[#D4AF37]/20 hover:text-[#F7F7F7]"
              }`}
            >
              {lang === "ar" ? "الكل" : "Tout"}
            </button>
            {menuCategories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={(e) => handleCategoryClick(cat.id, e)}
                  className={`px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer flex-shrink-0 snap-center ${
                    isActive
                      ? "bg-[#D4AF37] text-[#090909] shadow-lg shadow-[#D4AF37]/30 font-bold scale-102"
                      : "bg-[#111111] text-[#A7A7A7] border border-white/5 hover:border-[#D4AF37]/20 hover:text-[#F7F7F7]"
                  }`}
                >
                  {lang === "ar" ? cat.titleAr : cat.titleFr}
                </button>
              );
            })}
          </div>

          {/* Touch indicator hint */}
          <div className="flex justify-center mt-2">
            <span className="text-[9px] font-mono tracking-widest text-[#D4AF37]/45 uppercase flex items-center gap-1.5 sm:hidden">
              ← {lang === "ar" ? "مرر أفقياً لتصفح الأقسام" : "Faites défiler horizontalement"} →
            </span>
          </div>
        </div>

        {/* MODERN GRID VIEW (Impeccably responsive on mobile & gorgeous list layout) */}
        <div className="space-y-16">
          {/* Filter and group items */}
          {menuCategories
            .filter(cat => selectedCategory === "all" || selectedCategory === cat.id)
            .map((category) => {
              const categoryDishes = menuItems.filter(item => getItemCategory(item.id) === category.id);
              if (categoryDishes.length === 0) return null;

              return (
                <div key={category.id} id={`gourmet-category-${category.id}`} className="space-y-6">
                  {/* Category Title Header */}
                  <div className="border-b border-[#C7A35B]/20 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase flex items-center gap-1.5">
                        <Utensils className="w-3 h-3 text-[#D4AF37]" />
                        {lang === "ar" ? "الفصل اللذيذ" : "CHAPITRE GASTRONOMIQUE"}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#F4EBDD] tracking-tight transition-colors">
                        {lang === "ar" ? category.titleAr : category.titleFr}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-[#A7A7A7] font-light italic max-w-md leading-relaxed">
                      {lang === "ar" ? category.descriptionAr : category.descriptionFr}
                    </p>
                  </div>

                  {/* Highly responsive grid container */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {categoryDishes.map((dish) => (
                      <MenuItemGridCard key={dish.id} item={dish} />
                    ))}
                  </div>
                </div>
              );
            })}
        </div>

        {/* WhatsApp Call to action footer banner */}
        <div className="text-center mt-16">
          <p className="text-xs text-[#A7A7A7] font-mono uppercase tracking-widest mb-4">
            {lang === "ar" ? "لديكم رغبة مخصصة؟ تواصلوا معنا" : "Envie d'une création sur mesure ? Contactez-nous"}
          </p>
          <a
            href={siteConfig.socials.whatsappChat}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#D4AF37]/10 to-[#F8E7A0]/10 hover:from-[#D4AF37]/20 hover:to-[#F8E7A0]/20 text-[#F8E7A0] border border-[#D4AF37]/40 hover:border-[#F8E7A0] px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-lg cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#F8E7A0] animate-pulse" />
            <span>{lang === "ar" ? "طلب خاص عبر واتساب" : "Demande Spéciale sur WhatsApp"}</span>
          </a>
        </div>

      </div>
    </section>
  );
}
