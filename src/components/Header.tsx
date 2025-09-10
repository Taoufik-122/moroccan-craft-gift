import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Menu, X, Globe, Search, LogIn, LogOut, Settings } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import type { Language } from "../contexts/LanguageContext";

const Header = () => {
  console.log('Header component rendering');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { language, setLanguage, t } = useLanguage();
  const { user, userRole, signOut } = useAuth();
  console.log('About to call useCart');
  const { totalItems } = useCart();
  console.log('useCart successful, totalItems:', totalItems);

  // Scroll behavior for hiding/showing navbar
  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'العربية', flag: '🇲🇦' }
];


  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'All Products', href: '/products' },
    { name: 'Cities', href: '/cities' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];
  const [isLangOpen, setIsLangOpen] = useState(false);

  return (
    <header className={`bg-white text-black from-[#F6F1EB] via-[#5C8DAD] to-[#A05E2D] 
   shadow-md border-b border-[#D4AF37]/40 
  fixed top-0 z-50 w-full transition-all duration-500 ${
    isVisible ? 'translate-y-0' : '-translate-y-full'
  }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/ad2fa27a-2f5f-4449-80b9-caafd8c5fea2.png" 
                alt="Moroccan Craft Gift Logo" 
                className="h-12 w-auto object-contain hover:scale-105 transition-transform duration-200"
              />
              <h1 className="text-xl text-black font-bold  hidden sm:block drop-shadow-sm">
                Moroccan Craft Gift
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className=" text-black hover:text-primary-glow transition-colors duration-300 font-medium relative group"
              >
                {item.name}
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary-glow scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="hidden sm:flex  hover:text-primary-glow hover:bg-card/10 backdrop-blur-sm border border-card/20 hover:border-primary-glow/30"
              onClick={() => window.location.href = '/products'}
            >
              <Search className="text-[#D4AF37]   h-4 w-4" />
            </Button>

            {/* Language Selector */}
           <div className=" relative group">
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex text-[#D4AF37] items-center space-x-1  hover:text-primary-glow hover:bg-card/10 backdrop-blur-sm border border-card/20 hover:border-primary-glow/30"
          onClick={() => setIsLangOpen(!isLangOpen)}
        >
          <Globe className="h-4 w-4" />
          <span className="hidden text-[#D4AF37]  sm:inline">{languages.find(l => l.code === language)?.flag}</span>
        </Button>

        {isLangOpen && (
          <div className="absolute  text-black right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-50">
            {languages.map(({ code, name, flag }) => (
              <button
                key={code}
                className={`w-full  text-black text-left px-4 py-2 hover:bg-primary-glow hover:text-white ${
                  language === code ? "font-bold" : ""
                }`}
                onClick={() => {
  if (['en', 'fr', 'ar'].includes(code)) {
    setLanguage(code as Language);
    setIsLangOpen(false);
  }
}}
               
              >
                {flag} {name}
              </button>
            ))}
          </div>
        )}
      </div>


            {/* Authentication */}
            {user ? (
              <div className="flex items-center space-x-2">
                {/* Admin Button - Only show for admin users */}
                {userRole === 'admin' && (
                  <Link to="/admin">
                    <Button variant="ghost" size="sm" className="flex items-center space-x-1   bg-[#D4AF37] text-black hover:text-primary-glow hover:bg-card/10 backdrop-blur-sm border border-card/20 hover:border-primary-glow/30">
                      <Settings className="h-4 w-4" />
                      <span className="hidden  sm:inline">Admin</span>
                    </Button>
                  </Link>
                )}
                
                {/* Logout Button */}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={signOut}
                  className="flex items-center space-x-1 bg-[#D4AF37] text-black  hover:text-primary-glow hover:bg-card/10 backdrop-blur-sm border border-card/20 hover:border-primary-glow/30"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden text-black sm:inline">Logout</span>
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button variant="ghost" size="sm" className="flex items-center bg-[#D4AF37] text-black space-x-1  hover:text-primary-glow hover:bg-card/10 backdrop-blur-sm border border-card/20 hover:border-primary-glow/30">
                  <LogIn className="h-4 w-4" />
                  <span className="hidden sm:inline">Login</span>
                </Button>
              </Link>
            )}

            {/* Cart */}
            <Link to="/cart">
              <Button variant="ghost" size="sm" className="relative   text-black hover:text-primary-glow hover:bg-card/10 backdrop-blur-sm border border-card/20 hover:border-primary-glow/30">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge 
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary-glow text-secondary shadow-gold border border-primary/30"
                  >
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden  text-black  hover:text-primary-glow hover:bg-card/10 backdrop-blur-sm border border-card/20 hover:border-primary-glow/30"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-primary/30 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gradient-navy/90 backdrop-blur-md">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-3 py-2  hover:text-primary-glow hover:bg-card/15 rounded-lg transition-all duration-300 border border-transparent hover:border-primary-glow/30 backdrop-blur-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-primary/30 pt-2 mt-2">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                  onClick={() => {
                    setIsMenuOpen(false);
                    window.location.href = '/products';
                  }}
                >
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;