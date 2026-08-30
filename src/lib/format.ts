export function formatPrice(price: number, currency = 'USD'): string {
  const symbol = currency === 'USD' ? '$' : currency + ' ';
  return symbol + price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export function formatPriceCents(price: number, currency = 'USD'): string {
  const symbol = currency === 'USD' ? '$' : currency + ' ';
  return symbol + price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
