import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Key } from 'lucide-react'

interface APIKeyDialogProps {
  onOpenSettings: () => void
  onCancel: () => void
}

export function APIKeyDialog({ onOpenSettings, onCancel }: APIKeyDialogProps) {
  return (
    <Card className="border-violet-500/20 bg-slate-800/80">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm text-violet-400">
          <Key className="size-4" />
          Configurar Professor IA
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-slate-400">
          Para receber revisão personalizada nos seus exercícios, configure sua API key nas
          configurações. Ela fica armazenada apenas no seu navegador.
        </p>
        <div className="flex gap-2">
          <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
            Cancelar
          </Button>
          <Button size="sm" onClick={onOpenSettings} className="bg-violet-600 hover:bg-violet-500">
            Configurar agora
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
