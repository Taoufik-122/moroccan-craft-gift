import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Truck, Shield, HeadphonesIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import React from 'react';


const Hero = () => {
  const features = [
    {
      icon: Star,
      text: "Authentic Handmade"
    },
    {
      icon: Truck,
      text: "Fast Shipping"
    },
    {
      icon: Shield,
      text: "Quality Guaranteed"
    },
    {
      icon: HeadphonesIcon,
      text: "24/7 Support"
    }
  ];

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
       <Helmet>
                <title>Moroccan Craft Gift - Authentic Moroccan Handicrafts</title>
                 <link rel="icon" href="https://moroccancraftgift.com/download.png" />
      
          <link rel="icon" href="/download.png" />
          <link rel="icon" href="/image2vector.svg" />
      
          <link rel="icon" href="https://moroccancraftgift.com/image2vector.svg" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <meta
                  name="description"
                  content="Discover authentic Moroccan handicrafts and artisan gifts. Handmade poufs, lamps, copperware, and decorative items."
                />
                <meta
                  name="keywords"
                  content="Moroccan handicrafts, poufs, lamps, copperware, artisan gifts"
                />
                <meta name="author" content="Moroccan Craft Gift" />
                <meta property="og:title" content="Moroccan Craft Gift - Authentic Moroccan Handicrafts" />
                <meta property="og:description" content="Discover authentic Moroccan handicrafts and artisan gifts." />
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
                    "description": "Authentic Moroccan handicrafts and artisan gifts",
                    "url": "https://moroccancraftgift.com",
                    "sameAs": [
                      "https://www.facebook.com/profile.php?id=61578327795179",
                      "https://www.instagram.com/moroccan.craft.gift/"
                    ]
                  }
                  `}
                </script>
              </Helmet>
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        
      >
       {/*   style={{ backgroundImage: `url(${heroImage})` }} */}
      <motion.div 
  initial={{ opacity: 0 }} 
  animate={{ opacity: 1 }} 
  transition={{ delay: 0.15 }}
  className="h-72 sm:h-96 md:h-[500px] lg:h-[600px] rounded-3xl shadow-lg overflow-hidden"
>
  <video 
    src= "https://moroccancraftgift.com/video_4d48ff1d_1756313657503.mp4"  
    autoPlay 
    loop 
    muted 
    playsInline
    className="w-full h-full object-cover"
  />
</motion.div>

        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl">
          {/* Badge */}
          <Badge className="mb-6 bg-accent text-accent-foreground shadow-gold">
            ✨ Authentic Moroccan Crafts Since 1995
          </Badge>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in">
            Discover
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Traditional Morocco
            </span>
            in Every Product
          </h1>

          {/* Description */}
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed animate-slide-up">
            Explore our curated collection of authentic handmade products from Morocco's most renowned artisan cities. 
            From the copper workshops of Fez to the leather tanneries of Marrakech.
          </p>

          {/* CTA Buttons */}
         <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-slide-up">
  <Link to="/products" className="w-full sm:w-auto">
    <Button size="lg" className="w-full bg-gradient-primary hover:opacity-90 shadow-warm">
      Shop All Products
    </Button>
  </Link>

  <Link to="/cities" className="w-full sm:w-auto">
    <Button
      variant="outline"
      size="lg"
      className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
    >
      Explore by Cities
    </Button>
  </Link>
</div>

          {/* Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-slide-up">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex items-center space-x-2 p-3 bg-card/80 backdrop-blur-sm rounded-lg border border-border/50 hover:shadow-gold transition-all duration-300"
              >
                <feature.icon className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-foreground">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 right-10 opacity-10">
        <div className="w-32 h-32 bg-gradient-primary rounded-full blur-3xl" />
      </div>
      <div className="absolute top-20 right-1/4 opacity-5">
        <div className="w-24 h-24 bg-gradient-sunset rounded-full blur-2xl" />
      </div>
    </section>
  );
};

export default Hero;