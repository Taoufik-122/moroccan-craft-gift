import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import {
  Settings,
  User,
  Shield,
  Database,
  Globe,
  Bell,
  Save,
} from 'lucide-react';

const AdminSettings = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [settings, setSettings] = useState({
    siteName: 'E-Commerce Store',
    siteDescription: 'Modern e-commerce platform',
    enableRegistration: true,
    enableGoogleAuth: true,
    allowGuestCheckout: true,
    emailNotifications: true,
    smsNotifications: false,
    maintenanceMode: false,
  });

  const handleSaveSettings = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: t('settingsUpdated'),
        description: t('settingsUpdatedSuccess'),
      });
    } catch (error) {
      toast({
        title: t('error'),
        description: t('settingsUpdateError'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const settingsCards = [
    {
      title: t('generalSettings'),
      description: t('basicSiteConfiguration'),
      icon: Settings,
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="siteName">{t('siteName')}</Label>
            <Input
              id="siteName"
              value={settings.siteName}
              onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="siteDescription">{t('siteDescription')}</Label>
            <Input
              id="siteDescription"
              value={settings.siteDescription}
              onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
            />
          </div>
        </div>
      ),
    },
    {
      title: t('userManagement'),
      description: t('userRegistrationAndAuth'),
      icon: User,
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{t('enableUserRegistration')}</Label>
              <p className="text-sm text-muted-foreground">{t('allowNewUserSignups')}</p>
            </div>
            <Switch
              checked={settings.enableRegistration}
              onCheckedChange={(checked) => setSettings({ ...settings, enableRegistration: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{t('googleAuthentication')}</Label>
              <p className="text-sm text-muted-foreground">{t('enableGoogleSignIn')}</p>
            </div>
            <Switch
              checked={settings.enableGoogleAuth}
              onCheckedChange={(checked) => setSettings({ ...settings, enableGoogleAuth: checked })}
            />
          </div>
        </div>
      ),
    },
    {
      title: t('ecommerceSettings'),
      description: t('shoppingAndCheckoutOptions'),
      icon: Shield,
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{t('guestCheckout')}</Label>
              <p className="text-sm text-muted-foreground">{t('allowCheckoutWithoutAccount')}</p>
            </div>
            <Switch
              checked={settings.allowGuestCheckout}
              onCheckedChange={(checked) => setSettings({ ...settings, allowGuestCheckout: checked })}
            />
          </div>
        </div>
      ),
    },
    {
      title: t('notifications'),
      description: t('notificationPreferences'),
      icon: Bell,
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{t('emailNotifications')}</Label>
              <p className="text-sm text-muted-foreground">{t('receiveEmailAlerts')}</p>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{t('smsNotifications')}</Label>
              <p className="text-sm text-muted-foreground">{t('receiveSmsAlerts')}</p>
            </div>
            <Switch
              checked={settings.smsNotifications}
              onCheckedChange={(checked) => setSettings({ ...settings, smsNotifications: checked })}
            />
          </div>
        </div>
      ),
    },
    {
      title: t('systemStatus'),
      description: t('systemMaintenanceAndStatus'),
      icon: Database,
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{t('maintenanceMode')}</Label>
              <p className="text-sm text-muted-foreground">{t('enableMaintenanceMode')}</p>
            </div>
            <Switch
              checked={settings.maintenanceMode}
              onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
            />
          </div>
          <div className="space-y-2">
            <Label>{t('databaseStatus')}</Label>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-muted-foreground">{t('connected')}</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {t('settings')}
        </h1>
        <p className="text-muted-foreground mt-2">
          {t('configureSystemSettings')}
        </p>
      </div>

      <div className="grid gap-6">
        {settingsCards.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <IconComponent className="h-5 w-5" />
                  <CardTitle>{card.title}</CardTitle>
                </div>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {card.content}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Separator />

      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} disabled={isLoading}>
          <Save className="h-4 w-4 mr-2" />
          {isLoading ? t('saving') : t('saveSettings')}
        </Button>
      </div>
    </div>
  );
};

export default AdminSettings;