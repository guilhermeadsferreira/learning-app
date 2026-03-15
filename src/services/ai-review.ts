import type { AIReviewRequest, AIReviewResponse } from '@/engine/types'

// ---------------------------------------------------------------------------
// Provider system — troque o provider ativo sem mudar nada no resto do app
// ---------------------------------------------------------------------------

export type AIProvider = 'claude' | 'openai'

export interface AIProviderConfig {
  id: AIProvider
  name: string
  model: string
  keyPrefix: string
  keyPlaceholder: string
  keyUrl: string
  envVar: string
}

const providers: Record<AIProvider, AIProviderConfig> = {
  claude: {
    id: 'claude',
    name: 'Claude (Anthropic)',
    model: 'claude-sonnet-4-20250514',
    keyPrefix: 'sk-ant-',
    keyPlaceholder: 'sk-ant-...',
    keyUrl: 'https://console.anthropic.com/settings/keys',
    envVar: 'VITE_ANTHROPIC_API_KEY',
  },
  openai: {
    id: 'openai',
    name: 'OpenAI (GPT)',
    model: 'gpt-4o-mini',
    keyPrefix: 'sk-',
    keyPlaceholder: 'sk-...',
    keyUrl: 'https://platform.openai.com/api-keys',
    envVar: 'VITE_OPENAI_API_KEY',
  },
}

const ACTIVE_PROVIDER_KEY = 'learning-engine-ai-provider'
const API_KEY_PREFIX = 'learning-engine-api-key-'

export function getActiveProvider(): AIProvider {
  return (localStorage.getItem(ACTIVE_PROVIDER_KEY) as AIProvider) || 'claude'
}

export function setActiveProvider(provider: AIProvider): void {
  localStorage.setItem(ACTIVE_PROVIDER_KEY, provider)
}

export function getProviderConfig(provider?: AIProvider): AIProviderConfig {
  return providers[provider ?? getActiveProvider()]
}

export function getAllProviders(): AIProviderConfig[] {
  return Object.values(providers)
}

// ---------------------------------------------------------------------------
// API Key management
// ---------------------------------------------------------------------------

export function getStoredApiKey(provider?: AIProvider): string | null {
  const p = provider ?? getActiveProvider()
  return localStorage.getItem(`${API_KEY_PREFIX}${p}`)
}

export function setStoredApiKey(key: string, provider?: AIProvider): void {
  const p = provider ?? getActiveProvider()
  localStorage.setItem(`${API_KEY_PREFIX}${p}`, key)
}

export function removeStoredApiKey(provider?: AIProvider): void {
  const p = provider ?? getActiveProvider()
  localStorage.removeItem(`${API_KEY_PREFIX}${p}`)
}

export function getApiKey(provider?: AIProvider): string | null {
  const config = getProviderConfig(provider)
  const envKey = import.meta.env[config.envVar]
  return envKey || getStoredApiKey(provider)
}

// ---------------------------------------------------------------------------
// Prompts (compartilhados entre providers)
// ---------------------------------------------------------------------------

const SYSTEM_PROMPT = `Você é um professor sênior de React com 10+ anos de experiência, especializado em ensinar desenvolvedores que estão migrando de PHP/jQuery para React moderno.

Seu papel é REVISAR o código do aluno em desafios práticos, de forma:
- Encorajadora e positiva (nunca humilhe ou seja sarcástico)
- Didática (explique o "porquê", não só o "o quê")  
- Prática (dê exemplos concretos quando sugerir melhorias)
- Progressiva (elogie o que está certo antes de apontar erros)

FORMATO DA RESPOSTA (JSON):
{
  "feedback": "Análise detalhada do código do aluno em 2-4 parágrafos. Comece reconhecendo o que está correto. Depois aponte erros ou oportunidades de melhoria com explicações claras. Use linguagem acessível.",
  "isCorrect": true/false,
  "encouragement": "Mensagem motivacional curta e genuína (1-2 frases). Não seja genérico — relate ao que o aluno fez.",
  "suggestions": ["Sugestão prática 1", "Sugestão prática 2"],
  "nextStepHint": "Uma dica sobre o que explorar a seguir ou como evoluir a solução (opcional, 1-2 frases)"
}

REGRAS:
1. Se o código resolve o desafio, isCorrect = true, mesmo que não seja idêntico à solução modelo
2. Valorize soluções criativas que vão além do pedido
3. Para erros, explique a causa e dê a correção, nunca apenas "está errado"
4. Se o aluno está travado (código vazio ou muito incompleto), dê um empurrão gentil sem entregar a resposta
5. Use analogias do dia a dia quando explicar conceitos
6. Responda SEMPRE em português brasileiro
7. Retorne APENAS o JSON, sem markdown ou texto extra`

