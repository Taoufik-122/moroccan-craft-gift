import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Package, Truck, Home } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const OrderSuccess = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-pattern-moroccan bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-8">
          <CheckCircle className="h-20 w-20 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-foreground mb-2">Order Placed Successfully!</h1>
          <p className="text-xl text-muted-foreground">Thank you for choosing Moroccan Craft Gift</p>
        </div>

        <Card className="mb-8 shadow-elegant">
          <CardHeader className="bg-gradient-primary text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <Package className="h-6 w-6" />
              <span>Your Order Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-3 text-foreground">Order Information</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p><strong>Order Number:</strong> MCG-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                  <p><strong>Order Date:</strong> {new Date().toLocaleDateString()}</p>
                  <p><strong>Estimated Delivery:</strong> 5-7 business days</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-3 text-foreground">Next Steps</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Confirmation email sent to your inbox</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Package className="h-5 w-5 text-accent mt-0.5" />
                    <span className="text-muted-foreground">Your order is being prepared</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Truck className="h-5 w-5 text-tertiary mt-0.5" />
                    <span className="text-muted-foreground">Tracking information will be provided</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-warm">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Experience Authentic Moroccan Craftsmanship
            </h3>
            <p className="text-muted-foreground mb-6">
              Each item in your order has been carefully crafted by skilled Moroccan artisans using traditional techniques 
              passed down through generations. You're not just purchasing a product - you're supporting local communities 
              and preserving cultural heritage.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-gradient-primary hover:opacity-90">
                <Link to="/">
                  <Home className="h-4 w-4 mr-2" />
                  Continue Shopping
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                <Link to="/products">
                  Explore More Crafts
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8 text-muted-foreground">
          <p>Need help? Contact our customer service at <strong>support@moroccancraftgift.com</strong></p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;