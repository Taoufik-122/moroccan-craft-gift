import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';

const FeaturedProducts = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  const products = [
    {
      id: 1,
      name: "Handcrafted Copper Teapot",
      arabicName: "إبريق شاي نحاسي",
      city: "Fez",
      price: 89,
      originalPrice: 120,
      rating: 4.8,
      reviews: 24,
      image: "photo-1618160702438-9b02ab6515c9",
      category: "Copperware",
      isNew: true,
      isBestseller: false
    },
    {
      id: 2,
      name: "Traditional Leather Bag",
      arabicName: "حقيبة جلدية تقليدية", 
      city: "Marrakech",
      price: 145,
      originalPrice: null,
      rating: 4.9,
      reviews: 18,
      image: "photo-1721322800607-8c38375eef04",
      category: "Leather Goods",
      isNew: false,
      isBestseller: true
    },
    {
      id: 3,
      name: "Berber Wool Carpet",
      arabicName: "سجادة صوف أمازيغية",
      city: "Rabat", 
      price: 320,
      originalPrice: 450,
      rating: 4.7,
      reviews: 31,
      image: "photo-1482881497185-d4a9ddbe4151",
      category: "Carpets",
      isNew: false,
      isBestseller: false
    },
    {
      id: 4,
      name: "Embroidered Kaftan",
      arabicName: "قفطان مطرز",
      city: "Tetouan",
      price: 198,
      originalPrice: 280,
      rating: 4.6,
      reviews: 12,
      image: "photo-1466442929976-97f336a657be",
      category: "Embroidery",
      isNew: true,
      isBestseller: false
    }
  ];

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-accent text-accent-foreground shadow-gold">
            ⭐ Featured Collection
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Handpicked Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our most popular authentic Moroccan products, chosen for their exceptional quality and craftsmanship
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card 
              key={product.id}
              className="group cursor-pointer hover:shadow-warm transition-all duration-300 border-border/50 hover:border-primary/30 overflow-hidden"
            >
              {/* Product Image */}
              <div className="relative h-64 bg-muted overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {product.isNew && (
                    <Badge className="bg-accent text-accent-foreground text-xs">New</Badge>
                  )}
                  {product.isBestseller && (
                    <Badge className="bg-primary text-primary-foreground text-xs">Bestseller</Badge>
                  )}
                  {product.originalPrice && (
                    <Badge variant="destructive" className="text-xs">
                      -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </Badge>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product.id);
                    }}
                  >
                    <Heart 
                      className={`h-4 w-4 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} 
                    />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                  >
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>

                {/* Quick Add to Cart */}
                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <Button size="sm" className="w-full bg-primary hover:bg-primary-glow shadow-warm">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>

                {/* City Badge */}
                <div className="absolute bottom-3 right-3 opacity-80">
                  <Badge variant="outline" className="bg-white/80 text-xs">
                    {product.city}
                  </Badge>
                </div>
              </div>

              {/* Product Info */}
              <CardContent className="p-4">
                <div className="mb-2">
                  <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
                  <h3 className="font-semibold text-foreground mb-1 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-xs text-muted-foreground opacity-70">
                    {product.arabicName}
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-3 w-3 ${
                          star <= Math.floor(product.rating)
                            ? 'fill-accent text-accent'
                            : 'text-muted-foreground/30'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-primary">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;