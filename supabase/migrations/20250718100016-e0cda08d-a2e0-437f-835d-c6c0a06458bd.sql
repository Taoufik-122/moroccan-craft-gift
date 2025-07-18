-- First, insert categories that match the products
INSERT INTO public.categories (name_en, name_ar, name_fr, city, description_en) VALUES
('Copperware', 'نحاسيات', 'Cuivrerie', 'Fez', 'Traditional Moroccan copper crafts'),
('Leather Goods', 'منتجات جلدية', 'Maroquinerie', 'Marrakech', 'Handcrafted leather products'),
('Carpets', 'سجاد', 'Tapis', 'Rabat', 'Traditional Moroccan carpets and rugs'),
('Embroidery', 'تطريز', 'Broderie', 'Tetouan', 'Traditional embroidered clothing'),
('Pottery', 'فخار', 'Poterie', 'Meknes', 'Handmade ceramic and pottery items');

-- Insert the products with their corresponding category IDs
INSERT INTO public.products (
  name_en, name_ar, name_fr, 
  description_en, description_ar, description_fr,
  price, stock_quantity, image_url, category_id, is_active
) VALUES
-- Handcrafted Copper Teapot
(
  'Handcrafted Copper Teapot', 
  'إبريق شاي نحاسي',
  'Théière en cuivre artisanale',
  'Beautiful handcrafted copper teapot from Fez artisans',
  'إبريق شاي نحاسي جميل مصنوع يدوياً من حرفيي فاس',
  'Belle théière en cuivre artisanale des artisans de Fès',
  89.00,
  20,
  'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=500',
  (SELECT id FROM categories WHERE name_en = 'Copperware' LIMIT 1),
  true
),
-- Traditional Leather Bag
(
  'Traditional Leather Bag',
  'حقيبة جلدية تقليدية',
  'Sac en cuir traditionnel',
  'Authentic Moroccan leather bag handcrafted in Marrakech',
  'حقيبة جلدية مغربية أصيلة مصنوعة يدوياً في مراكش',
  'Sac en cuir marocain authentique fabriqué à la main à Marrakech',
  145.00,
  15,
  'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=500',
  (SELECT id FROM categories WHERE name_en = 'Leather Goods' LIMIT 1),
  true
),
-- Berber Wool Carpet
(
  'Berber Wool Carpet',
  'سجادة صوف أمازيغية',
  'Tapis en laine berbère',
  'Traditional Berber wool carpet with authentic patterns',
  'سجادة صوف أمازيغية تقليدية بأنماط أصيلة',
  'Tapis en laine berbère traditionnel avec motifs authentiques',
  320.00,
  8,
  'https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?w=500',
  (SELECT id FROM categories WHERE name_en = 'Carpets' LIMIT 1),
  true
),
-- Embroidered Kaftan
(
  'Embroidered Kaftan',
  'قفطان مطرز',
  'Caftan brodé',
  'Elegant embroidered kaftan from Tetouan craftspeople',
  'قفطان مطرز أنيق من حرفيي تطوان',
  'Caftan brodé élégant des artisans de Tétouan',
  198.00,
  12,
  'https://images.unsplash.com/photo-1466442929976-97f336a657be?w=500',
  (SELECT id FROM categories WHERE name_en = 'Embroidery' LIMIT 1),
  true
),
-- Decorative Copper Tray
(
  'Decorative Copper Tray',
  'صينية نحاسية مزخرفة',
  'Plateau en cuivre décoratif',
  'Ornate copper tray with traditional Fez engravings',
  'صينية نحاسية مزخرفة بنقوش فاس التقليدية',
  'Plateau en cuivre orné de gravures traditionnelles de Fès',
  75.00,
  25,
  'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=500',
  (SELECT id FROM categories WHERE name_en = 'Copperware' LIMIT 1),
  true
),
-- Leather Pouf
(
  'Leather Pouf',
  'بوف جلدي',
  'Pouf en cuir',
  'Comfortable leather pouf perfect for Moroccan decor',
  'بوف جلدي مريح مثالي للديكور المغربي',
  'Pouf en cuir confortable parfait pour la décoration marocaine',
  89.00,
  18,
  'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=500',
  (SELECT id FROM categories WHERE name_en = 'Leather Goods' LIMIT 1),
  true
),
-- Handwoven Kilim
(
  'Handwoven Kilim',
  'كيليم منسوج يدوياً',
  'Kilim tissé à la main',
  'Beautiful handwoven kilim with geometric patterns',
  'كيليم منسوج يدوياً جميل بأنماط هندسية',
  'Beau kilim tissé à la main avec motifs géométriques',
  180.00,
  10,
  'https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?w=500',
  (SELECT id FROM categories WHERE name_en = 'Carpets' LIMIT 1),
  true
),
-- Ceramic Tagine
(
  'Ceramic Tagine',
  'طاجين سيراميك',
  'Tajine en céramique',
  'Traditional ceramic tagine for authentic Moroccan cooking',
  'طاجين سيراميك تقليدي للطبخ المغربي الأصيل',
  'Tajine en céramique traditionnel pour une cuisine marocaine authentique',
  65.00,
  30,
  'https://images.unsplash.com/photo-1466442929976-97f336a657be?w=500',
  (SELECT id FROM categories WHERE name_en = 'Pottery' LIMIT 1),
  true
);