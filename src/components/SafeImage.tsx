import React, { useState } from "react";

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackGradient?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function SafeImage({
  src,
  alt,
  fallbackGradient = "from-[#141516] to-[#090A0B]",
  className = "",
  style,
  ...props
}: SafeImageProps) {
  const [error, setError] = useState(false);

  // Déterminer s'il s'agit d'une image locale susceptible d'être manquante au premier lancement
  const isLocalAsset = src.startsWith("/public/") || src.startsWith("/assets/");

  if (error || !src || isLocalAsset) {
    // Si l'image locale est demandée, ou s'il y a une erreur de chargement, on affiche un superbe espace réservé thématisé or/noir
    return (
      <div
        className={`relative overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br ${fallbackGradient} border border-[#C7A35B]/10 rounded-xl ${className}`}
        style={{ aspectRatio: style?.aspectRatio || "16/9" }}
      >
        {/* Grille marocaine géométrique discrète en arrière-plan */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#C7A35B_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="text-center p-4 z-10">
          <span className="inline-block px-3 py-1 bg-[#C7A35B]/10 text-[#E8C878] rounded-full text-[10px] font-mono tracking-widest uppercase mb-2 border border-[#C7A35B]/20">
            Restaurant Rayan
          </span>
          <p className="text-xs font-serif italic text-[#B7B2A8] line-clamp-2 px-2">{alt}</p>
        </div>

        {/* Coins dorés esthétiques */}
        <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[#C7A35B]/30"></div>
        <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[#C7A35B]/30"></div>
        <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-[#C7A35B]/30"></div>
        <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-[#C7A35B]/30"></div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`object-cover ${className}`}
      style={style}
      onError={() => setError(true)}
      referrerPolicy="no-referrer"
      loading="lazy"
      {...props}
    />
  );
}
