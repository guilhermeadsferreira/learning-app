# Curso SQL Server

**Status:** concluído

---

## Objetivo

Criar um curso completo de **SQL Server** cobrindo desde fundamentos de SQL até recursos específicos do T-SQL e Window Functions avançadas.

## Entregável

```
src/courses/sql-server/
  course.json
  lessons/
    38 arquivos de lição
```

## Escopo implementado

- **courseId:** `sql-server`
- **Tags:** `["Programação", "Backend", "SQL"]`
- **7 módulos, 37 lições, ~640 XP total**
- **Foco:** T-SQL nativo (TOP, ISNULL, GETDATE, DATEDIFF, STRING_AGG etc.) — sem DBA, sem Azure

### Módulos entregues

1. Fundamentos SQL (5 lições — 80 XP)
2. Funções T-SQL (5 lições — 80 XP)
3. Joins e Relacionamentos (6 lições — 105 XP)
4. Agregação e Agrupamento (5 lições — 90 XP)
5. Subqueries e CTEs (5 lições — 90 XP)
6. Manipulação de Dados (5 lições — 90 XP)
7. T-SQL Avançado (6 lições — 105 XP)

## Decisões técnicas

- **Escopo:** T-SQL apenas — sem DBA, sem Azure
- **Challenges:** starterCode com tabela simulada como comentário-cabeçalho tabular
- **aiReviewContext:** `challengeStyle: "query"`, `codeLanguage: "sql"`
- **Window Functions:** cobertas em profundidade no módulo 7 (ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD)
