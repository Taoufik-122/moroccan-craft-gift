import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();
  const { t } = useLanguage();

  const shippingCost = totalPrice > 100 ? 0 : 15;
  const taxRate = 0;
  const taxAmount = totalPrice * taxRate;
  const finalTotal = totalPrice + shippingCost + taxAmount;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-foreground mb-4">{t('cart.title')}</h1>
            <p className="text-lg text-muted-foreground mb-8">{t('cart.empty')}</p>
            <Link to="/products">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t('cart.continueShopping')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">{t('cart.title')}</h1>
          <p className="text-muted-foreground">{totalItems} items in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    {/* Product Image */}
                    <div className="h-20 w-20 bg-muted rounded-lg flex-shrink-0 overflow-hidden">
                      <div className="h-full w-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">Image</span>
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">{item.name}</h3>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                        className="w-16 text-center h-8"
                        min="1"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="font-semibold text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">${item.price} each</p>
                    </div>

                    {/* Remove Button */}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="border-border/50 sticky top-4">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-6">Order Summary</h2>
                
                <div className="space-y-4">
                  {/* Subtotal */}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('common.subtotal')}</span>
                    <span className="font-medium">${totalPrice.toFixed(2)}</span>
                  </div>

                  {/* Shipping */}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('common.shipping')}</span>
                    <span className="font-medium">
                      {shippingCost === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `$${shippingCost.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  
                  {totalPrice < 100 && (
                    <p className="text-xs text-muted-foreground">
                      Add ${(100 - totalPrice).toFixed(2)} more for free shipping
                    </p>
                  )}

                  {/* Tax */}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('common.tax')} (10%)</span>
                    <span className="font-medium">${taxAmount.toFixed(2)}</span>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-foreground">{t('common.total')}</span>
                      <span className="text-lg font-bold text-primary">${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <Link to="/checkout" className="block">
                    <Button size="lg" className="w-full bg-gradient-primary hover:opacity-90 shadow-warm">
                      {t('cart.proceedToCheckout')}
                    </Button>
                  </Link>

                  {/* Continue Shopping */}
                  <Link to="/products">
                    <Button variant="outline" size="lg" className="w-full">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      {t('cart.continueShopping')}
                    </Button>
                  </Link>
                </div>

                {/* Security Badge */}
                <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <div className="h-4 w-4 bg-green-500 rounded-full flex-shrink-0" />
                    <span>Secure checkout with SSL encryption</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
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

export default Cart;