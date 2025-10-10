import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Helmet } from 'react-helmet-async';

import { HashLink as Link } from "react-router-hash-link";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter,
  Youtube,
  Star,
  Shield,
  Truck,
  CreditCard
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
const supportLinks = [
  { label: "FAQ", path: "/support#faq" },
  { label: "Shipping Info", path: "/support#shipping" },
  { label: "Returns", path: "/support#returns" },
  { label: "Size Guide", path: "/support#size" },
   { label: "Care Instructions", path: "/Care#CareInstructions" },
 { label: "About Us", path: "/About" },
];

 

  const footerLinks = {
    shop: [
      'All Products',
      'Copperware', 
      'Leather Goods',
      'Carpets',
      'Embroidery',
      'Pottery'
    ],
    cities: [
      'Fez Collections',
      'Marrakech Crafts',
      'Rabat Textiles', 
      'Tetouan Embroidery',
      'Meknes Pottery',
      'Casablanca Modern'
    ],
    support: [
      'FAQ',
      'Shipping Info',
      'Returns',
      'Size Guide',
      'Care Instructions',
      'Contact Us'
    ],
 
company: [
  { label: 'About Us', path: '/about#about' },
  { label: 'Our Artisans', path: '/about#artisans' },
  { label: 'Sustainability', path: '/about#sustainability' },
  { label: 'Press', path: '/about#press' },
  { label: 'Careers', path: '/about#careers' },
  { label: 'Blog', path: '/about#blog' },
]

  };


  const features = [
    { icon: Truck, text: 'Enjoy free delivery in Morocco on purchases above $500 ' },
    { icon: Shield, text: 'Authenticity guaranteed' },
    { icon: Star, text: '4.9/5 customer rating' },
    { icon: CreditCard, text: 'Secure payments' }
  ];

  return (
    <footer className="bg-card border-t border-border">
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
      {/* Features Banner */}
      <div className="border-b border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
              Souk Morocco
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Bringing you authentic Moroccan handicrafts directly from local artisans. 
              Each piece tells a story of tradition, culture, and exceptional craftsmanship.
            </p>
            
            {/* Newsletter */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Stay Updated</h3>
              <div className="flex space-x-2">
                <Input 
                  placeholder="Enter your email" 
                  className="flex-1"
                />
                <Button className="bg-gradient-primary hover:opacity-90">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Get exclusive offers and new product updates
              </p>
            </div>
          </div>

          {/* Shop Links */}
       <ul className="space-y-3">
  {footerLinks.shop.map((link) => (
    <li key={link}>
      <Link
        to="/products"
        state={{ category: link === 'All Products' ? 'all' : link }}
        className="text-muted-foreground hover:text-primary transition-colors duration-200"
      >
        {link}
      </Link>
    </li>
  ))}
</ul>
          {/* Cities Links <Link
        to="/products"
        state={{ city: link }}
        className="text-muted-foreground hover:text-primary transition-colors duration-200"
      >
        {link}
      </Link> */}
<ul className="space-y-3">
  {footerLinks.cities.map((cityName) => (
    <li key={cityName}>
      <Link 
        to={`/products?city=${encodeURIComponent(cityName)}`} 
        className="text-muted-foreground hover:text-primary transition-colors duration-200"
      >
        {cityName}
      </Link>
    </li>
  ))}
</ul>


          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-3">
  {supportLinks.map((link) => (
    <li key={link.label}>
      <Link
        to={link.path}
        className="text-muted-foreground hover:text-primary transition-colors duration-200"
      >
        {link.label}
      </Link>
    </li>
  ))}



            </ul>
          </div>

        {/* Company Links */}

<div>
  <h3 className="font-semibold text-foreground mb-4">Company</h3>
  <ul className="space-y-3">
    {footerLinks.company.map((link) => (
      <li key={link.label}>
        <Link
          to={link.path}
          className="text-muted-foreground hover:text-primary transition-colors duration-200"
        >
          {link.label}
        </Link>
      </li>
    ))}
  </ul>
</div>


        </div>

        {/* Contact Info */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-foreground">Visit Our Showroom</p>
                <p className="text-sm text-muted-foreground">Medina, Fes, Morocco</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-foreground">Call Us</p>
                <p className="text-sm text-muted-foreground">+212 687879451</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-foreground">Email Us</p>
                <p className="text-sm text-muted-foreground">craftmoroccan96@gmail.com
</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear}  Moroccan Craft Gift. All rights reserved.
            </p>
        {/*      <div className="flex space-x-4">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary">Terms</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary">Cookies</a>
            </div> */}
          </div>
          
          {/* Social Links */}
      <div className="flex space-x-2">
  <a 
    href="https://www.facebook.com/profile.php?id=61578327795179" 
    target="_blank" 
    rel="noopener noreferrer"
    className="p-2 rounded-full hover:bg-primary/10 transition-colors"
  >
    <Facebook className="h-5 w-5 text-foreground hover:text-primary" />
  </a>
  
  <a 
    href="https://www.instagram.com/moroccan.craft.gift/" 
    target="_blank" 
    rel="noopener noreferrer"
    className="p-2 rounded-full hover:bg-primary/10 transition-colors"
  >
    <Instagram className="h-5 w-5 text-foreground hover:text-primary" />
  </a>
  
 <a 
  href="https://wa.me/212687879451" 
  target="_blank" 
  rel="noopener noreferrer"
  className="p-2 rounded-full hover:bg-primary/10 transition-colors"
>
  <svg 
    xmlns="https://www.w3.org/2000/svg" 
    viewBox="0 0 32 32" 
    fill="currentColor" 
    className="h-5 w-5 text-foreground hover:text-primary"
  >
    <path d="M16 .5C7.44.5.5 7.44.5 16c0 2.8.73 5.53 2.11 7.95L.5 31.5l7.74-2.04A15.45 15.45 0 0 0 16 31.5c8.56 0 15.5-6.94 15.5-15.5S24.56.5 16 .5zm0 28c-2.46 0-4.87-.66-6.97-1.91l-.5-.3-4.6 1.21 1.23-4.48-.33-.55A12.96 12.96 0 1 1 16 28.5zm7.27-9.55c-.4-.2-2.36-1.16-2.73-1.3-.37-.13-.64-.2-.9.2s-1.04 1.3-1.28 1.57c-.24.27-.47.3-.87.1s-1.7-.63-3.24-2.01c-1.2-1.07-2-2.4-2.24-2.8-.23-.4-.02-.62.17-.82.18-.18.4-.47.6-.7.2-.23.27-.4.4-.67.13-.27.07-.5-.03-.7-.1-.2-.9-2.15-1.23-2.95-.32-.77-.65-.67-.9-.68h-.77c-.26 0-.68.1-1.03.5s-1.35 1.32-1.35 3.2 1.38 3.72 1.57 3.98c.2.27 2.72 4.15 6.6 5.82.92.4 1.64.64 2.2.82.92.3 1.77.26 2.44.16.74-.11 2.36-.96 2.7-1.89.34-.93.34-1.72.24-1.89-.1-.17-.36-.27-.76-.47z"/>
  </svg>
</a>
{/*  <a 
    href="https://www.youtube.com/YourChannel" 
    target="_blank" 
    rel="noopener noreferrer"
    className="p-2 rounded-full hover:bg-primary/10 transition-colors"
  >
    <Youtube className="h-5 w-5 text-foreground hover:text-primary" />
  </a>*/}
</div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;