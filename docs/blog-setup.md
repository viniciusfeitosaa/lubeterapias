# Blog + admin Casa LuBe

O painel usa **e-mail e senha** (NextAuth). Os posts ficam no repositório (`content/blog/posts.json`); capas em `public/images/blog/`. Em produção, o admin grava via **GitHub API** e o Netlify republica o site.

## 1. Credenciais do admin

```bash
cp .env.example .env.local
```

```bash
# AUTH_SECRET
openssl rand -base64 32

# Hash da senha
npm run hash-password -- "sua-senha-forte"
```

Preencha:

- `AUTH_SECRET`
- `AUTH_URL` (local: `http://localhost:3000`; produção: URL do site)
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD_HASH`

## 2. GitHub (produção / Netlify)

1. Crie um [Personal Access Token](https://github.com/settings/tokens) (classic) com escopo `repo`, **ou** fine-grained com leitura/escrita de Contents no repositório.
2. No Netlify (Site settings → Environment variables), defina:

| Variável | Exemplo |
|---|---|
| `GITHUB_TOKEN` | `ghp_…` |
| `GITHUB_REPO` | `viniciusfeitosaa/lubeterapias` |
| `GITHUB_BRANCH` | `main` |
| + as de auth acima | |

**Dev local:** sem `GITHUB_TOKEN`, o painel grava direto nos arquivos do projeto (ótimo para testar).

## 3. Rodar

```bash
npm run dev
```

- Blog público: `/blog`
- Admin: `/admin/login`

## 4. Fluxo de publicação

1. Login no painel
2. Criar/editar post (opcional: upload de capa)
3. O commit vai para o GitHub
4. Netlify faz o build (cerca de 1–2 min) e o post aparece no site

## 5. Removido

Supabase não é mais necessário para o blog.
