import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = "en" | "fr" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}


const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.products': 'All Products',
    'nav.cities': 'Cities',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.cart': 'Cart',
    'nav.checkout': 'Checkout',
    'nav.faq': 'FAQ',
    'nav.terms': 'Terms & Policies',
    'nav.offers': 'Offers',
    
    // Common
    'common.loading': 'Loading...',
    'common.addToCart': 'Add to Cart',
    'common.viewAll': 'View All',
    'common.search': 'Search',
    'common.price': 'Price',
    'common.quantity': 'Quantity',
    'common.total': 'Total',
    'common.subtotal': 'Subtotal',
    'common.shipping': 'Shipping',
    'common.tax': 'Tax',
    
    // Home Page
    'home.hero.title': 'Discover Traditional Morocco in Every Product',
    'home.hero.subtitle': 'Explore our curated collection of authentic handmade products from Morocco\'s most renowned artisan cities.',
    'home.cities.title': 'Shop by Moroccan Cities',
    'home.featured.title': 'Handpicked Products',
    
    // Cities
    'city.fez': 'Fez',
    'city.marrakech': 'Marrakech',
    'city.rabat': 'Rabat',
    'city.tetouan': 'Tetouan',
    'city.meknes': 'Meknes',
    'city.casablanca': 'Casablanca',
    
    // Categories
    'category.copperware': 'Copperware',
    'category.leather': 'Leather Goods',
    'category.carpets': 'Carpets',
    'category.embroidery': 'Embroidery',
    'category.pottery': 'Pottery',
    'category.mosaics': 'Mosaics',
    
    // Cart
    'cart.title': 'Shopping Cart',
    'cart.empty': 'Your cart is empty',
    'cart.continueshopping': 'Continue Shopping',
    'cart.proceedToCheckout': 'Proceed to Checkout',
    'cart.remove': 'Remove',
    
    // Checkout
    'checkout.title': 'Checkout',
    'checkout.billing': 'Billing Information',
    'checkout.shipping': 'Shipping Information',
    'checkout.payment': 'Payment Method',
    'checkout.placeOrder': 'Place Order',
    
    // Forms
    'form.firstName': 'First Name',
    'form.lastName': 'Last Name',
    'form.email': 'Email',
    'form.phone': 'Phone',
    'form.address': 'Address',
    'form.city': 'City',
    'form.postalCode': 'Postal Code',
    'form.country': 'Country',
    //SUPPORT
  // ... باقي الترجمات,
"faq.question1": "Are the products genuinely Moroccan?",
"faq.answer1": "Yes, all our products are handmade by skilled Moroccan artisans.",

"faq.question2": "Can the product be customized in a specific color?",
"faq.answer2": "Yes, some products like poufs and candles can be customized by color or size upon request.",

"faq.question3": "How long does it take to prepare made-to-order products?",
"faq.answer3": "3 to 7 working days depending on the order type and design complexity.",

"faq.question4": "Is shipping free?",
"faq.answer4": "Shipping is free for orders over 700 MAD within Morocco. Otherwise, fees apply based on the city.",

"faq.question5": "What payment methods are available?",
"faq.answer5": "Cash on delivery, bank transfer, or online payment (PayPal or card).",

"faq.question6": "Can I track my order?",
"faq.answer6": "Yes, we send you a tracking number via WhatsApp or email after shipping.",

"faq.question7": "What is the return policy?",
"faq.answer7": "You can return the product within 7 days if unused and in original condition. Some customized products are non-returnable.",

"faq.question8": "Do you offer gift wrapping?",
"faq.answer8": "Yes, you can request special gift wrapping with an option to add a personal message at checkout.",

"faq.question9": "Can I order wholesale?",
"faq.answer9": "Yes, we offer wholesale orders for hotels, shops, and distributors. Please contact us via the contact page.",

"faq.question10": "Who makes the products sold in the store?",
"faq.answer10": "All products are handmade by Moroccan artisans from regions like Fez, Marrakech, and Essaouira.",

"faq.question11": "Are the products always available or made to order?",
"faq.answer11": "Some products are ready stock, others are made to order for quality and uniqueness.",

"faq.question12": "Are the materials used natural?",
"faq.answer12": "We use natural leather, traditional clay, plant-based wax, and locally sourced wood in most products.",

