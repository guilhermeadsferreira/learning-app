# Curso: PostgreSQL — Do Básico ao Avançado

**Status:** pendente

---

## Objetivo

Criar um curso completo de PostgreSQL na plataforma, cobrindo desde fundamentos de banco de dados relacionais até recursos avançados como índices, transações, performance tuning e extensões — com progressão pedagógica clara, quizzes e desafios práticos.

## Contexto

A plataforma já possui cursos de React, Arquitetura de Software e Claude Code. Bancos de dados são uma lacuna relevante: PostgreSQL é o banco relacional open-source mais popular do mercado e dominar seus recursos é essencial para desenvolvedores backend e full-stack.

O curso deve cobrir tanto os fundamentos teóricos (modelo relacional, SQL) quanto os aspectos práticos e avançados específicos do PostgreSQL (tipos nativos, JSONB, CTEs, window functions, índices, VACUUM, etc.).

O conteúdo segue o schema declarativo da plataforma (`src/courses/postgresql/course.json` + lessons JSON), sem alterar código da aplicação. Lições com exemplos de SQL podem usar `practiceQuestions` para reflexão e `aiReviewContext` para feedback especializado.

---

## Escopo

### Etapa 1 — Definir currículo e estrutura de módulos

Mapear tópicos do básico ao avançado em módulos progressivos. Proposta inicial:

| Módulo                    | Tópicos                                                                      |
| ------------------------- | ---------------------------------------------------------------------------- |
| Fundamentos relacionais   | Modelo relacional, tabelas, linhas, colunas, chaves primárias e estrangeiras |
| SQL Essencial             | SELECT, INSERT, UPDATE, DELETE, WHERE, ORDER BY, LIMIT                       |
| Relacionamentos           | JOINs (INNER, LEFT, RIGHT, FULL), subqueries, EXISTS                         |
| Modelagem                 | Normalização (1FN–3FN), cardinalidade, ERD, boas práticas de schema          |
| Funções e Agregações      | GROUP BY, HAVING, funções de agregação, funções de string/data/math          |
| PostgreSQL Específico     | Tipos nativos (JSONB, UUID, ARRAY, ENUM), operadores específicos             |
| Índices e Performance     | B-tree, Hash, GIN, GiST, EXPLAIN ANALYZE, query optimization                 |
| Transações e Concorrência | ACID no PostgreSQL, isolation levels, locks, deadlocks                       |
| Consultas Avançadas       | CTEs, window functions, LATERAL, recursive queries                           |
| Administração             | VACUUM, ANALYZE, conexões, roles, permissões, backups                        |
| Extensões e Ecossistema   | pg_stat_statements, PostGIS, pgcrypto, UUID-OSSP, Timescale                  |

**Critério de sucesso:** currículo aprovado com ~30–40 lições bem distribuídas.

**Decisões a tomar:**

- Pressupor algum conhecimento de SQL ou começar do zero absoluto?
- Incluir lições de modelagem de banco real (e-commerce, blog, SaaS) como estudo de caso?
- Cobertura de ferramentas (psql CLI, pgAdmin, DBeaver) ou focar apenas na linguagem?

---

### Etapa 2 — Criar `course.json`

Criar o arquivo `src/courses/postgresql/course.json` com todos os módulos e referências às lições:

```
src/courses/postgresql/
  course.json
  lessons/
    ...
```

Sugestão de metadados:

- `icon`: 🐘
- `tags`: ["banco de dados", "sql", "postgresql", "backend"]
- `aiReviewContext.expertise`: "SQL, PostgreSQL, modelagem relacional, performance de banco de dados"

**Critério de sucesso:** arquivo válido, curso aparece na HomePage sem erros.

---

### Etapa 3 — Lições do MVP (módulos básicos)

Implementar as primeiras lições com qualidade pedagógica:

1. **O que é um banco de dados relacional** — modelo relacional, tabelas, chaves, por que PostgreSQL
2. **Instalação e primeiros passos** — psql, criação de banco e tabela, primeiro SELECT
3. **SELECT e filtragem** — WHERE, operadores, LIKE, IN, BETWEEN, NULL
4. **INSERT, UPDATE, DELETE** — modificação de dados, RETURNING
5. **Relacionamentos e JOINs** — chaves estrangeiras, INNER JOIN, LEFT JOIN com exemplos
6. **Funções de agregação** — COUNT, SUM, AVG, MIN, MAX, GROUP BY, HAVING
7. **Modelagem básica** — normalização, quando desnormalizar, exemplo prático

Cada lição deve ter: `content` em markdown com exemplos SQL, pelo menos 1 `quiz` (3–4 questões), `practiceQuestions` quando aplicável.

**Critério de sucesso:** 7 lições publicáveis, navegáveis na plataforma.

---

### Etapa 4 — Lições intermediárias

Após validar o MVP, expandir para:

- Subqueries e CTEs
- Window functions (`ROW_NUMBER`, `RANK`, `LAG`, `LEAD`, etc.)
- Índices: tipos, quando criar, como analisar com EXPLAIN
- Transações: BEGIN/COMMIT/ROLLBACK, isolation levels
- Tipos PostgreSQL: JSONB (operadores, indexação), ARRAY, UUID, ENUM

**Critério de sucesso:** módulos intermediários com ao menos 2–3 lições cada.

---

### Etapa 5 — Lições avançadas

- Performance tuning: EXPLAIN ANALYZE, leitura de planos de execução, rewrite de queries lentas
- Concorrência: locks, MVCC, deadlocks, como evitar
- Particionamento de tabelas
- Replicação e alta disponibilidade (visão conceitual)
- Extensões úteis e quando usá-las
- Boas práticas de schema para aplicações reais (migrations, soft delete, auditoria)

**Critério de sucesso:** ao menos 1 lição por subtópico avançado listado.

---

### Etapa 6 — Estudos de caso práticos

Lições de modelagem de sistemas reais como exercícios de reflexão:

- **Blog / CMS** — posts, categorias, tags, autores, comentários
- **E-commerce** — produtos, pedidos, itens, pagamentos, estoque
- **SaaS multi-tenant** — organizações, usuários, permissões, isolamento de dados

Formato: `practiceQuestions` com perguntas abertas de design + `aiReviewContext` especializado.

**Critério de sucesso:** 2–3 estudos de caso implementados como lições interativas.

---

## Questões a responder

- O público-alvo pressupõe algum conhecimento de programação? (afeta exemplos e profundidade)
- Incluir lições com Sandpack para executar SQL no browser? (ex: via SQL.js ou ambiente simulado)
- Cobertura de ORMs (Prisma, Drizzle, TypeORM) ou focar apenas em SQL puro?
- Incluir lição sobre PostgreSQL em Docker para setup local?
- O `aiReviewContext` deve ser único para o curso ou customizado por módulo (ex: módulo de performance com expertise específica)?

---

## Entregável

- `src/courses/postgresql/course.json` — estrutura completa do curso com todos os módulos
- `src/courses/postgresql/lessons/*.json` — mínimo 7 lições MVP (fundamentos) + roadmap das demais
- Curso funcional na HomePage, navegável com quizzes operacionais
- (Opcional) 2–3 estudos de caso como lições de modelagem com suporte a revisão de IA
