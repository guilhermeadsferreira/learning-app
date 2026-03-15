# AUDIT.md — Auditoria de Alinhamento: Documentação × Implementação

**Data:** 2026-03-14
**Escopo:** Projeto Learning Engine (study-app)
**Metodologia:** Análise bidirecional — documentação vs. código-fonte

---

# 1. Resumo da Documentação Atual

## 1.1 PRD (prd.md)

| Aspecto                | O que define                                                                           |
| ---------------------- | -------------------------------------------------------------------------------------- |
| **Visão**              | Plataforma web de estudo gamificado para programação                                   |
| **Primeiro curso**     | React Fundamentals                                                                     |
| **Público**            | Pessoas que querem evoluir na programação                                              |
| **Princípios**         | Microlearning, active recall, prática ativa, revisão, progressão gradual, analogias    |
| **MVP**                | Cursos, módulos, lições (explicação, desafio, quiz), progresso, XP, barra de progresso |
| **Módulos planejados** | 3 módulos (Introdução, Componentes, Estado) com ~6 tópicos                             |
| **UI**                 | Header, Sidebar, Área principal, Rodapé                                                |
| **Stack**              | React, Vite, TypeScript, Tailwind, shadcn/ui, Sandpack                                 |
| **Persistência**       | Supabase (planejado)                                                                   |
| **Fora de escopo**     | Multiplayer, ranking, marketplace, mobile, IA tutor avançado, analytics                |

## 1.2 Pedagogia (pedagogy.md)

| Aspecto                   | O que define                                                                                             |
| ------------------------- | -------------------------------------------------------------------------------------------------------- |
| **Metodologias**          | Active Learning, Mastery Learning, Scaffolding, Retrieval Practice                                       |
| **Estrutura de lição**    | 7 partes obrigatórias: Hook → Analogia → Explicação → Exemplo → Desafio → Feedback → Lembre-se           |
| **Progressão de módulos** | Introdução → Conceitos → Exercícios guiados → Desafios → Mini projeto → Revisão                          |
| **Níveis de dificuldade** | 1 (completar) → 2 (editar) → 3 (criar) → 4 (resolver problema)                                           |
| **Tipos de exercício**    | Code Completion, Code Correction, Implementation, Quiz, Debugging                                        |
| **Regras**                | Toda lição deve ter desafio, explicações curtas, analogias concretas, exemplos, mini projetos por módulo |

## 1.3 Course Schema (course_schema.md)

| Aspecto                     | O que define                                                                          |
| --------------------------- | ------------------------------------------------------------------------------------- |
| **Estrutura de diretórios** | `courses/course-id/course.json` + `modules/module-id.json` + `lessons/lesson-id.json` |
| **Campos do curso**         | id, title, description, difficulty, estimatedDuration, modules (array de strings)     |
| **Campos do módulo**        | id, title, description, lessons (array de strings)                                    |
| **Módulos como arquivos**   | Arquivos separados em `modules/`                                                      |

## 1.4 Lesson Schema (lesson_schema.md)

| Aspecto              | O que define                                                                                                          |
| -------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Campos**           | id, title, type, hook, analogy, explanation, example ({code}), challenge ({type, description, starterCode}), remember |
| **Tipos de lição**   | concept, challenge, quiz, project                                                                                     |
| **Tipos de desafio** | completion, correction, implementation, debugging                                                                     |

## 1.5 Content Generation (content_generation.md)

| Aspecto                   | O que define                                                            |
| ------------------------- | ----------------------------------------------------------------------- |
| **Papel da IA**           | Instrutor experiente para iniciantes                                    |
| **Formato de saída**      | JSON seguindo LESSON_SCHEMA.md                                          |
| **Estrutura obrigatória** | Hook → Analogia → Explicação → Exemplo → Desafio → Feedback → Lembre-se |
| **Prompt padrão**         | Prompt completo para gerar lições                                       |

---

# 2. Resumo da Implementação Real

## 2.1 Estrutura do Projeto

```
src/
├── components/
│   ├── editor/        → CodeEditorPanel (Sandpack), PreviewPanel
│   ├── gamification/  → ProgressBar, XPBadge
│   ├── layout/        → AppShell, Header, SidebarCourseNavigation
│   ├── lesson/        → AIReviewCard, APIKeyDialog, ChallengeCard,
│   │                     FeedbackCard, LessonContent, LessonLayout
│   └── ui/            → badge, button, card, progress (shadcn)
├── courses/
│   ├── index.ts       → getCourse(), getLesson(), getAllCourses()
│   └── react/
│       ├── course.json
│       └── lessons/   → 65 arquivos JSON
├── engine/
│   ├── types.ts       → Todas as interfaces TypeScript
│   ├── progress.ts    → localStorage persistence
│   └── xp.ts          → Sistema de XP
├── hooks/             → useCourse, useLesson, useProgress
├── pages/             → HomePage, CoursePage, LessonPage
├── services/          → ai-review.ts (Claude + OpenAI)
├── lib/               → utils.ts
└── styles/            → globals.css
```

