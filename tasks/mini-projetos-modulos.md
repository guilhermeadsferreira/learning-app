# Mini Projetos ao Final de Módulos

**Status:** pendente

---

## Objetivo

Introduzir uma lição de síntese ao final de cada módulo (ou dos principais), na forma de **mini projeto**: um desafio integrador que exige aplicar vários conceitos do módulo em um único entregável, fechando o ciclo de aprendizado com prática consolidada.

## Contexto

A metodologia da plataforma (pedagogy.md §4) define a progressão ideal de um módulo:

1. Introdução — conceito central, analogia, exemplo
2. Conceitos — aprofundamento com variações
3. Exercícios guiados — starter code + hint
4. Desafios — exercícios mais independentes
5. **Mini projeto** _(aspiracional — não implementado)_
6. Revisão _(aspiracional)_

Hoje os módulos terminam no passo 4 (ou no quiz de revisão), sem uma etapa de **projeto integrador**. O PRD (§16) e o AUDIT listam “adicionar mini projetos ao final dos módulos principais” como melhoria pedagógica prioritária.

### Estado atual

- **Tipos de lição:** `explanation`, `challenge`, `quiz` (src/engine/types.ts — `LessonType`)
- **Estrutura do curso React:** 16 módulos; cada um termina com quiz (e em alguns casos com challenge). Nenhum termina com “projeto”.
- **Sandpack:** já suporta desafios de código completos; um mini projeto pode ser um challenge mais longo e aberto.
- **XP:** 10 para explanation/quiz, 25 para challenge; projetos podem precisar de valor distinto (ex.: 50 XP).

### Benefício pedagógico

- **Consolidação:** o aluno junta useState, eventos, listas e formulários em um TODO list em vez de só exercícios isolados.
- **Motivação:** entregar um “produto” pequeno aumenta senso de conquista.
- **Transferência:** prepara para projetos reais (escopo maior, múltiplos conceitos).

## Escopo

### 1. Decisão de modelo: novo tipo `project` vs challenge estendido

**Opção A — Novo tipo de lição `project`**

- Adicionar `'project'` a `LessonType` em `src/engine/types.ts`.
- Lição com `type: 'project'` pode ter estrutura própria: ex. `content` (brief + critérios) + `challenge` (starterCode opcional, solution de referência, instruções em etapas).
- **Prós:** semântica clara, UI pode tratar diferente (badge “Projeto”, XP maior, possível tela de “entrega”).
- **Contras:** alteração no schema, em `getXpForLesson`, na LessonPage e em qualquer lugar que filtre por tipo.

**Opção B — Challenge “projeto” (mesmo tipo `challenge`)**

- Mini projeto = lição `type: 'challenge'` com convenções: título “Projeto: …”, instruções em múltiplos passos, starterCode mais esqueleto, XP maior (ex.: 50).
- Possível campo opcional no `course.json` ou na lição, ex. `"isModuleProject": true`, para a UI exibir como “Projeto do módulo”.
- **Prós:** zero mudança no schema de tipos; reutiliza Sandpack e fluxo atual.
- **Contras:** não há tipo dedicado; diferenciação só por convenção ou metadado.

**Recomendação:** começar com **Opção B** (challenge com XP maior e metadado/rotulagem) para validar conteúdo e UX; se fizer sentido, evoluir para tipo `project` depois.

**Critérios de sucesso:** decisão registrada na task ou no PRD; implementação consistente (schema + UI).

### 2. Schema e conteúdo

- **course_schema / lesson_schema:** documentar que uma lição pode ser “mini projeto do módulo” (por convenção de título/posição ou por campo opcional, ex. em `Module`: `projectLessonId?: string`, ou na lição: `isModuleProject?: boolean`).
- **Formato da lição:** mesma estrutura de uma lição `challenge`: `content.sections` (brief, critérios de aceite, dicas), `challenge.instructions` (pode ser texto longo com checklist), `challenge.starterCode`, `challenge.solution`, `hint`, `solutionExplanation`. Incluir `keyTakeaways`, `encouragement` e `realWorldExample` alinhados ao projeto.
- **XP:** definir valor para “projeto” (ex.: 50). Se for Opção B, pode-se usar um campo opcional na lição, ex. `xpOverride: 50`, ou regra “se última lição do módulo e título começa com ‘Projeto’, usar 50”.

