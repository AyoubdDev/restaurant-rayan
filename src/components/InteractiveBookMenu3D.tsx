import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Sparkles, ShoppingBag, Utensils, Award } from "lucide-react";
import { menuItems, menuCategories } from "../data/menu";
import { siteConfig } from "../data/site";
import { soundManager } from "../utils/sound";
import SafeImage from "./SafeImage";

const categoryPageMap: Record<string, number> = {
  grillades: 3,         // Grillades -> Page 3
  poissons: 4,          // Poissons -> Page 4
  "cuisine-inter": 5,   // Cuisine Inter -> Page 5
  sushi: 6,             // Sushi -> Page 6
  "tacos-sandwiches": 7,// Tacos -> Page 7
  breakfast: 8,         // Breakfast -> Page 8
  desserts: 9,          // Desserts -> Page 9
  boissons: 10,         // Boissons -> Page 10
};

interface InteractiveBookMenu3DProps {
  isOpen: boolean;
  onClose: () => void;
  lang: string;
  t: any;
}

export default function InteractiveBookMenu3D({
  isOpen,
  onClose,
  lang,
  t,
}: InteractiveBookMenu3DProps) {
  // We have 12 pages in total (0 to 11)
  // Page 0: Front Cover
  // Page 1: Inside Cover
  // Page 2: Preface / Chef's Note
  // Page 3: Grillades
  // Page 4: Poissons
  // Page 5: Cuisine Internationale
  // Page 6: Sushi
  // Page 7: Tacos & Sandwiches
  // Page 8: Petit-Déjeuner
  // Page 9: Desserts & Gelato
  // Page 10: Boissons
  // Page 11: Back Cover
  const [activePage, setActivePage] = useState<number>(0);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const totalSheets = 6; // Desktop sheets (calculates sheet indices 0 to 5)
  const currentSheet = Math.floor((activePage + 1) / 2);

  // Calculate current left and right page indices for flat desktop spread
  let leftPageNum: number | null = null;
  let rightPageNum: number | null = null;

  if (activePage === 0) {
    leftPageNum = null;
    rightPageNum = 0;
  } else if (activePage === 11) {
    leftPageNum = 11;
    rightPageNum = null;
  } else {
    const spreadIndex = activePage % 2 === 1 ? activePage : activePage - 1;
    leftPageNum = spreadIndex;
    rightPageNum = spreadIndex + 1;
  }

  // Responsive layout check
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      setActivePage(0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Category dishes filtering
  const getCategoryItems = (catId: string) => {
    return menuItems.filter((item) => {
      if (catId === "breakfast" && item.id.startsWith("pdej")) return true;
      if (catId === "grillades" && item.id.startsWith("grill")) return true;
      if (catId === "poissons" && item.id.startsWith("poisson")) return true;
      if (catId === "sushi" && item.id.startsWith("sushi")) return true;
      if (catId === "cuisine-inter" && item.id.startsWith("inter")) return true;
      if (catId === "tacos-sandwiches" && (item.id.startsWith("tacos") || item.id.startsWith("sand"))) return true;
      if (catId === "desserts" && (item.id.startsWith("gelato") || item.id.startsWith("dessert"))) return true;
      if (catId === "boissons" && item.id.startsWith("boisson")) return true;
      return false;
    });
  };

  const handleNext = () => {
    if (isFlipping) return;
    if (isMobile) {
      if (activePage < 11) {
        soundManager.playClick();
        setIsFlipping(true);
        setActivePage((prev) => prev + 1);
        setTimeout(() => setIsFlipping(false), 600);
      }
    } else {
      // Desktop goes next spread-by-spread
      if (activePage === 0) {
        soundManager.playClick();
        setIsFlipping(true);
        setActivePage(1);
        setTimeout(() => setIsFlipping(false), 600);
      } else if (activePage < 9) {
        soundManager.playClick();
        setIsFlipping(true);
        setActivePage((prev) => prev + 2);
        setTimeout(() => setIsFlipping(false), 600);
      } else if (activePage < 11) {
        soundManager.playClick();
        setIsFlipping(true);
        setActivePage(11);
        setTimeout(() => setIsFlipping(false), 600);
      }
    }
  };

  const handlePrev = () => {
    if (isFlipping) return;
    if (isMobile) {
      if (activePage > 0) {
        soundManager.playClick();
        setIsFlipping(true);
        setActivePage((prev) => prev - 1);
        setTimeout(() => setIsFlipping(false), 600);
      }
    } else {
      // Desktop goes prev spread-by-spread
      if (activePage === 11) {
        soundManager.playClick();
        setIsFlipping(true);
        setActivePage(9);
        setTimeout(() => setIsFlipping(false), 600);
      } else if (activePage > 2) {
        soundManager.playClick();
        setIsFlipping(true);
        setActivePage((prev) => prev - 2);
        setTimeout(() => setIsFlipping(false), 600);
      } else if (activePage > 0) {
        soundManager.playClick();
        setIsFlipping(true);
        setActivePage(0);
        setTimeout(() => setIsFlipping(false), 600);
      }
    }
  };

  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      // Swiped left
      if (lang === "ar") {
        handlePrev();
      } else {
        handleNext();
      }
    } else if (info.offset.x > swipeThreshold) {
      // Swiped right
      if (lang === "ar") {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  const goToCategoryPage = (catId: string) => {
    if (isFlipping) return;
    const categoryPageMap: Record<string, number> = {
      grillades: 3,         // Grillades -> Page 3
      poissons: 4,          // Poissons -> Page 4
      "cuisine-inter": 5,   // Cuisine Inter -> Page 5
      sushi: 6,             // Sushi -> Page 6
      "tacos-sandwiches": 7,// Tacos -> Page 7
      breakfast: 8,         // Breakfast -> Page 8
      desserts: 9,          // Desserts -> Page 9
      boissons: 10,         // Boissons -> Page 10
    };

    const targetPage = categoryPageMap[catId] ?? 3;
    soundManager.playClick();
    setIsFlipping(true);
    setActivePage(targetPage);
    setTimeout(() => setIsFlipping(false), 600);
  };

  const triggerWhatsAppOrder = (itemName: string) => {
    soundManager.playSuccess();
    const message = lang === "ar"
      ? `مرحباً مطعم ريان، أود طلب: ${itemName} من فضلكم.`
      : `Bonjour Restaurant Rayan, j'aimerais commander le plat suivant : ${itemName}.`;
    const encodedText = encodeURIComponent(message);
    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${encodedText}`, "_blank");
  };

  // Image assets mapping for page headers inside the book
  const pageImages: Record<number, string> = {
    3: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80", // Grillades
    4: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=600&auto=format&fit=crop&q=80", // Poissons
    5: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80", // Cuisine Inter
    6: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&auto=format&fit=crop&q=80", // Sushi
    7: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&auto=format&fit=crop&q=80", // Tacos
    8: "https://images.unsplash.com/photo-1496042491112-e743a445ec1a?w=600&auto=format&fit=crop&q=80", // Breakfast
    9: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&auto=format&fit=crop&q=80", // Desserts
    10: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80", // Boissons
  };

  // Helper classes for responsive margin and padding shift (to avoid binder rings covering content)
  const getPagePaddingClass = (idx: number) => {
    if (!isMobile) return "p-8 sm:p-12";
    const isRtl = lang === "ar";
    if (isRtl) {
      return "pt-7 pb-7 pr-11 pl-5"; // shift right on RTL (since binder is on right)
    } else {
      return "pt-7 pb-7 pl-11 pr-5"; // shift left on LTR (since binder is on left)
    }
  };

  const getBorderInsets = () => {
    if (!isMobile) return "inset-4";
    const isRtl = lang === "ar";
    if (isRtl) {
      return "top-4 bottom-4 left-4 right-10";
    } else {
      return "top-4 bottom-4 left-10 right-4";
    }
  };

  const getInnerBorderInsets = () => {
    if (!isMobile) return "inset-[22px]";
    const isRtl = lang === "ar";
    if (isRtl) {
      return "top-5.5 bottom-5.5 left-5.5 right-11.5";
    } else {
      return "top-5.5 bottom-5.5 left-11.5 right-5.5";
    }
  };

  const getCornerOrnamentClasses = () => {
    const isRtl = lang === "ar";
    if (!isMobile) {
      return {
        topLeft: "top-6 left-6",
        topRight: "top-6 right-6",
        bottomLeft: "bottom-6 left-6",
        bottomRight: "bottom-6 right-6",
      };
    }
    if (isRtl) {
      return {
        topLeft: "top-6 left-6",
        topRight: "top-6 right-12",
        bottomLeft: "bottom-6 left-6",
        bottomRight: "bottom-6 right-12",
      };
    } else {
      return {
        topLeft: "top-6 left-12",
        topRight: "top-6 right-6",
        bottomLeft: "bottom-6 left-12",
        bottomRight: "bottom-6 right-6",
      };
    }
  };

  // Render contents of a single page
  const renderPage = (pageIndex: number) => {
    const ornaments = getCornerOrnamentClasses();

    // 0: COVER FRONT
    if (pageIndex === 0) {
      return (
        <div 
          className={`w-full h-full flex flex-col justify-between text-center relative bg-gradient-to-b from-[#1c160e] via-[#0e0b07] to-[#1c160e] text-white ${getPagePaddingClass(0)}`}
          dir={lang === "ar" ? "rtl" : "ltr"}
        >
          {/* Cover Royal golden accents */}
          <div className={`absolute border-2 border-[#D4AF37]/35 pointer-events-none rounded-xl ${getBorderInsets()}`}></div>
          <div className={`absolute border border-[#D4AF37]/15 pointer-events-none rounded-xl ${getInnerBorderInsets()}`}></div>
          
          {/* Corner gold ornaments */}
          <div className={`absolute w-6 h-6 border-t-2 border-l-2 border-[#D4AF37]/60 pointer-events-none ${ornaments.topLeft}`}></div>
          <div className={`absolute w-6 h-6 border-t-2 border-r-2 border-[#D4AF37]/60 pointer-events-none ${ornaments.topRight}`}></div>
          <div className={`absolute w-6 h-6 border-b-2 border-l-2 border-[#D4AF37]/60 pointer-events-none ${ornaments.bottomLeft}`}></div>
          <div className={`absolute w-6 h-6 border-b-2 border-r-2 border-[#D4AF37]/60 pointer-events-none ${ornaments.bottomRight}`}></div>

          <div className="mt-8 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full border-2 border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] font-serif text-2xl tracking-widest bg-black/40 shadow-inner mb-2 animate-pulse">
              R
            </div>
            <span className="text-[9px] font-mono tracking-[0.3em] text-[#D4AF37]/75 uppercase">
              PRESTIGE ROYAL
            </span>
          </div>

          <div className="space-y-4 px-2 my-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black text-[#F8E7A0] tracking-[0.15em] drop-shadow-md">
              RAYAN
            </h1>
            <div className="flex items-center justify-center gap-3">
              <span className="h-[1px] w-8 bg-[#D4AF37]/40"></span>
              <span className="text-[#D4AF37] text-xs">◆</span>
              <span className="h-[1px] w-8 bg-[#D4AF37]/40"></span>
            </div>
            <p className="text-[10px] sm:text-xs font-mono tracking-[0.25em] text-[#D4AF37] uppercase">
              {lang === "ar" ? "قائمة الطعام التفاعلية" : "CARTE GASTRONOMIQUE INTERACTIVE"}
            </p>
            <p className="text-[11px] text-[#C7A35B] italic max-w-xs mx-auto font-light leading-relaxed">
              {lang === "ar"
                ? "انغمس في عالم من الفخامة والنكهات الأصيلة المشوية والمعدة بعناية فائقة."
                : "Une expérience immersive d'exception au cœur du feu de bois et de la haute cuisine."}
            </p>
          </div>

          <div className="mb-8 space-y-1">
            <p className="text-[8px] font-mono tracking-widest text-[#D4AF37]/60 uppercase">
              {lang === "ar" ? "الشيف التنفيذي" : "CHEF EXÉCUTIF"}
            </p>
            <p className="text-sm font-serif text-white/90 tracking-widest">
              Yassine El Amrani
            </p>
          </div>
        </div>
      );
    }

    // 1: INSIDE COVER (Parchment)
    if (pageIndex === 1) {
      return (
        <div 
          className={`w-full h-full flex flex-col justify-center items-center text-center relative bg-[#FAF6EE] text-[#2C1B0C] ${getPagePaddingClass(1)}`}
          dir={lang === "ar" ? "rtl" : "ltr"}
        >
          <div className={`absolute border border-[#8C6F3D]/20 pointer-events-none rounded-lg ${getBorderInsets()}`}></div>
          <div className={`absolute border border-[#8C6F3D]/5 pointer-events-none rounded-lg ${getInnerBorderInsets()}`}></div>
          
          <div className="max-w-xs space-y-4">
            <Award className="w-8 h-8 text-[#8C6F3D] mx-auto opacity-70" />
            <h3 className="text-lg font-serif font-bold uppercase tracking-widest text-[#2c1b0c]">
              {lang === "ar" ? "شغف التميز" : "L'art & La Manière"}
            </h3>
            <div className="w-12 h-[1px] bg-[#8C6F3D]/30 mx-auto"></div>
            <p className="text-xs text-[#5C4D3C] font-serif leading-relaxed italic">
              {lang === "ar"
                ? "نختار لحومنا وأسماكنا ومكوناتنا الطازجة يومياً من أفضل المزارع والمنتجين المحليين لنضمن لكم تميزاً لا يضاهى."
                : "Nous sélectionnons rigoureusement nos viandes nobles et nos arrivages marins chaque matin pour vous offrir l'excellence à chaque bouchée."}
            </p>
          </div>
        </div>
      );
    }

    // 2: WELCOME / CHEF'S NOTE
    if (pageIndex === 2) {
      return (
        <div 
          className={`w-full h-full flex flex-col justify-between relative bg-[#FDFBF7] text-[#2C1B0C] ${getPagePaddingClass(2)}`}
          dir={lang === "ar" ? "rtl" : "ltr"}
        >
          {/* Vintage border decoration */}
          <div className={`absolute border border-[#8C6F3D]/25 pointer-events-none rounded-lg ${getBorderInsets()}`}></div>
          <div className={`absolute border border-[#8C6F3D]/5 pointer-events-none rounded-lg ${getInnerBorderInsets()}`}></div>

          <div className="mt-4 text-center">
            <span className="text-[9px] font-mono text-[#8C6F3D] tracking-widest uppercase block mb-1">
              {lang === "ar" ? "كلمة ترحيبية" : "PRÉLUDE DU CHEF"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1107] tracking-wide">
              {lang === "ar" ? "مرحباً بكم في ريان" : "Bienvenue Chez Rayan"}
            </h2>
            <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-[#8C6F3D]/40 to-transparent mx-auto mt-2.5"></div>
          </div>

          <div className="my-auto space-y-5 text-center max-w-sm mx-auto px-2">
            <p className="text-xs sm:text-sm text-[#4E4131] font-serif leading-relaxed font-light">
              {lang === "ar"
                ? "في مطعم ريان، نصنع اللحظات الاستثنائية. يسعدنا أن نرحب بكم في هذا السفر الحسي الفريد الذي يجمع بين أصالة شواية الحطب والمهارة والتقنيات العصرية."
                : "À la table du restaurant Rayan, chaque instant est une célébration. Nous vous proposons un voyage au cœur des traditions de la grillade marocaine authentique et de la gastronomie moderne."}
            </p>
            <p className="text-xs sm:text-sm text-[#4E4131] font-serif italic leading-relaxed">
              {lang === "ar"
                ? "كل طبق هو حكاية شغف ورقي نهديها إليكم بامتنان."
                : "Chaque assiette raconte une histoire de passion, d'art et de goût que nous partageons with vous."}
            </p>
          </div>

          <div className="mb-4 text-center">
            <p className="text-[#8C6F3D] font-serif text-sm italic mb-0.5">
              Chef Yassine El Amrani
            </p>
            <p className="text-[8px] font-mono text-[#A19584] tracking-wider uppercase">
              {lang === "ar" ? "كبير طهاة مطعم ريان" : "CHEF EXÉCUTIF ET MAÎTRE GRILLADIN"}
            </p>
          </div>
        </div>
      );
    }

    // 11: BACK COVER
    if (pageIndex === 11) {
      return (
        <div 
          className={`w-full h-full flex flex-col justify-between text-center relative bg-gradient-to-b from-[#1c160e] via-[#0e0b07] to-[#1c160e] text-white ${getPagePaddingClass(11)}`}
          dir={lang === "ar" ? "rtl" : "ltr"}
        >
          <div className={`absolute border-2 border-[#D4AF37]/35 pointer-events-none rounded-xl ${getBorderInsets()}`}></div>
          <div className={`absolute border border-[#D4AF37]/15 pointer-events-none rounded-xl ${getInnerBorderInsets()}`}></div>

          <div className="mt-8 flex flex-col items-center">
            <span className="text-xs font-mono tracking-widest text-[#D4AF37]/80 uppercase">
              RAYAN
            </span>
            <div className="w-12 h-[1px] bg-[#D4AF37]/25 mt-2"></div>
          </div>

          <div className="my-auto space-y-6 max-w-xs mx-auto">
            <h3 className="text-xl sm:text-2xl font-serif text-[#F8E7A0] tracking-wider">
              {lang === "ar" ? "شغف لا ينتهي" : lang === "en" ? "An Infinite Passion" : "Une Expérience Infinie"}
            </h3>
            <p className="text-xs text-[#B7B2A8] leading-relaxed font-light font-serif italic">
              {lang === "ar"
                ? "نسعد دائماً باستقبالكم وتلبية تطلعاتكم بذوق رفيع وترحيب ملكي أصيل."
                : lang === "en"
                ? "We are always delighted to welcome you and exceed your expectations with noble refinement."
                : "Nous sommes honorés de votre confiance et espérons vous revoir très bientôt pour d'autres moments magiques."}
            </p>
            
            <div className="space-y-2 pt-4">
              <p className="text-[10px] font-mono text-[#D4AF37] tracking-wider">
                COMMANDE & RÉSERVATION
              </p>
              <p className="text-sm font-bold font-mono tracking-wider text-white">
                {siteConfig.phonePrimary}
              </p>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-[8px] font-mono text-[#B7B2A8]/50 tracking-widest uppercase">
              © {new Date().getFullYear()} RESTAURANT RAYAN. COUTURE DESIGN.
            </p>
          </div>
        </div>
      );
    }

    // DISH CATEGORY PAGES
    const categoriesList = [
      "grillades",         // Page 3 (Sheet 1 Back)
      "poissons",          // Page 4 (Sheet 2 Front)
      "cuisine-inter",     // Page 5 (Sheet 2 Back)
      "sushi",             // Page 6 (Sheet 3 Front)
      "tacos-sandwiches",  // Page 7 (Sheet 3 Back)
      "breakfast",         // Page 8 (Sheet 4 Front)
      "desserts",          // Page 9 (Sheet 4 Back)
      "boissons",          // Page 10 (Sheet 5 Front)
    ];

    const categoryId = categoriesList[pageIndex - 3];
    const category = menuCategories.find((c) => c.id === categoryId);
    if (!category) return null;

    const items = getCategoryItems(categoryId);
    const headerImage = pageImages[pageIndex];

    return (
      <div 
        className="w-full h-full flex flex-col justify-between relative bg-[#FDFBF7] text-[#2C1B0C] overflow-hidden"
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
        {/* Parchment border framing */}
        <div className={`absolute border border-[#8C6F3D]/20 pointer-events-none rounded-lg z-20 ${getBorderInsets()}`}></div>

        {/* Elegant top background crop image of category */}
        {headerImage && (
          <div className={`w-full relative overflow-hidden shadow-md ${isMobile ? "h-[22%]" : "h-[28%]"}`}>
            <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-black/35 to-black/5 z-10" />
            <SafeImage
              src={headerImage}
              alt={lang === "ar" ? category.titleAr : category.titleFr}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            
            {/* Overlay Category Title */}
            <div className={`absolute bottom-3 z-20 flex justify-between items-end ${
              isMobile 
                ? (lang === "ar" ? "right-11 left-5" : "left-11 right-5") 
                : "inset-x-6"
            }`}>
              <div>
                <span className="text-[8px] font-mono tracking-widest text-[#F8E7A0] uppercase block">
                  {lang === "ar" ? "قائمة ريان" : "CARTE PRESTIGE"}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-black text-white tracking-tight leading-none">
                  {lang === "ar" ? category.titleAr : category.titleFr}
                </h3>
              </div>
              <span className="text-[10px] text-white/80 font-mono tracking-widest">
                0{pageIndex - 2}
              </span>
            </div>
          </div>
        )}

        {/* Dynamic decorative top divider */}
        <div className={`w-16 h-[1.5px] bg-gradient-to-r from-transparent via-[#8C6F3D]/30 to-transparent mx-auto z-10 ${isMobile ? "mt-2" : "mt-4"}`} />

        {/* Dishes list with highly readable layout & compact design for mobile */}
        <div className={`flex-grow flex flex-col justify-start space-y-3 sm:space-y-4 z-10 overflow-y-auto custom-scrollbar ${
          isMobile 
            ? (lang === "ar" ? "pr-11 pl-5 pt-1 pb-2" : "pl-11 pr-5 pt-1 pb-2") 
            : "px-8 py-2 justify-center my-auto"
        }`}>
          {items.length === 0 ? (
            <div className="text-center py-8 text-xs text-[#8A8170] italic font-serif">
              {lang === "ar" ? "أطباقنا الفاخرة تحت التحديث..." : "De nouvelles créations arrivent bientôt..."}
            </div>
          ) : (
            items.slice(0, 3).map((item) => (
              <div 
                key={item.id} 
                className="group relative border-b border-[#8C6F3D]/12 pb-3 last:border-none last:pb-0"
              >
                <div className="flex gap-3 items-start">
                  {/* Small dish thumbnail */}
                  {item.image && (
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden flex-shrink-0 border border-[#8C6F3D]/15 shadow-sm bg-stone-100">
                      <SafeImage
                        src={item.image}
                        alt={lang === "ar" ? item.nameAr : item.nameFr}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                  )}

                  {/* Dish details */}
                  <div className="flex-grow min-w-0">
                    {/* Item header with Name & Price */}
                    <div className="flex justify-between items-baseline gap-1.5 mb-0.5">
                      <h4 className="text-[13px] sm:text-base font-serif font-bold text-[#1C1107] leading-tight group-hover:text-[#8C6F3D] transition-colors truncate">
                        {lang === "ar" ? item.nameAr : item.nameFr}
                      </h4>
                      <span className="flex-grow border-b border-dotted border-[#8C6F3D]/25 mx-1.5"></span>
                      <span className="text-[11px] sm:text-sm font-mono font-bold text-[#8C6F3D] bg-[#8C6F3D]/5 px-1.5 py-0.5 rounded border border-[#8C6F3D]/10 whitespace-nowrap">
                        {item.price} DH
                      </span>
                    </div>

                    {/* Legible description with safety clamp to fit screens nicely */}
                    <p className="text-[10px] sm:text-xs text-[#5C4D3C] font-serif leading-relaxed mb-1.5 max-w-[98%] font-light line-clamp-2">
                      {lang === "ar" ? item.descriptionAr : item.descriptionFr}
                    </p>

                    {/* Bottom line: ordering and badges */}
                    <div className="flex justify-between items-center gap-2">
                      <div className="flex gap-1 items-center overflow-hidden flex-wrap max-w-[60%]">
                        {item.isSignature && (
                          <span className="inline-flex items-center gap-0.5 bg-[#8C6F3D]/10 text-[#8C6F3D] font-mono text-[7px] sm:text-[8px] font-bold uppercase tracking-wider px-1 py-0.5 rounded shadow-sm border border-[#8C6F3D]/15 whitespace-nowrap">
                            ★ {lang === "ar" ? "مميز" : "SIGNATURE"}
                          </span>
                        )}
                        {item.badgeFr && (
                          <span className="bg-[#A19584]/10 text-[#4E4131] font-mono text-[7px] sm:text-[8px] uppercase tracking-wider px-1 py-0.5 rounded whitespace-nowrap">
                            {lang === "ar" ? item.badgeAr : item.badgeFr}
                          </span>
                        )}
                      </div>
                      
                      {/* Order Button */}
                      <button
                        onClick={() => triggerWhatsAppOrder(lang === "ar" ? item.nameAr : item.nameFr)}
                        className="inline-flex items-center gap-1 text-[9px] sm:text-xs text-white bg-[#8C6F3D] hover:bg-[#1C1107] active:scale-95 px-2 py-0.5 sm:px-3 sm:py-1 rounded font-bold uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-[#8C6F3D]/15 cursor-pointer whitespace-nowrap"
                      >
                        <ShoppingBag className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        <span>{lang === "ar" ? "طلب" : "Commander"}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Page Footer */}
        <div className="mb-4 text-center text-[9px] font-mono text-[#A19584] tracking-widest z-10 flex justify-between items-center px-8">
          <span>{lang === "ar" ? "ريان" : "RAYAN"}</span>
          <span>{pageIndex}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-xl p-3 sm:p-6 overflow-hidden">
      
      {/* 3D Core helper CSS styles injected dynamically to guarantee 3D support */}
      <style dangerouslySetInnerHTML={{__html: `
        .perspective-container {
          perspective: 2500px;
          transform-style: preserve-3d;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(140, 111, 61, 0.2);
          border-radius: 10px;
        }
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}} />

      {/* Luxury Ambience desk lighting overlay */}
      <div className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-30 mix-blend-overlay bg-[url('https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=1600&auto=format&fit=crop&q=80')]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30 pointer-events-none" />

      {/* Top Header Controls */}
      <div className="absolute top-4 inset-x-4 sm:inset-x-8 flex justify-between items-center z-50">
        <div className="flex items-center gap-2">
          <Utensils className="w-5 h-5 text-[#D4AF37] animate-pulse" />
          <span className="text-xs font-mono tracking-widest text-[#D4AF37] uppercase font-bold">
            {lang === "ar" ? "مطعم ريان الفاخر" : "CARTE ROYALE DE RAYAN"}
          </span>
        </div>
        
        {/* Rounded Gold Close button */}
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full border border-[#D4AF37]/35 hover:border-[#D4AF37] bg-black/60 text-[#D4AF37] hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-90"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* DESKTOP Left Sidebar Category bookmarks */}
      <div className="absolute left-6 top-24 bottom-24 flex-col justify-center gap-2.5 z-40 hidden xl:flex">
        <span className="text-[9px] font-mono tracking-[0.25em] text-[#D4AF37]/40 uppercase vertical-text mb-4">
          {lang === "ar" ? "الفهرس الملكي" : "CHAPITRES DE LA CARTE"}
        </span>
        {menuCategories.map((cat) => {
          const catPage = categoryPageMap[cat.id];
          const isCatActive = isMobile 
            ? activePage === catPage 
            : (leftPageNum === catPage || rightPageNum === catPage);
            
          return (
            <button
              key={cat.id}
              onClick={() => goToCategoryPage(cat.id)}
              className={`group py-1.5 px-3 rounded border text-left transition-all duration-300 transform hover:translate-x-1 cursor-pointer ${
                isCatActive
                  ? "bg-[#D4AF37]/15 border-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.2)]"
                  : "bg-black/45 border-[#D4AF37]/10 hover:border-[#D4AF37]/50"
              }`}
            >
              <span className={`text-[10px] font-mono transition-colors whitespace-nowrap ${
                isCatActive ? "text-[#D4AF37] font-bold" : "text-[#A7A7A7] group-hover:text-[#D4AF37]"
              }`}>
                {lang === "ar" ? cat.titleAr : cat.titleFr}
              </span>
            </button>
          );
        })}
      </div>

      {/* MASTER BOOK 3D PERSPECTIVE CONTAINER */}
      <div className="relative w-full max-w-4xl flex flex-col items-center justify-center z-10 px-2 sm:px-4 select-none">
        
        {/* Swipe & Drag interactive 3D container with responsive dimensions */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={handleDragEnd}
          className={`relative flex items-center justify-center cursor-grab active:cursor-grabbing ${
            isMobile 
              ? "w-full max-w-[340px] aspect-[1/1.43] h-[58vh] max-h-[500px]" 
              : "w-full aspect-[1.4/1] max-h-[72vh]"
          } perspective-container`}
        >
          {/* Real Leather physical hardback book cover behind pages */}
          <div className={`absolute inset-0 rounded-[2rem] bg-gradient-to-r from-[#0d0904] via-[#1d140b] to-[#0d0904] border border-[#8C6F3D]/30 shadow-[0_35px_80px_rgba(0,0,0,0.95)] z-0 pointer-events-none ${
            isMobile ? "-m-2.5 sm:-m-4" : "-m-4 sm:-m-6"
          }`} />

          {/* Book central gold spine binding lines - only for desktop double spread */}
          {!isMobile && (
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-4 bg-gradient-to-r from-black/45 via-[#8C6F3D]/25 to-black/45 z-40 pointer-events-none" />
          )}

          {/* Page Stacks Depth Simulator (Simulates realistic stack thickness of closed/open book!) */}
          {!isMobile && (
            <>
              <div className="absolute right-0 top-1 bottom-1 w-2 rounded-r bg-gradient-to-l from-white/95 via-[#E6DFD3] to-gray-400 border border-gray-500/20 z-0 pointer-events-none shadow-md transform translate-x-1" />
              <div className="absolute left-0 top-1 bottom-1 w-2 rounded-l bg-gradient-to-r from-white/95 via-[#E6DFD3] to-gray-400 border border-gray-500/20 z-0 pointer-events-none shadow-md transform -translate-x-1" />
            </>
          )}

          {/* DYNAMIC SPREAD OR SINGLE RENDERER */}
          <div className="w-full h-full rounded-2xl overflow-hidden shadow-[inset_0_0_60px_rgba(0,0,0,0.06)] relative">
            
            {isMobile ? (
              // 📱 MOBILE TACTILE PAGE-TURN WITH METALLIC RING BINDER
              <div className="w-full h-full relative">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`mobile-page-${activePage}`}
                    initial={{ 
                      opacity: 0, 
                      x: lang === "ar" ? -60 : 60,
                    }}
                    animate={{ 
                      opacity: 1, 
                      x: 0 
                    }}
                    exit={{ 
                      opacity: 0, 
                      x: lang === "ar" ? 60 : -60,
                    }}
                    transition={{ type: "spring", stiffness: 120, damping: 18 }}
                    className="w-full h-full relative rounded-2xl shadow-xl overflow-hidden"
                  >
                    {renderPage(activePage)}

                    {/* Left/Right inner spine shadow to mimic paper bending */}
                    <div className={`absolute inset-y-0 w-8 pointer-events-none z-30 ${
                      lang === "ar" 
                        ? "right-0 bg-gradient-to-l from-black/20 to-transparent" 
                        : "left-0 bg-gradient-to-r from-black/20 to-transparent"
                    }`} />
                  </motion.div>
                </AnimatePresence>

                {/* Tactile Metallic Ring Binder Spiral in center side of Mobile single page */}
                <div className={`absolute top-4 bottom-4 w-4 flex flex-col justify-between items-center z-50 pointer-events-none ${
                  lang === "ar" ? "right-1.5" : "left-1.5"
                }`}>
                  {Array.from({ length: 10 }).map((_, idx) => (
                    <div 
                      key={idx} 
                      className="w-5 h-2.5 rounded-full bg-gradient-to-r from-[#7a5a22] via-[#E6DFD3] to-[#7a5a22] shadow-md border border-black/35 hover:scale-105 transition-transform"
                      style={{ transform: "rotate(-5deg)" }}
                    />
                  ))}
                </div>
              </div>
            ) : (
              // 💻 DESKTOP ROYAL FLAT DOUBLE-PAGE SPREAD BOOK
              <div className="w-full h-full flex relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#120d07] via-[#0e0a05] to-[#120d07]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`desktop-spread-${leftPageNum}-${rightPageNum}`}
                    initial={{ 
                      opacity: 0, 
                      x: lang === "ar" ? -60 : 60,
                    }}
                    animate={{ 
                      opacity: 1, 
                      x: 0 
                    }}
                    exit={{ 
                      opacity: 0, 
                      x: lang === "ar" ? 60 : -60,
                    }}
                    transition={{ type: "spring", stiffness: 120, damping: 18 }}
                    className="w-full h-full flex"
                  >
                    {/* Left half of the spread */}
                    <div className="w-1/2 h-full relative border-r border-[#8C6F3D]/20">
                      {leftPageNum === null ? (
                        /* Beautiful closed book leather texture on the left */
                        <div className="w-full h-full bg-gradient-to-b from-[#1c160e] via-[#0e0b07] to-[#1c160e] flex flex-col justify-between p-8 sm:p-12 text-center relative select-none">
                          <div className="absolute inset-4 border-2 border-[#D4AF37]/15 pointer-events-none rounded-xl"></div>
                        </div>
                      ) : (
                        renderPage(leftPageNum)
                      )}
                      {/* Realistic inner spine shadow for paper depth */}
                      <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black/35 to-transparent pointer-events-none z-30" />
                    </div>

                    {/* Right half of the spread */}
                    <div className="w-1/2 h-full relative">
                      {rightPageNum === null ? (
                        /* Beautiful closed book leather texture on the right */
                        <div className="w-full h-full bg-gradient-to-b from-[#1c160e] via-[#0e0b07] to-[#1c160e] flex flex-col justify-between p-8 sm:p-12 text-center relative select-none">
                          <div className="absolute inset-4 border-2 border-[#D4AF37]/15 pointer-events-none rounded-xl"></div>
                        </div>
                      ) : (
                        renderPage(rightPageNum)
                      )}
                      {/* Realistic inner spine shadow for paper depth */}
                      <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black/35 to-transparent pointer-events-none z-30" />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            )}
          </div>
        </motion.div>

        {/* Navigation buttons and swipes guide indicator */}
        <div className="mt-6 flex flex-col items-center gap-3">
          
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Prev button */}
            <button
              onClick={handlePrev}
              disabled={activePage === 0}
              className="w-12 h-12 rounded-full border border-[#D4AF37]/25 hover:border-[#D4AF37] bg-black/60 text-[#D4AF37] hover:text-white flex items-center justify-center transition-all cursor-pointer disabled:opacity-20 disabled:pointer-events-none active:scale-90"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Premium Gold active page indicator displaying the current section title */}
            <div className="flex flex-col items-center text-center px-4 py-1.5 min-w-[180px] sm:min-w-[240px] rounded-full bg-[#D4AF37]/8 border border-[#D4AF37]/20 shadow-inner">
              <span className="text-[10px] font-mono text-[#D4AF37]/65 uppercase tracking-widest mb-0.5">
                {isMobile 
                  ? `${lang === "ar" ? "الصفحة" : "PAGE"} ${activePage + 1} / 12` 
                  : `${lang === "ar" ? "الفصل" : "CHAPITRE"} ${currentSheet} / ${totalSheets}`}
              </span>
              <span className="text-xs font-mono text-[#D4AF37] font-bold tracking-wide uppercase truncate max-w-[160px] sm:max-w-[220px]">
                {activePage === 0 
                  ? (lang === "ar" ? "الغلاف الرئيسي" : "COUVERTURE") 
                  : activePage === 11
                  ? (lang === "ar" ? "الغلاف الخلفي" : "FIN DE CARTE")
                  : activePage === 1
                  ? (lang === "ar" ? "المقدمة الملكية" : "ACCUEIL ROYALE")
                  : activePage === 2
                  ? (lang === "ar" ? "ملاحظة الشيف" : "NOTE DU CHEF")
                  : activePage === 3
                  ? (lang === "ar" ? "المشويات" : "GRILLADES")
                  : activePage === 4
                  ? (lang === "ar" ? "الأسماك" : "POISSONS")
                  : activePage === 5
                  ? (lang === "ar" ? "المطبخ العالمي" : "CUISINE INTER.")
                  : activePage === 6
                  ? (lang === "ar" ? "السوشي" : "COLLECTION SUSHI")
                  : activePage === 7
                  ? (lang === "ar" ? "التاكو والسندويشات" : "TACOS & SANDWICHES")
                  : activePage === 8
                  ? (lang === "ar" ? "الفطور الملكي" : "PETIT-DÉJEUNER")
                  : activePage === 9
                  ? (lang === "ar" ? "الحلويات" : "DESSERTS & GELATO")
                  : (lang === "ar" ? "المشروبات" : "BOISSONS")}
              </span>
            </div>

            {/* Next button */}
            <button
              onClick={handleNext}
              disabled={activePage === 11}
              className="w-12 h-12 rounded-full border border-[#D4AF37]/25 hover:border-[#D4AF37] bg-black/60 text-[#D4AF37] hover:text-white flex items-center justify-center transition-all cursor-pointer disabled:opacity-20 disabled:pointer-events-none active:scale-90"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Swipe Interactive Indicator message */}
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-[#A7A7A7] uppercase tracking-wider animate-pulse mt-1">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>
              {lang === "ar" 
                ? "اسحب يساراً أو يميناً لتصفح القائمة في بعد ثلاثي مميز" 
                : "Balayez l'écran de gauche à droite pour feuilleter la carte en 3D"}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
