import { menuCategories } from "../data/menu";
import SafeImage from "./SafeImage";
import { ArrowUpRight, Sparkles } from "lucide-react";

interface MenuCategoriesProps {
  t: any;
  lang: string;
  onSelectCategory: (categoryId: string) => void;
  selectedCategory: string;
  onOpen3DMenu: () => void;
}

export default function MenuCategories({
  t,
  lang,
  onSelectCategory,
  selectedCategory,
  onOpen3DMenu,
}: MenuCategoriesProps) {
  return (
    <section id="categories" className="py-20 bg-[#0c0d0e] border-y border-[#C7A35B]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Titre de Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-3 py-1 bg-[#C7A35B]/10 text-[#E8C878] rounded-full text-[10px] font-mono tracking-widest uppercase mb-3 border border-[#C7A35B]/20">
            {t.navMenu}
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#F4EBDD] tracking-tight mb-4">
            {t.categoriesTitle}
          </h2>
          <div className="w-12 h-1 bg-[#C7A35B] mx-auto mb-4 rounded"></div>
          <p className="text-xs sm:text-sm text-[#B7B2A8] font-light leading-relaxed mb-6">
            {t.categoriesSubtitle}
          </p>

          {/* Menu Launcher CTA */}
          <div className="flex justify-center mt-2 mb-4">
            <button
              onClick={() => onOpen3DMenu()}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-xs font-mono font-bold uppercase tracking-widest text-black bg-gradient-to-r from-[#D4AF37] via-[#F8E7A0] to-[#D4AF37] hover:scale-103 active:scale-98 transition-all shadow-[0_12px_24px_rgba(212,175,55,0.15)] hover:shadow-[0_15px_30px_rgba(212,175,55,0.3)] cursor-pointer group"
              data-cursor="interactive"
            >
              <Sparkles className="w-4.5 h-4.5 text-black animate-pulse" />
              <span>{lang === "ar" ? "عرض قائمة الطعام الكاملة" : "Consulter notre Carte Royale"}</span>
              <span className="bg-black/10 px-2 py-0.5 rounded text-[8px]">ROYAL</span>
            </button>
          </div>
        </div>

        {/* Grille de catégories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuCategories.map((category) => {
            const isSelected = selectedCategory === category.id;
            return (
              <div
                key={category.id}
                onClick={() => {
                  onSelectCategory(category.id);
                  // Défilement doux vers la section des plats
                  const target = document.getElementById("menu-items");
                  if (target) {
                    const offset = 100;
                    const position = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({ top: position, behavior: "smooth" });
                  }
                }}
                className={`group relative rounded-xl overflow-hidden bg-[#141516] border transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "border-[#E8C878] shadow-lg shadow-[#C7A35B]/10 transform -translate-y-1"
                    : "border-white/5 hover:border-[#C7A35B]/30 hover:shadow-lg hover:-translate-y-1"
                }`}
              >
                {/* Image de fond */}
                <div className="relative overflow-hidden aspect-[4/3]">
                  <SafeImage
                    src={category.image}
                    alt={lang === "ar" ? category.titleAr : category.titleFr}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    style={{ aspectRatio: "4/3" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141516] via-[#141516]/40 to-transparent"></div>
                </div>

                {/* Contenu */}
                <div className="p-5 relative z-10">
                  <h3 className="text-base sm:text-lg font-serif font-bold text-[#F4EBDD] mb-1.5 group-hover:text-[#E8C878] transition-colors flex justify-between items-center">
                    <span>{lang === "ar" ? category.titleAr : category.titleFr}</span>
                    <ArrowUpRight className="w-4 h-4 text-[#C7A35B] transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </h3>
                  <p className="text-xs text-[#B7B2A8] font-light leading-relaxed line-clamp-2">
                    {lang === "ar" ? category.descriptionAr : category.descriptionFr}
                  </p>

                  <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/5">
                    <span className="text-[10px] font-semibold text-[#C7A35B] uppercase tracking-wider group-hover:text-[#E8C878] transition-colors">
                      {t.btnViewDishes}
                    </span>
                  </div>
                </div>

                {/* Bordure stylisée dorée subtile pour sélection */}
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C7A35B] to-[#E8C878]"></div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
