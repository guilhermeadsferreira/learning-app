# ADR-001 — Stack de persistência e autenticação: Supabase + OAuth

**Status:** aceito
**Data:** 2026-03-15

---

## Contexto

O Learning Engine é um SPA 100% client-side com persistência via `localStorage`. Isso cobre o MVP mas apresenta limites claros: progresso não persiste entre dispositivos, sem perfis, sem analytics real, e fragilidade (apagar o browser zera tudo).

A evolução para persistência real por usuário exige decisões acopladas de banco de dados e autenticação — não dá para escolher um sem considerar o outro.

**Estado atual do localStorage:**

| Chave | Conteúdo | Destino futuro |
|-------|----------|----------------|
| `learning-engine-progress` | `{ completedLessonIds[], currentLessonId, xp }` | Migrar para Supabase no primeiro login |
| `learning-engine-ai-provider` | string (claude/openai/openrouter) | Migrar para `user_settings` (opcional) |
| `learning-engine-api-key-{provider}` | string (chave secreta) | **Manter em localStorage — nunca sincronizar** |
| `learning-engine-model-{provider}` | string | Migrar para `user_settings` (opcional) |

**Restrições confirmadas:**
- Stack frontend: Vite + Vercel Functions (sem migração para Next.js)
- Auth: OAuth apenas (GitHub e/ou Google — sem email/senha)
- Guest mode mantido: localStorage continua para usuários sem conta

---

## Opções consideradas

### Opção A — Neon (via Vercel Marketplace)

Postgres serverless com DB branching por preview. Free tier: 0.5 GB, 1.000 compute hours/mês.

**Contra:** requer auth provider separado (Clerk ou Auth.js) + Vercel Functions obrigatórias para toda operação de DB (sem SDK que rode diretamente no browser com segurança). Mais peças para manter.

### Opção B — Supabase (via Vercel Marketplace)

Postgres + Auth + Realtime + Storage. Free tier: 500 MB DB, 50.000 MAU, 5 GB bandwidth.

**A favor:** SDK `@supabase/supabase-js` roda diretamente no browser; auth OAuth nativa (GitHub, Google) sem provider separado; Row Level Security garante isolamento de dados sem backend intermediário.

**Contra:** vendor lock-in moderado no SDK (mitigado isolando em `src/services/supabase/`).

### Opção C — Vercel Postgres

Tecnicamente idêntico ao Neon (wrapper da Vercel). Sem vantagem prática sobre a Opção A neste contexto.

---

## Decisão

**Escolhemos Supabase (Opção B) + Supabase Auth OAuth (GitHub e Google).**

O SDK funciona diretamente no browser sem Vercel Functions para CRUD básico, o que é decisivo para um Vite SPA. RLS elimina a necessidade de proxy backend para segurança. Auth OAuth nativa remove a dependência de Clerk ou Auth.js — menos dependências, menos superfície de falha.

---

## Consequências

### Positivas

- Auth + DB numa única plataforma, um único free tier para monitorar
- RLS garante que usuário A nunca acessa dados do usuário B, mesmo com a anon key exposta no bundle (inevitável em SPAs)
- Guest mode preservado sem mudança de comportamento: unauthenticated → localStorage; authenticated → Supabase
- Migração idempotente ao primeiro login (`ON CONFLICT DO NOTHING`)

### Negativas / Trade-offs aceitos

- Vendor lock-in moderado no SDK — mitigado isolando toda integração em `src/services/supabase/`
- XP histórico do localStorage não tem granularidade por lição — será migrado com `xp_gained: 0` como limitação aceita
- Realtime (leaderboard ao vivo) possível mas fora do escopo do MVP
- Requer configuração de OAuth App no GitHub e Google Console

### Próximos passos

1. Criar projeto Supabase via Vercel Marketplace
2. Configurar OAuth providers (GitHub App + Google OAuth Consent Screen)
3. `npm install @supabase/supabase-js`
4. Criar `src/services/supabase/client.ts`, `auth.ts`, `progress.ts`
5. Implementar `useAuth` e `useProgressSync`
6. Migração do localStorage no callback de SIGNED_IN
7. Botão de login no SettingsDrawer (sem forçar auth)

**Schema mínimo viável:**

```sql
create table user_progress (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid references auth.users(id) on delete cascade,
  lesson_id    text not null,
  completed_at timestamptz default now(),
  xp_gained    integer not null,
  unique(user_id, lesson_id)
);

create table user_settings (
  user_id     uuid primary key references auth.users(id) on delete cascade,
  ai_provider text,
  theme       text default 'dark',
  updated_at  timestamptz default now()
);

alter table user_progress enable row level security;
alter table user_settings enable row level security;

create policy "user vê só o próprio progresso"
  on user_progress for all using (auth.uid() = user_id);
create policy "user vê só as próprias configurações"
  on user_settings for all using (auth.uid() = user_id);
```

---

## Referências

- [Supabase Auth — OAuth](https://supabase.com/docs/guides/auth/social-login)
- [Supabase RLS Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Vercel Marketplace — Supabase](https://vercel.com/marketplace/supabase)
