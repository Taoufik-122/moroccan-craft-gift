import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from "../contexts/LanguageContext";

const faqs = [
  { key: "item-1", questionKey: "faq.question1", answerKey: "faq.answer1" },
  { key: "item-2", questionKey: "faq.question2", answerKey: "faq.answer2" },
  { key: "item-3", questionKey: "faq.question3", answerKey: "faq.answer3" },
  { key: "item-4", questionKey: "faq.question4", answerKey: "faq.answer4" },
  { key: "item-5", questionKey: "faq.question5", answerKey: "faq.answer5" },
  { key: "item-6", questionKey: "faq.question6", answerKey: "faq.answer6" },
  { key: "item-7", questionKey: "faq.question7", answerKey: "faq.answer7" },
  { key: "item-8", questionKey: "faq.question8", answerKey: "faq.answer8" },
  { key: "item-9", questionKey: "faq.question9", answerKey: "faq.answer9" },
  { key: "item-10", questionKey: "faq.question10", answerKey: "faq.answer10" },
  { key: "item-11", questionKey: "faq.question11", answerKey: "faq.answer11" },
  { key: "item-12", questionKey: "faq.question12", answerKey: "faq.answer12" },
  { key: "item-13", questionKey: "faq.question13", answerKey: "faq.answer13" },
  { key: "item-14", questionKey: "faq.question14", answerKey: "faq.answer14" },
  { key: "item-15", questionKey: "faq.question15", answerKey: "faq.answer15" },
  { key: "item-16", questionKey: "faq.question16", answerKey: "faq.answer16" },
  { key: "item-17", questionKey: "faq.question17", answerKey: "faq.answer17" },
  { key: "item-18", questionKey: "faq.question18", answerKey: "faq.answer18" },
  { key: "item-19", questionKey: "faq.question19", answerKey: "faq.answer19" },
  { key: "item-20", questionKey: "faq.question20", answerKey: "faq.answer20" },
  { key: "item-21", questionKey: "faq.question21", answerKey: "faq.answer21" },
  { key: "item-22", questionKey: "faq.question22", answerKey: "faq.answer22" },
  { key: "item-23", questionKey: "faq.question23", answerKey: "faq.answer23" },
  { key: "item-24", questionKey: "faq.question24", answerKey: "faq.answer24" },
  { key: "item-25", questionKey: "faq.question25", answerKey: "faq.answer25" },
  { key: "item-26", questionKey: "faq.question26", answerKey: "faq.answer26" },
  { key: "item-27", questionKey: "faq.question27", answerKey: "faq.answer27" },
  { key: "item-28", questionKey: "faq.question28", answerKey: "faq.answer28" },
  { key: "item-29", questionKey: "faq.question29", answerKey: "faq.answer29" },
];


const Support = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    }
  }, [location]);

  return (
    <div className="max-w-3xl mx-auto mt-20 py-24 px-6 bg-white rounded-xl shadow-lg space-y-24">

      {/* FAQ */}
      <div id="faq">
        <h1 className="text-3xl font-bold mb-8 text-center text-primary">{t("nav.faq")}</h1>
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map(({ key, questionKey, answerKey }) => (
            <AccordionItem key={key} value={key}>
              <AccordionTrigger>{t(questionKey)}</AccordionTrigger>
              <AccordionContent>{t(answerKey)}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Shipping Info */}
      <div id="shipping">
        <h1 className="text-3xl font-bold mb-8 text-center text-primary">{t("support.shippingTitle")}</h1>
        <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
          <p>{t("support.shippingContent")}</p>
          <p>{t("support.shippingContent1")}</p>
          <p>{t("support.shippingContent2")}</p>
          <p>{t("support.shippingContent3")}</p>
          <p>{t("support.shippingContent4")}</p>
          <p>{t("support.shippingContent5")}</p>
        </div>
      </div>

      {/* Returns */}
      <div id="returns">
        <h1 className="text-3xl font-bold mb-8 text-center text-primary">{t("support.returnsTitle")}</h1>
        <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
          <p>{t("support.returnsContent")}</p>
        </div>
      </div>

      {/* Size Guide */}
      <div id="size">
        <h1 className="text-3xl font-bold mb-8 text-center text-primary">{t("support.sizeTitle")}</h1>
        <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
          <p>{t("support.sizeContent")}</p>
        </div>
      </div>

    </div>
  );
};

export default Support;