## 2.2 Curso Real Implementado

**Título:** "React: Do Iniciante ao Avançado"

**16 módulos, 65 lições:**

| #   | Módulo                       | Lições |
| --- | ---------------------------- | ------ |
| 1   | Ecossistema e Ferramentas    | 5      |
| 2   | Introdução ao React          | 3      |
| 3   | Componentes                  | 5      |
| 4   | Estado e Interatividade      | 4      |
| 5   | useEffect e Efeitos          | 3      |
| 6   | Hooks Avançados              | 4      |
| 7   | Custom Hooks                 | 4      |
| 8   | Estilização com Tailwind CSS | 6      |
| 9   | React Router                 | 7      |
| 10  | Gerenciamento de Estado      | 3      |
| 11  | Formulários Avançados        | 3      |
| 12  | Data Fetching                | 3      |
| 13  | Padrões e Boas Práticas      | 4      |
| 14  | Testes                       | 4      |
| 15  | Performance                  | 4      |
| 16  | Avançado                     | 3      |

## 2.3 Interface TypeScript Real da Lição

```typescript
interface Lesson {
  id: string
  courseId: string
  moduleId: string
  title: string
  type: 'explanation' | 'challenge' | 'quiz'
  xp: number
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  analogy?: string
  content: {
    sections: ContentSection[] // paragraph | code | list | heading | callout
  }
  challenge?: {
    instructions: string
    starterCode: string
    solution: string
    tests: TestCase[]
    hint?: string
    solutionExplanation?: string
    sandpackDependencies?: Record<string, string>
  }
  quiz?: QuizQuestion[]
  keyTakeaways?: string[]
  commonMistakes?: string[]
  realWorldExample?: string
  encouragement?: string
}
```

## 2.4 Interface Real do Curso

```typescript
interface Course {
  id: string
  title: string
  description: string
  icon: string // Emoji do curso
  modules: Module[] // Inline, NÃO referências a arquivos
}

interface Module {
  id: string
  title: string
  lessons: string[] // IDs das lições
}
```

## 2.5 Sistema de Conteúdo Estruturado

As lições usam `content.sections[]` com tipos ricos:

| Tipo        | Uso                               | Variantes                |
| ----------- | --------------------------------- | ------------------------ |
| `heading`   | Títulos de seções                 | —                        |
| `paragraph` | Texto corrido                     | —                        |
| `code`      | Blocos de código                  | `language`               |
| `list`      | Listas (itens separados por `\n`) | —                        |
| `callout`   | Destaques visuais                 | `tip`, `warning`, `info` |

## 2.6 Sistema de XP

| Tipo de lição | XP  |
| ------------- | --- |
| `explanation` | 10  |
| `quiz`        | 10  |
| `challenge`   | 25  |

## 2.7 Sistema de Progresso

- `UserProgress`: `completedLessonIds[]`, `currentLessonId`, `xp`
- Persistência: `localStorage` com key `learning-engine-progress`
- Context API: `ProgressProvider` com `completeLesson()`, `setCurrentLesson()`, `isLessonCompleted()`

## 2.8 Sistema de IA (Professor IA)

Feature completa implementada apesar de listada como "fora de escopo" no PRD:

- **Providers:** Claude (Anthropic) e OpenAI (GPT-4o-mini) com sistema plugável
- **Review:** Análise estruturada do código do aluno retornando `AIReviewResponse` (feedback, isCorrect, encouragement, suggestions, nextStepHint)
- **Chat:** Sistema de Q&A para tirar dúvidas durante desafios
- **API Key:** Gerenciamento local com dialog de configuração, suporte a múltiplos providers
- **Prompt:** System prompt detalhado com regras pedagógicas, formato JSON, tom encorajador

## 2.9 Distribuição de Tipos de Lição

Dos 65 JSONs analisados:

| Tipo          | Quantidade | %   |
| ------------- | ---------- | --- |
| `explanation` | ~40        | 62% |
| `challenge`   | ~25        | 38% |
| `quiz`        | 0          | 0%  |

**Nenhuma lição do tipo `quiz` foi implementada**, apesar do tipo estar definido nos types e na documentação.

## 2.10 Campos Pedagógicos Reais nas Lições

| Campo                 | Presente em         | Obrigatório? |
| --------------------- | ------------------- | ------------ |
| `analogy`             | Maioria das lições  | Opcional     |
| `keyTakeaways`        | Maioria das lições  | Opcional     |
| `commonMistakes`      | Lições de challenge | Opcional     |
| `realWorldExample`    | Lições de conceito  | Opcional     |
| `encouragement`       | Maioria das lições  | Opcional     |
| `hint` (no challenge) | Lições de challenge | Opcional     |
| `solutionExplanation` | Lições de challenge | Opcional     |

