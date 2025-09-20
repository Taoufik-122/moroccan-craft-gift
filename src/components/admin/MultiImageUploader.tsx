import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface MultiImageUploaderProps {
  productId: string;
}

const MultiImageUploader: React.FC<MultiImageUploaderProps> = ({ productId }) => {
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // جلب الصور الموجودة مسبقًا من قاعدة البيانات
  useEffect(() => {
    fetchImages();
  }, [productId]);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from('product_images')
        .select('*')
        .eq('product_id', productId);
      if (error) throw error;
      setUploadedUrls(data?.map(img => img.image_url) || []);
    } catch (error) {
      console.error(error);
      toast({ title: 'Error', description: 'Failed to fetch images', variant: 'destructive' });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFiles(Array.from(e.target.files));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setIsUploading(true);
    try {
      const urls: string[] = [];

      for (const file of files) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${file.name}`;
        const filePath = `product-images/${productId}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);

        if (publicUrlData?.publicUrl) urls.push(publicUrlData.publicUrl);
      }

      // حفظ الروابط في قاعدة البيانات
      await supabase.from('product_images').insert(
        urls.map(url => ({ product_id: productId, image_url: url }))
      );

      setUploadedUrls(prev => [...prev, ...urls]);
      setFiles([]);
      toast({ title: 'Success', description: 'Images uploaded successfully' });
    } catch (error) {
      console.error(error);
      toast({ title: 'Error', description: 'Failed to upload images', variant: 'destructive' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (url: string) => {
    try {
      // حذف من قاعدة البيانات
      const { error } = await supabase
        .from('product_images')
        .delete()
        .eq('product_id', productId)
        .eq('image_url', url);
      if (error) throw error;

      setUploadedUrls(prev => prev.filter(u => u !== url));
      toast({ title: 'Success', description: 'Image deleted successfully' });
    } catch (error) {
      console.error(error);
      toast({ title: 'Error', description: 'Failed to delete image', variant: 'destructive' });
    }
  };

  return (
    <div className="space-y-4">
      <Input type="file" multiple onChange={handleFileChange} disabled={isUploading} />
      <Button onClick={handleUpload} disabled={isUploading || files.length === 0}>
        {isUploading ? 'Uploading...' : 'Upload Images'}
      </Button>

      <div className="flex gap-2 flex-wrap">
        {uploadedUrls.map(url => (
          <div key={url} className="relative">
            <img src={url} alt="Product" className="w-24 h-24 object-cover rounded-lg" />
            <Button
              size="sm"
              variant="destructive"
              className="absolute top-0 right-0"
              onClick={() => handleDelete(url)}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiImageUploader;
