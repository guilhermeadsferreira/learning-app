# New Content — Adicionar Lição a Curso Existente

Adicione uma nova lição ao curso com base nas informações abaixo.

**Contexto:** {{input}}

Consulte como fonte de verdade:

- `documents/product/methodology/lesson_schema.md`
- `documents/product/methodology/content_generation.md`
- `documents/product/methodology/pedagogy.md`

---

## 1. Coletar informações

Infira do contexto fornecido em `{{input}}` ou pergunte ao usuário o que faltar:

| Campo             | Opções/Formato                               | Exemplo                          |
| ----------------- | -------------------------------------------- | -------------------------------- |
| **Área**          | programação \| gestão \| ferramenta \| outro | programação                      |
| **courseId**      | ID do curso existente                        | react, gestao-agil               |
| **moduleId**      | ID do módulo existente ou novo               | state, scrum                     |
| **Tópico/título** | Tema da lição                                | useState, Priorização do Backlog |
| **Tipo**          | explanation \| challenge \| quiz             | challenge                        |
| **Dificuldade**   | beginner \| intermediate \| advanced         | beginner                         |

**Regras de adaptação**:

- **Programação/ferramentas CLI**: pode usar `challenge` (com starterCode, solution)
- **Gestão/ferramentas visuais/outro**: usar `explanation` ou `quiz` — não usar `challenge`

---

## 2. Pesquisa de documentação (Context7 MCP)

Se a lição envolver uma **biblioteca, framework ou ferramenta técnica**:

1. Use `resolve-library-id` do MCP **user-context7** para buscar o ID da library
2. Use `query-docs` com o ID encontrado para buscar documentação atualizada sobre o tópico da lição
3. **Base o conteúdo técnico na documentação oficial** — nunca invente APIs ou funcionalidades

Se o tema for **conceitual** (gestão, soft skills), pule esta etapa.

---

## 3. Gerar JSON da lição

Siga o schema em `documents/product/methodology/lesson_schema.md` e as diretrizes em `documents/product/methodology/content_generation.md`:

### Campos obrigatórios

- `id` em kebab-case (ex: `use-state`, `backlog-priorizacao`)
- `courseId`, `moduleId`, `title`, `type`, `xp`, `content`
- `content.sections` com tipos: `heading`, `paragraph`, `code`, `list`, `callout`

### Campos pedagógicos (incluir sempre que possível)

- `analogy` — analogia concreta
- `keyTakeaways` — 2 a 4 pontos-chave
- `commonMistakes` — erros comuns
- `realWorldExample` — contextualização prática
- `encouragement` — mensagem motivacional

### Por tipo

- **explanation** (xp: 10): conteúdo estruturado claro e conciso
- **challenge** (xp: 25): `instructions`, `starterCode`, `solution`, `tests`, `hint`, `solutionExplanation`
- **quiz** (xp: 10): array `quiz` com `question` e `options` (id, text, isCorrect, explanation)

### Regras de conteúdo

- Parágrafos: máximo 6 linhas
- Conteúdo em **português brasileiro**, código em **inglês**

---

## 4. Confirmar e salvar

Apresente o JSON gerado e pergunte:

> "Posso salvar em `src/courses/{courseId}/lessons/{lesson-id}.json` e atualizar o `course.json`?"

Após confirmação:

1. Salve o arquivo JSON da lição em `src/courses/{courseId}/lessons/{lesson-id}.json`
2. Adicione o `lesson-id` ao array `lessons` do módulo correspondente em `src/courses/{courseId}/course.json`
3. Se o módulo não existir no `course.json`, crie um novo objeto em `modules`
