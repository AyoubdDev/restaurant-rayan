export interface GalleryItem {
  id: string;
  category: "plats" | "ambiance" | "desserts" | "evenements";
  image: string;
  titleFr: string;
  titleAr: string;
  titleEn: string;
  altFr: string;
  altAr: string;
  altEn: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: "gal-01",
    category: "plats",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
    titleFr: "Grillades Mixtes au feu de bois",
    titleAr: "مشويات مشكلة على الفحم",
    titleEn: "Wood-fired Mixed Grills",
    altFr: "Plat généreux de brochettes grillées",
    altAr: "طبق غني من البروشيت المشوي",
    altEn: "Generous platter of charcoal grilled skewers"
  },
  {
    id: "gal-02",
    category: "plats",
    image: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=800&auto=format&fit=crop&q=80",
    titleFr: "Plateau de Fruits de Mer croustillants",
    titleAr: "طبق فواكه البحر المقرمشة",
    titleEn: "Crispy Fried Seafood Platter",
    altFr: "Calamars et crevettes frits avec citron",
    altAr: "كلمار وقيمرون مقلي مع الليمون",
    altEn: "Fried squid and shrimp with fresh lemon"
  },
  {
    id: "gal-03",
    category: "plats",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop&q=80",
    titleFr: "California Rolls et Sushis",
    titleAr: "كاليفورنيا رول وسوشي طازج",
    titleEn: "Fresh California Rolls and Sushi",
    altFr: "Assortiment frais de sushis prestige",
    altAr: "تشكيلة سوشي طازجة وفاخرة",
    altEn: "Assorted fresh prestige sushi rolls"
  },
  {
    id: "gal-04",
    category: "ambiance",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
    titleFr: "Espace Familial Moderne & Lumineux",
    titleAr: "مساحة عائلية عصرية ومضيئة",
    titleEn: "Modern & Bright Family Space",
    altFr: "Salles spacieuses avec tables élégantes pour les familles",
    altAr: "قاعات واسعة مع طاولات أنيقة للعائلات",
    altEn: "Spacious halls with elegant tables for families"
  },
  {
    id: "gal-05",
    category: "ambiance",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&auto=format&fit=crop&q=80",
    titleFr: "Salon Premium & Confortable",
    titleAr: "صالون فاخر ومريح",
    titleEn: "Premium & Comfortable Lounge",
    altFr: "Espace salon pour se détendre et déguster",
    altAr: "مساحة مريحة للاسترخاء وتناول الوجبات",
    altEn: "Cozy lounge area to relax and enjoy your meal"
  },
  {
    id: "gal-06",
    category: "desserts",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80",
    titleFr: "Notre Gelato Artisanal fait maison",
    titleAr: "جيلاتو حرفي طبيعي صنع منزلي",
    titleEn: "Handcrafted Homemade Gelato",
    altFr: "Boules de glaces italiennes onctueuses",
    altAr: "كرات جيلاتو إيطالية غنية بالكريمة",
    altEn: "Velvety scoops of authentic Italian gelato"
  },
  {
    id: "gal-07",
    category: "desserts",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&auto=format&fit=crop&q=80",
    titleFr: "Dessert Signature au Chocolat",
    titleAr: "حلوى مميزة بالشوكولاتة",
    titleEn: "Signature Chocolate Fondant",
    altFr: "Pâtisserie gourmande au chocolat noir",
    altAr: "حلوى شوكولاتة داكنة غنية",
    altEn: "Decadent dark chocolate lava cake"
  },
  {
    id: "gal-08",
    category: "evenements",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop&q=80",
    titleFr: "Célébrations d'Anniversaires",
    titleAr: "الاحتفال بأعياد الميلاد",
    titleEn: "Birthday & Family Celebrations",
    altFr: "Table festive décorée pour un anniversaire familial",
    altAr: "طاولة احتفالية مزينة لعيد ميلاد عائلي",
    altEn: "Festive table decorated for family birthdays"
  }
];
