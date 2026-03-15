# Curso MongoDB — NoSQL do Básico ao Avançado

**Status:** pendente

---

## Objetivo

Criar um curso completo de **MongoDB** usando o comando `/new-course`, cobrindo desde os fundamentos do modelo de documentos NoSQL até agregações avançadas, modelagem de dados e integração com aplicações.

## Contexto

MongoDB é o banco de dados NoSQL orientado a documentos mais popular do mercado. A demanda por profissionais que entendem NoSQL cresce junto com arquiteturas de microsserviços, APIs modernas e aplicações que precisam de flexibilidade de schema.

O curso se encaixa na plataforma como um curso **de banco de dados** com prática ativa em código — queries MongoDB são escritas em JavaScript/JSON, tornando-o compatível com o editor Sandpack. O `challengeStyle` deve ser `"query"` e `codeLanguage` `"javascript"` (MQL — MongoDB Query Language).

Diferente do SQL Server, MongoDB tem uma curva de aprendizado diferente: o aluno precisa primeiro abandonar o pensamento relacional antes de absorver os padrões de modelagem de documentos. Isso exige atenção especial às analogias e commonMistakes nas lições iniciais.

## Escopo

### Etapa 1 — Planejamento com `/new-course`

Executar o comando `/new-course` com o tema "MongoDB — NoSQL do Básico ao Avançado", que irá:

- Definir metadados do curso (`courseId: mongodb`)
- Planejar módulos com progressão clara do paradigma relacional → documental → avançado
- Apresentar a estrutura completa para aprovação

**Critérios de sucesso:** plano aprovado com 6–8 módulos e 30–40 lições totais.

**Decisões a tomar:**

- Incluir módulo de comparação SQL vs NoSQL para contextualizar a transição?
- Cobrir MongoDB Atlas (nuvem) além do MongoDB local?
- Incluir integração com Node.js/Mongoose ou manter foco puro no MQL?

### Etapa 2 — Definição de módulos

Sugestão inicial a refinar no planejamento:

1. **Introdução ao NoSQL** — paradigmas de banco de dados, quando usar NoSQL, diferenças do relacional, tipos de NoSQL
2. **Fundamentos do MongoDB** — documentos, coleções, BSON, operações CRUD básicas (`find`, `insertOne`, `updateOne`, `deleteOne`)
3. **Consultas e Filtros** — operadores de comparação (`$eq`, `$gt`, `$in`), operadores lógicos (`$and`, `$or`, `$not`), projeções
4. **Atualização de Documentos** — operadores de update (`$set`, `$unset`, `$push`, `$pull`, `$inc`), `updateMany`, upsert
5. **Modelagem de Dados** — embedding vs referencing, padrões de design (subset, bucket, outlier), schema flexível
6. **Aggregation Pipeline** — `$match`, `$group`, `$project`, `$sort`, `$limit`, `$lookup` (join), `$unwind`
7. **Índices e Performance** — single field, compound, text index, `explain()`, otimização de queries
8. **Recursos Avançados** — transações, change streams, validação de schema, GridFS, MongoDB Atlas

### Etapa 3 — Geração do `course.json`

Criar `src/courses/mongodb/course.json` com:

- `id: "mongodb"`, `icon: "🍃"`
- `tags: ["programação", "banco-de-dados", "nosql", "backend"]`
- `aiReviewContext`: subject MongoDB, expertise em MQL, aggregation, modelagem de documentos, `codeLanguage: "javascript"`, `challengeStyle: "query"`

### Etapa 4 — Geração das lições por módulo

Gerar todas as lições JSON em `src/courses/mongodb/lessons/`.

Proporção esperada:

- ~35% `explanation` (xp: 10) — conceitos, paradigmas, boas práticas de modelagem
- ~45% `challenge` (xp: 25) — escrita de queries MQL no editor
- ~20% `quiz` (xp: 10) — casos de uso, decisões de modelagem, comparações

Cada lição de `challenge` deve ter:

- `starterCode` com uma coleção simulada como array de documentos JavaScript (constante `db`)
- `solution` com query MQL completa e funcional
- Analogias que conectem conceitos NoSQL com equivalentes relacionais (ex: "collection = tabela, document = linha, field = coluna")
- `commonMistakes` focados na transição do pensamento relacional (ex: tentar normalizar tudo, usar `$lookup` em excesso)

### Etapa 5 — Verificação final

- Todos os `lesson-id` do `course.json` têm arquivo JSON correspondente
- `courseId` e `moduleId` consistentes em todas as lições
- XP correto (10 para explanation/quiz, 25 para challenge)
- Progressão lógica: conceitual → operacional → otimização

## Questões a responder

- Cobrir Mongoose (ODM para Node.js) ou manter foco no MQL puro?
- Incluir MongoDB Atlas Search (busca full-text) ou é avançado demais para esse escopo?
- Como simular o ambiente MongoDB no Sandpack? (dados como array JS + funções auxiliares?)
- Separar em dois cursos: "MongoDB Essentials" (básico/intermediário) e "MongoDB Avançado" (aggregation, performance)?
- Incluir comparação de schema design com PostgreSQL JSONB para alunos vindos do relacional?

## Entregável

```
src/courses/mongodb/
  course.json
  lessons/
    *.json  (30–40 arquivos de lição)
```

Curso disponível na home da plataforma, cobrindo MongoDB do básico ao avançado com ~500–650 XP total.
