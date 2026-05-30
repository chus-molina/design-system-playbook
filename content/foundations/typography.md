---
title: Tipografía
description: Escala tipográfica, pesos y guías de uso para textos en el sistema.
figmaNodeId: "0-1"
---

## design

La tipografía establece jerarquía visual y facilita la lectura. El sistema usa **Inter** como fuente principal.

### Escala tipográfica

| Clase | Tamaño | Uso |
|-------|--------|-----|
| text-xs | 12px | Etiquetas, metadata, chips |
| text-sm | 14px | Cuerpo secundario, UI labels |
| text-base | 16px | Cuerpo principal |
| text-lg | 18px | Introducción de sección |
| text-xl | 20px | Subtítulos |
| text-2xl | 24px | Títulos de sección |
| text-3xl | 30px | Títulos de página |
| text-4xl | 36px | Hero / Display |

### Pesos

- **font-normal (400)** — Cuerpo de texto
- **font-medium (500)** — Labels, botones
- **font-semibold (600)** — Subtítulos, emphasis
- **font-bold (700)** — Títulos, CTAs destacados

## build

### Uso típico

```tsx
// Título de página
<h1 className="text-3xl font-bold text-foreground">Título</h1>

// Subtítulo de sección
<h2 className="text-xl font-semibold text-foreground">Sección</h2>

// Cuerpo principal
<p className="text-base text-muted-foreground leading-relaxed">Contenido...</p>

// Label de formulario
<label className="text-sm font-medium text-foreground">Email</label>

// Metadata
<span className="text-xs text-muted-foreground">hace 3 horas</span>
```

## content

### Jerarquía

- Usa `h1` una sola vez por página.
- Los subtítulos (`h2`) articulan secciones, no decoración.
- El cuerpo de texto usa `text-base` con `leading-relaxed`.

### Microcopy

- Labels de botón: imperativo, sin punto — "Guardar cambios".
- Placeholders: describen el formato esperado, no repiten el label.
- Mensajes de error: explican qué pasó y cómo solucionarlo.
