import type {
  AIReviewContext,
  AIReviewRequest,
  AIReviewResponse,
  ChallengeStyle,
} from '@/engine/types'

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
// Prompts (compartilhados entre providers) — dinâmicos por curso
// ---------------------------------------------------------------------------

/** Fallbacks por courseId quando o curso não define aiReviewContext */
const FALLBACK_CONTEXT: Record<string, AIReviewContext> = {
  react: {
    subject: 'React',
    expertise: 'React, hooks, componentes, JSX, Tailwind, ecossistema',
    codeLanguage: 'jsx',
    challengeStyle: 'code',
  },
}

function resolveAIReviewContext(
  courseId: string,
  aiReviewContext?: AIReviewContext
): AIReviewContext {
  if (aiReviewContext?.subject) return aiReviewContext
  const fallback = FALLBACK_CONTEXT[courseId]
  if (fallback) return fallback
  return {
    subject: courseId,
    expertise: 'programação',
    codeLanguage: 'text',
    challengeStyle: 'code',
  }
}

// ---------------------------------------------------------------------------
// Blocos de prompt específicos por challengeStyle
// ---------------------------------------------------------------------------

const REVIEW_ROLE: Record<ChallengeStyle, string> = {
  code: 'REVISAR o código do aluno em desafios práticos',
  query: 'REVISAR a query do aluno em desafios de banco de dados',
  scenario: 'AVALIAR a resposta do aluno em cenários práticos de gestão e decisão',
  written: 'AVALIAR a resposta escrita do aluno em atividades de análise e documentação',
}

const REVIEW_CRITERIA: Record<ChallengeStyle, string> = {
  code: `1. Se o código resolve o desafio, isCorrect = true, mesmo que não seja idêntico à solução modelo
2. Valorize soluções criativas que vão além do pedido
3. Para erros, explique a causa e dê a correção, nunca apenas "está errado"
4. Se o aluno está travado (código vazio ou muito incompleto), dê um empurrão gentil sem entregar a resposta
5. Avalie boas práticas: legibilidade, nomenclatura, estrutura`,

  query: `1. Se a query retorna o resultado correto, isCorrect = true, mesmo que a sintaxe difira da solução modelo
2. Avalie corretude lógica: joins, filtros, agrupamentos, ordenação
3. Avalie boas práticas: uso de índices, evitar SELECT *, aliases claros
4. Para erros de sintaxe, explique a regra do SQL e corrija com exemplo
5. Aponte problemas de performance quando relevante (N+1, full table scan)`,

  scenario: `1. Se a resposta demonstra raciocínio alinhado com boas práticas, isCorrect = true
2. Não existe resposta única correta — valorize coerência e justificativa
3. Avalie: clareza do raciocínio, consideração das partes envolvidas, aplicabilidade prática
4. Para respostas incompletas, indique o que está faltando de forma construtiva
5. Relacione a resposta com frameworks e metodologias do domínio`,

  written: `1. Se a resposta demonstra compreensão do conceito e atende ao pedido, isCorrect = true
2. Avalie: clareza, estrutura, profundidade, precisão técnica
3. Para respostas vagas, peça mais especificidade com exemplos do que seria esperado
4. Valorize exemplos concretos e analogias usadas pelo aluno
5. Sugira como expandir ou aprofundar a resposta`,
}

const ANSWER_LABEL: Record<ChallengeStyle, string> = {
  code: 'Código do aluno (para revisar)',
  query: 'Query do aluno (para revisar)',
  scenario: 'Resposta do aluno (para avaliar)',
  written: 'Resposta escrita do aluno (para avaliar)',
}

const SOLUTION_LABEL: Record<ChallengeStyle, string> = {
  code: 'Solução esperada (referência)',
  query: 'Query de referência',
  scenario: 'Resposta de referência',
  written: 'Resposta de referência',
}

