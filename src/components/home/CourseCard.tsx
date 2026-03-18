import { Link } from 'react-router'
import type { Course } from '@/engine/types'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'
import { getAccent, accentConfig } from './courseAccent'

interface CourseCardProps {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  const lessonCount = course.modules.reduce((acc, m) => acc + m.lessons.length, 0)
  const accent = getAccent(course.tags)
  const config = accentConfig[accent]
  const primaryTag = course.tags[0]

  return (
    <Link
      to={`/course/${course.id}`}
      className={cn(
        'group relative flex flex-col rounded-xl',
        'border border-l-2 border-slate-700/50',
        config.border,
        'bg-slate-800/40',
        'transition-all duration-200',
        'hover:-translate-y-0.5 hover:border-slate-600/60',
        'shadow-sm hover:shadow-lg',
        config.shadow,
        config.bg
      )}
    >
      <div className="flex flex-col gap-3 p-5">
        <div className="flex items-start justify-between">
          <span
            className={cn(
              'flex size-10 items-center justify-center rounded-lg text-xl',
              config.iconBg
            )}
          >
            {course.icon}
          </span>
          <ArrowRight
            className={cn(
              'size-4 text-slate-600 transition-all duration-200',
              'group-hover:translate-x-0.5 group-hover:text-slate-400'
            )}
          />
        </div>

        <div className="space-y-1.5">
          <h3 className="font-semibold leading-snug text-slate-50">{course.title}</h3>
          <p className="text-sm leading-relaxed text-slate-400">{course.description}</p>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-slate-700/40 px-5 py-3">
        <span className="text-xs text-slate-500">{lessonCount} lições</span>
        {primaryTag && (
          <span className={cn('flex items-center gap-1.5 text-xs font-medium', config.text)}>
            <span className={cn('size-1.5 rounded-full', config.dot)} />
            {primaryTag}
          </span>
        )}
      </div>
    </Link>
  )
}
