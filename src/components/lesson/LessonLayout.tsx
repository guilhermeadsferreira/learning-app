import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface LessonLayoutProps {
  children: ReactNode
  footer?: ReactNode
  className?: string
}

export function LessonLayout({
  children,
  footer,
  className,
}: LessonLayoutProps) {
  return (
    <div
      className={cn(
        'flex h-full flex-col overflow-auto',
        className
      )}
    >
      <div className="flex flex-1 flex-col gap-6 p-6">
        <div className="mx-auto w-full max-w-4xl space-y-6">
          {children}
        </div>
      </div>
      {footer && (
        <div className="border-t border-slate-800 bg-slate-900/50 p-4">
          {footer}
        </div>
      )}
    </div>
  )
}
