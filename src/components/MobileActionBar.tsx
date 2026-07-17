import { siteConfig } from "../data/site";
import { UtensilsCrossed, MessageCircle, Phone, Compass } from "lucide-react";

interface MobileActionBarProps {
  t: any;
  lang: string;
}

export default function MobileActionBar({ t, lang }: MobileActionBarProps) {
  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#090A0B]/90 backdrop-blur-md border-t border-[#C7A35B]/20 pb-safe shadow-2xl">
      {/* Safe padding bottom for iPhones (pb-safe or fallback) */}
      <div className="grid grid-cols-4 items-center justify-between text-center py-2 px-2">
        
        {/* Bouton Menu */}
        <button
          onClick={() => handleScrollToSection("menu")}
          className="flex flex-col items-center justify-center p-1 text-[#B7B2A8] hover:text-[#E8C878] transition-colors focus:outline-none"
        >
          <UtensilsCrossed className="w-5 h-5 text-[#C7A35B]" />
          <span className="text-[10px] font-medium tracking-wide mt-1">
            {lang === "ar" ? "القائمة" : "Menu"}
          </span>
        </button>

        {/* Bouton WhatsApp */}
        <a
          href={siteConfig.socials.whatsappChat}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-1 text-[#B7B2A8] hover:text-[#E8C878] transition-colors"
        >
          <MessageCircle className="w-5 h-5 text-emerald-400" />
          <span className="text-[10px] font-medium tracking-wide mt-1">
            WhatsApp
          </span>
        </a>

        {/* Bouton Appeler */}
        <a
          href={`tel:${siteConfig.phonePrimary.replace(/\s+/g, "")}`}
          className="flex flex-col items-center justify-center p-1 text-[#B7B2A8] hover:text-[#E8C878] transition-colors"
        >
          <Phone className="w-5 h-5 text-[#E8C878]" />
          <span className="text-[10px] font-medium tracking-wide mt-1">
            {lang === "ar" ? "اتصال" : "Appeler"}
          </span>
        </a>

        {/* Bouton Itinéraire */}
        <a
          href={siteConfig.socials.googleMaps}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-1 text-[#B7B2A8] hover:text-[#E8C878] transition-colors"
        >
          <Compass className="w-5 h-5 text-[#C7A35B]" />
          <span className="text-[10px] font-medium tracking-wide mt-1">
            {lang === "ar" ? "خرائط" : "Itinéraire"}
          </span>
        </a>

      </div>
    </div>
  );
}
