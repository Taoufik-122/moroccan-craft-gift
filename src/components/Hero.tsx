import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Truck, Shield, HeadphonesIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from 'react-helmet-async';
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Hero = () => {
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const { language, t } = useLanguage();

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

  const currentImages = offersByLanguage[language];

  const features = [
    { icon: Star, text: language === 'ar' ? "صناعة يدوية أصيلة" : language === 'fr' ? "Fait Main Authentique" : "Authentic Handmade" },
    { icon: Truck, text: language === 'ar' ? "شحن سريع" : language === 'fr' ? "Livraison Rapide" : "Fast Shipping" },
    { icon: Shield, text: language === 'ar' ? "جودة مضمونة" : language === 'fr' ? "Qualité Garantie" : "Quality Guaranteed" },
    { icon: HeadphonesIcon, text: language === 'ar' ? "دعم 24/7" : language === 'fr' ? "Support 24/7" : "24/7 Support" }
  ];

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
  }, [language, currentImages.length]);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pb-10 lg:pb-0">
      <Helmet>
        <title>Moroccan Craft Gift - {t('home.hero.title')}</title>
        <link rel="icon" href="https://moroccancraftgift.com/download.png" />
        <link rel="icon" href="/download.png" />
        <link rel="icon" href="/image2vector.svg" />
        <link rel="icon" href="https://moroccancraftgift.com/image2vector.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="description" content={t('home.hero.subtitle')} />
        <meta name="keywords" content="Moroccan handicrafts, poufs, lamps, copperware, artisan gifts" />
        <meta name="author" content="Moroccan Craft Gift" />
        <meta property="og:title" content={`Moroccan Craft Gift - ${t('home.hero.title')}`} />
        <meta property="og:description" content={t('home.hero.subtitle')} />
        <meta property="og:image" content="https://moroccancraftgift.com/logo.png" />
        <meta property="og:url" content="https://moroccancraftgift.com/" />
        <link rel="canonical" href="https://moroccancraftgift.com/" />
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
          <div className="absolute inset-0 w-full h-full bg-black/40 z-0" />
          <video 
            src="https://moroccancraftgift.com/video_4d48ff1d_1756313657503.mp4"  
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-background via-background/90 to-black/40" />
      </div>

      {/* 2. المحتوى الرئيسي */}
      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-10">
        
        {/* النص */}
        <div className={`max-w-2xl z-10 pt-10 lg:pt-0 w-full ${language === 'ar' ? 'lg:order-2 text-right' : 'text-left'}`}>
          <div className={`flex ${language === 'ar' ? 'justify-end' : 'justify-start'}`}>
            <Badge className="mb-6 bg-accent text-accent-foreground shadow-gold text-sm py-1.5 px-4 whitespace-nowrap">
              ✨ {language === 'ar' ? 'حرف مغربية أصيلة منذ 1995' : 'Authentic Moroccan Crafts Since 1995'}
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-fade-in tracking-tight">
             {t('home.hero.title')}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl">
             {t('home.hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8 lg:mb-12">
            <Link to="/products" className="w-full sm:w-auto">
              <Button size="lg" className="w-full h-12 sm:h-14 text-base sm:text-lg px-8 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                {t('common.viewAll')}
              </Button>
            </Link>

            <Link to="/cities" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full h-12 sm:h-14 text-base sm:text-lg px-8 border-primary text-primary hover:bg-primary/10"
              >
                {t('nav.cities')}
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex items-center space-x-3 p-3 bg-background/60 backdrop-blur-md rounded-xl border border-white/10"
              >
                <div className={`p-2 bg-primary/10 rounded-full flex-shrink-0 ${language === 'ar' ? 'ml-3' : 'mr-3'}`}>
                   <feature.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-foreground">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* بطاقة العروض - تم التعديل لتظهر على الهاتف */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, x: 0, y: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
          // هنا التعديل الأساسي: إزالة hidden وإضافة كلاسات التمركز
          className={`w-full lg:w-auto flex justify-center mt-12 lg:mt-0 relative z-20 ${language === 'ar' ? 'lg:order-1' : ''}`}
        >
          {/* تعديل أحجام البطاقة لتكون متجاوبة */}
          <div className="w-[90%] max-w-[440px] h-[450px] sm:w-[350px] sm:h-[480px] lg:w-[480px] lg:h-[600px] bg-white p-3 sm:p-4 rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl rotate-0 lg:rotate-2 hover:rotate-0 transition-all duration-700 ease-out border-[4px] sm:border-[6px] border-white/40 backdrop-blur-sm">
            <div className="relative w-full h-full rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden bg-gray-900 shadow-inner group">
              
              <div className={`absolute top-4 sm:top-6 z-30 ${language === 'ar' ? 'left-4 sm:left-6' : 'right-4 sm:right-6'}`}>
                <div className="bg-red-600 text-white px-4 sm:px-6 py-2 rounded-full font-bold shadow-xl animate-bounce text-sm sm:text-base whitespace-nowrap">
                   {cardTexts.limitedOffer[language]}
                </div>
              </div>

              <AnimatePresence mode='wait'>
                <motion.img
                  key={`${currentOfferIndex}-${language}`}
                  src={currentImages[currentOfferIndex].src}
                  alt={currentImages[currentOfferIndex].alt}
                  initial={{ opacity: 0, scale: 1.2 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>

              <div className="absolute bottom-0 inset-x-0 h-3/5 bg-gradient-to-t from-black via-black/70 to-transparent opacity-90" />

              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 pb-8 sm:pb-10 text-center transform transition-transform duration-300">
                 <motion.div
                    key={`text-${currentOfferIndex}-${language}`}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                 >
                    <h3 className="text-white font-extrabold text-2xl sm:text-3xl mb-2 drop-shadow-lg leading-tight" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                       {currentImages[currentOfferIndex].alt.split(':')[0]}
                    </h3>
                    <p className="text-yellow-300 font-medium text-base sm:text-lg" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                       {currentImages[currentOfferIndex].alt.split(':')[1] || cardTexts.shopNow[language]}
                    </p>
                    
                    <Button className="mt-4 sm:mt-6 bg-white text-black hover:bg-gray-200 rounded-full px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-bold shadow-xl w-full">
                       {cardTexts.grabDeal[language]} 
                       <Truck className={`w-5 h-5 ${language === 'ar' ? 'mr-2' : 'ml-2'}`}/>
                    </Button>
                 </motion.div>
              </div>

            </div>
          </div>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/30 rounded-full blur-[80px] lg:blur-[100px] -z-10" />
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;