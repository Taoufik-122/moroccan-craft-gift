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

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [sameAsShipping, setSameAsShipping] = useState(true);

  const shippingCost = totalPrice > 100 ? 0 : 15;
  const taxRate = 0.1;
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

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      toast({
        title: "Order Placed Successfully!",
        description: "Thank you for your purchase. You will receive a confirmation email shortly.",
      });
      navigate('/order-success');
    }, 3000);
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

              {/* Billing Information */}
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

              {/* Payment Information */}
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
              </Card>
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
    </div>
  );
};

export default Checkout;