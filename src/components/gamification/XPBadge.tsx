import { Badge } from '@/components/ui/badge'
import { Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

interface XPBadgeProps {
  xp: number
  className?: string
}

export function XPBadge({ xp, className }: XPBadgeProps) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        'gap-1.5 bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
        className
      )}
    >
      <Zap className="size-3.5" />
      <span>{xp} XP</span>
    </Badge>
  )
}