**Critérios de sucesso:** documentação atualizada; pelo menos um mini projeto piloto (ex.: Estado — TODO list) criado e referenciado no `course.json`.

### 3. Definição dos mini projetos por módulo

Com base em pedagogy.md §8 e AUDIT:

| Módulo       | Mini projeto sugerido                           |
| ------------ | ----------------------------------------------- |
| state        | TODO list (useState, listas, formulário)        |
| components   | Card de perfil (props, composição, children)    |
| effects      | Timer com start/stop/reset (useEffect, cleanup) |
| routing      | Mini SPA com 3 páginas (React Router)           |
| custom-hooks | Hook reutilizável (ex.: useLocalStorage)        |
| styling      | Página de perfil estilizada (Tailwind)          |

Módulos como ecosystem, intro, advanced-hooks podem ficar sem projeto ou com projeto bem curto (definir em escopo).

**Critérios de sucesso:** lista aprovada de módulos que terão projeto; para cada um, título e critérios de aceite descritos (pode ser em comentário no JSON ou em doc).

### 4. Implementação no curso React

- Para cada módulo escolhido:
  - Criar arquivo `src/courses/react/lessons/{module-id}-projeto.json` (ou nome convencionado).
  - Incluir `content`, `challenge` (instructions, starterCode, solution, hint, solutionExplanation), campos pedagógicos.
  - Adicionar o `lessonId` ao array `lessons` do módulo em `course.json`, como última lição (antes ou depois do quiz, conforme decisão de fluxo).
- Garantir que `courseId` e `moduleId` estão corretos e que a lição aparece na navegação na ordem desejada.

**Critérios de sucesso:** 1 a 3 mini projetos implementados e jogáveis de ponta a ponta (ex.: state, components, effects).

### 5. Ajustes na UI (opcional na primeira entrega)

- **Sidebar / lista de lições:** identificar “projeto do módulo” (por convenção ou metadado) e exibir ícone ou label (“Projeto”).
- **Header da lição:** se for projeto, exibir XP maior (50) e eventual mensagem “Projeto do módulo”.
- **Rodapé / conclusão:** mensagem de encorajamento específica para conclusão de projeto (“Você integrou os conceitos do módulo em um projeto.”).

**Critérios de sucesso:** aluno identifica visualmente a lição como projeto; XP exibido corretamente.

### 6. XP e progresso

- Se Opção B: definir regra de XP para “projeto” (ex.: 50). Implementar em `getXpForLesson` ou por campo na lição (ex. `xp` já está na lição — basta colocar 50 no JSON).
- Completar um mini projeto deve marcar a lição como concluída e somar XP como qualquer outro challenge (uso do fluxo atual de `completeLesson`).

**Critérios de sucesso:** ao concluir o projeto, XP correto é atribuído e a lição consta como concluída.

## Questões a responder

1. Usar novo tipo `project` ou manter como `challenge` com convenção/XP maior?
2. Em quantos módulos do React implementar mini projeto na primeira versão (todos os principais ou 3–4 piloto)?
3. Ordem no módulo: projeto por último, depois do quiz, ou quiz por último?
4. XP do projeto: 50 fixo ou outro valor? Haverá bônus por “completar o módulo” no futuro?
5. Revisão por IA: o mesmo fluxo de “revisar código” do challenge se aplica ao projeto (enviar código para o Professor IA)?

## Entregável

1. **Decisão** registrada: tipo `project` vs challenge + convenção.
2. **Documentação:** lesson_schema.md (e course_schema.md se necessário) atualizados com mini projetos.
3. **Conteúdo:** pelo menos 1 mini projeto completo (ex.: state — TODO list) em `src/courses/react/lessons/` e referenciado no `course.json`.
4. **Opcional:** 2–3 projetos adicionais (components, effects ou routing); ajustes de UI para destacar “Projeto do módulo”.
5. **Pedagogy:** em `documents/product/pedagogy.md`, atualizar §8 removendo “_(aspiracional — não implementado)_” e indicando que mini projetos estão implementados para os módulos X, Y, Z.
