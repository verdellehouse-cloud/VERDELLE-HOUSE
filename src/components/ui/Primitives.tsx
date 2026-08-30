import { useState, type ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export function Modal({ open, onClose, children, className = '' }: ModalProps) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-navy/40 backdrop-blur-sm" />
      <div
        className={`relative bg-cream-light max-w-md w-full p-8 ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute top-4 right-4 text-stone hover:text-navy transition-colors"
        >
          <X size={18} strokeWidth={1.5} />
        </button>
        {children}
      </div>
    </div>
  );
}

export function Badge({ label }: { label: string }) {
  const styles: Record<string, string> = {
    new: 'bg-bronze text-cream-light',
    bestseller: 'bg-navy text-cream-light',
    limited: 'bg-cream-light text-navy border border-navy',
  };
  return (
    <span
      className={`inline-block px-3 py-1 text-[10px] tracking-ultra uppercase font-sans ${styles[label] ?? 'bg-stone text-cream-light'}`}
    >
      {label}
    </span>
  );
}

export function Spinner({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-3">
      <div className="w-8 h-8 border border-bronze border-t-transparent rounded-full animate-spin" />
      {label && <p className="label-tag">{label}</p>}
    </div>
  );
}

export function EmptyState({ title, message }: { title: string; message: string }) {
  return (
    <div className="text-center py-24 px-6">
      <h3 className="font-serif text-2xl text-navy mb-2">{title}</h3>
      <p className="text-stone text-sm">{message}</p>
    </div>
  );
}

export function useToast() {
  const [toast, setToast] = useState<string | null>(null);
  const show = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  };
  const node = toast ? (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] bg-navy text-cream-light px-6 py-3 text-xs tracking-widest uppercase animate-fade-in">
      {toast}
    </div>
  ) : null;
  return { show, node };
}
