import { ShoppingBag } from 'lucide-react';
import type { Product } from '@/types';
import { formatPrice } from '@/lib/format';
import { Badge } from '@/components/ui/Primitives';
import { useRouter } from '@/lib/router';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product }: ProductCardProps) {
  const { navigate } = useRouter();
  const image = product.images[0];
  const hoverImage = product.images[1] ?? product.images[0];
  const hasSale = product.compare_at_price !== null;

  return (
    <article
      className="group cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="product-card-image aspect-[3/4] mb-4">
        {product.badge && (
          <div className="absolute top-4 left-4 z-10">
            <Badge label={product.badge} />
          </div>
        )}
        {hasSale && !product.badge && (
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-block px-3 py-1 text-[10px] tracking-ultra uppercase font-sans bg-bronze text-cream-light">
              Sale
            </span>
          </div>
        )}
        <img
          src={image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
        />
        <img
          src={hoverImage}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 scale-105 transition-transform duration-700 ease-luxury"
        />
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            className="w-full bg-navy/90 backdrop-blur-sm text-cream-light py-3 text-[10px] tracking-ultra uppercase flex items-center justify-center gap-2 hover:bg-bronze transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/product/${product.id}`);
            }}
          >
            <ShoppingBag size={14} strokeWidth={1.5} />
            View
          </button>
        </div>
      </div>
      <div className="text-center px-1">
        {product.brand_line && (
          <p className="label-tag mb-1">{product.brand_line}</p>
        )}
        <h3 className="font-serif text-lg text-navy leading-snug">{product.name}</h3>
        <div className="mt-1 flex items-center justify-center gap-2">
          <span className="text-sm text-navy">{formatPrice(product.price, product.currency)}</span>
          {hasSale && (
            <span className="text-xs text-stone line-through">
              {formatPrice(product.compare_at_price!, product.currency)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
