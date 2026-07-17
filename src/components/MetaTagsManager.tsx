import { useEffect } from "react";

interface SectionMetadata {
  title: string;
  description: string;
  image: string;
}

const sectionMeta: Record<string, SectionMetadata> = {
  home: {
    title: "Restaurant Rayan | Grillades, Poissons & Gelato Artisanal à Deroua, Maroc",
    description: "Découvrez le Restaurant Rayan à Deroua. Un espace familial premium proposant de généreuses grillades au feu de bois, poissons frais, sushis, cuisine internationale et gelatos artisanaux. Proche de l'aéroport Mohammed V.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&auto=format&fit=crop&q=80"
  },
  menu: {
    title: "Menu Gourmet & Plats Signatures | Restaurant Rayan",
    description: "Parcourez notre carte d'exception : Mix Grill généreux au feu de bois (135 DH), poissons de l'Atlantique, sushis raffinés, petit-déjeuner traditionnel Fassi, et gelatos naturels.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&auto=format&fit=crop&q=80"
  },
  experience: {
    title: "L'Expérience Premium & Familiale | Restaurant Rayan",
    description: "Découvrez notre passion pour l'accueil de prestige, des ingrédients locaux de première fraîcheur, et une ambiance chaleureuse idéale pour toutes vos rencontres.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&auto=format&fit=crop&q=80"
  },
  "atelier-ai": {
    title: "Atelier IA Créatif & Desserts de Rêve | Restaurant Rayan",
    description: "Utilisez notre outil exclusif basé sur Gemini pour imaginer votre dessert, gelato ou gâteau d'anniversaire idéal, et commandez sa réalisation sur mesure auprès de nos maîtres pâtissiers.",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200&auto=format&fit=crop&q=80"
  },
  celebrations: {
    title: "Anniversaires & Célébrations Spéciales | Restaurant Rayan",
    description: "Réservez vos moments mémorables. Nous organisons vos anniversaires, réunions de famille et fêtes avec gâteaux personnalisés et accueil royal à Deroua.",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&auto=format&fit=crop&q=80"
  },
  gallery: {
    title: "Galerie Photo & Ambiance | Restaurant Rayan",
    description: "Explorez en images notre établissement chaleureux, nos créations culinaires et l'ambiance soignée du Restaurant Rayan à Deroua.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop&q=80"
  },
  reviews: {
    title: "Avis & Témoignages de nos Clients | Restaurant Rayan",
    description: "Découvrez les retours authentiques de nos clients sur la générosité de nos plats, la qualité de notre service et notre ambiance familiale.",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&auto=format&fit=crop&q=80"
  },
  contact: {
    title: "Nous Trouver, Horaires & Réservation | Restaurant Rayan",
    description: "Situé à Deroua, Casablanca-Settat, sur la Route Nationale 9. Ouvert tous les jours de midi à 01h00 du matin (Mardi jusqu'à 01h30). Parking gratuit disponible devant.",
    image: "https://images.unsplash.com/photo-1522336572018-3bcd957debac?w=1200&auto=format&fit=crop&q=80"
  }
};

const updateMetaTag = (name: string, content: string, isProperty = false) => {
  const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  let element = document.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    if (isProperty) {
      element.setAttribute("property", name);
    } else {
      element.setAttribute("name", name);
    }
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
};

