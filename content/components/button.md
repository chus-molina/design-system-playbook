---
title: Button
description: Elemento interactivo principal para disparar acciones. Extraído de HeroUI v2.
figmaNodeId: "4281-261159"
---

## design

Los botones comunican acciones que el usuario puede realizar. Existen en distintas variantes según el nivel de énfasis que requiera la acción.

### Variantes disponibles

- **Primary** — Acción principal de la pantalla. Úsalo una sola vez por vista.
- **Secondary** — Acción alternativa de menor peso visual.
- **Outline** — Acción neutral sin relleno. Para acciones terciarias.
- **Ghost** — Acción discreta, integrada en el contexto.
- **Destructive** — Eliminar, cancelar irreversiblemente. Siempre requiere confirmación.

### Tamaños

- **sm** — Tablas, listas compactas, chips de acción.
- **md** — Tamaño estándar en la mayoría de interfaces.
- **lg** — CTAs hero, formularios principales.

### Estados

Normal → Hover → Active → Focus → Disabled → Loading

## build

Instala el componente desde tu librería de UI o cópialo desde el código de referencia en la pestaña Desarrollo.

### Props principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `variant` | `primary \| secondary \| outline \| ghost \| destructive` | `primary` | Estilo visual |
| `size` | `sm \| md \| lg` | `md` | Tamaño del botón |
| `loading` | `boolean` | `false` | Muestra spinner y deshabilita |
| `disabled` | `boolean` | `false` | Estado deshabilitado |

### Ejemplo de uso

```tsx
<Button variant="primary" size="md">
  Guardar cambios
</Button>

<Button variant="destructive" loading={isDeleting}>
  Eliminar cuenta
</Button>
```

## content

### Microcopy de botones

Los textos de los botones deben ser claros, concisos y describir exactamente la acción que ocurrirá.

**Reglas:**
- Usa verbo + objeto: "Guardar cambios", "Enviar solicitud"
- Sin puntuación final
- En español, sin anglicismos
- El botón destructivo nombra exactamente lo que se elimina

**Ejemplos correctos vs incorrectos:**

| ✓ Correcto | ✕ Evitar | Motivo |
|-----------|---------|--------|
| Guardar cambios | Click aquí | Verbo + objeto específico |
| Eliminar cuenta | Eliminar | Especifica qué se elimina |
| Ver detalles | Más información | Verbos activos |
| Enviar solicitud | Submit | Sin anglicismos |
