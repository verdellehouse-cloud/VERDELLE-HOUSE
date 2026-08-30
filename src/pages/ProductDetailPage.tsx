import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, ShoppingBag, Check, Truck, RotateCcw, Shield } from 'lucide-react';
import { useProduct, useRelatedProducts } from '@/lib/data';
import { useRouter } from '@/lib/router';
import { useCart } from '@/lib/cart';
import { formatPrice } from '@/lib/format';
import { ProductCard } from '@/components/ProductCard';
import { Spinner, EmptyState, Badge } from '@/components/ui/Primitives';
import { useReveal } from '@/lib/hooks';

export function ProductDetailPage({ id }: { id: string }) {
  const { product, loading, error } = useProduct(id);
  const { products: related } = useRelatedProducts(product);
  const { addItem } = useCart();
  const { navigate } = useRouter();
  const { ref, visible } = useReveal<HTMLDivElement>();

  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [added, setAdded] = useState(false);
  const [zoomOpen, setZoomOpen] = useState(false);

  useEffect(() => {
    setActiveImage(0);
    setSize(product?.sizes[0] ?? '');
    setColor(product?.colors[0] ?? '');
    setAdded(false);
  }, [product]);

  if (loading) return <div className="pt-32"><Spinner label="Preparing the piece" /></div>;
  if (error) return <div className="pt-32"><EmptyState title="Something went wrong" message={error} /></div>;
  if (!product)
    return (
      <div className="pt-32">
        <EmptyState
          title="Piece not found"
          message="This item may no longer be available."
        />
        <div className="text-center -mt-10 mb-20">
          <button className="btn-outline" onClick={() => navigate('/new')}>
            Back to New Arrivals
          </button>
        </div>
      </div>
    );

  const hasSale = product.compare_at_price !== null;
  const handleAdd = () => {
    if (!size || !color) return;
    addItem(product, size, color, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div className="page-enter page-enter-active pt-20">
      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pt-6 pb-2">
        <div className="flex items-center gap-2 text-xs text-stone font-sans tracking-wide">
          <button onClick={() => navigate(`/${product.gender}`)} className="hover:text-bronze capitalize transition-colors">
            {product.gender}
          </button>
          <span>/</span>
          <button
            onClick={() => navigate(`/${product.gender}/${product.category}`)}
            className="hover:text-bronze capitalize transition-colors"
          >
            {product.category}
          </button>
          <span>/</span>
          <span className="text-navy truncate">{product.name}</span>
        </div>
      </div>

      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-8 grid lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Gallery */}
        <div className="flex flex-col-reverse lg:flex-row gap-4">
          {product.images.length > 1 && (
            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible scrollbar-hide">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`flex-shrink-0 w-20 h-24 overflow-hidden border transition-colors ${
                    activeImage === i ? 'border-navy' : 'border-transparent hover:border-bronze/50'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
          <div className="flex-1 relative group">
            <div className="aspect-[3/4] overflow-hidden bg-cream-light cursor-zoom-in" onClick={() => setZoomOpen(true)}>
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
              />
            </div>
            {product.images.length > 1 && (
              <>
                <button
                  aria-label="Previous image"
                  onClick={() =>
                    setActiveImage((i) => (i - 1 + product.images.length) % product.images.length)
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-cream-light/80 backdrop-blur-sm flex items-center justify-center text-navy hover:bg-navy hover:text-cream-light transition-colors lg:opacity-0 lg:group-hover:opacity-100"
                >
                  <ChevronLeft size={18} strokeWidth={1.5} />
                </button>
                <button
                  aria-label="Next image"
                  onClick={() => setActiveImage((i) => (i + 1) % product.images.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-cream-light/80 backdrop-blur-sm flex items-center justify-center text-navy hover:bg-navy hover:text-cream-light transition-colors lg:opacity-0 lg:group-hover:opacity-100"
                >
                  <ChevronRight size={18} strokeWidth={1.5} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="lg:py-4">
          {product.brand_line && <p className="label-tag mb-3">{product.brand_line}</p>}
          <h1 className="font-serif text-4xl md:text-5xl text-navy font-light leading-tight mb-4">
            {product.name}
          </h1>
          {product.badge && (
            <div className="mb-4">
              <Badge label={product.badge} />
            </div>
          )}
          <div className="flex items-center gap-3 mb-8">
            <span className="font-serif text-2xl text-navy">
              {formatPrice(product.price, product.currency)}
            </span>
            {hasSale && (
              <span className="text-stone line-through">
                {formatPrice(product.compare_at_price!, product.currency)}
              </span>
            )}
          </div>

          <div className="section-divider-left mb-6" />

          <p className="font-sans text-base text-stone-dark leading-relaxed mb-8">
            {product.description}
          </p>
          {product.highlights && product.highlights.length > 0 && (
            <ul className="mb-8 space-y-2">
              {product.highlights.map((point, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 font-sans text-sm text-stone-dark leading-relaxed"
                >
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-bronze flex-shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Color selector */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <p className="label-tag">Colour</p>
              <span className="text-xs text-navy capitalize">{color}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`px-4 py-2 text-xs border transition-colors capitalize ${
                    color === c
                      ? 'bg-navy text-cream-light border-navy'
                      : 'border-bronze/30 text-navy hover:border-navy'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Size selector */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <p className="label-tag">Size</p>
              <button className="text-xs text-bronze hover:underline tracking-wide">Size Guide</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`min-w-[3rem] px-3 py-2.5 text-xs border transition-colors ${
                    size === s
                      ? 'bg-navy text-cream-light border-navy'
                      : 'border-bronze/30 text-navy hover:border-navy'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleAdd}
            disabled={!product.in_stock || added}
            className="w-full btn-primary disabled:opacity-60 mb-3"
          >
            {added ? (
              <span className="inline-flex items-center gap-2">
                <Check size={16} strokeWidth={1.5} /> Added to Cart
              </span>
            ) : !product.in_stock ? (
              'Currently Unavailable'
            ) : (
              <span className="inline-flex items-center gap-2">
                <ShoppingBag size={16} strokeWidth={1.5} /> Add to Cart
              </span>
            )}
          </button>

          {product.material && (
            <p className="text-xs text-stone mt-4 mb-6">
              <span className="tracking-widest uppercase">Material:</span> {product.material}
            </p>
          )}

          {/* Service notes */}
          <div className="border-t border-bronze/15 pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <ServiceNote icon={<Truck size={18} strokeWidth={1.5} />} title="Complimentary Shipping" sub="Worldwide, on all orders" />
            <ServiceNote icon={<RotateCcw size={18} strokeWidth={1.5} />} title="30-Day Returns" sub="Easy, no questions" />
            <ServiceNote icon={<Shield size={18} strokeWidth={1.5} />} title="Lifetime Care" sub="Repairs & restoration" />
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section ref={ref} className={`fade-in-section ${visible ? 'is-visible' : ''} py-20 bg-cream-light/60 mt-12`}>
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="text-center mb-12">
              <p className="label-tag mb-3">You May Also Like</p>
              <h2 className="heading-display text-3xl md:text-4xl">Complete the Look</h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Zoom modal */}
      {zoomOpen && (
        <div
          className="fixed inset-0 z-[110] bg-navy/90 flex items-center justify-center p-6 animate-fade-in"
          onClick={() => setZoomOpen(false)}
        >
          <button
            aria-label="Close"
            className="absolute top-6 right-6 text-cream-light/80 hover:text-cream-light"
            onClick={() => setZoomOpen(false)}
          >
            <ChevronRight size={28} strokeWidth={1.5} className="rotate-45" />
          </button>
          <img
            src={product.images[activeImage]}
            alt={product.name}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

function ServiceNote({ icon, title, sub }: { icon: React.ReactNode; title: string; sub: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-bronze">{icon}</span>
      <p className="font-sans text-xs tracking-widest uppercase text-navy">{title}</p>
      <p className="text-xs text-stone">{sub}</p>
    </div>
  );
}
