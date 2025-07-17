import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import AdminProductManager from '@/components/admin/AdminProductManager';

const AdminProducts = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {t('products')}
        </h1>
        <p className="text-muted-foreground mt-2">
          {t('manageProductInventory')}
        </p>
      </div>
      
      <AdminProductManager />
    </div>
  );
};

export default AdminProducts;