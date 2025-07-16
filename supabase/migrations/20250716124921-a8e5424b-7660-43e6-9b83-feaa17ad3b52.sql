-- Create enum types
CREATE TYPE public.order_status AS ENUM ('pending', 'processing', 'shipped', 'delivered', 'cancelled');
CREATE TYPE public.user_role AS ENUM ('customer', 'admin');

-- Create profiles table for additional user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  country TEXT DEFAULT 'Morocco',
  role user_role DEFAULT 'customer',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Create categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_fr TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  description_en TEXT,
  description_fr TEXT,
  description_ar TEXT,
  city TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  name_en TEXT NOT NULL,
  name_fr TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  description_en TEXT,
  description_fr TEXT,
  description_ar TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  total_amount DECIMAL(10,2) NOT NULL,
  status order_status DEFAULT 'pending',
  shipping_address TEXT NOT NULL,
  phone TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create order_items table
CREATE TABLE public.order_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Create function to get current user role
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS user_role AS $$
  SELECT role FROM public.profiles WHERE user_id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (public.get_current_user_role() = 'admin');

-- RLS Policies for categories (public read, admin write)
CREATE POLICY "Anyone can view categories" ON public.categories
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage categories" ON public.categories
  FOR ALL USING (public.get_current_user_role() = 'admin');

-- RLS Policies for products (public read, admin write)
CREATE POLICY "Anyone can view active products" ON public.products
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can view all products" ON public.products
  FOR SELECT USING (public.get_current_user_role() = 'admin');

CREATE POLICY "Admins can manage products" ON public.products
  FOR ALL USING (public.get_current_user_role() = 'admin');

-- RLS Policies for orders (users can view their own, admins can view all)
CREATE POLICY "Users can view their own orders" ON public.orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders" ON public.orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all orders" ON public.orders
  FOR SELECT USING (public.get_current_user_role() = 'admin');

CREATE POLICY "Admins can update orders" ON public.orders
  FOR UPDATE USING (public.get_current_user_role() = 'admin');

-- RLS Policies for order_items
CREATE POLICY "Users can view their own order items" ON public.order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create order items for their orders" ON public.order_items
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all order items" ON public.order_items
  FOR SELECT USING (public.get_current_user_role() = 'admin');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON public.categories
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name, role)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data ->> 'display_name', NEW.email),
    'customer'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Insert sample categories
INSERT INTO public.categories (name_en, name_fr, name_ar, description_en, description_fr, description_ar, city, image_url) VALUES
('Fes Copperware', 'Cuivrerie de Fès', 'نحاسيات فاس', 'Traditional copper crafts from Fes', 'Artisanat traditionnel en cuivre de Fès', 'حرف النحاس التقليدية من فاس', 'Fes', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'),
('Marrakech Leather', 'Cuir de Marrakech', 'جلود مراكش', 'Premium leather goods from Marrakech', 'Maroquinerie de qualité de Marrakech', 'منتجات جلدية فاخرة من مراكش', 'Marrakech', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800'),
('Atlas Carpets', 'Tapis de l''Atlas', 'سجاد الأطلس', 'Handwoven carpets from Atlas Mountains', 'Tapis tissés à la main des montagnes de l''Atlas', 'سجاد منسوج يدوياً من جبال الأطلس', 'Atlas Mountains', 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800'),
('Rabat Embroidery', 'Broderie de Rabat', 'تطريز الرباط', 'Exquisite embroidered textiles from Rabat', 'Textiles brodés exquis de Rabat', 'منسوجات مطرزة رائعة من الرباط', 'Rabat', 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800'),
('Pottery & Ceramics', 'Poterie et Céramiques', 'الفخار والسيراميك', 'Traditional Moroccan pottery and ceramics', 'Poterie et céramiques traditionnelles marocaines', 'الفخار والسيراميك المغربي التقليدي', 'Salé', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'),
('Zellige Mosaics', 'Mosaïques Zellige', 'فسيفساء الزليج', 'Handcrafted mosaic tiles', 'Carreaux de mosaïque artisanaux', 'بلاط الفسيفساء المصنوع يدوياً', 'Meknes', 'https://images.unsplash.com/photo-1571845425181-8c3afcfcc0c5?w=800');

-- Insert sample products
INSERT INTO public.products (category_id, name_en, name_fr, name_ar, description_en, description_fr, description_ar, price, image_url, stock_quantity) 
SELECT 
  c.id,
  'Traditional Copper Tray',
  'Plateau en Cuivre Traditionnel',
  'صينية نحاسية تقليدية',
  'Handcrafted copper serving tray with intricate engravings',
  'Plateau de service en cuivre fait main avec gravures complexes',
  'صينية تقديم نحاسية مصنوعة يدوياً بنقوش معقدة',
  89.99,
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
  15
FROM public.categories c WHERE c.name_en = 'Fes Copperware'
LIMIT 1;