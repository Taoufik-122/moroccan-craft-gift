import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Star, ArrowLeft } from "lucide-react";
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import ProductVariations from '@/components/ProductVariations';

type Product = Tables<'products'> & {
  categories: Tables<'categories'>;
};
const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { t, language } = useLanguage();
  const { toast } = useToast();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedVariations, setSelectedVariations] = useState<Record<string, any>>({});
  const [canAddToCart, setCanAddToCart] = useState(true);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  useEffect(() => {
    if (product) {
      fetchSimilarProducts();
    }
  }, [product]);

  const fetchProduct = async () => {
    if (!id) return;
    
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories (*)
      `)
      .eq('id', id)
      .eq('is_active', true)
      .single();

    if (error) {
      console.error('Error fetching product:', error);
      toast({
        title: "Error",
        description: "Product not found",
        variant: "destructive",
      });
      navigate('/products');
    } else {
      setProduct(data);
    }
    setLoading(false);
  };

  const fetchSimilarProducts = async () => {
    if (!product) return;
    
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories (*)
      `)
      .eq('category_id', product.category_id)
      .eq('is_active', true)
      .neq('id', product.id)
      .limit(4);

    if (error) {
      console.error('Error fetching similar products:', error);
    } else {
      setSimilarProducts(data || []);
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

  const getProductDescription = (product: Product) => {
    switch (language) {
      case 'ar':
        return product.description_ar;
      case 'fr':
        return product.description_fr;
      default:
        return product.description_en;
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

  const handleAddToCart = (product: Product) => {
    const productName = getProductName(product);
    const variationAdjustment = Object.values(selectedVariations).reduce((total: number, variation: any) => total + variation.price_adjustment, 0);
    const finalPrice = product.price + variationAdjustment;
    
    addItem({
      id: product.id,
      name: productName,
      price: finalPrice,
      image: product.image_url || 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=500',
      selectedVariations
    });
    
    toast({
      title: t('addedToCart'),
      description: `${productName} ${t('hasBeenAddedToYourCart')}`,
    });
  };

  const navigateToProduct = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-xl">Loading product...</div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Button onClick={() => navigate('/products')}>Back to Products</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
        {/* Product Image */}
<div className="relative">
  <img 
    src={
      Object.values(selectedVariations).find((v: any) => v.image_url)?.image_url ||
      product.image_url ||
      'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=500'
    }
    alt={getProductName(product)}
    className="w-full h-96 lg:h-[600px] object-cover rounded-2xl"
  />
  <button
    onClick={() => setIsFavorite(!isFavorite)}
    className={`absolute top-4 right-4 p-3 rounded-full transition-colors ${
      isFavorite
        ? 'bg-red-500 text-white' 
        : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
    }`}
  >
    <Heart className="w-5 h-5" fill={isFavorite ? 'currentColor' : 'none'} />
  </button>
  
  <Badge className="absolute top-4 left-4 bg-primary text-lg px-4 py-2">
    {getCategoryName(product.categories)}
  </Badge>
</div>


          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{getProductName(product)}</h1>
              <p className="text-xl text-muted-foreground">{product.categories.city}</p>
            </div>

            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-5 h-5 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                />
              ))}
              <span className="text-lg text-muted-foreground ml-2">
                (4.5) • 126 reviews
              </span>
            </div>

            <div className="text-4xl font-bold text-primary">
              ${(product.price + Object.values(selectedVariations).reduce((total: number, variation: any) => total + variation.price_adjustment, 0)).toFixed(2)}
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {getProductDescription(product) || "This beautiful handcrafted item represents the finest artisanal traditions of Morocco. Each piece is carefully made by skilled craftspeople using time-honored techniques passed down through generations."}
              </p>
            </div>

            {/* Product Variations */}
            <ProductVariations 
              productId={product.id} 
              onSelectionChange={setSelectedVariations}
              onValidationChange={setCanAddToCart}
            />

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Product Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Category:</span>
                  <p className="text-muted-foreground">{getCategoryName(product.categories)}</p>
                </div>
                <div>
                  <span className="font-medium">Origin:</span>
                  <p className="text-muted-foreground">{product.categories.city}</p>
                </div>
                <div>
                  <span className="font-medium">Stock:</span>
                  <p className="text-muted-foreground">{product.stock_quantity} available</p>
                </div>
                <div>
                  <span className="font-medium">SKU:</span>
                  <p className="text-muted-foreground">{product.id.slice(0, 8).toUpperCase()}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <Button
                onClick={() => handleAddToCart(product)}
                size="lg"
                className="flex-1 flex items-center justify-center gap-2"
                disabled={!canAddToCart}
              >
                <ShoppingCart className="w-5 h-5" />
                {canAddToCart ? 'Add to Cart' : 'Select All Options'}
              </Button>
             <Button 
  size="lg" 
  variant="outline" 
  className="px-8"
  disabled={!canAddToCart}
  onClick={() => {
    handleAddToCart(product);
    navigate('/cart');
  }}
>
  Buy Now
</Button>

            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-8 text-center">Similar Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {similarProducts.map((similarProduct) => (
                <Card 
                  key={similarProduct.id} 
                  className="group hover:shadow-elegant transition-all duration-300 overflow-hidden cursor-pointer"
                  onClick={() => navigateToProduct(similarProduct.id)}
                >
                  <div className="relative">
                    <img 
                      src={similarProduct.image_url || 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=500'}
                      alt={getProductName(similarProduct)}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-2 left-2 bg-primary">
                      {getCategoryName(similarProduct.categories)}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                      {getProductName(similarProduct)}
                    </h3>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-primary">${similarProduct.price}</span>
                      <Button 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(similarProduct);
                        }}
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
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

export default ProductDetail;