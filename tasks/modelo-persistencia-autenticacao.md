# Modelo de Persistência, Autenticação e Escolha de Storage

**Status:** pendente

---

## Objetivo

Investigar e decidir a stack de banco de dados + autenticação que vai sustentar a evolução do Learning Engine de um SPA client-side para uma aplicação com persistência real por usuário, priorizando opções disponíveis via Vercel Marketplace.

## Contexto

Hoje toda a persistência é feita via `localStorage` (progresso, XP, API keys de IA). Isso funciona para o MVP, mas apresenta limitações claras:

- Progresso não persiste entre dispositivos
- Sem possibilidade de perfis, leaderboards ou features sociais
- Fragilidade (limpar o browser apaga tudo)
- Sem analytics de uso real

Como a aplicação já está na Vercel, o Vercel Marketplace oferece integrações nativas com provedores de DB — simplificando credenciais, variáveis de ambiente e billing. As opções mais relevantes são:

- **Neon** — Postgres serverless, free tier generoso, DB branching por preview
- **Supabase** — Postgres + Auth + Realtime + Storage, mais completo mas mais opinativo
- **Vercel Postgres** — wrapper da Vercel sobre Neon (diferença prática a avaliar)
- **Vercel KV** (Upstash Redis) — key-value, útil como complemento para sessões/cache

Autenticação e banco são inseparáveis aqui: sem auth, não há como associar progresso a um usuário com segurança.

## Escopo

### 1. Definir o modelo de dados mínimo

Antes de escolher provider, mapear o que precisamos persistir:

- **Usuário:** id, nome, email, avatar, data de criação
- **Autenticação:** método (OAuth? magic link? email/senha?), tokens, sessões
- **Progresso:** lições concluídas, status por módulo, % de conclusão por curso
- **XP:** total acumulado, histórico de ganhos (por lição, por dia)
- **Configurações:** provider de IA preferido, modelo, tema visual
- Critério: o que pode continuar no `localStorage` (ex: API keys de IA) vs. o que precisa ir pro servidor

### 2. Avaliar Neon (via Vercel Marketplace)

- Free tier: limites de compute, storage e conexões simultâneas
- Integração Vercel: envs automáticas, preview branches com DB branching
- Modelo serverless: cold starts, connection pooling (PgBouncer incluso?)
- Requer auth separada (ex: NextAuth, Clerk, Auth.js)
- Custo ao escalar

### 3. Avaliar Supabase (via Vercel Marketplace)

- Free tier: limites de rows, storage e bandwidth
- Diferenciais: Auth embutido com OAuth, Row Level Security, Realtime, Storage
- SDK JavaScript `@supabase/supabase-js`: quão invasivo é adotar no stack atual?
- Tradeoff: mais "vendor lock-in" que Postgres puro, mas auth já resolvida
- Custo ao escalar

### 4. Avaliar Vercel Postgres e Vercel KV

- Vercel Postgres: é basicamente Neon com billing direto pela Vercel — diferença prática?
- Vercel KV (Upstash Redis): faz sentido como complemento para sessões/cache, não como DB principal

### 5. Analisar impacto arquitetural

- O projeto hoje é 100% client-side (Vite SPA). Para usar DB com segurança, precisamos de uma camada backend — Vercel Functions / API Routes são a opção natural
- Qual a mudança mínima na arquitetura atual para suportar auth + DB?
- Queremos manter guest mode (localStorage) para quem não criar conta?
- Como migrar dados existentes do `localStorage` para o backend no primeiro login?

### 6. Decisão e schema mínimo viável

Com base na pesquisa:

- Provider recomendado + justificativa
- Provider descartado + motivo
- Schema mínimo: diagrama de tabelas/entidades
- Estratégia de autenticação (provider de auth escolhido)
- Estimativa de custo no free tier e no tier pago

## Questões a responder

- Qual o volume esperado de usuários nos próximos 6 meses?
- Queremos auth própria ou OAuth é suficiente (GitHub, Google)?
- Realtime é necessário (ex: leaderboard ao vivo) ou eventual consistency é ok?
- Preferimos Postgres puro + auth separada (Neon + Clerk/Auth.js) ou plataforma integrada (Supabase)?
- O billing indo pela Vercel ou direto no provider é indiferente?
- Guest mode (sem conta) deve continuar sendo suportado pós-auth?

## Entregável

Documento `documents/tech/persistence-model.md` contendo:

1. Modelo de dados: diagrama de entidades e schema mínimo viável
2. Tabela comparativa dos providers (Neon vs Supabase vs Vercel Postgres)
3. Recomendação de stack (DB + auth) com justificativa
4. Esboço da nova arquitetura com camada backend (Vercel Functions)
5. Plano de migração do `localStorage` para o banco escolhido
6. Próximos passos concretos para implementação
