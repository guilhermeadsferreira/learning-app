# Learning Engine

Plataforma web gamificada de aprendizado técnico, construída para tornar o estudo de programação mais progressivo, prático e motivador.

**Acesse:** https://learning-app-delta-kohl.vercel.app/

---

## O que é o projeto

**Learning Engine** é uma plataforma de estudo assistido por IA, inspirada em Duolingo e Codecademy, com foco em programação.

A ideia central é combinar:

- **Microlearning** — lições curtas e objetivas
- **Prática ativa** — desafios de código com editor interativo (Sandpack)
- **Gamificação leve** — XP, barra de progresso, sensação de avanço
- **IA como tutor** — feedback personalizado e chat para tirar dúvidas

O primeiro curso disponível é **React: Do Iniciante ao Avançado** — 16 módulos, 65 lições cobrindo desde o ecossistema até TypeScript e React 19.

A arquitetura foi pensada como um **engine genérico**: o conteúdo é declarativo (JSON), desacoplado da plataforma, permitindo novos cursos sem alterar o código da aplicação.

---

## Objetivo

Resolver os principais problemas de quem estuda frameworks por conta própria:

- excesso de teoria, pouca prática guiada
- dificuldade de retenção sem revisão estruturada
- baixa motivação para continuar estudando
- sensação de complexidade sem percepção de progresso

A plataforma entrega:

- cada lição é pequena e completável em minutos
- progresso visual e XP acumulado
- prática real com editor de código no browser
- feedback imediato via IA (Claude ou OpenAI)

---

## Metodologia pedagógica

A plataforma aplica quatro abordagens combinadas:

### Active Learning

O aluno aprende fazendo. Lições de explicação contextualizam o conceito; lições de desafio e quiz exigem ação ativa.

### Scaffolding

Dificuldade aumenta gradualmente. Estrutura típica de módulo: analogia concreta → explicação → exemplo de código → exercício assistido → desafio independente.

### Retrieval Practice

Desafios e quizzes forçam o aluno a recuperar ativamente o que aprendeu, em vez de apenas reler.

### Mastery Learning

Desafios práticos com starter code, hint e solução de referência. O aluno deve demonstrar entendimento antes de avançar (desbloqueio progressivo é uma melhoria planejada).

### Tipos de lição

| Tipo          | Descrição                                            | Prática  |
| ------------- | ---------------------------------------------------- | -------- |
| `explanation` | Lição conceitual com analogia e conteúdo estruturado | Indireta |
| `challenge`   | Desafio prático no editor Sandpack                   | Direta   |
| `quiz`        | Perguntas de múltipla escolha (retrieval)            | Direta   |

### XP por lição

| Tipo                   | XP    |
| ---------------------- | ----- |
| `explanation` / `quiz` | 10 XP |
| `challenge`            | 25 XP |

---

## Sistema de IA — Professor IA

O **Professor IA** é um tutor integrado à plataforma com dois modos:

### Revisão de código

O aluno envia sua solução e recebe um feedback estruturado:

- `feedback` — análise em 2–4 parágrafos
- `isCorrect` — se a resposta é correta
- `encouragement` — mensagem motivacional personalizada
- `suggestions` — sugestões práticas de melhoria
- `nextStepHint` — o que explorar a seguir

### Chat

O aluno tira dúvidas durante o desafio. A IA nunca entrega a resposta — dá dicas progressivas, referencia o código do aluno, mantém tom encorajador.

### Providers suportados

| Provider           | Modelo                     |
| ------------------ | -------------------------- |
| Claude (Anthropic) | `claude-sonnet-4-20250514` |
| OpenAI             | `gpt-4o-mini`              |

A API key é configurada pelo aluno via interface e armazenada localmente no browser — nunca enviada para servidores da plataforma.

O comportamento da IA se adapta ao curso via `aiReviewContext` no `course.json`: subject, expertise, codeLanguage e challengeStyle.

---

## Curso: React — Do Iniciante ao Avançado

16 módulos, 65 lições:

1. Ecossistema e Ferramentas (Node, npm, Vite)
2. Introdução ao React (o que é React, JSX)
3. Componentes (props, children, composição)
4. Estado e Interatividade (useState, eventos, formulários)
5. useEffect e Efeitos
6. Hooks Avançados (useRef, useContext, useReducer, useMemo/useCallback)
7. Custom Hooks
8. Estilização com Tailwind CSS
9. React Router
10. Gerenciamento de Estado (Context API)
11. Formulários Avançados (react-hook-form, Zod)
12. Data Fetching (fetch, TanStack Query)
13. Padrões e Boas Práticas
14. Testes
15. Performance
16. Avançado (TypeScript, React 19)

---

## Stack

| Camada            | Tecnologia                            |
| ----------------- | ------------------------------------- |
| Frontend          | React 18 + TypeScript + Vite          |
| UI                | Tailwind CSS + shadcn/ui              |
| Editor interativo | Sandpack                              |
| Roteamento        | React Router v7 (Data Mode)           |
| Persistência      | localStorage (progresso, XP, API key) |
| IA                | Claude (Anthropic) + OpenAI           |

---

## Arquitetura

```
src/
├── components/     → editor, gamificação, layout, lição, ui
├── courses/        → conteúdo declarativo (course.json + lessons/*.json)
├── engine/         → types.ts, progresso, XP
├── hooks/          → useCourse, useLesson, useProgress
├── lib/            → utils
├── pages/          → HomePage, CoursePage, LessonPage
├── services/       → ai-review.ts (Claude, OpenAI)
└── styles/         → globals.css
```

**Princípios arquiteturais:**

- Conteúdo declarativo em JSON — novos cursos sem alterar o código
- Engine desacoplada do conteúdo e da UI
- Hooks customizados para toda lógica de negócio
- Tipos centralizados em `src/engine/types.ts`

---

## Como rodar

```bash
npm install
npm run dev
```

Acesse http://localhost:5173

Para usar o Professor IA, configure uma API key (Claude ou OpenAI) via interface da plataforma.

---

## Documentação interna

| Arquivo                                   | Conteúdo                               |
| ----------------------------------------- | -------------------------------------- |
| `documents/product/prd.md`                | Visão, escopo e próximos passos        |
| `documents/product/pedagogy.md`           | Metodologia pedagógica detalhada       |
| `documents/product/lesson_schema.md`      | Schema completo de lições              |
| `documents/product/course_schema.md`      | Schema de cursos e módulos             |
| `documents/product/AI_SYSTEM.md`          | Arquitetura do Professor IA            |
| `documents/product/content_generation.md` | Prompt e guia para geração de conteúdo |

---

## Próximos passos

**Pedagógico:**

- Quizzes intercalados para retrieval practice
- Mini projetos ao final de módulos
- Campo `hook` nas lições (pergunta provocativa)
- Mais lições do tipo `challenge` (aumentar prática ativa)

**Técnico:**

- Desbloqueio progressivo de lições (Mastery Learning)
- Spaced repetition
- Novos cursos (Python, TypeScript, Next.js, Node.js, Docker)
- Analytics de progresso
