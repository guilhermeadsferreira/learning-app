# New Course — Criação de Curso Completo

Crie um curso completo de ponta a ponta para o tema abaixo.

**Tema do curso:** {{input}}

Consulte como fonte de verdade:

- `documents/product/methodology/course_schema.md`
- `documents/product/methodology/lesson_schema.md`
- `documents/product/methodology/content_generation.md`
- `documents/product/methodology/pedagogy.md`

---

## 1. Pesquisa de documentação (Context7 MCP)

Se o tema for uma **biblioteca, framework, ferramenta ou produto técnico**:

1. Use a tool `resolve-library-id` do MCP **user-context7** para buscar o ID da library
2. Use a tool `query-docs` com o ID encontrado para buscar documentação atualizada
3. Faça múltiplas queries no `query-docs` para cobrir os conceitos-chave do curso (instalação, API principal, features avançadas, boas práticas)
4. **Todo conteúdo técnico deve ser baseado na documentação oficial** — nunca invente APIs, flags ou funcionalidades

Se o tema for **conceitual** (gestão, soft skills, metodologias), pule esta etapa.

---

## 2. Planejamento do curso

Com base na documentação coletada e nos princípios da plataforma, planeje o curso completo:

### 2.1 Metadados do curso

| Campo           | Descrição                                                |
| --------------- | -------------------------------------------------------- |
| courseId        | kebab-case (ex: `claude-code`, `gestao-agil`)            |
| title           | Título descritivo em português                           |
| description     | Descrição completa do que o curso cobre                  |
| icon            | Emoji representativo                                     |
| aiReviewContext | `subject`, `expertise`, `codeLanguage`, `challengeStyle` |

### 2.2 Estrutura de módulos e lições

Planeje **5 a 10 módulos**, cada um com **3 a 5 lições**, seguindo:

- **Progressão:** do básico ao avançado (scaffolding)
- **Alternância de tipos:** misturar `explanation`, `challenge` e `quiz`
- **Proporção recomendada:** ~40% explanation, ~40% challenge, ~20% quiz
- **Cada módulo** deve ter pelo menos 1 explicação e 1 prática (challenge ou quiz)
- Cursos de **programação/ferramentas CLI**: usar `challenge` para prática
- Cursos de **gestão/conceitual**: usar `quiz` para prática — **não usar** `challenge`

### 2.3 Apresentar o plano

Apresente ao usuário:

1. Metadados do curso (`courseId`, `title`, `icon`, `aiReviewContext`)
2. Lista completa de módulos com suas lições (id, título, tipo, dificuldade)
3. Total de lições e XP estimado do curso

**Peça aprovação** antes de prosseguir. O usuário pode ajustar módulos, reordenar, adicionar ou remover lições.

---

## 3. Criar `course.json`

Após aprovação, crie o arquivo:

```
src/courses/{courseId}/course.json
```

Seguindo o schema em `documents/product/methodology/course_schema.md`.

---

## 4. Gerar lições

Gere cada lição como arquivo JSON individual em:

```
src/courses/{courseId}/lessons/{lesson-id}.json
```

Para **cada lição**, siga rigorosamente:

### Campos obrigatórios

- `id`, `courseId`, `moduleId`, `title`, `type`, `xp`, `content`
- `content.sections` com tipos: `heading`, `paragraph`, `code`, `list`, `callout`

### Campos pedagógicos (incluir sempre que possível)

- `analogy` — analogia concreta conectando ao mundo real
- `keyTakeaways` — 2 a 4 pontos-chave
- `commonMistakes` — erros comuns (especialmente em challenges)
- `realWorldExample` — contextualização prática
- `encouragement` — mensagem motivacional
- `difficulty` — `beginner`, `intermediate` ou `advanced`

### Por tipo de lição

**explanation** (xp: 10):

- Foco em conteúdo estruturado claro e conciso

**challenge** (xp: 25):

- `instructions`, `starterCode`, `solution`, `tests` (pode ser `[]`), `hint`, `solutionExplanation`
- `starterCode` deve incluir imports e estrutura parcial
- `solution` deve ser código completo e funcional

**quiz** (xp: 10):

- Array `quiz` com 2 a 4 perguntas
- Cada pergunta com `question` e `options` (id, text, isCorrect, explanation)
- Apenas **uma opção correta** por pergunta

### Regras de conteúdo

- Parágrafos: máximo 6 linhas
- Tom: claro, prático, motivador
- Se o tema é técnico: usar Context7 para validar APIs e sintaxe
- Conteúdo em **português brasileiro**, código em **inglês**

---

## 5. Ritmo de geração

Gere as lições em **lotes por módulo**:

1. Gere todas as lições do módulo 1
2. Informe o progresso ao usuário
3. Continue com o módulo seguinte
4. Repita até completar todos os módulos

Isso permite que o usuário acompanhe e corrija o rumo se necessário.

---

## 6. Verificação final

Ao final, verifique:

- [ ] Todos os `lesson-id` do `course.json` têm arquivo JSON correspondente
- [ ] Todos os JSONs seguem o schema (campos obrigatórios presentes)
- [ ] `courseId` e `moduleId` são consistentes entre `course.json` e as lições
- [ ] XP correto por tipo (10 para explanation/quiz, 25 para challenge)
- [ ] Não há imports manuais necessários — `src/courses/index.ts` usa glob automático

Apresente um resumo final:

```
Curso criado: {title}
Módulos: {n}
Lições: {n} ({n} explanation, {n} challenge, {n} quiz)
XP total: {n}
Caminho: src/courses/{courseId}/
```
