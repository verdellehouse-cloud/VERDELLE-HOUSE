import { useMemo, useState } from 'react';
import { useProducts } from '@/lib/data';
import { ProductCard } from '@/components/ProductCard';
import { Spinner, EmptyState } from '@/components/ui/Primitives';
import type { Product } from '@/types';

export function NewArrivalsPage() {
  const { products, loading } = useProducts();
  const [sort, setSort] = useState<'new' | 'low' | 'high'>('new');

  const items = useMemo(() => {
    const list = products.filter((p) => p.badge === 'new' || p.featured);
    if (sort === 'low') return [...list].sort((a, b) => a.price - b.price);
    if (sort === 'high') return [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [products, sort]);

  return (
    <div className="page-enter page-enter-active pt-24 min-h-screen">
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12">
        <div className="text-center mb-12">
          <p className="label-tag mb-3">Just Arrived</p>
          <h1 className="heading-display text-5xl md:text-6xl">New Arrivals</h1>
          <div className="section-divider" />
          <p className="max-w-xl mx-auto text-stone-dark mt-4">
            The latest pieces from the house — fresh from the atelier, made in small runs.
          </p>
        </div>

        <div className="flex items-center justify-end mb-8">
          <label className="flex items-center gap-2 text-xs text-stone">
            <span className="tracking-widest uppercase">Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="bg-transparent border border-bronze/30 px-3 py-2 text-xs text-navy outline-none cursor-pointer"
            >
              <option value="new">Newest</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </label>
        </div>

        {loading ? (
          <Spinner label="Curating the collection" />
        ) : items.length === 0 ? (
          <EmptyState title="Nothing new yet" message="Check back soon for fresh arrivals." />
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
            {items.map((p: Product) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
