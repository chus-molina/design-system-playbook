---
title: Input
description: Campo de texto para captura de datos del usuario. Soporta estados de validación, hints y labels accesibles.
figmaNodeId: "4281-261394"
---

## design

Los inputs permiten al usuario introducir y editar datos. Su diseño debe priorizar la claridad del estado actual y guiar al usuario hacia la acción correcta.

### Estados

- **Normal** — Borde sutil, placeholder visible
- **Focus** — Borde azul primario con ring suave
- **Error** — Borde rojo con mensaje explicativo debajo
- **Disabled** — Fondo gris, cursor not-allowed
- **Success** — Borde verde tras validación exitosa

### Variantes

- **Default** — Campo estándar con borde
- **Bordered** — Mayor énfasis visual del borde
- **Underlined** — Solo línea inferior, más minimalista
- **Flat** — Sin borde, fondo sutil

## build

### Props principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `label` | `string` | — | Label accesible del campo |
| `placeholder` | `string` | — | Texto de ayuda interno |
| `error` | `string` | — | Mensaje de error visible |
| `hint` | `string` | — | Texto de ayuda preventivo |
| `disabled` | `boolean` | `false` | Estado deshabilitado |

### Ejemplo de uso

```tsx
<Input
  label="Email"
  placeholder="escribe tu email"
  type="email"
/>

<Input
  label="Contraseña"
  type="password"
  placeholder="******"
  error="Mínimo 8 caracteres"
/>
```

## content

### Labels y placeholders

- **Label** — Describe QUÉ se pide. Siempre visible, nunca reemplazado por el placeholder.
- **Placeholder** — Muestra el formato esperado (`dd/mm/aaaa`) o un ejemplo (`ej: Juan García`).
- **Error** — Explica qué falló y cómo corregirlo. Nunca "Campo inválido".
- **Hint** — Reglas de formato antes de que el usuario escriba.

| ✓ Correcto | ✕ Evitar |
|-----------|---------|
| El email ya existe en el sistema | Error en el campo email |
| Introduce una fecha válida (dd/mm/aaaa) | Formato incorrecto |
| La contraseña debe tener al menos 8 caracteres | Contraseña inválida |