"faq.question13": "Is the tagine usable for cooking?",
"faq.answer13": "Yes, our tagines are authentic and suitable for direct cooking after oil treatment.",

"faq.question14": "How do I care for the products after purchase?",
"faq.answer14": "Care instructions come with each product. For example, soak the tagine before first use, and gently sweep rugs without water.",

"faq.question15": "Can a product be replaced if it arrives damaged?",
"faq.answer15": "Yes, we replace the product immediately if damaged upon receipt after photo verification within 24 hours.",

"faq.question16": "Which cities do you ship to?",
"faq.answer16": "We ship to all Moroccan cities and offer international shipping to some countries upon request.",

"faq.question17": "Do you offer discounts for bulk purchases?",
"faq.answer17": "Yes, we offer discounts for orders of more than 3 pieces or family/hotel orders.",

"faq.question18": "Can I choose the type of packaging?",
"faq.answer18": "Yes, we offer different types of traditional or modern packaging as you prefer.",

"faq.question19": "Are the candles made from natural wax?",
"faq.answer19": "Yes, candles are made from soy wax or Moroccan beeswax with natural essential oils.",

"faq.question20": "Do you offer gift cards?",
"faq.answer20": "Yes, you can request a digital or printed gift card with any order.",

"faq.question21": "What is the difference between traditional and modern poufs?",
"faq.answer21": "Traditional poufs are made of natural leather and hand-stitched; modern ones may use synthetic fabrics or trendy colors.",

"faq.question22": "Do you offer exclusive products for special occasions?",
"faq.answer22": "Yes, we provide limited designs for Ramadan, weddings, and seasonal gifts.",

"faq.question23": "Can I send the order as a gift directly to someone else?",
"faq.answer23": "Yes, you can enter the recipient's address and mark the order as a gift with wrapping and a personal message.",

"faq.question24": "Can I track my order via phone?",
"faq.answer24": "Yes, you can contact us via WhatsApp and get delivery updates anytime.",

"faq.question25": "Can you send product photos before shipping?",
"faq.answer25": "Certainly, we send photos of the final product before shipping for final confirmation.",

"faq.question26": "What is the shelf life of candles or oils?",
"faq.answer26": "Candles last 6 to 12 months depending on storage; oils remain effective for about one year.",

"faq.question27": "Can I return a product because I don't like its appearance?",
"faq.answer27": "Yes, provided it is unused and returned within 7 days of receipt. Return shipping costs are borne by the customer.",

"faq.question28": "Are the products photographed as they really are?",
"faq.answer28": "We strive for realistic photos, but colors may vary slightly due to lighting or screen settings.",

"faq.question29": "Can I visit the workshop or production site?",
"faq.answer29": "Currently, we do not offer visits, but we share videos and photos of the production process on our website and social media.",

 "support.shippingTitle": "Shipping Information",
