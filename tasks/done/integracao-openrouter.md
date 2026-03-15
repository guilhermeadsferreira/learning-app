# Integração OpenRouter como Provider de IA

**Status:** concluído

---

## Objetivo

Adicionar o **OpenRouter** como terceiro provider de IA, permitindo que o usuário informe livremente o modelo que deseja usar — com sugestão padrão do modelo `z-ai/glm-4.7` como melhor custo-benefício.

---

## Contexto

Hoje o serviço `src/services/ai-review.ts` suporta dois providers fixos:

| Provider | Modelo fixo                |
| -------- | -------------------------- |
| Claude   | `claude-sonnet-4-20250514` |
| OpenAI   | `gpt-4o-mini`              |

Cada provider tem um modelo pré-configurado e imutável pelo usuário.

O **OpenRouter** é um agregador de modelos que expõe uma API compatível com o formato OpenAI (`/v1/chat/completions`), com acesso a centenas de modelos de diferentes providers — muitos deles com custo muito inferior ao Claude ou GPT-4o.

### Por que OpenRouter?

1. **Acessibilidade de custo** — modelos capazes com preços muito menores
2. **Flexibilidade** — o usuário experimenta modelos diferentes sem trocar de provider
3. **API unificada** — reusa praticamente toda a lógica já existente do `callOpenAI()`
4. **Liberdade pedagógica** — o aluno aprende a avaliar modelos por conta própria

### Comparativo de preço: sugestão padrão vs. referência Claude

O modelo sugerido como padrão é `z-ai/glm-4.7`, flagship da Z.ai com foco em programação e raciocínio multi-etapas.

| Modelo                        | Input ($/1M tokens) | Output ($/1M tokens) | Contexto       |
| ----------------------------- | ------------------- | -------------------- | -------------- |
| `z-ai/glm-4.7`                | **$0,38**           | **$1,98**            | 202.752 tokens |
| `anthropic/claude-sonnet-4.5` | $3,00               | $15,00               | 1M tokens      |

> **Economia de ~8× no input e ~7,5× no output** em comparação com o Claude Sonnet 4.5 — o modelo mais próximo em qualidade de programação disponível via OpenRouter.

O GLM-4.7 ocupa a **posição #18 em programming** no ranking do OpenRouter, com forte desempenho em tarefas de código, raciocínio e front-end — alinhado com o tipo de revisão que a plataforma realiza.

---

## Escopo

### Etapa 0 — Refatorar: `ai-review.ts` → módulo `src/services/ai/`

**Motivação:** o arquivo atual tem 386 linhas misturando 5 responsabilidades distintas — tipos/registry de providers, gerenciamento de API keys, resolução de contexto de prompt, constantes de prompt + builders e callers HTTP + API pública. Com a adição do OpenRouter e do teste de conexão, chegaria a ~550 linhas. A refatoração acontece antes de qualquer nova funcionalidade.

**Estrutura proposta:**

```
src/services/ai/
  index.ts         → re-exports públicos (única entrada para consumidores externos)
  providers.ts     → AIProvider, AIProviderConfig, registry, get/set/getAll, model storage
  keys.ts          → getStoredApiKey, setStoredApiKey, removeStoredApiKey, getApiKey
  prompts.ts       → FALLBACK_CONTEXT, resolveAIReviewContext, constantes e builders de prompt
  callers.ts       → callClaude, callOpenAI, callOpenRouter, callAI (internos)
  review.ts        → reviewWithAI, askAIQuestion, AskAIQuestionParams, parseReviewResponse
  connection.ts    → ConnectionTestResult, testProviderConnection
```

**Responsabilidade de cada módulo:**

| Arquivo         | Responsabilidade                                                                  | Exports públicos                                                                                                                                                         |
| --------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `providers.ts`  | Registry de providers e funções de acesso/persistência do provider ativo e modelo | `AIProvider`, `AIProviderConfig`, `getActiveProvider`, `setActiveProvider`, `getProviderConfig`, `getAllProviders`, `getStoredModel`, `setStoredModel`, `getActiveModel` |
| `keys.ts`       | Gerenciamento de API keys (localStorage + env var)                                | `getStoredApiKey`, `setStoredApiKey`, `removeStoredApiKey`, `getApiKey`                                                                                                  |
| `prompts.ts`    | Toda a lógica de construção de prompts                                            | _(internos apenas — só `callers.ts` e `review.ts` importam)_                                                                                                             |
| `callers.ts`    | Chamadas HTTP aos providers                                                       | _(interno — só `review.ts` importa `callAI`)_                                                                                                                            |
| `review.ts`     | API pública de revisão e chat                                                     | `reviewWithAI`, `askAIQuestion`, `AskAIQuestionParams`                                                                                                                   |
| `connection.ts` | Teste de conexão ao salvar chave                                                  | `ConnectionTestResult`, `testProviderConnection`                                                                                                                         |
| `index.ts`      | Barrel — re-exporta tudo público                                                  | tudo acima                                                                                                                                                               |

