import { getActiveProvider, getProviderConfig, type AIProvider } from './providers'

const API_KEY_PREFIX = 'learning-engine-api-key-'

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
