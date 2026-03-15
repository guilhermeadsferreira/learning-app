# Review Course — Auditoria e Melhoria de Curso Existente

Audite e melhore o curso indicado abaixo.

**Curso a revisar:** $ARGUMENTS

Consulte como fonte de verdade:

- `documents/product/course_schema.md`
- `documents/product/lesson_schema.md`
- `documents/product/content_generation.md`
- `documents/product/pedagogy.md`

---

## 1. Leitura e mapeamento do curso

Leia os seguintes arquivos:

1. `src/courses/{courseId}/course.json` — estrutura de módulos e lições
2. Todas as lições em `src/courses/{courseId}/lessons/*.json`

Monte internamente uma tabela com as seguintes colunas por lição:

| lesson-id | tipo | xp | analogy | keyTakeaways | commonMistakes | encouragement | realWorldExample | hint (se challenge) | solutionExplanation (se challenge) | difficulty |

---

## 2. Diagnóstico — Auditoria completa

Execute a auditoria em **5 dimensões**. Para cada problema encontrado, classifique por prioridade:

- **🔴 Crítico** — impacta a experiência ou está incorreto
- **🟡 Importante** — ausência de campo pedagógico recomendado
- **🟢 Melhoria** — refinamento de qualidade, clareza ou motivação

### 2.1 Conformidade com o schema

Verifique por lição:

- [ ] Campos obrigatórios presentes: `id`, `courseId`, `moduleId`, `title`, `type`, `xp`, `content`
- [ ] `content.sections` com tipos válidos: `heading`, `paragraph`, `code`, `list`, `callout`
- [ ] Lição `challenge`: tem `instructions`, `starterCode`, `solution`, `tests`
- [ ] Lição `quiz`: tem array `quiz[]` com `question` e `options[]` com `isCorrect`
- [ ] XP correto: 10 para `explanation`/`quiz`, 25 para `challenge`
- [ ] IDs das lições do `course.json` têm arquivo `.json` correspondente

### 2.2 Campos pedagógicos ausentes

| Campo                 | Esperado em                                       |
| --------------------- | ------------------------------------------------- |
| `analogy`             | Todas as lições (especialmente `explanation`)     |
| `keyTakeaways`        | Todas as lições                                   |
| `commonMistakes`      | Lições `challenge` (e conceitos propensos a erro) |
| `realWorldExample`    | Todas as lições                                   |
| `encouragement`       | Todas as lições                                   |
| `hint`                | Lições `challenge`                                |
| `solutionExplanation` | Lições `challenge`                                |
| `difficulty`          | Todas as lições                                   |

### 2.3 Qualidade do conteúdo

- Parágrafos com mais de 6 linhas (muito denso)
- Ausência de bloco `code` em lições técnicas
- Ausência de seção `callout` para conceitos críticos
- Analogias vagas ou abstratas (usando termos técnicos em vez de referências do mundo real)
- `encouragement` genérico ("Ótimo trabalho!" não é específico o suficiente)
- Instruções de `challenge` pouco claras ou ambíguas

### 2.4 Progressão pedagógica por módulo

- **Proporção de tipos:** idealmente ~40% explanation, ~40% challenge, ~20% quiz
- **Cobertura de quizzes:** há pelo menos 1 quiz por módulo?
- **Progressão de dificuldade:** começa em `beginner`, avança para `intermediate`/`advanced`?
- **Scaffolding:** há uma lição de introdução antes de lições de prática?

---

## 3. Relatório de diagnóstico

Apresente o diagnóstico ao usuário no seguinte formato:

```
## Diagnóstico: {título do curso}

### Resumo
- Total de lições: N
- Lições com problemas críticos: N
- Campos pedagógicos ausentes (total): N
- Módulos sem quiz: N

### 🔴 Críticos
- [lesson-id] — {descrição do problema}

### 🟡 Importantes — Campos pedagógicos
| Módulo | Lição | Campos ausentes |
|--------|-------|----------------|
| ...    | ...   | analogy, hint  |

### 🟢 Melhorias de qualidade
- [lesson-id] — {sugestão}

### Progressão por módulo
| Módulo | explanation | challenge | quiz | Problema |
|--------|-------------|-----------|------|---------|
| ...    | N           | N         | 0    | Sem quiz |
```

---

## 4. Definição do escopo de melhorias

Apresente as **categorias de melhoria disponíveis** e **peça aprovação** do usuário:

```
Quais melhorias deseja aplicar?

A) Campos pedagógicos ausentes (analogy, keyTakeaways, encouragement, realWorldExample, difficulty)
B) Challenges sem hint e solutionExplanation
C) Qualidade de conteúdo (parágrafos longos, callouts, analogias)
D) Adicionar quizzes nos módulos sem retrieval practice
E) Todas as melhorias acima

Escolha (A/B/C/D/E ou combinação):
```

Aguarde a resposta antes de prosseguir.

---

## 5. Aplicação das melhorias

Aplique as melhorias aprovadas em **lotes por módulo**, na seguinte ordem:

1. Corrija problemas críticos (schema, XP, campos obrigatórios) — sempre, independente da aprovação
2. Para cada módulo:
   a. Leia as lições do módulo
   b. Aplique as melhorias aprovadas
   c. Reescreva cada arquivo `.json` afetado
   d. Informe progresso: `Módulo {N}/{total} — {nome} ✓ ({N} lições atualizadas)`

### Regras ao melhorar lições

- **Nunca alterar** `id`, `courseId`, `moduleId`, `title`, `type`
- **Nunca remover** conteúdo existente — apenas enriquecer
- `analogy` nova: máx. 2 frases, referência ao mundo real (não técnica)
- `encouragement` novo: específico ao conceito da lição (evitar frases genéricas)
- `keyTakeaways` novos: 2–4 itens, concisos e acionáveis
- `hint` novo em challenges: deve guiar sem revelar a solução
- `solutionExplanation` nova: explicar **por que** funciona, não apenas o que faz
- Se criar quiz novo: 2–4 perguntas, uma opção correta, `explanation` em cada opção

---

## 6. Verificação final

Ao concluir todas as melhorias, verifique:

- [ ] Nenhum campo obrigatório removido acidentalmente
- [ ] XP correto em todas as lições alteradas
- [ ] `courseId` e `moduleId` consistentes com `course.json`
- [ ] Novos quizzes têm IDs únicos e foram adicionados ao `course.json`
- [ ] Lições `challenge` têm `hint` e `solutionExplanation`
- [ ] Nenhum JSON inválido (chaves fechadas, vírgulas corretas)

---

## 7. Relatório final

```
## Revisão concluída: {título do curso}

### Mudanças aplicadas
- Lições atualizadas: N de N total
- Campos pedagógicos adicionados: N
- Challenges aprimorados (hint + solutionExplanation): N
- Quizzes criados: N

### Por módulo
| Módulo | Lições | Mudanças |
|--------|--------|---------|
| ...    | N      | campos pedagógicos, quiz adicionado |

### Próximos passos sugeridos
- (lista de melhorias identificadas mas não aplicadas nesta sessão)
```
