# Review Course — Auditoria e Melhoria de Curso Existente

Audite e melhore o curso indicado abaixo.

**Curso a revisar:** {{input}}

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

## 2. Pesquisa de documentação atualizada (Context7 MCP)

Se o curso for sobre uma **biblioteca, framework, ferramenta ou produto técnico**:

1. Use `resolve-library-id` do MCP **user-context7** para buscar o ID da library
2. Use `query-docs` com o ID encontrado para validar APIs, sintaxe e boas práticas atuais
3. Faça queries cobrindo os principais conceitos do curso
4. Use essa documentação como base para detectar **conteúdo técnico desatualizado ou impreciso**

Se o curso for **conceitual**, pule esta etapa.

---

## 3. Diagnóstico — Auditoria completa

Execute a auditoria em **5 dimensões**. Para cada problema encontrado, classifique por prioridade:

- **🔴 Crítico** — impacta a experiência ou está incorreto
- **🟡 Importante** — ausência de campo pedagógico recomendado
- **🟢 Melhoria** — refinamento de qualidade, clareza ou motivação

---

### 3.1 Conformidade com o schema

Verifique por lição:

- [ ] Campos obrigatórios presentes: `id`, `courseId`, `moduleId`, `title`, `type`, `xp`, `content`
- [ ] `content.sections` com tipos válidos: `heading`, `paragraph`, `code`, `list`, `callout`
- [ ] Lição `challenge`: tem `instructions`, `starterCode`, `solution`, `tests`
- [ ] Lição `quiz`: tem array `quiz[]` com `question` e `options[]` com `isCorrect`
- [ ] XP correto: 10 para `explanation`/`quiz`, 25 para `challenge`
- [ ] IDs das lições do `course.json` têm arquivo `.json` correspondente

---

### 3.2 Campos pedagógicos ausentes

Para cada lição, identifique campos recomendados ausentes:

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

Prioridade: **🟡 Importante** para campos ausentes, **🔴 Crítico** se `challenge` não tem `hint` ou `solutionExplanation`.

---

### 3.3 Qualidade do conteúdo

Analise por lição e módulo:

- Parágrafos com mais de 6 linhas (muito denso)
- Ausência de bloco `code` em lições técnicas
- Ausência de seção `callout` para conceitos críticos
- Analogias vagas ou abstratas (usando termos técnicos em vez de referências do mundo real)
- `encouragement` genérico ("Ótimo trabalho!" não é específico o suficiente)
- `keyTakeaways` com itens óbvios ou muito longos
- Instruções de `challenge` pouco claras ou ambíguas
- `starterCode` sem estrutura de apoio suficiente para o nível

---

### 3.4 Progressão pedagógica por módulo

Para cada módulo no `course.json`, verifique:

- **Proporção de tipos:** idealmente ~40% explanation, ~40% challenge, ~20% quiz
- **Cobertura de quizzes:** há pelo menos 1 quiz por módulo? (retrieval practice)
- **Progressão de dificuldade:** começa em `beginner`, avança para `intermediate`/`advanced`?
- **Scaffolding:** há uma lição de introdução antes de lições de prática?
- **Ausência de síntese:** o módulo termina abruptamente sem lição de consolidação?

---

### 3.5 Precisão técnica (com Context7)

Se o curso for técnico, verifique por lição:

- APIs ou sintaxe desatualizadas (ex: hooks obsoletos, funções removidas)
- Exemplos de código que não refletem boas práticas atuais da biblioteca
- Features descritas que mudaram entre versões
- Importações incorretas ou desnecessárias no `starterCode`/`solution`

---

## 4. Relatório de diagnóstico

Apresente o diagnóstico ao usuário no seguinte formato:

```
## Diagnóstico: {título do curso}

### Resumo
- Total de lições: N
- Lições com problemas críticos: N
- Campos pedagógicos ausentes (total): N
- Módulos sem quiz: N
- Lições com conteúdo técnico a revisar: N

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

## 5. Definição do escopo de melhorias

Apresente as **categorias de melhoria disponíveis** e **peça aprovação** do usuário:

```
Quais melhorias deseja aplicar?

A) Campos pedagógicos ausentes (analogy, keyTakeaways, encouragement, realWorldExample, difficulty)
B) Challenges sem hint e solutionExplanation
C) Qualidade de conteúdo (parágrafos longos, callouts, analogias)
D) Adicionar quizzes nos módulos sem retrieval practice
E) Correções técnicas baseadas na documentação atualizada
F) Todas as melhorias acima

Escolha (A/B/C/D/E/F ou combinação):
```

Aguarde a resposta antes de prosseguir.

---

## 6. Aplicação das melhorias

Aplique as melhorias aprovadas em **lotes por módulo**, na seguinte ordem:

1. Corrija problemas críticos (schema, XP, campos obrigatórios) — sempre, independente da aprovação
2. Para cada módulo selecionado:
   a. Leia as lições do módulo
   b. Aplique as melhorias aprovadas
   c. Reescreva cada arquivo `.json` afetado
   d. Informe progresso: `Módulo {N}/{total} — {nome} ✓ ({N} lições atualizadas)`
3. Ao final de cada módulo, aguarde ou continue (dependendo do tamanho)

### Regras ao melhorar lições

- **Nunca alterar** `id`, `courseId`, `moduleId`, `title`, `type`
- **Nunca remover** conteúdo existente — apenas enriquecer
- Novos campos pedagógicos devem manter o **tom da lição** já existente
- `analogy` nova: máx. 2 frases, referência ao mundo real (não técnica)
- `encouragement` novo: específico ao conceito da lição (evitar frases genéricas)
- `keyTakeaways` novos: 2–4 itens, concisos e acionáveis
- `hint` novo em challenges: deve guiar sem revelar a solução
- `solutionExplanation` nova: explicar **por que** funciona, não apenas o que faz
- Se criar quiz novo: 2–4 perguntas, uma opção correta, `explanation` em cada opção

---

## 7. Verificação final

Ao concluir todas as melhorias, verifique:

- [ ] Nenhum campo obrigatório removido acidentalmente
- [ ] XP correto em todas as lições alteradas
- [ ] `courseId` e `moduleId` consistentes com `course.json`
- [ ] Novos quizzes têm IDs únicos e foram adicionados ao `course.json`
- [ ] Lições `challenge` têm `hint` e `solutionExplanation`
- [ ] Nenhum JSON inválido (chaves fechadas, vírgulas corretas)

---

## 8. Relatório final

Apresente o resumo das melhorias aplicadas:

```
## Revisão concluída: {título do curso}

### Mudanças aplicadas
- Lições atualizadas: N de N total
- Campos pedagógicos adicionados: N
- Challenges aprimorados (hint + solutionExplanation): N
- Quizzes criados: N
- Correções técnicas: N

### Por módulo
| Módulo | Lições | Mudanças |
|--------|--------|---------|
| ...    | N      | campos pedagógicos, quiz adicionado |

### Próximos passos sugeridos
- (lista de melhorias identificadas mas não aplicadas nesta sessão)
```
