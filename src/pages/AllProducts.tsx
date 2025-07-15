import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, ShoppingCart, Star, Eye, Filter } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

const AllProducts = () => {
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');

  const allProducts = [
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
    },
    {
      id: 5,
      name: "Decorative Copper Tray",
      arabicName: "صينية نحاسية مزخرفة",
      city: "Fez",
      price: 75,
      originalPrice: null,
      rating: 4.5,
      reviews: 19,
      image: "photo-1618160702438-9b02ab6515c9",
      category: "Copperware",
      isNew: false,
      isBestseller: true
    },
    {
      id: 6,
      name: "Leather Pouf",
      arabicName: "بوف جلدي",
      city: "Marrakech",
      price: 89,
      originalPrice: 120,
      rating: 4.4,
      reviews: 15,
      image: "photo-1721322800607-8c38375eef04",
      category: "Leather Goods",
      isNew: false,
      isBestseller: false
    },
    {
      id: 7,
      name: "Handwoven Kilim",
      arabicName: "كيليم منسوج يدوياً",
      city: "Rabat",
      price: 180,
      originalPrice: 240,
      rating: 4.8,
      reviews: 22,
      image: "photo-1482881497185-d4a9ddbe4151",
      category: "Carpets",
      isNew: false,
      isBestseller: true
    },
    {
      id: 8,
      name: "Ceramic Tagine",
      arabicName: "طاجين سيراميك",
      city: "Meknes",
      price: 65,
      originalPrice: null,
      rating: 4.7,
      reviews: 28,
      image: "photo-1466442929976-97f336a657be",
      category: "Pottery",
      isNew: true,
      isBestseller: false
    }
  ];

  const cities = ['all', 'Fez', 'Marrakech', 'Rabat', 'Tetouan', 'Meknes'];
  const categories = ['all', 'Copperware', 'Leather Goods', 'Carpets', 'Embroidery', 'Pottery'];
  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-100', label: '$0 - $100' },
    { value: '100-200', label: '$100 - $200' },
    { value: '200-500', label: '$200 - $500' },
    { value: '500+', label: '$500+' }
  ];

  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.arabicName.includes(searchTerm) ||
                         product.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCity = selectedCity === 'all' || product.city === selectedCity;
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    
    let matchesPrice = true;
    if (priceRange !== 'all') {
      if (priceRange === '0-100') matchesPrice = product.price <= 100;
      else if (priceRange === '100-200') matchesPrice = product.price > 100 && product.price <= 200;
      else if (priceRange === '200-500') matchesPrice = product.price > 200 && product.price <= 500;
      else if (priceRange === '500+') matchesPrice = product.price > 500;
    }

    return matchesSearch && matchesCity && matchesCategory && matchesPrice;
  });

  const toggleFavorite = (productId: number) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      arabicName: product.arabicName,
      price: product.price,
      image: product.image,
      city: product.city,
      category: product.category
    });
    
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">{t('nav.products')}</h1>
          <p className="text-muted-foreground">Discover our complete collection of authentic Moroccan handicrafts</p>
        </div>

        {/* Filters */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Filters</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="text-sm font-medium mb-2 block">Search</label>
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* City Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">City</label>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger>
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map(city => (
                    <SelectItem key={city} value={city}>
                      {city === 'all' ? 'All Cities' : city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">Price Range</label>
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select price range" />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map(range => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-muted-foreground">
            Showing {filteredProducts.length} of {allProducts.length} products
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
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
                  <Button
                    size="sm"
                    className="w-full bg-primary hover:bg-primary-glow shadow-warm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {t('common.addToCart')}
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

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-foreground mb-2">No products found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your filters or search terms</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setSelectedCity('all');
                setSelectedCategory('all');
                setPriceRange('all');
              }}
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;