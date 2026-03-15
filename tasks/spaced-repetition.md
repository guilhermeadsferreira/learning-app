# Spaced Repetition — Sistema de Revisão Espaçada

**Status:** pendente

---

## Objetivo

Implementar um sistema de revisão espaçada (spaced repetition) que resurfaça lições já completadas em intervalos crescentes, maximizando a retenção de longo prazo dos conceitos aprendidos.

## Contexto

A plataforma já possui os pilares pedagógicos de **active recall** e **retrieval practice** (PRD §6, pedagogy.md §2). Com a recente adição de quizzes em todos os 16 módulos do curso React, a infraestrutura de conteúdo está pronta para revisão. O que falta é o mecanismo de **agendamento inteligente**.

### Estado atual

- **Progresso**: `UserProgress` armazena `completedLessonIds[]`, `currentLessonId` e `xp` — sem timestamps, sem histórico de tentativas
- **Persistência**: localStorage (sem backend)
- **Quizzes**: 16 quizzes disponíveis (1 por módulo), cada um com 3-4 perguntas
- **Revisão manual**: o aluno pode revisitar qualquer lição, mas não há incentivo nem orientação para fazê-lo
- **Spaced repetition**: mencionado como aspiracional no PRD §15 e pedagogy.md §9

### Por que implementar agora

1. Os quizzes recém-criados são o conteúdo ideal para revisão espaçada
2. A retenção cai dramaticamente sem revisão (curva de esquecimento de Ebbinghaus)
3. A plataforma já tem XP — revisar pode ser recompensado
4. Diferencial competitivo: poucos cursos de programação combinam microlearning + spaced repetition

## Escopo

### 1. Modelo de dados — Estender UserProgress

O `UserProgress` atual (`src/engine/types.ts`) não armazena informações temporais. Precisa ser estendido para suportar revisão.

**Campos necessários:**

```typescript
interface ReviewItem {
  lessonId: string
  courseId: string
  nextReviewAt: number // timestamp da próxima revisão
  interval: number // intervalo atual em dias (1, 3, 7, 14, 30...)
  easeFactor: number // fator de facilidade (SM-2: padrão 2.5)
  repetitions: number // quantas vezes foi revisado com sucesso
  lastReviewedAt: number // timestamp da última revisão
}

interface UserProgress {
  completedLessonIds: string[]
  currentLessonId: string
  xp: number
  reviewQueue: ReviewItem[] // NOVO
}
```

**Critérios de sucesso:**

- Migração transparente do formato antigo (sem reviewQueue) para o novo
- `loadProgress` deve popular reviewQueue vazio se não existir
- Persistência em localStorage (mantém padrão atual)

**Decisões:**

- Usar SM-2 simplificado ou intervalos fixos (1, 3, 7, 14, 30 dias)?
- Gerar `ReviewItem` automaticamente ao completar uma lição, ou apenas para quizzes/challenges?

### 2. Engine de agendamento

Criar `src/engine/spaced-repetition.ts` com a lógica de agendamento.

**Responsabilidades:**

- Calcular próxima data de revisão após uma resposta
- Classificar resposta (fácil / difícil / errou)
- Retornar lições que estão "due" (vencidas para revisão)
- Ordenar fila de revisão por prioridade (mais atrasadas primeiro)

**Algoritmo sugerido (SM-2 simplificado):**

| Resultado | Novo intervalo  | Ease factor           |
| --------- | --------------- | --------------------- |
| Errou     | 1 dia           | ease × 0.8 (mín. 1.3) |
| Difícil   | interval × 1.2  | ease × 0.9            |
| Fácil     | interval × ease | ease + 0.1 (máx. 3.0) |

Primeiro review sempre em 1 dia. Segundo em 3 dias. Depois segue o algoritmo.

**Critérios de sucesso:**

- Função pura (recebe estado atual + resultado, retorna novo estado)
- Testável sem dependências externas
- Intervalos razoáveis (não agendar revisão para daqui a 6 meses)

### 3. Hook `useReview`

Criar `src/hooks/useReview.ts` para expor a funcionalidade de revisão.

**API sugerida:**

