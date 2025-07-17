import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Package,
  Users,
  ShoppingCart,
  TrendingUp,
  DollarSign,
  Activity,
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const AdminDashboard = () => {
  const { t } = useLanguage();

  // Fetch dashboard stats
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-dashboard-stats'],
    queryFn: async () => {
      const [
        { count: totalProducts },
        { count: totalOrders },
        { count: totalCustomers },
        { data: recentOrders },
      ] = await Promise.all([
        supabase.from('products').select('*', { count: 'exact', head: true }),
        supabase.from('orders').select('*', { count: 'exact', head: true }),
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase
          .from('orders')
          .select('total_amount')
          .order('created_at', { ascending: false })
          .limit(30),
      ]);

      const totalRevenue = recentOrders?.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0;
      const averageOrderValue = recentOrders?.length ? totalRevenue / recentOrders.length : 0;

      return {
        totalProducts: totalProducts || 0,
        totalOrders: totalOrders || 0,
        totalCustomers: totalCustomers || 0,
        totalRevenue,
        averageOrderValue,
      };
    },
  });

  const dashboardCards = [
    {
      title: t('totalProducts'),
      value: stats?.totalProducts || 0,
      description: t('productsInInventory'),
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: t('totalOrders'),
      value: stats?.totalOrders || 0,
      description: t('ordersProcessed'),
      icon: ShoppingCart,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: t('totalCustomers'),
      value: stats?.totalCustomers || 0,
      description: t('registeredUsers'),
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: t('totalRevenue'),
      value: `${(stats?.totalRevenue || 0).toLocaleString()} MAD`,
      description: t('revenueGenerated'),
      icon: DollarSign,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      title: t('averageOrderValue'),
      value: `${(stats?.averageOrderValue || 0).toFixed(2)} MAD`,
      description: t('perOrderAverage'),
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: t('systemStatus'),
      value: t('operational'),
      description: t('allSystemsRunning'),
      icon: Activity,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {t('dashboard')}
          </h1>
          <p className="text-muted-foreground mt-2">
            {t('dashboardOverview')}
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="space-y-0 pb-2">
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-8 bg-muted rounded w-1/3 mt-2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-3 bg-muted rounded w-3/4"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {t('dashboard')}
        </h1>
        <p className="text-muted-foreground mt-2">
          {t('dashboardOverview')}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {dashboardCards.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${card.bgColor}`}>
                  <IconComponent className={`h-4 w-4 ${card.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t('quickActions')}</CardTitle>
            <CardDescription>
              {t('commonAdminTasks')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid gap-2">
              <a 
                href="/admin/products" 
                className="flex items-center gap-2 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <Package className="h-4 w-4" />
                <span>{t('manageProducts')}</span>
              </a>
              <a 
                href="/admin/orders" 
                className="flex items-center gap-2 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>{t('processOrders')}</span>
              </a>
              <a 
                href="/admin/customers" 
                className="flex items-center gap-2 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <Users className="h-4 w-4" />
                <span>{t('viewCustomers')}</span>
              </a>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('recentActivity')}</CardTitle>
            <CardDescription>
              {t('latestSystemActivity')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-muted-foreground">{t('systemOnline')}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-muted-foreground">{t('databaseConnected')}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-muted-foreground">{t('authenticationActive')}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;