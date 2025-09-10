import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const faqs = [
  {
    key: "item-1",
    question: {
      ar: "هل المنتجات مغربية أصلية؟",
      en: "Are the products genuinely Moroccan?",
      fr: "Les produits sont-ils authentiquement marocains ?",
    },
    answer: {
      ar: "نعم، جميع منتجاتنا مصنوعة يدويًا من طرف حرفيين مغاربة بخبرة عالية في الصناعة التقليدية.",
      en: "Yes, all our products are handmade by skilled Moroccan artisans.",
      fr: "Oui, tous nos produits sont fabriqués à la main par des artisans marocains qualifiés.",
    },
  },
  {
    key: "item-2",
    question: {
      ar: "هل يمكن تخصيص المنتج بلون معين؟",
      en: "Can the product be customized in a specific color?",
      fr: "Le produit peut-il être personnalisé dans une couleur spécifique ?",
    },
    answer: {
      ar: "نعم، بعض المنتجات مثل البوفات والشموع يمكن تخصيصها حسب اللون أو الحجم عند الطلب.",
      en: "Yes, some products like poufs and candles can be customized by color or size upon request.",
      fr: "Oui, certains produits comme les poufs et les bougies peuvent être personnalisés selon la couleur ou la taille sur demande.",
    },
  },
  {
    key: "item-3",
    question: {
      ar: "كم يستغرق تحضير المنتجات المصنوعة حسب الطلب؟",
      en: "How long does it take to prepare made-to-order products?",
      fr: "Combien de temps faut-il pour préparer les produits sur commande ?",
    },
    answer: {
      ar: "من 3 إلى 7 أيام عمل حسب نوع الطلب وتعقيد التصميم.",
      en: "3 to 7 working days depending on the order type and design complexity.",
      fr: "De 3 à 7 jours ouvrables selon le type de commande et la complexité du design.",
    },
  },
  {
    key: "item-4",
    question: {
      ar: "هل الشحن مجاني؟",
      en: "Is shipping free?",
      fr: "La livraison est-elle gratuite ?",
    },
    answer: {
      ar: "الشحن مجاني للطلبات التي تفوق 700 درهم داخل المغرب. ما دون ذلك يتم احتساب رسوم حسب المدينة.",
      en: "Shipping is free for orders over 700 MAD within Morocco. Otherwise, fees apply based on the city.",
      fr: "La livraison est gratuite pour les commandes supérieures à 700 MAD au Maroc. Sinon, des frais s'appliquent selon la ville.",
    },
  },
  {
    key: "item-5",
    question: {
      ar: "ما هي طرق الدفع المتوفرة؟",
      en: "What payment methods are available?",
      fr: "Quels sont les modes de paiement disponibles ?",
    },
    answer: {
      ar: "الدفع عند الاستلام، التحويل البنكي، أو الدفع الإلكتروني (PayPal أو بطاقة بنكية).",
      en: "Cash on delivery, bank transfer, or online payment (PayPal or card).",
      fr: "Paiement à la livraison, virement bancaire ou paiement en ligne (PayPal ou carte).",
    },
  },
  {
    key: "item-6",
    question: {
      ar: "هل يمكنني تتبع طلبي؟",
      en: "Can I track my order?",
      fr: "Puis-je suivre ma commande ?",
    },
    answer: {
      ar: "نعم، بعد الشحن نرسل لك رقم التتبع عبر WhatsApp أو البريد الإلكتروني.",
      en: "Yes, we send you a tracking number via WhatsApp or email after shipping.",
      fr: "Oui, nous vous envoyons un numéro de suivi via WhatsApp ou email après l'expédition.",
    },
  },
  {
    key: "item-7",
    question: {
      ar: "ما سياسة الإرجاع؟",
      en: "What is the return policy?",
      fr: "Quelle est la politique de retour ?",
    },
    answer: {
      ar: "يمكنك إرجاع المنتج خلال 7 أيام إذا لم يتم استخدامه وكان بحالته الأصلية. بعض المنتجات المخصصة لا تُرجع.",
      en: "You can return the product within 7 days if unused and in original condition. Some customized products are non-returnable.",
      fr: "Vous pouvez retourner le produit dans les 7 jours s'il n'est pas utilisé et en état d'origine. Certains produits personnalisés ne sont pas remboursables.",
    },
  },
  {
    key: "item-8",
    question: {
      ar: "هل تقدمون تغليف للهدايا؟",
      en: "Do you offer gift wrapping?",
      fr: "Proposez-vous un emballage cadeau ?",
    },
    answer: {
      ar: "نعم، يمكنك طلب تغليف مميز للهدايا عند إنهاء الطلب مع إمكانية إضافة رسالة شخصية.",
      en: "Yes, you can request special gift wrapping with an option to add a personal message at checkout.",
      fr: "Oui, vous pouvez demander un emballage cadeau spécial avec possibilité d'ajouter un message personnel lors du paiement.",
    },
  },
  {
    key: "item-9",
    question: {
      ar: "هل يمكنني طلب بالجملة؟",
      en: "Can I order wholesale?",
      fr: "Puis-je commander en gros ?",
    },
    answer: {
      ar: "نعم، نحن نوفر الطلبات بالجملة للفنادق، المتاجر، والموزعين. المرجو التواصل معنا عبر صفحة الاتصال.",
      en: "Yes, we offer wholesale orders for hotels, shops, and distributors. Please contact us via the contact page.",
      fr: "Oui, nous proposons des commandes en gros pour les hôtels, magasins et distributeurs. Veuillez nous contacter via la page contact.",
    },
  },
  {
    key: "item-10",
    question: {
      ar: "من يصنع المنتجات المعروضة في المتجر؟",
      en: "Who makes the products sold in the store?",
      fr: "Qui fabrique les produits vendus en magasin ?",
    },
    answer: {
      ar: "جميع المنتجات تُصنع يدويًا من طرف حرفيين مغاربة من مناطق مختلفة مثل فاس، مراكش، والصويرة.",
      en: "All products are handmade by Moroccan artisans from regions like Fez, Marrakech, and Essaouira.",
      fr: "Tous les produits sont fabriqués à la main par des artisans marocains de régions telles que Fès, Marrakech et Essaouira.",
    },
  },
  {
    key: "item-11",
    question: {
      ar: "هل المنتجات متوفرة دائمًا أم تُصنع حسب الطلب؟",
      en: "Are the products always available or made to order?",
      fr: "Les produits sont-ils toujours disponibles ou fabriqués sur commande ?",
    },
    answer: {
      ar: "بعض المنتجات جاهزة ومخزنة، وأخرى تُحضَّر حسب الطلب لضمان الجودة والتفرد.",
      en: "Some products are ready stock, others are made to order for quality and uniqueness.",
      fr: "Certains produits sont en stock prêt, d'autres sont fabriqués sur commande pour garantir la qualité et l'unicité.",
    },
  },
  {
    key: "item-12",
    question: {
      ar: "هل المواد المستعملة طبيعية؟",
      en: "Are the materials used natural?",
      fr: "Les matériaux utilisés sont-ils naturels ?",
    },
    answer: {
      ar: "نستخدم جلود طبيعية، طين تقليدي، شمع نباتي، وخشب مستخرج محليًا في أغلب المنتجات.",
      en: "We use natural leather, traditional clay, plant-based wax, and locally sourced wood in most products.",
      fr: "Nous utilisons du cuir naturel, de l'argile traditionnelle, de la cire végétale et du bois local dans la plupart des produits.",
    },
  },
  {
    key: "item-13",
    question: {
      ar: "هل الطاجين قابل للاستعمال في الطبخ؟",
      en: "Is the tagine usable for cooking?",
      fr: "Le tajine est-il utilisable pour la cuisson ?",
    },
    answer: {
      ar: "نعم، طواجيننا أصلية ومخصصة للطبخ على النار مباشرة بعد المعالجة بالزيت.",
      en: "Yes, our tagines are authentic and suitable for direct cooking after oil treatment.",
      fr: "Oui, nos tajines sont authentiques et adaptés à la cuisson directe après traitement à l'huile.",
    },
  },
  {
    key: "item-14",
    question: {
      ar: "كيف أعتني بالمنتجات بعد الشراء؟",
      en: "How do I care for the products after purchase?",
      fr: "Comment entretenir les produits après achat ?",
    },
    answer: {
      ar: "نوفر تعليمات العناية مع كل منتج. مثلاً الطاجين يُنقع قبل أول استخدام، والزربية تُكنس بلطف دون ماء.",
      en: "Care instructions come with each product. For example, soak the tagine before first use, and gently sweep rugs without water.",
      fr: "Des instructions d'entretien sont fournies avec chaque produit. Par exemple, trempez le tajine avant la première utilisation, et balayez doucement les tapis sans eau.",
    },
  },
  {
    key: "item-15",
    question: {
      ar: "هل يمكن استبدال منتج إذا وصل تالفاً؟",
      en: "Can a product be replaced if it arrives damaged?",
      fr: "Un produit peut-il être remplacé s'il arrive endommagé ?",
    },
    answer: {
      ar: "نعم، نُعوض المنتج فورًا إذا وصلك تالفاً بعد التحقق من الصور في أول 24 ساعة.",
      en: "Yes, we replace the product immediately if damaged upon receipt after photo verification within 24 hours.",
      fr: "Oui, nous remplaçons le produit immédiatement s'il est endommagé à la réception après vérification des photos dans les 24 heures.",
    },
  },
  {
    key: "item-16",
    question: {
      ar: "ما هي المدن التي يتم الشحن إليها؟",
      en: "Which cities do you ship to?",
      fr: "Vers quelles villes expédiez-vous ?",
    },
    answer: {
      ar: "نشحن لجميع المدن المغربية، كما نوفر شحنًا دوليًا لبعض الدول عند الطلب.",
      en: "We ship to all Moroccan cities and offer international shipping to some countries upon request.",
      fr: "Nous expédions vers toutes les villes marocaines et proposons une livraison internationale pour certains pays sur demande.",
    },
  },
  {
    key: "item-17",
    question: {
      ar: "هل تقدمون خصومات عند شراء أكثر من قطعة؟",
      en: "Do you offer discounts for bulk purchases?",
      fr: "Proposez-vous des remises pour les achats en gros ?",
    },
    answer: {
      ar: "نعم، نقدم خصومات على الطلبات التي تتضمن أكثر من 3 قطع أو للطلبات العائلية/الفندقية.",
      en: "Yes, we offer discounts for orders of more than 3 pieces or family/hotel orders.",
      fr: "Oui, nous offrons des remises pour les commandes de plus de 3 pièces ou les commandes familiales/hôtelières.",
    },
  },
  {
    key: "item-18",
    question: {
      ar: "هل يمكنني اختيار نوع التغليف؟",
      en: "Can I choose the type of packaging?",
      fr: "Puis-je choisir le type d'emballage ?",
    },
    answer: {
      ar: "نعم، نقدم أنواعًا مختلفة من التغليف التقليدي أو العصري حسب رغبتك.",
      en: "Yes, we offer different types of traditional or modern packaging as you prefer.",
      fr: "Oui, nous proposons différents types d'emballages traditionnels ou modernes selon votre préférence.",
    },
  },
  {
    key: "item-19",
    question: {
      ar: "هل الشموع مصنوعة من شمع طبيعي؟",
      en: "Are the candles made from natural wax?",
      fr: "Les bougies sont-elles fabriquées à partir de cire naturelle ?",
    },
    answer: {
      ar: "نعم، الشموع تُصنع من شمع الصويا أو شمع النحل المغربي مع زيوت عطرية طبيعية.",
      en: "Yes, candles are made from soy wax or Moroccan beeswax with natural essential oils.",
      fr: "Oui, les bougies sont fabriquées à partir de cire de soja ou de cire d'abeille marocaine avec des huiles essentielles naturelles.",
    },
  },
  {
    key: "item-20",
    question: {
      ar: "هل توفرون بطاقة هدية؟",
      en: "Do you offer gift cards?",
      fr: "Proposez-vous des cartes-cadeaux ?",
    },
    answer: {
      ar: "نعم، يمكنك طلب بطاقة هدية رقمية أو مطبوعة مع أي طلب.",
      en: "Yes, you can request a digital or printed gift card with any order.",
      fr: "Oui, vous pouvez demander une carte-cadeau numérique ou imprimée avec toute commande.",
    },
  },
  {
    key: "item-21",
    question: {
      ar: "ما الفرق بين البوف التقليدي والبوف العصري؟",
      en: "What is the difference between traditional and modern poufs?",
      fr: "Quelle est la différence entre les poufs traditionnels et modernes ?",
    },
    answer: {
      ar: "البوف التقليدي مصنوع من الجلد الطبيعي ويُخاط يدويًا، بينما العصري قد يكون من قماش صناعي أو ألوان أكثر حداثة.",
      en: "Traditional poufs are made of natural leather and hand-stitched; modern ones may use synthetic fabrics or trendy colors.",
      fr: "Les poufs traditionnels sont en cuir naturel cousu à la main ; les modernes peuvent être en tissu synthétique ou aux couleurs plus modernes.",
    },
  },
  {
    key: "item-22",
    question: {
      ar: "هل تقدمون منتجات حصرية لمناسبات معينة؟",
      en: "Do you offer exclusive products for special occasions?",
      fr: "Proposez-vous des produits exclusifs pour des occasions spéciales ?",
    },
    answer: {
      ar: "نعم، نوفر تصاميم محدودة لرمضان، الأعراس، أو الهدايا الموسمية.",
      en: "Yes, we provide limited designs for Ramadan, weddings, and seasonal gifts.",
      fr: "Oui, nous proposons des designs limités pour le Ramadan, les mariages et les cadeaux saisonniers.",
    },
  },
  {
    key: "item-23",
    question: {
      ar: "هل يمكنني إرسال الطلب كهدية مباشرة إلى شخص آخر؟",
      en: "Can I send the order as a gift directly to someone else?",
      fr: "Puis-je envoyer la commande en cadeau directement à quelqu'un d'autre ?",
    },
    answer: {
      ar: "نعم، يمكنك إدخال عنوان المرسل إليه وتحديده كهدية مع تغليف ورسالة شخصية.",
      en: "Yes, you can enter the recipient's address and mark the order as a gift with wrapping and a personal message.",
      fr: "Oui, vous pouvez saisir l'adresse du destinataire et marquer la commande comme cadeau avec emballage et message personnel.",
    },
  },
  {
    key: "item-24",
    question: {
      ar: "هل يمكنني متابعة طلبي عبر الهاتف؟",
      en: "Can I track my order via phone?",
      fr: "Puis-je suivre ma commande par téléphone ?",
    },
    answer: {
      ar: "نعم، يمكنك التواصل معنا عبر WhatsApp وسنوافيك بتفاصيل التوصيل في أي لحظة.",
      en: "Yes, you can contact us via WhatsApp and get delivery updates anytime.",
      fr: "Oui, vous pouvez nous contacter via WhatsApp et recevoir des mises à jour sur la livraison à tout moment.",
    },
  },
  {
    key: "item-25",
    question: {
      ar: "هل يمكنكم إرسال صور للمنتج قبل الشحن؟",
      en: "Can you send product photos before shipping?",
      fr: "Pouvez-vous envoyer des photos du produit avant l'expédition ?",
    },
    answer: {
      ar: "بالتأكيد، نرسل صور المنتج النهائي قبل الشحن للتأكيد النهائي.",
      en: "Certainly, we send photos of the final product before shipping for final confirmation.",
      fr: "Certainement, nous envoyons des photos du produit final avant l'expédition pour confirmation finale.",
    },
  },
  {
    key: "item-26",
    question: {
      ar: "ما هي مدة صلاحية الشموع أو الزيوت؟",
      en: "What is the shelf life of candles or oils?",
      fr: "Quelle est la durée de conservation des bougies ou huiles ?",
    },
    answer: {
      ar: "الشموع تدوم من 6 إلى 12 شهرًا حسب التخزين، والزيوت تبقى فعالة لمدة عام تقريبًا.",
      en: "Candles last 6 to 12 months depending on storage; oils remain effective for about one year.",
      fr: "Les bougies durent de 6 à 12 mois selon le stockage ; les huiles restent efficaces environ un an.",
    },
  },
  {
    key: "item-27",
    question: {
      ar: "هل يمكنني إرجاع منتج لأن شكله لا يعجبني؟",
      en: "Can I return a product because I don't like its appearance?",
      fr: "Puis-je retourner un produit parce que je n'aime pas son apparence ?",
    },
    answer: {
      ar: "نعم، بشرط أن لا يكون مستعملاً وأن تتم الإعادة خلال 7 أيام من الاستلام. رسوم الإرجاع يتحملها الزبون.",
      en: "Yes, provided it is unused and returned within 7 days of receipt. Return shipping costs are borne by the customer.",
      fr: "Oui, à condition qu'il ne soit pas utilisé et retourné dans les 7 jours suivant la réception. Les frais de retour sont à la charge du client.",
    },
  },
  {
    key: "item-28",
    question: {
      ar: "هل المنتجات مصورة كما في الواقع؟",
      en: "Are the products photographed as they really are?",
      fr: "Les produits sont-ils photographiés tels qu'ils sont réellement ?",
    },
    answer: {
      ar: "نحاول أن تكون الصور واقعية تمامًا، لكن بعض الألوان قد تختلف قليلاً حسب الإضاءة أو الشاشة.",
      en: "We strive for realistic photos, but colors may vary slightly due to lighting or screen settings.",
      fr: "Nous nous efforçons d'avoir des photos réalistes, mais les couleurs peuvent légèrement varier selon l'éclairage ou l'écran.",
    },
  },
  {
    key: "item-29",
    question: {
      ar: "هل يمكنني زيارة ورشة العمل أو مكان الإنتاج؟",
      en: "Can I visit the workshop or production site?",
      fr: "Puis-je visiter l'atelier ou le site de production ?",
    },
    answer: {
      ar: "حاليًا لا نوفر زيارات، لكن نعرض فيديوهات وصور من عمليات التصنيع على موقعنا وصفحاتنا الاجتماعية.",
      en: "Currently, we do not offer visits, but we share videos and photos of the production process on our website and social media.",
      fr: "Actuellement, nous n'offrons pas de visites, mais nous partageons des vidéos et photos du processus de fabrication sur notre site et réseaux sociaux.",
    },
  },
];

