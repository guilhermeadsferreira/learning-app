import { useState, useEffect } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Key, ExternalLink, CheckCircle2, XCircle, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import {
  getAllProviders,
  getActiveProvider,
  setActiveProvider,
  getStoredApiKey,
  getApiKey,
  setStoredApiKey,
  removeStoredApiKey,
  getStoredModel,
  setStoredModel,
  testProviderConnection,
  type AIProvider,
} from '@/services/ai'
import { useSettingsDrawer } from '@/hooks/useSettingsDrawer'
import { cn } from '@/lib/utils'

function maskApiKey(prefix: string): string {
  return `${prefix}••••••••••••••••`
}

export function SettingsDrawer() {
  const { isOpen, closeSettings } = useSettingsDrawer()
  const [provider, setProvider] = useState<AIProvider>(getActiveProvider())
  const [apiKeyInput, setApiKeyInput] = useState('')
  const [modelInput, setModelInput] = useState('')
  const [isTesting, setIsTesting] = useState(false)

  const allProviders = getAllProviders()
  const config = allProviders.find((p) => p.id === provider)!
  const hasStoredKey = !!getStoredApiKey(provider)
  const keyFromEnv = !!import.meta.env[config.envVar]

  useEffect(() => {
    if (isOpen) {
      const active = getActiveProvider()
      setProvider(active)
      setApiKeyInput('')
      setModelInput(getStoredModel(active) ?? '')
    }
  }, [isOpen])

  const handleProviderChange = (p: AIProvider) => {
    setProvider(p)
    setApiKeyInput('')
    setModelInput(getStoredModel(p) ?? '')
  }

  const handleSave = async () => {
    const trimmed = apiKeyInput.trim()
    if (!trimmed) return

    setIsTesting(true)
    try {
      // Temporarily store model so ping uses the selected model
      const pendingModel = modelInput.trim()
      if (config.supportsModelSelection && pendingModel) {
        setStoredModel(pendingModel, provider)
      }

      await testProviderConnection(provider, trimmed)

      setActiveProvider(provider)
      setStoredApiKey(trimmed, provider)
      if (config.supportsModelSelection && pendingModel) {
        setStoredModel(pendingModel, provider)
      }
      setApiKeyInput('')
      toast.success('Conexão verificada! Chave salva.')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erro ao verificar conexão')
    } finally {
      setIsTesting(false)
    }
  }

  const handleRemove = () => {
    if (!window.confirm('Tem certeza que deseja remover a chave de API?')) return
    removeStoredApiKey(provider)
    setApiKeyInput('')
    toast.success('Chave de API removida')
  }

  const inputPlaceholder = hasStoredKey ? maskApiKey(config.keyPrefix) : config.keyPlaceholder
  const showRemoveButton = hasStoredKey && !keyFromEnv

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeSettings()}>
      <SheetContent
        side="right"
        className="flex w-full flex-col border-slate-700/50 bg-slate-900 sm:max-w-md"
      >
        <SheetHeader>
          <SheetTitle>Configurações</SheetTitle>
        </SheetHeader>
        <div className="flex flex-1 flex-col gap-6 overflow-auto p-4 pt-0">
          <section className="space-y-4">
            <h3 className="flex items-center gap-2 text-sm font-medium text-slate-200">
              <Key className="size-4 text-violet-400" />
              Professor IA
            </h3>

            <div className="flex flex-wrap gap-2">
              {allProviders.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleProviderChange(p.id)}
                  className={cn(
                    'flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    provider === p.id
                      ? 'bg-violet-500/20 text-violet-300'
                      : 'bg-slate-700/30 text-slate-500 hover:text-slate-400'
                  )}
                >
                  {p.name}
                  {getApiKey(p.id) ? (
                    <CheckCircle2 className="size-4 text-emerald-500" />
                  ) : (
                    <XCircle className="size-4 text-amber-500/80" />
                  )}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <label className="text-xs text-slate-500">API Key</label>
              <input
                type="password"
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder={inputPlaceholder}
                className="w-full rounded-lg border border-slate-700/50 bg-slate-900/50 px-3 py-2 text-sm text-slate-300 placeholder:text-slate-500 focus:border-violet-500/50 focus:outline-none"
                autoComplete="off"
              />
            </div>

            {config.supportsModelSelection && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <label className="text-xs text-slate-500">Modelo</label>
                  <span className="rounded-full bg-violet-500/10 px-2 py-0.5 text-xs text-violet-400">
                    Recomendado: {config.defaultModel}
                  </span>
                </div>
                <input
                  type="text"
                  value={modelInput}
                  onChange={(e) => setModelInput(e.target.value)}
                  placeholder={config.defaultModel}
                  className="w-full rounded-lg border border-slate-700/50 bg-slate-900/50 px-3 py-2 text-sm text-slate-300 placeholder:text-slate-500 focus:border-violet-500/50 focus:outline-none"
                  autoComplete="off"
                />
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                onClick={handleSave}
                disabled={!apiKeyInput.trim() || isTesting}
                className="bg-violet-600 hover:bg-violet-500"
              >
                {isTesting ? (
                  <>
                    <Loader2 className="mr-1.5 size-3.5 animate-spin" />
                    Verificando…
                  </>
                ) : (
                  'Salvar'
                )}
              </Button>
              {showRemoveButton && (
                <Button size="sm" variant="destructive" onClick={handleRemove} disabled={isTesting}>
                  Remover chave
                </Button>
              )}
            </div>

            <a
              href={config.keyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-slate-500 transition-colors hover:text-slate-400"
            >
              Obter API key
              <ExternalLink className="size-3" />
            </a>

            <p className="text-xs text-slate-500">
              Sua chave é armazenada apenas no seu navegador.
            </p>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  )
}
