import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Charger les variables d'environnement
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialisation paresseuse du client Gemini pour éviter tout plantage au démarrage si la clé est manquante
let aiInstance: GoogleGenAI | null = null;

function getAIClient() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is missing. Please configure it in your Secrets panel in AI Studio.");
    }
    aiInstance = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

// ==========================================
// API ENDPOINTS
// ==========================================

// 1. CHATBOT API : Assistant intelligent du Restaurant Rayan
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getAIClient();

    // Consigne système complète sur l'identité et l'offre du restaurant
    const systemInstruction = `
You are the elite AI Assistant of "Restaurant Rayan" located in Deroua, Morocco (Nassim 11).
Your voice represents traditional Moroccan hospitality blended with contemporary premium standards.
Be helpful, warm, polite, and extremely knowledgeable about the restaurant.

### RESTAURANT PROFILE:
- Name: Restaurant Rayan
- Position: Premium, modern, but highly accessible and generous family restaurant. (NOT excessively expensive gourmet, NOT just a steakhouse).
- Vibe: Modern family atmosphere, welcoming groups, birthdays, and celebrations.
- Location: Deroua, Nassim 11, Morocco. Very close (10 mins) to the Casablanca Mohammed V International Airport. Secure, free parking in front.
- Open Hours: Open every single day from 07:00 AM to 00:00 (Midnight).
- Contacts: Phone primary: +212 6 61 23 45 67, Phone secondary: +212 5 22 89 12 34.

### MENU OFFERS & SPECIFICITY:
- Grillades (Grills): Prepared over real wood-fire. Extremely tender, generous portions. Mixed grills, beef filet, lamb chops (côtelettes).
- Fish & Seafood: Fresh catches of the day (daurade royale, Atlantic friture plate with squid/shrimp/sole/merlan).
- Cuisine Internationale: Creamy salmon pennes, artisanal wood-fired pizzas, gourmet burgers.
- Sushi: Handcrafted by our expert sushiman (premium rolls, nigiri, crispy california).
- Tacos & Sandwiches: Hearty, generous, perfect for quick or family meals.
- Petit-déjeuner: Famous traditional Fassi breakfast (khlii, bio eggs, msemmen, harcha, free honey, olives, mint tea), and Western breakfast options.
- Desserts & Gelato: 100% natural artisanal gelato churned daily in our lab (vanilla, dark chocolate, Sicilian pistachio, bio strawberry), crepes, fresh pastries.
- Drinks: Fresh pressed juices, specialty coffees, mocktails.

### CONVERSION DIRECTIVES:
- Encourage users to explore the menu.
- Encourage reserving tables for families, groups, or birthdays (mention they can book on WhatsApp).
- Direct them to click "Commander" or call if they want immediate delivery or takeaway.
- Give accurate distance to Casablanca airport (10 mins) for travelers looking for a great meal.
- NEVER invent prices other than those specified in our data (Mix Grill Rayan: 135 DH, Filet de Boeuf: 110 DH, Cotelettes d'Agneau: 120 DH, Atlantic Fish Fry: 140 DH, Daurade Royale: 115 DH, Sushi 24pcs: 180 DH, Salmon Penne: 95 DH, Fassi Breakfast: 55 DH, Gelato Coupe 3 boules: 45 DH). For others, mention they can consult our digital menu or ask our staff.

### CONSTRAINTS:
- Answer in the language the user speaks (French or Arabic).
- Be polite, professional and concise. Don't write excessively long answers.
`;

    // Formater l'historique pour l'API Gemini (doit obligatoirement commencer par "user" et alterner)
    const contents: any[] = [];
    
    if (history && Array.isArray(history)) {
      let expectedRole = "user";
      history.forEach((msg: any) => {
        const msgRole = msg.role === "user" ? "user" : "model";
        if (msgRole === expectedRole) {
          contents.push({
            role: msgRole,
            parts: [{ text: msg.text }]
          });
          expectedRole = expectedRole === "user" ? "model" : "user";
        }
      });
    }

    // Retirer la dernière entrée si elle était déjà de type "user" afin de pouvoir pousser le message actuel proprement
    if (contents.length > 0 && contents[contents.length - 1].role === "user") {
      contents.pop();
    }

    // Ajouter le dernier message
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    const reply = response.text || "Je m'excuse, je n'ai pas pu générer de réponse. Comment puis-je vous aider chez Restaurant Rayan ?";
    res.json({ reply });

  } catch (error: any) {
    console.error("Chatbot Error:", error);
    res.status(500).json({ error: error.message || "An error occurred with the AI assistant." });
  }
});

