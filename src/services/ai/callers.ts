import { getActiveProvider, getActiveModel, type AIProvider } from './providers'

async function callClaude(
  systemPrompt: string,
  userMessage: string,
  apiKey: string,
  maxTokens: number
): Promise<string> {
  const model = getActiveModel('claude')

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model,
      max_tokens: maxTokens,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
    }),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    const msg = error?.error?.message || `Erro na API Anthropic: ${response.status}`
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
  const model = getActiveModel('openai')

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
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
    const msg = error?.error?.message || `Erro na API OpenAI: ${response.status}`
    throw new Error(msg)
  }

  const data = await response.json()
  const text = data.choices?.[0]?.message?.content
  if (!text) throw new Error('Resposta vazia do GPT')
  return text
}

async function callOpenRouter(
  systemPrompt: string,
  userMessage: string,
  apiKey: string,
  maxTokens: number
): Promise<string> {
  const model = getActiveModel('openrouter')

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
      'HTTP-Referer': window.location.origin,
      'X-Title': 'Learning Engine',
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      max_tokens: maxTokens,
    }),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    const msg = error?.error?.message || `Erro na API OpenRouter: ${response.status}`
    throw new Error(msg)
  }

  const data = await response.json()
  const text = data.choices?.[0]?.message?.content
  if (!text) throw new Error('Resposta vazia do OpenRouter')
  return text
}

const providerCallers: Record<
  AIProvider,
  (system: string, user: string, key: string, maxTokens: number) => Promise<string>
> = {
  claude: callClaude,
  openai: callOpenAI,
  openrouter: callOpenRouter,
}

export async function callAI(
  systemPrompt: string,
  userMessage: string,
  apiKey: string,
  maxTokens: number
): Promise<string> {
  const provider = getActiveProvider()
  return providerCallers[provider](systemPrompt, userMessage, apiKey, maxTokens)
}
