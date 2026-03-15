import { useRouteError, Link } from 'react-router'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { AlertTriangle } from 'lucide-react'

export function ErrorPage() {
  const error = useRouteError() as Error | undefined
  const message = error?.message ?? 'Algo deu errado. Tente novamente.'

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6">
      <div className="flex items-center gap-3 text-rose-400">
        <AlertTriangle className="size-12" />
        <h1 className="text-2xl font-bold">Erro</h1>
      </div>
      <p className="max-w-md text-center text-slate-300">{message}</p>
      <Link to="/" className={cn(buttonVariants(), 'inline-flex')}>
        Voltar ao início
      </Link>
    </div>
  )
}
