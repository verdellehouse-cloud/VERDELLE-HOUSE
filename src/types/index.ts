export type Gender = 'men' | 'women' | 'unisex';
export type Category = 'clothing' | 'shoes' | 'jewelry' | 'watches' | 'accessories';
export type Badge = 'new' | 'bestseller' | 'limited' | null;

export interface Product {
  id: string;
  name: string;
  brand_line: string | null;
  description: string;
  highlights?: string[]; 
  gender: Gender;
  category: Category;
  price: number;
  compare_at_price: number | null;
  currency: string;
  sizes: string[];
  colors: string[];
  material: string | null;
  badge: Badge;
  images: string[];
  featured: boolean;
  in_stock: boolean;
  created_at: string;
}

export interface CartItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

export interface CartLineKey {
  productId: string;
  size: string;
  color: string;
}
