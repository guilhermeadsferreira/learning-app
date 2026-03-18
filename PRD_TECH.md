# PRD Técnico — Learning Engine (study-app)

> Documento vivo — atualizar a cada mudança de stack, arquitetura, schema ou convenção técnica relevante.
> **Última atualização:** 2026-03-18 (auth + Supabase)

---

## Stack

| Camada           | Tecnologia                                    | Versão        |
| ---------------- | --------------------------------------------- | ------------- |
| UI               | React                                         | 18            |
| Linguagem        | TypeScript                                    | strict mode   |
| Bundler          | Vite                                          | 6             |
| Roteamento       | React Router                                  | 7 (Data Mode) |
| Estilização      | Tailwind CSS                                  | 3             |
| Componentes      | shadcn/ui (base-nova) + Lucide icons          | —             |
| Editor de código | Sandpack (`@codesandbox/sandpack-react`)      | —             |
| Persistência     | localStorage (guest) + Supabase (autenticado) | —             |
| Autenticação     | Supabase Auth — OAuth GitHub                  | —             |
| Integrações IA   | Anthropic (Claude), OpenAI, OpenRouter        | —             |
| Notificações     | Sonner                                        | —             |
| Linting          | ESLint + Prettier                             | —             |
| Deploy           | Vercel                                        | —             |

---

## Arquitetura

SPA 100% client-side. Conteúdo declarativo em JSON — novo curso sem alterar código.

```
src/
├── courses/        → conteúdo declarativo (course.json + lessons/*.json)
│                     carregado via import.meta.glob em courses/index.ts
├── engine/         → domain puro (types.ts, progress.ts, xp.ts)
│                     nenhuma dependência externa; testável isoladamente
├── hooks/          → useCourse, useLesson, useProgress, useAIReview,
│                     useLessonNavigation, useCourseFilter, useSettingsDrawer,
│                     useAuth
├── pages/          → HomePage, CoursePage, LessonPage, ErrorPage, NotFoundPage
├── services/ai/    → providers.ts, callers.ts, review.ts, keys.ts, prompts.ts
│                     abstração para Claude, OpenAI, OpenRouter
├── services/supabase/ → client.ts, auth.ts, progress.ts
│                     única camada que importa @supabase/supabase-js
└── components/     → editor/, gamification/, layout/, lesson/, ui/
```

**Princípio:** `engine/` é domínio puro — zero dependências de React, Vite ou APIs externas. `services/` é a única camada que faz I/O externo (APIs de IA + Supabase). `hooks/` conecta engine + services à UI.

**Árvore de providers:**

```
AuthProvider              ← gerencia sessão OAuth
  └── ProgressProvider    ← auth-aware: Supabase se autenticado, localStorage se guest
        └── AppShell
```

---

## Roteamento

| Path                                 | Página                                 | Lazy-loaded |
| ------------------------------------ | -------------------------------------- | ----------- |
| `/`                                  | HomePage — catálogo com busca + filtro | Não         |
| `/course/:courseId`                  | CoursePage — visão de módulos          | Sim         |
| `/course/:courseId/lesson/:lessonId` | LessonPage — lição + editor + IA       | Sim         |

`App.tsx` envolve tudo em `AuthProvider > ProgressProvider` dentro de `AppShell`. Sidebar visível apenas em rotas de curso via `useMatch('/course/:courseId/*')`.

---

## Estrutura de conteúdo (schema)

### course.json

```json
{
  "id": "react",
  "title": "React: Do Iniciante ao Avançado",
  "description": "...",
  "tags": ["frontend", "react"],
  "modules": [
    {
      "id": "modulo-1",
      "title": "Introdução",
      "lessons": ["lesson-1", "lesson-2"]
    }
  ]
}
```

### lesson.json