// Helper to provide a gorgeous culinary photography fallback when the paid image generation model fails (e.g. Free tier quota limit 0)
function getPremiumFallbackImage(prompt: string): { url: string; label: string; warning: string } {
  const p = (prompt || "").toLowerCase();
  
  // French / Arabic / English keyword checking
  const hasChocolate = p.includes("chocolat") || p.includes("chocolate") || p.includes("cocoa") || p.includes("cacao") || p.includes("شوكو") || p.includes("شوكولا");
  const hasGelato = p.includes("glace") || p.includes("gelato") || p.includes("sorbet") || p.includes("ice cream") || p.includes("cornet") || p.includes("vanille") || p.includes("vanilla") || p.includes("ايس") || p.includes("آيس") || p.includes("جيلاتو") || p.includes("مثلج");
  const hasBerry = p.includes("fraise") || p.includes("strawberry") || p.includes("berry") || p.includes("framboise") || p.includes("fruits") || p.includes("fraisier") || p.includes("توت") || p.includes("فraوle") || p.includes("فراولة");
  const hasOriental = p.includes("oriental") || p.includes("marocain") || p.includes("corne") || p.includes("miel") || p.includes("baklava") || p.includes("amande") || p.includes("thé") || p.includes("moroccan") || p.includes("maghreb") || p.includes("حلويات") || p.includes("مغربي") || p.includes("عسل");
  const hasCelebration = p.includes("fleur") || p.includes("rose") || p.includes("fiançaille") || p.includes("mariage") || p.includes("wedding") || p.includes("love") || p.includes("fête") || p.includes("celebration") || p.includes("ورد") || p.includes("خطوبة") || p.includes("زفاف") || p.includes("عيد") || p.includes("ميلاد");
  const hasLemon = p.includes("citron") || p.includes("lemon") || p.includes("tarte") || p.includes("pie") || p.includes("yuzu") || p.includes("meringue") || p.includes("ليمون") || p.includes("حامض");
  const hasPistachio = p.includes("pistache") || p.includes("pistachio") || p.includes("matcha") || p.includes("vert") || p.includes("فستق") || p.includes("بستاشيو");
  const hasCaramel = p.includes("caramel") || p.includes("speculoos") || p.includes("café") || p.includes("coffee") || p.includes("moka") || p.includes("praliné") || p.includes("كاراميل") || p.includes("قهوة");

  let imgInfo = {
    url: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=1200&auto=format&fit=crop&q=80",
    label: "Entremet d'Exception de la Pâtisserie Rayan"
  };

  if (hasChocolate) {
    imgInfo = {
      url: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200&auto=format&fit=crop&q=80",
      label: "Gâteau Suprême au Chocolat Belge"
    };
  } else if (hasGelato) {
    imgInfo = {
      url: "https://images.unsplash.com/photo-1567206563066-116309418529?w=1200&auto=format&fit=crop&q=80",
      label: "Gelato Artisanal Rayan aux Parfums Naturels"
    };
  } else if (hasBerry) {
    imgInfo = {
      url: "https://images.unsplash.com/photo-1535141192574-5d4897c13636?w=1200&auto=format&fit=crop&q=80",
      label: "Coupe de Fruits Rouges & Gelato aux Baies Sauvages"
    };
  } else if (hasOriental) {
    imgInfo = {
      url: "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=1200&auto=format&fit=crop&q=80",
      label: "Plateau de Pâtisseries Fines Marocaines au Miel d'Oranger"
    };
  } else if (hasCelebration) {
    imgInfo = {
      url: "https://images.unsplash.com/photo-1513101246075-066271776587?w=1200&auto=format&fit=crop&q=80",
      label: "Pièce Montée d'Exception & Fleurs de Saison"
    };
  } else if (hasLemon) {
    imgInfo = {
      url: "https://images.unsplash.com/photo-1519869325930-281384150729?w=1200&auto=format&fit=crop&q=80",
      label: "Tarte Fine au Citron Meringuée & Zestes Confits"
    };
  } else if (hasPistachio) {
    imgInfo = {
      url: "https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?w=1200&auto=format&fit=crop&q=80",
      label: "Entremet Signature à la Pistache de Sicile & Matcha"
    };
  } else if (hasCaramel) {
    imgInfo = {
      url: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=1200&auto=format&fit=crop&q=80",
      label: "Mille-Feuille Croustillant au Caramel Beurre Salé & Praliné"
    };
  }

  const isArabic = /[\u0600-\u06FF]/.test(p);
  const warning = isArabic 
    ? "ميزة توليد الصور بالذكاء الاصطناعي تتطلب مفتاح API مدفوعاً في Google AI Studio. لقد اخترنا لك هذا التصميم الاحترافي الرائع المتوافق مع طلبك من مكتبة صورنا الفاخرة."
    : "La génération d'images par IA nécessite une clé API payante dans Google AI Studio. Nous avons sélectionné pour vous ce superbe visuel professionnel de notre galerie culinaire, correspondant à votre idée.";

  return { ...imgInfo, warning };
}

