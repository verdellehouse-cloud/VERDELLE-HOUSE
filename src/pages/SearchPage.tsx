import { useMemo, useState } from 'react';
import { useProducts } from '@/lib/data';
import { useRouter } from '@/lib/router';
import { ProductCard } from '@/components/ProductCard';
import { Spinner, EmptyState } from '@/components/ui/Primitives';
import { Search as SearchIcon } from 'lucide-react';

export function SearchPage() {
  const { route } = useRouter();
  const q = route.query.get('q') ?? '';
  const { products, loading } = useProducts();
  const [term, setTerm] = useState(q);

  const results = useMemo(() => {
    if (!q.trim()) return products;
    const needle = q.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(needle) ||
        p.category.toLowerCase().includes(needle) ||
        p.gender.toLowerCase().includes(needle) ||
        (p.brand_line?.toLowerCase().includes(needle) ?? false) ||
        p.colors.some((c) => c.toLowerCase().includes(needle)) ||
        p.description.toLowerCase().includes(needle),
    );
  }, [products, q]);

  return (
    <div className="page-enter page-enter-active pt-24 min-h-screen">
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12">
        <div className="text-center mb-12">
          <p className="label-tag mb-3">Search the House</p>
          <div className="max-w-md mx-auto relative">
            <SearchIcon
              size={18}
              strokeWidth={1.5}
              className="absolute left-0 top-1/2 -translate-y-1/2 text-stone"
            />
            <input
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Search pieces, materials, colours…"
              className="w-full border-b border-bronze/40 bg-transparent pl-7 pr-2 py-3 font-serif text-xl text-navy placeholder:text-stone/60 outline-none focus:border-navy"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && term.trim()) {
                  window.location.hash = `/search?q=${encodeURIComponent(term.trim())}`;
                }
              }}
            />
          </div>
        </div>

        {q && (
          <p className="text-center text-sm text-stone mb-8">
            {loading ? 'Searching…' : `${results.length} result${results.length === 1 ? '' : 's'} for “${q}”`}
          </p>
        )}

        {loading ? (
          <Spinner label="Searching" />
        ) : results.length === 0 ? (
          <EmptyState
            title="No pieces found"
            message="Try a different word — or browse the collections from the menu."
          />
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
            {results.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
