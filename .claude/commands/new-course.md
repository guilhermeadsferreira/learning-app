# New Course — Criação de Curso Completo

Crie um curso completo de ponta a ponta para o tema abaixo.

**Tema do curso:** $ARGUMENTS

Consulte como fonte de verdade:

- `documents/product/methodology/course_schema.md`
- `documents/product/methodology/lesson_schema.md`
- `documents/product/methodology/content_generation.md`
- `documents/product/methodology/pedagogy.md`

---

## 0. Pesquisa no roadmap.sh (quando viável)

Antes de planejar, avalie se o tema tem um roadmap público no roadmap.sh.

**Quando consultar:**
- Linguagens de programação (JavaScript, Python, PHP, Go…)
- Frameworks e bibliotecas (React, Vue, Laravel, Django…)
- Ferramentas e plataformas técnicas (Docker, Kubernetes, Git…)
- Áreas de engenharia (Frontend, Backend, DevOps, Fullstack…)

**Quando NÃO consultar:**
- Cursos conceituais ou de gestão (Arquitetura de Software, Gestão de Pessoas…)
- Ferramentas de IA / LLMs (Claude Code, Prompt Engineering…)
- Temas sem correspondência direta no roadmap.sh

**Se viável**, tente buscar em:
```
https://roadmap.sh/{slug-do-tema}
```
Exemplos: `https://roadmap.sh/react`, `https://roadmap.sh/php`, `https://roadmap.sh/javascript`

Use `WebFetch` para buscar a página. Extraia:
- Tópicos principais listados no roadmap
- Sequência lógica de aprendizado sugerida
- Áreas de conhecimento relevantes

**Use o roadmap como referência estrutural**, não como roteiro literal — adapte ao formato da plataforma (módulos + lições) e ao nível do curso planejado. Se a URL não existir ou o conteúdo não for útil, prossiga sem ela e informe ao usuário.

---

## 1. Planejamento do curso

Com base nos princípios da plataforma, planeje o curso completo:

### 1.1 Metadados do curso

| Campo           | Descrição                                                |
| --------------- | -------------------------------------------------------- |
| courseId        | kebab-case (ex: `claude-code`, `gestao-agil`)            |
| title           | Título descritivo em português                           |
| description     | Descrição completa do que o curso cobre                  |
| icon            | Emoji representativo                                     |
| aiReviewContext | `subject`, `expertise`, `codeLanguage`, `challengeStyle` |

### 1.2 Estrutura de módulos e lições

Planeje **5 a 10 módulos**, cada um com **3 a 5 lições**, seguindo:

- **Progressão:** do básico ao avançado (scaffolding)
- **Alternância de tipos:** misturar `explanation`, `challenge` e `quiz`
- **Proporção recomendada:** ~40% explanation, ~40% challenge, ~20% quiz
- **Cada módulo** deve ter pelo menos 1 explicação e 1 prática (challenge ou quiz)
- Cursos de **programação/ferramentas CLI**: usar `challenge` para prática
- Cursos de **gestão/conceitual**: usar `quiz` para prática — **não usar** `challenge`

### 1.3 Apresentar o plano

Apresente ao usuário:

1. Metadados do curso (`courseId`, `title`, `icon`, `aiReviewContext`)
2. Lista completa de módulos com suas lições (id, título, tipo, dificuldade)
3. Total de lições e XP estimado do curso

**Peça aprovação** antes de prosseguir. O usuário pode ajustar módulos, reordenar, adicionar ou remover lições.

---

## 2. Criar `course.json`

Após aprovação, crie o arquivo:

```
src/courses/{courseId}/course.json
```

Seguindo o schema em `documents/product/methodology/course_schema.md`.

---

## 3. Gerar lições

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
- Conteúdo em **português brasileiro**, código em **inglês**

---

## 4. Ritmo de geração

Gere as lições em **lotes por módulo**:

1. Gere todas as lições do módulo 1
2. Informe o progresso ao usuário
3. Continue com o módulo seguinte
4. Repita até completar todos os módulos

---

## 5. Verificação final

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
