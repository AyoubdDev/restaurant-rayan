export interface MenuItem {
  id: string;
  nameFr: string;
  nameAr: string;
  nameEn: string;
  descriptionFr: string;
  descriptionAr: string;
  descriptionEn: string;
  price?: number; // En DH, optionnel
  badgeFr?: string;
  badgeAr?: string;
  badgeEn?: string;
  image: string; // Lien de l'image
  isSignature?: boolean;
}

export interface MenuCategory {
  id: string;
  titleFr: string;
  titleAr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionAr: string;
  descriptionEn: string;
  image: string;
}

export const menuCategories: MenuCategory[] = [
  {
    id: "grillades",
    titleFr: "Grillades",
    titleAr: "مشويات",
    titleEn: "Grills",
    descriptionFr: "Viandes sélectionnées cuites au feu de bois, tendres et parfumées.",
    descriptionAr: "لحوم مختارة بعناية مشوية على الفحم، طرية وغنية بالنكهات.",
    descriptionEn: "Premium selected meats cooked over wood fire, tender and aromatic.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "poissons",
    titleFr: "Poissons & Fruits de Mer",
    titleAr: "أسماك وفواكه البحر",
    titleEn: "Seafood & Fish",
    descriptionFr: "Arrivages frais du jour grillés ou en friture.",
    descriptionAr: "أسماك طازجة يومية مشوية أو مقلية حسب اختياركم.",
    descriptionEn: "Fresh catch of the day, perfectly grilled or crispy fried.",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "cuisine-inter",
    titleFr: "Cuisine Internationale",
    titleAr: "مطبخ عالمي",
    titleEn: "International Cuisine",
    descriptionFr: "Pâtes crémeuses, pizzas au feu de bois et plats signatures.",
    descriptionAr: "معجنات إيطالية، بيتزا على الحطب وأطباق عالمية مميزة.",
    descriptionEn: "Creamy pastas, wood-fired pizzas, and gourmet signature dishes.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "sushi",
    titleFr: "Sushi",
    titleAr: "سوشي",
    titleEn: "Sushi",
    descriptionFr: "Assortiments raffinés préparés à la minute par notre maître sushiman.",
    descriptionAr: "تشكيلات راقية من السوشي تحضر في الحين من طرف الشيف.",
    descriptionEn: "Exquisite sushi rolls handcrafted fresh to order by our sushi master.",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "tacos-sandwiches",
    titleFr: "Tacos & Sandwiches",
    titleAr: "تاكوس وسندويشات",
    titleEn: "Tacos & Fast Food",
    descriptionFr: "La générosité et le goût authentique pour des repas conviviaux.",
    descriptionAr: "وجبات سريعة غنية بنكهات أصلية ومثالية للمشاركة.",
    descriptionEn: "Generous and authentic street food flavors for dynamic meals.",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "breakfast",
    titleFr: "Petit-Déjeuner",
    titleAr: "فطور الصباح",
    titleEn: "Breakfast",
    descriptionFr: "Formules marocaines et occidentales pour bien démarrer la journée.",
    descriptionAr: "وجبات فطور مغربية وعالمية لبداية يوم نشيطة.",
    descriptionEn: "Moroccan and continental breakfast formulas to jumpstart your day.",
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "desserts",
    titleFr: "Desserts & Gelato",
    titleAr: "حلويات وجيلاتو",
    titleEn: "Desserts & Gelato",
    descriptionFr: "Gelato artisanal, crêpes et pâtisseries faites maison.",
    descriptionAr: "جيلاتو حرفي طبيعي، كريب وحلويات منزلية الصنع.",
    descriptionEn: "Artisanal natural gelato, golden crepes, and homemade pastries.",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "boissons",
    titleFr: "Boissons",
    titleAr: "مشروبات",
    titleEn: "Beverages & Coffee",
    descriptionFr: "Jus de fruits frais pressés, cafés de spécialité et mocktails.",
    descriptionAr: "عصائر طبيعية طازجة، قهوة مختصة وكوكتيلات منعشة.",
    descriptionEn: "Freshly squeezed juices, specialty espresso coffees, and mocktails.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop&q=80"
  }
];