**Atualizar imports nos consumidores externos:**

Os 4 arquivos que importam de `@/services/ai-review` devem passar a importar de `@/services/ai`:

- `src/components/layout/SettingsDrawer.tsx`
- `src/hooks/useAIReview.ts`
- `src/pages/HomePage.tsx`
- `src/components/layout/Header.tsx`

**O arquivo `src/services/ai-review.ts` é deletado** ao final desta etapa.

**Critérios de sucesso:**

- Nenhuma mudança de comportamento — apenas reorganização estrutural
- Todos os imports externos apontam para `@/services/ai`
- Nenhum lint error após a refatoração
- Cada arquivo do módulo tem responsabilidade única e clara

---

### Etapa 1 — Adicionar provider OpenRouter e seleção de modelo

**Arquivo:** `src/services/ai/providers.ts` e `src/services/ai/callers.ts`

**O que fazer:**

1. Adicionar `'openrouter'` ao tipo `AIProvider`:

   ```ts
   export type AIProvider = 'claude' | 'openai' | 'openrouter'
   ```

2. Adicionar campo `supportsModelSelection?: boolean` e `defaultModel` em `AIProviderConfig`:

   ```ts
   export interface AIProviderConfig {
     id: AIProvider
     name: string
     model: string // modelo padrão (fixo para claude/openai)
     defaultModel: string // sugestão quando há seleção livre
     supportsModelSelection?: boolean
     keyPrefix: string
     keyPlaceholder: string
     keyUrl: string
     envVar: string
   }
   ```

3. Adicionar `openrouter` ao record de providers:

   ```ts
   openrouter: {
     id: 'openrouter',
     name: 'OpenRouter',
     model: 'z-ai/glm-4.7',
     defaultModel: 'z-ai/glm-4.7',
     supportsModelSelection: true,
     keyPrefix: 'sk-or-',
     keyPlaceholder: 'sk-or-...',
     keyUrl: 'https://openrouter.ai/keys',
     envVar: 'VITE_OPENROUTER_API_KEY',
   }
   ```

4. Adicionar funções de gerenciamento de modelo:

   ```ts
   const MODEL_KEY_PREFIX = 'learning-engine-model-'

   export function getStoredModel(provider?: AIProvider): string | null
   export function setStoredModel(model: string, provider?: AIProvider): void
   export function getActiveModel(provider?: AIProvider): string
   // retorna: getStoredModel() || getProviderConfig().model
   ```

5. Implementar `callOpenRouter()` — reutiliza formato OpenAI, mas com:
   - Endpoint: `https://openrouter.ai/api/v1/chat/completions`
   - Header extra: `HTTP-Referer: https://study-app.vercel.app` e `X-Title: Learning Engine`
   - Modelo dinâmico via `getActiveModel('openrouter')`

6. Adicionar `openrouter: callOpenRouter` ao `providerCallers`

7. Implementar `testProviderConnection()` — função de ping leve para validar chave antes de salvar:

   ```ts
   export interface ConnectionTestResult {
     ok: boolean
     error?: string // mensagem amigável ao usuário
   }

   export async function testProviderConnection(
     provider: AIProvider,
     apiKey: string,
     model?: string
   ): Promise<ConnectionTestResult>
   ```

   **Estratégia por provider:**

   | Provider   | Endpoint                    | Payload mínimo                                       |
   | ---------- | --------------------------- | ---------------------------------------------------- |
   | Claude     | `POST /v1/messages`         | `max_tokens: 1`, mensagem `"ping"`                   |
   | OpenAI     | `POST /v1/chat/completions` | `max_tokens: 1`, mensagem `"ping"`                   |
   | OpenRouter | `POST /v1/chat/completions` | `max_tokens: 1`, mensagem `"ping"`, modelo informado |

   **Mapeamento de erros para mensagens amigáveis:**

   | Status HTTP | Mensagem exibida                                     |
   | ----------- | ---------------------------------------------------- |
   | 401         | "Chave de API inválida ou expirada."                 |
   | 403         | "Acesso negado. Verifique permissões da chave."      |
   | 404         | "Modelo não encontrado. Verifique o ID do modelo."   |
   | 429         | "Limite de uso atingido. Tente novamente em breve."  |
   | 5xx         | "Serviço temporariamente indisponível."              |
   | rede        | "Não foi possível conectar. Verifique sua internet." |