---

# 3. Análise de Divergências

## 3.1 Tabela Principal

| Feature                            | Documentação                                                       | Implementação                                                                                                     | Status                                                                       |
| ---------------------------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| **Tipos de lição**                 | `concept`, `challenge`, `quiz`, `project`                          | `explanation`, `challenge`, `quiz`                                                                                | ❌ Divergente — `concept` → `explanation`, `project` não existe              |
| **Estrutura de diretórios**        | `courses/id/modules/`, `courses/id/lessons/`                       | `src/courses/id/lessons/` (sem pasta `modules/`)                                                                  | ❌ Divergente                                                                |
| **Módulos**                        | Arquivos JSON separados em `modules/`                              | Inline dentro de `course.json`                                                                                    | ❌ Divergente                                                                |
| **Campos do curso**                | id, title, description, difficulty, estimatedDuration, modules     | id, title, description, icon, modules (objetos inline)                                                            | ❌ Divergente — faltam `difficulty` e `estimatedDuration`; adicionado `icon` |
| **Campos do módulo**               | id, title, description, lessons                                    | id, title, lessons                                                                                                | ❌ Divergente — sem `description`                                            |
| **Campo `hook`**                   | Obrigatório em toda lição                                          | Não existe no schema/tipos                                                                                        | ❌ Não implementado                                                          |
| **Campo `explanation`**            | String simples                                                     | `content.sections[]` estruturado                                                                                  | ❌ Divergente — evoluiu para sistema rico                                    |
| **Campo `example`**                | Objeto `{code}` separado                                           | Embutido como seção `code` em `content.sections`                                                                  | ❌ Divergente                                                                |
| **Campo `remember`**               | String simples obrigatória                                         | `keyTakeaways[]` (array de strings)                                                                               | ❌ Divergente — evoluiu para array                                           |
| **Challenge.description**          | Campo `description`                                                | Campo `instructions`                                                                                              | ❌ Divergente (renomeado)                                                    |
| **Challenge.type**                 | `completion`, `correction`, `implementation`, `debugging`          | Não existe — tipo do challenge não é declarado                                                                    | ❌ Removido                                                                  |
| **Challenge.solution**             | Não documentado                                                    | Implementado com campo `solution`                                                                                 | ⚠️ Não documentado                                                           |
| **Challenge.hint**                 | Não documentado                                                    | Implementado                                                                                                      | ⚠️ Não documentado                                                           |
| **Challenge.solutionExplanation**  | Não documentado                                                    | Implementado                                                                                                      | ⚠️ Não documentado                                                           |
| **Challenge.tests**                | Não documentado                                                    | Implementado (vazio na prática)                                                                                   | ⚠️ Não documentado                                                           |
| **Challenge.sandpackDependencies** | Não documentado                                                    | Implementado                                                                                                      | ⚠️ Não documentado                                                           |
| **Quiz schema**                    | `{question, options[], correct}`                                   | `QuizQuestion {question, options: QuizOption[]}` com `isCorrect` por opção e `explanation`                        | ❌ Divergente                                                                |
| **Campos novos**                   | Não existem nos docs                                               | `courseId`, `moduleId`, `xp`, `difficulty`, `keyTakeaways`, `commonMistakes`, `realWorldExample`, `encouragement` | ⚠️ Não documentados                                                          |
| **ContentSection**                 | Não existe nos docs                                                | Tipos: `paragraph`, `code`, `list`, `heading`, `callout`                                                          | ⚠️ Não documentado                                                           |
| **Escopo do curso**                | 3 módulos, ~6 lições                                               | 16 módulos, 65 lições                                                                                             | ℹ️ Evoluiu significativamente                                                |
| **IA Tutor**                       | "Fora de escopo"                                                   | Totalmente implementado (Claude + OpenAI, review, chat)                                                           | ❌ Doc contradiz implementação                                               |
| **Persistência**                   | Supabase (planejado)                                               | localStorage                                                                                                      | ℹ️ Decisão arquitetural diferente                                            |
| **Progressão de módulos**          | Intro → Conceitos → Exercícios → Desafios → Mini projeto → Revisão | Não há mini projetos nem lições de revisão por módulo                                                             | ❌ Parcialmente implementado                                                 |
| **Mini projetos**                  | Obrigatórios ao final de cada módulo                               | Não existem                                                                                                       | ❌ Não implementado                                                          |
| **Tipos de exercício**             | Completion, Correction, Implementation, Quiz, Debugging            | Exercícios existem mas sem classificação de tipo                                                                  | ⚠️ Parcial                                                                   |
| **Quiz**                           | Definido como tipo de lição e exercício                            | Tipo definido mas nenhuma lição quiz existe                                                                       | ❌ Não implementado                                                          |
| **Revisão/Spaced Repetition**      | Mencionado como funcionalidade                                     | Apenas botão "Revisar" que volta à lista do curso                                                                 | ⚠️ Parcial                                                                   |
| **Prompt de geração**              | Usa schema antigo                                                  | Schema evoluiu; prompt está desatualizado                                                                         | ❌ Desatualizado                                                             |

