import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
}

/**
 * Isotipo de HeroUI: cuadrado redondeado con las letras "UI".
 * Se adapta al tema — fondo oscuro/texto claro en light mode,
 * fondo claro/texto oscuro en dark mode (igual que la marca original).
 */
export function Logo({ className }: LogoProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-[7px] bg-foreground text-background select-none',
        className
      )}
    >
      <svg viewBox="0 0 28 28" fill="none" className="w-full h-full" aria-hidden>
        <path
          d="M8 8.5 V14.5 a4 4 0 0 0 8 0 V8.5"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
          fill="none"
        />
        <line
          x1="19.2" y1="8.5" x2="19.2" y2="18.5"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
