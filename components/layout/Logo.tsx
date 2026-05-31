import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
}

/**
 * Isotipo oficial de HeroUI (SVG exactos de Figma).
 * Modo claro → variante de cuadrado negro (Isotipo_Dark).
 * Modo oscuro → variante de cuadrado blanco (Isotipo-Light).
 */
export function Logo({ className }: LogoProps) {
  return (
    <span className={cn('relative inline-block', className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/isotipo-dark.svg"
        alt="HeroUI"
        className="absolute inset-0 w-full h-full object-contain block dark:hidden"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/isotipo-light.svg"
        alt="HeroUI"
        className="absolute inset-0 w-full h-full object-contain hidden dark:block"
      />
    </span>
  )
}
