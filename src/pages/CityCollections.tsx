import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, MapPin, Users, Award } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import fesCover from "@/assets/Fes_Maroc_Cover-scaled.webp";

const CityCollections = () => {
  const { t } = useLanguage();

  const cities = [
    {
      name: "Fez",
      arabicName: "فاس",
      specialty: "Copperware & Ceramics",
      description: "The spiritual and cultural capital of Morocco, Fez is renowned for its intricate metalwork and traditional pottery. The artisans of the medina have been perfecting their craft for over 1,000 years.",
      products: 120,
      artisans: 45,
      established: "9th Century",
      image: fesCover,
      gradient: "from-primary to-primary-glow",
      highlights: ["Hand-hammered copper teapots", "Traditional tagines", "Decorative brass items", "Ceramic tiles"]
    },
    {
      name: "Marrakech",
      arabicName: "مراكش",
      specialty: "Leather Goods",
      description: "The Red City is famous for its ancient tanneries and premium leather craftsmanship. Marrakech leather goods are prized worldwide for their quality and traditional techniques.",
      products: 85,
      artisans: 32,
      established: "11th Century",
      image: "photo-1721322800607-8c38375eef04",
      gradient: "from-secondary to-blue-600",
      highlights: ["Genuine leather bags", "Traditional babouches", "Leather poufs", "Handcrafted belts"]
    },
    {
      name: "Rabat",
      arabicName: "الرباط",
      specialty: "Carpets & Textiles",
      description: "The capital city is the heart of Morocco's textile industry, producing some of the finest Berber carpets and traditional fabrics using ancestral weaving techniques.",
      products: 95,
      artisans: 38,
      established: "12th Century",
      image: "photo-1482881497185-d4a9ddbe4151",
      gradient: "from-accent to-yellow-500",
      highlights: ["Berber wool carpets", "Handwoven kilims", "Traditional fabrics", "Decorative textiles"]
    },
    {
      name: "Tetouan",
      arabicName: "تطوان",
      specialty: "Embroidery & Textiles",
      description: "Known as the White Dove, Tetouan is celebrated for its exquisite embroidery work and traditional clothing, blending Andalusian and Moroccan influences.",
      products: 67,
      artisans: 28,
      established: "14th Century",
      image: "photo-1466442929976-97f336a657be",
      gradient: "from-emerald-500 to-teal-600",
      highlights: ["Embroidered kaftans", "Traditional caftans", "Decorative cushions", "Handmade textiles"]
    },
    {
      name: "Meknes",
      arabicName: "مكناس",
      specialty: "Pottery & Ceramics",
      description: "The Imperial City of Meknes is renowned for its beautiful pottery and ceramic work, featuring intricate geometric patterns and vibrant colors.",
      products: 78,
      artisans: 25,
      established: "10th Century",
      image: "photo-1466442929976-97f336a657be",
      gradient: "from-purple-500 to-pink-600",
      highlights: ["Traditional tagines", "Decorative pottery", "Ceramic tiles", "Handpainted dishes"]
    },
    {
      name: "Essaouira",
      arabicName: "الصويرة",
      specialty: "Woodwork & Marquetry",
      description: "The coastal city of Essaouira is famous for its thuya wood crafts and intricate marquetry work, creating beautiful decorative objects and furniture.",
      products: 56,
      artisans: 20,
      established: "15th Century",
      image: "photo-1482881497185-d4a9ddbe4151",
      gradient: "from-blue-500 to-cyan-600",
      highlights: ["Thuya wood boxes", "Decorative furniture", "Inlaid woodwork", "Traditional crafts"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary text-primary-foreground">
            🏛️ Artisan Cities
          </Badge>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Moroccan Artisan Cities
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover the rich heritage and masterful craftsmanship of Morocco's most renowned artisan cities. 
            Each city has developed its own unique specialties, passed down through generations of skilled craftspeople.
          </p>
        </div>

        {/* Cities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {cities.map((city, index) => (
            <Card 
              key={city.name}
              className="group cursor-pointer hover:shadow-warm transition-all duration-300 border-border/50 hover:border-primary/30 overflow-hidden"
            >
              {/* City Header with Background */}
              <div className={`h-32 bg-gradient-to-br ${city.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute top-4 left-6">
                  <MapPin className="h-5 w-5 text-white mb-2" />
                  <h2 className="text-2xl font-bold text-white">{city.name}</h2>
                  <p className="text-white/80">{city.arabicName}</p>
                </div>
                <div className="absolute top-4 right-6 text-right">
                  <p className="text-white/80 text-sm">Est. {city.established}</p>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-white/10 rounded-full blur-xl" />
                <div className="absolute -top-5 -left-5 w-15 h-15 bg-white/5 rounded-full blur-lg" />
              </div>
              
              <CardContent className="p-6">
                {/* Specialty Badge */}
                <Badge className="mb-4 bg-accent text-accent-foreground">
                  {city.specialty}
                </Badge>
                
                {/* Description */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {city.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Award className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Products</p>
                      <p className="font-semibold">{city.products}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 bg-secondary/10 rounded-full flex items-center justify-center">
                      <Users className="h-4 w-4 text-secondary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Artisans</p>
                      <p className="font-semibold">{city.artisans}</p>
                    </div>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-3">Featured Crafts:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {city.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="h-1.5 w-1.5 bg-primary rounded-full" />
                        <span className="text-sm text-muted-foreground">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* CTA Button */}
                <Button 
                  className="w-full justify-between group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
                  variant="outline"
                  onClick={() => window.location.href = `/products?city=${encodeURIComponent(city.name)}`}
                >
                  Explore {city.name} Collection
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action Section */}
        <Card className="bg-gradient-primary text-primary-foreground">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Experience Authentic Moroccan Craftsmanship</h3>
            <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
              Each product in our collection tells a story of tradition, skill, and cultural heritage. 
              Support local artisans and bring home a piece of authentic Morocco.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="secondary" 
                size="lg"
                onClick={() => window.location.href = '/products'}
              >
                Shop All Collections
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                onClick={() => window.location.href = '/about'}
              >
                Learn About Our Artisans
              </Button>
            </div>
          </CardContent>
        </Card>
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

export default CityCollections;