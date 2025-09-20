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
  const [uploadedUrls, setUploadedUrls] = useState<{ id: string; image_url: string }[]>([]);
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
      setUploadedUrls(data || []);
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
      const urls: { id?: string; image_url: string }[] = [];

      for (const file of files) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${file.name}`;
        const filePath = `${productId}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('product-images') // تأكد أن الاسم مطابق للبكت
          .upload(filePath, file);

        if (uploadError) {
          console.error('Upload error:', uploadError);
          throw uploadError;
        }

        const { data: publicUrlData, error: urlError } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);

        if (urlError) throw urlError;
        if (publicUrlData?.publicUrl) {
          urls.push({ image_url: publicUrlData.publicUrl });
        }
      }

      // حفظ الروابط في قاعدة البيانات
      const { error: insertError, data: insertedData } = await supabase
        .from('product_images')
        .insert(
          urls.map(url => ({ product_id: productId, image_url: url.image_url }))
        )
        .select();

      if (insertError) throw insertError;

      setUploadedUrls(prev => [...prev, ...(insertedData || [])]);
      setFiles([]);
      toast({ title: 'Success', description: 'Images uploaded successfully' });
    } catch (error) {
      console.error('Upload failed:', error);
      toast({ title: 'Error', description: 'Failed to upload images', variant: 'destructive' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string, url: string) => {
    try {
      // حذف من قاعدة البيانات
      const { error } = await supabase
        .from('product_images')
        .delete()
        .eq('id', id);
      if (error) throw error;

      // حذف من التخزين
      const filePath = url.split('/').slice(-3).join('/'); // استخراج مسار الصورة
      await supabase.storage.from('product-images').remove([filePath]);

      setUploadedUrls(prev => prev.filter(u => u.id !== id));
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

      <div className="flex gap-2 flex-wrap mt-4">
        {uploadedUrls.map((img) => (
          <div key={img.id} className="relative">
            <img src={img.image_url} alt="Product" className="w-24 h-24 object-cover rounded-lg" />
            <Button
              size="sm"
              variant="destructive"
              className="absolute top-0 right-0"
              onClick={() => handleDelete(img.id!, img.image_url)}
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
