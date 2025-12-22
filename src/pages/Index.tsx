import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CityCollections from '@/components/CityCollections';
import FeaturedProducts from '@/components/FeaturedProducts';
import Footer from '@/components/Footer';
import { ShoppingCart } from 'lucide-react';

const Index = () => {
  return (
    <HelmetProvider>
      <div className="min-h-screen bg-background">
        {/* SEO & Open Graph */}
        <Helmet>
          <title>Moroccan Craft Gift - Authentic Moroccan Handicrafts</title>
           <link rel="icon" href="https://moroccancraftgift.com/download.png" />

<link rel="icon" href="https://moroccancraftgift.com/favicon-64x64.png" sizes="64x64" type="image/png" />
<link rel="apple-touch-icon" sizes="180x180" href="https://moroccancraftgift.com/apple-touch-icon.png" />

  <link rel="canonical" href="https://moroccancraftgift.com/" />

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
{/* Meta Pixel Code */}
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1693587907889582');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=1693587907889582&ev=PageView&noscript=1"
/></noscript>
{/* End Meta Pixel Code -->
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

        {/* Header */}
        <Header />

        {/* Main content */}
        <main>
     
     <Hero>
          
          </Hero>
          {/* Featured Products Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-center">Featured Products</h2>
            <FeaturedProducts />
          </section>

          {/* City Collections Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-center">City Collections</h2>
            <CityCollections />
          </section>
        </main>

        {/* Fixed Shopping Cart Button */}
        <Link
          to="/cart"
          className="fixed bottom-24 right-6 bg-[#D4AF37] hover:bg-yellow-600 text-black rounded-full shadow-lg p-4 transition-colors z-50"
        >
          <ShoppingCart className="w-7 h-7" />
        </Link>

        {/* Fixed WhatsApp Button */}
        <a
          href="https://wa.me/212687879451"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg p-4 transition-colors z-50"
        >
          <svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" className="w-7 h-7">
            <path d="M16 .5C7.44.5.5 7.44.5 16c0 2.8.73 5.53 2.11 7.95L.5 31.5l7.74-2.04A15.45 15.45 0 0 0 16 31.5c8.56 0 15.5-6.94 15.5-15.5S24.56.5 16 .5zm0 28c-2.46 0-4.87-.66-6.97-1.91l-.5-.3-4.6 1.21 1.23-4.48-.33-.55A12.96 12.96 0 1 1 16 28.5zm7.27-9.55c-.4-.2-2.36-1.16-2.73-1.3-.37-.13-.64-.2-.9.2s-1.04 1.3-1.28 1.57c-.24.27-.47.3-.87.1s-1.7-.63-3.24-2.01c-1.2-1.07-2-2.4-2.24-2.8-.23-.4-.02-.62.17-.82.18-.18.4-.47.6-.7.2-.23.27-.4.4-.67.13-.27.07-.5-.03-.7-.1-.2-.9-2.15-1.23-2.95-.32-.77-.65-.67-.9-.68h-.77c-.26 0-.68.1-1.03.5s-1.35 1.32-1.35 3.2 1.38 3.72 1.57 3.98c.2.27 2.72 4.15 6.6 5.82.92.4 1.64.64 2.2.82.92.3 1.77.26 2.44.16.74-.11 2.36-.96 2.7-1.89.34-.93.34-1.72.24-1.89-.1-.17-.36-.27-.76-.47z"/>
          </svg>
        </a>

        {/* Footer */}
        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default Index;
