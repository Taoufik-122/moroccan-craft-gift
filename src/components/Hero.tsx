import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Truck, Shield, HeadphonesIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from 'react-helmet-async';
import React, { useState, useEffect } from 'react';
// تأكد من أن مسار الاستيراد يطابق مكان ملف الكونتكست لديك
import { useLanguage } from '../contexts/LanguageContext';
const Hero = () => {
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  
  // استدعاء اللغة ودالة الترجمة من الكونتكست
  const { language, t } = useLanguage();

  // 1. بيانات العروض مجهزة لكل لغة
  // ملاحظة: حافظت على علامة النقطتين ":" لأن الكود يعتمد عليها لفصل العناوين
  const offersByLanguage = {
    en: [
      {
        src: "https://msuuyvfosqjrmyzenjnd.supabase.co/storage/v1/object/public/product-images/88c69876-a9ee-4375-9ae9-408950cef709/1766611484688-WhatsApp%20Image%202025-12-24%20at%2021.54.40%20(1).jpeg",
        alt: "Now only 190 MAD instead of 380 MAD: 🎉 50% OFF 🎉 ✨ ⏰"
      },
      {
        src: "https://msuuyvfosqjrmyzenjnd.supabase.co/storage/v1/object/public/product-images/product-images/1766612677865.png",
        alt: "280 MAD 224 MAD: 🔻 20% OFF"
      },
      {
        src: "https://msuuyvfosqjrmyzenjnd.supabase.co/storage/v1/object/public/product-images/product-images/1766613941283.png",
        alt: "40% OFF!: Was 180 MAD, now only 108 MAD – limited time offer!"
      }
    ],
    fr: [
      {
        src: "https://msuuyvfosqjrmyzenjnd.supabase.co/storage/v1/object/public/product-images/88c69876-a9ee-4375-9ae9-408950cef709/1766611484688-WhatsApp%20Image%202025-12-24%20at%2021.54.40%20(1).jpeg",
        alt: "Maintenant 190 MAD au lieu de 380 MAD: 🎉 -50% 🎉 ✨ ⏰"
      },
      {
        src: "https://msuuyvfosqjrmyzenjnd.supabase.co/storage/v1/object/public/product-images/product-images/1766612677865.png",
        alt: "280 MAD 224 MAD: 🔻 -20% Réduction"
      },
      {
        src: "https://msuuyvfosqjrmyzenjnd.supabase.co/storage/v1/object/public/product-images/product-images/1766613941283.png",
        alt: "-40% SOLDE !: Était 180 MAD, maintenant 108 MAD"
      }
    ],
    ar: [
      {
        src: "https://msuuyvfosqjrmyzenjnd.supabase.co/storage/v1/object/public/product-images/88c69876-a9ee-4375-9ae9-408950cef709/1766611484688-WhatsApp%20Image%202025-12-24%20at%2021.54.40%20(1).jpeg",
        alt: "الآن 190 درهم بدل 380 درهم: 🎉 تخفيض 50% 🎉 ✨ ⏰"
      },
      {
        src: "https://msuuyvfosqjrmyzenjnd.supabase.co/storage/v1/object/public/product-images/product-images/1766612677865.png",
        alt: "280 درهم 224 درهم: 🔻 تخفيض 20%"
      },
      {
        src: "https://msuuyvfosqjrmyzenjnd.supabase.co/storage/v1/object/public/product-images/product-images/1766613941283.png",
        alt: "تخفيض 40% !: كان 180 درهم، الآن 108 درهم فقط"
      }
    ]
  };

  // تحديد المصفوفة الحالية بناءً على اللغة
  const currentImages = offersByLanguage[language];

  // ترجمة الميزات (Features) محلياً لأنها غير موجودة في ملف الترجمة الرئيسي
  const features = [
    { icon: Star, text: language === 'ar' ? "صناعة يدوية أصيلة" : language === 'fr' ? "Fait Main Authentique" : "Authentic Handmade" },
    { icon: Truck, text: language === 'ar' ? "شحن سريع" : language === 'fr' ? "Livraison Rapide" : "Fast Shipping" },
    { icon: Shield, text: language === 'ar' ? "جودة مضمونة" : language === 'fr' ? "Qualité Garantie" : "Quality Guaranteed" },
    { icon: HeadphonesIcon, text: language === 'ar' ? "دعم 24/7" : language === 'fr' ? "Support 24/7" : "24/7 Support" }
  ];

  // نصوص الأزرار الخاصة بالبطاقة (ترجمة محلية سريعة)
  const cardTexts = {
    limitedOffer: { en: "Limited Offer!", fr: "Offre Limitée!", ar: "عرض محدود!" },
    grabDeal: { en: "Grab Deal", fr: "Profitez-en", ar: "اطلب الآن" },
    shopNow: { en: "Shop Now & Save", fr: "Achetez et Économisez", ar: "تسوق ووفر" }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentOfferIndex((prev) => (prev + 1) % currentImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [language, currentImages.length]); // إعادة ضبط التايمر عند تغيير اللغة

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <Helmet>
          <title>Moroccan Craft Gift - {t('home.hero.title')}</title>
                 <link rel="icon" href="https://moroccancraftgift.com/download.png" />
      
          <link rel="icon" href="/download.png" />
          <link rel="icon" href="/image2vector.svg" />
      
          <link rel="icon" href="https://moroccancraftgift.com/image2vector.svg" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <meta
                  name="description"
                  content={t('home.hero.subtitle')}
                />
                <meta
                  name="keywords"
                  content="Moroccan handicrafts, poufs, lamps, copperware, artisan gifts"
                />
                <meta name="author" content="Moroccan Craft Gift" />
                <meta property="og:title" content={`Moroccan Craft Gift - ${t('home.hero.title')}`} />
                <meta property="og:description" content={t('home.hero.subtitle')} />
                <meta property="og:image" content="https://moroccancraftgift.com/logo.png" />
                <meta property="og:url" content="https://moroccancraftgift.com/" />
                <link rel="canonical" href="https://moroccancraftgift.com/" />
      
                {/* Structured Data JSON-LD */}
                <script type="application/ld+json">
                  {`
                  {
                    "@context": "https://schema.org",
                    "@type": "Store",
                    "name": "Moroccan Craft Gift",
                    "image": "https://moroccancraftgift.com/logo.png",
                    "description": "${t('home.hero.subtitle')}",
                    "url": "https://moroccancraftgift.com",
                    "sameAs": [
                      "https://www.facebook.com/profile.php?id=61578327795179",
                      "https://www.instagram.com/moroccan.craft.gift/"
                    ]
                  }
                  `}
                </script>
      </Helmet>

      {/* 1. خلفية الفيديو */}
      <div className="absolute inset-0">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.15 }}
          className="w-full h-full"
        >
           <div className="absolute inset-0 w-full h-full bg-black/30 z-0" />
           <video 
            src="https://moroccancraftgift.com/video_4d48ff1d_1756313657503.mp4"  
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
          />
        </motion.div>
        {/* تدرج لوني أعمق قليلاً ليناسب البطاقة الكبيرة */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-black/40" />
      </div>

      {/* 2. المحتوى الرئيسي */}
      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex flex-col lg:flex-row items-center justify-between gap-10">
        
        {/* النص (يسار في الإنجليزية، يمين في العربية) */}
        {/* lg:order-2: في الشاشات الكبيرة، إذا كانت اللغة عربية، اجعل النص يظهر ثانياً (أي على اليمين) */}
        <div className={`max-w-2xl z-10 pt-10 lg:pt-0 ${language === 'ar' ? 'lg:order-2' : ''}`}>
          <Badge className="mb-6 bg-accent text-accent-foreground shadow-gold text-sm py-1.5 px-4">
            ✨ {language === 'ar' ? 'حرف مغربية أصيلة منذ 1995' : 'Authentic Moroccan Crafts Since 1995'}
          </Badge>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-fade-in tracking-tight">
             {/* استخدام t() لعنوان الصفحة */}
             {t('home.hero.title')}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl">
             {/* استخدام t() للوصف */}
             {t('home.hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link to="/products" className="w-full sm:w-auto">
              <Button size="lg" className="w-full h-14 text-lg px-8 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                {t('common.viewAll')} {/* أو nav.products حسب التفضيل */}
              </Button>
            </Link>

            <Link to="/cities" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full h-14 text-lg px-8 border-primary text-primary hover:bg-primary/10"
              >
                {t('nav.cities')}
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex items-center space-x-3 p-3 bg-background/60 backdrop-blur-md rounded-xl border border-white/10"
              >
                {/* ضبط الهامش للأيقونة حسب اللغة */}
                <div className={`p-2 bg-primary/10 rounded-full ${language === 'ar' ? 'ml-3' : 'mr-3'}`}>
                   <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-semibold text-foreground">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* بطاقة العروض الكبيرة (يمين في الإنجليزية، يسار في العربية) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, x: 100 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
          className={`hidden lg:block relative z-20 ${language === 'ar' ? 'lg:order-1' : ''}`}
        >
          <div className="w-[350px] h-[450px] lg:w-[480px] lg:h-[600px] bg-white p-4 rounded-[2.5rem] shadow-2xl rotate-2 hover:rotate-0 transition-all duration-700 ease-out border-[6px] border-white/40 backdrop-blur-sm">
            <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-gray-900 shadow-inner group">
              
              {/* شارة العرض بحجم أكبر */}
              {/* تغيير مكان الشارة: يمين للإنجليزية، يسار للعربية */}
              <div className={`absolute top-6 z-30 ${language === 'ar' ? 'left-6' : 'right-6'}`}>
                <div className="bg-red-600 text-white px-6 py-2 rounded-full font-bold shadow-xl animate-bounce text-base">
                   {cardTexts.limitedOffer[language]}
                </div>
              </div>

              {/* الصور المتحركة */}
              <AnimatePresence mode='wait'>
                <motion.img
                  key={`${currentOfferIndex}-${language}`} // المفتاح يضمن تحديث الصورة عند تغيير اللغة
                  src={currentImages[currentOfferIndex].src}
                  alt={currentImages[currentOfferIndex].alt}
                  initial={{ opacity: 0, scale: 1.2 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* تدرج لوني للنص */}
              <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90" />

              {/* النص الكبير أسفل البطاقة */}
              <div className="absolute bottom-0 left-0 right-0 p-8 pb-10 text-center transform transition-transform duration-300">
                 <motion.div
                    key={`text-${currentOfferIndex}-${language}`}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                 >
                    <h3 className="text-white font-extrabold text-3xl mb-2 drop-shadow-lg leading-tight" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                       {currentImages[currentOfferIndex].alt.split(':')[0]}
                    </h3>
                    <p className="text-yellow-300 font-medium text-lg" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                       {currentImages[currentOfferIndex].alt.split(':')[1] || cardTexts.shopNow[language]}
                    </p>
                    
                    <Button className="mt-6 bg-white text-black hover:bg-gray-200 rounded-full px-8 py-6 text-lg font-bold shadow-xl w-full">
                       {cardTexts.grabDeal[language]} 
                       {/* أيقونة الشاحنة: عكس الهامش في العربية */}
                       <Truck className={`w-5 h-5 ${language === 'ar' ? 'mr-2' : 'ml-2'}`}/>
                    </Button>
                 </motion.div>
              </div>

            </div>
          </div>
          
          {/* تأثير توهج خلفي كبير */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/30 rounded-full blur-[100px] -z-10" />
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;