import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FeedbackCardProps {
  type: 'success' | 'error'
  message: string
  xpGained?: number
  className?: string
}

export function FeedbackCard({
  type,
  message,
  xpGained,
  className,
}: FeedbackCardProps) {
  const isSuccess = type === 'success'
  return (
    <Card
      className={cn(
        'border transition-all duration-200',
        isSuccess
          ? 'border-emerald-500/30 bg-emerald-500/10'
          : 'border-rose-500/30 bg-rose-500/10',
        className
      )}
    >
      <CardContent className="flex items-center gap-3 pt-4">
        {isSuccess ? (
          <CheckCircle className="size-6 shrink-0 text-emerald-500" />
        ) : (
          <XCircle className="size-6 shrink-0 text-rose-500" />
        )}
        <div className="flex-1">
          <p
            className={cn(
              'font-medium',
              isSuccess ? 'text-emerald-400' : 'text-rose-400'
            )}
          >
            {message}
          </p>
          {xpGained !== undefined && xpGained > 0 && (
            <p className="mt-1 text-sm text-emerald-400/80">
              +{xpGained} XP ganhos!
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
