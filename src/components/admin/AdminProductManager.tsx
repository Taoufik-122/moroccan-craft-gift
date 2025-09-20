import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Package, Archive } from 'lucide-react';
import ProductVariationManager from './ProductVariationManager';
import MultiImageUploader from './MultiImageUploader';


interface Product {
  id: string;
  name_en: string;
  name_fr: string;
  name_ar: string;
  description_en: string;
  description_fr: string;
  description_ar: string;
  price: number;
  image_url: string;
  stock_quantity: number;
  is_active: boolean;
  category_id: string;
  categories: {
    name_en: string;
    name_fr: string;
    name_ar: string;
  };
}

interface Category {
  id: string;
  name_en: string;
  name_fr: string;
  name_ar: string;
}

const AdminProductManager = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    name_en: '',
    name_fr: '',
    name_ar: '',
    description_en: '',
    description_fr: '',
    description_ar: '',
    price: '',
    image_url: '',
    stock_quantity: '',
    category_id: '',
    is_active: true,
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories (
            name_en,
            name_fr,
            name_ar
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      toast({
        title: t('error'),
        description: 'Failed to fetch products',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name_en');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      name_en: formData.name_en,
      name_fr: formData.name_fr,
      name_ar: formData.name_ar,
      description_en: formData.description_en,
      description_fr: formData.description_fr,
      description_ar: formData.description_ar,
      price: parseFloat(formData.price),
      image_url: formData.image_url,
      stock_quantity: parseInt(formData.stock_quantity),
      category_id: formData.category_id,
      is_active: formData.is_active,
    };

    try {
      if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProduct.id);

        if (error) throw error;
        
        toast({
          title: t('success'),
          description: 'Product updated successfully',
        });
      } else {
        const { error } = await supabase
          .from('products')
          .insert(productData);

        if (error) throw error;
        
        toast({
          title: t('success'),
          description: 'Product created successfully',
        });
      }

      resetForm();
      setIsDialogOpen(false);
      fetchProducts();
    } catch (error) {
      toast({
        title: t('error'),
        description: 'Failed to save product',
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name_en: product.name_en,
      name_fr: product.name_fr,
      name_ar: product.name_ar,
      description_en: product.description_en,
      description_fr: product.description_fr,
      description_ar: product.description_ar,
      price: product.price.toString(),
      image_url: product.image_url,
      stock_quantity: product.stock_quantity.toString(),
      category_id: product.category_id,
      is_active: product.is_active,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) throw error;
      
      toast({
        title: t('success'),
        description: 'Product deleted successfully',
      });
      
      fetchProducts();
    } catch (error) {
      toast({
        title: t('error'),
        description: 'Failed to delete product',
        variant: 'destructive',
      });
    }
  };

  const toggleProductStatus = async (productId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ is_active: !currentStatus })
        .eq('id', productId);

      if (error) throw error;
      
      toast({
        title: t('success'),
        description: `Product ${!currentStatus ? 'activated' : 'deactivated'} successfully`,
      });
      
      fetchProducts();
    } catch (error) {
      toast({
        title: t('error'),
        description: 'Failed to update product status',
        variant: 'destructive',
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name_en: '',
      name_fr: '',
      name_ar: '',
      description_en: '',
      description_fr: '',
      description_ar: '',
      price: '',
      image_url: '',
      stock_quantity: '',
      category_id: '',
      is_active: true,
    });
    setEditingProduct(null);
  };

  const getProductName = (product: Product) => {
    switch (language) {
      case 'fr': return product.name_fr;
      case 'ar': return product.name_ar;
      default: return product.name_en;
    }
  };

  const getCategoryName = (category: any) => {
    switch (language) {
      case 'fr': return category.name_fr;
      case 'ar': return category.name_ar;
      default: return category.name_en;
    }
  };



const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  setIsUploading(true);

  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `product-images/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('product-images') // تأكد أن لديك bucket بهذا الاسم في Supabase
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: publicUrlData } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);

    if (publicUrlData?.publicUrl) {
      setFormData(prev => ({ ...prev, image_url: publicUrlData.publicUrl }));
      toast({
        title: t('success'),
        description: 'Image uploaded successfully',
      });
    }
  } catch (error) {
    console.error(error);
    toast({
      title: t('error'),
      description: 'Failed to upload image',
      variant: 'destructive',
    });
  } finally {
    setIsUploading(false);
  }
};

  
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">{t('productManagement')}</h2>
          <p className="text-muted-foreground">{t('manageYourProducts')}</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              {t('addProduct')}
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? t('editProduct') : t('addProduct')}
              </DialogTitle>
              <DialogDescription>
                {editingProduct ? t('editProductDescription') : t('addProductDescription')}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name_en">{t('nameEnglish')}</Label>
                  <Input
                    id="name_en"
                    value={formData.name_en}
                    onChange={(e) => setFormData(prev => ({ ...prev, name_en: e.target.value }))}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="name_fr">{t('nameFrench')}</Label>
                  <Input
                    id="name_fr"
                    value={formData.name_fr}
                    onChange={(e) => setFormData(prev => ({ ...prev, name_fr: e.target.value }))}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="name_ar">{t('nameArabic')}</Label>
                  <Input
                    id="name_ar"
                    value={formData.name_ar}
                    onChange={(e) => setFormData(prev => ({ ...prev, name_ar: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="description_en">{t('descriptionEnglish')}</Label>
                  <Textarea
                    id="description_en"
                    value={formData.description_en}
                    onChange={(e) => setFormData(prev => ({ ...prev, description_en: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description_fr">{t('descriptionFrench')}</Label>
                  <Textarea
                    id="description_fr"
                    value={formData.description_fr}
                    onChange={(e) => setFormData(prev => ({ ...prev, description_fr: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description_ar">{t('descriptionArabic')}</Label>
                  <Textarea
                    id="description_ar"
                    value={formData.description_ar}
                    onChange={(e) => setFormData(prev => ({ ...prev, description_ar: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category_id">{t('category')}</Label>
                  <Select
                    value={formData.category_id}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category_id: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('selectCategory')} />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {getCategoryName(category)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">{t('price')} (MAD)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stock_quantity">{t('stockQuantity')}</Label>
                  <Input
                    id="stock_quantity"
                    type="number"
                    value={formData.stock_quantity}
                    onChange={(e) => setFormData(prev => ({ ...prev, stock_quantity: e.target.value }))}
                    required
                  />
                </div>
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

                <div className="space-y-2">
                  <Label htmlFor="image_url">{t('imageUrl')}</Label>
                  <Input
                    id="image_url"
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  {t('cancel')}
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? t('saving') : (editingProduct ? t('updateProduct') : t('addProduct'))}
                </Button>
              </DialogFooter>
              
{editingProduct && (
  <div className="p-4 border rounded-lg">
    <MultiImageUploader productId={editingProduct.id} />
  </div>
)}


              {/* Product Variations Section */}
              {editingProduct && (
                <div className="pt-6 border-t">
                  <ProductVariationManager productId={editingProduct.id} />
                </div>
                
              )}
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {products.map((product) => (
          <Card key={product.id}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <img
                  src={product.image_url}
                  alt={getProductName(product)}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{getProductName(product)}</h3>
                      <p className="text-sm text-muted-foreground">
                        {getCategoryName(product.categories)}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge variant={product.is_active ? "default" : "secondary"}>
                        {product.is_active ? t('active') : t('inactive')}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{t('price')}: {product.price} MAD</span>
                    <span>{t('stock')}: {product.stock_quantity}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleProductStatus(product.id, product.is_active)}
                  >
                    <Archive className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(product)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminProductManager;