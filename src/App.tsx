import { CartProvider } from '@/lib/cart';
import { useRouter } from '@/lib/router';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { HomePage } from '@/pages/HomePage';
import { CategoryPage } from '@/pages/CategoryPage';
import { ProductDetailPage } from '@/pages/ProductDetailPage';
import { AboutPage } from '@/pages/AboutPage';
import { ContactPage } from '@/pages/ContactPage';
import { CartPage, CheckoutPage } from '@/pages/CartCheckoutPage';
import { NewArrivalsPage } from '@/pages/NewArrivalsPage';
import { SearchPage } from '@/pages/SearchPage';
import type { Category } from '@/types';

function AppContent() {
  const { route } = useRouter();
  const [first, second, ...rest] = route.segments;

  let page: React.ReactNode;
  switch (first) {
    case undefined:
      page = <HomePage />;
      break;
    case 'men':
      page = (
        <CategoryPage
          gender="men"
          initialCategory={second as Category | undefined}
          title="Men"
          subtitle="A considered wardrobe — clothing, shoes, jewelry, watches and accessories."
          heroImage="/Bf _3.jpg"
        />
      );
      break;
    case 'women':
      page = (
        <CategoryPage
          gender="women"
          initialCategory={second as Category | undefined}
          title="Women"
          subtitle="Timeless pieces designed in Paris — quietly luxurious, made to be kept."
          heroImage="/stargazing.jpg"
        />
      );
      break;
    case 'new':
      page = <NewArrivalsPage />;
      break;
    case 'search':
      page = <SearchPage />;
      break;
    case 'product':
      page = <ProductDetailPage id={second ?? ''} />;
      break;
    case 'about':
      page = <AboutPage />;
      break;
    case 'contact':
      page = <ContactPage />;
      break;
    case 'cart':
      page = <CartPage />;
      break;
    case 'checkout':
      page = <CheckoutPage />;
      break;
    case 'account':
      page = <AccountPlaceholder />;
      break;
    default:
      page = <NotFound />;
  }

  void rest;

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />
      <main className="flex-1">{page}</main>
      <Footer />
      <CartDrawer />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

function AccountPlaceholder() {
  return (
    <div className="pt-32 min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <p className="label-tag mb-3">Account</p>
      <h1 className="heading-display text-4xl md:text-5xl mb-4">Member access coming soon</h1>
      <p className="text-stone-dark max-w-md mb-8">
        Our private member experience is being prepared. In the meantime, you may browse and
        purchase without an account.
      </p>
    </div>
  );
}

function NotFound() {
  return (
    <div className="pt-32 min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <p className="label-tag mb-3">Error 404</p>
      <h1 className="heading-display text-5xl md:text-6xl mb-4">Page not found</h1>
      <p className="text-stone-dark max-w-md mb-8">
        The page you are looking for may have moved or no longer exists.
      </p>
      <a href="#/" className="btn-primary">Return Home</a>
    </div>
  );
}