**Critérios de sucesso:**

- Chamadas para OpenRouter retornam respostas válidas
- Modelo pode ser sobrescrito via localStorage
- Fallback para `z-ai/glm-4.7` quando nenhum modelo estiver salvo
- `testProviderConnection()` retorna `{ ok: true }` com chave válida e `{ ok: false, error }` com chave inválida

---

### Etapa 2 — Atualizar `SettingsDrawer`: validação ao salvar + UI de modelo

**Arquivo:** `src/components/layout/SettingsDrawer.tsx`

**O que fazer:**

#### 2a — Ping de validação ao salvar

Substituir o `handleSave` atual por um fluxo assíncrono:

1. Botão muda para estado de loading (`isTesting: true`) com label "Verificando..."
2. Chama `testProviderConnection(provider, apiKey, model)`
3. **Sucesso:** persiste chave (e modelo) → fecha loading → toast `"✓ Conexão verificada! Chave salva."`
4. **Erro:** não persiste nada → fecha loading → toast destrutivo com a `error` retornada

```
[Salvar] → [Verificando...] → ✓ Conexão verificada! Chave salva.
                             → ✗ Chave de API inválida ou expirada.
```

O botão "Salvar" deve ficar desabilitado durante o teste para evitar duplo clique.

#### 2b — Campo de modelo para OpenRouter

Quando o provider **OpenRouter** estiver selecionado, exibir abaixo do campo de API key:

- **Label:** "Modelo"
- **Input de texto** pré-preenchido com o modelo salvo (ou `z-ai/glm-4.7` como default)
- **Badge "Recomendado"** ao lado do valor sugerido quando o input estiver com `z-ai/glm-4.7`
- **Texto auxiliar:** "Informe o ID do modelo no formato `provider/model-name`"
- **Link:** "Ver modelos disponíveis →" → `https://openrouter.ai/models`
- Botão "Salvar" persiste modelo via `setStoredModel()` **apenas se o ping passar**

**Para Claude e OpenAI:** não exibir o campo de modelo.

**Critérios de sucesso:**

- Chave só é salva após ping bem-sucedido
- Estado de loading é visível e bloqueia duplo clique
- Toast de erro exibe mensagem útil e acionável
- Campo de modelo aparece apenas para OpenRouter
- Placeholder exibe a sugestão padrão claramente

---

### Etapa 3 — Atualizar `AI_SYSTEM.md`

**Arquivo:** `documents/product/AI_SYSTEM.md`

**O que fazer:**

- Atualizar seção de localização no código (nova estrutura `src/services/ai/`)
- Adicionar `openrouter` à tabela de providers suportados
- Documentar o campo `supportsModelSelection`
- Adicionar seção explicando como o modelo é resolvido (stored → default)
- Adicionar nota sobre headers HTTP-Referer e X-Title (requisito do OpenRouter)
- Documentar variável de ambiente `VITE_OPENROUTER_API_KEY`
- Documentar `testProviderConnection()` e o fluxo de ping ao salvar chave

---

## Questões a responder

- Queremos permitir seleção de modelo também para Claude e OpenAI futuramente, ou manter fixo?
- O `HTTP-Referer` deve usar a URL de produção (`study-app.vercel.app`) ou ser configurável?
- O ping deve bloquear o salvamento ou apenas avisar (e salvar mesmo assim)? — **Recomendação: bloquear**, evita UX quebrada por chave inválida silenciosa.

---

## Entregável

- `src/services/ai/` — módulo completo com 7 arquivos de responsabilidade única (substitui `ai-review.ts`)
- `src/components/layout/SettingsDrawer.tsx` — UI de seleção de modelo para OpenRouter + validação de chave com ping antes de salvar
- `src/hooks/useAIReview.ts`, `src/pages/HomePage.tsx`, `src/components/layout/Header.tsx` — imports atualizados para `@/services/ai`
- `src/services/ai-review.ts` — **deletado**
- `documents/product/AI_SYSTEM.md` — documentado o novo provider, estrutura modular e fluxo de teste de conexão