```typescript
function useReview(courseId: string) {
  return {
    dueReviews: ReviewItem[]      // lições prontas para revisão
    dueCount: number              // quantas revisões pendentes
    reviewLesson: (lessonId, result: 'easy' | 'hard' | 'forgot') => void
    nextReviewDate: Date | null   // próxima revisão agendada
  }
}
```

**Integração:** o hook usa `useProgress` internamente para ler/escrever o `reviewQueue`.

### 4. UI — Indicador de revisões pendentes

O aluno precisa saber que tem revisões pendentes. Opções de onde mostrar:

**4a. Badge no header/sidebar:**

- Ícone de revisão com contador (ex: "3 revisões pendentes")
- Clicável: abre a lista de revisões ou navega para a primeira

**4b. Card na tela do curso:**

- Seção "Revisão do dia" acima dos módulos
- Mostra as lições a revisar com botão de iniciar

**4c. Tela dedicada de revisão:**

- Rota `/course/:courseId/review`
- Lista de flashcards/quizzes para revisar
- Após cada revisão, o aluno classifica: "Fácil", "Difícil" ou "Esqueci"

**Decisão:** começar simples (badge + card no curso) ou já fazer tela dedicada?

### 5. Experiência de revisão

Quando o aluno clica para revisar uma lição:

**Opção A — Redirecionar para a lição original:**

- Simples, reutiliza toda a UI existente
- Ao final, mostra botões "Fácil / Difícil / Esqueci" em vez de "Próxima lição"
- Desvantagem: o aluno vê o conteúdo inteiro de novo (pode ser tedioso)

**Opção B — Modo flashcard (apenas quiz/keyTakeaways):**

- Mostra apenas as perguntas do quiz e os keyTakeaways
- Mais rápido e focado na recuperação ativa
- Requer componente novo
- Mais alinhado com a filosofia de spaced repetition

**Opção C — Híbrido:**

- Quiz primeiro (retrieval)
- Se errar, mostra o conteúdo relevante (scaffolding)
- Se acertar, segue para o próximo

**Decisão:** a opção C é pedagogicamente ideal, mas mais complexa. Sugestão: começar com A e evoluir.

### 6. XP de revisão

Revisar deve dar XP? Se sim, quanto?

**Opções:**

- XP fixo por revisão (ex: 5 XP)
- XP proporcional ao resultado (fácil: 5, difícil: 3, esqueci: 1)
- Sem XP extra (apenas preserva o aprendizado)
- Bonus streak (revisou 7 dias seguidos: XP bônus)

**Decisão:** XP fixo de 5 por revisão é simples e motivador sem inflacionar.

### 7. Seed da fila de revisão

Lições já completadas antes da implementação do sistema não terão `ReviewItem`. Opções:

- **Ignorar**: só lições completadas após a feature geram revisões
- **Backfill**: ao carregar progresso, criar ReviewItem para todas as lições completadas com `nextReviewAt = agora`
- **Gradual**: criar ReviewItem para as últimas N lições completadas

**Sugestão:** backfill com `nextReviewAt` escalonado (1ª lição: hoje, 2ª: amanhã, etc.) para não sobrecarregar o aluno.

## Questões a responder

1. Algoritmo: SM-2 simplificado ou intervalos fixos (1, 3, 7, 14, 30)?
2. Escopo de lições: todas as lições completadas geram revisão, ou apenas quizzes e challenges?
3. UI inicial: badge + card no curso, ou tela dedicada de revisão?
4. Experiência de revisão: redirecionar à lição, modo flashcard, ou híbrido?
5. XP de revisão: dar XP? Quanto?
6. Backfill: importar progresso existente para a fila de revisão?
7. Prioridade: implementar antes ou depois de autenticação/persistência no servidor?

## Entregável

1. `src/engine/types.ts` — `ReviewItem` e `UserProgress` estendido
2. `src/engine/spaced-repetition.ts` — engine de agendamento (funções puras)
3. `src/hooks/useReview.ts` — hook para consumo na UI
4. UI de indicação (badge/card) + experiência de revisão
5. Integração com sistema de XP
6. Atualização de `documents/product/methodology/pedagogy.md` — remover marcação aspiracional de spaced repetition
