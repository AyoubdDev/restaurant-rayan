/**
 * CONFIGURATION DE BASE DU SITE - RESTAURANT RAYAN
 * ⚠️ CONFIGURATION OFFICIELLE POUR DEROUA ⚠️
 */

export const siteConfig = {
  name: "Restaurant Rayan",
  
  // Tagline multilingue
  tagline: {
    fr: "Toutes les envies, une seule adresse.",
    ar: "كل الرغبات في عنوان واحد.",
    en: "All cravings, one single address."
  },
  
  // Description multilingue
  description: {
    fr: "Grillades savoureuses au feu de bois, pizzas cuites sur pierre, hamburgers gourmets, poissons frais, sushis authentiques et glaces artisanales au cœur de Deroua, Casablanca-Settat. Un espace familial idéal.",
    ar: "مشويات لذيذة على الفحم، بيتزا على الحطب، برجر فاخر، أسماك طازجة، سوشي أصيل وجيلاتو حرفي في قلب الدروة، الدار البيضاء-سطات. مساحة عائلية مثالية.",
    en: "Delicious wood-fired grills, stone-baked pizzas, gourmet burgers, fresh fish, authentic sushi, and handcrafted gelato in the heart of Deroua, Casablanca-Settat. Ideal family space."
  },
  
  // Coordonnées & Contacts
  address: "Restaurant Rayan, Deroua, Casablanca-Settat, Maroc",
  
  addressNotes: {
    fr: "Sur la Route Nationale 9, au centre de Deroua",
    ar: "على الطريق الوطنية رقم 9، في وسط الدروة",
    en: "On National Route 9, in the center of Deroua"
  },
  
  phonePrimary: "+212 522 515 056",
  phoneSecondary: "+212 767 314 719",
  email: "contact@restaurantgelatorayan.com",
  whatsappNumber: "212767314719", // Format international pour l'API WhatsApp
  
  // Horaires d'ouverture détaillés
  openingHours: {
    fr: "Lun - Ven: 12:00 - 01:00 | Sam: 12:00 - 01:00 | Dim: 13:00 - 01:00 | Mar: 12:00 - 01:30",
    ar: "الإثنين - الجمعة: 12:00 - 01:00 | السبت: 12:00 - 01:00 | الأحد: 13:00 - 01:00 | الثلاثاء: 12:00 - 01:30",
    en: "Mon - Fri: 12:00 PM - 01:00 AM | Sat: 12:00 PM - 01:00 AM | Sun: 01:00 PM - 01:00 AM | Tue: 12:00 PM - 01:30 AM"
  },

  weeklyHours: [
    { dayFr: "Lundi", dayEn: "Monday", dayAr: "الإثنين", hours: "12:00 - 01:00" },
    { dayFr: "Mardi", dayEn: "Tuesday", dayAr: "الثلاثاء", hours: "12:00 - 01:30" },
    { dayFr: "Mercredi", dayEn: "Wednesday", dayAr: "الأربعاء", hours: "12:00 - 01:00" },
    { dayFr: "Jeudi", dayEn: "Thursday", dayAr: "الخميس", hours: "12:00 - 01:00" },
    { dayFr: "Vendredi", dayEn: "Friday", dayAr: "الجمعة", hours: "12:00 - 01:00" },
    { dayFr: "Samedi", dayEn: "Saturday", dayAr: "السبت", hours: "12:00 - 01:00" },
    { dayFr: "Dimanche", dayEn: "Sunday", dayAr: "الأحد", hours: "13:00 - 01:00" }
  ],
  
  rating: {
    value: 3.9,
    count: 1855
  },

  priceRange: "50 MAD – 300 MAD",

  // Liens Réseaux Sociaux officiels
  socials: {
    instagram: "https://www.instagram.com/restaurantgelatorayan",
    facebook: "https://www.facebook.com/people/Restaurant-Rayan/100063517228308/",
    whatsappChat: "https://wa.me/212767314719",
    googleMaps: "https://maps.app.goo.gl/g6zXWf7Y58YxG2eEA" // URL Google Maps officielle
  }
};
