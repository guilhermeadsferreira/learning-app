// Public API — re-exports everything that ai-review.ts previously exported
// Consumers should import from '@/services/ai' (or keep using '@/services/ai-review' via the shim)

export type { AIProvider, AIProviderConfig } from './providers'
export {
  getActiveProvider,
  setActiveProvider,
  getProviderConfig,
  getAllProviders,
  getStoredModel,
  setStoredModel,
  getActiveModel,
} from './providers'

export { getStoredApiKey, setStoredApiKey, removeStoredApiKey, getApiKey } from './keys'

export { testProviderConnection } from './connection'

export type { AskAIQuestionParams } from './review'
export { reviewWithAI, askAIQuestion } from './review'