"support.shippingContent": "We offer shipping services within Morocco and internationally to ensure your products arrive safely and on time.",
"support.shippingContent1": "Domestic Shipping: We deliver to all Moroccan cities, with express delivery for orders .",
"support.shippingContent2": "International Shipping: We provide international shipping to selected countries upon request, with an additional fee.",
"support.shippingContent3": "Delivery Time: Usually between 3 to 7 business days within Morocco, and 7 to 14 days for international shipping.",
"support.shippingContent4": "Shipping Costs: Free shipping for orders over $500  within Morocco. International shipping fees are calculated based on weight and distance.",
"support.shippingContent5": "Return & Shipping Policy: If there is any issue with shipping or a damaged item, please contact us immediately to resolve the problem.",

  "support.returnsTitle": "Returns",
  "support.returnsContent": "We accept returns within 14 days of delivery. Items must be unused, in original condition and packaging. Please contact us before sending your product back.",

  "support.sizeTitle": "Size Guide",
  "support.sizeContent": "Please refer to our size chart for each product before placing an order.",

  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.products': 'Tous les Produits',
    'nav.cities': 'Villes',
    'nav.about': 'À Propos',
    'nav.contact': 'Contact',
    'nav.cart': 'Panier',
    'nav.checkout': 'Commande',
    'nav.faq': 'FAQ',
    'nav.terms': 'Conditions',
    'nav.offers': 'Offres',
    
    // Common
    'common.loading': 'Chargement...',
    'common.addToCart': 'Ajouter au Panier',
    'common.viewAll': 'Voir Tout',
    'common.search': 'Rechercher',
    'common.price': 'Prix',
    'common.quantity': 'Quantité',
    'common.total': 'Total',
    'common.subtotal': 'Sous-total',
    'common.shipping': 'Livraison',
    'common.tax': 'Taxe',
    
    // Home Page
    'home.hero.title': 'Découvrez le Maroc Traditionnel dans Chaque Produit',
    'home.hero.subtitle': 'Explorez notre collection de produits artisanaux authentiques des villes artisanales les plus renommées du Maroc.',
    'home.cities.title': 'Acheter par Villes Marocaines',
    'home.featured.title': 'Produits Sélectionnés',
    
    // Cities
    'city.fez': 'Fès',
    'city.marrakech': 'Marrakech',
    'city.rabat': 'Rabat',
    'city.tetouan': 'Tétouan',
    'city.meknes': 'Meknès',
    'city.casablanca': 'Casablanca',
    
    // Categories
    'category.copperware': 'Cuivrerie',
    'category.leather': 'Maroquinerie',
    'category.carpets': 'Tapis',
    'category.embroidery': 'Broderie',
    'category.pottery': 'Poterie',
    'category.mosaics': 'Mosaïques',
    
    // Cart
    'cart.title': 'Panier',
    'cart.empty': 'Votre panier est vide',
    'cart.continueShopping': 'Continuer les Achats',
    'cart.proceedToCheckout': 'Procéder à la Commande',
    'cart.remove': 'Supprimer',
    
    // Checkout
    'checkout.title': 'Commande',
    'checkout.billing': 'Informations de Facturation',
    'checkout.shipping': 'Informations de Livraison',
    'checkout.payment': 'Mode de Paiement',
    'checkout.placeOrder': 'Passer la Commande',
    
    // Forms
    'form.firstName': 'Prénom',
    'form.lastName': 'Nom',
    'form.email': 'Email',
    'form.phone': 'Téléphone',
    'form.address': 'Adresse',
    'form.city': 'Ville',
    'form.postalCode': 'Code Postal',
    'form.country': 'Pays',
    //SUPPORT
     // ... باقي الترجمات
 "faq.question1": "Les produits sont-ils authentiquement marocains ?",
"faq.answer1": "Oui, tous nos produits sont fabriqués à la main par des artisans marocains qualifiés.",

"faq.question2": "Le produit peut-il être personnalisé dans une couleur spécifique ?",
"faq.answer2": "Oui, certains produits comme les poufs et les bougies peuvent être personnalisés selon la couleur ou la taille sur demande.",

"faq.question3": "Combien de temps faut-il pour préparer les produits sur commande ?",
"faq.answer3": "De 3 à 7 jours ouvrables selon le type de commande et la complexité du design.",

"faq.question4": "La livraison est-elle gratuite ?",
"faq.answer4": "La livraison est gratuite pour les commandes supérieures à 700 MAD au Maroc. Sinon, des frais s'appliquent selon la ville.",

"faq.question5": "Quels sont les modes de paiement disponibles ?",
"faq.answer5": "Paiement à la livraison, virement bancaire ou paiement en ligne (PayPal ou carte).",

"faq.question6": "Puis-je suivre ma commande ?",
"faq.answer6": "Oui, nous vous envoyons un numéro de suivi via WhatsApp ou email après l'expédition.",

"faq.question7": "Quelle est la politique de retour ?",
"faq.answer7": "Vous pouvez retourner le produit dans les 7 jours s'il n'est pas utilisé et en état d'origine. Certains produits personnalisés ne sont pas remboursables.",

"faq.question8": "Proposez-vous un emballage cadeau ?",
"faq.answer8": "Oui, vous pouvez demander un emballage cadeau spécial avec possibilité d'ajouter un message personnel lors du paiement.",

"faq.question9": "Puis-je commander en gros ?",
"faq.answer9": "Oui, nous proposons des commandes en gros pour les hôtels, magasins et distributeurs. Veuillez nous contacter via la page contact.",

"faq.question10": "Qui fabrique les produits vendus en magasin ?",
"faq.answer10": "Tous les produits sont fabriqués à la main par des artisans marocains de régions telles que Fès, Marrakech et Essaouira.",

