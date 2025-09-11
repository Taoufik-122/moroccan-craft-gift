import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { CreditCard, Truck, Shield, Check } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [sameAsShipping, setSameAsShipping] = useState(true);

  const shippingCost = totalPrice > 100 ? 0 : 15;
  const taxRate = 0;
  const taxAmount = totalPrice * taxRate;
  const finalTotal = totalPrice + shippingCost + taxAmount;

  const [formData, setFormData] = useState({
    // Shipping Information
    shippingFirstName: '',
    shippingLastName: '',
    shippingEmail: '',
    shippingPhone: '',
    shippingAddress: '',
    shippingCity: '',
    shippingPostalCode: '',
    shippingCountry: '',
    
    // Billing Information
    billingFirstName: '',
    billingLastName: '',
    billingEmail: '',
    billingAddress: '',
    billingCity: '',
    billingPostalCode: '',
    billingCountry: '',
    
    // Payment Information
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolderName: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to place an order.",
          variant: "destructive",
        });
        navigate('/auth');
        return;
      }

      // Create order in database
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total_amount: finalTotal,
          status: 'pending',
          shipping_address: `${formData.shippingAddress}, ${formData.shippingCity}, ${formData.shippingPostalCode}, ${formData.shippingCountry}`,
          phone: formData.shippingPhone,
          notes: ''
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        unit_price: item.price,
        selected_variations: item.selectedVariations || {}
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      setIsProcessing(false);
      clearCart();
      toast({
        title: "Order Placed Successfully!",
        description: "Thank you for your purchase. You will receive a confirmation email shortly.",
      });
      navigate('/order-success');
    } catch (error) {
      console.error('Error placing order:', error);
      setIsProcessing(false);
      toast({
        title: "Order Failed",
        description: "There was an error placing your order. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">{t('checkout.title')}</h1>
          <p className="text-muted-foreground">Complete your order securely</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Truck className="h-5 w-5 text-primary" />
                    <span>{t('checkout.shipping')}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="shippingFirstName">{t('form.firstName')} *</Label>
                      <Input
                        id="shippingFirstName"
                        value={formData.shippingFirstName}
                        onChange={(e) => handleInputChange('shippingFirstName', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="shippingLastName">{t('form.lastName')} *</Label>
                      <Input
                        id="shippingLastName"
                        value={formData.shippingLastName}
                        onChange={(e) => handleInputChange('shippingLastName', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="shippingEmail">{t('form.email')} *</Label>
                      <Input
                        id="shippingEmail"
                        type="email"
                        value={formData.shippingEmail}
                        onChange={(e) => handleInputChange('shippingEmail', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="shippingPhone">{t('form.phone')} *</Label>
                      <Input
                        id="shippingPhone"
                        value={formData.shippingPhone}
                        onChange={(e) => handleInputChange('shippingPhone', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="shippingAddress">{t('form.address')} *</Label>
                    <Input
                      id="shippingAddress"
                      value={formData.shippingAddress}
                      onChange={(e) => handleInputChange('shippingAddress', e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="shippingCity">{t('form.city')} *</Label>
                      <Input
                        id="shippingCity"
                        value={formData.shippingCity}
                        onChange={(e) => handleInputChange('shippingCity', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="shippingPostalCode">{t('form.postalCode')} *</Label>
                      <Input
                        id="shippingPostalCode"
                        value={formData.shippingPostalCode}
                        onChange={(e) => handleInputChange('shippingPostalCode', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="shippingCountry">{t('form.country')} *</Label>
                      <Select onValueChange={(value) => handleInputChange('shippingCountry', value)} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morocco">Morocco</SelectItem>
                          <SelectItem value="france">France</SelectItem>
                          <SelectItem value="spain">Spain</SelectItem>
                          <SelectItem value="usa">United States</SelectItem>
                          <SelectItem value="canada">Canada</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Billing Information 
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CreditCard className="h-5 w-5 text-primary" />
                      <span>{t('checkout.billing')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="sameAsShipping"
                        checked={sameAsShipping}
                        onCheckedChange={(checked) => setSameAsShipping(checked === true)}
                      />
                      <Label htmlFor="sameAsShipping" className="text-sm">
                        Same as shipping address
                      </Label>
                    </div>
                  </CardTitle>
                </CardHeader>
                
                {!sameAsShipping && (
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="billingFirstName">{t('form.firstName')} *</Label>
                        <Input
                          id="billingFirstName"
                          value={formData.billingFirstName}
                          onChange={(e) => handleInputChange('billingFirstName', e.target.value)}
                          required={!sameAsShipping}
                        />
                      </div>
                      <div>
                        <Label htmlFor="billingLastName">{t('form.lastName')} *</Label>
                        <Input
                          id="billingLastName"
                          value={formData.billingLastName}
                          onChange={(e) => handleInputChange('billingLastName', e.target.value)}
                          required={!sameAsShipping}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="billingAddress">{t('form.address')} *</Label>
                      <Input
                        id="billingAddress"
                        value={formData.billingAddress}
                        onChange={(e) => handleInputChange('billingAddress', e.target.value)}
                        required={!sameAsShipping}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="billingCity">{t('form.city')} *</Label>
                        <Input
                          id="billingCity"
                          value={formData.billingCity}
                          onChange={(e) => handleInputChange('billingCity', e.target.value)}
                          required={!sameAsShipping}
                        />
                      </div>
                      <div>
                        <Label htmlFor="billingPostalCode">{t('form.postalCode')} *</Label>
                        <Input
                          id="billingPostalCode"
                          value={formData.billingPostalCode}
                          onChange={(e) => handleInputChange('billingPostalCode', e.target.value)}
                          required={!sameAsShipping}
                        />
                      </div>
                      <div>
                        <Label htmlFor="billingCountry">{t('form.country')} *</Label>
                        <Select onValueChange={(value) => handleInputChange('billingCountry', value)} required={!sameAsShipping}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="morocco">Morocco</SelectItem>
                            <SelectItem value="france">France</SelectItem>
                            <SelectItem value="spain">Spain</SelectItem>
                            <SelectItem value="usa">United States</SelectItem>
                            <SelectItem value="canada">Canada</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card> 
               Payment Information 
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <span>{t('checkout.payment')}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="cardHolderName">Cardholder Name *</Label>
                    <Input
                      id="cardHolderName"
                      value={formData.cardHolderName}
                      onChange={(e) => handleInputChange('cardHolderName', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="cardNumber">Card Number *</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date *</Label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV *</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={(e) => handleInputChange('cvv', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>*/}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items */}
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>{t('common.subtotal')}</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>{t('common.shipping')}</span>
                      <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>{t('common.tax')}</span>
                      <span>${taxAmount.toFixed(2)}</span>
                    </div>
                    
                    <div className="border-t border-border pt-2">
                      <div className="flex justify-between font-bold text-lg">
                        <span>{t('common.total')}</span>
                        <span className="text-primary">${finalTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-gradient-primary hover:opacity-90" 
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        {t('checkout.placeOrder')}
                      </>
                    )}
                  </Button>

                  <div className="text-xs text-muted-foreground text-center">
                    Your payment information is secure and encrypted
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
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

export default Checkout;