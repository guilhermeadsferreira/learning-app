# PEDAGOGY.md — Metodologia de Ensino

## 1. Objetivo

Este documento define a metodologia pedagógica da plataforma **Learning Engine**.

A plataforma foi projetada para ensinar tópicos técnicos e não-técnicos através de:

- microlearning
- prática ativa
- progressão gradual
- revisão estruturada
- feedback imediato

A metodologia busca maximizar retenção, motivação e confiança do aluno.

---

# 2. Metodologia de Aprendizado

A plataforma combina quatro abordagens principais:

## Active Learning

O aluno aprende fazendo.

Lições de explicação contextualizam o conceito; lições de desafio e quiz exigem ação ativa do aluno.

---

## Mastery Learning

O aluno deve demonstrar entendimento antes de avançar.

Implementado através de:

- desafios práticos com Sandpack
- quizzes de múltipla escolha (aspiracional — não há bloqueio de progresso no estado atual)

---

## Scaffolding

A dificuldade aumenta gradualmente.

Estrutura típica:

1. analogia concreta
2. explicação guiada (content.sections)
3. exemplo de código (seção `code`)
4. exercício assistido (starter code + hint)
5. desafio independente

---

## Retrieval Practice

O aluno deve recuperar informações da memória.

Implementado com:

- desafios (`challenge`) — lições de prática ativa
- quizzes (`quiz`) — perguntas de múltipla escolha
- revisão de lições anteriores

---

# 3. Estrutura real de lições

A estrutura real das lições, conforme implementada no schema atual (ver [lesson_schema.md](lesson_schema.md)):

| Parte                | Campo                        | Status                                    |
| -------------------- | ---------------------------- | ----------------------------------------- |
| Analogia             | `analogy`                    | Opcional — presente na maioria das lições |
| Conteúdo estruturado | `content.sections`           | Obrigatório                               |
| Desafio              | `challenge` (type=challenge) | Obrigatório quando type=challenge         |
| Quiz                 | `quiz` (type=quiz)           | Obrigatório quando type=quiz              |
| Pontos-chave         | `keyTakeaways`               | Recomendado                               |
| Erros comuns         | `commonMistakes`             | Recomendado (esp. em challenges)          |
| Exemplo real         | `realWorldExample`           | Recomendado                               |
| Motivação            | `encouragement`              | Recomendado                               |

---

## 3.1 Analogia

Uma analogia concreta conecta o conceito a algo familiar.

Exemplos bons:

> useState é como um post-it colado no componente que guarda um valor.

> Um backlog é como uma lista de compras: você prioriza o que precisa primeiro.

Regras:

- Usar referências do mundo real (não abstrações técnicas)
- Uma analogia por lição
- Curta (máx. 2 frases)

---

## 3.2 Conteúdo estruturado (`content.sections`)

O corpo da lição é composto de seções tipadas:

| Tipo        | Uso                                        |
| ----------- | ------------------------------------------ |
| `heading`   | Título de subseção                         |
| `paragraph` | Explicação textual (máx. 6 linhas)         |
| `code`      | Bloco de código com destaque sintático     |
| `list`      | Lista de itens (separados por `\n`)        |
| `callout`   | Destaque visual (`tip`, `warning`, `info`) |

Exemplos devem ser embutidos como seções `code` dentro de `content.sections` — não existe campo separado para exemplo.

---

## 3.3 Desafio (`challenge`)

Presente em lições do tipo `challenge`. Exige que o aluno escreva ou modifique código no editor Sandpack.

Campos obrigatórios:

- `instructions` — o que o aluno deve fazer
- `starterCode` — código inicial com estrutura parcial
- `solution` — solução de referência (usada pela IA)

Campos recomendados:

- `hint` — dica sem entregar a solução
- `solutionExplanation` — explicação do porquê a solução funciona

---

## 3.4 Feedback educativo

O feedback ao aluno vem de três fontes:

1. **`solutionExplanation`** — explicação da solução após completar o desafio
2. **`commonMistakes`** — erros comuns do campo da lição (exibidos como alertas)
3. **Professor IA** — revisão do código com tom encorajador (Claude ou OpenAI)

O feedback deve:

- explicar **por que** funciona, não apenas **o que** fazer
- mencionar erros comuns como prevenção, não como crítica
- manter tom encorajador

---

## 3.5 Pontos-chave (`keyTakeaways`)

Array de strings resumindo os conceitos centrais da lição.

Substitui o campo `remember` do schema anterior.

