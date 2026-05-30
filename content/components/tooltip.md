---
title: Tooltip
description: Etiqueta emergente que muestra información adicional sobre un elemento al hacer hover.
figmaNodeId: "4281-261304"
---

## design

Los tooltips revelan información complementaria sin ocupar espacio en la UI permanentemente.

### Posiciones

- **Top** (por defecto) — Sobre el elemento
- **Bottom** — Bajo el elemento
- **Left** — A la izquierda
- **Right** — A la derecha

### Comportamiento

- Aparece tras 300ms de hover (evita flickers)
- Desaparece al mover el cursor fuera
- Nunca bloquea contenido importante
- Fondo oscuro sobre fondos claros (y viceversa)

## build

### Props principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `content` | `string` | — | Texto del tooltip |
| `placement` | `top \| bottom \| left \| right` | `top` | Posición |

### Ejemplo de uso

```tsx
// Icono sin texto visible — el tooltip es su label
<Tooltip content="Copiar enlace">
  <button><Copy className="w-4 h-4" /></button>
</Tooltip>

// Con posición diferente
<Tooltip content="Eliminar elemento" placement="bottom">
  <button><Trash2 className="w-4 h-4 text-destructive" /></button>
</Tooltip>
```

## content

### Cuándo usar tooltip

- Para iconos sin texto visible — es su accesibilidad.
- Para botones que necesitan contexto sin sobrecargar la UI.
- **NO** para información crítica — si el usuario necesita leerlo para actuar, ponlo en el UI principal.

### Texto del tooltip

- Máximo 4-5 palabras — debe ser instantáneamente legible.
- Sin puntuación al final.
- Verbo + objeto: "Copiar enlace", "Eliminar fila", "Abrir menú".
