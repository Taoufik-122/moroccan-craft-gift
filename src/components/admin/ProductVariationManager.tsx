import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface ProductVariation {
  id: string;
  variation_type: 'color' | 'size' | 'shape';
  variation_value: string;
  price_adjustment: number;
  stock_quantity: number;
}

interface ProductVariationManagerProps {
  productId: string;
}

const ProductVariationManager: React.FC<ProductVariationManagerProps> = ({ productId }) => {
  const { toast } = useToast();
  const [variations, setVariations] = useState<ProductVariation[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingVariation, setEditingVariation] = useState<ProductVariation | null>(null);
  const [formData, setFormData] = useState({
    variation_type: 'color' as 'color' | 'size' | 'shape',
    variation_value: '',
    price_adjustment: 0,
    stock_quantity: 0,
  });

  useEffect(() => {
    fetchVariations();
  }, [productId]);

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
      
      if (!response.ok) throw new Error('Failed to fetch variations');
      
      const data = await response.json();
      setVariations(data || []);
    } catch (error) {
      console.error('Error fetching variations:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch product variations',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const SUPABASE_URL = "https://msuuyvfosqjrmyzenjnd.supabase.co";
      const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zdXV5dmZvc3Fqcm15emVuam5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2NjY2NzgsImV4cCI6MjA2ODI0MjY3OH0.YHWtmfYUcr1rfHlfTRMuTGCMA7VYMOLyf1soiI5T4HM";
      
      if (editingVariation) {
        // Update variation using direct fetch
        const response = await fetch(`${SUPABASE_URL}/rest/v1/product_variations?id=eq.${editingVariation.id}`, {
          method: 'PATCH',
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (!response.ok) throw new Error('Failed to update variation');
        
        toast({
          title: 'Success',
          description: 'Variation updated successfully',
        });
      } else {
        // Insert variation using direct fetch
        const response = await fetch(`${SUPABASE_URL}/rest/v1/product_variations`, {
          method: 'POST',
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...formData,
            product_id: productId,
          })
        });

        if (!response.ok) throw new Error('Failed to add variation');
        
        toast({
          title: 'Success',
          description: 'Variation added successfully',
        });
      }

      setDialogOpen(false);
      setEditingVariation(null);
      setFormData({
        variation_type: 'color',
        variation_value: '',
        price_adjustment: 0,
        stock_quantity: 0,
      });
      fetchVariations();
    } catch (error) {
      console.error('Error saving variation:', error);
      toast({
        title: 'Error',
        description: 'Failed to save variation',
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (variation: ProductVariation) => {
    setEditingVariation(variation);
    setFormData({
      variation_type: variation.variation_type,
      variation_value: variation.variation_value,
      price_adjustment: variation.price_adjustment,
      stock_quantity: variation.stock_quantity,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this variation?')) return;

    try {
      const SUPABASE_URL = "https://msuuyvfosqjrmyzenjnd.supabase.co";
      const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zdXV5dmZvc3Fqcm15emVuam5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2NjY2NzgsImV4cCI6MjA2ODI0MjY3OH0.YHWtmfYUcr1rfHlfTRMuTGCMA7VYMOLyf1soiI5T4HM";
      
      const response = await fetch(`${SUPABASE_URL}/rest/v1/product_variations?id=eq.${id}`, {
        method: 'DELETE',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        }
      });

      if (!response.ok) throw new Error('Failed to delete variation');
      
      toast({
        title: 'Success',
        description: 'Variation deleted successfully',
      });
      
      fetchVariations();
    } catch (error) {
      console.error('Error deleting variation:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete variation',
        variant: 'destructive',
      });
    }
  };

  const groupedVariations = variations.reduce((acc, variation) => {
    if (!acc[variation.variation_type]) {
      acc[variation.variation_type] = [];
    }
    acc[variation.variation_type].push(variation);
    return acc;
  }, {} as Record<string, ProductVariation[]>);

  if (loading) {
    return <div className="animate-pulse">Loading variations...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Product Variations
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Variation
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingVariation ? 'Edit Variation' : 'Add New Variation'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="variation_type">Type</Label>
                  <Select
                    value={formData.variation_type}
                    onValueChange={(value: 'color' | 'size' | 'shape') =>
                      setFormData(prev => ({ ...prev, variation_type: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="color">Color</SelectItem>
                      <SelectItem value="size">Size</SelectItem>
                      <SelectItem value="shape">Shape</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="variation_value">Value</Label>
                  <Input
                    id="variation_value"
                    value={formData.variation_value}
                    onChange={(e) =>
                      setFormData(prev => ({ ...prev, variation_value: e.target.value }))
                    }
                    placeholder="e.g., Red, Large, Round"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="price_adjustment">Price Adjustment ($)</Label>
                  <Input
                    id="price_adjustment"
                    type="number"
                    step="0.01"
                    value={formData.price_adjustment}
                    onChange={(e) =>
                      setFormData(prev => ({ ...prev, price_adjustment: parseFloat(e.target.value) || 0 }))
                    }
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <Label htmlFor="stock_quantity">Stock Quantity</Label>
                  <Input
                    id="stock_quantity"
                    type="number"
                    min="0"
                    value={formData.stock_quantity}
                    onChange={(e) =>
                      setFormData(prev => ({ ...prev, stock_quantity: parseInt(e.target.value) || 0 }))
                    }
                    required
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingVariation ? 'Update' : 'Add'} Variation
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {Object.keys(groupedVariations).length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            No variations added yet. Click "Add Variation" to create product options.
          </p>
        ) : (
          <div className="space-y-4">
            {Object.entries(groupedVariations).map(([type, typeVariations]) => (
              <div key={type} className="space-y-2">
                <h4 className="font-semibold capitalize">{type}</h4>
                <div className="flex flex-wrap gap-2">
                  {typeVariations.map((variation) => (
                    <div key={variation.id} className="flex items-center gap-2 p-2 border rounded">
                      <span>{variation.variation_value}</span>
                      {variation.price_adjustment !== 0 && (
                        <Badge variant="secondary">
                          {variation.price_adjustment > 0 ? '+' : ''}${variation.price_adjustment}
                        </Badge>
                      )}
                      <Badge variant="outline">
                        Stock: {variation.stock_quantity}
                      </Badge>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit(variation)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(variation.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductVariationManager;