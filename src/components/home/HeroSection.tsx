import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'

interface HeroSectionProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  className?: string
}

export function HeroSection({ searchQuery, onSearchChange, className }: HeroSectionProps) {
  return (
    <div className={cn('text-center', className)}>
      <h1 className="text-3xl font-bold text-slate-50">Learning Engine</h1>
      <p className="mt-2 text-slate-400">
        Chega de consumir e só ter a teoria. Lições curtas, prática ativa e feedback de IA.
      </p>
      <div className="relative mx-auto mt-6 max-w-md">
        <Search
          className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500"
          aria-hidden
        />
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar cursos..."
          aria-label="Buscar cursos por título ou descrição"
          className="w-full rounded-lg border border-slate-700/50 bg-slate-800/50 py-2.5 pl-10 pr-4 text-sm text-slate-300 placeholder:text-slate-500 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
        />
      </div>
    </div>
  )
}
