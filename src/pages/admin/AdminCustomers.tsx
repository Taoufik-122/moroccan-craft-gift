import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import AdminCustomersComponent from '@/components/admin/AdminCustomers';

const AdminCustomers = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {t('customers')}
        </h1>
        <p className="text-muted-foreground mt-2">
          {t('manageCustomerAccounts')}
        </p>
      </div>
      
      <AdminCustomersComponent />
    </div>
  );
};

export default AdminCustomers;