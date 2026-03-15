# AI_SYSTEM.md — Professor IA

## Visão geral

O **Professor IA** é uma feature integrada à plataforma Learning Engine que oferece:

* **Revisão de código/resposta** — análise estruturada da solução do aluno com feedback, sugestões e próximo passo
* **Chat** — sistema de Q&A para o aluno tirar dúvidas durante desafios sem receber a resposta pronta

A IA é agnóstica ao domínio do curso. O comportamento se adapta automaticamente com base no `aiReviewContext` definido no `course.json`.

---

## Localização no código

```
src/services/ai-review.ts   → lógica central (providers, prompts, chamadas de API)
src/components/lesson/
  AIReviewCard.tsx           → exibição do feedback de revisão
  APIKeyDialog.tsx           → configuração de API key pelo aluno
```

---

## Providers suportados

| Provider | Model | Prefixo da API Key |
|----------|-------|--------------------|
| Claude (Anthropic) | `claude-sonnet-4-20250514` | `sk-ant-` |
| OpenAI | `gpt-4o-mini` | `sk-` |

O provider ativo é salvo em `localStorage` (`learning-engine-ai-provider`).

O aluno pode trocar o provider a qualquer momento via interface.

---

## API Key management

A chave da API é obtida em ordem de prioridade:

1. Variável de ambiente (`VITE_ANTHROPIC_API_KEY` ou `VITE_OPENAI_API_KEY`)
2. localStorage (`learning-engine-api-key-{provider}`)

O aluno configura a chave via `APIKeyDialog`. Ela é salva localmente no navegador — nunca enviada para servidores próprios da plataforma.

---

## Contexto de IA por curso (`aiReviewContext`)

Definido no `course.json`, o `aiReviewContext` configura como a IA se comporta para aquele curso:

```json
"aiReviewContext": {
  "subject": "React",
  "expertise": "React, hooks, componentes, JSX, Tailwind",
  "codeLanguage": "jsx",
  "challengeStyle": "code"
}
```

| Campo | Tipo | Descrição |
|-------|------|-----------|
| subject | string | Assunto principal do curso |
| expertise | string | Áreas de conhecimento para o prompt da IA |
| codeLanguage | string | Linguagem dos blocos de código (`jsx`, `python`, `sql`, `bash`, `text`) |
| challengeStyle | ChallengeStyle | Como a IA avalia a resposta do aluno |

Se o curso não definir `aiReviewContext`, o sistema usa um fallback por `courseId`. Se não houver fallback registrado, usa valores genéricos.

---

## Tipos de desafio (`challengeStyle`)

O `challengeStyle` define o comportamento do sistema de revisão:

| Valor | Quando usar | Critério de `isCorrect` |
|-------|-------------|------------------------|
| `code` | Desafios de código (React, Python, etc.) | Código resolve o desafio, mesmo que difira da solução modelo |
| `query` | Desafios de query em banco de dados | Query retorna resultado correto |
| `scenario` | Cenários de decisão sem código (gestão, soft skills) | Resposta demonstra raciocínio coerente com boas práticas |
| `written` | Respostas textuais / análise | Resposta demonstra compreensão e atende ao pedido |

---

## Revisão de código/resposta

### Fluxo

1. Aluno escreve sua solução no editor
2. Clica em "Revisar com IA"
3. `reviewWithAI()` é chamada com o contexto da lição
4. A IA recebe: título da lição, instruções do desafio, solução de referência, dica e código/resposta do aluno
5. Retorna `AIReviewResponse` parseado do JSON

### `AIReviewRequest`

```typescript
interface AIReviewRequest {
  lessonTitle: string
  challengeInstructions: string
  solution: string            // solução de referência do JSON da lição
  studentCode: string         // código/resposta do aluno
  hint?: string
  lessonContext?: string
  courseId: string
  aiReviewContext?: AIReviewContext
}
```

### `AIReviewResponse`

```typescript
interface AIReviewResponse {
  feedback: string        // análise em 2–4 parágrafos
  isCorrect: boolean      // se a resposta é considerada correta
  encouragement: string   // mensagem motivacional personalizada
  suggestions: string[]   // sugestões práticas de melhoria
  nextStepHint?: string   // dica sobre o que explorar a seguir
}
```

### Princípios do sistema prompt de revisão

* Começa reconhecendo o que está correto
* Explica o "porquê" dos erros, não só o "o quê"
* Tom encorajador — nunca punitivo ou sarcástico
* Usa analogias do dia a dia
* Dá exemplos concretos nas sugestões
* Responde sempre em português brasileiro
* Retorna apenas JSON (sem markdown)

---

## Chat (tirar dúvidas)

### Fluxo

1. Aluno digita pergunta no chat durante o desafio
2. `askAIQuestion()` é chamada
3. A IA recebe: título da lição, código atual do aluno e a pergunta
4. Retorna resposta textual (não JSON)

### Princípios do sistema prompt de chat

* Nunca entrega a resposta diretamente
* Dá dicas progressivas quando o aluno pede a solução
* Referencia o código do aluno quando relevante
* Tom paciente e encorajador
* Resposta concisa (2–4 parágrafos)

---

## Tratamento de erros

Se a resposta da IA não for JSON válido (ex: falha de parsing), o sistema retorna um `AIReviewResponse` de fallback:

```typescript
{
  feedback: content,           // texto bruto da IA como fallback
  isCorrect: false,
  encouragement: "Continue tentando! Cada erro é uma oportunidade de aprender.",
  suggestions: []
}
```

---

## Limites de tokens

| Operação | `max_tokens` |
|----------|-------------|
| Revisão de código | 1000 |
| Chat (pergunta) | 600 |

---

## Papel pedagógico

O Professor IA complementa o conteúdo estático das lições:

* **Revisão** — oferece feedback personalizado impossível de hardcodar
* **Chat** — remove bloqueios sem revelar a solução, promovendo aprendizado ativo
* **Tom** — alinhado com os princípios pedagógicos da plataforma: encorajador, didático, progressivo

A IA não substitui o conteúdo — ela amplifica o aprendizado onde o conteúdo estático tem limitações.
