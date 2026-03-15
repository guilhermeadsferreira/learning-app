import { Lightbulb, AlertTriangle, CheckCircle, Briefcase, Sparkles, Info } from 'lucide-react'
import type { Lesson, ContentSection } from '@/engine/types'
import { cn } from '@/lib/utils'

interface LessonContentProps {
  lesson: Lesson
  className?: string
}

export function LessonContent({ lesson, className }: LessonContentProps) {
  return (
    <div className={cn('space-y-6', className)}>
      {lesson.analogy && (
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
          <div className="flex items-center gap-2">
            <Lightbulb className="size-4 text-amber-400" />
            <p className="text-sm font-medium text-amber-400">Pense assim...</p>
          </div>
          <p className="mt-2 text-slate-300">{lesson.analogy}</p>
        </div>
      )}

      <div className="max-w-none space-y-4">
        {lesson.content.sections.map((section, i) => (
          <Section key={i} section={section} />
        ))}
      </div>

      {lesson.realWorldExample && (
        <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
          <div className="flex items-center gap-2">
            <Briefcase className="size-4 text-blue-400" />
            <p className="text-sm font-medium text-blue-400">No mundo real</p>
          </div>
          <p className="mt-2 text-slate-300">{lesson.realWorldExample}</p>
        </div>
      )}

      {lesson.commonMistakes && lesson.commonMistakes.length > 0 && (
        <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="size-4 text-rose-400" />
            <p className="text-sm font-medium text-rose-400">Erros comuns — fique atento!</p>
          </div>
          <ul className="mt-2 space-y-1 pl-1">
            {lesson.commonMistakes.map((mistake, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                <span className="mt-0.5 text-rose-400">•</span>
                {mistake}
              </li>
            ))}
          </ul>
        </div>
      )}

      {lesson.keyTakeaways && lesson.keyTakeaways.length > 0 && (
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="size-4 text-emerald-400" />
            <p className="text-sm font-medium text-emerald-400">Lembre-se disso</p>
          </div>
          <ul className="mt-2 space-y-1 pl-1">
            {lesson.keyTakeaways.map((takeaway, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                <span className="mt-0.5 text-emerald-400">✓</span>
                {takeaway}
              </li>
            ))}
          </ul>
        </div>
      )}

      {lesson.encouragement && (
        <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-4">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-violet-400" />
            <p className="text-sm font-medium text-violet-400">Você está indo bem!</p>
          </div>
          <p className="mt-2 text-sm text-slate-300">{lesson.encouragement}</p>
        </div>
      )}
    </div>
  )
}

const calloutStyles = {
  tip: {
    border: 'border-emerald-500/20',
    bg: 'bg-emerald-500/5',
    text: 'text-emerald-400',
    icon: Lightbulb,
    label: 'Dica',
  },
  warning: {
    border: 'border-amber-500/20',
    bg: 'bg-amber-500/5',
    text: 'text-amber-400',
    icon: AlertTriangle,
    label: 'Atenção',
  },
  info: {
    border: 'border-blue-500/20',
    bg: 'bg-blue-500/5',
    text: 'text-blue-400',
    icon: Info,
    label: 'Info',
  },
}

function Section({ section }: { section: ContentSection }) {
  switch (section.type) {
    case 'heading':
      return (
        <h2 className="mt-4 text-xl font-semibold text-slate-50 first:mt-0">{section.content}</h2>
      )
    case 'paragraph':
      return <p className="leading-relaxed text-slate-300">{section.content}</p>
    case 'list':
      return (
        <ul className="list-disc space-y-1.5 pl-6 leading-relaxed text-slate-300">
          {section.content.split('\n').map((item, i) => (
            <li key={i}>{item.trim()}</li>
          ))}
        </ul>
      )
    case 'code':
      return (
        <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 font-mono text-sm leading-relaxed text-slate-300">
          <code>{section.content}</code>
        </pre>
      )
    case 'callout': {
      const variant = section.variant ?? 'info'
      const style = calloutStyles[variant]
      const Icon = style.icon
      return (
        <div className={cn('rounded-lg border p-4', style.border, style.bg)}>
          <div className="flex items-start gap-2">
            <Icon className={cn('mt-0.5 size-4 shrink-0', style.text)} />
            <p className={cn('text-sm leading-relaxed', 'text-slate-300')}>
              <span className={cn('font-medium', style.text)}>{style.label}: </span>
              {section.content}
            </p>
          </div>
        </div>
      )
    }
    default:
      return <p className="leading-relaxed text-slate-300">{section.content}</p>
  }
}
