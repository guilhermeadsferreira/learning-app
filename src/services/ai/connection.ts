import type { AIProvider } from './providers'
import { getActiveModel } from './providers'

/**
 * Sends a minimal ping to the provider's API to validate the key.
 * Uses max_tokens=1 to minimize cost. Throws an error with a friendly
 * message if the connection fails.
 */
export async function testProviderConnection(provider: AIProvider, apiKey: string): Promise<void> {
  switch (provider) {
    case 'claude':
      await pingClaude(apiKey)
      break
    case 'openai':
      await pingOpenAI(apiKey)
      break
    case 'openrouter':
      await pingOpenRouter(apiKey)
      break
  }
}

async function pingClaude(apiKey: string): Promise<void> {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: getActiveModel('claude'),
      max_tokens: 1,
      messages: [{ role: 'user', content: 'Hi' }],
    }),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    const msg = error?.error?.message
    if (response.status === 401)
      throw new Error('Chave inválida. Verifique sua API key da Anthropic.')
    if (response.status === 403)
      throw new Error('Sem permissão. Verifique sua API key da Anthropic.')
    throw new Error(msg || `Erro ao conectar com Anthropic (${response.status})`)
  }
}

async function pingOpenAI(apiKey: string): Promise<void> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: getActiveModel('openai'),
      messages: [{ role: 'user', content: 'Hi' }],
      max_tokens: 1,
    }),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    const msg = error?.error?.message
    if (response.status === 401) throw new Error('Chave inválida. Verifique sua API key da OpenAI.')
    if (response.status === 403) throw new Error('Sem permissão. Verifique sua API key da OpenAI.')
    throw new Error(msg || `Erro ao conectar com OpenAI (${response.status})`)
  }
}

async function pingOpenRouter(apiKey: string): Promise<void> {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
      'HTTP-Referer': window.location.origin,
      'X-Title': 'Learning Engine',
    },
    body: JSON.stringify({
      model: getActiveModel('openrouter'),
      messages: [{ role: 'user', content: 'Hi' }],
      max_tokens: 1,
    }),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    const msg = error?.error?.message
    if (response.status === 401)
      throw new Error('Chave inválida. Verifique sua API key do OpenRouter.')
    if (response.status === 403)
      throw new Error('Sem permissão. Verifique sua API key do OpenRouter.')
    throw new Error(msg || `Erro ao conectar com OpenRouter (${response.status})`)
  }
}
