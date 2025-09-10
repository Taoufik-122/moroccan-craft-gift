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
    </section>
  );
}