Deve ter 2–4 itens. Exibidos ao final da lição.

Exemplo:

```json
"keyTakeaways": [
  "useState retorna [valor, setter]",
  "Chamar o setter dispara re-renderização",
  "Use a forma funcional quando o estado depende do valor anterior"
]
```

---

## 3.6 Campos pedagógicos adicionais

### `commonMistakes`

Lista de erros comuns que o aluno costuma cometer ao aplicar o conceito.

Especialmente relevante em lições `challenge`. Ajuda o aluno a evitar armadilhas antes de cometê-las.

### `realWorldExample`

Contextualização do conceito em um produto ou cenário real.

Aumenta relevância e motivação.

Exemplo: "Em um e-commerce, o estado controla quantos itens estão no carrinho."

### `encouragement`

Mensagem motivacional personalizada por lição.

Curta (1–2 frases). Tom positivo e direto. Evitar frases genéricas como "Ótimo trabalho!".

---

# 4. Estrutura de módulos

Cada módulo deve seguir a seguinte progressão:

1. Introdução — conceito central, analogia, exemplo
2. Conceitos — aprofundamento com variações
3. Exercícios guiados — starter code com bastante apoio
4. Desafios — exercícios mais independentes
5. Mini projeto _(aspiracional — não implementado ainda)_
6. Revisão _(aspiracional — não implementado ainda)_

---

# 5. Progressão de dificuldade

Desafios devem seguir progressão clara:

| Nível | Tipo           | Descrição                            |
| ----- | -------------- | ------------------------------------ |
| 1     | Completion     | Aluno completa trechos faltantes     |
| 2     | Correction     | Aluno corrige um erro existente      |
| 3     | Implementation | Aluno cria código do zero            |
| 4     | Debugging      | Aluno identifica e corrige problemas |

> **Estado atual:** challenges existem mas sem classificação de tipo. A adição do campo `challengeType` é uma melhoria planejada.

---

# 6. Tipos de lição

| Tipo          | Descrição                                 | Prática ativa                       |
| ------------- | ----------------------------------------- | ----------------------------------- |
| `explanation` | Lição conceitual com conteúdo estruturado | Indireta (via conteúdo e analogias) |
| `challenge`   | Lição com desafio prático no Sandpack     | Direta (escrita de código)          |
| `quiz`        | Lição com perguntas de múltipla escolha   | Direta (retrieval)                  |

> **Estado atual:** lições do tipo `quiz` existem no schema mas ainda não foram criadas para o curso React. A criação de quizzes intercalados (a cada 3–4 lições) é uma melhoria prioritária.

---

# 7. Professor IA como ferramenta pedagógica

O sistema de IA (ver [AI_SYSTEM.md](AI_SYSTEM.md)) age como ferramenta pedagógica complementar:

- **Revisão de código** — análise estruturada com feedback, sugestões e próximo passo
- **Chat** — tirar dúvidas durante desafios sem revelar a solução
- **Tom encorajador** — nunca punitivo, sempre orientado ao aprendizado

A IA deve reforçar os mesmos princípios do conteúdo: microlearning, scaffolding e feedback positivo.

---

# 8. Mini projetos _(aspiracional)_

Cada módulo deve terminar com um pequeno projeto integrando os conceitos aprendidos.

Exemplos planejados:

- Módulo Estado: app de TODO list com useState
- Módulo Componentes: card de perfil com composição
- Módulo Effects: timer com start/stop/reset
- Módulo Router: mini SPA com 3 páginas

> **Estado atual:** não implementado. Os módulos terminam abruptamente sem lição de síntese.

---

# 9. Regras pedagógicas

Obrigatórias na criação de qualquer lição:

- explicações devem ser curtas (máx. 6 linhas por parágrafo)
- analogias devem ser concretas (referência ao mundo real)
- cada conceito deve ter exemplo de código ou caso de uso
- lições `challenge` devem ter `hint` e `solutionExplanation`
- usar `keyTakeaways` para reforçar conceitos centrais
- usar `commonMistakes` em lições de prática

Aspiracional (ainda não implementado):

- cada módulo deve ter mini projeto ao final
- quizzes devem ser intercalados para retrieval practice
- lições `explanation` devem ter ao menos um mecanismo de verificação de compreensão

---

# 10. Objetivo pedagógico

O objetivo final é que o aluno:

- entenda conceitos fundamentais do domínio
- saiba aplicá-los em situações reais
- desenvolva confiança progressivamente
- consiga construir pequenos projetos por conta própria