export default function FQU() {
  const [lang, setLang] = useState<"ar" | "en" | "fr">("ar");

  return (
    <div className="max-w-3xl mx-auto py-24 px-4">
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setLang("ar")}
          className={`px-4 py-2 rounded ${lang === "ar" ? "bg-primary text-white" : "bg-gray-200"}`}
        >
          العربية
        </button>
        <button
          onClick={() => setLang("en")}
          className={`px-4 py-2 rounded ${lang === "en" ? "bg-primary text-white" : "bg-gray-200"}`}
        >
          English
        </button>
        <button
          onClick={() => setLang("fr")}
          className={`px-4 py-2 rounded ${lang === "fr" ? "bg-primary text-white" : "bg-gray-200"}`}
        >
          Français
        </button>
      </div>

      <h1 className="text-3xl font-bold text-center text-primary mb-6">
        {lang === "ar"
          ? "الأسئلة الشائعة"
          : lang === "en"
          ? "Frequently Asked Questions"
          : "Questions Fréquemment Posées"}
      </h1>
      <p className="text-center text-muted-foreground mb-10">
        {lang === "ar"
          ? "تجد هنا أجوبة على أكثر الاستفسارات شيوعًا حول منتجاتنا وخدماتنا."
          : lang === "en"
          ? "Find answers to the most common questions about our products and services."
          : "Trouvez des réponses aux questions les plus fréquentes concernant nos produits et services."}
      </p>

      <Accordion type="single" collapsible className="w-full space-y-2">
        {faqs.map(({ key, question, answer }) => (
          <AccordionItem key={key} value={key}>
            <AccordionTrigger>{question[lang]}</AccordionTrigger>
            <AccordionContent>{answer[lang]}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
