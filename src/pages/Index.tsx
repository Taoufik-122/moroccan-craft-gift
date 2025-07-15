import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CityCollections from '@/components/CityCollections';
import FeaturedProducts from '@/components/FeaturedProducts';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <CityCollections />
        <FeaturedProducts />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
