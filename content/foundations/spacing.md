---
title: Espaciado
description: Sistema de espaciado basado en múltiplos de 4px para consistencia visual.
figmaNodeId: "0-1"
---

## design

El sistema usa una base de **4px**. Todos los valores de margen, padding y gap son múltiplos de 4.

### Escala

| Token | Valor | Uso |
|-------|-------|-----|
| space-1 | 4px | Gap mínimo entre elementos relacionados |
| space-2 | 8px | Padding interno de chips y badges |
| space-3 | 12px | Padding de inputs y botones pequeños |
| space-4 | 16px | Padding de cards, secciones internas |
| space-5 | 20px | Padding de contenedores grandes |
| space-6 | 24px | Separación entre secciones |
| space-8 | 32px | Padding de página, márgenes de layout |
| space-12 | 48px | Separación mayor entre bloques |
| space-16 | 64px | Hero sections, espaciados grandes |

## build

```tsx
// Layout de página
<main className="p-8 max-w-4xl">
  <div className="space-y-6">
    <div className="p-4 rounded-xl border">
      <div className="flex items-center gap-3">...</div>
    </div>
  </div>
</main>
```

## content

### Reglas de espaciado

- Elementos relacionados: `gap-2` o `gap-3`
- Secciones diferentes: `space-y-6` o `space-y-8`
- Nunca uses valores ad-hoc — elige el múltiplo de 4 más próximo.