## 3.2 Features Implementadas Não Documentadas

| Feature                          | Descrição                                                    |
| -------------------------------- | ------------------------------------------------------------ |
| **Sistema de IA multi-provider** | Suporte a Claude e OpenAI com troca dinâmica                 |
| **Chat com IA**                  | Q&A interativo durante desafios                              |
| **API Key management**           | Dialog de configuração com localStorage                      |
| **ContentSection system**        | Sistema rico de seções com callouts, headings, listas        |
| **Real World Examples**          | Campo com exemplo do mundo real em lições                    |
| **Common Mistakes**              | Lista de erros comuns por lição                              |
| **Encouragement**                | Mensagem motivacional por lição                              |
| **Difficulty badge**             | Indicador visual de nível (beginner/intermediate/advanced)   |
| **Responsive sidebar**           | Menu mobile com overlay animado                              |
| **Sandpack dependencies**        | Suporte a dependências extras por challenge                  |
| **XP por tipo**                  | Valores diferenciados (10 vs 25)                             |
| **Módulo Ecossistema**           | Módulo inteiro cobrindo Node, npm, Vite antes de React       |
| **Módulos avançados**            | Router, Forms, Data Fetching, Testing, Performance, Patterns |

## 3.3 Documentação que Contradiz a Implementação

| Documento              | Contradição                                                                |
| ---------------------- | -------------------------------------------------------------------------- |
| **PRD §14**            | Lista "IA tutor avançado" como fora de escopo, mas está implementado       |
| **PRD §8**             | Define 3 módulos com 6 tópicos; implementação tem 16 módulos com 65 lições |
| **LESSON_SCHEMA**      | Schema completamente diferente do TypeScript real                          |
| **COURSE_SCHEMA**      | Estrutura de diretórios e campos não correspondem                          |
| **CONTENT_GENERATION** | Prompt gera lições no formato antigo, incompatível com o sistema atual     |

---

# 4. Revisão Pedagógica

## 4.1 Aderência à Metodologia (pedagogy.md)

### O que está sendo seguido

| Princípio              | Avaliação  | Evidência                                                                                                   |
| ---------------------- | ---------- | ----------------------------------------------------------------------------------------------------------- |
| **Microlearning**      | ✅ Bom     | Lições focadas em um conceito, explicações curtas                                                           |
| **Analogias**          | ✅ Bom     | Presentes na maioria das lições, concretas e relevantes (LEGO, post-it, lousa mágica, conceitos familiares) |
| **Progressão gradual** | ✅ Bom     | Módulos ordenados de básico a avançado, dentro de cada módulo a complexidade cresce                         |
| **Prática ativa**      | ⚠️ Parcial | 38% das lições são challenges — pedagogy exige desafio em toda lição                                        |
| **Active Learning**    | ⚠️ Parcial | Challenges com Sandpack são excelentes, mas lições `explanation` não têm exercícios                         |
| **Scaffolding**        | ✅ Bom     | Starter code fornecido, hints disponíveis, solution explanation                                             |

### O que NÃO está sendo seguido

| Princípio                            | Avaliação  | Problema                                                                                   |
| ------------------------------------ | ---------- | ------------------------------------------------------------------------------------------ |
| **Hook**                             | ❌ Ausente | Nenhuma lição tem campo `hook` — a pergunta introdutória não existe                        |
| **Desafio obrigatório**              | ❌ Violado | ~62% das lições são `explanation` sem nenhum desafio                                       |
| **Feedback educativo**               | ⚠️ Parcial | `solutionExplanation` existe mas não segue o formato (porquê funciona + erro comum + dica) |
| **Lembre-se**                        | ✅ Evoluiu | `keyTakeaways[]` é uma evolução do campo `remember` — melhor que o original                |
| **Mini projetos**                    | ❌ Ausente | Nenhum módulo termina com mini projeto                                                     |
| **Revisão por módulo**               | ❌ Ausente | Não há lições de revisão ao final de módulos                                               |
| **Mastery Learning**                 | ⚠️ Fraco   | Não há bloqueio de progresso — o aluno pode avançar sem demonstrar domínio                 |
| **Retrieval Practice**               | ❌ Ausente | Nenhum quiz implementado, nenhum mecanismo de retrieval                                    |
| **Tipos de exercício classificados** | ❌ Ausente | Challenges existem mas sem classificação (completion, correction, debugging)               |