export default function MetaTagsManager() {
  useEffect(() => {
    // 1. Gérer le scroll initial si un paramètre d'URL ?section= ou # est spécifié
    const handleInitialRedirectAndScroll = () => {
      const urlParams = new URLSearchParams(window.location.search);
      let sectionId = urlParams.get("section") || window.location.hash.replace("#", "");

      if (sectionId) {
        // Uniformisation des identifiants (par exemple si "atelier-ai" ou "cake-generator")
        if (sectionId === "cake-generator" || sectionId === "atelier") {
          sectionId = "atelier-ai";
        }
        if (sectionId === "anniversaires") {
          sectionId = "celebrations";
        }
        if (sectionId === "testimonials") {
          sectionId = "reviews";
        }

        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
              top: elementPosition - offset,
              behavior: "smooth"
            });
            
            // Mettre à jour les meta tags immédiatement pour la section ciblée
            const meta = sectionMeta[sectionId] || sectionMeta.home;
            document.title = meta.title;
            updateMetaTag("description", meta.description);
            updateMetaTag("og:title", meta.title, true);
            updateMetaTag("og:description", meta.description, true);
            updateMetaTag("og:image", meta.image, true);
            updateMetaTag("og:url", `${window.location.origin}/?section=${sectionId}`, true);
            
            updateMetaTag("twitter:title", meta.title);
            updateMetaTag("twitter:description", meta.description);
            updateMetaTag("twitter:image", meta.image);
          }
        }, 300);
      }
    };

    handleInitialRedirectAndScroll();

    // 2. Observer de défilement (IntersectionObserver) pour changer dynamiquement les meta tags
    const activeSectionTracker = () => {
      const sectionIds = ["home", "menu", "experience", "atelier-ai", "celebrations", "gallery", "reviews", "contact"];
      const elements = sectionIds
        .map(id => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null);

      if (elements.length === 0) return;

      const observerOptions = {
        root: null,
        rootMargin: "-20% 0px -60% 0px", // Détecte la section majoritairement visible au centre de l'écran
        threshold: 0
      };

      const observerCallback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const currentId = entry.target.id;
            const meta = sectionMeta[currentId];
            if (meta) {
              // Mettre à jour les métadonnées et le titre du document
              document.title = meta.title;
              updateMetaTag("description", meta.description);
              
              // Open Graph
              updateMetaTag("og:title", meta.title, true);
              updateMetaTag("og:description", meta.description, true);
              updateMetaTag("og:image", meta.image, true);
              updateMetaTag("og:url", `${window.location.origin}/?section=${currentId}`, true);

              // Twitter Cards
              updateMetaTag("twitter:title", meta.title);
              updateMetaTag("twitter:description", meta.description);
              updateMetaTag("twitter:image", meta.image);
            }
          }
        });
      };

      const observer = new IntersectionObserver(observerCallback, observerOptions);
      elements.forEach(el => observer.observe(el));

      return () => {
        elements.forEach(el => observer.unobserve(el));
        observer.disconnect();
      };
    };

    const cleanupObserver = activeSectionTracker();

    // 3. Injecter les données structurées JSON-LD pour le référencement local (Restaurant & LocalBusiness Schema)
    const scriptId = "restaurant-rayan-jsonld";
    let scriptEl = document.getElementById(scriptId) as HTMLScriptElement;
    if (!scriptEl) {
      scriptEl = document.createElement("script");
      scriptEl.id = scriptId;
      scriptEl.type = "application/ld+json";
      document.head.appendChild(scriptEl);
    }
    
    const jsonLdData = {
      "@context": "https://schema.org",
      "@type": ["Restaurant", "LocalBusiness"],
      "@id": window.location.origin,
      "name": "Restaurant Rayan",
      "image": "https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&auto=format&fit=crop&q=80",
      "description": "Grillades savoureuses au feu de bois, pizzas cuites sur pierre, hamburgers gourmets, poissons frais, sushis authentiques et glaces artisanales au cœur de Deroua, Casablanca-Settat.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Route Nationale 9",
        "addressLocality": "Deroua",
        "addressRegion": "Casablanca-Settat",
        "postalCode": "26150",
        "addressCountry": "MA"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "33.351234",
        "longitude": "-7.531234"
      },
      "url": window.location.origin,
      "telephone": "+212522515056",
      "priceRange": "50 MAD – 300 MAD",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "12:00",
          "closes": "01:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Tuesday",
          "opens": "12:00",
          "closes": "01:30"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Sunday",
          "opens": "13:00",
          "closes": "01:00"
        }
      ],
      "servesCuisine": ["Moroccan", "International", "Italian", "Japanese", "Desserts"],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "3.9",
        "reviewCount": "1855"
      }
    };
    scriptEl.textContent = JSON.stringify(jsonLdData);

    // 4. Gérer la balise canonique dynamique
    let canonicalEl = document.querySelector("link[rel='canonical']");
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute("href", window.location.origin);

    return () => {
      if (cleanupObserver) cleanupObserver();
      // On retire le script au démontage s'il y a lieu
      const scriptToRemove = document.getElementById(scriptId);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  return null; // Composant utilitaire invisible
}
