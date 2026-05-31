import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
}

/**
 * Isotipo oficial de HeroUI — geometría exacta de Figma (nodos 21:6231 / 21:6235).
 * Cuadrado redondeado (rx 114.688) con las letras "UI" en trazo.
 * El cuadrado usa el color de primer plano y las letras el de fondo, de modo que
 * es negro/UI-blanco en modo claro y blanco/UI-negro en modo oscuro
 * (idéntico a las variantes Light/Dark de la marca).
 */
export function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('block', className)}
      role="img"
      aria-label="HeroUI"
    >
      <rect width="512" height="512" rx="114.688" className="fill-foreground" />
      {/* Letras "UI" — viewBox original 244×234, posicionadas en (134, 146) */}
      <g transform="translate(134.1 146.3)">
        <path
          d="M52.5 0V128.5C52.5 162 79.5 189 113 189C146.5 189 173.5 162 173.5 128.5V0"
          className="stroke-background"
          strokeWidth="33"
          strokeLinecap="round"
        />
        <path
          d="M225.5 0V234"
          className="stroke-background"
          strokeWidth="33"
          strokeLinecap="round"
        />
      </g>
    </svg>
  )
}