## 4.2 Pontos Fortes da Implementação

1. **Analogias de alta qualidade** — conectam conceitos com conhecimentos prévios de forma relevante
2. **`commonMistakes`** — melhoria pedagógica excelente não prevista na documentação original; ajuda o aluno a evitar armadilhas
3. **`realWorldExample`** — conecta o conceito com uso real (Instagram, e-commerce), aumentando relevância
4. **`encouragement`** — mensagem motivacional personalizada por lição, alinhada com o princípio de manter motivação
5. **Professor IA** — review de código com tom encorajador e chat para dúvidas é uma feature pedagógica avançada
6. **Sistema de conteúdo estruturado** — `content.sections` com callouts (`tip`, `warning`, `info`) é mais rico que o schema original
7. **Módulo Ecossistema** — ensinar Node/npm/Vite antes de React é pedagogicamente correto e não estava previsto
8. **Curso expandido** — 16 módulos cobrem do básico ao avançado de forma abrangente

## 4.3 Pontos Fracos Pedagógicos

1. **62% das lições sem exercício** — viola o princípio fundamental de active learning
2. **Zero quizzes** — nenhum mecanismo de retrieval practice
3. **Sem hooks (perguntas introdutórias)** — as lições começam direto na explicação
4. **Sem mini projetos** — módulos terminam abruptamente
5. **Sem revisão estruturada** — nenhum mecanismo de spaced repetition ou revisão por módulo
6. **Progressão livre** — o aluno pode pular lições sem demonstrar domínio
7. **Tests vazios** — campo `tests[]` existe no schema mas está vazio em todas as lições
8. **Sem classificação de tipo de desafio** — impossível rastrear progressão de dificuldade dos exercícios

---

# 5. Plano de Atualização da Documentação

## 5.1 Documentos que DEVEM ser atualizados

### PRD (prd.md)

| Seção                   | Ação           | Detalhe                                                                     |
| ----------------------- | -------------- | --------------------------------------------------------------------------- |
| §7 (Escopo MVP)         | **Reescrever** | O MVP foi superado — o projeto está além do MVP                             |
| §8 (Curso inicial)      | **Reescrever** | 3 módulos → 16 módulos, 65 lições                                           |
| §10 (Stack)             | **Atualizar**  | Remover "Supabase (planejado)", confirmar localStorage                      |
| §12 (Arquitetura)       | **Atualizar**  | Adicionar `hooks/`, `lib/`, `styles/`; detalhar subdivisão de `components/` |
| §14 (Fora de escopo)    | **Atualizar**  | Remover "IA tutor avançado" (foi implementado)                              |
| §15 (Evoluções futuras) | **Atualizar**  | Marcar o que já foi feito (IA tutor)                                        |
| Nova seção              | **Adicionar**  | Documentar sistema de IA (providers, review, chat)                          |
| Nova seção              | **Adicionar**  | Documentar sistema de XP (valores por tipo)                                 |

### Course Schema (course_schema.md)

| Ação                              | Detalhe                                                                      |
| --------------------------------- | ---------------------------------------------------------------------------- |
| **Reescrever completamente**      | Schema não corresponde à implementação                                       |
| Atualizar estrutura de diretórios | `src/courses/course-id/course.json` + `lessons/*.json` (sem `modules/`)      |
| Atualizar campos do curso         | Adicionar `icon`, remover `difficulty` e `estimatedDuration`, módulos inline |
| Atualizar campos do módulo        | Remover `description`, documentar como inline                                |

### Lesson Schema (lesson_schema.md)

| Ação                         | Detalhe                                                                                                                     |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Reescrever completamente** | Schema quase totalmente diferente                                                                                           |
| Atualizar tipos de lição     | `concept` → `explanation`, remover `project`                                                                                |
| Documentar `ContentSection`  | `paragraph`, `code`, `list`, `heading`, `callout`                                                                           |
| Atualizar campos             | Adicionar `courseId`, `moduleId`, `xp`, `difficulty`, `keyTakeaways`, `commonMistakes`, `realWorldExample`, `encouragement` |
| Remover campos               | `hook`, `explanation` (string), `example`, `remember`                                                                       |
| Atualizar `challenge`        | `description` → `instructions`, adicionar `solution`, `hint`, `solutionExplanation`, `tests`, `sandpackDependencies`        |
| Atualizar `quiz`             | `QuizOption` com `isCorrect` e `explanation` por opção                                                                      |

### Content Generation (content_generation.md)

