import { cn } from '@/lib/utils'

interface LogoFullProps {
  className?: string
}

/**
 * Logotipo completo de HeroUI (isotipo + wordmark "HeroUI") — SVG exactos de Figma.
 * Modo claro → variante de texto negro (Logo-Light).
 * Modo oscuro → variante de texto blanco (Logo-Dark).
 * Define la altura con className (ej. "h-6"); el ancho se ajusta al ratio 682×162.
 */
export function LogoFull({ className }: LogoFullProps) {
  return (
    <span className={cn('inline-block', className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/logo-light.svg"
        alt="HeroUI"
        className="h-full w-auto block dark:hidden"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/logo-dark.svg"
        alt="HeroUI"
        className="h-full w-auto hidden dark:block"
      />
    </span>
  )
}
