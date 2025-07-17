import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import AdminStats from '@/components/admin/AdminStats';

const AdminAnalytics = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {t('analytics')}
        </h1>
        <p className="text-muted-foreground mt-2">
          {t('businessInsightsAndReports')}
        </p>
      </div>
      
      <AdminStats />
    </div>
  );
};

export default AdminAnalytics;