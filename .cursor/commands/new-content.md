# New Content — Criação de Conteúdo Pedagógico

Execute o fluxo abaixo. Consulte **documents/product/content_generation.md** e **documents/product/lesson_schema.md** como fonte de verdade.

## 1. Coletar informações

Pergunte ao usuário (ou infira do contexto):

| Campo | Opções/Formato | Exemplo |
|-------|----------------|---------|
| **Área** | programação \| gestão \| ferramenta \| outro | programação |
| **courseId** | ID do curso existente ou novo | react, gestao-agil |
| **moduleId** | ID do módulo existente ou novo | state, scrum |
| **Tópico/título** | Tema da lição | useState, Priorização do Backlog |
| **Tipo** | explanation \| challenge \| quiz | challenge |
| **Dificuldade** | beginner \| intermediate \| advanced | beginner |

**Regras de adaptação**:
- **Programação**: pode usar `challenge` (com starterCode, solution)
- **Gestão/ferramentas/outro**: usar `explanation` ou `quiz` — não usar `challenge`

## 2. Gerar JSON da lição

Siga o schema em **documents/product/lesson_schema.md** e as diretrizes em **documents/product/content_generation.md**:

- Campos obrigatórios: `id`, `courseId`, `moduleId`, `title`, `type`, `xp`, `content`
- `content.sections`: heading, paragraph, code, list, callout
- Incluir: `analogy`, `keyTakeaways`, `encouragement`
- Para `challenge`: `instructions`, `starterCode`, `solution`, `tests`, `hint`, `solutionExplanation`
- Para `quiz`: array `quiz` com `question` e `options` (id, text, isCorrect, explanation)
- XP: 10 para explanation/quiz, 25 para challenge
- `id` em kebab-case (ex: `use-state`, `backlog-priorizacao`)

## 3. Definir caminho de salvamento

- **Curso existente**: `src/courses/{courseId}/lessons/{lesson-id}.json`
- **Curso novo**: criar `src/courses/{courseId}/course.json` e `src/courses/{courseId}/lessons/` antes

## 4. Atualizar course.json

- Adicionar o `lesson-id` ao array `lessons` do módulo correspondente em `src/courses/{courseId}/course.json`
- Se o módulo não existir, criar novo objeto em `modules`

## 5. Atualizar index.ts (apenas curso novo)

Se for um **curso novo**, atualizar `src/courses/index.ts`:
- Importar o course.json
- Adicionar glob para `./{courseId}/lessons/*.json`
- Registrar em `courses` e `lessons`

## 6. Confirmar e salvar

Apresente o JSON gerado e pergunte: "Posso salvar em `src/courses/{courseId}/lessons/{lesson-id}.json` e atualizar o course.json?"

Após confirmação, salve o arquivo e atualize o course.json.