```json
{
  "id": "lesson-1",
  "title": "O que é React",
  "type": "explanation" | "challenge" | "quiz",
  "hook": "Pergunta provocativa (opcional)",
  "analogy": "Analogia com algo familiar",
  "explanation": "Conteúdo da lição",
  "example": { "code": "...", "language": "tsx" },
  "challenge": { "description": "...", "starterCode": "...", "tests": [] },
  "quiz": { "question": "...", "options": [], "correct": 0 },
  "aiReviewContext": "Contexto para o Professor IA avaliar o desafio"
}
```

---

## Persistência

### Atual (localStorage)

| Chave                                | Conteúdo                                        |
| ------------------------------------ | ----------------------------------------------- |
| `learning-engine-progress`           | `{ completedLessonIds[], currentLessonId, xp }` |
| `learning-engine-ai-provider`        | string (claude/openai/openrouter)               |
| `learning-engine-api-key-{provider}` | string — **nunca sincronizar**                  |
| `learning-engine-model-{provider}`   | string                                          |

### Supabase (usuários autenticados — ver ADR-001)

Tabelas no schema `study_app` (não `public`). Requer:

1. **Supabase Dashboard → Project Settings → API → Exposed schemas:** adicionar `study_app`
2. **SQL Editor:** conceder permissões ao role `authenticated`:

```sql
grant usage on schema study_app to anon, authenticated;
grant all on study_app.user_progress to authenticated;
```

Schema:

```sql
create schema study_app;

create table study_app.user_progress (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid references auth.users(id) on delete cascade,
  lesson_id    text not null,
  completed_at timestamptz default now(),
  xp_gained    integer not null,
  unique(user_id, lesson_id)
);

alter table study_app.user_progress enable row level security;

create policy "user vê só o próprio progresso"
  on study_app.user_progress for all using (auth.uid() = user_id);
```

---

## Sistema de IA (Professor IA)

Providers suportados: Claude (Anthropic), OpenAI, OpenRouter.

Fluxo de revisão:

1. Aluno submete código no challenge
2. `useAIReview` chama `reviewWithAI(code, aiReviewContext, provider)`
3. `services/ai/review.ts` monta prompt com contexto da lição + código
4. Provider retorna JSON estruturado: `{ feedback, isCorrect, encouragement, suggestions, nextStepHint }`
5. `FeedbackCard` renderiza o resultado

API keys armazenadas em localStorage via `services/ai/keys.ts` — nunca enviadas ao servidor da plataforma.

---

## Gamificação

| Tipo de lição | XP  |
| ------------- | --- |
| explanation   | 10  |
| quiz          | 10  |
| challenge     | 25  |

XP acumulado em `ProgressProvider` → persistido em localStorage (sempre, como fallback) + `study_app.user_progress` via `xp_gained` por lição (autenticado).

---

## Variáveis de Ambiente

```bash
VITE_SUPABASE_URL=        # URL do projeto Supabase (obrigatório para auth)
VITE_SUPABASE_ANON_KEY=   # Anon key pública — segura com RLS ativo (ver ADR-001)
```

Sem essas variáveis o app funciona em guest mode (localStorage). API keys de IA são configuradas pelo usuário no Settings Drawer — não são variáveis de ambiente.

---

## Comandos

```bash
npm run dev          # servidor de desenvolvimento (localhost:5173)
npm run build        # tsc + vite build → dist/
npm run lint         # ESLint + Prettier check
npm run lint:fix     # auto-fix
npm run format       # Prettier write
npm run preview      # preview do build de produção
```

---

## Convenções de código

- **Idioma:** UI e conteúdo em português BR; código (variáveis, funções, tipos) em inglês
- **Conteúdo:** nunca hardcoded em componentes — sempre em JSON em `src/courses/`
- **Engine:** `src/engine/` sem imports de React ou APIs externas
- **Tipos:** todos centralizados em `src/engine/types.ts`
- **Hooks:** lógica de negócio em hooks customizados; componentes só consomem

---

## Testes

Sem suite de testes definida. Sem cobertura atual.
