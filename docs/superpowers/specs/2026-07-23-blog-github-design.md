# Blog admin sem Supabase (GitHub)

## Objetivo

Manter painel `/admin` com e-mail/senha (NextAuth) e persistir posts/imagens no repositório via GitHub Contents API, para funcionar no Netlify sem Supabase.

## Decisão

- Auth: inalterada (`ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`, `AUTH_SECRET`, `AUTH_URL`)
- Posts: `content/blog/posts.json`
- Capas: `public/images/blog/*`
- Escrita admin: GitHub API (produção) ou filesystem (dev sem token)
- Leitura pública: filesystem do deploy
- Leitura admin (quando GitHub configurado): GitHub API (dados frescos antes do rebuild)

## Env

- `GITHUB_TOKEN`, `GITHUB_REPO` (`owner/repo`), `GITHUB_BRANCH` (default `main`)
