# Curso SQL Server

**Status:** pendente

---

## Objetivo

Criar um curso completo de **SQL Server** usando o comando `/new-course`, cobrindo desde fundamentos de SQL até recursos específicos do T-SQL e administração básica do banco de dados.

## Contexto

SQL Server é um dos bancos de dados relacionais mais usados no mercado corporativo, especialmente em ambientes Microsoft/Azure. Um curso de SQL Server se encaixa na plataforma como um curso **de banco de dados** — lições do tipo `explanation`, `quiz` e `challenge` (queries T-SQL são código, portanto o Sandpack pode ser usado para simulação), com `challengeStyle: "query"` e `codeLanguage: "sql"`.

Diferente de cursos conceituais (como AWS), SQL Server permite prática ativa com código — o aluno escreve queries reais no editor, tornando o conteúdo muito mais engajante e alinhado ao modelo pedagógico da plataforma.

## Escopo

### Etapa 1 — Planejamento com `/new-course`

Executar o comando `/new-course` com o tema "SQL Server", que irá:

- Definir metadados do curso (`courseId: sql-server`)
- Planejar módulos com progressão do básico ao avançado
- Apresentar a estrutura completa para aprovação antes de gerar qualquer arquivo

**Critérios de sucesso:** plano aprovado com 6–9 módulos e 30–45 lições totais.

**Decisões a tomar:**

- Focar apenas em T-SQL (linguagem) ou incluir administração/DBA básico?
- Cobrir SQL Server especificamente (funções proprietárias) ou começar pelo SQL padrão ANSI?
- Incluir integração com Azure SQL Database?

### Etapa 2 — Definição de módulos

Sugestão inicial de módulos a refinar no planejamento:

1. **Fundamentos de SQL** — SELECT, WHERE, ORDER BY, DISTINCT, operadores
2. **Filtragem e Funções** — funções de string, data, matemáticas, NULL, CASE
3. **Joins e Relacionamentos** — INNER, LEFT, RIGHT, FULL JOIN, subqueries
4. **Agregação e Agrupamento** — GROUP BY, HAVING, COUNT, SUM, AVG, MIN, MAX
5. **Manipulação de Dados** — INSERT, UPDATE, DELETE, MERGE
6. **DDL e Objetos** — CREATE TABLE, ALTER, índices, constraints, views
7. **T-SQL Avançado** — CTEs, Window Functions (ROW_NUMBER, RANK, PARTITION BY)
8. **Procedures e Funções** — Stored Procedures, User-defined Functions, triggers
9. **Performance e Boas Práticas** — plano de execução, índices, otimização de queries

### Etapa 3 — Geração do `course.json`

Criar `src/courses/sql-server/course.json` com:

- `id: "sql-server"`, `icon: "🗄️"`
- `tags: ["programação", "banco-de-dados", "sql", "backend"]`
- `aiReviewContext`: subject SQL Server, expertise em T-SQL, joins, stored procedures, `codeLanguage: "sql"`, `challengeStyle: "query"`

### Etapa 4 — Geração das lições por módulo

Gerar todas as lições JSON em `src/courses/sql-server/lessons/`.

Proporção esperada:

- ~35% `explanation` (xp: 10) — conceitos e sintaxe
- ~45% `challenge` (xp: 25) — escrita de queries no editor
- ~20% `quiz` (xp: 10) — revisão conceitual e casos de uso

Cada lição de `challenge` deve ter:

- `starterCode` com estrutura de tabela simulada e dados de exemplo (como comentário ou CTE)
- `solution` com query completa e funcional
- `hint` com dica sem entregar a resposta
- `commonMistakes` para confusões comuns (ex: WHERE vs HAVING, JOIN vs subquery)

### Etapa 5 — Verificação final

- Todos os `lesson-id` do `course.json` têm arquivo JSON correspondente
- `courseId` e `moduleId` consistentes em todas as lições
- XP correto (10 para explanation/quiz, 25 para challenge)
- Progressão clara do básico ao avançado

## Questões a responder

- O escopo inclui DBA básico (backup, restore, permissões) ou apenas desenvolvimento SQL?
- Usar T-SQL específico (ex: `TOP`, `ISNULL`, `GETDATE()`) ou manter SQL padrão?
- Como simular tabelas no Sandpack para os challenges de query? (CTE com dados fictícios ou comentário explicativo?)
- Incluir módulo de integração com Azure SQL / SQL Server na nuvem?
- Separar o curso em dois? (SQL Fundamental → SQL Server Avançado)

## Entregável

```
src/courses/sql-server/
  course.json
  lessons/
    *.json  (30–45 arquivos de lição)
```

Curso disponível na home da plataforma, cobrindo T-SQL do básico ao avançado com ~500–700 XP total.
