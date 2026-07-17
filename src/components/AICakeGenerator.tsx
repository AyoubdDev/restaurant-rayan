import React, { useState } from "react";
import { siteConfig } from "../data/site";
import { Sparkles, Loader2, Download, MessageCircle, RefreshCw } from "lucide-react";

interface AICakeGeneratorProps {
  t: any;
  lang: string;
}

export default function AICakeGenerator({ t, lang }: AICakeGeneratorProps) {
  const [prompt, setPrompt] = useState("");
  const [size, setSize] = useState<"1K" | "2K" | "4K">("1K");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fallbackWarning, setFallbackWarning] = useState("");

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || loading) return;

    setLoading(true);
    setError("");
    setImageUrl("");
    setFallbackWarning("");

    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          size: size
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Une erreur s'est produite lors de la génération de l'image.");
      }

      const data = await response.json();
      if (data.imageUrl) {
        setImageUrl(data.imageUrl);
        if (data.warning) {
          setFallbackWarning(data.warning);
        }
      } else {
        throw new Error("Aucune image n'a été retournée.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Impossible de joindre le générateur de desserts AI. Veuillez vérifier la configuration de la clé API.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!imageUrl) return;
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `dessert-rayan-${size}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOrderWhatsApp = () => {
    const text = lang === "ar"
      ? `مرحباً مطعم ريان، قمت بابتكار هذا التحلية الخاصة بأداة الذكاء الاصطناعي وأود طلب تصميم مماثل:
- الوصف: ${prompt}`
      : `Bonjour Restaurant Rayan, j'ai créé ce dessert de rêve via votre atelier d'IA créative et j'aimerais commander un gâteau ou gelato dans ce style :
- Description : ${prompt}`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${encoded}`, "_blank");
  };

  return (
    <section id="atelier-ai" className="py-24 bg-[#090A0B] relative overflow-hidden">
      
      {/* Arrière-plan thématique sombre */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#713B2B]/5 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Titre */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 bg-[#713B2B]/20 text-[#E8C878] rounded-full text-[10px] font-mono tracking-widest uppercase mb-3 border border-[#C7A35B]/20">
            {t.navGenerator}
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#F4EBDD] tracking-tight mb-4">
            {t.genTitle}
          </h2>
          <div className="w-12 h-1 bg-[#C7A35B] mx-auto mb-4 rounded"></div>
          <p className="text-xs sm:text-sm text-[#B7B2A8] font-light leading-relaxed">
            {t.genSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-5xl mx-auto">
          
          {/* Panneau de configuration (6 colonnes sur 12) */}
          <div className="lg:col-span-6 bg-[#141516] p-6 sm:p-8 rounded-2xl border border-white/5 flex flex-col justify-between shadow-xl">
            <form onSubmit={handleGenerate} className="space-y-6">
              
              {/* Entrée de description */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#B7B2A8] uppercase tracking-wider block">
                  {t.genPromptLabel}
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full bg-[#090A0B] border border-white/10 rounded-xl py-3 px-4 text-xs sm:text-sm text-[#F4EBDD] focus:border-[#C7A35B] focus:outline-none transition-colors h-32 resize-none"
                  placeholder={t.genPromptPlaceholder}
                  required
                  disabled={loading}
                  dir="auto"
                ></textarea>
              </div>

              {/* Sélection de la résolution */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#B7B2A8] uppercase tracking-wider block">
                  {t.genSizeLabel}
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(["1K", "2K", "4K"] as const).map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSize(sz)}
                      className={`py-2 px-4 rounded-lg text-xs font-bold transition-all duration-300 border ${
                        size === sz
                          ? "bg-[#C7A35B] text-[#090A0B] border-transparent"
                          : "bg-[#090A0B] text-[#B7B2A8] border-white/5 hover:border-white/10"
                      }`}
                      disabled={loading}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Erreur */}
              {error && (
                <div className="text-xs font-semibold text-[#713B2B] bg-[#713B2B]/10 p-3 rounded-lg border border-[#713B2B]/20">
                  {error}
                </div>
              )}

              {/* Bouton de submit */}
              <button
                type="submit"
                disabled={loading || !prompt.trim()}
                className="w-full bg-gradient-to-r from-[#C7A35B] to-[#E8C878] disabled:from-gray-700 disabled:to-gray-800 text-[#090A0B] font-bold text-xs uppercase py-3.5 rounded-lg tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{t.genGenerating}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>{t.genBtnSubmit}</span>
                  </>
                )}
              </button>

            </form>
          </div>

          {/* Panneau de rendu de l'image (6 colonnes sur 12) */}
          <div className="lg:col-span-6 bg-[#090A0B] border border-white/5 rounded-2xl p-4 flex flex-col justify-center items-center relative min-h-[350px] overflow-hidden">
            
            {/* Lignes de repère dorées type "Studio" */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#C7A35B]/20"></div>
            <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[#C7A35B]/20"></div>
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-[#C7A35B]/20"></div>
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[#C7A35B]/20"></div>

            {loading ? (
              /* Loader stylisé */
              <div className="text-center space-y-4 animate-pulse z-10 p-8">
                <Loader2 className="w-12 h-12 text-[#E8C878] animate-spin mx-auto" />
                <p className="text-xs font-serif text-[#E8C878]">{t.genGenerating}</p>
                <p className="text-[10px] text-[#B7B2A8] font-light max-w-xs mx-auto">
                  La technologie Gemini-3-Pro-Image crée des détails photoréalistes en or et textures de chocolat.
                </p>
              </div>
            ) : imageUrl ? (
              /* Image générée avec actions */
              <div className="w-full h-full flex flex-col items-center justify-between space-y-4 z-10 animate-scaleUp">
                <div className="relative aspect-square w-full max-w-[280px] sm:max-w-[320px] rounded-xl overflow-hidden border border-[#C7A35B]/20 shadow-2xl">
                  <img
                    src={imageUrl}
                    alt="Dessert Rayan généré"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-3 left-3 bg-[#090A0B]/80 backdrop-blur-sm border border-[#C7A35B]/30 px-2 py-0.5 rounded text-[9px] font-mono text-[#E8C878] uppercase">
                    Format {size}
                  </div>
                </div>

                {fallbackWarning && (
                  <div className="text-[10px] sm:text-xs bg-[#C7A35B]/5 border border-[#C7A35B]/20 text-[#E8C878] px-4 py-3 rounded-xl max-w-[320px] text-center leading-relaxed font-light">
                    {fallbackWarning}
                  </div>
                )}

                <div className="w-full grid grid-cols-2 gap-3 max-w-[320px]">
                  {/* Télécharger */}
                  <button
                    onClick={handleDownload}
                    className="inline-flex items-center justify-center gap-1.5 bg-[#141516] hover:bg-[#1c1d1f] text-[#E8C878] border border-[#C7A35B]/30 py-2.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    {t.genDownload}
                  </button>

                  {/* Commander sur WhatsApp */}
                  <button
                    onClick={handleOrderWhatsApp}
                    className="inline-flex items-center justify-center gap-1.5 bg-[#C7A35B] hover:bg-[#E8C878] text-[#090A0B] py-2.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    {lang === "ar" ? "طلب الشكل" : "Commander"}
                  </button>
                </div>

                <button
                  onClick={() => {
                    setImageUrl("");
                    setPrompt("");
                  }}
                  className="text-[10px] text-[#B7B2A8] hover:text-[#E8C878] flex items-center gap-1 mt-2 underline"
                >
                  <RefreshCw className="w-3 h-3" />
                  {lang === "ar" ? "ابتكار حلوى أخرى" : "Créer un autre dessert"}
                </button>
              </div>
            ) : (
              /* Écran de veille de l'Atelier */
              <div className="text-center p-8 max-w-sm z-10">
                <Sparkles className="w-12 h-12 text-[#C7A35B]/40 mx-auto mb-4" />
                <h4 className="text-sm font-serif font-bold text-[#F4EBDD] mb-2">
                  {lang === "ar" ? "جاهز للتصميم" : "Prêt à créer"}
                </h4>
                <p className="text-[11px] text-[#B7B2A8] font-light leading-relaxed">
                  {lang === "ar"
                    ? "اكتب تفاصيل الحلوى الخاصة بك في الجانب الأيسر وانقر على زر الابتكار."
                    : "Entrez vos préférences gustatives dans le formulaire à gauche pour matérialiser instantanément votre pièce montée unique."}
                </p>
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}
