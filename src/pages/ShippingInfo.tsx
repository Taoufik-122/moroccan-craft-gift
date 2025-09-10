import React, { useState } from "react";
import { Truck, Globe, Clock, MapPin, DollarSign, RefreshCcw } from "lucide-react";

export default function ShippingInfo() {
  const [lang, setLang] = useState<"ar" | "en" | "fr">("ar");

  const content = {
    title: {
      ar: "معلومات الشحن",
      en: "Shipping Information",
      fr: "Informations sur la Livraison",
    },
    description: {
      ar: [
        { icon: Truck, text: "نحن نقدم خدمات شحن داخل المغرب وخارجه لضمان وصول منتجاتنا إليك بأمان وفي الوقت المحدد." },
        { icon: MapPin, text: "الشحن داخل المغرب: يتم الشحن إلى جميع المدن المغربية، مع خدمة التوصيل السريع للطلبات التي تزيد عن 700 درهم." },
        { icon: Globe, text: "الشحن الدولي: نوفر شحنًا دوليًا إلى بعض الدول المختارة بناءً على الطلب، مع تكلفة إضافية." },
        { icon: Clock, text: "مدة التوصيل: عادةً بين 3 إلى 7 أيام عمل داخل المغرب، ومن 7 إلى 14 يومًا للشحن الدولي." },
        { icon: DollarSign, text: "تكاليف الشحن: الشحن مجاني للطلبات التي تتجاوز 700 درهم داخل المغرب، ويتم احتساب رسوم للشحن الدولي حسب الوزن والمسافة." },
        { icon: RefreshCcw, text: "سياسة الإرجاع والشحن: في حالة وجود أي مشكلة في الشحن أو تلف المنتج، يرجى التواصل معنا فورًا لحل المشكلة." },
      ],
      en: [
        { icon: Truck, text: "We offer shipping services within Morocco and internationally to ensure your products arrive safely and on time." },
        { icon: MapPin, text: "Domestic Shipping: We ship to all Moroccan cities, with express delivery for orders over 700 MAD." },
        { icon: Globe, text: "International Shipping: Available to selected countries upon request, with additional fees." },
        { icon: Clock, text: "Delivery Time: Usually between 3 to 7 business days domestically, and 7 to 14 days internationally." },
        { icon: DollarSign, text: "Shipping Costs: Free shipping for orders over 700 MAD within Morocco; international shipping fees depend on weight and distance." },
        { icon: RefreshCcw, text: "Return and Shipping Policy: If there are any shipping issues or damaged products, please contact us immediately for resolution." },
      ],
      fr: [
        { icon: Truck, text: "Nous offrons des services de livraison au Maroc et à l'international pour garantir que vos produits arrivent en toute sécurité et à temps." },
        { icon: MapPin, text: "Livraison nationale : Nous livrons dans toutes les villes marocaines, avec une livraison express pour les commandes de plus de 700 MAD." },
        { icon: Globe, text: "Livraison internationale : Disponible dans certains pays sur demande, avec frais supplémentaires." },
        { icon: Clock, text: "Délai de livraison : Généralement entre 3 à 7 jours ouvrables au Maroc, et de 7 à 14 jours à l'international." },
        { icon: DollarSign, text: "Coûts de livraison : Livraison gratuite pour les commandes de plus de 700 MAD au Maroc ; les frais de livraison internationaux dépendent du poids et de la distance." },
        { icon: RefreshCcw, text: "Politique de retour et livraison : En cas de problème de livraison ou de produit endommagé, veuillez nous contacter immédiatement pour résolution." },
      ],
    },
  };

  return (
<div className="max-w-3xl mx-auto mt-16 py-24 px-6 bg-white rounded-xl shadow-lg">
      {/* Language Selector */}
      <div className="flex justify-center gap-6 mb-10">
        {["ar", "en", "fr"].map((lng) => (
          <button
            key={lng}
            onClick={() => setLang(lng as "ar" | "en" | "fr")}
            className={`px-5 py-2 rounded-full font-semibold transition 
              ${
                lang === lng
                  ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }`}
          >
            {lng === "ar" ? "العربية" : lng === "en" ? "English" : "Français"}
          </button>
        ))}
      </div>

      <h1 className="text-4xl font-extrabold text-center text-primary mb-10 select-none">
        {content.title[lang]}
      </h1>

      <ul className="space-y-6 text-lg text-gray-700 leading-relaxed">
        {content.description[lang].map(({ icon: Icon, text }, index) => (
          <li key={index} className="flex items-start space-x-4 rtl:space-x-reverse">
            <Icon className="text-primary mt-1 h-6 w-6 flex-shrink-0" />
            <p>{text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
