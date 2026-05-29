# Deploy en Vercel

## Variables de entorno requeridas

Configura estas variables en el panel de Vercel (Settings → Environment Variables):

| Variable | Valor |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://mtogidcjpkieomwoawyt.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | *(ver .env.local)* |
| `NEXT_PUBLIC_SITE_URL` | `https://tu-dominio.vercel.app` |

## Pasos de deploy

1. Sube el proyecto a GitHub:
```bash
git init
git add .
git commit -m "feat: design system playbook inicial"
git remote add origin https://github.com/tu-usuario/design-system-playbook.git
git push -u origin main
```

2. Importa el repo en [vercel.com/new](https://vercel.com/new)
3. Configura las variables de entorno
4. Haz click en Deploy

## Credenciales de acceso inicial

- **Admin:** info@chusmolina.com / PlaybookTe$t1
- **Supabase Dashboard:** https://supabase.com/dashboard/project/mtogidcjpkieomwoawyt

## Supabase Auth — Configuración

En el panel de Supabase → Authentication → URL Configuration:
- Site URL: `https://tu-dominio.vercel.app`
- Redirect URLs: `https://tu-dominio.vercel.app/auth/callback`

## Desarrollo local

```bash
npm install --legacy-peer-deps
npm run dev
# → http://localhost:3000
```
