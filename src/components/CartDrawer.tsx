import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { formatPrice } from '@/lib/format';
import { useRouter } from '@/lib/router';

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, subtotal, count } = useCart();
  const { navigate } = useRouter();

  return (
    <div
      className={`fixed inset-0 z-[90] transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="absolute inset-0 bg-navy/40 backdrop-blur-sm" onClick={closeCart} />
      <aside
        className={`absolute right-0 top-0 bottom-0 w-full max-w-md bg-cream-light flex flex-col transition-transform duration-500 ease-luxury ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-bronze/20">
          <div className="flex items-center gap-3">
            <ShoppingBag size={18} strokeWidth={1.5} className="text-navy" />
            <h2 className="font-serif text-2xl text-navy">Your Cart</h2>
            {count > 0 && <span className="label-tag">({count})</span>}
          </div>
          <button aria-label="Close cart" onClick={closeCart} className="text-stone hover:text-navy transition-colors">
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-5">
            <div className="w-16 h-16 rounded-full border border-bronze/40 flex items-center justify-center">
              <ShoppingBag size={24} strokeWidth={1} className="text-bronze" />
            </div>
            <div>
              <p className="font-serif text-2xl text-navy mb-2">Your cart is empty</p>
              <p className="text-sm text-stone">Quietly luxurious pieces await your consideration.</p>
            </div>
            <button
              className="btn-primary"
              onClick={() => {
                closeCart();
                navigate('/new');
              }}
            >
              Explore New Arrivals
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 scrollbar-hide">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}-${item.color}`}
                  className="flex gap-4 py-5 border-b border-bronze/15"
                >
                  <button
                    className="w-24 h-32 flex-shrink-0 overflow-hidden bg-cream"
                    onClick={() => {
                      closeCart();
                      navigate(`/product/${item.product.id}`);
                    }}
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </button>
                  <div className="flex-1 min-w-0 flex flex-col">
                    {item.product.brand_line && (
                      <p className="label-tag mb-1">{item.product.brand_line}</p>
                    )}
                    <h3 className="font-serif text-lg text-navy leading-snug truncate">
                      {item.product.name}
                    </h3>
                    <p className="text-xs text-stone mt-1">
                      {item.color} · Size {item.size}
                    </p>
                    <p className="text-sm text-navy mt-1">
                      {formatPrice(item.product.price, item.product.currency)}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center border border-bronze/30">
                        <button
                          aria-label="Decrease quantity"
                          className="px-2 py-1 text-navy hover:bg-bronze hover:text-cream-light transition-colors"
                          onClick={() =>
                            updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)
                          }
                        >
                          <Minus size={12} strokeWidth={1.5} />
                        </button>
                        <span className="px-3 text-xs font-sans text-navy min-w-[2ch] text-center">
                          {item.quantity}
                        </span>
                        <button
                          aria-label="Increase quantity"
                          className="px-2 py-1 text-navy hover:bg-bronze hover:text-cream-light transition-colors"
                          onClick={() =>
                            updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)
                          }
                        >
                          <Plus size={12} strokeWidth={1.5} />
                        </button>
                      </div>
                      <button
                        aria-label="Remove item"
                        className="text-stone hover:text-bronze transition-colors"
                        onClick={() => removeItem(item.product.id, item.size, item.color)}
                      >
                        <Trash2 size={15} strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-bronze/20 px-6 py-5 bg-cream">
              <div className="flex items-center justify-between mb-1">
                <span className="label-tag">Subtotal</span>
                <span className="font-serif text-2xl text-navy">{formatPrice(subtotal)}</span>
              </div>
              <p className="text-xs text-stone mb-4">Shipping and duties calculated at checkout.</p>
              <button
                className="btn-primary w-full"
                onClick={() => {
                  closeCart();
                  navigate('/checkout');
                }}
              >
                Proceed to Checkout
              </button>
              <button
                className="btn-ghost w-full mt-2"
                onClick={() => {
                  closeCart();
                  navigate('/cart');
                }}
              >
                View Cart
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
