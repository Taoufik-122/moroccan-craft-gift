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

type Product = Tables<'products'> & {
  categories: Tables<'categories'>;
};

const AllProducts = () => {
  const { addItem } = useCart();
  const { t, language } = useLanguage();
  const { toast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Tables<'categories'>[]>([]);
  const [loading, setLoading] = useState(true);

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

  const cities = Array.from(new Set(categories.map(cat => cat.city)));
  const priceRanges = [
    { label: "Under $50", min: 0, max: 50 },
    { label: "$50 - $100", min: 50, max: 100 },
    { label: "$100 - $200", min: 100, max: 200 },
    { label: "$200 - $400", min: 200, max: 400 },
    { label: "Over $400", min: 400, max: 1000 }
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
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
            {t('allProducts')}
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
              <label className="text-sm font-medium">{t('priceRange')}: ${priceRange[0]} - ${priceRange[1]}</label>
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
            <Card key={product.id} className="group hover:shadow-elegant transition-all duration-300 overflow-hidden">
              <div className="relative">
                <img 
                  src={product.image_url || 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=500'}
                  alt={getProductName(product)}
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
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                    {getProductName(product)}
                  </h3>
                  <span className="text-sm text-muted-foreground">{product.categories.city}</span>
                </div>
                
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-1">
                    (4.5)
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">{getCategoryName(product.categories)}</p>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-primary">${product.price}</span>
                  </div>
                  
                  <Button
                    onClick={() => handleAddToCart(product)}
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
    </div>
  );
};

export default AllProducts;