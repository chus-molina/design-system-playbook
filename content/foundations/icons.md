---
title: Iconografía
description: Sistema de iconos basado en Lucide React — 1000+ iconos consistentes y accesibles.
figmaNodeId: "10-1849"
---

## design

Los iconos refuerzan el significado de las acciones y el contenido. El sistema usa **Lucide React** por su consistencia visual y accesibilidad.

### Tamaños estándar

| Clase | Tamaño | Uso |
|-------|--------|-----|
| w-3 h-3 | 12px | Indicadores muy pequeños |
| w-4 h-4 | 16px | UI estándar (botones, labels) |
| w-5 h-5 | 20px | Iconos de navegación |
| w-6 h-6 | 24px | Iconos destacados |
| w-8 h-8 | 32px | Ilustraciones pequeñas |

### Categorías disponibles

- **Navegación** — Home, Settings, Search, ArrowRight, ChevronDown
- **Acciones** — Plus, Edit, Trash2, Upload, Download, Share
- **Estado** — AlertCircle, Info, HelpCircle, Loader2, Check
- **Usuario** — User, Bell, Heart, Star, Lock, Eye
- **Comunicación** — Mail, Phone, Globe, Calendar, Clock

## build

```tsx
import { ArrowRight, AlertCircle } from 'lucide-react'

// Tamaño estándar (16px)
<ArrowRight className="w-4 h-4" />

// Con color semántico
<AlertCircle className="w-4 h-4 text-destructive" />

// En botón
<button className="flex items-center gap-2">
  Continuar <ArrowRight className="w-4 h-4" />
</button>
```

## content

### Guías de uso

- Los iconos acompañan al texto, nunca lo reemplazan en acciones críticas.
- Usa `aria-label` cuando el icono es el único indicador de la acción.
- El tamaño estándar en UI es `w-4 h-4` (16px).
- En botones, el icono va a la derecha del texto para acciones de avance.
