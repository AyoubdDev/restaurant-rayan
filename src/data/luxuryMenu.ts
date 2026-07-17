export interface LuxuryDish {
  id: string;
  nameFr: string;
  nameAr: string;
  descriptionFr: string;
  descriptionAr: string;
  price: number;
  ingredientsFr: string;
  ingredientsAr: string;
  calories: number;
  isChefChoice: boolean;
  winePairingFr: string;
  winePairingAr: string;
  image: string;
  specialEffect: "steak" | "pasta" | "dessert" | "drinks" | "general";
  floatingIngredients: string[];
}

export interface LuxuryCategory {
  id: string;
  titleFr: string;
  titleAr: string;
  subtitleFr: string;
  subtitleAr: string;
  dishes: LuxuryDish[];
  image: string;
}

export const luxuryCategories: LuxuryCategory[] = [
  {
    id: "starters",
    titleFr: "Entrées Nobles",
    titleAr: "المقبلات الراقية",
    subtitleFr: "Saveurs délicates pour éveiller le palais",
    subtitleAr: "نكهات خفيفة ومثيرة للشهية",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80",
    dishes: [
      {
        id: "starter-1",
        nameFr: "Foie Gras de Canard Saisi",
        nameAr: "كبد البط الفاخر المطهو",
        descriptionFr: "Poêlé à la minute, réduction de figues de l'Atlas au miel d'acacia et pain brioché grillé.",
        descriptionAr: "كبد بط فاخر مطهو ببطء، يقدم مع صلصة التين البري وعسل الأكاسيا والبريوش المقرمش.",
        price: 165,
        ingredientsFr: "Foie gras de canard, figues sèches, miel bio, brioche maison, fleur de sel",
        ingredientsAr: "كبد بط، تين مجفف، عسل طبيعي، خبز بريوش، زهرة الملح",
        calories: 340,
        isChefChoice: true,
        winePairingFr: "Sauternes Château d'Yquem",
        winePairingAr: "مشروب التين الذهبي الفوار",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80",
        specialEffect: "general",
        floatingIngredients: ["Figues", "Fleur de sel", "Miel"]
      },
      {
        id: "starter-2",
        nameFr: "Croustillant de Chèvre Chaud",
        nameAr: "مقرمشات جبن الماعز الدافئ",
        descriptionFr: "Fromage de chèvre affiné en croûte de noix de pécan, pommes caramélisées et herbes sauvages.",
        descriptionAr: "جبن ماعز معتق في غلاف من جوز البيكان، يقدم مع تفاح مكرمل وأعشاب برية.",
        price: 95,
        ingredientsFr: "Chèvre de l'Ourika, noix de pécan, pommes Golden, jeunes pousses",
        ingredientsAr: "جبن أوريكا، جوز بيكان، تفاح ذهبي، أوراق سلطة طازجة",
        calories: 280,
        isChefChoice: false,
        winePairingFr: "Sancerre Blanc Les Monts Damnés",
        winePairingAr: "عصير التفاح المكرمل الفوار",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80",
        specialEffect: "general",
        floatingIngredients: ["Pécan", "Herbes", "Pommes"]
      }
    ]
  },
  {
    id: "salads",
    titleFr: "Salades d'Artiste",
    titleAr: "السلطات الفنية",
    subtitleFr: "Fraîcheur absolue et compositions colorées",
    subtitleAr: "انتعاش مطلق وتناغم في الألوان",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=80",
    dishes: [
      {
        id: "salad-1",
        nameFr: "Salade Niçoise au Thon Rouge",
        nameAr: "سلطة نيسواز بالتونة الحمراء",
        descriptionFr: "Pétales de thon rouge snackés, œufs de caille mollets, olives de Kalamata et vinaigrette truffée.",
        descriptionAr: "شرائح تونة حمراء فاخرة، بيض سمان، زيتون كالاماتا وصلصة الخل المنكهة بالتروف.",
        price: 135,
        ingredientsFr: "Thon rouge de l'Atlantique, œufs de caille, haricots verts, huile de truffe",
        ingredientsAr: "تونة حمراء، بيض سمان، فاصوليا خضراء، زيت التروف الفاخر",
        calories: 310,
        isChefChoice: true,
        winePairingFr: "Provence Rosé Minuty M",
        winePairingAr: "كوكتيل الليمون والنعناع المنعش",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=80",
        specialEffect: "general",
        floatingIngredients: ["Thon rouge", "Câpres", "Truffes"]
      },
      {
        id: "salad-2",
        nameFr: "Salade Marocaine Prestige",
        nameAr: "السلطة المغربية الفاخرة",
        descriptionFr: "Tartare de tomates anciennes, concombre au sésame grillé, avocat bio et huile d'argan pure.",
        descriptionAr: "تارتار الطماطم الكرزية، خيار منكه بالسمسم المحمص، أفوكادو وزيت الأركان النقي.",
        price: 75,
        ingredientsFr: "Tomates de saison, concombre, avocat bio, huile d'argan, coriandre",
        ingredientsAr: "طماطم كرزية، خيار، أفوكادو بلدي، زيت أركان، قزبرة",
        calories: 190,
        isChefChoice: false,
        winePairingFr: "Guerrouane Gris Royal",
        winePairingAr: "عصير رمان طبيعي طازج",
        image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&auto=format&fit=crop&q=80",
        specialEffect: "general",
        floatingIngredients: ["Avocat", "Argan", "Sésame"]
      }
    ]
  },
  {
    id: "seafood",
    titleFr: "Marée & Océan",
    titleAr: "البحر والمحيط",
    subtitleFr: "Trésors de la mer cuisinés avec délicatesse",
    subtitleAr: "كنوز البحر المحضرة بلمسات راقية",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&auto=format&fit=crop&q=80",
    dishes: [
      {
        id: "seafood-1",
        nameFr: "Poulpe Grillé aux Herbes",
        nameAr: "الأخطبوط المشوي بالأعشاب",
        descriptionFr: "Poulpe de Dakhla tendre, rôti aux herbes sauvages, purée fine de patate douce et émulsion d'agrumes.",
        descriptionAr: "أخطبوط طري من شواطئ الداخلة، مشوي بأعشاب برية، يقدم مع بيوري البطاطس الحلوة ورغوة الحمضيات.",
        price: 185,
        ingredientsFr: "Poulpe géant, patate douce, huile d'olive vierge, citron vert, aneth",
        ingredientsAr: "أخطبوط، بطاطس حلوة، زيت زيتون بكر، ليمون، شبت طازج",
        calories: 320,
        isChefChoice: true,
        winePairingFr: "Chablis Premier Cru",
        winePairingAr: "مشروب الزنجبيل والليمون الفوار",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&auto=format&fit=crop&q=80",
        specialEffect: "drinks",
        floatingIngredients: ["Citron vert", "Aneth", "Olive"]
      },
      {
        id: "seafood-2",
        nameFr: "Pavé de Saumon Royale",
        nameAr: "فيليه السلمون الملكي",
        descriptionFr: "Cuit unilatéralement sur peau, écrasé de pommes de terre à l'aneth et beurre blanc au safran de Taliouine.",
        descriptionAr: "فيليه سلمون مطهو بعناية، بطاطس مهروسة بالشبت وصلصة الزبدة المتبلة بزعفران تاليوين الأصيل.",
        price: 165,
        ingredientsFr: "Saumon d'Écosse, pommes de terre, safran pur, beurre d'Isigny",
        ingredientsAr: "سلمون، بطاطس، زعفران حر، زبدة فاخرة",
        calories: 450,
        isChefChoice: false,
        winePairingFr: "Puligny-Montrachet",
        winePairingAr: "كوكتيل الخوخ والياسمين الدافئ",
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&auto=format&fit=crop&q=80",
        specialEffect: "drinks",
        floatingIngredients: ["Safran", "Beurre", "Asperges"]
      }
    ]
  },
  {
    id: "pasta",
    titleFr: "Pâtes d'Or",
    titleAr: "المعجنات الذهبية",
    subtitleFr: "Créations artisanales aux accents italiens",
    subtitleAr: "إبداعات إيطالية يدوية الصنع",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80",
    dishes: [
      {
        id: "pasta-1",
        nameFr: "Linguine aux Fruits de Mer",
        nameAr: "لينغويني فواكه البحر",
        descriptionFr: "Pâtes fraîches maison, homard bleu, crevettes royales, calamars sautés, sauce tomate parfumée à l'ail noir.",
        descriptionAr: "معجنات طازجة محضرة يدوياً، مع لحم الهمبرجر والجمبري الملكي والكلمار المشوي بصلصة طماطم وثوم أسود فريد.",
        price: 195,
        ingredientsFr: "Pâtes maison, homard, gambas, ail noir, basilic frais",
        ingredientsAr: "معجنات، همبرغر، جمبري، ثوم أسود، حبق بري",
        calories: 520,
        isChefChoice: true,
        winePairingFr: "Gavi di Gavi",
        winePairingAr: "شراب العنب الأبيض الفوار",
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80",
        specialEffect: "pasta",
        floatingIngredients: ["Parmesan", "Ail noir", "Homard"]
      },
      {
        id: "pasta-2",
        nameFr: "Tagliatelle Truffe & Cèpes",
        nameAr: "تاغلياتيلي بالتروف والفطر",
        descriptionFr: "Pâtes de blé dur rissolées dans une crème de truffes noires de l'Atlas et éclats de cèpes sauvages.",
        descriptionAr: "معجنات القمح الصلب المطهوة في كريمة التروف الأسود ورقائق فطر السيب البري الغني.",
        price: 175,
        ingredientsFr: "Tagliatelle, truffe noire d'été, cèpes, parmesan Reggiano 24 mois",
        ingredientsAr: "تاغلياتيلي، تروف أسود، فطر بري، جبن بارميزان معتق",
        calories: 490,
        isChefChoice: false,
        winePairingFr: "Barolo DOCG",
        winePairingAr: "شاي إيرل غراي الفاخر بلمسة فواكه",
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&auto=format&fit=crop&q=80",
        specialEffect: "pasta",
        floatingIngredients: ["Truffe", "Cèpes", "Basilic"]
      }
    ]
  },
  {
    id: "pizza",
    titleFr: "Pizzas Gourmet",
    titleAr: "بيتزا غوورمي الفاخرة",
    subtitleFr: "Pâtes à fermentation lente cuites au feu de bois",
    subtitleAr: "عجينة متخمرة ببطء مطهوة في فرن الحطب",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80",
    dishes: [
      {
        id: "pizza-1",
        nameFr: "Pizza Truffe Noire & Burrata",
        nameAr: "بيتزا التروف والبوراتا",
        descriptionFr: "Crème de truffe, mozzarella fior di latte, burrata crémeuse entière, tranches de truffe d'été et roquette.",
        descriptionAr: "كريمة التروف، جبن الموتزاريلا الطازج، جبن البوراتا الغني بالكامل، شرائح تروف الصيف وأوراق الجرجير.",
        price: 160,
        ingredientsFr: "Farine Petra, truffe d'été, burrata Pugliese, roquette, huile d'olive",
        ingredientsAr: "دقيق بترو، تروف الصيف، جبن بوراتا، جرجير، زيت زيتون",
        calories: 680,
        isChefChoice: true,
        winePairingFr: "Chianti Classico Riserva",
        winePairingAr: "عصير العنب الأحمر الفاخر غير المخمر",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80",
        specialEffect: "pasta",
        floatingIngredients: ["Burrata", "Truffe", "Roquette"]
      },
      {
        id: "pizza-2",
        nameFr: "Pizza Fruits de Mer Royale",
        nameAr: "بيتزا فواكه البحر الملكية",
        descriptionFr: "Sauce tomate San Marzano, crevettes roses croustillantes, calamars mariné, ail confit et filet d'argan.",
        descriptionAr: "صلصة طماطم سان مارزانو، جمبري مقرمش، كلمار متبل، ثوم مكرمل وقطرات من زيت الأركان.",
        price: 145,
        ingredientsFr: "Pâte fine, calamars, gambas, ail confit, origan frais",
        ingredientsAr: "عجينة رقيقة، كلمار، جمبري، ثوم مكرمل، زعتر طازج",
        calories: 640,
        isChefChoice: false,
        winePairingFr: "Fiano di Avellino",
        winePairingAr: "كوكتيل الأعشاب والليمون الحامض",
        image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=600&auto=format&fit=crop&q=80",
        specialEffect: "pasta",
        floatingIngredients: ["Gambas", "Ail", "Origan"]
      }
    ]
  },
  {
    id: "burgers",
    titleFr: "Burgers Couture",
    titleAr: "البرغر الفخم",
    subtitleFr: "Viandes de prestige et buns briochés dorés",
    subtitleAr: "لحوم النخبة الفاخرة بخبز البريوش الذهبي",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80",
    dishes: [
      {
        id: "burger-1",
        nameFr: "Le Wagyu Impérial d'Or",
        nameAr: "واغيو الإمبراطوري الذهبي",
        descriptionFr: "Steak de Wagyu A5 grillé, feuille d'or 24k comestible, cheddar anglais affiné 18 mois, mayonnaise à la truffe.",
        descriptionAr: "شريحة لحم واغيو A5 مشوية، ورق ذهب عيار 24 قيراط قابل للأكل، جبن شيدر معتق، مايونيز بالتروف.",
        price: 250,
        ingredientsFr: "Bœuf Wagyu A5, feuille d'or, cheddar maturé, mayonnaise truffée, bun brioché",
        ingredientsAr: "لحم واغيو، ورق ذهب، جبن شيدر، مايونيز تروف، خبز بريوش",
        calories: 890,
        isChefChoice: true,
        winePairingFr: "Château Mouton Rothschild",
        winePairingAr: "شاي ياسمين إمبراطوري فاخر",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80",
        specialEffect: "steak",
        floatingIngredients: ["Feuille d'or", "Truffe", "Cheddar"]
      },
      {
        id: "burger-2",
        nameFr: "Le Gourmet au Foie Gras",
        nameAr: "البرغر الفاخر بكبد البط",
        descriptionFr: "Bœuf Black Angus haché sur place, médaillon de foie gras poêlé, compotée d'oignons rouges au balsamique.",
        descriptionAr: "لحم بلاك أنغوس طازج، كبد بط مقلي، بصل أحمر مكرمل بالبلسميك الفاخر.",
        price: 180,
        ingredientsFr: "Bœuf Angus, foie gras, oignons balsamiques, sauce secrète chef",
        ingredientsAr: "لحم أنغوس، كبد بط، بصل بلسمي، صلصة الشيف السرية",
        calories: 840,
        isChefChoice: false,
        winePairingFr: "Saint-Émilion Grand Cru",
        winePairingAr: "عصير التوت البري المنعش",
        image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&auto=format&fit=crop&q=80",
        specialEffect: "steak",
        floatingIngredients: ["Foie gras", "Oignon", "Balsamique"]
      }
    ]
  },
  {
    id: "steak",
    titleFr: "Le Trésor des Grils",
    titleAr: "روائع الشواية",
    subtitleFr: "Coupes d'exception saisies sur braises ardentes",
    subtitleAr: "قطع لحم نادرة مشوية على الجمر الملتهب",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80",
    dishes: [
      {
        id: "steak-1",
        nameFr: "Filet de Bœuf Rossini",
        nameAr: "فيلي البقر روسيني الفخم",
        descriptionFr: "Cœur de filet de bœuf tendre, escalope de foie gras chaud, lamelles de truffe, sauce demi-glace au Madère.",
        descriptionAr: "قلب فيلي البقر الطري، يعلوه كبد بط ساخن وشرائح التروف مع صلصة الديمي غلاس الفاخرة.",
        price: 240,
        ingredientsFr: "Filet de bœuf Charolais, foie gras, truffe noire, sauce demi-glace",
        ingredientsAr: "فيلي البقر، كبد بط، تروف أسود، صلصة ديمي غلاس",
        calories: 620,
        isChefChoice: true,
        winePairingFr: "Château Margaux 2012",
        winePairingAr: "كوكتيل العنب الداكن المعتق بالبراميل الخشبية",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80",
        specialEffect: "steak",
        floatingIngredients: ["Truffes", "Foie gras", "Demi-glace"]
      },
      {
        id: "steak-2",
        nameFr: "Ribeye Black Angus Maturé",
        nameAr: "أضلاع بلاك أنغوس المعتقة",
        descriptionFr: "Entrecôte Black Angus persillée maturée 45 jours, gros sel de mer fumé et herbes de Provence.",
        descriptionAr: "لحم ريب آي بلاك أنغوس معتق لمدة 45 يوماً، يقدم مع ملح البحر المدخن وأعشاب بروفانس العطرة.",
        price: 220,
        ingredientsFr: "Entrecôte Angus maturée, fleur de sel, huile infusée au romarin",
        ingredientsAr: "لحم ريب آي معتق، ملح البحر، زيت الروزماري الفواح",
        calories: 710,
        isChefChoice: false,
        winePairingFr: "Hermitage Syrah Rouge",
        winePairingAr: "مشروب الزنجبيل الحار والليمون",
        image: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=600&auto=format&fit=crop&q=80",
        specialEffect: "steak",
        floatingIngredients: ["Romarin", "Sel fumé", "Ail"]
      }
    ]
  },
  {
    id: "moroccan",
    titleFr: "Moroccan Prestige",
    titleAr: "الأطباق المغربية العريقة",
    subtitleFr: "L'excellence culinaire de l'Empire Chérifien",
    subtitleAr: "قمة الفنون والتقاليد الطهوية للمملكة المغربية",
    image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=600&auto=format&fit=crop&q=80",
    dishes: [
      {
        id: "moroccan-1",
        nameFr: "Tajine d'Agneau d'Or aux Pruneaux",
        nameAr: "طاجين الغنم الذهبي بالبرقوق",
        descriptionFr: "Souris d'agneau confite 7 heures, pruneaux farcis d'amandes grillées et nappés d'or alimentaire.",
        descriptionAr: "موزات الغنم المطهوة ببطء لمدة 7 ساعات، برقوق محشو باللوز المحمص المغلف ببرق الذهب القابل للأكل.",
        price: 175,
        ingredientsFr: "Agneau du Haut Atlas, pruneaux farcis, sésame, miel d'argan, safran pur",
        ingredientsAr: "لحم غنم الأطلس، برقوق محشو، سمسم، عسل الأركان، زعفران حر",
        calories: 590,
        isChefChoice: true,
        winePairingFr: "Médaillon Rouge Réserve",
        winePairingAr: "أتاي مغربي ملكي بالزعفران الحر والنعناع",
        image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=600&auto=format&fit=crop&q=80",
        specialEffect: "general",
        floatingIngredients: ["Safran", "Amandes", "Or"]
      },
      {
        id: "moroccan-2",
        nameFr: "Pastilla Impériale aux Amandes",
        nameAr: "البسطيلة الإمبراطورية بالدجاج واللوز",
        descriptionFr: "Feuilleté traditionnel croustillant garni de poulet fermier émincé, cannelle de Ceylan, amandes torréfiées et eau de fleur d'oranger.",
        descriptionAr: "ورقة البسطيلة المقرمشة محشوة بالدجاج البلدي، القرفة السيلانية، اللوز المحمص وقطرات من ماء زهر البرتقال العتيق.",
        price: 145,
        ingredientsFr: "Poulet fermier, cannelle, amandes mondées, sucre glace, fleur d'oranger",
        ingredientsAr: "دجاج بلدي، قرفة، لوز محمص، سكر ناعم، ماء زهر",
        calories: 540,
        isChefChoice: false,
        winePairingFr: "Chardonnay du Val d'Argan",
        winePairingAr: "عصير اللوز التقليدي المبرد بماء الزهر",
        image: "https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?w=600&auto=format&fit=crop&q=80",
        specialEffect: "general",
        floatingIngredients: ["Cannelle", "Amandes", "Fleur d'oranger"]
      }
    ]
  },
  {
    id: "desserts",
    titleFr: "Douceurs de l'Éden",
    titleAr: "حلاوة الجنة والحلويات",
    subtitleFr: "Finalités sucrées haute couture",
    subtitleAr: "نهاية حلوة تليق بأذواقكم الرفيعة",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&auto=format&fit=crop&q=80",
    dishes: [
      {
        id: "dessert-1",
        nameFr: "Mille-Feuille à la Vanille de Bourbon",
        nameAr: "ميل فوي بفانيليا البوربون",
        descriptionFr: "Feuilletage caramélisé croustillant, crème légère à la vanille Bourbon de Madagascar et caramel fleur de sel.",
        descriptionAr: "عجينة مقرمشة ومكرملة، محشوة بكريمة خفيفة بفانيليا بوربون مدغشقر والكراميل بملح البحر.",
        price: 65,
        ingredientsFr: "Pâte feuilletée, gousse de vanille Madagascar, caramel au beurre salé",
        ingredientsAr: "عجينة الميل فوي، فانيليا مدغشقر، كراميل بالزبدة المملحة",
        calories: 380,
        isChefChoice: true,
        winePairingFr: "Champagne Laurent-Perrier Rosé",
        winePairingAr: "قهوة إكسبريسو ريان بالذهب",
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&auto=format&fit=crop&q=80",
        specialEffect: "dessert",
        floatingIngredients: ["Or fin", "Vanille", "Caramel"]
      },
      {
        id: "dessert-2",
        nameFr: "Soufflé au Chocolat Noir Intense",
        nameAr: "سوفليه الشوكولاتة الداكنة المركزة",
        descriptionFr: "Cœur coulant de chocolat Valrhona Guanaja 70%, accompagné d'une boule de gelato vanille de Madagascar.",
        descriptionAr: "قلب دافئ سائل من شوكولاتة فالرونا غواناجا 70٪، يقدم مع كرة من جيلاتو الفانيليا المنزلية.",
        price: 75,
        ingredientsFr: "Chocolat Valrhona 70%, beurre bio, œufs de ferme, gelato vanille",
        ingredientsAr: "شوكولاتة فالرونا، زبدة طبيعية، بيض بلدي، جيلاتو فانيليا",
        calories: 420,
        isChefChoice: false,
        winePairingFr: "Maury Vintage Rouge",
        winePairingAr: "شاي أسود ملكي بالهيل والقرنفل",
        image: "https://images.unsplash.com/photo-1579372786545-d24232daf58c?w=600&auto=format&fit=crop&q=80",
        specialEffect: "dessert",
        floatingIngredients: ["Chocolat", "Cacao", "Pétales"]
      }
    ]
  },
  {
    id: "drinks",
    titleFr: "Nectars & Élixirs",
    titleAr: "مشروبات وإكسيرات النخبة",
    subtitleFr: "Breuvages précieux aux accords subtils",
    subtitleAr: "مشروبات ثمينة منتقاة ومنعشة للأعصاب",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80",
    dishes: [
      {
        id: "drink-1",
        nameFr: "L'Élixir de l'Atlas aux Éclats d'Or",
        nameAr: "إكسير الأطلس ببرق الذهب",
        descriptionFr: "Un mocktail somptueux associant nectar de pêche blanche, eau de rose de Kelaat M'gouna, eau gazeuse fine et paillettes d'or 24k.",
        descriptionAr: "كوكتيل ملكي منعش يجمع بين نكتار الخوخ الأبيض، ماء ورد قلعة مكونة، مياه غازية ناعمة ورقائق ذهب عيار 24 قيراط.",
        price: 55,
        ingredientsFr: "Nectar de pêche, eau de rose, or 24k, eau pétillante, citron vert",
        ingredientsAr: "نكتار خوخ، ماء ورد، ذهب 24، مياه غازية، ليمون",
        calories: 120,
        isChefChoice: true,
        winePairingFr: "Accompagnement de canapés",
        winePairingAr: "يقدم كفاتح للشهية مع الوجبات الفاخرة",
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80",
        specialEffect: "drinks",
        floatingIngredients: ["Paillettes d'or", "Pêche", "Rose"]
      },
      {
        id: "drink-2",
        nameFr: "Thé de l'Empereur au Safran",
        nameAr: "الشاي الإمبراطوري بالزعفران الحر",
        descriptionFr: "Thé vert royal infusé aux filaments de safran pur de Taliouine, menthe fraîche cueillie à la main et zestes d'orange.",
        descriptionAr: "شاي أخضر ملكي منقوع بخيوط الزعفران الحر، أوراق النعناع الطازجة المنتقاة وقشور البرتقال العطرة.",
        price: 35,
        ingredientsFr: "Thé vert impérial, filaments safran pur, menthe fraîche, orange",
        ingredientsAr: "شاي أخضر، خيوط زعفران حر، نعناع بلدي، برتقال",
        calories: 45,
        isChefChoice: false,
        winePairingFr: "Parfait pour clore le repas",
        winePairingAr: "يختم به الوجبات المغربية التقليدية",
        image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80",
        specialEffect: "drinks",
        floatingIngredients: ["Safran", "Menthe", "Orange"]
      }
    ]
  }
];
