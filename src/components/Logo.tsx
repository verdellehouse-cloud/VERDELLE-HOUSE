interface LogoProps {
  className?: string;
  variant?: 'full' | 'mark';
  dark?: boolean;
}

export function Logo({ className = '', variant = 'full', dark = false }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Circular clip — zoom to 240% so the VH mark fills the frame */}
      <div className="relative h-14 w-14 rounded-full overflow-hidden flex-shrink-0">
        <img
          src="/Grey_and_White_Aesthetic_Initials_Logo_Design.jpg.jpeg"
          alt="Verdelle House monogram"
          className="absolute"
          style={{
            width: '160%',
            height: '160%',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            objectFit: 'cover',
            objectPosition: 'center center',
          }}
        />
      </div>
      {variant === 'full' && (
        <div className="flex flex-col leading-none">
          <span className={`font-serif text-xl tracking-wide ${dark ? 'text-cream-light' : 'text-navy'}`}>
            Verdelle
          </span>
          <span className={`font-sans text-[9px] tracking-ultra uppercase mt-0.5 ${dark ? 'text-cream-light/60' : 'text-stone'}`}>
            House
          </span>
        </div>
      )}
    </div>
  );
}
