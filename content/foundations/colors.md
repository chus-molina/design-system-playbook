---
title: Colores
description: Paleta de colores y tokens semánticos del sistema de diseño.
figmaNodeId: "0-1"
---

## design

El sistema de color comunica jerarquía, estado y marca. Está construido sobre tokens semánticos que se adaptan automáticamente al modo claro y oscuro.

### Paleta base

| Color | Hex | Uso |
|-------|-----|-----|
| Primary 500 | `#2563eb` | CTAs, enlaces, elementos activos |
| Primary 600 | `#1d4ed8` | Hover del primario |
| Neutral 900 | `#0f172a` | Texto principal (dark) |
| Neutral 100 | `#f8fafc` | Fondo de página (light) |
| Success 500 | `#22c55e` | Confirmaciones, estados ok |
| Danger 500 | `#ef4444` | Errores, acciones destructivas |
| Warning 500 | `#eab308` | Avisos, información importante |

### Cómo elegir el color correcto

- **Azul primario** — CTAs, enlaces, elementos interactivos activos
- **Rojo destructivo** — Eliminar, cancelar suscripción, acciones irreversibles
- **Verde éxito** — Confirmaciones, guardado correcto, validaciones ok
- **Ámbar aviso** — Información que necesita atención pero no es un error

## build

### Tokens CSS disponibles

```css
--background       /* Fondo de página */
--foreground       /* Texto principal */
--accent           /* Color primario de acción */
--accent-foreground /* Texto sobre primario */
--muted            /* Fondos sutiles */
--muted-foreground /* Texto secundario */
--border           /* Bordes UI */
--card             /* Fondo de cards */
--destructive      /* Errores */
```

### Uso en Tailwind

```tsx
<div className="bg-accent text-accent-foreground">Primario</div>
<div className="text-muted-foreground">Texto secundario</div>
<div className="border border-border">Con borde</div>
```

## content

### Accesibilidad

- El color primario (#2563eb) cumple ratio WCAG AA sobre fondo blanco (4.5:1).
- Nunca uses color como único indicador de estado — acompaña siempre con texto o icono.
- El texto sobre fondos de color debe tener ratio mínimo de 4.5:1 (AA) o 7:1 (AAA).
