import { useState } from 'react';
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { useRouter } from '@/lib/router';
import { subscribeNewsletter } from '@/lib/data';

export function Footer() {
  const { navigate } = useRouter();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

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
    <footer className="bg-navy text-cream-light">
      {/* Newsletter band */}
      <div className="border-b border-cream-light/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="label-tag text-bronze-light mb-3">The Verdelle Letter</p>
            <h3 className="font-serif text-3xl md:text-4xl font-light leading-tight">
              Private invitations, new arrivals, and notes from the atelier.
            </h3>
          </div>
          <div className="md:justify-self-end w-full max-w-md">
            <form onSubmit={submit} className="flex border-b border-cream-light/30 pb-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 bg-transparent text-cream-light placeholder:text-cream-light/50 outline-none font-sans text-sm"
                required
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="text-xs tracking-ultra uppercase text-cream-light hover:text-bronze-light transition-colors disabled:opacity-50"
              >
                {status === 'loading' ? 'Sending' : 'Subscribe'}
              </button>
            </form>
            {status === 'done' && (
              <p className="mt-3 text-xs text-bronze-light">Thank you — welcome to the house.</p>
            )}
            {status === 'error' && (
              <p className="mt-3 text-xs text-red-300">Something went wrong. Please try again.</p>
            )}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 grid md:grid-cols-4 gap-12">
        <div className="md:col-span-1">
          <Logo dark />
          <p className="mt-6 font-serif text-lg italic text-cream-light/80 leading-relaxed max-w-xs">
            Timeless, quietly luxurious pieces — designed in the house, made to be kept.
          </p>
          <div className="flex gap-4 mt-6">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="text-cream-light/70 hover:text-bronze-light transition-colors"
              >
                <Icon size={18} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="label-tag text-bronze-light mb-5">Shop</p>
          <ul className="space-y-3 text-sm font-sans text-cream-light/80">
            {[
              ['Men', '/men'],
              ['Women', '/women'],
              ['New Arrivals', '/new'],
              ['Clothing', '/men/clothing'],
              ['Watches', '/women/watches'],
            ].map(([label, path]) => (
              <li key={path}>
                <button onClick={() => navigate(path)} className="hover:text-cream-light transition-colors">
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="label-tag text-bronze-light mb-5">The House</p>
          <ul className="space-y-3 text-sm font-sans text-cream-light/80">
            {[
              ['About Us', '/about'],
              ['Contact', '/contact'],
              ['Sustainability', '/about'],
              ['Care & Repair', '/about'],
              ['Shipping & Returns', '/about'],
            ].map(([label, path]) => (
              <li key={label}>
                <button onClick={() => navigate(path)} className="hover:text-cream-light transition-colors">
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="label-tag text-bronze-light mb-5">Contact</p>
          <ul className="space-y-4 text-sm font-sans text-cream-light/80">
            <li className="flex items-start gap-3">
              <MapPin size={16} strokeWidth={1.5} className="text-bronze-light mt-0.5 flex-shrink-0" />
              <span>14 Rue du Faubourg, Paris 75008</span>
            </li>
            <li className="flex items-start gap-3">
              <Phone size={16} strokeWidth={1.5} className="text-bronze-light mt-0.5 flex-shrink-0" />
              <span>+33 1 42 00 00 00</span>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={16} strokeWidth={1.5} className="text-bronze-light mt-0.5 flex-shrink-0" />
              <span>concierge@verdellehouse.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream-light/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream-light/50 font-sans tracking-wide">
          <p>© {new Date().getFullYear()} Verdelle House. All rights reserved.</p>
          <p className="tracking-ultra uppercase text-[10px]">Crafted in Paris · Shipped worldwide</p>
        </div>
      </div>
    </footer>
  );
}