// 2. IMAGE GENERATOR API : Créer de magnifiques desserts d'anniversaire ou gelato
app.post("/api/generate-image", async (req, res) => {
  const { prompt, size } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  const imageSize = size === "2K" ? "2K" : size === "4K" ? "4K" : "1K";

  try {
    const ai = getAIClient();

    // Enrich the prompt to keep it extremely high quality, food-focused, and premium matching the restaurant's theme
    const enrichedPrompt = `A premium professional high-end food photography of: ${prompt}. Extremely appetizing, studio lighting, elegant gold and black dark slate background, warm soft glow, master chef quality, 8k resolution, photorealistic.`;

    // Try gemini-3-pro-image-preview, with fallback to gemini-3.1-flash-image
    let response;
    let modelUsed = "gemini-3-pro-image-preview";
    
    try {
      response = await ai.models.generateContent({
        model: "gemini-3-pro-image-preview",
        contents: {
          parts: [{ text: enrichedPrompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1",
            imageSize: imageSize
          }
        }
      });
    } catch (primaryError) {
      console.warn("Primary model gemini-3-pro-image-preview failed, attempting fallback to gemini-3.1-flash-image...", primaryError);
      modelUsed = "gemini-3.1-flash-image";
      response = await ai.models.generateContent({
        model: "gemini-3.1-flash-image",
        contents: {
          parts: [{ text: enrichedPrompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1",
            imageSize: imageSize
          }
        }
      });
    }

    if (!response.candidates || response.candidates.length === 0) {
      throw new Error("No image candidates returned from model.");
    }

    let base64Image = "";
    const parts = response.candidates[0].content.parts;
    for (const part of parts) {
      if (part.inlineData) {
        base64Image = part.inlineData.data;
        break;
      }
    }

    if (!base64Image) {
      throw new Error("Could not extract image data from response parts.");
    }

    res.json({
      imageUrl: `data:image/png;base64,${base64Image}`,
      model: modelUsed,
      size: imageSize
    });

  } catch (error: any) {
    console.warn("Gemini Image generation failed (likely quota/free tier restriction). Applying dynamic gourmet fallback...", error.message || error);
    
    // Obtenir une image de remplacement ultra-premium correspondant au thème de l'utilisateur
    const fallback = getPremiumFallbackImage(prompt);
    
    res.json({
      imageUrl: fallback.url,
      model: "Premium Photothèque Rayan",
      size: imageSize,
      warning: fallback.warning,
      label: fallback.label
    });
  }
});

// ==========================================
// VITE AND STATIC SERVING MIDDLEWARE WITH DYNAMIC META REWRITING
// ==========================================

const sectionMeta: Record<string, { title: string; description: string; image: string }> = {
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
    description: "Découvrez notre passion pour l'accueil de prestige, des ingrédients locaux d'origine bio, et une ambiance chaleureuse idéale pour toutes vos rencontres.",
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
    description: "Situé à Deroua, Nassim 11, à seulement 10 min de l'Aéroport de Casablanca. Ouvert tous les jours de 07:00 à Minuit. Parking sécurisé gratuit.",
    image: "https://images.unsplash.com/photo-1522336572018-3bcd957debac?w=1200&auto=format&fit=crop&q=80"
  }
};

function replaceMetaTag(html: string, name: string, isProperty: boolean, newContent: string): string {
  const attrName = isProperty ? 'property' : 'name';
  const regex = new RegExp(
    `<meta\\s+[^>]*?${attrName}=["']${name}["'][^>]*?content=["'](.*?)["'][^>]*?\\/?>|<meta\\s+[^>]*?content=["'](.*?)["'][^>]*?${attrName}=["']${name}["'][^>]*?\\/?>`,
    'i'
  );
  
  if (regex.test(html)) {
    return html.replace(regex, `<meta ${attrName}="${name}" content="${newContent}" />`);
  } else {
    return html.replace('</head>', `  <meta ${attrName}="${name}" content="${newContent}" />\n</head>`);
  }
}

function replaceTitle(html: string, newTitle: string): string {
  const regex = /<title>.*?<\/title>/i;
  if (regex.test(html)) {
    return html.replace(regex, `<title>${newTitle}</title>`);
  } else {
    return html.replace('</head>', `  <title>${newTitle}</title>\n</head>`);
  }
}

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    
    app.get('*', (req, res) => {
      // Ignorer les fichiers statiques ou appels d'API
      if (req.path.includes('.') || req.path.startsWith('/api/') || req.path.startsWith('/assets/')) {
        return res.sendFile(path.join(distPath, req.path));
      }

      try {
        const htmlPath = path.join(distPath, 'index.html');
        let html = fs.readFileSync(htmlPath, 'utf8');

        // Identifier la section demandée (depuis le paramètre d'URL ?section= ou le chemin /section)
        let sectionKey = (req.query.section as string) || "";
        if (!sectionKey) {
          const p = req.path.toLowerCase().replace(/^\/|\/$/g, "");
          if (["menu", "experience", "gallery", "reviews", "contact", "celebrations"].includes(p)) {
            sectionKey = p;
          } else if (p === "atelier-ai" || p === "cake-generator" || p === "atelier") {
            sectionKey = "atelier-ai";
          } else if (p === "anniversaires") {
            sectionKey = "celebrations";
          } else if (p === "testimonials" || p === "temoignages") {
            sectionKey = "reviews";
          }
        }

        const meta = sectionMeta[sectionKey] || sectionMeta.home;
        const currentUrl = `https://restaurantrayan.ma${req.originalUrl}`;

        // Remplacements dynamiques sécurisés
        html = replaceTitle(html, meta.title);
        html = replaceMetaTag(html, "description", false, meta.description);
        
        // Open Graph
        html = replaceMetaTag(html, "og:title", true, meta.title);
        html = replaceMetaTag(html, "og:description", true, meta.description);
        html = replaceMetaTag(html, "og:image", true, meta.image);
        html = replaceMetaTag(html, "og:url", true, currentUrl);

        // Twitter Cards
        html = replaceMetaTag(html, "twitter:title", false, meta.title);
        html = replaceMetaTag(html, "twitter:description", false, meta.description);
        html = replaceMetaTag(html, "twitter:image", false, meta.image);

        res.set('Content-Type', 'text/html');
        res.send(html);
      } catch (err) {
        console.error("HTML Dynamic SEO Rewrite Error:", err);
        res.sendFile(path.join(distPath, 'index.html'));
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Restaurant Rayan Backend] Server running at http://localhost:${PORT}`);
  });
}

startServer();