"faq.question11": "Les produits sont-ils toujours disponibles ou fabriqués sur commande ?",
"faq.answer11": "Certains produits sont en stock prêt, d'autres sont fabriqués sur commande pour garantir la qualité et l'unicité.",

"faq.question12": "Les matériaux utilisés sont-ils naturels ?",
"faq.answer12": "Nous utilisons du cuir naturel, de l'argile traditionnelle, de la cire végétale et du bois local dans la plupart des produits.",

"faq.question13": "Le tajine est-il utilisable pour la cuisson ?",
"faq.answer13": "Oui, nos tajines sont authentiques et adaptés à la cuisson directe après traitement à l'huile.",

"faq.question14": "Comment entretenir les produits après achat ?",
"faq.answer14": "Des instructions d'entretien sont fournies avec chaque produit. Par exemple, trempez le tajine avant la première utilisation, et balayez doucement les tapis sans eau.",

"faq.question15": "Un produit peut-il être remplacé s'il arrive endommagé ?",
"faq.answer15": "Oui, nous remplaçons le produit immédiatement s'il est endommagé à la réception après vérification des photos dans les 24 heures.",

"faq.question16": "Vers quelles villes expédiez-vous ?",
"faq.answer16": "Nous expédions vers toutes les villes marocaines et proposons une livraison internationale pour certains pays sur demande.",

"faq.question17": "Proposez-vous des remises pour les achats en gros ?",
"faq.answer17": "Oui, nous offrons des remises pour les commandes de plus de 3 pièces ou les commandes familiales/hôtelières.",

"faq.question18": "Puis-je choisir le type d'emballage ?",
"faq.answer18": "Oui, nous proposons différents types d'emballages traditionnels ou modernes selon votre préférence.",

"faq.question19": "Les bougies sont-elles fabriquées à partir de cire naturelle ?",
"faq.answer19": "Oui, les bougies sont fabriquées à partir de cire de soja ou de cire d'abeille marocaine avec des huiles essentielles naturelles.",

"faq.question20": "Proposez-vous des cartes-cadeaux ?",
"faq.answer20": "Oui, vous pouvez demander une carte-cadeau numérique ou imprimée avec toute commande.",

"faq.question21": "Quelle est la différence entre les poufs traditionnels et modernes ?",
"faq.answer21": "Les poufs traditionnels sont en cuir naturel cousu à la main ; les modernes peuvent être en tissu synthétique ou aux couleurs plus modernes.",

"faq.question22": "Proposez-vous des produits exclusifs pour des occasions spéciales ?",
"faq.answer22": "Oui, nous proposons des designs limités pour le Ramadan, les mariages et les cadeaux saisonniers.",

"faq.question23": "Puis-je envoyer la commande en cadeau directement à quelqu'un d'autre ?",
"faq.answer23": "Oui, vous pouvez saisir l'adresse du destinataire et marquer la commande comme cadeau avec emballage et message personnel.",

"faq.question24": "Puis-je suivre ma commande par téléphone ?",
"faq.answer24": "Oui, vous pouvez nous contacter via WhatsApp et recevoir des mises à jour sur la livraison à tout moment.",

"faq.question25": "Pouvez-vous envoyer des photos du produit avant l'expédition ?",
"faq.answer25": "Certainement, nous envoyons des photos du produit final avant l'expédition pour confirmation finale.",

"faq.question26": "Quelle est la durée de conservation des bougies ou huiles ?",
"faq.answer26": "Les bougies durent de 6 à 12 mois selon le stockage ; les huiles restent efficaces environ un an.",

"faq.question27": "Puis-je retourner un produit parce que je n'aime pas son apparence ?",
"faq.answer27": "Oui, à condition qu'il ne soit pas utilisé et retourné dans les 7 jours suivant la réception. Les frais de retour sont à la charge du client.",

"faq.question28": "Les produits sont-ils photographiés tels qu'ils sont réellement ?",
"faq.answer28": "Nous nous efforçons d'avoir des photos réalistes, mais les couleurs peuvent légèrement varier selon l'éclairage ou l'écran.",

"faq.question29": "Puis-je visiter l'atelier ou le site de production ?",
"faq.answer29": "Actuellement, nous n'offrons pas de visites, mais nous partageons des vidéos et photos du processus de fabrication sur notre site et réseaux sociaux.",

 "support.shippingTitle": "Informations sur la livraison",
