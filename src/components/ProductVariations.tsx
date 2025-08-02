import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProductVariation {
  id: string;
  variation_type: 'color' | 'size' | 'shape';
  variation_value: string;
  price_adjustment: number;
  stock_quantity: number;
}

interface ProductVariationsProps {
  productId: string;
  onSelectionChange: (selections: Record<string, ProductVariation>) => void;
  onValidationChange: (isValid: boolean) => void;
}

const ProductVariations: React.FC<ProductVariationsProps> = ({ productId, onSelectionChange, onValidationChange }) => {
  const { t } = useLanguage();
  const [variations, setVariations] = useState<ProductVariation[]>([]);
  const [selections, setSelections] = useState<Record<string, ProductVariation>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVariations();
  }, [productId]);

  useEffect(() => {
    onSelectionChange(selections);
  }, [selections, onSelectionChange]);

  useEffect(() => {
    if (variations.length === 0) {
      onValidationChange(true);
      return;
    }

    const availableTypes = [...new Set(variations.map(v => v.variation_type))];
    const selectedTypes = Object.keys(selections);
    const isValid = availableTypes.every(type => selectedTypes.includes(type));
    onValidationChange(isValid);
  }, [selections, variations, onValidationChange]);

  const fetchVariations = async () => {
    try {
      const SUPABASE_URL = "https://msuuyvfosqjrmyzenjnd.supabase.co";
      const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zdXV5dmZvc3Fqcm15emVuam5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2NjY2NzgsImV4cCI6MjA2ODI0MjY3OH0.YHWtmfYUcr1rfHlfTRMuTGCMA7VYMOLyf1soiI5T4HM";
      
      const response = await fetch(`${SUPABASE_URL}/rest/v1/product_variations?product_id=eq.${productId}&order=variation_type,variation_value`, {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        console.error('Failed to fetch variations:', response.statusText);
        return;
      }
      
      const data = await response.json();
      setVariations(data || []);
    } catch (error) {
      console.error('Error fetching variations:', error);
    } finally {
      setLoading(false);
    }
  };

  const groupedVariations = variations.reduce((acc, variation) => {
    if (!acc[variation.variation_type]) {
      acc[variation.variation_type] = [];
    }
    acc[variation.variation_type].push(variation);
    return acc;
  }, {} as Record<string, ProductVariation[]>);

  const handleVariationSelect = (type: string, variation: ProductVariation) => {
    setSelections(prev => ({
      ...prev,
      [type]: variation
    }));
  };

  const getVariationTypeLabel = (type: string) => {
    switch (type) {
      case 'color': return t('color') || 'Color';
      case 'size': return t('size') || 'Size';
      case 'shape': return t('shape') || 'Shape';
      default: return type;
    }
  };

  const getTotalPriceAdjustment = () => {
    return Object.values(selections).reduce((total, variation) => total + variation.price_adjustment, 0);
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-muted rounded w-1/4 mb-2"></div>
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-8 bg-muted rounded w-16"></div>
          ))}
        </div>
      </div>
    );
  }

  if (variations.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {Object.entries(groupedVariations).map(([type, typeVariations]) => (
        <div key={type} className="space-y-3">
          <h4 className="font-semibold text-lg">
            {getVariationTypeLabel(type)}
            <span className="text-destructive ml-1">*</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {typeVariations.map((variation) => (
              <Button
                key={variation.id}
                variant={selections[type]?.id === variation.id ? "default" : "outline"}
                size="sm"
                onClick={() => handleVariationSelect(type, variation)}
                disabled={variation.stock_quantity === 0}
                className="relative"
              >
                {variation.variation_value}
                {variation.price_adjustment !== 0 && (
                  <span className="ml-1 text-xs">
                    ({variation.price_adjustment > 0 ? '+' : ''}${variation.price_adjustment})
                  </span>
                )}
                {variation.stock_quantity === 0 && (
                  <Badge variant="destructive" className="absolute -top-2 -right-2 text-xs">
                    Out
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </div>
      ))}
      
      {getTotalPriceAdjustment() !== 0 && (
        <Card>
          <CardContent className="pt-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Price adjustment:</span>
              <span className={`font-bold ${getTotalPriceAdjustment() > 0 ? 'text-red-600' : 'text-green-600'}`}>
                {getTotalPriceAdjustment() > 0 ? '+' : ''}${getTotalPriceAdjustment()}
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProductVariations;