---
title: Modal
description: Diálogo superpuesto para acciones que requieren confirmación o contenido contextual.
figmaNodeId: "4281-261299"
---

## design

Los modales interrumpen el flujo para requerir una decisión o mostrar información crítica. Usar con moderación.

### Tipos

- **Confirmación** — Acción irreversible que requiere confirmación explícita
- **Formulario** — Captura de datos en contexto sin abandonar la página
- **Información** — Detalle adicional de un elemento

### Tamaños

- **sm** — max-w-sm (384px) — Confirmaciones simples
- **md** — max-w-md (448px) — Formularios estándar
- **lg** — max-w-lg (512px) — Contenido extenso

### Comportamiento

- Se cierra con tecla `Escape`
- Se cierra al hacer clic en el overlay
- El foco queda atrapado dentro del modal mientras está abierto
- Al cerrarse, el foco vuelve al elemento que lo abrió

## build

### Props principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `open` | `boolean` | — | Controla visibilidad |
| `onClose` | `() => void` | — | Callback al cerrar |
| `title` | `string` | — | Título del diálogo |
| `description` | `string` | — | Subtítulo descriptivo |
| `size` | `sm \| md \| lg` | `md` | Ancho máximo |

### Ejemplo de uso

```tsx
<Modal
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="¿Eliminar proyecto?"
  description="Esta acción no se puede deshacer."
>
  <ModalBody>
    <p>Se perderán todos los datos del proyecto.</p>
  </ModalBody>
  <ModalFooter>
    <Button variant="outline" onClick={() => setIsOpen(false)}>
      Cancelar
    </Button>
    <Button variant="destructive">
      Sí, eliminar
    </Button>
  </ModalFooter>
</Modal>
```

## content

### Títulos de modal

- Usa pregunta para confirmaciones destructivas: "¿Eliminar proyecto?"
- Usa verbo + objeto para formularios: "Editar perfil", "Crear equipo"
- El botón primario repite la acción del título — nunca "Aceptar" u "OK"
- El botón secundario siempre es "Cancelar"

| ✓ Correcto | ✕ Evitar |
|-----------|---------|
| "¿Cerrar sesión?" + botón "Cerrar sesión" | "Advertencia" + botón "Sí" |
| "Editar perfil" + botón "Guardar cambios" | "Editar" + botón "Aceptar" |
