import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface TagFilterBarProps {
  tags: string[]
  selectedTag: string | null
  onTagSelect: (tag: string | null) => void
  className?: string
}

export function TagFilterBar({ tags, selectedTag, onTagSelect, className }: TagFilterBarProps) {
  return (
    <div
      className={cn('flex flex-wrap justify-center gap-2', className)}
      role="group"
      aria-label="Filtrar cursos por área"
    >
      <Badge
        variant={selectedTag === null ? 'default' : 'outline'}
        className={cn(
          'cursor-pointer h-auto min-h-7 rounded-full px-3.5 py-1.5 text-sm transition-all',
          selectedTag === null
            ? 'bg-violet-500/20 text-violet-300 ring-1 ring-violet-500/30'
            : 'cursor-pointer hover:bg-slate-700/50 hover:text-slate-300'
        )}
        onClick={() => onTagSelect(null)}
      >
        Todos
      </Badge>
      {tags.map((tag) => {
        const isActive = selectedTag === tag
        const displayTag = tag.charAt(0).toUpperCase() + tag.slice(1)
        return (
          <Badge
            key={tag}
            variant="outline"
            className={cn(
              'cursor-pointer h-auto min-h-7 rounded-full px-3.5 py-1.5 text-sm transition-all',
              isActive
                ? 'bg-violet-500/20 text-violet-300 ring-1 ring-violet-500/30'
                : 'cursor-pointer hover:bg-slate-700/50 hover:text-slate-300'
            )}
            onClick={() => onTagSelect(isActive ? null : tag)}
          >
            {displayTag}
          </Badge>
        )
      })}
    </div>
  )
}
