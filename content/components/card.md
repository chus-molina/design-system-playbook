---
title: Card
description: Contenedor para agrupar contenido relacionado. Base de muchos patrones de la UI.
figmaNodeId: "4281-261282"
---

## design

Las cards agrupan información relacionada en una superficie elevada. Son uno de los patrones más versátiles del sistema.

### Variantes

- **Basic** — Solo contenido, sin acciones
- **Interactive** — Clickable, con hover state
- **Con imagen** — Header visual + contenido
- **De perfil** — Avatar + nombre + estadísticas
- **Con footer** — Acciones en la parte inferior

### Anatomía

1. **Header** (opcional) — Título + acción secundaria (icono)
2. **Media** (opcional) — Imagen o ilustración
3. **Body** — Contenido principal
4. **Footer** (opcional) — Acciones primaria y secundaria

## build

### Props principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `interactive` | `boolean` | `false` | Activa hover state y cursor pointer |
| `className` | `string` | — | Clases adicionales |

### Ejemplo de uso

```tsx
<Card interactive>
  <CardHeader>
    <CardTitle>Nombre del componente</CardTitle>
  </CardHeader>
  <CardContent>
    Descripción o contenido de la card.
  </CardContent>
  <CardFooter>
    <Button size="sm">Ver más</Button>
  </CardFooter>
</Card>
```

## content

### Principios de contenido en cards

- El título debe ser autosuficiente — comprensible sin leer el cuerpo.
- El cuerpo no repite el título, lo complementa.
- El footer muestra acciones en orden de prioridad (izquierda = primaria).
- Las cards interactivas deben tener un destino claro.
- Máximo 2 acciones en el footer para no saturar.
