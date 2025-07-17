import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
// Using custom sidebar implementation since @radix-ui/react-sidebar is not available
import { Button } from '@/components/ui/button';
import {
  Package,
  Users,
  ShoppingCart,
  BarChart3,
  Settings,
  LogOut,
  Home,
  MenuIcon,
} from 'lucide-react';

const adminItems = [
  {
    title: 'Dashboard',
    url: '/admin',
    icon: Home,
    key: 'dashboard',
  },
  {
    title: 'Products',
    url: '/admin/products',
    icon: Package,
    key: 'products',
  },
  {
    title: 'Orders',
    url: '/admin/orders',
    icon: ShoppingCart,
    key: 'orders',
  },
  {
    title: 'Customers',
    url: '/admin/customers',
    icon: Users,
    key: 'customers',
  },
  {
    title: 'Analytics',
    url: '/admin/analytics',
    icon: BarChart3,
    key: 'analytics',
  },
  {
    title: 'Settings',
    url: '/admin/settings',
    icon: Settings,
    key: 'settings',
  },
];

export function AdminSidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const location = useLocation();
  const { t } = useLanguage();
  const { signOut } = useAuth();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === '/admin') {
      return currentPath === '/admin';
    }
    return currentPath.startsWith(path);
  };

  const getNavCls = (isActive: boolean) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
      isActive 
        ? "bg-primary/20 text-primary font-medium border-r-2 border-primary" 
        : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
    }`;

  return (
    <aside className={`${collapsed ? "w-16" : "w-64"} bg-background border-r flex flex-col transition-all duration-300`}>
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onToggle}>
            <MenuIcon className="h-4 w-4" />
          </Button>
          {!collapsed && (
            <h2 className="text-lg font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t('adminPanel')}
            </h2>
          )}
        </div>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {!collapsed && (
            <p className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">
              {t('navigation')}
            </p>
          )}
          {adminItems.map((item) => (
            <NavLink 
              key={item.key}
              to={item.url} 
              end={item.url === '/admin'}
              className={({ isActive }) => getNavCls(isActive)}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {!collapsed && <span>{t(item.key)}</span>}
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t">
        <Button
          variant="outline"
          size="sm"
          onClick={signOut}
          className="w-full justify-start"
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && <span className="ml-2">{t('logout')}</span>}
        </Button>
      </div>
    </aside>
  );
}

export default function AdminLayout() {
  const { user, userRole, loading } = useAuth();
  const { t } = useLanguage();
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (!user || userRole !== 'admin') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-4">{t('accessDenied')}</h1>
          <p className="text-muted-foreground">{t('adminAccess')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex w-full">
      <AdminSidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
      <main className="flex-1 overflow-auto">
        <header className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="flex h-16 items-center gap-4 px-6">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="md:hidden"
            >
              <MenuIcon className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2 flex-1">
              <h1 className="text-lg font-semibold">{t('adminDashboard')}</h1>
            </div>
          </div>
        </header>
        
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}