"support.shippingContent": "Nous proposons des services de livraison au Maroc et à l’international pour garantir que vos produits arrivent en toute sécurité et dans les délais.",
"support.shippingContent1": "Livraison au Maroc : Livraison dans toutes les villes marocaines, avec un service express pour les commandes supérieures .",
"support.shippingContent2": "Livraison internationale : Disponible pour certains pays sur demande, avec des frais supplémentaires.",
"support.shippingContent3": "Délais de livraison : Généralement entre 3 et 7 jours ouvrables au Maroc, et entre 7 et 14 jours pour l’international.",
"support.shippingContent4": "Frais de livraison : Livraison gratuite pour les commandes supérieures à $500 au Maroc. Les frais de livraison internationale sont calculés selon le poids et la distance.",
"support.shippingContent5": "Politique de retour et de livraison : En cas de problème de livraison ou de produit endommagé, veuillez nous contacter immédiatement pour résoudre le problème.",

  "support.returnsTitle": "Retours",
  "support.returnsContent": "Les retours sont acceptés dans un délai de 14 jours après la livraison. Les articles doivent être inutilisés et dans leur emballage d’origine. Veuillez nous contacter avant tout renvoi.",

  "support.sizeTitle": "Guide des tailles",
  "support.sizeContent": "Veuillez consulter notre tableau des tailles avant de commander.",

  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.products': 'جميع المنتجات',
    'nav.cities': 'المدن',
    'nav.about': 'من نحن',
    'nav.contact': 'اتصل بنا',
    'nav.cart': 'السلة',
    'nav.checkout': 'الدفع',
    'nav.faq': 'الأسئلة الشائعة',
    'nav.terms': 'الشروط والأحكام',
    'nav.offers': 'العروض',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.addToCart': 'أضف إلى السلة',
    'common.viewAll': 'عرض الكل',
    'common.search': 'بحث',
    'common.price': 'السعر',
    'common.quantity': 'الكمية',
    'common.total': 'المجموع',
    'common.subtotal': 'المجموع الفرعي',
    'common.shipping': 'الشحن',
    'common.tax': 'الضريبة',
    
    // Home Page
    'home.hero.title': 'اكتشف المغرب التقليدي في كل منتج',
    'home.hero.subtitle': 'استكشف مجموعتنا المختارة من المنتجات اليدوية الأصيلة من أشهر المدن الحرفية في المغرب.',
    'home.cities.title': 'تسوق حسب المدن المغربية',
    'home.featured.title': 'منتجات مختارة',
    
    // Cities
    'city.fez': 'فاس',
    'city.marrakech': 'مراكش',
    'city.rabat': 'الرباط',
    'city.tetouan': 'تطوان',
    'city.meknes': 'مكناس',
    'city.casablanca': 'الدار البيضاء',
    
    // Categories
    'category.copperware': 'النحاسيات',
    'category.leather': 'الجلديات',
    'category.carpets': 'السجاد',
    'category.embroidery': 'التطريز',
    'category.pottery': 'الفخار',
    'category.mosaics': 'الفسيفساء',
    
    // Cart
    'cart.title': 'سلة التسوق',
    'cart.empty': 'سلتك فارغة',
    'cart.continueShopping': 'متابعة التسوق',
    'cart.proceedToCheckout': 'متابعة إلى الدفع',
    'cart.remove': 'حذف',
    
    // Checkout
    'checkout.title': 'الدفع',
    'checkout.billing': 'معلومات الفوترة',
    'checkout.shipping': 'معلومات الشحن',
    'checkout.payment': 'طريقة الدفع',
    'checkout.placeOrder': 'تأكيد الطلب',
    
    // Forms
    'form.firstName': 'الاسم الأول',
    'form.lastName': 'اسم العائلة',
    'form.email': 'البريد الإلكتروني',
    'form.phone': 'الهاتف',
    'form.address': 'العنوان',
    'form.city': 'المدينة',
    'form.postalCode': 'الرمز البريدي',
    'form.country': 'البلد',
    // ... SUPPORT
"faq.question1": "هل المنتجات مغربية أصلية؟",
"faq.answer1": "نعم، جميع منتجاتنا مصنوعة يدويًا من طرف حرفيين مغاربة بخبرة عالية في الصناعة التقليدية.",

