import { forwardRef, useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowLeft, Leaf } from 'lucide-react';
import { useRouter } from '@/lib/router';
import { useProducts } from '@/lib/data';
import { useReveal } from '@/lib/hooks';
import { ProductCard } from '@/components/ProductCard';
import { Spinner } from '@/components/ui/Primitives';
import { subscribeNewsletter } from '@/lib/data';
import { Logo } from '@/components/Logo';

export function HomePage() {
  const { navigate } = useRouter();
  const { products: featured, loading } = useProducts({ featured: true });
  const { ref: editorialRef, visible: editorialVisible } = useReveal<HTMLDivElement>();

  return (
    <div className="page-enter page-enter-active">
      <Hero />
      <CategoryBanners />
      <FeaturedCarousel products={featured} loading={loading} onViewAll={() => navigate('/new')} />
      <EditorialSection ref={editorialRef} visible={editorialVisible} onAbout={() => navigate('/about')} />
      <NewsletterTeaser />
    </div>
  );
}

function Hero() {
  const { navigate } = useRouter();
  return (
    <section className="relative h-[100vh] min-h-[640px] w-full overflow-hidden">
      <img
        src="https://images.pexels.com/photos/6311662/pexels-photo-6311662.jpeg"
        alt="Verdelle House editorial"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/30 via-navy/20 to-navy/60" />
      <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
        <div className="animate-fade-up">
          <div className="mb-6 flex justify-center mt-20 md:mt-16">
            <div className="bg-F3E4C9 backdrop-blur-sm rounded-full p-2">
              <Logo variant="mark" className="" />
            </div>
          </div>
          <p className="label-tag text-cream-light mb-5" style={{ animationDelay: '0.1s' }}>
            Verdelle House · Est. MMXXV
          </p>
          <h1 className="font-serif text-cream-light text-5xl md:text-7xl lg:text-8xl font-light leading-[1.05] max-w-4xl text-balance">
            Quietly luxurious,<br />timelessly made.
          </h1>
          <p className="mt-6 max-w-xl mx-auto text-cream-light/85 font-sans text-base md:text-lg leading-relaxed">
            A house of considered design — clothing, shoes, jewelry, watches and accessories
            for men and women, made to be kept.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary" onClick={() => navigate('/women')}>
              Shop Women
            </button>
            <button className="btn-outline !border-cream-light !text-cream-light hover:!bg-cream-light hover:!text-navy" onClick={() => navigate('/men')}>
              Shop Men
            </button>
          </div>
        </div>
      </div>
      {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream-light/70">
        <span className="text-[10px] tracking-ultra uppercase">Scroll</span>
        <div className="w-px h-10 bg-cream-light/40 animate-pulse" />
      </div> */}
    </section>
  );
}

