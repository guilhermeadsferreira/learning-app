// ---------------------------------------------------------------------------
// Provider registry
// ---------------------------------------------------------------------------

export type AIProvider = 'claude' | 'openai' | 'openrouter'

export interface AIProviderConfig {
  id: AIProvider
  name: string
  defaultModel: string
  keyPrefix: string
  keyPlaceholder: string
  keyUrl: string
  envVar: string
  supportsModelSelection?: boolean
}

const providers: Record<AIProvider, AIProviderConfig> = {
  claude: {
    id: 'claude',
    name: 'Claude (Anthropic)',
    defaultModel: 'claude-sonnet-4-20250514',
    keyPrefix: 'sk-ant-',
    keyPlaceholder: 'sk-ant-...',
    keyUrl: 'https://console.anthropic.com/settings/keys',
    envVar: 'VITE_ANTHROPIC_API_KEY',
  },
  openai: {
    id: 'openai',
    name: 'OpenAI (GPT)',
    defaultModel: 'gpt-4o-mini',
    keyPrefix: 'sk-',
    keyPlaceholder: 'sk-...',
    keyUrl: 'https://platform.openai.com/api-keys',
    envVar: 'VITE_OPENAI_API_KEY',
  },
  openrouter: {
    id: 'openrouter',
    name: 'OpenRouter',
    defaultModel: 'z-ai/glm-4.7',
    keyPrefix: 'sk-or-',
    keyPlaceholder: 'sk-or-...',
    keyUrl: 'https://openrouter.ai/keys',
    envVar: 'VITE_OPENROUTER_API_KEY',
    supportsModelSelection: true,
  },
}

const ACTIVE_PROVIDER_KEY = 'learning-engine-ai-provider'
const MODEL_KEY_PREFIX = 'learning-engine-model-'

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

export function getStoredModel(provider?: AIProvider): string | null {
  const p = provider ?? getActiveProvider()
  return localStorage.getItem(`${MODEL_KEY_PREFIX}${p}`)
}

export function setStoredModel(model: string, provider?: AIProvider): void {
  const p = provider ?? getActiveProvider()
  localStorage.setItem(`${MODEL_KEY_PREFIX}${p}`, model)
}

export function getActiveModel(provider?: AIProvider): string {
  const config = getProviderConfig(provider)
  return getStoredModel(provider) ?? config.defaultModel
}
