import { Link } from 'react-router'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { FileQuestion } from 'lucide-react'

export function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6">
      <div className="flex items-center gap-3 text-slate-400">
        <FileQuestion className="size-12" />
        <h1 className="text-2xl font-bold">Página não encontrada</h1>
      </div>
      <p className="max-w-md text-center text-slate-400">
        A URL que você acessou não existe. Verifique o endereço ou volte ao início.
      </p>
      <Link to="/" className={cn(buttonVariants(), 'inline-flex')}>
        Voltar ao início
      </Link>
    </div>
  )
}
