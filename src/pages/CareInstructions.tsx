import React, { useState } from "react";
import { motion } from "framer-motion";

/* ---------- Types ---------- */
type Lang = "ar" | "en" | "fr";

type CareItem = {
  id: string | number;
  title: { ar: string; en: string; fr: string };
  img: string; // رابط الصورة أو import path
  instructions: { ar: string[]; en: string[]; fr: string[] };
};

type Props = {
  lang?: Lang;
  items?: CareItem[];
  className?: string;
};

/* ---------- Default data (يمكن استبدالها بالـ props) ---------- */
const DEFAULT_ITEMS: CareItem[] = [
  {
    id: "pouf",
    title: { ar: "البوف الجلدي", en: "Leather Poufs", fr: "Poufs en Cuir" },
    img: "/images/ChatGPT Image Aug 9, 2025, 01_35_14 PM.png",
    instructions: {
      ar: [
        "نظف بقطعة قماش جافة أو مبللة قليلاً.",
        "تجنب المنظفات الكيميائية القوية.",
        "أبعده عن أشعة الشمس المباشرة والرطوبة.",
      ],
      en: [
        "Wipe with a dry or slightly damp cloth.",
        "Avoid harsh chemical cleaners.",
        "Keep away from direct sunlight and humidity.",
      ],
      fr: [
        "Essuyez avec un chiffon sec ou légèrement humide.",
        "Évitez les nettoyants chimiques agressifs.",
        "Gardez à l'écart du soleil direct et de l'humidité.",
      ],
    },
  },
  {
    id: "tagine",
    title: { ar: "الطاجين النحاسي", en: "Copper Tagines", fr: "Tajines en Cuivre" },
    img: "/images/WhatsApp Image 2025-07-22 at 23.48.17 (1).jpeg",
    instructions: {
      ar: [
        "اغسل باليد بماء دافئ وصابون لطيف ثم جفف فورًا.",
        "لتلميع استخدم الليمون والملح أو ملمع نحاس.",
        "لا تضعه في غسالة الصحون.",
      ],
      en: [
        "Hand wash with warm water and mild soap; dry immediately.",
        "Polish with lemon-and-salt or a copper polish.",
        "Do not use a dishwasher.",
      ],
      fr: [
        "Lavez à la main à l'eau tiède avec du savon doux; séchez immédiatement.",
        "Polir avec citron et sel ou un produit pour cuivre.",
        "Ne pas utiliser de lave-vaisselle.",
      ],
    },
  },
  {
    id: "zellige",
    title: { ar: "الزليج المغربي", en: "Moroccan Zellige", fr: "Zellige Marocain" },
    img: "/images/zellige.jpg",
    instructions: {
      ar: [
        "نظف بقطعة قماش ناعمة مبللة.",
        "تجنب المواد الكاشطة لأنها قد تخدش السطح.",
        "استخدم واقي للأكواب عند الاستخدام كطاولة.",
      ],
      en: [
        "Clean with a soft damp cloth.",
        "Avoid abrasive cleaners that may scratch.",
        "Use coasters if used as a tabletop.",
      ],
      fr: [
        "Nettoyez avec un chiffon doux et humide.",
        "Évitez les produits abrasifs qui peuvent rayer.",
        "Utilisez des sous-verres si utilisé comme table.",
      ],
    },
  },
];

/* ---------- Utilities ---------- */
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function CareInstructions({
  lang: initialLang = "ar",
  items = DEFAULT_ITEMS,
  className = "",
}: Props) {
  const [lang, setLang] = useState<Lang>(initialLang);

  const isRTL = lang === "ar";

  return (
    <section
      dir={isRTL ? "rtl" : "ltr"}
      className={`bg-[#faf6f0] py-20 px-4 md:px-12 ${className}`}
      aria-labelledby="care-title"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-4 mb-8">
          <h2
            id="care-title"
            className="text-2xl md:text-3xl font-extrabold text-[#7b3f00]"
          >
            {lang === "ar" && "تعليمات العناية بالمنتجات"}
            {lang === "en" && "Care Instructions"}
            {lang === "fr" && "Instructions d'entretien"}
          </h2>

          {/* Language switcher */}
          <div className="flex items-center gap-2 bg-white rounded-full p-1 shadow-sm">
            {(["ar", "en", "fr"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
                  ${lang === l ? "bg-[#7b3f00] text-white" : "text-[#7b3f00]/90"}`}
                aria-pressed={lang === l}
                aria-label={`switch to ${l}`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((item, idx) => (
            <motion.article
              key={item.id}
              variants={cardVariants}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              {/* الصورة */}
              <div className="relative w-full h-56 overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title[lang]}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    // fallback صورة إذا لم يوجد
                    (e.target as HTMLImageElement).src =
                      "/images/placeholder-product.jpg";
                  }}
                />
              </div>

              {/* المحتوى */}
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg md:text-xl font-semibold text-[#7b3f00] mb-3 text-center">
                  {item.title[lang]}
                </h3>

                <ul className="text-gray-700 text-sm space-y-2 flex-1">
                  {item.instructions[lang].map((instr, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#ffdca8] text-[#7b3f00] font-semibold flex-shrink-0">
                        {i + 1}
                      </span>
                      <p className="leading-relaxed">{instr}</p>
                    </li>
                  ))}
                </ul>

                {/* تفاصيل صغيرة */}
                <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                  <span>
                    {lang === "ar" && "ملاحظة:"} {lang === "en" && "Note:"}{" "}
                    {lang === "fr" && "Remarque:"}
                  </span>
                  <span>
                    {lang === "ar" && "اتبع التعليمات للحفاظ على الجودة"}
                    {lang === "en" && "Follow instructions to preserve quality"}
                    {lang === "fr" && "Suivez les instructions pour préserver la qualité"}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
         {/* زر واتساب ثابت */}
      <a
        href="https://wa.me/212687879451"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg p-4 transition-colors z-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          fill="currentColor"
          className="w-7 h-7"
        >
          <path d="M16 .5C7.44.5.5 7.44.5 16c0 2.8.73 5.53 2.11 7.95L.5 31.5l7.74-2.04A15.45 15.45 0 0 0 16 31.5c8.56 0 15.5-6.94 15.5-15.5S24.56.5 16 .5zm0 28c-2.46 0-4.87-.66-6.97-1.91l-.5-.3-4.6 1.21 1.23-4.48-.33-.55A12.96 12.96 0 1 1 16 28.5zm7.27-9.55c-.4-.2-2.36-1.16-2.73-1.3-.37-.13-.64-.2-.9.2s-1.04 1.3-1.28 1.57c-.24.27-.47.3-.87.1s-1.7-.63-3.24-2.01c-1.2-1.07-2-2.4-2.24-2.8-.23-.4-.02-.62.17-.82.18-.18.4-.47.6-.7.2-.23.27-.4.4-.67.13-.27.07-.5-.03-.7-.1-.2-.9-2.15-1.23-2.95-.32-.77-.65-.67-.9-.68h-.77c-.26 0-.68.1-1.03.5s-1.35 1.32-1.35 3.2 1.38 3.72 1.57 3.98c.2.27 2.72 4.15 6.6 5.82.92.4 1.64.64 2.2.82.92.3 1.77.26 2.44.16.74-.11 2.36-.96 2.7-1.89.34-.93.34-1.72.24-1.89-.1-.17-.36-.27-.76-.47z"/>
        </svg>
      </a>
    </section>
  );
}
