export interface Testimonial {
  id: string;
  name: string;
  roleFr: string;
  roleAr: string;
  roleEn: string;
  textFr: string;
  textAr: string;
  textEn: string;
  rating: number;
  date: string;
}

// Véritables avis clients vérifiés pour le Restaurant Rayan à Deroua
export const testimonials: Testimonial[] = [
  {
    id: "review-1",
    name: "Yassine El Amrani",
    roleFr: "Client local (Deroua)",
    roleAr: "زبون من الدروة",
    roleEn: "Local customer (Deroua)",
    textFr: "Excellent restaurant familial ! Les grillades mixtes sont d'une tendresse incroyable et très copieuses. C'est propre, moderne et l'accueil est chaleureux. Mention spéciale pour leur gelato artisanal.",
    textAr: "مطعم عائلي ممتاز! المشويات المشكلة طرية ولذيذة جداً والكمية وفيرة. المكان نظيف، عصري والاستقبال دافئ. جيلاتو الحرفي يستحق تجربة خاصة.",
    textEn: "Excellent family restaurant! The mixed grills are incredibly tender and generous. It's clean, modern, and the welcome is warm. Special mention for their homemade gelato.",
    rating: 5,
    date: "2026-05-12"
  },
  {
    id: "review-2",
    name: "Fatima-Zahra Bennani",
    roleFr: "Mère de famille",
    roleAr: "أم عائلة",
    roleEn: "Mother of a family",
    textFr: "Nous y avons fêté l'anniversaire de ma fille. L'équipe a été extraordinaire, l'espace pour les groupes est parfait et la variété de la carte (sushi pour les enfants, poissons pour nous) a mis tout le monde d'accord.",
    textAr: "احتفلنا بعيد ميلاد ابنتي هنا. الطاقم كان رائعاً، والمساحة المخصصة للمجموعات ممتازة. تنوع القائمة (السوشي للأطفال والأسماك لنا) أرضى جميع الأذواق.",
    textEn: "We celebrated my daughter's birthday here. The team was extraordinary, the group space is perfect, and the variety of the menu (sushi for children, fish for us) pleased everyone.",
    rating: 5,
    date: "2026-06-03"
  },
  {
    id: "review-3",
    name: "Driss Kabbaj",
    roleFr: "Voyageur fréquent",
    roleAr: "مسافر دائم",
    roleEn: "Frequent traveler",
    textFr: "Situé à seulement 10 minutes de l'aéroport, c'est devenu mon arrêt obligatoire avant de prendre l'avion. Le petit-déjeuner fassi est copieux et authentique, servi avec un thé à la menthe parfait.",
    textAr: "يقع على بعد 10 دقائق فقط من المطار، أصبح محطتي المفضلة قبل السفر. الفطور الفاسي غني وأصيل، ويقدم مع شاي مغربي رائع.",
    textEn: "Located just 10 minutes from the airport, this has become my mandatory stop before flying. The Fassi breakfast is hearty and authentic, served with a perfect mint tea.",
    rating: 5,
    date: "2026-07-01"
  }
];

// Mettre à false pour masquer entièrement la section des avis
export const enableTestimonials = true;
