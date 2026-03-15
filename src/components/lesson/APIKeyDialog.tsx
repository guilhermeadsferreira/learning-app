import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Key, ExternalLink } from 'lucide-react'
import {
  setStoredApiKey,
  getProviderConfig,
  getActiveProvider,
  setActiveProvider,
  getAllProviders,
  type AIProvider,
} from '@/services/ai-review'
import { cn } from '@/lib/utils'

interface APIKeyDialogProps {
  onKeySet: (key: string) => void
  onCancel: () => void
}

export function APIKeyDialog({ onKeySet, onCancel }: APIKeyDialogProps) {
  const [key, setKey] = useState('')
  const [provider, setProvider] = useState<AIProvider>(getActiveProvider())
  const config = getProviderConfig(provider)
  const allProviders = getAllProviders()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (key.trim()) {
      setActiveProvider(provider)
      setStoredApiKey(key.trim(), provider)
      onKeySet(key.trim())
    }
  }

  return (
    <Card className="border-violet-500/20 bg-slate-800/80">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm text-violet-400">
          <Key className="size-4" />
          Configurar Professor IA
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-3 flex gap-2">
          {allProviders.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                setProvider(p.id)
                setKey('')
              }}
              className={cn(
                'rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
                provider === p.id
                  ? 'bg-violet-500/20 text-violet-300'
                  : 'bg-slate-700/30 text-slate-500 hover:text-slate-400'
              )}
            >
              {p.name}
            </button>
          ))}
        </div>
        <p className="mb-3 text-sm text-slate-400">
          Insira sua API key da {config.name}. Ela fica armazenada apenas
          no seu navegador.
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder={config.keyPlaceholder}
            className="w-full rounded-lg border border-slate-700/50 bg-slate-900/50 px-3 py-2 text-sm text-slate-300 placeholder:text-slate-500 focus:border-violet-500/50 focus:outline-none"
          />
          <div className="flex items-center justify-between">
            <a
              href={config.keyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-slate-500 transition-colors hover:text-slate-400"
            >
              Obter API key
              <ExternalLink className="size-3" />
            </a>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onCancel}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={!key.trim()}
                className="bg-violet-600 hover:bg-violet-500"
              >
                Salvar
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
