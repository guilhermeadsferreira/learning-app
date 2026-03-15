import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value: number
  max?: number
  className?: string
  showLabel?: boolean
}

export function ProgressBar({
  value,
  max = 100,
  className,
  showLabel = false,
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))

  return (
    <div className={cn('w-full', className)}>
      <Progress value={percentage} />
      {showLabel && (
        <p className="mt-1 text-xs text-slate-400">
          {Math.round(percentage)}%
        </p>
      )}
    </div>
  )
}