function buildQuestionSystemPrompt(lessonTitle: string): string {
  return `Você é um professor sênior de React, paciente e didático. O aluno está na lição "${lessonTitle}" e precisa de ajuda.

REGRAS:
- Responda em português brasileiro
- Seja encorajador e nunca entregue a resposta completa diretamente
- Use analogias para explicar conceitos
- Se o aluno perguntar a resposta, dê dicas progressivas em vez de entregar pronta
- Seja conciso (2-4 parágrafos)
- Referência o código do aluno quando relevante`
}

function buildUserMessage(request: AIReviewRequest): string {
  return `## Contexto da Lição
**Título:** ${request.lessonTitle}
**Instruções do desafio:** ${request.challengeInstructions}

## Solução esperada (referência)
\`\`\`jsx
${request.solution}
\`\`\`

${request.hint ? `## Dica disponível para o aluno\n${request.hint}\n` : ''}
${request.lessonContext ? `## Contexto adicional\n${request.lessonContext}\n` : ''}

## Código do aluno (para revisar)
\`\`\`jsx
${request.studentCode}
\`\`\``
}

// ---------------------------------------------------------------------------
// Provider-specific API calls
// ---------------------------------------------------------------------------

async function callClaude(
  systemPrompt: string,
  userMessage: string,
  apiKey: string,
  maxTokens: number
): Promise<string> {
  const config = providers.claude

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: config.model,
      max_tokens: maxTokens,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
    }),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    const msg =
      error?.error?.message || `Erro na API Anthropic: ${response.status}`
    throw new Error(msg)
  }

  const data = await response.json()
  const text = data.content?.[0]?.text

  if (!text) throw new Error('Resposta vazia do Claude')
  return text
}

async function callOpenAI(
  systemPrompt: string,
  userMessage: string,
  apiKey: string,
  maxTokens: number
): Promise<string> {
  const config = providers.openai

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: config.model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      temperature: 0.7,
      max_tokens: maxTokens,
    }),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    const msg =
      error?.error?.message || `Erro na API OpenAI: ${response.status}`
    throw new Error(msg)
  }

  const data = await response.json()
  const text = data.choices?.[0]?.message?.content

  if (!text) throw new Error('Resposta vazia do GPT')
  return text
}

const providerCallers: Record<
  AIProvider,
  (
    system: string,
    user: string,
    key: string,
    maxTokens: number
  ) => Promise<string>
> = {
  claude: callClaude,
  openai: callOpenAI,
}

async function callAI(
  systemPrompt: string,
  userMessage: string,
  apiKey: string,
  maxTokens: number
): Promise<string> {
  const provider = getActiveProvider()
  return providerCallers[provider](systemPrompt, userMessage, apiKey, maxTokens)
}

// ---------------------------------------------------------------------------
// Public API (agnostic ao provider)
// ---------------------------------------------------------------------------

function parseReviewResponse(content: string): AIReviewResponse {
  try {
    const cleaned = content
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim()
    return JSON.parse(cleaned) as AIReviewResponse
  } catch {
    return {
      feedback: content,
      isCorrect: false,
      encouragement:
        'Continue tentando! Cada erro é uma oportunidade de aprender.',
      suggestions: [],
    }
  }
}

export async function reviewWithAI(
  request: AIReviewRequest,
  apiKey: string
): Promise<AIReviewResponse> {
  const content = await callAI(
    SYSTEM_PROMPT,
    buildUserMessage(request),
    apiKey,
    1000
  )
  return parseReviewResponse(content)
}

export async function askAIQuestion(
  question: string,
  lessonTitle: string,
  studentCode: string,
  apiKey: string
): Promise<string> {
  const userMsg = `Código atual do aluno:\n\`\`\`jsx\n${studentCode}\n\`\`\`\n\nPergunta: ${question}`
  return callAI(
    buildQuestionSystemPrompt(lessonTitle),
    userMsg,
    apiKey,
    600
  )
}
