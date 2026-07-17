import { useState } from "react";
import { siteConfig } from "../data/site";
import { MapPin, Phone, Clock, MessageSquare, Compass, ExternalLink } from "lucide-react";

interface ContactLocationProps {
  t: any;
  lang: string;
}

export default function ContactLocation({ t, lang }: ContactLocationProps) {
  const [loadMap, setLoadMap] = useState(false);

  return (
    <section id="contact" className="py-24 bg-[#0c0d0e] border-t border-[#C7A35B]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Titre */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 bg-[#C7A35B]/10 text-[#E8C878] rounded-full text-[10px] font-mono tracking-widest uppercase mb-3 border border-[#C7A35B]/20">
            {t.navContact}
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#F4EBDD] tracking-tight mb-4">
            {t.locTitle}
          </h2>
          <div className="w-12 h-1 bg-[#C7A35B] mx-auto mb-4 rounded"></div>
          <p className="text-xs sm:text-sm text-[#B7B2A8] font-light leading-relaxed">
            {t.locSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Bloc d'informations de contact (Gauche, 5 colonnes sur 12) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 bg-[#141516] p-6 sm:p-8 rounded-2xl border border-white/5 relative overflow-hidden">
            
            <div className="space-y-6">
              {/* Adresse */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#C7A35B]/10 border border-[#C7A35B]/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#C7A35B]" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-[#B7B2A8] uppercase tracking-wider mb-1">
                    {t.locAddressLabel}
                  </h3>
                  <p className="text-sm font-medium text-[#F4EBDD]">
                    {siteConfig.address}
                  </p>
                  <p className="text-xs text-[#713B2B] font-medium mt-1">
                    {lang === "ar" ? siteConfig.addressNotes.ar : lang === "en" ? siteConfig.addressNotes.en : siteConfig.addressNotes.fr}
                  </p>
                </div>
              </div>

              {/* Horaires */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#C7A35B]/10 border border-[#C7A35B]/20 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-[#C7A35B]" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-[#B7B2A8] uppercase tracking-wider mb-1">
                    {t.locHoursLabel}
                  </h3>
                  <p className="text-sm font-medium text-[#F4EBDD]">
                    {lang === "ar" ? siteConfig.openingHours.ar : lang === "en" ? siteConfig.openingHours.en : siteConfig.openingHours.fr}
                  </p>
                </div>
              </div>

              {/* Téléphone */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#C7A35B]/10 border border-[#C7A35B]/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#C7A35B]" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-[#B7B2A8] uppercase tracking-wider mb-1">
                    {t.locPhoneLabel}
                  </h3>
                  <a
                    href={`tel:${siteConfig.phonePrimary.replace(/\s+/g, "")}`}
                    className="text-sm font-mono font-bold text-[#F4EBDD] hover:text-[#E8C878] transition-colors block"
                  >
                    {siteConfig.phonePrimary}
                  </a>
                  <a
                    href={`tel:${siteConfig.phoneSecondary.replace(/\s+/g, "")}`}
                    className="text-sm font-mono font-bold text-[#B7B2A8] hover:text-[#E8C878] transition-colors block mt-1"
                  >
                    {siteConfig.phoneSecondary}
                  </a>
                </div>
              </div>
            </div>

            {/* Note sur la proximité de l'aéroport et de Deroua */}
            <div className="p-4 bg-[#090A0B]/60 rounded-xl border border-white/5 text-xs text-[#B7B2A8] leading-relaxed font-light">
              {t.locNearbyNote}
            </div>

            {/* Ligne de boutons d'actions directes de conversion */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 border-t border-white/5">
              <a
                href={`tel:${siteConfig.phonePrimary.replace(/\s+/g, "")}`}
                className="inline-flex items-center justify-center gap-2 bg-[#C7A35B] hover:bg-[#E8C878] text-[#090A0B] font-bold text-xs uppercase py-3 rounded-lg tracking-wider transition-colors shadow-sm"
              >
                <Phone className="w-3.5 h-3.5" />
                {t.btnCall}
              </a>
              <a
                href={siteConfig.socials.whatsappChat}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#141516] hover:bg-white/5 text-[#F4EBDD] border border-white/10 rounded-lg text-xs font-bold uppercase py-3 tracking-wider transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#E8C878]" />
                WhatsApp
              </a>
            </div>

          </div>

          {/* Carte Google Maps avec chargement paresseux après interaction (Droite, 7 colonnes sur 12) */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-white/5 min-h-[350px] relative bg-[#141516] shadow-xl">
            
            {!loadMap ? (
              /* Écran de veille de la carte (Très léger, pas de script tiers lourd au départ) */
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#141516] to-[#090A0B]">
                {/* Grille géométrique marocaine en arrière-plan */}
                <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#C7A35B_1px,transparent_1px)] [background-size:16px_16px]"></div>
                
                <MapPin className="w-12 h-12 text-[#C7A35B] animate-bounce mb-4" />
                <h3 className="text-base font-serif font-bold text-[#F4EBDD] mb-2">{t.navContact}</h3>
                <p className="text-xs text-[#B7B2A8] max-w-sm mb-6 leading-relaxed">
                  {t.locMapsAlert}
                </p>
                <button
                  onClick={() => setLoadMap(true)}
                  className="inline-flex items-center gap-2 bg-[#C7A35B]/15 hover:bg-[#C7A35B] text-[#E8C878] hover:text-[#090A0B] border border-[#C7A35B]/30 px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer"
                >
                  <Compass className="w-4 h-4" />
                  {lang === "ar" ? "تحميل الخريطة التفاعلية" : lang === "en" ? "Load interactive map" : "Charger la carte"}
                </button>
              </div>
            ) : (
              /* Embed Google Maps interactif */
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3331.240369527581!2d-7.5337227!3d33.349602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda63ba8ebf1b3e7%3A0xbb14125f4621c97a!2sRestaurant%20Rayan!5e0!3m2!1sfr!2sma!4v1710000000000!5m2!1sfr!2sma"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[350px]"
                title="Restaurant Rayan Location"
              ></iframe>
            )}

            {/* Petit bouton d'itinéraires réels à l'extérieur */}
            {loadMap && (
              <a
                href={siteConfig.socials.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 bg-[#090A0B]/90 backdrop-blur-sm hover:bg-[#C7A35B] text-[#E8C878] hover:text-[#090A0B] border border-[#C7A35B]/30 p-2.5 rounded-xl shadow-lg flex items-center gap-1 text-xs font-bold transition-all duration-300"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                {lang === "ar" ? "فتح في خرائط Google" : lang === "en" ? "Open Maps" : "Ouvrir Maps"}
              </a>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}