"faq.question2": "هل يمكن تخصيص المنتج بلون معين؟",
"faq.answer2": "نعم، بعض المنتجات مثل البوفات والشموع يمكن تخصيصها حسب اللون أو الحجم عند الطلب.",

"faq.question3": "كم يستغرق تحضير المنتجات المصنوعة حسب الطلب؟",
"faq.answer3": "من 3 إلى 7 أيام عمل حسب نوع الطلب وتعقيد التصميم.",

"faq.question4": "هل الشحن مجاني؟",
"faq.answer4": "الشحن مجاني للطلبات التي تفوق 700 درهم داخل المغرب. ما دون ذلك يتم احتساب رسوم حسب المدينة.",

"faq.question5": "ما هي طرق الدفع المتوفرة؟",
"faq.answer5": "الدفع عند الاستلام، التحويل البنكي، أو الدفع الإلكتروني (PayPal أو بطاقة بنكية).",

"faq.question6": "هل يمكنني تتبع طلبي؟",
"faq.answer6": "نعم، بعد الشحن نرسل لك رقم التتبع عبر WhatsApp أو البريد الإلكتروني.",

"faq.question7": "ما سياسة الإرجاع؟",
"faq.answer7": "يمكنك إرجاع المنتج خلال 7 أيام إذا لم يتم استخدامه وكان بحالته الأصلية. بعض المنتجات المخصصة لا تُرجع.",

"faq.question8": "هل تقدمون تغليف للهدايا؟",
"faq.answer8": "نعم، يمكنك طلب تغليف مميز للهدايا عند إنهاء الطلب مع إمكانية إضافة رسالة شخصية.",

"faq.question9": "هل يمكنني طلب بالجملة؟",
"faq.answer9": "نعم، نحن نوفر الطلبات بالجملة للفنادق، المتاجر، والموزعين. المرجو التواصل معنا عبر صفحة الاتصال.",

"faq.question10": "من يصنع المنتجات المعروضة في المتجر؟",
"faq.answer10": "جميع المنتجات تُصنع يدويًا من طرف حرفيين مغاربة من مناطق مختلفة مثل فاس، مراكش، والصويرة.",

"faq.question11": "هل المنتجات متوفرة دائمًا أم تُصنع حسب الطلب؟",
"faq.answer11": "بعض المنتجات جاهزة ومخزنة، وأخرى تُحضَّر حسب الطلب لضمان الجودة والتفرد.",

"faq.question12": "هل المواد المستعملة طبيعية؟",
"faq.answer12": "نستخدم جلود طبيعية، طين تقليدي، شمع نباتي، وخشب مستخرج محليًا في أغلب المنتجات.",

"faq.question13": "هل الطاجين قابل للاستعمال في الطبخ؟",
"faq.answer13": "نعم، طواجيننا أصلية ومخصصة للطبخ على النار مباشرة بعد المعالجة بالزيت.",

"faq.question14": "كيف أعتني بالمنتجات بعد الشراء؟",
"faq.answer14": "نوفر تعليمات العناية مع كل منتج. مثلاً الطاجين يُنقع قبل أول استخدام، والزربية تُكنس بلطف دون ماء.",

"faq.question15": "هل يمكن استبدال منتج إذا وصل تالفاً؟",
"faq.answer15": "نعم، نُعوض المنتج فورًا إذا وصلك تالفاً بعد التحقق من الصور في أول 24 ساعة.",

"faq.question16": "ما هي المدن التي يتم الشحن إليها؟",
"faq.answer16": "نشحن لجميع المدن المغربية، كما نوفر شحنًا دوليًا لبعض الدول عند الطلب.",

"faq.question17": "هل تقدمون خصومات عند شراء أكثر من قطعة؟",
"faq.answer17": "نعم، نقدم خصومات على الطلبات التي تتضمن أكثر من 3 قطع أو للطلبات العائلية/الفندقية.",

"faq.question18": "هل يمكنني اختيار نوع التغليف؟",
"faq.answer18": "نعم، نقدم أنواعًا مختلفة من التغليف التقليدي أو العصري حسب رغبتك.",

"faq.question19": "هل الشموع مصنوعة من شمع طبيعي؟",
"faq.answer19": "نعم، الشموع تُصنع من شمع الصويا أو شمع النحل المغربي مع زيوت عطرية طبيعية.",

