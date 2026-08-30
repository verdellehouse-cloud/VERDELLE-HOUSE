import { Leaf, Compass, Gem, Sparkles } from 'lucide-react';
import { useRouter } from '@/lib/router';
import { useReveal } from '@/lib/hooks';
import { forwardRef } from 'react';

export function AboutPage() {
  const { navigate } = useRouter();

  return (
    <div className="page-enter page-enter-active pt-20">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <img
          src="https://images.pexels.com/photos/5886041/pexels-photo-5886041.jpeg"
          alt="The Verdelle atelier"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/50" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <p className="label-tag text-cream-light mb-4">Our Story</p>
          <h1 className="font-serif text-cream-light text-5xl md:text-7xl font-light leading-tight max-w-3xl">
            The House of Verdelle
          </h1>
          <p className="mt-5 text-cream-light/80 font-serif italic text-lg md:text-xl max-w-xl">
            Quietly luxurious, timelessly made.
          </p>
        </div>
      </section>

      <StorySection />
      <ValuesSection />
      <AtelierSection onShop={() => navigate('/new')} />
    </div>
  );
}

const StorySection = forwardRef<HTMLDivElement>(function StorySection(_props, ref) {
  return (
    <section ref={ref} className="py-24 md:py-32 px-6 lg:px-10">
      <div className="max-w-[900px] mx-auto text-center">
        <p className="label-tag mb-4">Est. MMXXV · Paris</p>
        <h2 className="heading-display text-4xl md:text-5xl mb-8 leading-tight">
          A house built on restraint.
        </h2>
        <div className="section-divider" />
        <p className="font-sans text-lg text-stone-dark leading-relaxed mt-8 mb-6">
          Verdelle House began with a simple frustration: that modern luxury had grown loud.
          Logos shouted, seasons accelerated, and pieces were designed to be noticed — then
          forgotten. We wanted something quieter. Pieces with presence but without noise.
          Objects designed to be lived with, repaired, and handed on.
        </p>
        <p className="font-sans text-lg text-stone-dark leading-relaxed mb-6">
          Every piece in our collection is designed in our Paris atelier and made in small runs
          by artisans across Europe — a hand-welted shoemaker in Northampton, a knitwear studio
          in the Scottish Borders, a goldsmith in Florence. We choose materials that age
          gracefully and constructions that last: bronze that patinas, cashmere that softens,
          leather that remembers the hand.
        </p>
        <p className="font-serif italic text-2xl text-navy leading-relaxed">
          “We design for the person who buys once, and keeps forever.”
        </p>
        <p className="label-tag mt-4">— The Founders, Verdelle House</p>
      </div>
    </section>
  );
});

function ValuesSection() {
  const values = [
    {
      icon: <Leaf size={24} strokeWidth={1.5} />,
      title: 'Nature-Inspired',
      body: 'The botanical motif at our heart is more than a mark. It is a philosophy — designs that draw from the natural world and return to it gently.',
    },
    {
      icon: <Gem size={24} strokeWidth={1.5} />,
      title: 'Considered Materials',
      body: 'We source the finest natural fibres, leathers, and metals — chosen not for novelty but for how beautifully they age over time.',
    },
    {
      icon: <Compass size={24} strokeWidth={1.5} />,
      title: 'Made to Last',
      body: 'Small runs, traditional construction, and a lifetime care promise. Every piece is designed to be repaired, not replaced.',
    },
    {
      icon: <Sparkles size={24} strokeWidth={1.5} />,
      title: 'Quiet Luxury',
      body: 'No shouting logos. No seasonal noise. Just considered design that earns its place in a wardrobe through use and time.',
    },
  ];
  return (
    <section className="py-24 md:py-32 px-6 lg:px-10 bg-cream-light/60">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <p className="label-tag mb-3">What We Believe</p>
          <h2 className="heading-display text-4xl md:text-5xl">The Verdelle Principles</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {values.map((v) => (
            <div key={v.title} className="text-center">
              <div className="w-14 h-14 rounded-full border border-bronze/40 flex items-center justify-center mx-auto mb-5 text-bronze">
                {v.icon}
              </div>
              <h3 className="font-serif text-2xl text-navy mb-3">{v.title}</h3>
              <p className="font-sans text-sm text-stone-dark leading-relaxed">{v.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AtelierSection({ onShop }: { onShop: () => void }) {
  return (
    <section className="py-24 md:py-32 px-6 lg:px-10">
      <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div>
          <p className="label-tag mb-4">The Atelier</p>
          <h2 className="heading-display text-4xl md:text-5xl mb-6 leading-tight">
            Made by hand, in small numbers.
          </h2>
          <div className="section-divider-left" />
          <p className="font-sans text-base md:text-lg text-stone-dark leading-relaxed mb-5">
            Our atelier occupies a quiet building in the 8th arrondissement of Paris — a space
            once used by a tailor who dressed the same families for three generations. We kept
            the long windows, the wood floors, and the patience.
          </p>
          <p className="font-sans text-base md:text-lg text-stone-dark leading-relaxed mb-8">
            Each piece moves slowly through the workshop: sketched, draped, fitted, and refined
            before it ever reaches a shelf. We make in small runs so that nothing is wasted and
            every piece is made well.
          </p>
          <button className="btn-outline" onClick={onShop}>
            Explore the Collection
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://images.pexels.com/photos/6311662/pexels-photo-6311662.jpeg"
            alt="Atelier detail"
            className="w-full aspect-[3/4] object-cover"
          />
          <img
            src="https://images.pexels.com/photos/769749/pexels-photo-769749.jpeg"
            alt="Atelier detail"
            className="w-full aspect-[3/4] object-cover mt-8"
          />
        </div>
      </div>
    </section>
  );
}
