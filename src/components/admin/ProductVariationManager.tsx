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
  image_url?: string;
}

interface ProductVariationManagerProps {
  productId: string;
}

// دالة لإعادة تعيين النموذج
const getInitialFormData = () => ({
  variation_type: 'color' as 'color' | 'size' | 'shape',
  variation_value: '',
  price_adjustment: 0,
  stock_quantity: 0,
  image_url: '',
});

const ProductVariationManager: React.FC<ProductVariationManagerProps> = ({ productId }) => {
  const { toast } = useToast();
  const [variations, setVariations] = useState<ProductVariation[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingVariation, setEditingVariation] = useState<ProductVariation | null>(null);
  const [formData, setFormData] = useState(getInitialFormData());

  // -- تعديل 1: إضافة حالة للملف المرفوع والمعاينة --
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false); // حالة لتتبع عملية الرفع

  useEffect(() => {
    fetchVariations();
  }, [productId]);

  const fetchVariations = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('product_variations')
        .select('*')
        .eq('product_id', productId)
        .order('variation_type', { ascending: true })
        .order('variation_value', { ascending: true });

      if (error) throw error;
      setVariations(data || []);
    } catch (error) {
      console.error('Error fetching variations:', error);
      toast({ title: 'Error', description: 'Failed to fetch product variations', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  // -- تعديل 2: دالة للتعامل مع تغيير الملف --
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) {
      // عرض معاينة للصورة المختارة
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    } else {
      // إذا ألغى المستخدم اختيار الملف, نرجع إلى الرابط الموجود في النموذج
      setImagePreview(formData.image_url || null);
    }
  };

  const resetForm = () => {
    setEditingVariation(null);
    setFormData(getInitialFormData());
    setImageFile(null);
    setImagePreview(null);
  };
  
  // -- تعديل 3: تعديل دالة الحفظ لرفع الملف أولاً --
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    
    let finalImageUrl = formData.image_url || '';

    // الخطوة أ: إذا كان هناك ملف جديد, قم برفعه
    if (imageFile) {
      try {
        const filePath = `product_variations/${productId}/${Date.now()}_${imageFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from('product-images') // تأكد من أن اسم الـ bucket صحيح
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        // الخطوة ب: احصل على الرابط العام للملف المرفوع
        const { data: publicUrlData } = supabase.storage
          .from('product-images') // اسم الـ bucket مرة أخرى
          .getPublicUrl(filePath);
        
        finalImageUrl = publicUrlData.publicUrl;

      } catch (uploadError) {
        console.error('Error uploading image:', uploadError);
        toast({ title: 'Upload Error', description: 'Failed to upload the image.', variant: 'destructive' });
        setIsUploading(false);
        return; // أوقف العملية إذا فشل الرفع
      }
    }
    
    const dataToSave = {
      ...formData,
      image_url: finalImageUrl,
    };
    
    try {
      if (editingVariation) {
        // تحديث
        const { error } = await supabase
          .from('product_variations')
          .update(dataToSave)
          .eq('id', editingVariation.id);
        if (error) throw error;
        toast({ title: 'Success', description: 'Variation updated successfully' });
      } else {
        // إضافة جديد
        const { error } = await supabase
          .from('product_variations')
          .insert([{ ...dataToSave, product_id: productId }]);
        if (error) throw error;
        toast({ title: 'Success', description: 'Variation added successfully' });
      }

      setDialogOpen(false);
      resetForm();
      fetchVariations();
    } catch (error) {
      console.error('Error saving variation:', error);
      toast({ title: 'Error', description: 'Failed to save variation', variant: 'destructive' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleEdit = (variation: ProductVariation) => {
    setEditingVariation(variation);
    setFormData({
      variation_type: variation.variation_type,
      variation_value: variation.variation_value,
      price_adjustment: variation.price_adjustment,
      stock_quantity: variation.stock_quantity,
      image_url: variation.image_url || '',
    });
    // عرض الصورة الحالية عند التعديل
    setImagePreview(variation.image_url || null);
    setImageFile(null); // مسح أي ملف قديم
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this variation?')) return;
    try {
      const { error } = await supabase.from('product_variations').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Success', description: 'Variation deleted successfully' });
      fetchVariations();
    } catch (error) {
      console.error('Error deleting variation:', error);
      toast({ title: 'Error', description: 'Failed to delete variation', variant: 'destructive' });
    }
  };

  const groupedVariations = variations.reduce((acc, variation) => {
    if (!acc[variation.variation_type]) acc[variation.variation_type] = [];
    acc[variation.variation_type].push(variation);
    return acc;
  }, {} as Record<string, ProductVariation[]>);

  if (loading) return <div className="animate-pulse">Loading variations...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Product Variations
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" type="button" onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Add Variation
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingVariation ? 'Edit Variation' : 'Add New Variation'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* ... حقول النموذج الأخرى تبقى كما هي ... */}
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
                    onChange={(e) => setFormData(prev => ({ ...prev, variation_value: e.target.value }))}
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

                {/* -- تعديل 4: تحديث حقول الصورة في النموذج -- */}
                <div>
                  <Label htmlFor="image_file">Upload Image (Local)</Label>
                  <Input
                    id="image_file"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={isUploading}
                  />
                </div>

                <div className="text-center text-sm text-muted-foreground my-2">OR</div>

                <div>
                  <Label htmlFor="image_url">Image URL (Link)</Label>
                  <Input
                    id="image_url"
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, image_url: e.target.value }));
                      // إذا لم يكن هناك ملف مختار, اعرض معاينة من الرابط
                      if (!imageFile) {
                        setImagePreview(e.target.value);
                      }
                    }}
                    placeholder="https://example.com/image.png"
                    disabled={isUploading}
                  />
                </div>

                {/* -- تعديل 5: إضافة معاينة للصورة -- */}
                {imagePreview && (
                  <div className="mt-4">
                    <Label>Image Preview</Label>
                    <div className="mt-2 border rounded-md p-2 w-32 h-32 relative">
                   <img
  src={imagePreview}
  alt="Preview"
  className="rounded-md w-full h-full object-cover"
/>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} disabled={isUploading}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isUploading}>
                    {isUploading ? 'Saving...' : (editingVariation ? 'Update' : 'Add') + ' Variation'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {Object.keys(groupedVariations).length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No variations added yet.</p>
        ) : (
          <div className="space-y-4">
            {Object.entries(groupedVariations).map(([type, typeVariations]) => (
              <div key={type}>
                <h4 className="font-semibold capitalize mb-2">{type}</h4>
                <div className="flex flex-wrap gap-3">
                  {typeVariations.map((variation) => (
                    <div key={variation.id} className="flex items-center gap-2 p-2 border rounded-lg shadow-sm">
                      {/* -- تعديل 6: عرض الصورة بجانب تفاصيل الـ variation -- */}
                      {variation.image_url && (
                        <div className="w-10 h-10 relative rounded-md overflow-hidden">
                         <img
  src={variation.image_url}
  alt={variation.variation_value}
  className="w-full h-full object-cover"
/>
                        </div>
                      )}
                      <div>
                        <span>{variation.variation_value}</span>
                        {variation.price_adjustment !== 0 && (
                          <Badge variant="secondary" className="ml-2">
                            {variation.price_adjustment > 0 ? '+' : ''}${variation.price_adjustment}
                          </Badge>
                        )}
                        <Badge variant="outline" className="ml-2">Stock: {variation.stock_quantity}</Badge>
                      </div>
                      <div className="flex gap-1 ml-auto">
                        <Button size="icon" variant="ghost" type="button" onClick={() => handleEdit(variation)} className="h-7 w-7">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" type="button" onClick={() => handleDelete(variation.id)} className="h-7 w-7">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
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