function buildReviewSystemPrompt(context: AIReviewContext): string {
  const expertise = context.expertise ?? context.subject
  const style = context.challengeStyle ?? 'code'
  const role = REVIEW_ROLE[style]
  const criteria = REVIEW_CRITERIA[style]

  return `Você é um professor sênior de ${context.subject} com 10+ anos de experiência, especializado em ${expertise} e em ensinar pessoas que querem evoluir na carreira.

Seu papel é ${role}, de forma:
- Encorajadora e positiva (nunca humilhe ou seja sarcástico)
- Didática (explique o "porquê", não só o "o quê")
- Prática (dê exemplos concretos quando sugerir melhorias)
- Progressiva (elogie o que está certo antes de apontar erros)

FORMATO DA RESPOSTA (JSON):
{
  "feedback": "Análise detalhada da resposta do aluno em 2-4 parágrafos. Comece reconhecendo o que está correto. Depois aponte erros ou oportunidades de melhoria com explicações claras. Use linguagem acessível.",
  "isCorrect": true/false,
  "encouragement": "Mensagem motivacional curta e genuína (1-2 frases). Não seja genérico — relate ao que o aluno fez.",
  "suggestions": ["Sugestão prática 1", "Sugestão prática 2"],
  "nextStepHint": "Uma dica sobre o que explorar a seguir ou como evoluir a solução (opcional, 1-2 frases)"
}

CRITÉRIOS DE AVALIAÇÃO:
${criteria}

REGRAS GERAIS:
- Use analogias do dia a dia quando explicar conceitos
- Responda SEMPRE em português brasileiro
- Retorne APENAS o JSON, sem markdown ou texto extra`
}

function buildQuestionSystemPrompt(
  context: AIReviewContext,
  lessonTitle: string
): string {
  const style = context.challengeStyle ?? 'code'
  const hasCode = style === 'code' || style === 'query'

  return `Você é um professor sênior de ${context.subject}, paciente e didático. O aluno está na lição "${lessonTitle}" e precisa de ajuda.

REGRAS:
- Responda em português brasileiro
- Seja encorajador e nunca entregue a resposta completa diretamente
- Use analogias para explicar conceitos
- Se o aluno perguntar a resposta, dê dicas progressivas em vez de entregar pronta
- Seja conciso (2-4 parágrafos)${hasCode ? '\n- Referência o código/query do aluno quando relevante' : ''}`
}

function buildUserMessage(request: AIReviewRequest): string {
  const lang = request.aiReviewContext?.codeLanguage ?? 'text'
  const style = request.aiReviewContext?.challengeStyle ?? 'code'
  const solutionLabel = SOLUTION_LABEL[style]
  const answerLabel = ANSWER_LABEL[style]
  const hasCode = style === 'code' || style === 'query'

  const solutionBlock = hasCode
    ? `\`\`\`${lang}\n${request.solution}\n\`\`\``
    : request.solution

  const studentBlock = hasCode
    ? `\`\`\`${lang}\n${request.studentCode}\n\`\`\``
    : request.studentCode

  return `## Contexto da Lição
**Título:** ${request.lessonTitle}
**Instruções do desafio:** ${request.challengeInstructions}

## ${solutionLabel}
${solutionBlock}

${request.hint ? `## Dica disponível para o aluno\n${request.hint}\n` : ''}
${request.lessonContext ? `## Contexto adicional\n${request.lessonContext}\n` : ''}
## ${answerLabel}
${studentBlock}`
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
  const context = resolveAIReviewContext(
    request.courseId,
    request.aiReviewContext
  )
  const content = await callAI(
    buildReviewSystemPrompt(context),
    buildUserMessage(request),
    apiKey,
    1000
  )
  return parseReviewResponse(content)
}

export interface AskAIQuestionParams {
  question: string
  lessonTitle: string
  studentCode: string
  courseId: string
  aiReviewContext?: AIReviewContext
}

export async function askAIQuestion(
  params: AskAIQuestionParams,
  apiKey: string
): Promise<string> {
  const context = resolveAIReviewContext(
    params.courseId,
    params.aiReviewContext
  )
  const userMsg = `Código atual do aluno:\n\`\`\`jsx\n${params.studentCode}\n\`\`\`\n\nPergunta: ${params.question}`
  return callAI(
    buildQuestionSystemPrompt(context, params.lessonTitle),
    userMsg,
    apiKey,
    600
  )
}
