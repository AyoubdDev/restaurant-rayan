import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Check, Calendar, Users, Clock, MessageSquare, ShieldCheck, Star } from "lucide-react";
import { siteConfig } from "../data/site";
import { soundManager } from "../utils/sound";
import SafeImage from "./SafeImage";

interface CelebrationsProps {
  t: any;
  lang: string;
}

export default function Celebrations({ t, lang }: CelebrationsProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "4",
    type: "Dîner Romantique",
    message: ""
  });

  const [formError, setFormError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setFormError("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.date || !formData.time) {
      setFormError(t.celFormError || "Veuillez remplir tous les champs obligatoires.");
      return;
    }

    const bookingMessage = lang === "ar"
      ? `طلب حجز طاولة راقية بمطعم ريان:
- الاسم: ${formData.name}
- الهاتف: ${formData.phone}
- التاريخ: ${formData.date}
- الوقت: ${formData.time}
- الحضور: ${formData.guests} أشخاص
- المناسبة: ${formData.type}
- ملاحظات: ${formData.message || "لا يوجد"}`
      : `Demande de réservation prestigieuse au Restaurant Rayan :
- Nom : ${formData.name}
- Téléphone : ${formData.phone}
- Date : ${formData.date}
- Heure : ${formData.time}
- Invités : ${formData.guests} personnes
- Occasion : ${formData.type}
- Remarques : ${formData.message || "Aucune"}`;

    const encodedMessage = encodeURIComponent(bookingMessage);
    const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodedMessage}`;
    
    setIsSuccess(true);
    soundManager.playSuccess(); // Gorgeous luxury chime sound
    setFormError("");

    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setIsSuccess(false);
    }, 2800);
  };

  return (
    <section id="celebrations" className="py-24 bg-[#090909] relative overflow-hidden">
      
      {/* Background Orbs & Sparkles */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#D4AF37]/5 rounded-full filter blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-10 w-[500px] h-[500px] bg-[#F8E7A0]/3 rounded-full filter blur-[160px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Narrative description & Floating luxurious 3D-like calendar card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="lg:col-span-5 space-y-8"
          >
            <div>
              <span className="inline-block px-3 py-1.5 bg-[#D4AF37]/10 text-[#F8E7A0] rounded-full text-[10px] font-mono tracking-widest uppercase border border-[#D4AF37]/20 mb-4">
                {lang === "ar" ? "الحجوزات الراقية" : "PRESTIGE RESERVATIONS"}
              </span>
              <h2 className="text-4xl sm:text-5xl font-serif font-light text-[#F7F7F7] tracking-tight leading-tight mb-4">
                {lang === "ar" ? "طاولة استثنائية بانتظارك" : "Reserve your culinary sanctuary"}
              </h2>
              <div className="w-16 h-[1px] bg-gradient-to-r from-[#D4AF37] to-transparent"></div>
            </div>

            <p className="text-xs sm:text-sm text-[#A7A7A7] font-light leading-relaxed font-sans">
              {lang === "ar"
                ? "انغمس في أجواء من الفخامة والخصوصية المطلقة. نوفر لكم طاولات مجهزة خصيصاً للمناسبات العائلية الراقية، غرف كبار الشخصيات VIP، وخدمة فندقية تليق بمستوى تطلعاتكم."
                : "Indulge in an atmosphere designed for the demanding. Whether for an intimate candlelit dinner, a family milestone, or a high-profile business meeting, our stewards secure a tailor-made universe for you."}
            </p>

            {/* Micro Floating Calendar Widget to visual interest */}
            <motion.div
              whileHover={{ y: -8, rotate: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="bg-[#111111]/70 border border-[#D4AF37]/25 p-5 sm:p-6 rounded-2xl shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#D4AF37]/10 to-transparent pointer-events-none"></div>
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex flex-col justify-center items-center text-[#F8E7A0] font-mono">
                  <span className="text-[10px] uppercase font-bold tracking-widest">JUL</span>
                  <span className="text-lg font-bold">15</span>
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#F7F7F7] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
                    Michelin Star Ambience
                  </h4>
                  <p className="text-[11px] text-[#A7A7A7] font-light mt-0.5">
                    {lang === "ar" ? "طاقم طهي دولي وخدمة خمس نجوم" : "International culinary brigades & 5-star stewardship"}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: Outstanding luxury glassmorphic card form */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 bg-[#111111]/45 backdrop-blur-xl p-8 sm:p-10 rounded-2xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative overflow-hidden"
          >
            {/* Elegant luxury hand-stitched gold borders */}
            <div className="absolute inset-2 border border-[#D4AF37]/10 pointer-events-none rounded-xl"></div>
            <div className="absolute top-0 left-0 w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/45 to-transparent"></div>
            
            <h3 className="text-xl sm:text-2xl font-serif font-light text-[#F7F7F7] mb-8 flex items-center gap-2 relative z-10">
              <Calendar className="w-5 h-5 text-[#D4AF37]" />
              <span>{lang === "ar" ? "نموذج الحجز المباشر" : "Direct Stewardship Booking"}</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              
              {/* Row 1: Name and Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-mono font-bold text-[#A7A7A7] uppercase tracking-widest flex items-center gap-1.5">
                    {lang === "ar" ? "الاسم الكامل" : "FULL NAME"} *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full bg-[#090909]/80 border rounded-lg py-3.5 px-4 text-xs text-[#F7F7F7] focus:outline-none transition-all duration-300 font-sans ${
                        focusedField === "name" ? "border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.15)]" : "border-white/10 hover:border-white/20"
                      }`}
                      placeholder="Ex: Yassine El Amrani"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-mono font-bold text-[#A7A7A7] uppercase tracking-widest flex items-center gap-1.5">
                    {lang === "ar" ? "رقم الهاتف" : "PHONE NUMBER"} *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full bg-[#090909]/80 border rounded-lg py-3.5 px-4 text-xs text-[#F7F7F7] focus:outline-none transition-all duration-300 font-sans ${
                      focusedField === "phone" ? "border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.15)]" : "border-white/10 hover:border-white/20"
                    }`}
                    placeholder="Ex: +212 661 234567"
                    required
                  />
                </div>
              </div>

              {/* Row 2: Date, Time and Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-mono font-bold text-[#A7A7A7] uppercase tracking-widest flex items-center gap-1.5">
                    {lang === "ar" ? "التاريخ" : "DATE"} *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("date")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full bg-[#090909]/80 border rounded-lg py-3.5 px-4 text-xs text-[#F7F7F7] focus:outline-none transition-all duration-300 font-sans ${
                      focusedField === "date" ? "border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.15)]" : "border-white/10 hover:border-white/20"
                    }`}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-mono font-bold text-[#A7A7A7] uppercase tracking-widest flex items-center gap-1.5">
                    {lang === "ar" ? "الوقت" : "HOUR"} *
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("time")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full bg-[#090909]/80 border rounded-lg py-3.5 px-4 text-xs text-[#F7F7F7] focus:outline-none transition-all duration-300 font-sans ${
                      focusedField === "time" ? "border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.15)]" : "border-white/10 hover:border-white/20"
                    }`}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-mono font-bold text-[#A7A7A7] uppercase tracking-widest flex items-center gap-1.5">
                    {lang === "ar" ? "الضيوف" : "GUESTS"}
                  </label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("guests")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full bg-[#090909]/80 border rounded-lg py-3.5 px-4 text-xs text-[#F7F7F7] focus:outline-none transition-all duration-300 font-sans ${
                      focusedField === "guests" ? "border-[#D4AF37]" : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    {[2, 4, 6, 8, 10, 15, 20].map((num) => (
                      <option key={num} value={num.toString()}>
                        {num} {lang === "ar" ? "أشخاص" : "personnes"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 3: Event Type Buttons */}
              <div className="space-y-2">
                <label className="text-[9px] font-mono font-bold text-[#A7A7A7] uppercase tracking-widest flex items-center gap-1.5">
                  {lang === "ar" ? "نوع المناسبة" : "EVENT TYPE OR OCCASION"}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { val: "Dîner Romantique", label: lang === "ar" ? "عشاء رومانسي" : "Romantique" },
                    { val: "Anniversaire", label: lang === "ar" ? "عيد ميلاد" : "Anniversaire" },
                    { val: "Repas Professionnel", label: lang === "ar" ? "عمل / وفد" : "Business" },
                    { val: "Fête de Famille", label: lang === "ar" ? "عائلي" : "Famille" }
                  ].map((evt) => (
                    <button
                      key={evt.val}
                      type="button"
                      onClick={() => setFormData({ ...formData, type: evt.val })}
                      className={`py-3 px-2 text-[10px] font-mono rounded-lg border transition-all duration-300 cursor-pointer ${
                        formData.type === evt.val
                          ? "bg-[#D4AF37]/15 text-[#F8E7A0] border-[#D4AF37]"
                          : "bg-[#090909]/80 text-[#A7A7A7] border-white/5 hover:border-white/10"
                      }`}
                    >
                      {evt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 4: Special notes */}
              <div className="space-y-1.5">
                <label className="text-[9px] font-mono font-bold text-[#A7A7A7] uppercase tracking-widest flex items-center gap-1.5">
                  {lang === "ar" ? "ملاحظات وتفضيلات كبار الشخصيات" : "STEWARD MESSAGE & PREFERENCES"}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  rows={3}
                  className={`w-full bg-[#090909]/80 border rounded-lg py-3 px-4 text-xs text-[#F7F7F7] focus:outline-none transition-all duration-300 font-sans resize-none ${
                    focusedField === "message" ? "border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.15)]" : "border-white/10 hover:border-white/20"
                  }`}
                  placeholder={lang === "ar" ? "تفضيلات المائدة، مسببات الحساسية، أو طلبات خاصة..." : "Preferred table alignment, severe food allergies, or high-tier requests..."}
                ></textarea>
              </div>

              {/* Simple disclaimer */}
              <div className="flex items-center gap-2 text-[10px] text-[#A7A7A7]/70 font-mono">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>Immediate direct booking priority on WhatsApp</span>
              </div>

              {/* Error indicator */}
              {formError && (
                <div className="text-xs font-semibold text-rose-400 bg-rose-500/10 p-3.5 rounded-lg border border-rose-500/20">
                  {formError}
                </div>
              )}

              {/* Success validation overlay */}
              <AnimatePresence>
                {isSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-[#090909]/95 z-30 flex flex-col items-center justify-center text-center p-6 rounded-2xl"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#D4AF37]/15 flex items-center justify-center border border-[#D4AF37] mb-6 shadow-lg shadow-[#D4AF37]/20">
                      <Check className="w-8 h-8 text-[#F8E7A0] animate-pulse" />
                    </div>
                    <h3 className="text-2xl font-serif text-[#F8E7A0] mb-2 font-bold">
                      {lang === "ar" ? "طلب حجز مؤكد ومميز" : "Prestige Booking Confirmed"}
                    </h3>
                    <p className="text-xs text-[#A7A7A7] max-w-sm font-light mb-1">
                      {lang === "ar" 
                        ? "جاري توجيهك بأمان إلى خدمة كبار الشخصيات على الواتساب لإكمال الترتيبات الفاخرة."
                        : "Securing your request in our ledger. Redirecting you to WhatsApp VIP desks for personal concierge."}
                    </p>
                    <span className="text-[10px] text-[#D4AF37] font-mono animate-pulse mt-4">STABILIZING SECURE CONNECTION...</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit trigger CTA with Luxury Glow effect */}
              <button
                type="submit"
                className="w-full relative py-4.5 bg-[#D4AF37] hover:bg-[#F8E7A0] disabled:bg-gray-800 text-[#090909] font-bold text-xs uppercase tracking-widest rounded-lg transition-all shadow-[0_15px_30px_rgba(212,175,55,0.15)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.35)] hover:scale-[1.01] cursor-pointer"
              >
                {lang === "ar" ? "تأكيد طلب الحجز الفاخر" : "Confirm Luxury Booking"}
              </button>

            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
