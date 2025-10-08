import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Star, Search } from "lucide-react";
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import { Helmet } from "react-helmet-async";


type Product = Tables<'products'> & {
  categories: Tables<'categories'>;
};

const AllProducts = () => {
  const { addItem } = useCart();
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Tables<'categories'>[]>([]);
  const [loading, setLoading] = useState(true);



const location = useLocation();
type LocationState = { category?: string; city?: string };
const state = location.state as LocationState | undefined;

useEffect(() => {
  if (state?.category) setSelectedCategory(state.category);
  else setSelectedCategory("all");

  if (state?.city) setSelectedCity(state.city);
  else setSelectedCity("all");
}, [location.key]);
const query = new URLSearchParams(location.search);

const cities = useMemo(() => {
  return Array.from(new Set(categories.map(cat => cat.city).filter(Boolean)));
}, [categories]);const category = query.get('category') || 'all';

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);



  useEffect(() => {
    // Set up real-time subscription for products
    const channel = supabase
      .channel('products-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'products'
        },
        () => {
          fetchProducts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories (*)
      `)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "Error",
        description: "Failed to load products",
        variant: "destructive",
      });
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name_en');

    if (error) {
      console.error('Error fetching categories:', error);
    } else {
      setCategories(data || []);
    }
  };


  const priceRanges = [
    { label: "Under DH50", min: 0, max: 50 },
    { label: "DH50 - DH100", min: 50, max: 100 },
    { label: "DH100 - DH200", min: 100, max: 200 },
    { label: "DH200 - DH400", min: 200, max: 400 },
    { label: "Over DH400", min: 400, max: 1000 }
  ];

  const getProductName = (product: Product) => {
    switch (language) {
      case 'ar':
        return product.name_ar;
      case 'fr':
        return product.name_fr;
      default:
        return product.name_en;
    }
  };

  const getCategoryName = (category: Tables<'categories'>) => {
    switch (language) {
      case 'ar':
        return category.name_ar;
      case 'fr':
        return category.name_fr;
      default:
        return category.name_en;
    }
  };
const filteredProducts = products.filter(product => {
  const productName = getProductName(product);
  const matchesSearch = productName.toLowerCase().includes(searchTerm.toLowerCase());
const matchesCity = selectedCity === "all" || product.categories.city === selectedCity;
  const matchesCategory = selectedCategory === "all" || getCategoryName(product.categories) === selectedCategory;
  const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

  return matchesSearch && matchesCity && matchesCategory && matchesPrice;
});

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = (product: Product) => {
    const productName = getProductName(product);
    addItem({
      id: product.id,
      name: productName,
      price: product.price,
      image: product.image_url || 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=500'
    });
    
    toast({
      title: t('addedToCart'),
      description: `${productName} ${t('hasBeenAddedToYourCart')}`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-xl">Loading products...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
    <Helmet>
<title>{`All Moroccan Handmade Products | Moroccan Craft Gift`}</title>
<meta name="language" content={language === 'ar' ? 'ar' : language === 'fr' ? 'fr' : 'en'} />
         <link rel="icon" href="https://moroccancraftgift.com/download.png" />

    <link rel="icon" href="https://moroccancraftgift.com/image2vector.svg" />

    <link rel="icon" href="https://moroccancraftgift.com/image2vector.svg" />
    <link rel="icon" type="image/png" sizes="32x32" href="https://moroccancraftgift.com/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="https://moroccancraftgift.com/favicon-16x16.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="https://moroccancraftgift.com/apple-touch-icon.png" />
      
  <meta
    name="description"
    content="Shop authentic Moroccan handcrafted gifts and decor. Discover leather poufs, copperware, pottery, zellige, and artisanal home accessories. 100% handmade in Morocco."
  />
  <meta
    name="keywords"
    content="Moroccan crafts, Moroccan handmade, Moroccan poufs, copperware, zellige, tajine, artisanal gifts, Moroccan decor, Marrakech crafts, Fez artisans"
  />
  <meta name="robots" content="index, follow" />
  <meta name="author" content="Moroccan Craft Gift" />
  <link rel="canonical" href="https://moroccancraftgift.com/products" />

  {/* Open Graph (Facebook, LinkedIn) */}
  <meta property="og:type" content="website" />
<meta property="og:locale" content={language === 'ar' ? 'ar_MA' : language === 'fr' ? 'fr_FR' : 'en_US'} />
  <meta property="og:title" content="Moroccan Handcrafted Gifts & Decor | Moroccan Craft Gift" />
  <meta
    property="og:description"
    content="Explore traditional Moroccan handmade crafts — poufs, copper, pottery, and zellige. Handmade by local artisans."
  />
  <meta property="og:image" content="https://moroccancraftgift.com/og-image.png" />
  <meta property="og:url" content="https://moroccancraftgift.com/products" />
  <meta property="og:site_name" content="Moroccan Craft Gift" />

  {/* Twitter */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Moroccan Handcrafted Gifts & Decor | Moroccan Craft Gift" />
  <meta
    name="twitter:description"
    content="Authentic Moroccan artisanal products — leather poufs, copperware, pottery, and handmade gifts."
  />
  <meta name="twitter:image" content="https://moroccancraftgift.com/og-image.png" />

  {/* JSON-LD Structured Data */}
  <script type="application/ld+json">
  {JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://moroccancraftgift.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Products",
        "item": "https://moroccancraftgift.com/products"
      }
    ]
  })}
</script>
</Helmet>

<section className="text-center mb-6">
  <h1>
  {language === 'ar' ? 'منتجات مغربية تقليدية أصلية' :
   language === 'fr' ? 'Produits artisanaux marocains authentiques' :
   'Authentic Moroccan Handcrafted Products'}
</h1>

  <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
    Discover unique handmade crafts from Morocco — leather poufs, copperware, pottery, and traditional decor crafted by local artisans.
  </p>
</section>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
            {t('AllProducts')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('discoverOurCompleteCollection')}
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-border/50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder={t('searchProducts')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* City Filter */}
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger>
                <SelectValue placeholder={t('selectCity')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('allCities')}</SelectItem>
                {cities.map(city => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder={t('selectCategory')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('allCategories')}</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category.id} value={getCategoryName(category)}>{getCategoryName(category)}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Price Range */}
            <div className="space-y-3">
              <label className="text-sm font-medium">{t('priceRange')}: DH{priceRange[0]} - DH{priceRange[1]}</label>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={500}
                min={0}
                step={10}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
          {filteredProducts.map((product) => (
            <Card 
              key={product.id} 
              className="group hover:shadow-elegant transition-all duration-300 overflow-hidden cursor-pointer"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="relative">
                <img 
                  src={product.image_url || 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=500'}
                   loading="lazy"
alt={
  language === 'ar'
    ? `${getProductName(product)} - مصنوع يدويًا في المغرب`
    : language === 'fr'
    ? `${getProductName(product)} - Fait main au Maroc`
    : `${getProductName(product)} - Handmade in Morocco`
}

  title={`${getProductName(product)} | Moroccan Craft Gift`}
  width="400"
  height="400"
  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"

                
                />
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                    favorites.includes(product.id)
                      ? 'bg-red-500 text-white' 
                      : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
                  }`}
                >
                  <Heart className="w-4 h-4" fill={favorites.includes(product.id) ? 'currentColor' : 'none'} />
                </button>
                
                <Badge className="absolute top-4 left-4 bg-primary">
                  {getCategoryName(product.categories)}
                </Badge>
              </div>
              
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
<h2 className="font-semibold text-lg group-hover:text-primary transition-colors">
                    {getProductName(product)}
                  </h2>
                  <span className="text-sm text-muted-foreground">{product.categories.city}</span>
                </div>
                
               
                
                <p className="text-sm text-muted-foreground mb-4">{getCategoryName(product.categories)}</p>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-primary">DH {product.price}</span>
                  </div>
                  
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                    className="flex items-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {t('addToCart')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && !loading && (
          <div className="text-center py-16">
            <div className="mb-4">
              <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground/50" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">{t('noProductsFound')}</h3>
            <p className="text-muted-foreground mb-6">{t('tryAdjustingFilters')}</p>
            <Button 
              onClick={() => {
                setSearchTerm("");
                setSelectedCity("all");
                setSelectedCategory("all");
                setPriceRange([0, 500]);
              }}
              variant="outline"
            >
              {t('clearFilters')}
            </Button>
          </div>
        )}
      </div>

          <a
        href="/cart"
        className="fixed bottom-24 right-6 bg-[#D4AF37] hover:bg-yellow-600 text-black rounded-full shadow-lg p-4 transition-colors z-50"
      >
        <ShoppingCart className="w-7 h-7" />
      </a>
         {/* زر واتساب ثابت */}
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

export default AllProducts;