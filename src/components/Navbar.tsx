import { useEffect, useState } from 'react';
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { useRouter } from '@/lib/router';
import { useScrolled } from '@/lib/hooks';
import { useCart } from '@/lib/cart';

const NAV_LINKS = [
  { label: 'Men', path: '/men' },
  { label: 'Women', path: '/women' },
  { label: 'New Arrivals', path: '/new' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export function Navbar() {
  const { route, navigate } = useRouter();
  const scrolled = useScrolled(30);
  const { count, openCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [route.path]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const isActive = (path: string) =>
    route.path === path || route.path.startsWith(path + '/');

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
      setSearchOpen(false);
      setSearchValue('');
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-cream/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(139,94,60,0.2)] py-3'
            : 'bg-cream/80 backdrop-blur-sm py-5'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center justify-between gap-6">
          <button
            aria-label="Open menu"
            className="lg:hidden text-navy p-1 -ml-1"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>

          <button onClick={() => navigate('/')} className="flex-shrink-0" aria-label="Verdelle House home">
            <Logo />
          </button>

          <nav className="hidden lg:flex items-center gap-10 flex-1 justify-center">
            {NAV_LINKS.map((link) => (
              <button
                key={link.path}
                className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                onClick={() => navigate(link.path)}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <button
              aria-label="Search"
              className="text-navy hover:text-bronze transition-colors"
              onClick={() => setSearchOpen((v) => !v)}
            >
              <Search size={20} strokeWidth={1.5} />
            </button>
            <button
              aria-label="Account"
              className="text-navy hover:text-bronze transition-colors hidden sm:block"
              onClick={() => navigate('/account')}
            >
              <User size={20} strokeWidth={1.5} />
            </button>
            <button
              aria-label={`Cart, ${count} items`}
              className="text-navy hover:text-bronze transition-colors relative"
              onClick={openCart}
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-bronze text-cream-light text-[9px] font-sans tracking-wider w-4 h-4 rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="absolute top-full inset-x-0 bg-cream-light border-t border-bronze/20 animate-fade-in">
            <form
              onSubmit={submitSearch}
              className="max-w-[1400px] mx-auto px-6 lg:px-10 py-5 flex items-center gap-4"
            >
              <Search size={20} strokeWidth={1.5} className="text-stone" />
              <input
                autoFocus
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search the house…"
                className="flex-1 bg-transparent border-none outline-none font-serif text-xl text-navy placeholder:text-stone/60"
              />
              <button type="button" onClick={() => setSearchOpen(false)} aria-label="Close search">
                <X size={20} strokeWidth={1.5} className="text-stone hover:text-navy" />
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-navy/40" onClick={() => setMobileOpen(false)} />
        <div
          className={`absolute left-0 top-0 bottom-0 w-[80%] max-w-sm bg-cream-light p-8 flex flex-col transition-transform duration-400 ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between mb-12">
            <Logo />
            <button aria-label="Close menu" onClick={() => setMobileOpen(false)} className="text-navy">
              <X size={22} strokeWidth={1.5} />
            </button>
          </div>
          <nav className="flex flex-col gap-6">
            {NAV_LINKS.map((link) => (
              <button
                key={link.path}
                className={`font-serif text-3xl text-navy text-left transition-colors hover:text-bronze ${
                  isActive(link.path) ? 'text-bronze' : ''
                }`}
                onClick={() => navigate(link.path)}
              >
                {link.label}
              </button>
            ))}
          </nav>
          <div className="section-divider-left mt-10" />
          <div className="mt-6 flex flex-col gap-4">
            <button
              className="btn-ghost justify-start px-0"
              onClick={() => navigate('/account')}
            >
              Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