| Ação                     | Detalhe                                                               |
| ------------------------ | --------------------------------------------------------------------- |
| **Reescrever prompt**    | Usar schema real (não o antigo)                                       |
| Atualizar formato JSON   | Exemplo deve seguir interface `Lesson` real                           |
| Adicionar novos campos   | `keyTakeaways`, `commonMistakes`, `realWorldExample`, `encouragement` |
| Remover campos obsoletos | `hook`, `explanation` (string), `example`, `remember`                 |
| Atualizar tipos          | `concept` → `explanation`                                             |

### Pedagogy (pedagogy.md)

| Seção                   | Ação          | Detalhe                                                                                     |
| ----------------------- | ------------- | ------------------------------------------------------------------------------------------- |
| §3 (Estrutura de lição) | **Atualizar** | Refletir estrutura real: Analogia → Content (sections) → Challenge → Key Takeaways          |
| §3.1 Hook               | **Avaliar**   | Decidir se será implementado ou removido da metodologia                                     |
| §3.4 Exemplo            | **Atualizar** | Exemplos são seções `code` dentro de `content`, não campo separado                          |
| §3.6 Feedback           | **Atualizar** | Feedback vem do `solutionExplanation` + `commonMistakes` + IA                               |
| §3.7 Lembre-se          | **Atualizar** | Renomear para `keyTakeaways` e documentar como array                                        |
| §6 (Tipos de exercício) | **Atualizar** | Documentar que a classificação não está implementada                                        |
| §8 (Mini projetos)      | **Avaliar**   | Decidir se será implementado ou removido                                                    |
| Nova seção              | **Adicionar** | Documentar campos pedagógicos novos (`commonMistakes`, `realWorldExample`, `encouragement`) |
| Nova seção              | **Adicionar** | Documentar papel da IA como ferramenta pedagógica                                           |

## 5.2 Documentos para CRIAR

| Documento           | Conteúdo                                                                               |
| ------------------- | -------------------------------------------------------------------------------------- |
| **AI_SYSTEM.md**    | Documentar o sistema de IA: providers, prompts, review, chat, API key management       |
| **ARCHITECTURE.md** | Documentar arquitetura real: estrutura de pastas, routing, state management, data flow |

## 5.3 O que REMOVER ou MARCAR como obsoleto

| Item                                    | Ação                          |
| --------------------------------------- | ----------------------------- |
| Referências a `modules/` como diretório | Remover                       |
| Campo `hook` como obrigatório           | Remover ou implementar        |
| Campo `remember`                        | Substituir por `keyTakeaways` |
| Schema antigo de quiz                   | Substituir pelo real          |
| "Supabase (planejado)"                  | Remover                       |
| "IA tutor avançado" como fora de escopo | Remover                       |

---

# 6. Schemas Propostos (Baseados na Implementação Real)

## 6.1 COURSE_SCHEMA.md Proposto

```markdown
# COURSE_SCHEMA.md — Estrutura de Curso

## Estrutura de diretórios

    src/courses/
      course-id/
        course.json
        lessons/
          lesson-id.json

Módulos são definidos inline dentro de course.json.
Não há pasta modules/ — cada módulo é um objeto dentro do array modules.

## course.json

    {
      "id": "react",
      "title": "React: Do Iniciante ao Avançado",
      "description": "Curso completo de React...",
      "icon": "⚛️",
      "modules": [
        {
          "id": "intro",
          "title": "Introdução ao React",
          "lessons": ["what-is-react", "jsx", "jsx-expressoes"]
        }
      ]
    }

## Campos do Curso

| Campo       | Tipo     | Obrigatório | Descrição               |
| ----------- | -------- | ----------- | ----------------------- |
| id          | string   | Sim         | Identificador único     |
| title       | string   | Sim         | Título do curso         |
| description | string   | Sim         | Descrição do curso      |
| icon        | string   | Sim         | Emoji representativo    |
| modules     | Module[] | Sim         | Array de módulos inline |

## Campos do Módulo

| Campo   | Tipo     | Obrigatório | Descrição                                             |
| ------- | -------- | ----------- | ----------------------------------------------------- |
| id      | string   | Sim         | Identificador único                                   |
| title   | string   | Sim         | Título do módulo                                      |
| lessons | string[] | Sim         | IDs das lições (nomes dos arquivos JSON sem extensão) |
```

## 6.2 LESSON_SCHEMA.md Proposto

