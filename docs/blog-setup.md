# Blog + admin Casa LuBe

## 1. Supabase

1. Crie um projeto em [supabase.com](https://supabase.com).
2. No **SQL Editor**, execute o conteúdo de [`supabase/schema.sql`](../supabase/schema.sql).
3. Em **Storage**, confirme o bucket `blog` (público).
4. Em **Project Settings → API**, copie:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` `public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` → `SUPABASE_SERVICE_ROLE_KEY` (nunca no client)

## 2. Variáveis de ambiente

```bash
cp .env.example .env.local
```

Gere segredos:

```bash
# AUTH_SECRET
openssl rand -base64 32

# Hash da senha do admin
node scripts/hash-password.mjs "sua-senha-forte"
```

Preencha `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH` e as chaves Supabase em `.env.local`.

## 3. Rodar

```bash
npm run dev
```

- Blog público: `/blog`
- Admin: `/admin/login`

## 4. Deploy (Vercel)

Defina as mesmas variáveis no painel da Vercel. `AUTH_URL` deve ser a URL pública do site.
