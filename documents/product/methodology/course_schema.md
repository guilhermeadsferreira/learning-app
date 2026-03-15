# COURSE_SCHEMA.md — Estrutura de Curso

Este documento define o formato padrão para cursos da plataforma **Learning Engine**.

Cursos são definidos como **conteúdo declarativo**. Isso permite adicionar novos cursos sem alterar o código da aplicação.

O schema abaixo corresponde à implementação real em `src/engine/types.ts`.

---

## Estrutura de diretórios

```
src/courses/
  course-id/
    course.json
    lessons/
      lesson-id.json
```

Módulos são definidos **inline** dentro de `course.json`. Não há pasta `modules/` — cada módulo é um objeto dentro do array `modules`.

---

## course.json

Define metadados do curso e a lista de módulos com suas lições.

Exemplo:

```json
{
  "id": "react",
  "title": "React: Do Iniciante ao Avançado",
  "description": "Curso completo de React incluindo ecossistema, hooks, roteamento, formulários, data fetching, testes e boas práticas.",
  "icon": "⚛️",
  "tags": ["programação", "frontend", "react", "javascript"],
  "aiReviewContext": {
    "subject": "React",
    "expertise": "React, hooks, componentes, JSX, Tailwind"
  },
  "modules": [
    {
      "id": "intro",
      "title": "Introdução ao React",
      "lessons": ["what-is-react", "jsx", "jsx-expressoes"]
    },
    {
      "id": "components",
      "title": "Componentes",
      "lessons": ["components", "props", "props-children", "component-composition"]
    }
  ]
}
```

---

## Campos do curso

| Campo           | Tipo         | Obrigatório | Descrição                                                                   |
| --------------- | ------------ | ----------- | --------------------------------------------------------------------------- |
| id              | string       | Sim         | Identificador único do curso                                                |
| title           | string       | Sim         | Título do curso                                                             |
| description     | string       | Sim         | Descrição do curso                                                          |
| icon            | string       | Sim         | Emoji representativo (ex: ⚛️)                                               |
| tags            | CourseTag[]  | Sim         | Tags para categorização e filtragem na home (ver vocabulário abaixo)        |
| modules         | Module[]     | Sim         | Array de módulos inline                                                     |
| aiReviewContext | AIReviewContext | Não       | Contexto para prompts de IA (revisão e perguntas)                           |

### Tags — vocabulário canônico

Tags são tipadas como `CourseTag` em `src/engine/types.ts`. Apenas valores da lista abaixo são válidos.

**Regras:**
- Máximo de **4 tags** por curso
- Sempre **Title Case** (`JavaScript`, não `javascript`)
- Pelo menos **1 tag de categoria ampla** por curso
- Tags de framework só se o curso for **especificamente** sobre aquele framework
- **Nunca** usar roles (`Tech Lead`, `Staff Engineer`) ou níveis (`Avançado`, `Iniciante`)

**Categorias amplas** — para filtro de descoberta:

| Tag | Quando usar |
|---|---|
| `IA` | Cursos sobre inteligência artificial, LLMs, ferramentas de IA |
| `Arquitetura` | Design de sistemas, padrões arquiteturais, engenharia de software |
| `Frontend` | UI, CSS, frameworks de interface, experiência do usuário |
| `Backend` | Servidores, APIs, bancos de dados, frameworks server-side |
| `Programação` | Lógica, algoritmos, fundamentos de desenvolvimento |
| `Produtividade` | Ferramentas, fluxo de trabalho, automação |

**Linguagens** — quando o curso ensina ou usa extensivamente:

`JavaScript`, `TypeScript`, `PHP`, `Python`, `SQL`, `Go`, `Rust`, `Java`, `C#`

**Frameworks e ferramentas** — só quando o curso é especificamente sobre aquilo:

`React`, `Vue`, `Angular`, `Laravel`, `Django`, `Next.js`, `Node.js`

**Exemplos por curso:**

```json
// Curso de ferramenta de IA
"tags": ["IA", "Produtividade"]

// Curso de framework frontend
"tags": ["Frontend", "JavaScript", "React"]

// Curso de arquitetura (sem linguagem específica)
"tags": ["Arquitetura", "Programação"]

// Curso de framework backend com linguagem específica
"tags": ["Backend", "PHP", "Laravel"]
```

### AIReviewContext (opcional)

| Campo          | Tipo   | Obrigatório | Descrição                                                                            |
| -------------- | ------ | ----------- | ------------------------------------------------------------------------------------ |
| subject        | string | Sim\*       | Assunto principal (ex: "React", "PostgreSQL", "Gestão de Pessoas")                   |
| expertise      | string | Não         | Áreas de expertise para o prompt (ex: "hooks, componentes, JSX")                     |
| codeLanguage   | string | Não         | Linguagem dos blocos de código (ex: "jsx", "python", "sql", "bash"). Default: "text" |
| challengeStyle | string | Não         | Como a IA avalia a resposta do aluno. Default: "code"                                |

\* Obrigatório apenas se `aiReviewContext` for definido. Se ausente, o sistema usa fallback por `courseId`.

#### Valores de `challengeStyle`

| Valor      | Quando usar                             | Exemplos de cursos                         |
| ---------- | --------------------------------------- | ------------------------------------------ |
| `code`     | Desafio de escrita/correção de código   | React, Python, FastAPI, Node.js            |
| `query`    | Desafio de query em banco de dados      | PostgreSQL, MySQL, MongoDB                 |
| `scenario` | Desafio de decisão/cenário (sem código) | Gestão de Pessoas, Gestão de Projetos, AWS |
| `written`  | Resposta textual/análise                | Documentação, Arquitetura, Segurança       |

#### Exemplos por tipo de curso

```json
// Curso de código (Python)
"aiReviewContext": {
  "subject": "Python",
  "expertise": "sintaxe, estruturas de dados, funções, orientação a objetos",
  "codeLanguage": "python",
  "challengeStyle": "code"
}

// Curso de banco de dados
"aiReviewContext": {
  "subject": "PostgreSQL",
  "expertise": "SQL, joins, índices, transações, performance",
  "codeLanguage": "sql",
  "challengeStyle": "query"
}

// Curso de gestão (sem código)
"aiReviewContext": {
  "subject": "Gestão de Pessoas",
  "expertise": "liderança, feedback, conflitos, desenvolvimento de equipes",
  "codeLanguage": "text",
  "challengeStyle": "scenario"
}

// Curso de cloud (comandos CLI)
"aiReviewContext": {
  "subject": "AWS",
  "expertise": "EC2, S3, IAM, Lambda, RDS, arquitetura cloud",
  "codeLanguage": "bash",
  "challengeStyle": "scenario"
}
```

---

## Campos do módulo

| Campo   | Tipo     | Obrigatório | Descrição                                             |
| ------- | -------- | ----------- | ----------------------------------------------------- |
| id      | string   | Sim         | Identificador único do módulo                         |
| title   | string   | Sim         | Título do módulo                                      |
| lessons | string[] | Sim         | IDs das lições (nomes dos arquivos JSON sem extensão) |

Os IDs em `lessons` devem corresponder aos nomes dos arquivos em `lessons/` (ex: `"use-state"` → `lessons/use-state.json`).

---

## Boas práticas

- Cursos devem começar simples e evoluir gradualmente
- Incluir exercícios frequentes (lições tipo `challenge`)
- Ordenar módulos por complexidade crescente
- Cada módulo deve ter ao menos uma lição de explicação e uma de prática
