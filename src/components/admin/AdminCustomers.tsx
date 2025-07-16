import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Search, User, Mail, Phone, MapPin } from 'lucide-react';

interface Customer {
  id: string;
  user_id: string;
  display_name: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  role: string;
  created_at: string;
  email?: string;
  total_orders?: number;
  total_spent?: number;
}

const AdminCustomers = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      
      // Get all profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Get user emails from auth.users table via RPC or by joining
      // For now, we'll fetch additional user data separately
      const customersWithStats = await Promise.all(
        (profiles || []).map(async (profile) => {
          try {
            // Get order statistics for each customer
            const { data: orderStats, error: statsError } = await supabase
              .from('orders')
              .select('total_amount')
              .eq('user_id', profile.user_id);

            if (statsError) {
              console.error('Error fetching order stats:', statsError);
            }

            const totalOrders = orderStats?.length || 0;
            const totalSpent = orderStats?.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0;

            return {
              ...profile,
              total_orders: totalOrders,
              total_spent: totalSpent,
            };
          } catch (error) {
            console.error('Error processing customer:', error);
            return {
              ...profile,
              total_orders: 0,
              total_spent: 0,
            };
          }
        })
      );

      setCustomers(customersWithStats);
    } catch (error) {
      console.error('Error fetching customers:', error);
      toast({
        title: t('error'),
        description: 'Failed to fetch customers',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.display_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone?.includes(searchTerm) ||
    customer.city?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
          <h2 className="text-2xl font-bold">{t('customerManagement')}</h2>
          <p className="text-muted-foreground">{t('viewAndManageCustomers')}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            {t('searchCustomers')}
          </CardTitle>
          <CardDescription>
            {t('searchCustomersDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t('searchByNameEmailPhone')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {filteredCustomers.map((customer) => (
          <Card key={customer.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {customer.display_name || 'Unknown User'}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        {customer.email && (
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {customer.email}
                          </div>
                        )}
                        {customer.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {customer.phone}
                          </div>
                        )}
                      </div>
                    </div>

                    {(customer.address || customer.city) && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {[customer.address, customer.city, customer.country]
                          .filter(Boolean)
                          .join(', ')}
                      </div>
                    )}

                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-muted-foreground">
                        {t('totalOrders')}: <span className="font-medium text-foreground">{customer.total_orders}</span>
                      </span>
                      <span className="text-muted-foreground">
                        {t('totalSpent')}: <span className="font-medium text-foreground">{customer.total_spent?.toFixed(2)} MAD</span>
                      </span>
                      <span className="text-muted-foreground">
                        {t('joinedDate')}: <span className="font-medium text-foreground">{formatDate(customer.created_at)}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <Badge variant={customer.role === 'admin' ? 'default' : 'secondary'}>
                    {customer.role}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredCustomers.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">{t('noCustomersFound')}</h3>
              <p className="text-muted-foreground">
                {searchTerm ? t('noCustomersMatchSearch') : t('noCustomersYet')}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminCustomers;