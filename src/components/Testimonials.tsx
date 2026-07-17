import { testimonials, enableTestimonials } from "../data/testimonials";
import { Star, Quote } from "lucide-react";

interface TestimonialsProps {
  t: any;
  lang: string;
}

export default function Testimonials({ t, lang }: TestimonialsProps) {
  if (!enableTestimonials || testimonials.length === 0) return null;

  return (
    <section id="reviews" className="py-20 bg-[#090A0B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Titre */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 bg-[#C7A35B]/10 text-[#E8C878] rounded-full text-[10px] font-mono tracking-widest uppercase mb-3 border border-[#C7A35B]/20">
            {lang === "ar" ? "آراء زبنائنا" : "Témoignages Clients"}
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#F4EBDD] tracking-tight mb-4">
            {lang === "ar" ? "ماذا يقول زبناؤنا عن ريان" : "Ils parlent de l'Expérience Rayan"}
          </h2>
          <div className="w-12 h-1 bg-[#C7A35B] mx-auto mb-4 rounded"></div>
        </div>

        {/* Témoignages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test) => (
            <div
              key={test.id}
              className="bg-[#141516] p-6 rounded-2xl border border-white/5 relative flex flex-col justify-between shadow-lg"
            >
              {/* Ornement de guillemet décoratif */}
              <Quote className="w-8 h-8 text-[#C7A35B]/10 absolute top-6 right-6" />

              <div>
                {/* Étoiles */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: test.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#E8C878] text-[#E8C878]" />
                  ))}
                </div>

                {/* Texte de l'avis */}
                <p className="text-xs sm:text-sm text-[#B7B2A8] font-light leading-relaxed italic mb-6">
                  "{lang === "ar" ? test.textAr : test.textFr}"
                </p>
              </div>

              {/* Auteur */}
              <div className="flex justify-between items-center pt-4 border-t border-white/5">
                <div>
                  <h4 className="text-sm font-serif font-bold text-[#F4EBDD]">{test.name}</h4>
                  <span className="text-[10px] font-semibold text-[#C7A35B] uppercase tracking-wider block mt-0.5">
                    {lang === "ar" ? test.roleAr : test.roleFr}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-white/30">{test.date}</span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
