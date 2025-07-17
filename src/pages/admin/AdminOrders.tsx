import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import AdminOrdersComponent from '@/components/admin/AdminOrders';

const AdminOrders = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {t('orders')}
        </h1>
        <p className="text-muted-foreground mt-2">
          {t('manageCustomerOrders')}
        </p>
      </div>
      
      <AdminOrdersComponent />
    </div>
  );
};

export default AdminOrders;