import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, MapPin } from 'lucide-react';

const CityCollections = () => {
  const cities = [
    {
      name: "Fez",
      arabicName: "فاس",
      specialty: "Copperware & Ceramics",
      description: "Intricate metalwork and traditional pottery from the artisan quarter",
      products: 120,
      image: "photo-1618160702438-9b02ab6515c9", // placeholder
      gradient: "from-primary to-primary-glow"
    },
    {
      name: "Marrakech", 
      arabicName: "مراكش",
      specialty: "Leather Goods",
      description: "Premium leather products from the famous tanneries",
      products: 85,
      image: "photo-1721322800607-8c38375eef04", // placeholder
      gradient: "from-secondary to-blue-600"
    },
    {
      name: "Rabat",
      arabicName: "الرباط", 
      specialty: "Carpets & Textiles",
      description: "Handwoven carpets and traditional textiles",
      products: 95,
      image: "photo-1482881497185-d4a9ddbe4151", // placeholder
      gradient: "from-accent to-yellow-500"
    },
    {
      name: "Tetouan",
      arabicName: "تطوان",
      specialty: "Embroidery",
      description: "Exquisite embroidered fabrics and traditional clothing",
      products: 67,
      image: "photo-1466442929976-97f336a657be", // placeholder
      gradient: "from-emerald-500 to-teal-600"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary text-primary-foreground">
            🏛️ Artisan Cities
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Shop by Moroccan Cities
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Each city in Morocco has its own unique craftsmanship traditions passed down through generations
          </p>
        </div>

        {/* Cities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cities.map((city, index) => (
            <Card 
              key={city.name}
              className="group cursor-pointer hover:shadow-warm transition-all duration-300 border-border/50 hover:border-primary/30 overflow-hidden"
            >
              <div className={`h-48 bg-gradient-to-br ${city.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute top-4 left-4">
                  <MapPin className="h-5 w-5 text-white mb-2" />
                  <h3 className="text-xl font-bold text-white">{city.name}</h3>
                  <p className="text-white/80 text-sm">{city.arabicName}</p>
                </div>
                <div className="absolute bottom-4 right-4">
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    {city.products} products
                  </Badge>
                </div>
                
                {/* Decorative Pattern */}
                <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-white/10 rounded-full blur-xl" />
              </div>
              
              <CardContent className="p-6">
                <div className="mb-3">
                  <h4 className="font-semibold text-primary mb-1">{city.specialty}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {city.description}
                  </p>
                </div>
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-between group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
                  onClick={() => window.location.href = `/products?city=${encodeURIComponent(city.name)}`}
                >
                  Explore Collection
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg" 
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            onClick={() => window.location.href = '/products'}
          >
            View All Collections
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CityCollections;