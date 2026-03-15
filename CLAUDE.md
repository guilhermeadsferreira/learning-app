# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # TypeScript check + Vite build to dist/
npm run lint         # ESLint + Prettier check
npm run lint:fix     # Auto-fix ESLint + Prettier issues
npm run format       # Prettier write
npm run preview      # Preview production build
```

No test suite is defined yet.

## Persona e papel

Você atua como **desenvolvedor e guardião arquitetural** deste projeto. Seu papel é proteger a qualidade técnica, pedagógica e estrutural da plataforma — não apenas implementar tarefas. Identifique inconsistências, questione decisões ruins, proponha refatorações e aponte divergências entre documentação e código. Se identificar decisões que degradam a arquitetura, proponha melhorias antes de implementar.

## Idioma

- **Conteúdo pedagógico e UI**: português brasileiro
- **Código**: inglês (variáveis, funções, componentes, tipos)

## Architecture

This is a client-side-only gamified learning SPA (React 18 + TypeScript + Vite). No backend — all persistence is via `localStorage`.

### Routing (React Router v7)

```
/                               → HomePage (course catalog)
/course/:courseId               → CoursePage (lazy-loaded)
/course/:courseId/lesson/:lessonId → LessonPage (lazy-loaded)
```

`App.tsx` wraps the entire app in `ProgressProvider` inside `AppShell`. Sidebar is conditionally shown via `useMatch('/course/:courseId/*')`.

### Content Layer

Courses and lessons are **declarative JSON files** loaded via Vite's `import.meta.glob` in `src/courses/index.ts`. Adding a new course means creating a directory under `src/courses/` with a `course.json` and lesson files — no code changes needed. Schemas are documented in `documents/product/methodology/course_schema.md` and `documents/product/methodology/lesson_schema.md`.

### State Management

- **`ProgressProvider`** (`src/hooks/useProgress.tsx`) — single context for `completedLessonIds`, `currentLessonId`, and `xp`. Auto-syncs to `localStorage` key `learning-engine-progress`. Includes migration logic in `src/engine/progress-migration.ts`.
- **`SettingsDrawerProvider` / `useSettingsDrawer`** (`src/hooks/useSettingsDrawer.tsx`) — simple open/close state for the settings drawer.
- AI provider and API keys are stored in `localStorage` under `learning-engine-ai-provider` and `learning-engine-api-key-{provider}` (never sent to a backend).

### Custom Hooks

Business logic lives in hooks, not components:

- `useProgress()` — progress management
- `useSettingsDrawer()` — settings drawer open/close state
- `useCourse()` / `useLesson()` — derive current course/lesson from route params
- `useLessonNavigation()` — prev/next lesson
- `useCourseFilter()` — search + tag filtering
- `useAIReview()` — AI feedback workflow (`src/services/ai/`)

### Key Directories

| Path                        | Purpose                                            |
| --------------------------- | -------------------------------------------------- |
| `src/engine/types.ts`       | All shared TypeScript interfaces — start here      |
| `src/engine/`               | Domain logic: types, XP rules, progress mutations, localStorage persistence |
| `src/services/`             | External API integrations (Anthropic, OpenAI, OpenRouter)                   |
| `src/hooks/`                | Custom hooks + context providers (useProgress, useSettingsDrawer, etc.) |
| `src/courses/`              | JSON content (courses + lessons)                   |
| `src/components/lesson/`    | Lesson rendering, challenges, quizzes, AI feedback |
| `src/components/ui/`        | shadcn/ui components                               |
| `documents/product/`        | PRD, pedagogy, schemas, AI system design           |
| `documents/tech/`           | React and React Router best practices              |
| `tasks/`                    | Project task files (pendente/done)                 |

> **Fronteira `engine/` vs `services/`:** `engine/` cobre lógica de domínio e persistência local (`localStorage`). Isso é uma exceção intencional à regra "sem I/O" — localStorage é storage interno, não integração externa. I/O externo (chamadas a APIs de terceiros) pertence exclusivamente a `services/`.

### TypeScript

- Strict mode enabled; no `any` in core files
- Path alias: `@/*` → `./src/*`
- Centralized types in `src/engine/types.ts` — add new interfaces there

### UI Stack

- Tailwind CSS v3 (dark mode via `class`)
- shadcn/ui (base-nova style, lucide icons)
- Sandpack (`@codesandbox/sandpack-react`) for in-browser code execution in lessons
- Sonner for toast notifications

## Convenções de código React

Anti-patterns a evitar:

| Evitar                           | Usar                                            |
| -------------------------------- | ----------------------------------------------- |
| `Link` envolvendo `Button`       | `Link` com `buttonVariants` ou `Button asChild` |
| `key={i}` em listas dinâmicas    | `key={item.id}`                                 |
| God component                    | Extrair `useX` e subcomponentes                 |
| `useEffect` para estado derivado | Calcular durante o render                       |
| `pathname.includes('/course/')`  | `useMatch('/course/:courseId/*')`               |

- Importar de `react-router` (pacote canônico em v7)
- Extraia lógica para custom hooks se o componente passar de ~200 linhas
- `useCallback/useMemo` apenas quando há re-renders desnecessários mensuráveis
- Named exports para componentes e hooks
- Functional components com desestruturação de props

## Curadoria código × documentação

Após qualquer alteração, verifique se a documentação precisa ser atualizada:

| Gatilho                                  | Documentos a verificar                                           |
| ---------------------------------------- | ---------------------------------------------------------------- |
| Alteração em `src/engine/types.ts`       | `lesson_schema.md`, `course_schema.md`, `content_generation.md`  |
| Nova lição JSON                          | Campos obrigatórios presentes + ID referenciado no `course.json` |
| Novo componente/página/serviço           | `prd.md` §12 (Arquitetura)                                       |
| Alteração no fluxo pedagógico            | `pedagogy.md`                                                    |
| Alteração em `src/services/ai/`          | `AI_SYSTEM.md`                                                   |

**Regra central:** quando há divergência entre código e doc, corrija o documento (não o código), salvo decisão arquitetural explícita. Funcionalidades planejadas mas não implementadas devem ser marcadas como `*(aspiracional — não implementado ainda)*`.

Se docs foram corrigidos após uma alteração, informe brevemente:

```
Docs atualizados:
- lesson_schema.md: adicionado campo `challengeType`
```

## Slash commands disponíveis

| Comando                     | Uso                                            |
| --------------------------- | ---------------------------------------------- |
| `/git-commit`               | Pré-revisão + commit semântico em PT-BR + push |
| `/new-content [contexto]`   | Adicionar lição a curso existente              |
| `/new-course [tema]`        | Criar curso completo do zero                   |
| `/new-task [contexto]`      | Criar task de projeto em `tasks/`              |
| `/plan-task [nome da task]` | Planejar execução de uma task existente        |
| `/review-course [courseId]` | Auditar e melhorar curso existente             |
