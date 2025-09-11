import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const translations = {
  ar: {
    pageTitle: "تواصل معنا",
    pageSubtitle:
      "نحن هنا للإجابة على جميع استفساراتكم. أرسلوا لنا رسالة أو تواصلوا معنا عبر المعلومات أدناه.",
    formTitle: "أرسل لنا رسالة",
    fullName: "الاسم الكامل",
    fullNamePlaceholder: "مثال: فاطمة الزهراء العلوي",
    email: "البريد الإلكتروني",
    emailPlaceholder: "your.email@example.com",
    subject: "الموضوع",
    subjectPlaceholder: "استفسار بخصوص طلب...",
    message: "رسالتك",
    messagePlaceholder: "اكتب رسالتك هنا...",
    submitButton: "إرسال الرسالة",
    contactInfo: "معلومات الاتصال",
    address: "Place Seffarine Fes, Morocco",     
    workingHours: "أوقات العمل",
    workingHours1: "الإثنين - الجمعة: 9:00 صباحًا - 6:00 مساءً",
    workingHours2: "السبت: 10:00 صباحًا - 3:00 مساءً",
    mapAlt: "خريطة الموقع",
    formSuccess: (name: string) =>
      `شكراً لك، ${name}! تم إرسال رسالتك بنجاح. سنتواصل معك قريباً.`,
    formError: "الرجاء ملء جميع الحقول المطلوبة.",
  },
  en: {
    pageTitle: "Contact Us",
    pageSubtitle:
      "We are here to answer all your questions. Send us a message or reach us via the information below.",
    formTitle: "Send us a message",
    fullName: "Full Name",
    fullNamePlaceholder: "e.g., John Doe",
    email: "Email Address",
    emailPlaceholder: "your.email@example.com",
    subject: "Subject",
    subjectPlaceholder: "Inquiry about an order...",
    message: "Your Message",
    messagePlaceholder: "Write your message here...",
    submitButton: "Send Message",
    contactInfo: "Contact Information",
    address: "Place Seffarine Fes, Morocco",
    workingHours: "Working Hours",
    workingHours1: "Monday - Friday: 9:00 AM - 6:00 PM",
    workingHours2: "Saturday: 10:00 AM - 3:00 PM",
    mapAlt: "Map Location",
    formSuccess: (name: string) =>
      `Thank you, ${name}! Your message has been sent successfully. We will contact you soon.`,
    formError: "Please fill out all required fields.",
  },
  fr: {
    pageTitle: "Contactez-nous",
    pageSubtitle:
      "Nous sommes là pour répondre à toutes vos questions. Envoyez-nous un message ou contactez-nous via les informations ci-dessous.",
    formTitle: "Envoyez-nous un message",
    fullName: "Nom complet",
    fullNamePlaceholder: "Ex: Jean Dupont",
    email: "Adresse e-mail",
    emailPlaceholder: "votre.email@example.com",
    subject: "Sujet",
    subjectPlaceholder: "Question sur une commande...",
    message: "Votre message",
    messagePlaceholder: "Écrivez votre message ici...",
    submitButton: "Envoyer le message",
    contactInfo: "Informations de contact",
    address: "Place Seffarine Fes, Morocco",
    workingHours: "Heures d'ouverture",
    workingHours1: "Lundi - Vendredi: 09h00 - 18h00",
    workingHours2: "Samedi: 10h00 - 15h00",
    mapAlt: "Emplacement sur la carte",
    formSuccess: (name: string) =>
      `Merci, ${name} ! Votre message a été envoyé avec succès. Nous vous contacterons bientôt.`,
    formError: "Veuillez remplir tous les champs obligatoires.",
  },
};

const ContactPage = () => {
  const { language } = useLanguage(); // ✅ الآن نستعمل context بدل useState محلي
  const t = translations[language];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;

    if (name && email && subject && message) {
      setFeedbackMessage(t.formSuccess(name));
      setFormData({ name: "", email: "", subject: "", message: "" });
    } else {
      setFeedbackMessage(t.formError);
    }

    setTimeout(() => setFeedbackMessage(""), 5000);
  };

  const containerStyle = {
    fontFamily: "'Cairo', sans-serif",
    backgroundColor: "#fdfaf6",
    color: "#5a4a42",
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
    minHeight: "100vh",
  };

  return (
    <div style={containerStyle}>
      <div className="pt-32" dir={language === "ar" ? "rtl" : "ltr"}>
        <main className="container mx-auto px-6 py-12 md:py-20">
          <div className="max-w-6xl mx-auto">
            {/* ================= العنوان ================= */}
            <div className="text-center mb-16">
              <h1
                className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
                style={{ color: "#5a4a42" }}
              >
                {t.pageTitle}
              </h1>
              <p
                className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
                style={{ color: "#6b7280" }}
              >
                {t.pageSubtitle}
              </p>
              <div
                className="mt-8 w-32 h-1.5 mx-auto rounded-full"
                style={{
                  background: "linear-gradient(to right, #D4AF37, #B8941F)",
                }}
              ></div>
            </div>

            {/* ================= النموذج + المعلومات ================= */}
            <div className="grid md:grid-cols-2 gap-12">
              {/* --- النموذج --- */}
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h2
                  className="text-2xl font-semibold mb-6"
                  style={{ color: "#5a4a42" }}
                >
                  {t.formTitle}
                </h2>

                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t.fullName}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={t.fullNamePlaceholder}
                      className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t.email}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t.emailPlaceholder}
                      className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t.subject}
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder={t.subjectPlaceholder}
                      className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t.message}
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={t.messagePlaceholder}
                      className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-yellow-600 focus:border-transparent h-40"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-xl text-white font-semibold shadow-md transition-transform transform hover:scale-105"
                    style={{
                      background: "linear-gradient(to right, #D4AF37, #B8941F)",
                    }}
                  >
                    {t.submitButton}
                  </button>

                  {feedbackMessage && (
                    <p className="mt-4 text-center text-green-600 font-medium">
                      {feedbackMessage}
                    </p>
                  )}
                </form>
              </div>

              {/* --- معلومات الاتصال --- */}
              <div className="space-y-8">
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <h2
                    className="text-2xl font-semibold mb-6"
                    style={{ color: "#5a4a42" }}
                  >
                    {t.contactInfo}
                  </h2>
                  <p className="mb-4">{t.address}</p>
                  <p>
                    📧 craftmoroccan96@gmail.com <br /> 📞 +212 687879451

                  </p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <h2
                    className="text-2xl font-semibold mb-6"
                    style={{ color: "#5a4a42" }}
                  >
                    {t.workingHours}
                  </h2>
                  <p>{t.workingHours1}</p>
                  <p>{t.workingHours2}</p>
                </div>

                <div className="bg-white p-2 rounded-2xl shadow-lg overflow-hidden">
       <iframe
    title={t.mapAlt}
  src="https://www.google.com/maps?q=Place+Seffarine,+Fes,+Morocco&output=embed"
    width="100%"
    height="250"
    allowFullScreen
    loading="lazy"
    className="rounded-xl"
  ></iframe>

                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
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
    </div>
  );
};

export default ContactPage;
