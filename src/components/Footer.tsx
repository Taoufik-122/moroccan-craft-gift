import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
      'About Us',
      'Our Artisans',
      'Sustainability',
      'Press',
      'Careers',
      'Blog'
    ]
  };

  const features = [
    { icon: Truck, text: 'Free shipping over $100' },
    { icon: Shield, text: 'Authenticity guaranteed' },
    { icon: Star, text: '4.9/5 customer rating' },
    { icon: CreditCard, text: 'Secure payments' }
  ];

  return (
    <footer className="bg-card border-t border-border">
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
          <div>
            <h3 className="font-semibold text-foreground mb-4">Shop</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">By Cities</h3>
            <ul className="space-y-3">
              {footerLinks.cities.map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                    {link}
                  </a>
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
                <p className="text-sm text-muted-foreground">Medina, Marrakech, Morocco</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-foreground">Call Us</p>
                <p className="text-sm text-muted-foreground">+212 (0)24 123 456</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-foreground">Email Us</p>
                <p className="text-sm text-muted-foreground">hello@soukmorocco.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Souk Morocco. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary">Terms</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary">Cookies</a>
            </div>
          </div>
          
          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">Follow us:</span>
            <div className="flex space-x-2">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, index) => (
                <Button key={index} variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Icon className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;