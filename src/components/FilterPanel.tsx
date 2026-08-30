import { useMemo, useState } from 'react';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import type { Product, Category } from '@/types';

interface Filters {
  categories: Category[];
  sizes: string[];
  colors: string[];
  priceMax: number | null;
}

interface FilterPanelProps {
  products: Product[];
  filters: Filters;
  setFilters: (f: Filters) => void;
  availableCategories: { value: Category; label: string }[];
  availablePriceCeiling: number;
}

const PRICE_BANDS = [
  { label: 'All', value: null },
  { label: 'Under $500', value: 500 },
  { label: 'Under $1,000', value: 1000 },
  { label: 'Under $2,500', value: 2500 },
  { label: 'No limit', value: null },
];

export function FilterPanel({
  products,
  filters,
  setFilters,
  availableCategories,
  availablePriceCeiling,
}: FilterPanelProps) {
  const allSizes = useMemo(
    () => Array.from(new Set(products.flatMap((p) => p.sizes))).sort(),
    [products],
  );
  const allColors = useMemo(
    () => Array.from(new Set(products.flatMap((p) => p.colors))).sort(),
    [products],
  );

  const toggle = <K extends keyof Filters>(key: K, value: string) => {
    const arr = filters[key] as string[];
    const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
    setFilters({ ...filters, [key]: next });
  };

  const reset = () =>
    setFilters({ categories: [], sizes: [], colors: [], priceMax: null });

  const activeCount =
    filters.categories.length + filters.sizes.length + filters.colors.length + (filters.priceMax ? 1 : 0);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <p className="label-tag">Refine</p>
        {activeCount > 0 && (
          <button onClick={reset} className="text-xs text-bronze hover:underline tracking-wide">
            Clear ({activeCount})
          </button>
        )}
      </div>

      <FilterGroup label="Category">
        {availableCategories.map((c) => (
          <CheckRow
            key={c.value}
            label={c.label}
            checked={filters.categories.includes(c.value)}
            onChange={() => toggle('categories', c.value)}
          />
        ))}
      </FilterGroup>

      <FilterGroup label="Size">
        <div className="flex flex-wrap gap-2">
          {allSizes.map((s) => (
            <button
              key={s}
              onClick={() => toggle('sizes', s)}
              className={`min-w-[2.5rem] px-2.5 py-1.5 text-xs border transition-colors ${
                filters.sizes.includes(s)
                  ? 'bg-navy text-cream-light border-navy'
                  : 'border-bronze/30 text-navy hover:border-navy'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label="Colour">
        <div className="flex flex-col gap-2">
          {allColors.map((c) => (
            <CheckRow
              key={c}
              label={c}
              checked={filters.colors.includes(c)}
              onChange={() => toggle('colors', c)}
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label="Price">
        <div className="flex flex-col gap-2">
          {PRICE_BANDS.filter((b, i) => i < 4 || availablePriceCeiling > 2500).map((band, i) => {
            const isSelected =
              (band.value === null && filters.priceMax === null && i === 0) ||
              band.value === filters.priceMax;
            return (
              <button
                key={i}
                onClick={() => setFilters({ ...filters, priceMax: band.value })}
                className={`text-left text-sm py-1 transition-colors ${
                  isSelected ? 'text-bronze' : 'text-navy hover:text-bronze'
                }`}
              >
                {band.label}
              </button>
            );
          })}
        </div>
      </FilterGroup>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-bronze/15 pb-5">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full mb-3"
      >
        <span className="font-sans text-xs tracking-ultra uppercase text-navy">{label}</span>
        <ChevronDown
          size={14}
          strokeWidth={1.5}
          className={`text-stone transition-transform ${open ? '' : '-rotate-90'}`}
        />
      </button>
      {open && children}
    </div>
  );
}

function CheckRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button onClick={onChange} className="flex items-center gap-3 py-1.5 group w-full text-left">
      <span
        className={`w-4 h-4 border flex items-center justify-center transition-colors ${
          checked ? 'bg-navy border-navy' : 'border-bronze/40 group-hover:border-navy'
        }`}
      >
        {checked && <span className="w-2 h-2 bg-cream-light" />}
      </span>
      <span className={`text-sm capitalize ${checked ? 'text-navy' : 'text-stone-dark group-hover:text-navy'} transition-colors`}>
        {label}
      </span>
    </button>
  );
}
