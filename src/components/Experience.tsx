import { motion } from "motion/react";
import SafeImage from "./SafeImage";
import { Sparkles, Utensils, Heart, Shield, Quote } from "lucide-react";

interface ExperienceProps {
  t: any;
  lang: string;
}

export default function Experience({ t, lang }: ExperienceProps) {
  return (
    <section id="experience" className="py-32 bg-[#080809] relative overflow-hidden">
      
      {/* Decorative Orbs & Premium Radial Gradients */}
      <div className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-[#C7A35B]/4 rounded-full filter blur-[150px] pointer-events-none -translate-y-1/2 -translate-x-1/2 animate-pulse"></div>
      <div className="absolute top-0 right-10 w-[300px] h-[300px] bg-[#713B2B]/3 rounded-full filter blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          
          {/* Editorial Asymmetric Image Block with scroll-triggered animation */}
          <div className="lg:col-span-6 grid grid-cols-12 gap-5 relative">
            
            {/* Primary Image (Family dining) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="col-span-8 relative z-10 rounded-2xl overflow-hidden border border-[#C7A35B]/15 shadow-[0_20px_50px_rgba(0,0,0,0.6)] group"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#060607]/60 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-30 transition-opacity duration-500"></div>
              <SafeImage
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80"
                alt="Ambiance Familiale Rayan"
                className="w-full h-[360px] object-cover transform scale-100 group-hover:scale-104 transition-transform duration-700"
                style={{ aspectRatio: "4/5" }}
              />
            </motion.div>

            {/* Secondary offset image (Woodfire grilled) */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="col-span-6 col-start-7 -mt-24 relative z-20 rounded-2xl overflow-hidden border border-[#C7A35B]/20 shadow-[0_25px_60px_rgba(0,0,0,0.8)] group"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#060607]/60 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-30 transition-opacity duration-500"></div>
              <SafeImage
                src="https://images.unsplash.com/photo-1544025162-d76694265947?w=400&auto=format&fit=crop&q=80"
                alt="Grillades au feu de bois"
                className="w-full h-[240px] object-cover transform scale-100 group-hover:scale-104 transition-transform duration-700"
                style={{ aspectRatio: "1" }}
              />
            </motion.div>

            {/* Tertiary Image (Craft Gelato) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="col-span-5 col-start-4 -mt-16 relative z-25 rounded-2xl overflow-hidden border border-[#C7A35B]/15 shadow-[0_15px_40px_rgba(0,0,0,0.5)] group"
            >
              <SafeImage
                src="https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&auto=format&fit=crop&q=80"
                alt="Gelato artisanal"
                className="w-full h-[150px] object-cover transform scale-100 group-hover:scale-104 transition-transform duration-700"
                style={{ aspectRatio: "4/3" }}
              />
            </motion.div>

            {/* Decorative Floating Badge with glowing gold borders */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="absolute -bottom-6 right-4 z-30 bg-[#111112] text-[#D4AF37] p-5 rounded-2xl shadow-2xl border border-[#C7A35B]/30 max-w-[150px] text-center hidden sm:block glow-gold"
            >
              <span className="block text-3xl font-serif font-semibold leading-none text-[#F8E7A0]">100%</span>
              <span className="block text-[8px] font-bold font-sans uppercase tracking-[0.2em] text-[#C7A35B]/85 mt-2">{t.expStat2}</span>
            </motion.div>
          </div>

          {/* Editorial text content (Right) */}
          <div className="lg:col-span-6 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <span className="inline-block px-3 py-1 bg-[#713B2B]/20 text-[#F8E7A0] rounded-full text-[10px] font-mono tracking-[0.25em] uppercase border border-[#C7A35B]/20">
                {t.expSubtitle}
              </span>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#F7F7F7] tracking-tight leading-tight">
                {t.expTitle}
              </h2>
            </motion.div>
            
            {/* Elegant Luxury Line reveal */}
            <div className="relative h-[1px] w-full bg-white/10 overflow-hidden">
              <motion.div 
                initial={{ left: "-100%" }}
                whileInView={{ left: "0%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
                className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
              />
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="space-y-5 text-sm sm:text-base text-[#B7B2A8] font-serif font-light leading-relaxed tracking-wide"
            >
              <p>{t.expParagraph1}</p>
              <p>{t.expParagraph2}</p>
            </motion.div>

            {/* Quote block inspired by Michelin-star experiences */}
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative p-6 sm:p-7 bg-[#111112]/50 border-l-[3px] border-[#D4AF37] rounded-r-2xl text-xs sm:text-sm italic text-[#DFD1B8] font-serif font-light flex gap-4"
            >
              <Quote className="w-8 h-8 text-[#D4AF37]/30 flex-shrink-0" />
              <div>
                {lang === "ar" ? (
                  "« المذاق هو رحلة تبدأ من اختيار المكونات الأكثر نبلًا، وتكتمل في دفء لحظة اللقاء العائلية. »"
                ) : lang === "en" ? (
                  "“Gastronomy is an art that only makes sense when shared in warmth, respect, and high elegance.”"
                ) : (
                  "« La gastronomie est un art de la patience et de la générosité qui ne s'épanouit pleinement que dans le partage et la convivialité. »"
                )}
                <span className="block text-[9px] font-mono font-bold tracking-widest uppercase text-[#C7A35B] mt-2.5 not-italic">
                  Chef Exécutif Rayan
                </span>
              </div>
            </motion.div>

            {/* Grids with hover scale properties */}
            <div className="grid grid-cols-2 gap-5 pt-8 border-t border-white/5">
              {[
                { label: t.expStat1, icon: Sparkles },
                { label: t.expStat2, icon: Utensils },
                { label: t.expStat3, icon: Heart },
                { label: t.expStat4, icon: Shield },
              ].map((stat, idx) => (
                <motion.div 
                  whileHover={{ x: 6, color: "#D4AF37" }}
                  key={idx} 
                  className="flex items-center gap-4 cursor-pointer group transition-colors duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#C7A35B]/8 border border-[#C7A35B]/15 flex items-center justify-center flex-shrink-0 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37]/10 transition-colors duration-300">
                    <stat.icon className="w-4.5 h-4.5 text-[#C7A35B] group-hover:text-[#D4AF37] transition-colors" />
                  </div>
                  <span className="text-xs font-semibold text-[#F4EBDD] tracking-wide font-sans group-hover:text-[#F8E7A0] transition-colors">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
