import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Sparkles, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "model";
  text: string;
}

interface AIAssistantProps {
  t: any;
  lang: string;
}

export default function AIAssistant({ t, lang }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", text: t.chatWelcome }
  ]);
  const [loading, setLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Faire défiler automatiquement vers le bas lors de la réception de messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    
    // Ajouter le message utilisateur à l'état local
    const newMessages = [...messages, { role: "user" as const, text: userMessage }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: userMessage,
          history: messages // Envoyer l'historique de la conversation
        })
      });

      if (!response.ok) {
        throw new Error("Impossible de joindre le serveur d'intelligence artificielle.");
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "model", text: data.reply }]);
    } catch (err: any) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: lang === "ar"
            ? "عذراً، أواجه صعوبة في الاتصال. يرجى مراجعة اتصال الإنترنت الخاص بكم أو المحاولة لاحقاً."
            : "Désolé, je rencontre des difficultés techniques à me connecter. Veuillez vérifier votre connexion ou réessayer plus tard."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-20 right-6 sm:bottom-6 sm:right-6 z-40">
      
      {/* BOUTON BULLE DE CHAT FLOTTANTE */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative group p-4 bg-gradient-to-br from-[#141516] to-[#090A0B] hover:from-[#C7A35B] hover:to-[#E8C878] text-[#E8C878] hover:text-[#090A0B] rounded-full shadow-2xl border border-[#C7A35B]/30 hover:border-transparent transition-all duration-300 scale-100 active:scale-95 flex items-center justify-center animate-bounce cursor-pointer"
          id="ai-floating-bubble"
          aria-label="Discuter avec l'assistant AI Rayan"
        >
          {/* Badge pulsant de notification */}
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-[#713B2B] rounded-full border-2 border-[#090A0B] flex items-center justify-center">
            <span className="w-1.5 h-1.5 bg-[#E8C878] rounded-full animate-ping"></span>
          </span>
          <MessageSquare className="w-6 h-6" />
        </button>
      )}

      {/* DIALOGUE DE CHAT EXTENSIBLE */}
      {isOpen && (
        <div
          className={`bg-[#141516] w-[340px] sm:w-[380px] h-[500px] rounded-2xl border border-[#C7A35B]/20 shadow-2xl flex flex-col overflow-hidden relative animate-slideUp`}
          id="ai-chat-window"
        >
          
          {/* En-tête de la fenêtre de chat */}
          <div className="bg-gradient-to-r from-[#090A0B] to-[#141516] p-4 border-b border-[#C7A35B]/15 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#C7A35B]/10 border border-[#C7A35B]/20 flex items-center justify-center">
                <Bot className="w-4.5 h-4.5 text-[#E8C878]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-serif font-bold text-[#F4EBDD] flex items-center gap-1">
                  {t.chatTitle}
                  <Sparkles className="w-3.5 h-3.5 text-[#E8C878] animate-pulse" />
                </h4>
                <span className="text-[9px] font-semibold text-emerald-400 uppercase tracking-widest block flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
                  {lang === "ar" ? "متصل الآن" : "En ligne"}
                </span>
              </div>
            </div>
            
            {/* Bouton de fermeture */}
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#B7B2A8] hover:text-[#F4EBDD] p-1 rounded-full hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Fermer le chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Corps de la discussion (Scrollable) */}
          <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-[#090A0B]/40">
            {messages.map((msg, idx) => {
              const isModel = msg.role === "model";
              return (
                <div
                  key={idx}
                  className={`flex gap-2.5 ${isModel ? "justify-start" : "justify-end"} ${
                    lang === "ar" ? "flex-row-reverse" : ""
                  }`}
                >
                  {/* Avatar si IA */}
                  {isModel && (
                    <div className="w-6 h-6 rounded-full bg-[#C7A35B]/15 flex items-center justify-center flex-shrink-0 border border-[#C7A35B]/10">
                      <Bot className="w-3 h-3 text-[#E8C878]" />
                    </div>
                  )}

                  {/* Bulle de texte */}
                  <div
                    className={`max-w-[75%] rounded-2xl p-3 text-xs leading-relaxed ${
                      isModel
                        ? "bg-[#141516] text-[#F4EBDD] border border-white/5 rounded-tl-none"
                        : "bg-[#713B2B] text-white rounded-tr-none"
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Avatar si utilisateur */}
                  {!isModel && (
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <User className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Indicateur de chargement de l'assistant */}
            {loading && (
              <div className={`flex gap-2.5 justify-start ${lang === "ar" ? "flex-row-reverse" : ""}`}>
                <div className="w-6 h-6 rounded-full bg-[#C7A35B]/15 flex items-center justify-center flex-shrink-0 border border-[#C7A35B]/10">
                  <Bot className="w-3 h-3 text-[#E8C878]" />
                </div>
                <div className="bg-[#141516] text-[#B7B2A8] rounded-2xl rounded-tl-none p-3 text-xs flex items-center gap-2 border border-white/5">
                  <Loader2 className="w-3.5 h-3.5 text-[#C7A35B] animate-spin" />
                  <span>{lang === "ar" ? "ريان يكتب..." : "Rayan réfléchit..."}</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Formulaire de saisie du message */}
          <form
            onSubmit={handleSend}
            className="p-3 bg-[#141516] border-t border-[#C7A35B]/15 flex gap-2 items-center"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow bg-[#090A0B] border border-white/10 rounded-xl py-2.5 px-4 text-xs text-[#F4EBDD] focus:border-[#C7A35B] focus:outline-none transition-colors"
              placeholder={t.chatPlaceholder}
              disabled={loading}
              dir="auto"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-2.5 bg-[#C7A35B] disabled:bg-gray-700 text-[#090A0B] rounded-xl hover:bg-[#E8C878] transition-colors flex items-center justify-center cursor-pointer"
              aria-label={t.chatSend}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
}
