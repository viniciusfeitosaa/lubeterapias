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

| Variável | Exemplo / nota |
|---|---|
| `AUTH_SECRET` | mesmo do `.env` local |
| `AUTH_URL` | URL pública **https://…** (sem barra no final) |
| `ADMIN_EMAIL` | `admin@lubeterapia.com.br` |
| `ADMIN_PASSWORD_HASH_B64` | hash em Base64 (ver abaixo) — **não** use o hash com `$` cru |
| `GITHUB_TOKEN` | `ghp_…` |
| `GITHUB_REPO` | `viniciusfeitosaa/lubeterapias` |
| `GITHUB_BRANCH` | `main` |

### Por que Base64 no Netlify?

O Netlify interpreta `$…` nas variáveis de ambiente e **quebra** o hash bcrypt (`$2b$12$…`).  
Gere o Base64 a partir do hash real:

```bash
node -e "console.log(Buffer.from(process.argv[1]).toString('base64'))" "$2b$12$SEU_HASH_AQUI"
```

Depois de salvar as variáveis, faça **Clear cache and deploy site**.

**Dev local:** use `ADMIN_PASSWORD_HASH` com `\$` no `.env`. Sem `GITHUB_TOKEN`, o painel grava nos arquivos locais.

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
