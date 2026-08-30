import { useEffect, useState } from 'react';
import { PRODUCTS } from '@/lib/products-data';
import type { Product, Gender, Category } from '@/types';

interface UseProductsOptions {
  gender?: Gender;
  category?: Category;
  featured?: boolean;
  badge?: 'new' | 'bestseller' | 'limited';
}

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
}

/**
 * Reads from the static PRODUCTS catalog (src/lib/products-data.ts) instead
 * of a Supabase table. Kept as a hook with the same shape as before so no
 * page or component needs to change.
 */
export function useProducts(options: UseProductsOptions = {}): UseProductsResult {
  const { gender, category, featured, badge } = options;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let list = [...PRODUCTS].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
    if (gender) list = list.filter((p) => p.gender === gender || p.gender === 'unisex');
    if (category) list = list.filter((p) => p.category === category);
    if (featured !== undefined) list = list.filter((p) => p.featured === featured);
    if (badge) list = list.filter((p) => p.badge === badge);
    setProducts(list);
    setLoading(false);
  }, [gender, category, featured, badge]);

  return { products, loading, error: null };
}

export function useProduct(id: string | undefined): {
  product: Product | null;
  loading: boolean;
  error: string | null;
} {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setProduct(null);
      setLoading(false);
      return;
    }
    const found = PRODUCTS.find((p) => p.id === id) ?? null;
    setProduct(found);
    setLoading(false);
  }, [id]);

  return { product, loading, error: null };
}

export function useRelatedProducts(product: Product | null, limit = 4): {
  products: Product[];
  loading: boolean;
} {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!product) {
      setProducts([]);
      setLoading(false);
      return;
    }
    const candidates = PRODUCTS.filter(
      (p) => p.gender === product.gender && p.id !== product.id,
    );
    const sameCat = candidates.filter((p) => p.category === product.category).slice(0, limit);
    const others = candidates.filter((p) => p.category !== product.category);
    const combined = [...sameCat, ...others].slice(0, limit);
    setProducts(combined);
    setLoading(false);
  }, [product, limit]);

  return { products, loading };
}

/**
 * Newsletter signup. This previously inserted into a Supabase
 * `newsletter_subscribers` table. There's no backend now, so it opens the
 * visitor's email client with a pre-filled message to the house instead.
 * Callers (Footer.tsx, HomePage.tsx) are unchanged.
 */
export async function subscribeNewsletter(email: string): Promise<{ ok: boolean; error?: string }> {
  const subject = encodeURIComponent('Newsletter Signup — Verdelle House');
  const body = encodeURIComponent(
    `Please add this email address to the Verdelle Letter newsletter:\n\n${email}`,
  );
  window.location.href = `mailto:concierge@verdellehouse.com?subject=${subject}&body=${body}`;
  return { ok: true };
}