function CategoryBanners() {
  const { navigate } = useRouter();
  const { ref: ref1, visible: v1 } = useReveal<HTMLDivElement>();
  const { ref: ref2, visible: v2 } = useReveal<HTMLDivElement>();

  return (
    <section className="py-20 md:py-28 px-6 lg:px-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-14">
          <p className="label-tag mb-3">Explore the House</p>
          <h2 className="heading-display text-4xl md:text-5xl">Two Wardrobes, One Philosophy</h2>
          <div className="section-divider" />
        </div>
        <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
          <div
            ref={ref1}
            className={`fade-in-section ${v1 ? 'is-visible' : ''} group relative aspect-[4/5] overflow-hidden cursor-pointer`}
            onClick={() => navigate('/men')}
          >
            <img
              src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg"
              alt="Men's collection"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-luxury group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-navy/25 group-hover:bg-navy/35 transition-colors duration-500" />
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-14 text-center">
              <p className="label-tag text-cream-light mb-3">The Gentleman</p>
              <h3 className="font-serif text-cream-light text-4xl md:text-5xl font-light mb-4">Shop Men</h3>
              <span className="inline-flex items-center gap-2 text-cream-light text-xs tracking-ultra uppercase border-b border-cream-light/50 pb-1 group-hover:border-bronze-light group-hover:text-bronze-light transition-colors">
                Discover <ArrowRight size={14} strokeWidth={1.5} />
              </span>
            </div>
          </div>
          <div
            ref={ref2}
            className={`fade-in-section ${v2 ? 'is-visible' : ''} group relative aspect-[4/5] overflow-hidden cursor-pointer`}
            onClick={() => navigate('/women')}
          >
            <img
              src="https://images.pexels.com/photos/1755428/pexels-photo-1755428.jpeg"
              alt="Women's collection"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-luxury group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-navy/25 group-hover:bg-navy/35 transition-colors duration-500" />
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-14 text-center">
              <p className="label-tag text-cream-light mb-3">The Maison</p>
              <h3 className="font-serif text-cream-light text-4xl md:text-5xl font-light mb-4">Shop Women</h3>
              <span className="inline-flex items-center gap-2 text-cream-light text-xs tracking-ultra uppercase border-b border-cream-light/50 pb-1 group-hover:border-bronze-light group-hover:text-bronze-light transition-colors">
                Discover <ArrowRight size={14} strokeWidth={1.5} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedCarousel({ products, loading, onViewAll }: {
  products: ReturnType<typeof useProducts>['products'];
  loading: boolean;
  onViewAll: () => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  useEffect(() => {
    updateArrows();
  }, [products]);

  const scrollBy = (dir: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: 'smooth' });
  };

  return (
    <section className="py-20 md:py-28 bg-cream-light/60">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex items-end justify-between mb-12 gap-6">
          <div>
            <p className="label-tag mb-3">New & Selected</p>
            <h2 className="heading-display text-4xl md:text-5xl">Featured Arrivals</h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              aria-label="Previous"
              onClick={() => scrollBy(-1)}
              disabled={!canLeft}
              className="w-10 h-10 border border-navy/30 flex items-center justify-center text-navy hover:bg-navy hover:text-cream-light transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-navy"
            >
              <ArrowLeft size={16} strokeWidth={1.5} />
            </button>
            <button
              aria-label="Next"
              onClick={() => scrollBy(1)}
              disabled={!canRight}
              className="w-10 h-10 border border-navy/30 flex items-center justify-center text-navy hover:bg-navy hover:text-cream-light transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-navy"
            >
              <ArrowRight size={16} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {loading ? (
          <Spinner label="Curating the collection" />
        ) : (
          <div
            ref={scrollRef}
            onScroll={updateArrows}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 -mx-6 px-6 lg:-mx-10 lg:px-10"
          >
            {products.map((p) => (
              <div
                key={p.id}
                className="snap-start flex-shrink-0 w-[260px] sm:w-[300px]"
              >
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <button className="btn-outline" onClick={onViewAll}>
            View All Arrivals
          </button>
        </div>
      </div>
    </section>
  );
}

const EditorialSection = forwardRef<HTMLDivElement, { visible: boolean; onAbout: () => void }>(
  function EditorialSection({ visible, onAbout }, ref) {
    return (
      <section
        ref={ref}
        className={`fade-in-section ${visible ? 'is-visible' : ''} py-24 md:py-32 px-6 lg:px-10`}
      >
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative aspect-[4/5] overflow-hidden">
            <img
              src="https://images.pexels.com/photos/5886041/pexels-photo-5886041.jpeg"
              alt="The Verdelle atelier"
              className="w-full h-full object-cover"
            />
            <div className="absolute -bottom-6 -right-6 hidden md:block bg-cream-light p-6 max-w-[220px] shadow-lg">
              <Leaf size={20} strokeWidth={1.5} className="text-bronze mb-3" />
              <p className="font-serif italic text-navy text-lg leading-snug">
                "Nature, restraint, and the long view."
              </p>
            </div>
          </div>
          <div>
            <p className="label-tag mb-4">The House of Verdelle</p>
            <h2 className="heading-display text-4xl md:text-5xl mb-6 leading-[1.1]">
              An archive of pieces made to outlast the season.
            </h2>
            <div className="section-divider-left" />
            <p className="font-sans text-base md:text-lg text-stone-dark leading-relaxed mb-5">
              Verdelle House was founded on a single belief: that luxury is not loud. Each piece
              is designed in our Paris atelier and made in small runs by artisans who have spent
              decades perfecting their craft.
            </p>
            <p className="font-sans text-base md:text-lg text-stone-dark leading-relaxed mb-8">
              From hand-welted shoes to brushed signet rings, we choose materials that age
              gracefully — bronze that patinas, cashmere that softens, leather that remembers.
            </p>
            <button className="btn-outline" onClick={onAbout}>
              Read Our Story
            </button>
          </div>
        </div>
      </section>
    );
  },
);

function NewsletterTeaser() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const { ref, visible } = useReveal<HTMLDivElement>();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    const res = await subscribeNewsletter(email.trim());
    if (res.ok) {
      setStatus('done');
      setEmail('');
    } else {
      setStatus('error');
    }
  };

  return (
    <section
      ref={ref}
      className={`fade-in-section ${visible ? 'is-visible' : ''} py-24 md:py-32 px-6 bg-navy text-cream-light`}
    >
      <div className="max-w-2xl mx-auto text-center">
        <p className="label-tag text-bronze-light mb-4">Join the House</p>
        <h2 className="font-serif text-4xl md:text-5xl font-light mb-5 leading-tight">
          Become part of the Verdelle circle.
        </h2>
        <p className="text-cream-light/75 font-sans text-base md:text-lg mb-10 max-w-lg mx-auto">
          Private previews, atelier notes, and first access to limited pieces — delivered with care.
        </p>
        <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="flex-1 bg-transparent border border-cream-light/30 px-5 py-3 text-cream-light placeholder:text-cream-light/50 outline-none font-sans text-sm focus:border-bronze-light"
            required
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-cream-light text-navy px-8 py-3 text-xs tracking-ultra uppercase hover:bg-bronze hover:text-cream-light transition-colors disabled:opacity-50"
          >
            {status === 'loading' ? 'Sending' : 'Subscribe'}
          </button>
        </form>
        {status === 'done' && (
          <p className="mt-4 text-bronze-light text-sm">Welcome to the circle. Thank you.</p>
        )}
        {status === 'error' && (
          <p className="mt-4 text-red-300 text-sm">Something went wrong — please try again.</p>
        )}
      </div>
    </section>
  );
}