```markdown
# LESSON_SCHEMA.md — Estrutura de Lições

## Tipos de lição

| Tipo        | Descrição                                 |
| ----------- | ----------------------------------------- |
| explanation | Lição conceitual com conteúdo estruturado |
| challenge   | Lição com desafio prático no Sandpack     |
| quiz        | Lição com perguntas de múltipla escolha   |

## Schema completo

    {
      "id": "use-state",
      "courseId": "react",
      "moduleId": "state",
      "title": "useState",
      "type": "challenge",
      "xp": 25,
      "difficulty": "beginner",
      "analogy": "Imagine uma lousa mágica...",
      "content": {
        "sections": [
          { "type": "heading", "content": "O que é useState?" },
          { "type": "paragraph", "content": "..." },
          { "type": "code", "content": "...", "language": "jsx" },
          { "type": "list", "content": "item1\nitem2\nitem3" },
          { "type": "callout", "content": "...", "variant": "tip" }
        ]
      },
      "challenge": {
        "instructions": "Crie um contador...",
        "starterCode": "...",
        "solution": "...",
        "tests": [],
        "hint": "Use useState(0)...",
        "solutionExplanation": "...",
        "sandpackDependencies": {}
      },
      "quiz": [
        {
          "question": "O que useState retorna?",
          "options": [
            { "id": "a", "text": "Um valor", "isCorrect": false },
            { "id": "b", "text": "Um array", "isCorrect": true, "explanation": "..." }
          ]
        }
      ],
      "keyTakeaways": ["Ponto 1", "Ponto 2"],
      "commonMistakes": ["Erro 1", "Erro 2"],
      "realWorldExample": "Em um e-commerce...",
      "encouragement": "Mensagem motivacional..."
    }

## Campos da Lição

| Campo            | Tipo            | Obrigatório | Descrição                                                           |
| ---------------- | --------------- | ----------- | ------------------------------------------------------------------- |
| id               | string          | Sim         | Identificador único (igual ao nome do arquivo)                      |
| courseId         | string          | Sim         | ID do curso ao qual pertence                                        |
| moduleId         | string          | Sim         | ID do módulo ao qual pertence                                       |
| title            | string          | Sim         | Título da lição                                                     |
| type             | LessonType      | Sim         | explanation, challenge, ou quiz                                     |
| xp               | number          | Sim         | Pontos de experiência (10 para explanation/quiz, 25 para challenge) |
| difficulty       | DifficultyLevel | Não         | beginner, intermediate, ou advanced                                 |
| analogy          | string          | Não         | Analogia para facilitar compreensão                                 |
| content          | LessonContent   | Sim         | Conteúdo estruturado em seções                                      |
| challenge        | Challenge       | Não\*       | Desafio prático (\*obrigatório se type=challenge)                   |
| quiz             | QuizQuestion[]  | Não\*       | Perguntas (\*obrigatório se type=quiz)                              |
| keyTakeaways     | string[]        | Não         | Pontos-chave para lembrar                                           |
| commonMistakes   | string[]        | Não         | Erros comuns a evitar                                               |
| realWorldExample | string          | Não         | Exemplo do mundo real                                               |
| encouragement    | string          | Não         | Mensagem motivacional                                               |

## ContentSection

| Tipo      | Campos extras               | Descrição                      |
| --------- | --------------------------- | ------------------------------ |
| heading   | —                           | Título de seção                |
| paragraph | —                           | Texto corrido                  |
| code      | language?                   | Bloco de código                |
| list      | —                           | Lista (itens separados por \n) |
| callout   | variant: tip\|warning\|info | Destaque visual                |

## Challenge

| Campo                | Tipo                  | Obrigatório | Descrição                        |
| -------------------- | --------------------- | ----------- | -------------------------------- |
| instructions         | string                | Sim         | O que o aluno deve fazer         |
| starterCode          | string                | Sim         | Código inicial no editor         |
| solution             | string                | Sim         | Solução de referência            |
| tests                | TestCase[]            | Sim         | Array de testes (pode ser vazio) |
| hint                 | string                | Não         | Dica para o aluno                |
| solutionExplanation  | string                | Não         | Explicação da solução            |
| sandpackDependencies | Record<string,string> | Não         | Dependências extras do Sandpack  |

## QuizQuestion

| Campo    | Tipo         | Descrição          |
| -------- | ------------ | ------------------ |
| question | string       | Pergunta           |
| options  | QuizOption[] | Opções de resposta |

## QuizOption

| Campo       | Tipo    | Descrição               |
| ----------- | ------- | ----------------------- |
| id          | string  | Identificador           |
| text        | string  | Texto da opção          |
| isCorrect   | boolean | Se é a resposta correta |
| explanation | string? | Explicação (opcional)   |
```

---

# 7. Melhorias Pedagógicas Recomendadas

## 7.1 Prioridade Alta

### 1. Adicionar desafios a lições `explanation`

**Problema:** 62% das lições não têm exercício prático.
**Solução:** Adicionar ao menos um mini-challenge ou quiz a cada lição de explicação. Não precisa ser Sandpack — pode ser quiz de múltipla escolha.
**Impacto:** Aderência ao princípio de active learning, melhor retenção.

### 2. Implementar lições de quiz

**Problema:** Tipo `quiz` está definido mas nunca usado. Zero retrieval practice.
**Solução:** Criar lições de quiz intercaladas (a cada 3-4 lições de conteúdo, 1 quiz de revisão).
**Impacto:** Retrieval practice, verificação de compreensão.

