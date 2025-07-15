import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'fr' | 'ar';

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