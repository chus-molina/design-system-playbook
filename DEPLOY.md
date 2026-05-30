# Deploy en Vercel

## Variables de entorno requeridas

Configura estas variables en el panel de Vercel (Settings → Environment Variables):

| Variable | Valor |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://mtogidcjpkieomwoawyt.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10b2dpZGNqcGtpZW9td29hd3l0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwNjYwMjQsImV4cCI6MjA5NTY0MjAyNH0.PBd_xtNFe0XZTaIxlCB9lNuCYVWIPdC-sv4XC_CLAtc |
| `NEXT_PUBLIC_SITE_URL` | `https://design-system-playbook-test.vercel.app` |

## Pasos de deploy

1. Sube el proyecto a GitHub:
```bash
git init
git add .
git commit -m "feat: design system playbook inicial"
git remote add origin https://github.com/chus-molina/design-system-playbook.git
git push -u origin main
```

2. Importa el repo en [vercel.com/new](https://vercel.com/new)
3. Configura las variables de entorno (tabla de arriba)
4. En Vercel → Settings → General → Install Command, confirma que está: `npm install --legacy-peer-deps`
5. Haz click en Deploy

## Credenciales de acceso inicial

- **Admin:** info@chusmolina.com / PlaybookTe$t1
- **Supabase Dashboard:** https://supabase.com/dashboard/project/mtogidcjpkieomwoawyt

## Supabase Auth — Configuración

En el panel de Supabase → Authentication → URL Configuration:
- Site URL: `https://design-system-playbook-test.vercel.app`
- Redirect URLs: `https://design-system-playbook-test.vercel.app/auth/callback`

## Desarrollo local

```bash
npm install --legacy-peer-deps
npm run dev
# → http://localhost:3000
```