export const menuItems: MenuItem[] = [
  // GRILLADES
  {
    id: "grill-01",
    nameFr: "Mix Grill Rayan",
    nameAr: "مشويات مشكلة ريان",
    nameEn: "Rayan Mixed Grill",
    descriptionFr: "Un assortiment généreux de brochettes d'agneau, kefta maison, côtelettes et poulet mariné, servi avec frites et salade.",
    descriptionAr: "تشكيلة غنية من بروشيت اللحم، كفتة منزلية، ريش الغنم والدجاج المتبل، تقدم مع البطاطس المقلية والسلطة.",
    descriptionEn: "A generous platter of lamb skewers, homemade kefta, lamb chops, and marinated chicken, served with golden fries and salad.",
    price: 135,
    badgeFr: "Signature",
    badgeAr: "مميز",
    badgeEn: "Signature",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80",
    isSignature: true
  },
  {
    id: "grill-02",
    nameFr: "Brochettes de Filet de Bœuf",
    nameAr: "بروشيت فيلي البقر",
    nameEn: "Beef Fillet Skewers",
    descriptionFr: "Morceaux de filet de bœuf extrêmement tendres, marinés aux épices douces et grillés au feu de bois.",
    descriptionAr: "قطع لحم فيلي طرية جداً، متبلة بالتوابل الخفيفة ومشويا على الفحم.",
    descriptionEn: "Extra tender chunks of beef fillet, seasoned in aromatic sweet spices and grilled over natural embers.",
    price: 110,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80",
    isSignature: false
  },
  {
    id: "grill-03",
    nameFr: "Côtelettes d'Agneau Grillées",
    nameAr: "ريش الغنم المشوية",
    nameEn: "Grilled Lamb Chops",
    descriptionFr: "Côtelettes d'agneau fraîches saisies au feu de bois, assaisonnées au sel de mer et cumin.",
    descriptionAr: "ريش غنم طازجة مشوية على الفحم، متبلة بملح البحر والكمون.",
    descriptionEn: "Fresh, juicy lamb chops seared over hot coals, seasoned with natural sea salt and cumin.",
    price: 120,
    badgeFr: "Populaire",
    badgeAr: "شائع",
    badgeEn: "Popular",
    image: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=600&auto=format&fit=crop&q=80",
    isSignature: true
  },

  // POISSONS
  {
    id: "poisson-01",
    nameFr: "Friture de Poissons de l'Atlantique",
    nameAr: "فواكه البحر مقلية",
    nameEn: "Crispy Atlantic Fried Seafood",
    descriptionFr: "Un plateau croustillant de calamars, crevettes, sole, pageot et merlan, servi avec citron frais et sauce tartare.",
    descriptionAr: "طبق مقرمش من الكلمار، القيمرون، الصول، الباجو والميرلان، يقدم مع الليمون الطازج وصلصة التارتار.",
    descriptionEn: "A golden, crispy platter of squid, shrimp, sole, pageot, and whiting, served with fresh lemon slices and tartare sauce.",
    price: 140,
    badgeFr: "Du Jour",
    badgeAr: "صيد اليوم",
    badgeEn: "Fresh Catch",
    image: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=600&auto=format&fit=crop&q=80",
    isSignature: true
  },
  {
    id: "poisson-02",
    nameFr: "Daurade Royale Grillée",
    nameAr: "سمك الوراطة المشوي",
    nameEn: "Grilled Royal Sea Bream",
    descriptionFr: "Daurade entière cuite au feu de bois, parfumée aux herbes de l'Atlas, huile d'olive et ail.",
    descriptionAr: "سمكة وراطة كاملة مشوية على الفحم، منكهة بأعشاب الأطلس، زيت الزيتون والثوم.",
    descriptionEn: "Whole premium sea bream grilled over charcoal, seasoned with Atlas herbs, extra-virgin olive oil, and organic garlic.",
    price: 115,
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&auto=format&fit=crop&q=80",
    isSignature: false
  },
  {
    id: "poisson-03",
    nameFr: "Tagine de Crevettes Pil-Pil",
    nameAr: "طاجين القيمرون بيل بيل",
    nameEn: "Shrimp Tagine Pil-Pil",
    descriptionFr: "Crevettes sautées à l'ail, piment doux, persillade et huile d'olive vierge, mijotées dans un tagine traditionnel.",
    descriptionAr: "قيمرون مطهو مع الثوم، الفلفل الحلو، البقدونس وزيت الزيتون البكر في طاجين تقليدي.",
    descriptionEn: "Plump shrimp sautéed with garlic, sweet paprika, fresh parsley, and extra-virgin olive oil, simmered in a traditional clay tagine.",
    price: 95,
    badgeFr: "Tradition",
    badgeAr: "تقليدي",
    badgeEn: "Traditional",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&auto=format&fit=crop&q=80",
    isSignature: false
  },

  // SUSHI
  {
    id: "sushi-01",
    nameFr: "Plateau Prestige (24 pièces)",
    nameAr: "طبق السوشي الفاخر (24 قطعة)",
    nameEn: "Prestige Sushi Platter (24 pcs)",
    descriptionFr: "Sélection de California rolls, Maki saumon, Nigiri crevette et Rolls signatures croustillants.",
    descriptionAr: "مجموعة مختارة من كاليفورنيا رول، ماكي السلمون، نيجيري القيمرون واللفائف المقرمشة المميزة.",
    descriptionEn: "An artistic selection of California rolls, Salmon Makis, Shrimp Nigiris, and our crispy signature rolls.",
    price: 180,
    badgeFr: "Premium",
    badgeAr: "فاخر",
    badgeEn: "Premium",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&auto=format&fit=crop&q=80",
    isSignature: true
  },
  {
    id: "sushi-02",
    nameFr: "California Salmon Roll (8 pcs)",
    nameAr: "كاليفورنيا سالمون (8 قطع)",
    nameEn: "California Salmon Roll (8 pcs)",
    descriptionFr: "Rouleau de riz garni de saumon frais, avocat onctueux et concombre croquant, enrobé de graines de sésame grillées.",
    descriptionAr: "لفافة أرز محشوة بالسلمون الطازج، الأفوكادو والخيار، مغطاة بسمسم محمص.",
    descriptionEn: "Handrolled rice wrapper stuffed with fresh salmon, creamy avocado, and crunchy cucumber, rolled in toasted sesame seeds.",
    price: 75,
    image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=600&auto=format&fit=crop&q=80",
    isSignature: false
  },

  // INTERNATIONAL
  {
    id: "inter-01",
    nameFr: "Pennes au Saumon Crémeux",
    nameAr: "بيني السلمون بالكريمة",
    nameEn: "Creamy Salmon Penne Pasta",
    descriptionFr: "Pâtes italiennes fraîches, émincé de saumon fumé, crème fraîche d'Isigny et parmesan.",
    descriptionAr: "معجنات إيطالية طازجة مع شرائح السلمون المدخن، الكريمة الطازجة وجبن البارميزان.",
    descriptionEn: "Freshly cooked Italian penne tossed with smoked salmon slivers, rich crème fraîche, and aged parmesan.",
    price: 95,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80",
    isSignature: false
  },
  {
    id: "inter-02",
    nameFr: "Filet Mignon Sauce Champignons",
    nameAr: "فيلي مينيون بصلصة الفطر",
    nameEn: "Filet Mignon Mushroom Sauce",
    descriptionFr: "Médaillon de filet de bœuf extra tendre, cuit selon vos préférences, nappé d'une crème forestière onctueuse.",
    descriptionAr: "قطعة لحم فيلي بقر طرية جداً، مطهوة حسب رغبتكم، مغطاة بصلصة الفطر الكريمية الغنية.",
    descriptionEn: "Seared premium beef medallion cooked to order, napped in a velvety cream sauce loaded with wild forest mushrooms.",
    price: 150,
    badgeFr: "Chef's Choice",
    badgeAr: "اختيار الشيف",
    badgeEn: "Chef's Choice",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80",
    isSignature: true
  },

  // TACOS & SANDWICHES
  {
    id: "tacos-01",
    nameFr: "Tacos Royal au Feu de Bois",
    nameAr: "تاكوس ملكي على الحطب",
    nameEn: "Royal Wood-Fired Tacos",
    descriptionFr: "Galette d'orge garnie de kefta grillée, émincé de poulet mariné et sauce fromagère secrète du chef.",
    descriptionAr: "خبز التورتيلا محشو بالكفتة المشوية، الدجاج المتبل، والصلصة الجبنية السرية الخاصة بالشيف.",
    descriptionEn: "Warm flour tortilla packed with grilled kefta, spiced marinated chicken, and the chef's secret cheese sauce.",
    price: 65,
    badgeFr: "Gourmet",
    badgeAr: "لذيذ",
    badgeEn: "Gourmet",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&auto=format&fit=crop&q=80",
    isSignature: false
  },
  {
    id: "tacos-02",
    nameFr: "Club Sandwich Prestige",
    nameAr: "كلوب ساندويش بريستيج",
    nameEn: "Prestige Club Sandwich",
    descriptionFr: "Pain toasté garni de filet de poulet grillé, œuf bio, dinde fumée, cheddar fondant et frites dorées.",
    descriptionAr: "خبز توست محمص محشو بالدجاج المشوي، بيض بلدي، ديك رومي مدخن، جبن الشيدر، مع البطاطس المقلية.",
    descriptionEn: "Crispy toasted bread stacked with grilled chicken breast, organic egg, smoked turkey, melted cheddar, served with golden fries.",
    price: 70,
    image: "https://images.unsplash.com/photo-1567234669003-dce7a7a88821?w=600&auto=format&fit=crop&q=80",
    isSignature: true
  },

  // PETIT DEJEUNER
  {
    id: "pdej-01",
    nameFr: "Petit-Déjeuner Fassi Traditionnel",
    nameAr: "فطور فاسي تقليدي",
    nameEn: "Traditional Fassi Breakfast",
    descriptionFr: "Khlii (viande séchée), œufs bio, msemmen, harcha, olives noires, miel libre, huile d'olive et thé à la menthe.",
    descriptionAr: "خليع، بيض بلدي، مسمن، حرشة، زيتون أسود، عسل حر، زيت زيتون وشاي بالنعناع.",
    descriptionEn: "A rich platter of Moroccan dried beef (Khlii), organic fried eggs, flaky msemmen, harcha semolina bread, pure mountain honey, extra-virgin olive oil, and warm mint tea.",
    price: 55,
    badgeFr: "Matinal",
    badgeAr: "الصباح",
    badgeEn: "Morning Special",
    image: "https://images.unsplash.com/photo-1496042491112-e743a445ec1a?w=600&auto=format&fit=crop&q=80",
    isSignature: true
  },
  {
    id: "pdej-02",
    nameFr: "Formule Beldi",
    nameAr: "الفطور البلدي",
    nameEn: "Formule Beldi",
    descriptionFr: "Œufs au plat à l'huile d'olive d'argan, Jben traditionnel, olives marinées, pain traditionnel chaud et café au lait.",
    descriptionAr: "بيض مقلي بزيت الأركان، جبن بلدي، زيتون متبل، خبز تقليدي ساخن وقهوة بالحليب.",
    descriptionEn: "Two sunny-side up eggs drizzled in pure argan oil, organic Jben cheese, seasoned olives, warm wood-fired Moroccan bread, and café au lait.",
    price: 40,
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600&auto=format&fit=crop&q=80",
    isSignature: false
  },

  // DESSERTS & GELATO
  {
    id: "gelato-01",
    nameFr: "Coupe Gelato Rayan (3 Boules)",
    nameAr: "كأس جيلاتو ريان (3 كرات)",
    nameEn: "Rayan Gelato Cup (3 Scoops)",
    descriptionFr: "Gelato 100% artisanal fabriqué sur place. Saveurs au choix : Vanille de Madagascar, Chocolat noir intense, Pistache de Sicile, Fraise bio.",
    descriptionAr: "جيلاتو حرفي 100٪ يصنع محلياً. نكهات من اختياركم: فانيليا مدغشقر، شوكولاتة داكنة، فستق صقلي، فراولة طبيعية.",
    descriptionEn: "100% handcrafted Italian gelato whipped on site. Choose 3 flavors: Madagascar Vanilla, Dark chocolate, Sicilian Pistachio, Organic Strawberry.",
    price: 45,
    badgeFr: "Artisanal",
    badgeAr: "صنع منزلي",
    badgeEn: "Artisanal",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&auto=format&fit=crop&q=80",
    isSignature: true
  },
  {
    id: "gelato-02",
    nameFr: "Fondant au Chocolat Coeur Coulant",
    nameAr: "فوندان الشوكولاتة الساخن",
    nameEn: "Warm Chocolate Fondant",
    descriptionFr: "Cœur coulant au chocolat noir 72%, accompagné d'une boule de glace vanille artisanale de Madagascar.",
    descriptionAr: "كيك الشوكولاتة الداكنة بقلب سائل غني بتركيز 72٪، يقدم مع كرة جيلاتو الفانيليا الحرفية.",
    descriptionEn: "Warm chocolate cake with an oozing 72% dark chocolate center, served with a velvety scoop of handmade Madagascar vanilla gelato.",
    price: 50,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80",
    isSignature: false
  },
  {
    id: "gelato-03",
    nameFr: "Tiramisu Traditionnel Italien",
    nameAr: "تيراميسو إيطالي تقليدي",
    nameEn: "Classic Italian Tiramisu",
    descriptionFr: "Biscuit cuillère imbibé d'expresso corsé, crème onctueuse de mascarpone parfumée à la vanille.",
    descriptionAr: "بسكويت مغموس في قهوة الإسبريسو المركزة، مغطى بكريمة الماسكاربوني الناعمة الغنية.",
    descriptionEn: "Savoyard ladyfingers soaked in dark robust espresso, layered with a fluffy vanilla-perfumed mascarpone cloud.",
    price: 45,
    badgeFr: "Maison",
    badgeAr: "منزلي",
    badgeEn: "Homemade",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&auto=format&fit=crop&q=80",
    isSignature: false
  },

  // BOISSONS
  {
    id: "boisson-01",
    nameFr: "Jus d'Orange Pressé Frais",
    nameAr: "عصير برتقال طبيعي طازج",
    nameEn: "Fresh Squeezed Orange Juice",
    descriptionFr: "Oranges marocaines sélectionnées pressées à la minute pour faire le plein de vitamines.",
    descriptionAr: "برتقال مغربي طازج معصور عند الطلب لضمان الطعم الطبيعي الغني بالفيتامينات.",
    descriptionEn: "Premium handpicked sweet Moroccan oranges, cold pressed to order for your perfect morning vitamin booster.",
    price: 25,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80",
    isSignature: false
  },
  {
    id: "boisson-02",
    nameFr: "Mocktail Virgin Mojito Royal",
    nameAr: "موخيتو ملكي منعش",
    nameEn: "Royal Virgin Mojito",
    descriptionFr: "Menthe fraîche, citron vert vert pressé, sucre de canne roux, eau pétillante et coulis de fruits rouges exotiques.",
    descriptionAr: "نعناع طازج، ليمون أخضر معصور، سكر قصب بني، مياه فوارة، مع إضافة لمسة من الفواكه الحمراء.",
    descriptionEn: "Fresh garden mint, muddled lime juice, organic brown cane sugar, sparkling soda, and a splash of wild berry coulis.",
    price: 35,
    badgeFr: "Fresh",
    badgeAr: "منعش",
    badgeEn: "Refreshing",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80",
    isSignature: true
  },
  {
    id: "boisson-03",
    nameFr: "Avocado Shake Amandes & Miel",
    nameAr: "عصير الأفوكادو باللوز والعسل",
    nameEn: "Avocado Almond Honey Shake",
    descriptionFr: "Mélange onctueux d'avocats frais, lait d'amande, morceaux d'amandes grillées craquantes et filet de miel pur.",
    descriptionAr: "مزيج غني من الأفوكادو الطازج، حليب اللوز، قطع اللوز المحمص المقرمش وعسل طبيعي حر.",
    descriptionEn: "A dense blend of organic avocado, rich almond milk, crushed toasted almond bits, and a heavy drizzle of pure honey.",
    price: 40,
    image: "https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=600&auto=format&fit=crop&q=80",
    isSignature: false
  }
];
