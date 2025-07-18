import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type Product = Tables<'products'> & {
  categories: Tables<'categories'>;
};

const FeaturedProducts = () => {
  const { t, language } = useLanguage();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories (*)
      `)
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(4);

    if (error) {
      console.error('Error fetching featured products:', error);
    } else {
      setProducts(data || []);
    }
  };

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

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
            {t('featuredProducts')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('discoverOurBestSellingHandcraftedTreasures')}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {products.map((product) => (
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
                  
                  <Button className="flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4" />
                    {t('addToCart')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link to="/products">
            <Button size="lg" className="group">
              {t('viewAllProducts')}
              <div className="ml-2 group-hover:translate-x-1 transition-transform">
                →
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;