import { Phone, MessageCircle, MapPin } from "lucide-react";
import { siteConfig } from "../data/site";

interface AnnouncementBarProps {
  t: any;
  lang: string;
}

export default function AnnouncementBar({ t, lang }: AnnouncementBarProps) {
  return (
    <div className="bg-[#090A0B] text-[#F4EBDD] text-xs py-2 px-4 border-b border-[#C7A35B]/20 relative z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        
        {/* Texte configuré */}
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#E8C878] rounded-full animate-ping"></span>
          <p className="font-medium tracking-wide text-[11px] sm:text-xs">
            {t.announcement}
          </p>
        </div>

        {/* Contacts et Adresse */}
        <div className="flex items-center gap-4 flex-wrap justify-center">
          {/* Localisation */}
          <div className="flex items-center gap-1 text-[#B7B2A8] hover:text-[#E8C878] transition-colors">
            <MapPin className="w-3 h-3 text-[#C7A35B]" />
            <span className="text-[11px] font-sans">{t.locationBadge}</span>
          </div>

          {/* Téléphone */}
          <a
            href={`tel:${siteConfig.phonePrimary.replace(/\s+/g, "")}`}
            className="flex items-center gap-1.5 text-[#B7B2A8] hover:text-[#E8C878] transition-colors"
          >
            <Phone className="w-3 h-3 text-[#C7A35B]" />
            <span className="text-[11px] font-mono">{siteConfig.phonePrimary}</span>
          </a>

          {/* WhatsApp */}
          <a
            href={siteConfig.socials.whatsappChat}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 bg-[#C7A35B]/10 hover:bg-[#C7A35B]/20 px-2.5 py-0.5 rounded border border-[#C7A35B]/30 text-[#E8C878] text-[10px] uppercase tracking-wider font-semibold transition-all duration-300"
          >
            <MessageCircle className="w-3 h-3 mr-1 inline" />
            WhatsApp
          </a>
        </div>

      </div>
    </div>
  );
}