### 3. Adicionar campo `hook`

**Problema:** Lições começam direto na explicação, sem engajar a curiosidade.
**Solução:** Adicionar campo `hook` (pergunta provocativa) ao schema e a cada lição. Exibir antes da analogia.
**Impacto:** Engajamento, contextualização, curiosidade.

**Exemplos de hooks para lições existentes:**

- `what-is-react`: "Por que sites modernos como Instagram atualizam sem recarregar a página?"
- `use-state`: "Como React lembra valores entre renders?"
- `props`: "Como um mesmo componente pode mostrar dados diferentes?"

## 7.2 Prioridade Média

### 4. Criar mini projetos ao final de módulos

**Problema:** Módulos terminam abruptamente sem síntese.
**Solução:** Adicionar 1 lição tipo `project` ao final de cada módulo com um projeto integrando conceitos aprendidos.
**Exemplos:**

- Módulo Estado: Construir um app de TODO list
- Módulo Components: Criar um card de perfil com composição
- Módulo Effects: Timer com start/stop/reset
- Módulo Router: Mini SPA com 3 páginas

### 5. Classificar tipos de desafio

**Problema:** Challenges existem mas sem classificação de tipo (completion, correction, implementation, debugging).
**Solução:** Adicionar campo `challengeType` ao schema do Challenge.
**Impacto:** Permite rastrear progressão de dificuldade e variar tipos de exercício.

### 6. Implementar testes automatizados nos challenges

**Problema:** Campo `tests[]` existe mas está vazio em todas as lições.
**Solução:** Popular `tests` para validação automática antes de depender da IA.
**Impacto:** Feedback instantâneo, validação objetiva.

### 7. Adicionar lições de revisão por módulo

**Problema:** Não há mecanismo de revisão estruturada.
**Solução:** Ao final de cada módulo, adicionar lição de revisão que combina quiz + mini-challenge com conceitos do módulo inteiro.

## 7.3 Prioridade Baixa

### 8. Progressão controlada (Mastery Learning)

**Problema:** O aluno pode acessar qualquer lição sem completar as anteriores.
**Solução:** Implementar desbloqueio progressivo — lições ficam bloqueadas até a anterior ser concluída.

### 9. Melhorar sistema de feedback

**Problema:** Feedback após challenge é genérico ("Parabéns! Lição concluída.").
**Solução:** Usar `solutionExplanation` para feedback rico. Mostrar `commonMistakes` como "coisas para evitar" após completar.

### 10. Diversificar exercícios

**Problema:** Todos os challenges são "implementation" — escrever código do zero.
**Recomendação de mix ideal por módulo:**

- 40% Implementation (criar código)
- 25% Completion (completar lacunas)
- 20% Correction (encontrar e corrigir bugs)
- 15% Debugging (identificar problemas)

### 11. Spaced Repetition

**Problema:** Sem mecanismo de revisão temporal.
**Solução futura:** Rastrear quando cada lição foi completada e sugerir revisão após intervalos crescentes (1 dia, 3 dias, 7 dias, 30 dias).

---

# 8. Resumo Executivo

## Estado Geral

A implementação **evoluiu significativamente** além da documentação original. O código é mais maduro, rico e bem estruturado que o descrito nos docs. As decisões técnicas são sólidas e o conteúdo pedagógico é de alta qualidade.

## Top 5 Ações Imediatas

| #   | Ação                                                                              | Impacto                         |
| --- | --------------------------------------------------------------------------------- | ------------------------------- |
| 1   | **Reescrever LESSON_SCHEMA.md** com o schema real                                 | Alinhamento crítico             |
| 2   | **Reescrever COURSE_SCHEMA.md** com a estrutura real                              | Alinhamento crítico             |
| 3   | **Atualizar CONTENT_GENERATION.md** com novo prompt usando schema real            | Geração de conteúdo correta     |
| 4   | **Atualizar PRD** removendo contradições (IA fora de escopo, 3 módulos, Supabase) | Documentação fidedigna          |
| 5   | **Adicionar desafios/quizzes a lições explanation**                               | Melhoria pedagógica fundamental |

## O que Preservar (boas decisões)

- Arquitetura de conteúdo declarativo (JSON)
- Sistema de XP diferenciado por tipo
- Campos `commonMistakes`, `realWorldExample`, `encouragement`
- Sistema de IA multi-provider
- Analogias conectando conceitos com conhecimentos prévios
- Progressão de módulos do básico ao avançado
- UI dark mode com Tailwind/shadcn

## Risco Principal

A **maior divergência** é o LESSON_SCHEMA.md — qualquer pessoa (ou IA) que use esse documento para gerar novas lições vai produzir JSONs incompatíveis com o sistema. Atualizar este documento é a ação mais urgente.