"faq.question20": "هل توفرون بطاقة هدية؟",
"faq.answer20": "نعم، يمكنك طلب بطاقة هدية رقمية أو مطبوعة مع أي طلب.",

"faq.question21": "ما الفرق بين البوف التقليدي والبوف العصري؟",
"faq.answer21": "البوف التقليدي مصنوع من الجلد الطبيعي ويُخاط يدويًا، بينما العصري قد يكون من قماش صناعي أو ألوان أكثر حداثة.",

"faq.question22": "هل تقدمون منتجات حصرية لمناسبات معينة؟",
"faq.answer22": "نعم، نوفر تصاميم محدودة لرمضان، الأعراس، أو الهدايا الموسمية.",

"faq.question23": "هل يمكنني إرسال الطلب كهدية مباشرة إلى شخص آخر؟",
"faq.answer23": "نعم، يمكنك إدخال عنوان المرسل إليه وتحديده كهدية مع تغليف ورسالة شخصية.",

"faq.question24": "هل يمكنني متابعة طلبي عبر الهاتف؟",
"faq.answer24": "نعم، يمكنك التواصل معنا عبر WhatsApp وسنوافيك بتفاصيل التوصيل في أي لحظة.",

"faq.question25": "هل يمكنكم إرسال صور للمنتج قبل الشحن؟",
"faq.answer25": "بالتأكيد، نرسل صور المنتج النهائي قبل الشحن للتأكيد النهائي.",

"faq.question26": "ما هي مدة صلاحية الشموع أو الزيوت؟",
"faq.answer26": "الشموع تدوم من 6 إلى 12 شهرًا حسب التخزين، والزيوت تبقى فعالة لمدة عام تقريبًا.",

"faq.question27": "هل يمكنني إرجاع منتج لأن شكله لا يعجبني؟",
"faq.answer27": "نعم، بشرط أن لا يكون مستعملاً وأن تتم الإعادة خلال 7 أيام من الاستلام. رسوم الإرجاع يتحملها الزبون.",

"faq.question28": "هل المنتجات مصورة كما في الواقع؟",
"faq.answer28": "نحاول أن تكون الصور واقعية تمامًا، لكن بعض الألوان قد تختلف قليلاً حسب الإضاءة أو الشاشة.",

"faq.question29": "هل يمكنني زيارة ورشة العمل أو مكان الإنتاج؟",
"faq.answer29": "حاليًا لا نوفر زيارات، لكن نعرض فيديوهات وصور من عمليات التصنيع على موقعنا وصفحاتنا الاجتماعية.",

  "support.shippingTitle": "معلومات الشحن",
  "support.shippingContent": "نحن نقدم خدمات شحن داخل المغرب وخارجه لضمان وصول منتجاتنا إليك بأمان وفي الوقت المحدد.",
"support.shippingContent1": "الشحن داخل المغرب: يتم الشحن إلى جميع المدن المغربية، مع خدمة التوصيل السريع للطلبات التي تزيد. ",
"support.shippingContent2": "الشحن الدولي: نوفر شحنًا دوليًا إلى بعض الدول المختارة بناءً على الطلب، مع تكلفة إضافية.",
"support.shippingContent3": "مدة التوصيل: عادةً بين 3 إلى 7 أيام عمل داخل المغرب، ومن 7 إلى 14 يومًا للشحن الدولي.",
"support.shippingContent4": "تكاليف الشحن: الشحن مجاني للطلبات التي تتجاوز $500  داخل المغرب، ويتم احتساب رسوم للشحن الدولي حسب الوزن والمسافة.",
"support.shippingContent5": "سياسة الإرجاع والشحن: في حالة وجود أي مشكلة في الشحن أو تلف المنتج، يرجى التواصل معنا فورًا لحل المشكلة.",
  "support.returnsTitle": "الإرجاع",
  "support.returnsContent": "نقبل الإرجاع خلال 14 يومًا من تاريخ التوصيل. يجب أن تكون المنتجات غير مستخدمة وفي حالتها الأصلية مع التغليف الأصلي. يرجى التواصل معنا قبل إرجاع أي منتج.",

  "support.sizeTitle": "دليل المقاسات",
  "support.sizeContent": "يرجى مراجعة جدول المقاسات لكل منتج قبل الطلب.",
  }

};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div className={language === 'ar' ? 'rtl' : 'ltr'} dir={language === 'ar' ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};