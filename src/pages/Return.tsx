import React from "react";

const Returns = () => {
  return (
    <div className="max-w-3xl mx-auto mt-16 py-20 px-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">Returns / Retours / الإرجاع</h1>
      
      <div className="space-y-8 text-muted-foreground text-lg leading-relaxed">
        <div>
          <h2 className="font-semibold text-xl text-foreground">🇺🇸 Return Policy</h2>
          <p>
            We accept returns within 14 days of delivery. Items must be unused, in original condition and packaging.
            Please contact us before sending your product back.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-xl text-foreground">🇫🇷 Politique de retour</h2>
          <p>
            Les retours sont acceptés dans un délai de 14 jours après la livraison. Les articles doivent être inutilisés et dans leur emballage d’origine.
            Veuillez nous contacter avant tout renvoi.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-xl text-foreground">🇲🇦 سياسة الإرجاع</h2>
          <p dir="rtl">
            نقبل الإرجاع خلال 14 يومًا من تاريخ التوصيل. يجب أن تكون المنتجات غير مستخدمة وفي حالتها الأصلية مع التغليف الأصلي.
            يرجى التواصل معنا قبل إرجاع أي منتج.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Returns;
