import { useMemo, useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import type { Gender, Category, Product } from '@/types';
import { useProducts } from '@/lib/data';
import { useRouter } from '@/lib/router';
import { ProductCard } from '@/components/ProductCard';
import { FilterPanel } from '@/components/FilterPanel';
import { Spinner, EmptyState } from '@/components/ui/Primitives';

const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'clothing', label: 'Clothing' },
  { value: 'shoes', label: 'Shoes' },
  { value: 'jewelry', label: 'Jewelry' },
  { value: 'watches', label: 'Watches' },
  { value: 'accessories', label: 'Accessories' },
];

interface CategoryPageProps {
  gender: Gender;
  initialCategory?: Category;
  title: string;
  subtitle: string;
  heroImage: string;
}

interface Filters {
  categories: Category[];
  sizes: string[];
  colors: string[];
  priceMax: number | null;
}

export function CategoryPage({ gender, initialCategory, title, subtitle, heroImage }: CategoryPageProps) {
  const { route, navigate } = useRouter();
  const [filters, setFilters] = useState<Filters>({
    categories: initialCategory ? [initialCategory] : [],
    sizes: [],
    colors: [],
    priceMax: null,
  });
  const [sort, setSort] = useState<'new' | 'low' | 'high'>('new');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const activeCategory = (route.segments[1] as Category) || initialCategory;
  const { products, loading, error } = useProducts({ gender });

  const filtered = useMemo(() => {
    let list = products;
    if (activeCategory) list = list.filter((p) => p.category === activeCategory);
    if (filters.categories.length) list = list.filter((p) => filters.categories.includes(p.category));
    if (filters.sizes.length)
      list = list.filter((p) => p.sizes.some((s) => filters.sizes.includes(s)));
    if (filters.colors.length)
      list = list.filter((p) => p.colors.some((c) => filters.colors.includes(c)));
    if (filters.priceMax !== null)
      list = list.filter((p) => p.price <= (filters.priceMax as number));
    if (sort === 'low') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'high') list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [products, activeCategory, filters, sort]);

  const priceCeiling = useMemo(
    () => Math.max(2500, ...products.map((p) => p.price), 2500),
    [products],
  );

  const currentLabel = CATEGORIES.find((c) => c.value === activeCategory)?.label ?? 'All';

  return (
    <div className="page-enter page-enter-active pt-20">
      {/* Hero */}
      <section className="relative h-[42vh] min-h-[320px] overflow-hidden">
        <img src={heroImage} alt={title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-navy/45" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <p className="label-tag text-cream-light mb-3">Verdelle House</p>
          <h1 className="font-serif text-cream-light text-5xl md:text-6xl font-light">{title}</h1>
          <p className="mt-3 text-cream-light/80 font-sans text-sm md:text-base max-w-md">{subtitle}</p>
        </div>
      </section>

      {/* Sub-nav */}
      <nav className="sticky top-[68px] z-30 bg-cream/95 backdrop-blur-md border-b border-bronze/15">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center gap-6 overflow-x-auto scrollbar-hide h-14">
          <button
            onClick={() => navigate(`/${gender}`)}
            className={`font-sans text-xs tracking-ultra uppercase whitespace-nowrap pb-1 border-b-2 transition-colors ${
              !activeCategory ? 'border-bronze text-navy' : 'border-transparent text-stone hover:text-navy'
            }`}
          >
            All
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              onClick={() => navigate(`/${gender}/${c.value}`)}
              className={`font-sans text-xs tracking-ultra uppercase whitespace-nowrap pb-1 border-b-2 transition-colors ${
                activeCategory === c.value ? 'border-bronze text-navy' : 'border-transparent text-stone hover:text-navy'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </nav>

      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12">
        <div className="flex items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="font-serif text-2xl text-navy">{currentLabel}</h2>
            <p className="text-xs text-stone mt-1">
              {loading ? 'Loading…' : `${filtered.length} piece${filtered.length === 1 ? '' : 's'}`}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden flex items-center gap-2 text-xs tracking-widest uppercase text-navy border border-bronze/30 px-4 py-2"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <SlidersHorizontal size={14} strokeWidth={1.5} /> Filters
            </button>
            <label className="flex items-center gap-2 text-xs text-stone">
              <span className="tracking-widest uppercase hidden sm:inline">Sort</span>
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
        </div>

        {error && <EmptyState title="Something went wrong" message={error} />}

        <div className="grid lg:grid-cols-[230px_1fr] gap-10">
          {/* Desktop filters */}
          <aside className="hidden lg:block">
            <FilterPanel
              products={products}
              filters={filters}
              setFilters={setFilters}
              availableCategories={CATEGORIES}
              availablePriceCeiling={priceCeiling}
            />
          </aside>

          <div>
            {loading ? (
              <Spinner label="Curating the collection" />
            ) : filtered.length === 0 ? (
              <EmptyState
                title="No pieces match"
                message="Adjust your filters to see more of the collection."
              />
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
                {filtered.map((p: Product) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mobile filter drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <div className="absolute inset-0 bg-navy/40" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-cream-light p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-serif text-2xl text-navy">Filters</h3>
              <button onClick={() => setMobileFiltersOpen(false)} className="text-stone hover:text-navy">
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>
            <FilterPanel
              products={products}
              filters={filters}
              setFilters={setFilters}
              availableCategories={CATEGORIES}
              availablePriceCeiling={priceCeiling}
            />
            <button
              className="btn-primary w-full mt-8"
              onClick={() => setMobileFiltersOpen(false)}
            >
              Show {filtered.length} pieces
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
