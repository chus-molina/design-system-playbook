---
title: Avatar
description: Representación visual del usuario. Muestra imagen o iniciales como fallback.
figmaNodeId: "4281-261312"
---

## design

Los avatares identifican visualmente a un usuario o entidad dentro de la interfaz.

### Tamaños

- **sm** — w-7 h-7 (28px) — Tablas, listas compactas
- **md** — w-9 h-9 (36px) — Header, menús (estándar)
- **lg** — w-12 h-12 (48px) — Cards de perfil
- **xl** — w-16 h-16 (64px) — Páginas de perfil

### Variantes

- **Con imagen** — Foto del usuario
- **Con iniciales** — Fallback cuando no hay imagen (máx. 2 letras)
- **Con indicador** — Punto de estado (online/ausente/offline)
- **Grupo** — Stack de avatars superpuestos con contador

## build

### Props principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `src` | `string \| null` | — | URL de la imagen |
| `name` | `string` | — | Nombre para iniciales y alt |
| `size` | `sm \| md \| lg \| xl` | `md` | Tamaño |

### Ejemplo de uso

```tsx
// Con imagen
<Avatar src="/foto.jpg" name="Juan García" size="lg" />

// Sin imagen (usa iniciales)
<Avatar name="María López" size="md" />

// Grupo con contador
<AvatarGroup max={4} avatars={users} />
```

## content

### Accesibilidad

- El `alt` debe ser el nombre completo del usuario.
- Si el avatar es decorativo (ya hay texto del nombre cerca), usa `alt=""`.
- Las iniciales del fallback: primera letra del nombre + primera del apellido.
- Los indicadores de estado necesitan texto alternativo: "Juan García — Online".
