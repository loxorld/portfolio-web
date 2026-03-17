# Portfolio Web

Frontend del portfolio personal. Renderiza el sitio publico y el panel admin,
consumiendo la API del repo `portfolio-api`.

Repositorio backend: https://github.com/loxorld/portfolio-api

## Stack

- Next.js
- TypeScript
- Tailwind CSS
- App Router

## Que incluye

- Home, About, Contact y listado de proyectos
- Detalle de proyecto consumido desde la API
- Panel admin para crear, editar y borrar proyectos
- Filtros por tags en la vista de proyectos

## Desarrollo local

Variables habituales:

- `NEXT_PUBLIC_API_BASE_URL`
- `API_BASE_URL`
- `ADMIN_TOKEN`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`

Inicio rapido:

```bash
npm install
npm run dev
```
