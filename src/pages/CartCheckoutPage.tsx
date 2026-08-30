import { useState } from 'react';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { useRouter } from '@/lib/router';
import { formatPrice } from '@/lib/format';
import { EmptyState } from '@/components/ui/Primitives';

export function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, clear } = useCart();
  const { navigate } = useRouter();

  const shipping = subtotal > 1500 || subtotal === 0 ? 0 : 45;
  const duties = Math.round(subtotal * 0.05);
  const total = subtotal + shipping + duties;

  if (items.length === 0) {
    return (
      <div className="page-enter page-enter-active pt-32 min-h-[70vh] flex flex-col items-center justify-center px-6">
        <div className="w-16 h-16 rounded-full border border-bronze/40 flex items-center justify-center mb-6">
          <ShoppingBag size={24} strokeWidth={1} className="text-bronze" />
        </div>
        <h1 className="font-serif text-4xl text-navy mb-3">Your Cart is Empty</h1>
        <p className="text-stone mb-8 max-w-md text-center">
          Quietly luxurious pieces await your consideration.
        </p>
        <button className="btn-primary" onClick={() => navigate('/new')}>
          Explore New Arrivals
        </button>
      </div>
    );
  }

  return (
    <div className="page-enter page-enter-active pt-24">
      <section className="max-w-[1200px] mx-auto px-6 lg:px-10 py-12">
        <div className="text-center mb-12">
          <p className="label-tag mb-3">Your Selection</p>
          <h1 className="heading-display text-4xl md:text-5xl">Shopping Cart</h1>
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-10 lg:gap-16">
          {/* Items */}
          <div>
            <div className="hidden md:grid grid-cols-[100px_1fr_auto_auto] gap-6 pb-4 border-b border-bronze/20 label-tag">
              <span>Item</span>
              <span>Details</span>
              <span>Quantity</span>
              <span>Price</span>
            </div>
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.size}-${item.color}`}
                className="grid grid-cols-[100px_1fr] md:grid-cols-[100px_1fr_auto_auto] gap-6 py-6 border-b border-bronze/15"
              >
                <button
                  className="w-full aspect-[3/4] overflow-hidden bg-cream"
                  onClick={() => navigate(`/product/${item.product.id}`)}
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </button>
                <div className="flex flex-col">
                  {item.product.brand_line && <p className="label-tag mb-1">{item.product.brand_line}</p>}
                  <h3 className="font-serif text-xl text-navy leading-snug">{item.product.name}</h3>
                  <p className="text-xs text-stone mt-1 capitalize">
                    {item.color} · Size {item.size}
                  </p>
                  <button
                    onClick={() => removeItem(item.product.id, item.size, item.color)}
                    className="mt-auto flex items-center gap-1.5 text-xs text-stone hover:text-bronze transition-colors w-fit"
                  >
                    <Trash2 size={13} strokeWidth={1.5} /> Remove
                  </button>
                </div>
                <div className="hidden md:flex items-center">
                  <div className="flex items-center border border-bronze/30">
                    <button
                      aria-label="Decrease"
                      className="px-2 py-1.5 text-navy hover:bg-bronze hover:text-cream-light transition-colors"
                      onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                    >
                      <Minus size={12} strokeWidth={1.5} />
                    </button>
                    <span className="px-3 text-xs font-sans text-navy min-w-[2ch] text-center">
                      {item.quantity}
                    </span>
                    <button
                      aria-label="Increase"
                      className="px-2 py-1.5 text-navy hover:bg-bronze hover:text-cream-light transition-colors"
                      onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                    >
                      <Plus size={12} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
                <div className="hidden md:block text-right font-serif text-lg text-navy">
                  {formatPrice(item.product.price * item.quantity, item.product.currency)}
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between mt-8">
              <button
                onClick={clear}
                className="text-xs tracking-widest uppercase text-stone hover:text-bronze transition-colors"
              >
                Clear Cart
              </button>
              <button
                onClick={() => navigate('/new')}
                className="text-xs tracking-widest uppercase text-navy hover:text-bronze transition-colors inline-flex items-center gap-2"
              >
                Continue Shopping <ArrowRight size={14} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Summary */}
          <aside className="bg-cream-light/60 p-8 h-fit sticky top-24">
            <h2 className="font-serif text-2xl text-navy mb-6">Order Summary</h2>
            <SummaryRow label="Subtotal" value={formatPrice(subtotal)} />
            <SummaryRow label="Shipping" value={shipping === 0 ? 'Complimentary' : formatPrice(shipping)} />
            <SummaryRow label="Estimated Duties" value={formatPrice(duties)} />
            <div className="border-t border-bronze/20 my-4" />
            <SummaryRow label="Total" value={formatPrice(total)} bold />
            <button className="btn-primary w-full mt-6" onClick={() => navigate('/checkout')}>
              Proceed to Checkout
            </button>
            <p className="text-xs text-stone mt-4 text-center">
              Complimentary shipping on orders over $1,500.
            </p>
          </aside>
        </div>
      </section>
    </div>
  );
}

function SummaryRow({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className={`text-sm ${bold ? 'text-navy font-sans tracking-widest uppercase text-xs' : 'text-stone'}`}>
        {label}
      </span>
      <span className={`${bold ? 'font-serif text-2xl text-navy' : 'text-sm text-navy'}`}>{value}</span>
    </div>
  );
}

export function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const { navigate } = useRouter();
  const [placed, setPlaced] = useState(false);

  const shipping = subtotal > 1500 || subtotal === 0 ? 0 : 45;
  const duties = Math.round(subtotal * 0.05);
  const total = subtotal + shipping + duties;

  if (placed) {
    return (
      <div className="page-enter page-enter-active pt-32 min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
        <div className="w-16 h-16 rounded-full border border-bronze flex items-center justify-center mb-6 text-bronze">
          <ShoppingBag size={26} strokeWidth={1.2} />
        </div>
        <p className="label-tag mb-3">Order Confirmed</p>
        <h1 className="heading-display text-4xl md:text-5xl mb-4">Thank you for your order</h1>
        <p className="text-stone-dark max-w-md mb-8">
          A confirmation has been sent to your email. Your pieces will be carefully wrapped and
          dispatched from our Paris atelier within two business days.
        </p>
        <button className="btn-primary" onClick={() => navigate('/')}>
          Return Home
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="page-enter page-enter-active pt-32 min-h-[70vh]">
        <EmptyState
          title="Nothing to check out"
          message="Add a piece to your cart to continue."
        />
        <div className="text-center -mt-10 mb-20">
          <button className="btn-outline" onClick={() => navigate('/new')}>
            Browse the Collection
          </button>
        </div>
      </div>
    );
  }

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    clear();
    setPlaced(true);
  };

  return (
    <div className="page-enter page-enter-active pt-24">
      <section className="max-w-[1200px] mx-auto px-6 lg:px-10 py-12">
        <div className="text-center mb-12">
          <p className="label-tag mb-3">Final Step</p>
          <h1 className="heading-display text-4xl md:text-5xl">Checkout</h1>
        </div>

        <form onSubmit={placeOrder} className="grid lg:grid-cols-[1fr_380px] gap-10 lg:gap-16">
          {/* Form */}
          <div className="space-y-12">
            <CheckoutBlock title="Contact" step="01">
              <div className="grid sm:grid-cols-2 gap-6">
                <CheckoutField label="Email" type="email" required full />
                <CheckoutField label="Phone" type="tel" full />
              </div>
            </CheckoutBlock>

            <CheckoutBlock title="Shipping Address" step="02">
              <div className="grid sm:grid-cols-2 gap-6">
                <CheckoutField label="First Name" required />
                <CheckoutField label="Last Name" required />
                <CheckoutField label="Address" required full />
                <CheckoutField label="Apartment / Suite" full />
                <CheckoutField label="City" required />
                <CheckoutField label="Postal Code" required />
                <CheckoutField label="Country" required full />
              </div>
            </CheckoutBlock>

            <CheckoutBlock title="Payment" step="03">
              <p className="text-xs text-stone mb-4">
                This is a demonstration checkout — no real payment will be processed.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                <CheckoutField label="Card Number" required full placeholder="0000 0000 0000 0000" />
                <CheckoutField label="Expiry (MM/YY)" required placeholder="MM/YY" />
                <CheckoutField label="CVC" required placeholder="123" />
                <CheckoutField label="Name on Card" required full />
              </div>
            </CheckoutBlock>
          </div>

          {/* Summary */}
          <aside className="bg-cream-light/60 p-8 h-fit lg:sticky lg:top-24">
            <h2 className="font-serif text-2xl text-navy mb-6">Order Summary</h2>
            <div className="space-y-4 max-h-[280px] overflow-y-auto scrollbar-hide mb-4">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex gap-3">
                  <div className="relative w-16 h-20 flex-shrink-0 overflow-hidden bg-cream">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute -top-2 -right-2 bg-navy text-cream-light text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-sm text-navy leading-tight truncate">{item.product.name}</p>
                    <p className="text-xs text-stone mt-0.5 capitalize">{item.color} · {item.size}</p>
                    <p className="text-xs text-navy mt-1">{formatPrice(item.product.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-bronze/20 pt-4 space-y-2">
              <SummaryRow label="Subtotal" value={formatPrice(subtotal)} />
              <SummaryRow label="Shipping" value={shipping === 0 ? 'Complimentary' : formatPrice(shipping)} />
              <SummaryRow label="Duties" value={formatPrice(duties)} />
              <div className="border-t border-bronze/20 my-2" />
              <SummaryRow label="Total" value={formatPrice(total)} bold />
            </div>
            <button type="submit" className="btn-primary w-full mt-6">
              Place Order
            </button>
          </aside>
        </form>
      </section>
    </div>
  );
}

function CheckoutBlock({ title, step, children }: { title: string; step: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <span className="font-serif text-bronze text-2xl">{step}</span>
        <h2 className="font-serif text-2xl text-navy">{title}</h2>
      </div>
      <div className="section-divider-left mb-6" />
      {children}
    </div>
  );
}

function CheckoutField({
  label,
  type = 'text',
  required,
  full,
  placeholder,
}: {
  label: string;
  type?: string;
  required?: boolean;
  full?: boolean;
  placeholder?: string;
}) {
  return (
    <label className={`block ${full ? 'sm:col-span-2' : ''}`}>
      <span className="label-tag block mb-2">
        {label} {required && <span className="text-bronze">*</span>}
      </span>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full bg-cream-light border border-bronze/25 px-4 py-3 text-navy outline-none focus:border-navy transition-colors"
      />
    </label>
  );
}
