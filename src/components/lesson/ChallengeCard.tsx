import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Lightbulb } from 'lucide-react'
import type { Challenge } from '@/engine/types'
import { cn } from '@/lib/utils'

interface ChallengeCardProps {
  challenge: Challenge
  onHintClick?: () => void
  className?: string
}

export function ChallengeCard({
  challenge,
  onHintClick,
  className,
}: ChallengeCardProps) {
  return (
    <Card
      className={cn(
        'border-slate-700/50 bg-slate-800/50 shadow-md shadow-slate-950/50',
        className
      )}
    >
      <CardHeader>
        <CardTitle className="text-slate-50">Desafio</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-slate-300">{challenge.instructions}</p>
        {challenge.hint && onHintClick && (
          <button
            type="button"
            onClick={onHintClick}
            className="flex items-center gap-2 text-sm text-amber-400 transition-colors hover:text-amber-300"
          >
            <Lightbulb className="size-4" />
            Ver dica
          </button>
        )}
      </CardContent>
    </Card>
  )
}
